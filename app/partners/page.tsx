'use client';

import React, { useState, useEffect } from 'react';

export default function Partners() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved === 'true';
    }
    return false;
  });

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-zinc-950' : 'bg-white'} flex flex-col selection:bg-blue-100 transition-colors duration-300`}>
      
      {/* HEADER */}
      <header 
        className={`sticky top-0 z-50 ${
          darkMode ? 'bg-zinc-950/95' : 'bg-white/95'
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
        
        {/* HERO */}
        <div className="w-full max-w-2xl text-center mb-16">
          <p className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Partner Program</p>
          <h1 className={`text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-6 ${darkMode ? 'text-white' : ''}`}>
            Integrate Listing Lens<br/>Into Your Platform<span className="text-blue-600">.</span>
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>
            Give your users instant AI-powered analysis on any marketplace listing. Volume pricing available for platforms, brokers, and enterprises.
          </p>
        </div>

        {/* USE CASES */}
        <div className="w-full max-w-3xl mb-16">
          <h2 className={`text-xs font-black uppercase tracking-[0.2em] text-center mb-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Built For</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '🚗', title: 'Car Buying Services', desc: 'Offer analysis reports as part of your vehicle sourcing service' },
              { icon: '💳', title: 'Finance & Insurance', desc: 'Pre-approval risk assessment and accurate vehicle valuations' },
              { icon: '🔍', title: 'PPSR & History Check Providers', desc: 'Add AI insights alongside your existing vehicle history reports' },
              { icon: '📱', title: 'Marketplace Apps', desc: 'Embed one-tap analysis for Facebook Marketplace, Gumtree aggregators' },
              { icon: '🏢', title: 'Dealership CRMs', desc: 'Help sales teams assess trade-ins and competitor listings instantly' },
              { icon: '⚓', title: 'Marine & Aviation Brokers', desc: 'Expand beyond vehicles — we cover boats, planes, and property' },
            ].map((item, i) => (
              <div 
                key={i} 
                className={`p-6 rounded-2xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}
              >
                <p className="text-2xl mb-3">{item.icon}</p>
                <h3 className={`font-black text-sm uppercase tracking-wide mb-2 ${darkMode ? 'text-white' : ''}`}>{item.title}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className={`w-full max-w-2xl mb-16 p-8 rounded-[2rem] ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h2 className={`text-xs font-black uppercase tracking-[0.2em] text-center mb-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>How It Works</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-sm shrink-0">1</div>
              <div>
                <h3 className={`font-black text-sm uppercase mb-1 ${darkMode ? 'text-white' : ''}`}>Send Us a Screenshot</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>POST an image to our API endpoint with category and region parameters.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-sm shrink-0">2</div>
              <div>
                <h3 className={`font-black text-sm uppercase mb-1 ${darkMode ? 'text-white' : ''}`}>We Analyse & Research</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Our AI extracts listing details, researches market data, recalls, owner reviews, and red flags.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-sm shrink-0">3</div>
              <div>
                <h3 className={`font-black text-sm uppercase mb-1 ${darkMode ? 'text-white' : ''}`}>Receive Structured JSON</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Get back a comprehensive report with verdict, concerns, negotiation tips, and questions to ask.</p>
              </div>
            </div>
          </div>
        </div>

        {/* PRICING TEASER */}
        <div className="w-full max-w-lg text-center mb-16">
          <div className={`p-8 rounded-[2rem] border-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <p className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Volume Pricing</p>
            <p className={`text-4xl font-black mb-2 ${darkMode ? 'text-white' : ''}`}>From $2<span className="text-lg">/report</span></p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-6`}>
              Tiered pricing based on monthly volume. Resell at your own margin.
            </p>
            <div className={`text-left text-sm space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <p>✓ &nbsp;Full white-label available</p>
              <p>✓ &nbsp;Webhook support for async delivery</p>
              <p>✓ &nbsp;Sandbox environment for testing</p>
              <p>✓ &nbsp;Dedicated support channel</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="w-full max-w-md text-center">
          <h2 className={`text-2xl font-black tracking-tight mb-4 ${darkMode ? 'text-white' : ''}`}>Let's Talk<span className="text-blue-600">.</span></h2>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-6`}>
            Interested in integrating Listing Lens? Get in touch and we'll set you up with API access and documentation.
          </p>
          <a 
            href="mailto:partners@listinglens.app?subject=API%20Partnership%20Enquiry" 
            className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all"
          >
            Contact Us
          </a>
          <p className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'} mt-4`}>partners@listinglens.app</p>
        </div>

      </main>

      {/* FOOTER */}
      <footer className={`border-t ${darkMode ? 'border-gray-800 bg-zinc-950' : 'border-gray-100 bg-white'} py-8`}>
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
