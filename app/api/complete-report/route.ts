import { NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";
import Stripe from "stripe";
import { GoogleGenerativeAI } from "@google/generative-ai";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { session_id } = body;

    if (!session_id) {
      return NextResponse.json({ error: "No session ID" }, { status: 400 });
    }

    // 1. VERIFY STRIPE PAYMENT
    let session;
    try {
      session = await stripe.checkout.sessions.retrieve(session_id);
    } catch (stripeError) {
      console.error("Stripe error:", stripeError);
      return NextResponse.json({ error: "Invalid session" }, { status: 400 });
    }

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not verified" }, { status: 402 });
    }

    // 2. GET METADATA FROM STRIPE
    const ticketId = session.metadata?.ticket_id;
    const category = session.metadata?.category || "motors";
    const region = session.metadata?.region || "AU";
    const carName = session.metadata?.car_name || "Vehicle";

    if (!ticketId) {
      return NextResponse.json({ error: "Image ticket not found" }, { status: 404 });
    }

    // 3. RETRIEVE IMAGE FROM NETLIFY BLOBS (THE COAT CHECK)
    const store = getStore({
      name: "temp_listings",
      siteID: process.env.NETLIFY_SITE_ID!,
      token: process.env.NETLIFY_AUTH_TOKEN!,
    });

    const imageBuffer = await store.get(ticketId, { type: "arrayBuffer" });

    if (!imageBuffer) {
      return NextResponse.json({ error: "Image expired from storage" }, { status: 404 });
    }

    // 4. RUN FULL ANALYSIS WITH GOOGLE SEARCH (Gemini 1.5 Pro)
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      tools: [{ googleSearch: {} }], // Enable Google Search
    });

    const categoryLabels: Record<string, string> = {
      motors: "vehicle",
      property: "property",
      marine: "vessel/boat",
      aircraft: "aircraft",
    };
    const itemType = categoryLabels[category] || "item";

    const regionNames: Record<string, string> = {
      AU: "Australia",
      NZ: "New Zealand",
      UK: "United Kingdom",
      SG: "Singapore",
      CA: "Canada",
      HK: "Hong Kong",
      KR: "South Korea",
      JP: "Japan",
      GLOBAL: "Global",
    };
    const regionName = regionNames[region] || region;

    const fullPrompt = `You are Listing Lens, a professional buyer's advocate AI.

Analyze this ${itemType} listing screenshot. The buyer is purchasing in ${regionName}.
We identified this as: "${carName}"

TASKS - USE GOOGLE SEARCH FOR EACH:
1. MARKET CHECK: Search for current ${regionName} market prices for this exact make/model/year
2. RECALL CHECK: Search for any active recalls or safety notices
3. OWNER INSIGHTS: Search for owner reviews, common complaints, and reliability data
4. VISUAL ANALYSIS: Analyze the screenshot for any visible concerns

RESPOND WITH ONLY THIS JSON (no markdown):
{
  "extracted": {
    "title": "Full item title",
    "price": "Listed price from screenshot",
    "location": "Location if visible",
    "specs": "Key specifications"
  },
  "marketAnalysis": {
    "fairValueRange": "Price range based on ${regionName} market (e.g. $35,000 - $42,000)",
    "pricePosition": "Specific assessment (e.g. '8% above market average')",
    "comparables": "What similar listings are currently selling for",
    "demandLevel": "High/Medium/Low demand assessment"
  },
  "concerns": [
    {
      "severity": "HIGH or MEDIUM or LOW",
      "issue": "Specific concern",
      "detail": "Why this matters and what to check"
    }
  ],
  "positives": [
    {
      "point": "Positive aspect",
      "detail": "Why this is good"
    }
  ],
  "recalls": {
    "active": true or false,
    "details": "Specific recall information found, or 'No active recalls found'"
  },
  "ownerInsights": {
    "commonPraise": "What owners consistently love",
    "commonComplaints": "What owners consistently complain about",
    "reliabilityRating": "General reliability consensus from owner forums"
  },
  "questionsForSeller": [
    "Specific question based on your analysis",
    "Another targeted question",
    "Third important question",
    "Fourth question about history/maintenance",
    "Fifth question about specific concern you found"
  ],
  "negotiationTips": [
    "Specific leverage point with data to back it up",
    "Another negotiation angle based on market/condition"
  ],
  "verdict": {
    "score": 75,
    "recommendation": "BUY or NEGOTIATE or CAUTION or WALK AWAY",
    "summary": "2-3 sentence professional summary",
    "bottomLine": "One sentence - what would you personally do?"
  }
}`;

    const result = await model.generateContent([
      fullPrompt,
      {
        inlineData: {
          data: Buffer.from(imageBuffer).toString("base64"),
          mimeType: "image/jpeg",
        },
      },
    ]);

    let text = result.response.text();
    text = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

    let reportData;
    try {
      reportData = JSON.parse(text);
    } catch (parseError) {
      console.error("Report parse error:", text);
      return NextResponse.json(
        {
          error: "Report generation failed - invalid format",
          raw: text.substring(0, 500),
        },
        { status: 500 }
      );
    }

    // 5. CLEANUP - Delete the blob to save storage
    try {
      await store.delete(ticketId);
    } catch (deleteError) {
      console.error("Failed to delete blob:", deleteError);
      // Non-fatal, continue
    }

    return NextResponse.json(reportData);

  } catch (error) {
    console.error("Complete Report Error:", error);
    return NextResponse.json(
      {
        error: "Report generation failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
