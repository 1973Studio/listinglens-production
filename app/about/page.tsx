'use client';

import React, { useState, useEffect } from 'react';

export default function About() {
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

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'} flex flex-col selection:bg-blue-100 transition-colors duration-300`}>
      
      {/* HEADER - Consistent across all pages */}
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
            <h2 className={`text-xs font-black uppercase tracking-[0.2em] mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Why We Built This</h2>
            <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Listing Lens started with a simple frustration: buying a used car and realising there had to be a better way than just trusting everything the seller was telling me.
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

      {/* FOOTER - Consistent across all pages */}
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
