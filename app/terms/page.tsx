'use client';

import React, { useState } from 'react';

export default function Terms() {
  const [darkMode, setDarkMode] = useState(false);

  const cardBg = darkMode ? '#18181b' : '#ffffff';
  const border = darkMode ? '#27272a' : '#e7e5e4';
  const muted = darkMode ? '#a1a1aa' : '#78716c';

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
            <p className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Terms & Conditions</p>
            <h1 className={`text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-6 ${darkMode ? 'text-white' : ''}`}>
              The Fine Print<span className="text-blue-600">.</span>
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Plain English. No surprises.
            </p>
          </div>

          {/* SECTIONS */}
          <div className="space-y-8">

            {/* 1. THE SERVICE */}
            <div className={`p-8 rounded-[2rem] ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h2 className={`text-xs font-black uppercase tracking-[0.2em] mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>1. What We Do</h2>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Listing Lens provides AI-powered analysis of marketplace listings. You upload a screenshot, we extract information and research market data, known issues, and other relevant details to help you make informed purchasing decisions. Our reports cover vehicles, property, electronics, fashion, watches & jewellery, and more.
              </p>
            </div>

            {/* 2. NOT PROFESSIONAL ADVICE */}
            <div className={`p-8 rounded-[2rem] border-2 ${darkMode ? 'bg-gray-800 border-orange-800' : 'bg-orange-50 border-orange-200'}`}>
              <h2 className={`text-xs font-black uppercase tracking-[0.2em] mb-4 text-orange-600`}>2. Important Disclaimer</h2>
              <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <strong>Listing Lens is not a substitute for professional inspection.</strong> While we strive for accuracy, we cannot guarantee the completeness or correctness of any analysis.
              </p>
              <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Before making any significant purchase, you should always: conduct your own research, arrange a professional inspection (mechanical, building, marine survey, etc.), verify claims made by the seller, and obtain independent valuations where appropriate.
              </p>
            </div>

            {/* 3. HOW AI IS USED */}
            <div className={`p-8 rounded-[2rem] ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-100'}`}>
              <h2 className={`text-xs font-black uppercase tracking-[0.2em] mb-4 text-blue-600`}>3. How We Use AI</h2>
              <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <strong>AI doesn't create our information — it finds it.</strong> Everything in your report comes from real, publicly available sources: manufacturer recalls, owner forums, review sites, market listings, and industry data.
              </p>
              <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                You could find this information yourself. It's all out there. But it would take you hours of searching across dozens of websites, forums, and databases. Our AI does that research in seconds — like having a thousand people searching the internet simultaneously on your behalf.
              </p>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                The AI reads your screenshot, identifies what you're looking at, then searches for relevant recalls, known issues, owner complaints, market prices, and red flags. It compiles what it finds into a structured report. The intelligence is in the searching and organising — not in making things up.
              </p>
            </div>

            {/* 4. PAYMENT */}
            <div className={`p-8 rounded-[2rem] ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h2 className={`text-xs font-black uppercase tracking-[0.2em] mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>4. Payment & Refunds</h2>
              <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Reports are purchased individually at the price displayed at checkout. Payment is processed securely via Stripe. All prices are in Australian Dollars (AUD) unless otherwise stated.
              </p>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Due to the instant-delivery nature of digital reports, refunds are generally not available once a report has been generated. If you experience a technical issue that prevents you from receiving your report, contact us and we'll make it right.
              </p>
            </div>

            {/* 5. YOUR RESPONSIBILITIES */}
            <div className={`p-8 rounded-[2rem] ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h2 className={`text-xs font-black uppercase tracking-[0.2em] mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>5. Your Responsibilities</h2>
              <div className={`text-sm leading-relaxed space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <p>By using Listing Lens, you agree to:</p>
                <p>• Upload only screenshots of listings you have a legitimate interest in analysing</p>
                <p>• Not use the service for any unlawful purpose</p>
                <p>• Not attempt to reverse-engineer, scrape, or abuse our systems</p>
                <p>• Not resell or redistribute reports without permission</p>
              </div>
            </div>

            {/* 6. INTELLECTUAL PROPERTY */}
            <div className={`p-8 rounded-[2rem] ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h2 className={`text-xs font-black uppercase tracking-[0.2em] mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>6. Intellectual Property</h2>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                The Listing Lens name, logo, website design, and report formats are owned by Listing Lens Labs Pty Ltd. When you purchase a report, you receive a personal, non-transferable licence to use that report for your own decision-making purposes.
              </p>
            </div>

            {/* 7. LIMITATION OF LIABILITY */}
            <div className={`p-8 rounded-[2rem] ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h2 className={`text-xs font-black uppercase tracking-[0.2em] mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>7. Limitation of Liability</h2>
              <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                To the maximum extent permitted by law, Listing Lens Labs Pty Ltd is not liable for any indirect, incidental, or consequential damages arising from your use of our service or reliance on our reports.
              </p>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Our total liability for any claim is limited to the amount you paid for the specific report in question.
              </p>
            </div>

            {/* 8. AUSTRALIAN LAW */}
            <div className={`p-8 rounded-[2rem] ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h2 className={`text-xs font-black uppercase tracking-[0.2em] mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>8. Governing Law</h2>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                These terms are governed by the laws of the Australian Capital Territory, Australia. Any disputes will be resolved in the courts of the ACT.
              </p>
            </div>

            {/* 9. CHANGES */}
            <div className={`p-8 rounded-[2rem] ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h2 className={`text-xs font-black uppercase tracking-[0.2em] mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>9. Changes to Terms</h2>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms. We'll update the "last updated" date below when changes are made.
              </p>
            </div>

          </div>

          {/* CONTACT */}
          <div className="text-center mt-12">
            <h2 className={`text-lg font-black mb-2 ${darkMode ? 'text-white' : ''}`}>Questions?</h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
              If anything's unclear, just ask.
            </p>
            <a href="mailto:hello@listinglens.app" className="text-blue-600 font-bold text-sm">hello@listinglens.app</a>
          </div>

          {/* LAST UPDATED */}
          <p className={`text-center text-xs mt-12 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
            Last updated: February 2026
          </p>

        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ backgroundColor: cardBg, borderTop: '1px solid ' + border, padding: '24px 0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 24, fontSize: 14 }}>
            {[
              { label: 'FAQ', href: '/faq' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'About', href: '/about' },
              { label: 'API', href: '/partners' },
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
              { label: 'Say Hello', href: '/contact' },
            ].map(l => (
              <a key={l.label} href={l.href} style={{ color: muted, textDecoration: 'none' }}>{l.label}</a>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: 12, marginTop: 16, color: muted }}>
            © 2026 Listing Lens
          </p>
        </div>
      </footer>
    </div>
  );
}
