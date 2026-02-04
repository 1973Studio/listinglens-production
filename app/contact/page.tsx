'use client';

import React, { useState } from 'react';

export default function Contact() {
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
        
        <div className="w-full max-w-md text-center">
          
          {/* HERO */}
          <p className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Contact</p>
          <h1 className={`text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-6 ${darkMode ? 'text-white' : ''}`}>
            Get In Touch<span className="text-blue-600">.</span>
          </h1>
          <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-12`}>
            Questions, feedback, partnership enquiries — we'd love to hear from you.
          </p>

          {/* CONTACT OPTIONS */}
          <div className="space-y-4">
            
            {/* General */}
            <a 
              href="mailto:hello@listinglens.app"
              className={`block p-6 rounded-2xl border-2 transition-all ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 hover:border-blue-500' 
                  : 'bg-white border-gray-100 hover:border-blue-600'
              }`}
            >
              <p className="text-2xl mb-2">💬</p>
              <p className={`font-black text-sm uppercase tracking-wide mb-1 ${darkMode ? 'text-white' : ''}`}>General Enquiries</p>
              <p className="text-blue-600 font-bold text-sm">hello@listinglens.app</p>
            </a>

            {/* Support */}
            <a 
              href="mailto:support@listinglens.app"
              className={`block p-6 rounded-2xl border-2 transition-all ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 hover:border-blue-500' 
                  : 'bg-white border-gray-100 hover:border-blue-600'
              }`}
            >
              <p className="text-2xl mb-2">🛟</p>
              <p className={`font-black text-sm uppercase tracking-wide mb-1 ${darkMode ? 'text-white' : ''}`}>Support</p>
              <p className="text-blue-600 font-bold text-sm">support@listinglens.app</p>
            </a>

            {/* Partners */}
            <a 
              href="mailto:partners@listinglens.app"
              className={`block p-6 rounded-2xl border-2 transition-all ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 hover:border-blue-500' 
                  : 'bg-white border-gray-100 hover:border-blue-600'
              }`}
            >
              <p className="text-2xl mb-2">🤝</p>
              <p className={`font-black text-sm uppercase tracking-wide mb-1 ${darkMode ? 'text-white' : ''}`}>Partnerships & API</p>
              <p className="text-blue-600 font-bold text-sm">partners@listinglens.app</p>
            </a>

          </div>

          {/* LOCATION */}
          <div className={`mt-12 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            <p className="font-bold uppercase tracking-widest mb-1">Based in</p>
            <p>Canberra, Australia 🇦🇺</p>
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
