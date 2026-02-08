'use client';

import React, { useState, useEffect } from 'react';

export default function Pricing() {
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

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        
        <div className="w-full max-w-lg text-center">
          
          {/* HERO */}
          <p className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Pricing</p>
          <h1 className={`text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-6 ${darkMode ? 'text-white' : ''}`}>
            Simple<span className="text-blue-600">.</span><br/>Transparent.
          </h1>
          <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-12`}>
            No subscriptions. No hidden fees. Pay only for what you use.
          </p>

          {/* PRICING CARD */}
          <div className={`p-8 rounded-[2rem] border-2 mb-8 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <p className={`text-xs font-black uppercase tracking-widest mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Per Report</p>
            <p className={`text-6xl font-black mb-2 ${darkMode ? 'text-white' : ''}`}>$5</p>
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'} mb-2`}>In your local currency</p>
            <p className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-8`}>$5 AUD • $5 USD • £5 GBP • €5 EUR • $5 NZD • $5 SGD</p>
            
            <div className={`text-left space-y-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <p className="flex items-center gap-3"><span className="text-green-500">✓</span> Full market value analysis</p>
              <p className="flex items-center gap-3"><span className="text-green-500">✓</span> Known issues & recalls</p>
              <p className="flex items-center gap-3"><span className="text-green-500">✓</span> Owner insights & complaints</p>
              <p className="flex items-center gap-3"><span className="text-green-500">✓</span> Red flags & concerns</p>
              <p className="flex items-center gap-3"><span className="text-green-500">✓</span> Questions to ask the seller</p>
              <p className="flex items-center gap-3"><span className="text-green-500">✓</span> Negotiation strategy</p>
              <p className="flex items-center gap-3"><span className="text-green-500">✓</span> Visual analysis</p>
            </div>

            <a 
              href="/"
              className="block w-full mt-8 bg-blue-600 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all text-center"
            >
              Get Started
            </a>
          </div>

          {/* NO ACCOUNT */}
          <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <p className={`font-bold text-sm mb-2 ${darkMode ? 'text-white' : ''}`}>No account required</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Upload a screenshot, pay securely via Stripe, get your report instantly. We don't ask for your email or any personal details.
            </p>
          </div>

          {/* WHY $5 EVERYWHERE */}
          <div className={`mt-8 p-6 rounded-2xl border-2 ${darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-100'}`}>
            <p className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-3">Fair Pricing, Globally</p>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We charge $5 in your local currency — not a converted price. Whether you're in Sydney, San Francisco, or Singapore, you pay the same simple amount. Fair is fair.
            </p>
          </div>

          {/* BULK / API */}
          <div className="mt-8">
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'} mb-2`}>Need volume pricing or API access?</p>
            <a href="/partners" className="text-blue-600 font-bold text-sm hover:underline">View Partner Options →</a>
          </div>

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
