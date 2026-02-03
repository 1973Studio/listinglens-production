import { NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";
import Stripe from "stripe";
import { GoogleGenerativeAI } from "@google/generative-ai";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    // 1. Get the image from FormData
    const formData = await req.formData();
    const imageFile = formData.get("image") as File;
    const category = formData.get("category") as string || "motors";
    const region = formData.get("region") as string || "AU";

    if (!imageFile) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const imageBuffer = await imageFile.arrayBuffer();

    // 2. Generate a unique ticket ID
    const ticketId = `listing_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // 3. THE COAT CHECK: Save image to Netlify Blobs
    const store = getStore({
      name: "temp_listings",
      siteID: process.env.NETLIFY_SITE_ID!,
      token: process.env.NETLIFY_AUTH_TOKEN!,
    });
    await store.set(ticketId, imageBuffer);

    // 4. Run TEASER analysis (Gemini Flash - cheap, no web search)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const categoryLabels: Record<string, string> = {
      motors: "vehicle",
      property: "property",
      marine: "vessel/boat",
      aircraft: "aircraft",
    };
    const itemType = categoryLabels[category] || "item";

    const teaserPrompt = `Analyze this ${itemType} listing screenshot. Extract basic info and provide a teaser.

RESPOND WITH ONLY THIS JSON (no markdown, no backticks):
{
  "extracted": {
    "title": "Full title of the listing (make, model, year for vehicles)",
    "price": "Listed price exactly as shown",
    "location": "Location if visible",
    "specs": "Key specs (km, bedrooms, engine size, etc.)"
  },
  "teaser": {
    "flagCount": 3,
    "marketPosition": "Brief market position (e.g., 'Priced 8% above market average')",
    "knownIssue": "One known issue with this make/model from your training data",
    "hookLine": "One compelling sentence about what the full report reveals"
  }
}`;

    const result = await model.generateContent([
      teaserPrompt,
      {
        inlineData: {
          data: Buffer.from(imageBuffer).toString("base64"),
          mimeType: "image/jpeg",
        },
      },
    ]);

    let teaserText = result.response.text();
    teaserText = teaserText.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

    let teaserData;
    try {
      teaserData = JSON.parse(teaserText);
    } catch (parseError) {
      console.error("Teaser parse error:", teaserText);
      teaserData = {
        extracted: { title: "Listing", price: "See screenshot", location: region, specs: "" },
        teaser: { flagCount: 0, marketPosition: "Analysis pending", knownIssue: "", hookLine: "Full analysis available" },
      };
    }

    // 5. Create Stripe Checkout Session with ticket_id in metadata
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "aud",
            product_data: {
              name: "Listing Lens Report",
              description: `Full analysis for: ${teaserData.extracted?.title || "Listing"}`,
            },
            unit_amount: 395, // $3.95 AUD in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://listinglens.app"}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://listinglens.app"}/?cancelled=true`,
      metadata: {
        ticket_id: ticketId, // THE COAT CHECK TICKET
        category: category,
        region: region,
        car_name: teaserData.extracted?.title || "Listing",
      },
    });

    return NextResponse.json({
      checkoutUrl: session.url,
      sessionId: session.id,
      teaser: teaserData,
    });

  } catch (error) {
    console.error("Create Checkout Error:", error);
    return NextResponse.json(
      {
        error: "Failed to process listing",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
