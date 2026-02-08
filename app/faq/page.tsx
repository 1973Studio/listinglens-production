'use client';

import React, { useState, useEffect } from 'react';

export default function FAQ() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      setDarkMode(saved === 'true');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
  };
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqCategories = [
    {
      title: "Getting Started",
      icon: "🚀",
      faqs: [
        {
          question: "What is Listing Lens?",
          answer: "Listing Lens is an AI-powered research tool that analyses marketplace listings for you. Upload a screenshot of any listing from vehicles to property to electronics, and we'll research market value, known issues, recalls, owner feedback, and red flags — then deliver a comprehensive report in seconds."
        },
        {
          question: "How does it work?",
          answer: "Upload a screenshot of any listing. Our AI reads the image, identifies what's being sold, then searches real sources — manufacturer recalls, owner forums, review sites, market data — to compile a detailed report. Think of it like having a thousand researchers working simultaneously on your behalf."
        },
        {
          question: "What categories do you cover?",
          answer: "We currently analyse listings for vehicles (cars, bikes, boats, caravans, jet skis), property (houses, apartments, land), electronics (phones, laptops, cameras), fashion (clothing, bags, shoes), watches & jewellery, and everything else (furniture, instruments, tools, collectibles)."
        }
      ]
    },
    {
      title: "Pricing & Payment",
      icon: "💳",
      faqs: [
        {
          question: "How much does it cost?",
          answer: "Each report costs $5 in your local currency — whether that's $5 AUD, $5 USD, £5 GBP, €5 EUR, $5 NZD, or $5 SGD. No subscription, no account needed. Just pay for what you use."
        },
        {
          question: "Do I need to create an account?",
          answer: "No. We don't ask for your email, name, or any personal details. Upload a screenshot, pay via Stripe, get your report. That's it."
        },
        {
          question: "Can I get a refund?",
          answer: "Due to the instant-delivery nature of digital reports, refunds are generally not available once a report has been generated. If you experience a technical issue that prevents you from receiving your report, contact us and we'll make it right."
        }
      ]
    },
    {
      title: "Trust & Accuracy",
      icon: "🔍",
      faqs: [
        {
          question: "Is the information made up by AI?",
          answer: "No. Our AI doesn't generate or invent information — it finds it. Everything in your report comes from real, publicly available sources. The AI's job is to search and organise, not to make things up. You could find this information yourself; we just do it in seconds instead of hours."
        },
        {
          question: "Is this a substitute for a professional inspection?",
          answer: "No. Listing Lens helps you research before you buy, but you should always arrange a professional inspection (mechanic, building inspector, marine surveyor, etc.) before making a significant purchase. We help you know what to look for and what questions to ask."
        },
        {
          question: "What information is in a report?",
          answer: "Reports include: listing details extraction, market value analysis, known issues and common faults, recall information, owner insights (praise and complaints), red flags and concerns, questions to ask the seller, negotiation strategy with suggested prices, and visual analysis of the listing photos."
        }
      ]
    },
    {
      title: "Privacy & Security",
      icon: "🔒",
      faqs: [
        {
          question: "What happens to my screenshot after I upload it?",
          answer: "Screenshots are processed in real-time and automatically deleted within 5 minutes. We don't keep copies of your uploads or your reports. Privacy is built into how we operate."
        }
      ]
    },
    {
      title: "Coverage & Support",
      icon: "🌏",
      faqs: [
        {
          question: "Which countries do you support?",
          answer: "We fully support listings from Australia, New Zealand, and Singapore. You can also select 'Rest of World' (beta) for listings from other regions — your report will use global sources."
        },
        {
          question: "How do I contact support?",
          answer: "Use our contact form or email us at hello@listinglens.app — we're happy to help with any questions or issues."
        }
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'} flex flex-col selection:bg-blue-100 transition-colors duration-300`}>
      
      {/* HEADER */}
      <header 
        className={`sticky top-0 z-50 ${
          darkMode ? 'bg-gray-900/95' : 'bg-white/95'
        } backdrop-blur-sm border-b ${
          darkMode ? 'border-gray-800' : 'border-gray-100'
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex flex-col gap-0.5 group transition-opacity hover:opacity-70">
            <span className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${darkMode ? 'text-gray-500' : 'text-stone-500'} flex items-center gap-1.5`}>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" style={{ boxShadow: '0 0 8px rgba(34, 197, 94, 0.5)' }} />
              Online
            </span>
            <span className={`text-base font-black uppercase tracking-[0.1em] ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              LISTING LENS
            </span>
          </a>
          <button 
            onClick={toggleDarkMode} 
            className={`p-2.5 rounded-full transition-all ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
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

          {/* DEMO LINK CALLOUT */}
          <div className={`rounded-2xl p-6 mb-12 text-center border-2 ${
            darkMode 
              ? 'bg-blue-950/20 border-blue-900/50' 
              : 'bg-blue-50 border-blue-200'
          }`}>
            <p className="text-2xl mb-3">🎬</p>
            <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Want to see it in action?
            </h3>
            <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Check out our live demo showing how we analyze a real listing from screenshot to full report.
            </p>
            <a 
              href="/demo"
              className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all"
            >
              See How It Works →
            </a>
          </div>

          {/* FAQ CATEGORIES */}
          <div className="space-y-8">
            {faqCategories.map((category, catIndex) => (
              <div key={catIndex}>
                {/* Category Header */}
                <div className="mb-4">
                  <h2 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center gap-3`}>
                    <span className="text-3xl">{category.icon}</span>
                    {category.title}
                  </h2>
                </div>

                {/* FAQ Items */}
                <div className="space-y-3">
                  {category.faqs.map((faq, faqIndex) => {
                    const globalIndex = faqCategories
                      .slice(0, catIndex)
                      .reduce((sum, cat) => sum + cat.faqs.length, 0) + faqIndex;
                    
                    return (
                      <div 
                        key={faqIndex}
                        className={`rounded-2xl border-2 overflow-hidden transition-all ${
                          darkMode 
                            ? 'bg-gray-800 border-gray-700' 
                            : 'bg-white border-gray-100'
                        }`}
                      >
                        <button
                          onClick={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                          className="w-full p-5 text-left flex justify-between items-center gap-4"
                        >
                          <span className={`font-bold text-sm ${darkMode ? 'text-white' : ''}`}>{faq.question}</span>
                          <span className={`text-xl ${darkMode ? 'text-gray-500' : 'text-gray-400'} flex-shrink-0`}>
                            {openIndex === globalIndex ? '−' : '+'}
                          </span>
                        </button>
                        {openIndex === globalIndex && (
                          <div className={`px-5 pb-5 text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
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
      <footer className={`border-t ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-100 bg-white'} py-8`}>
        <div className="max-w-4xl mx-auto px-6">
          <nav className="flex justify-center flex-wrap gap-6 mb-4">
            {[
              { label: 'FAQ', href: '/faq' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'About', href: '/about' },
              { label: 'Demo', href: '/demo' },
              { label: 'API', href: '/partners' },
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
              { label: 'Say Hello', href: '/contact' },
            ].map(l => (
              <a 
                key={l.label} 
                href={l.href} 
                className={`text-sm font-medium transition-colors ${darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <p className={`text-center text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
            © 2026 Listing Lens
          </p>
        </div>
      </footer>
    </div>
  );
}
