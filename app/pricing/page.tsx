'use client';

import React, { useState } from 'react';

export default function Pricing() {
  const [darkMode, setDarkMode] = useState(false);

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
            <p className={`text-6xl font-black mb-2 ${darkMode ? 'text-white' : ''}`}>$3.95</p>
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'} mb-8`}>AUD · Less than a cup of coffee ☕</p>
            
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

          {/* BULK / API */}
          <div className="mt-8">
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'} mb-2`}>Need volume pricing or API access?</p>
            <a href="/partners" className="text-blue-600 font-bold text-sm hover:underline">View Partner Options →</a>
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
