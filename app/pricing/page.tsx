'use client';

import React from 'react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* HEADER */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-6 py-4 flex justify-between items-center z-40">
        <a href="/" className="text-sm font-black tracking-widest uppercase">LISTING LENS</a>
        <a href="/" className="px-5 py-2 text-xs font-black border border-gray-200 rounded-full hover:bg-gray-50 transition-all">
          GET STARTED
        </a>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        
        {/* HERO */}
        <div className="text-center mb-16">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">TRANSPARENT PRICING</p>
          <h1 className="text-5xl font-black tracking-tighter mb-4">
            $3.95<span className="text-gray-300 text-2xl ml-2">AUD</span>
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            One price. Every category. Full report.<br />
            Less than your morning coffee.
          </p>
        </div>

        {/* WHY THIS PRICE */}
        <section className="mb-16">
          <h2 className="text-xl font-black uppercase tracking-tight mb-6">Why $3.95?</h2>
          <div className="bg-gray-50 rounded-2xl p-8 space-y-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              We wanted a price that removes all friction. When you're about to spend $40,000 on a car or $800,000 on a house, 
              the last thing you need is to hesitate over a research tool.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>$3.95 is an impulse decision.</strong> It's less than a flat white. Less than a Big Mac meal. 
              Less than parking for an hour in the CBD.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              But the insights? They could save you thousands — or stop you from making a $50,000 mistake.
            </p>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="mb-16">
          <h2 className="text-xl font-black uppercase tracking-tight mb-6">The Alternative Costs</h2>
          <div className="overflow-hidden rounded-2xl border border-gray-100">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-black uppercase text-[10px] tracking-widest text-gray-500">Service</th>
                  <th className="text-right p-4 font-black uppercase text-[10px] tracking-widest text-gray-500">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-4">
                    <p className="font-bold">Pre-purchase vehicle inspection</p>
                    <p className="text-xs text-gray-400">Mobile mechanic visit</p>
                  </td>
                  <td className="p-4 text-right font-bold text-gray-900">$300 – $800</td>
                </tr>
                <tr>
                  <td className="p-4">
                    <p className="font-bold">PPSR check (written-off/stolen)</p>
                    <p className="text-xs text-gray-400">Government database search</p>
                  </td>
                  <td className="p-4 text-right font-bold text-gray-900">$2 – $25</td>
                </tr>
                <tr>
                  <td className="p-4">
                    <p className="font-bold">Buyer's agent (property)</p>
                    <p className="text-xs text-gray-400">Full-service representation</p>
                  </td>
                  <td className="p-4 text-right font-bold text-gray-900">$5,000 – $15,000</td>
                </tr>
                <tr>
                  <td className="p-4">
                    <p className="font-bold">Building & pest inspection</p>
                    <p className="text-xs text-gray-400">Professional property report</p>
                  </td>
                  <td className="p-4 text-right font-bold text-gray-900">$400 – $700</td>
                </tr>
                <tr>
                  <td className="p-4">
                    <p className="font-bold">Marine survey</p>
                    <p className="text-xs text-gray-400">Professional vessel inspection</p>
                  </td>
                  <td className="p-4 text-right font-bold text-gray-900">$500 – $2,000</td>
                </tr>
                <tr>
                  <td className="p-4">
                    <p className="font-bold">Hours of your own research</p>
                    <p className="text-xs text-gray-400">Forums, reviews, comparisons</p>
                  </td>
                  <td className="p-4 text-right font-bold text-gray-900">Your time (priceless)</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="p-4">
                    <p className="font-black text-blue-600">Listing Lens Report</p>
                    <p className="text-xs text-blue-400">AI-powered instant analysis</p>
                  </td>
                  <td className="p-4 text-right font-black text-blue-600 text-lg">$3.95</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center italic">
            We don't replace professional inspections — we help you decide if a listing is worth your time before you book one.
          </p>
        </section>

        {/* WHAT'S INCLUDED */}
        <section className="mb-16">
          <h2 className="text-xl font-black uppercase tracking-tight mb-6">What's In Your Report</h2>
          <div className="grid gap-4">
            {[
              { icon: '📊', title: 'Market Analysis', desc: 'Real-time price comparison against current listings in your region. Is it priced fair, high, or suspiciously low?' },
              { icon: '🚩', title: 'Red Flags', desc: 'Specific concerns we found — from listing anomalies to known issues with this make/model/type.' },
              { icon: '✅', title: 'Green Flags', desc: 'The positives. What makes this listing worth considering.' },
              { icon: '⚠️', title: 'Recall Check', desc: 'Active safety recalls and manufacturer notices you need to know about.' },
              { icon: '👥', title: 'Owner Insights', desc: 'What real owners say — common praise, common complaints, reliability consensus.' },
              { icon: '❓', title: 'Questions for the Seller', desc: '5 targeted questions to ask, based on our analysis of this specific listing.' },
              { icon: '💪', title: 'Negotiation Tips', desc: 'Leverage points backed by data. How to negotiate the price down.' },
              { icon: '⚖️', title: 'The Verdict', desc: 'Our recommendation: Buy, Negotiate, Caution, or Walk Away — with a confidence score.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-bold text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXAMPLE REPORT PREVIEW */}
        <section className="mb-16">
          <h2 className="text-xl font-black uppercase tracking-tight mb-6">Example Report</h2>
          <div className="border-2 border-gray-100 rounded-2xl overflow-hidden">
            
            {/* Header Card */}
            <div className="bg-black text-white p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Vehicle Report</p>
                  <h3 className="text-lg font-black uppercase italic">2019 Toyota RAV4 GXL Hybrid</h3>
                  <p className="text-gray-400 text-xs">Sydney, NSW</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-blue-500">78</p>
                  <p className="text-[9px] uppercase tracking-widest text-gray-500">Score</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800 text-sm">
                <div>
                  <p className="text-[9px] text-gray-500 uppercase">Listed</p>
                  <p className="font-bold">$38,990</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 uppercase">Fair Value</p>
                  <p className="font-bold text-blue-400">$35,500 – $39,000</p>
                </div>
              </div>
            </div>

            {/* Verdict */}
            <div className="bg-blue-600 text-white p-4">
              <p className="text-[9px] uppercase tracking-widest opacity-70 mb-1">The Verdict</p>
              <p className="font-black uppercase">NEGOTIATE</p>
              <p className="text-xs opacity-90 mt-1">Solid vehicle at top of market range. Use the service history gap to negotiate $2,000–3,000 off.</p>
            </div>

            {/* Sample Sections */}
            <div className="p-6 space-y-4">
              <div className="bg-red-50 p-4 rounded-xl">
                <p className="text-[9px] font-bold text-red-600 uppercase tracking-widest mb-2">🚩 Concerns (3)</p>
                <ul className="text-xs text-red-900 space-y-1">
                  <li>• <strong>MEDIUM:</strong> No service history mentioned in listing</li>
                  <li>• <strong>LOW:</strong> Single owner claim not verifiable from screenshot</li>
                  <li>• <strong>LOW:</strong> Aftermarket wheels may indicate modifications</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-xl">
                <p className="text-[9px] font-bold text-green-600 uppercase tracking-widest mb-2">✅ Positives (2)</p>
                <ul className="text-xs text-green-900 space-y-1">
                  <li>• Hybrid model holds value well — strong resale</li>
                  <li>• Low km for age (67,450 km over 5 years = 13,490/year)</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-2">❓ Ask the Seller</p>
                <ol className="text-xs text-gray-700 space-y-1 list-decimal list-inside">
                  <li>Can you provide the full service history with receipts?</li>
                  <li>Has the hybrid battery been inspected or replaced?</li>
                  <li>Why are you selling?</li>
                </ol>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center italic">
            This is a simplified preview. Actual reports include more detail and are tailored to each listing.
          </p>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <a 
            href="/"
            className="inline-block bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all"
          >
            Try It Now — $3.95
          </a>
          <p className="text-xs text-gray-400 mt-4">No subscription. No account required. Pay per report.</p>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="p-10 text-center border-t border-gray-50">
        <div className="flex justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">
          <a href="/faq" className="hover:text-black transition-colors">FAQ</a>
          <a href="/pricing" className="hover:text-black transition-colors">Pricing</a>
          <a href="/about" className="hover:text-black transition-colors">About</a>
          <a href="/contact" className="hover:text-black transition-colors">Contact</a>
        </div>
        <p className="text-[9px] font-bold text-gray-200 uppercase tracking-widest">© 2026 Listing Lens Labs Pty Ltd</p>
      </footer>
    </div>
  );
}
