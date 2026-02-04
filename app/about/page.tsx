'use client';

import React, { useState } from 'react';

export default function About() {
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

      <main className="flex-1 flex flex-col items-center px-6 py-16">
        
        <div className="w-full max-w-2xl">
          
          {/* HERO */}
          <div className="text-center mb-12">
            <p className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-4">About Us</p>
            <h1 className={`text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-6 ${darkMode ? 'text-white' : ''}`}>
              Your Advocate<span className="text-blue-600">.</span><br/>Not the Seller's.
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              We built Listing Lens because buying big-ticket items online shouldn't feel like a gamble.
            </p>
          </div>

          {/* THE PROBLEM */}
          <div className={`p-8 rounded-[2rem] mb-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <h2 className={`text-xs font-black uppercase tracking-[0.2em] mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>The Problem</h2>
            <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              You find a car, boat, or property online. The photos look great. The price seems reasonable. But something feels off — and you don't know what questions to ask.
            </p>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              The seller knows everything about what they're selling. You're starting from zero. That information gap costs buyers thousands of dollars every single day.
            </p>
          </div>

          {/* THE SOLUTION */}
          <div className={`p-8 rounded-[2rem] mb-8 ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-100'}`}>
            <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Our Solution</h2>
            <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Listing Lens levels the playing field. Upload a screenshot of any listing and we'll research it like you had a team of experts working for you — checking recalls, scanning owner forums, analysing market prices, and flagging concerns.
            </p>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              In seconds, you'll know what to look for, what to ask, and whether the price is fair. No account needed. No subscription. Just the information you need, when you need it.
            </p>
          </div>

          {/* HOW WE'RE DIFFERENT */}
          <div className={`p-8 rounded-[2rem] mb-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <h2 className={`text-xs font-black uppercase tracking-[0.2em] mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>How We're Different</h2>
            <div className={`space-y-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <p><strong className={darkMode ? 'text-white' : 'text-black'}>No accounts.</strong> We don't want your email. Just upload and go.</p>
              <p><strong className={darkMode ? 'text-white' : 'text-black'}>No subscriptions.</strong> Pay per report. Use us once or a hundred times — your choice.</p>
              <p><strong className={darkMode ? 'text-white' : 'text-black'}>No data hoarding.</strong> We don't store your screenshots or reports. Privacy by design.</p>
              <p><strong className={darkMode ? 'text-white' : 'text-black'}>Real research, not guesswork.</strong> Our AI searches real sources — it doesn't make things up.</p>
            </div>
          </div>

          {/* WHO WE ARE */}
          <div className={`p-8 rounded-[2rem] mb-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <h2 className={`text-xs font-black uppercase tracking-[0.2em] mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Who We Are</h2>
            <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Listing Lens is built by Listing Lens Labs Pty Ltd, based in Canberra, Australia. We're a small team who got tired of seeing mates get burned buying cars and boats online.
            </p>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We believe everyone deserves access to the kind of research that used to require hours of Googling or expensive professional advice. Now it takes seconds and costs less than a coffee.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a 
              href="/"
              className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all"
            >
              Try It Now
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
