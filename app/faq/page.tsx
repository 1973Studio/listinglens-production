'use client';

import React, { useState } from 'react';

export default function FAQ() {
  const [darkMode, setDarkMode] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Listing Lens?",
      answer: "Listing Lens is an AI-powered research tool that analyses marketplace listings for you. Upload a screenshot of any vehicle, property, boat, or aircraft listing, and we'll research market value, known issues, recalls, owner feedback, and red flags — then deliver a comprehensive report in seconds."
    },
    {
      question: "How does it work?",
      answer: "Upload a screenshot of any listing. Our AI reads the image, identifies what's being sold, then searches real sources — manufacturer recalls, owner forums, review sites, market data — to compile a detailed report. Think of it like having a thousand researchers working simultaneously on your behalf."
    },
    {
      question: "Is the information made up by AI?",
      answer: "No. Our AI doesn't generate or invent information — it finds it. Everything in your report comes from real, publicly available sources. The AI's job is to search and organise, not to make things up. You could find this information yourself; we just do it in seconds instead of hours."
    },
    {
      question: "How much does it cost?",
      answer: "Each report costs $3.95 AUD. No subscription, no account needed. Just pay for what you use."
    },
    {
      question: "Do I need to create an account?",
      answer: "No. We don't ask for your email, name, or any personal details. Upload a screenshot, pay via Stripe, get your report. That's it."
    },
    {
      question: "What categories do you cover?",
      answer: "We currently analyse listings for vehicles (cars, motorcycles, trucks), property (houses, apartments, land), marine (boats, jet skis, yachts), and aircraft. More categories coming soon."
    },
    {
      question: "Which countries do you support?",
      answer: "We support listings from Australia, New Zealand, United Kingdom, Canada, Singapore, Hong Kong, Japan, and South Korea. You can also select 'Global' for listings from other regions."
    },
    {
      question: "What information is in a report?",
      answer: "Reports include: listing details extraction, market value analysis, known issues and common faults, recall information, owner insights (praise and complaints), red flags and concerns, questions to ask the seller, negotiation strategy with suggested prices, and visual analysis of the listing photos."
    },
    {
      question: "Is this a substitute for a professional inspection?",
      answer: "No. Listing Lens helps you research before you buy, but you should always arrange a professional inspection (mechanic, building inspector, marine surveyor, etc.) before making a significant purchase. We help you know what to look for and what questions to ask."
    },
    {
      question: "What happens to my screenshot after I upload it?",
      answer: "Screenshots are processed in real-time and are not stored after your report is generated. We don't keep copies of your uploads or your reports. Privacy is built into how we operate."
    },
    {
      question: "Can I get a refund?",
      answer: "Due to the instant-delivery nature of digital reports, refunds are generally not available once a report has been generated. If you experience a technical issue that prevents you from receiving your report, contact us and we'll make it right."
    },
    {
      question: "How do I contact support?",
      answer: "Email us at hello@listinglens.app — we're happy to help with any questions or issues."
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'} flex flex-col selection:bg-blue-100 transition-colors duration-300`}>
      
      {/* HEADER */}
      <header className={`sticky top-0 ${darkMode ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-sm border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'} px-6 py-4 flex justify-between items-center z-40`}>
        <a href="/" className="flex items-center gap-3">
          <span className={`text-sm font-black tracking-widest uppercase ${darkMode ? 'text-white' : ''}`}>LISTING LENS</span>
        </a>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className={`p-2 rounded-full transition-all ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 py-16">
        
        <div className="w-full max-w-2xl">
          
          {/* HERO */}
          <div className="text-center mb-12">
            <p className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-4">FAQ</p>
            <h1 className={`text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-6 ${darkMode ? 'text-white' : ''}`}>
              Questions<span className="text-blue-600">?</span><br/>Answers.
            </h1>
          </div>

          {/* FAQ LIST */}
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`rounded-2xl border-2 overflow-hidden transition-all ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-100'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className={`w-full p-5 text-left flex justify-between items-center gap-4`}
                >
                  <span className={`font-bold text-sm ${darkMode ? 'text-white' : ''}`}>{faq.question}</span>
                  <span className={`text-xl ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>
                {openIndex === index && (
                  <div className={`px-5 pb-5 text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* STILL HAVE QUESTIONS */}
          <div className="text-center mt-12">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
              Still have questions?
            </p>
            <a 
              href="/contact"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all"
            >
              Contact Us
            </a>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className={`p-10 text-center border-t ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className={`flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-6`}>
          <a href="/faq" className={`${darkMode ? 'hover:text-white' : 'hover:text-black'} transition-colors`}>FAQ</a>
          <a href="/pricing" className={`${darkMode ? 'hover:text-white' : 'hover:text-black'} transition-colors`}>Pricing</a>
          <a href="/about" className={`${darkMode ? 'hover:text-white' : 'hover:text-black'} transition-colors`}>About</a>
          <a href="/contact" className={`${darkMode ? 'hover:text-white' : 'hover:text-black'} transition-colors`}>Contact</a>
          <a href="/partners" className={`${darkMode ? 'hover:text-white' : 'hover:text-black'} transition-colors`}>API</a>
          <a href="/privacy" className={`${darkMode ? 'hover:text-white' : 'hover:text-black'} transition-colors`}>Privacy</a>
          <a href="/terms" className={`${darkMode ? 'hover:text-white' : 'hover:text-black'} transition-colors`}>Terms</a>
        </div>
        <p className={`text-xs font-bold ${darkMode ? 'text-gray-700' : 'text-gray-300'} uppercase tracking-widest`}>© 2026 Listing Lens Labs Pty Ltd</p>
      </footer>
    </div>
  );
}
