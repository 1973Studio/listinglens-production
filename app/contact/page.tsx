'use client';

import React, { useState, useEffect } from 'react';

export default function Contact() {
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
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

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

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        
        <div className="w-full max-w-md">
          
          {/* HERO */}
          <div className="text-center mb-10">
            <p className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Contact</p>
            <h1 className={`text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-4 ${darkMode ? 'text-white' : ''}`}>
              Get In Touch<span className="text-blue-600">.</span>
            </h1>
            <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Questions, feedback, or partnership enquiries — we'd love to hear from you.
            </p>
          </div>

          {/* SUCCESS MESSAGE */}
          {submitted ? (
            <div className={`p-8 rounded-[2rem] text-center ${darkMode ? 'bg-gray-800' : 'bg-green-50 border-2 border-green-100'}`}>
              <p className="text-4xl mb-4">✅</p>
              <h2 className={`text-xl font-black mb-2 ${darkMode ? 'text-white' : 'text-green-900'}`}>Message Sent!</h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-green-700'}`}>
                Thanks for reaching out. We'll get back to you as soon as possible.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-6 text-blue-600 font-bold text-sm hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            /* CONTACT FORM */
            <form 
              name="contact" 
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Netlify hidden fields */}
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don't fill this out: <input name="bot-field" />
                </label>
              </p>

              {/* Department Dropdown */}
              <div>
                <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  What can we help with?
                </label>
                <select 
                  name="department" 
                  required
                  className={`w-full p-4 rounded-xl border-2 text-sm font-medium appearance-none bg-no-repeat bg-right ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white' 
                      : 'bg-white border-gray-100 text-gray-800'
                  } focus:border-blue-600 focus:outline-none transition-colors`}
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center' }}
                >
                  <option value="">Select an option...</option>
                  <option value="general">💬 General Enquiry</option>
                  <option value="support">🛟 Support / Help with a Report</option>
                  <option value="partnerships">🤝 Partnerships & API</option>
                  <option value="feedback">💡 Feedback & Suggestions</option>
                  <option value="media">📰 Media & Press</option>
                </select>
              </div>

              {/* Name */}
              <div>
                <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Your Name
                </label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  placeholder="John Smith"
                  className={`w-full p-4 rounded-xl border-2 text-sm ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-600' 
                      : 'bg-white border-gray-100 text-gray-800 placeholder-gray-300'
                  } focus:border-blue-600 focus:outline-none transition-colors`}
                />
              </div>

              {/* Email */}
              <div>
                <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Your Email
                </label>
                <input 
                  type="email" 
                  name="email" 
                  required
                  placeholder="john@example.com"
                  className={`w-full p-4 rounded-xl border-2 text-sm ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-600' 
                      : 'bg-white border-gray-100 text-gray-800 placeholder-gray-300'
                  } focus:border-blue-600 focus:outline-none transition-colors`}
                />
              </div>

              {/* Message */}
              <div>
                <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Message
                </label>
                <textarea 
                  name="message" 
                  required
                  rows={5}
                  placeholder="How can we help?"
                  className={`w-full p-4 rounded-xl border-2 text-sm resize-none ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-600' 
                      : 'bg-white border-gray-100 text-gray-800 placeholder-gray-300'
                  } focus:border-blue-600 focus:outline-none transition-colors`}
                />
              </div>

              {/* Submit */}
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 active:scale-[0.98] transition-all"
              >
                Send Message
              </button>
            </form>
          )}

          {/* LOCATION */}
          <div className={`mt-12 text-center text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            <p className="font-bold uppercase tracking-widest mb-1">Made in</p>
            <p>Australia 🇦🇺</p>
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
