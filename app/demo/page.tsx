'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

function ArrowDownIcon() {
  return (
    <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <polyline points="19 12 12 19 5 12"/>
    </svg>
  );
}

export default function DemoPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      setDarkMode(saved === 'true');
    } else {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(isDark);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
  };

  const bg = darkMode ? '#09090b' : '#fafaf9';
  const text = darkMode ? '#fafafa' : '#18181b';
  const muted = darkMode ? '#a1a1aa' : '#52525b';
  const cardBg = darkMode ? '#18181b' : '#ffffff';
  const border = darkMode ? '#27272a' : '#e7e5e4';
  const blue = '#3b82f6';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: bg, color: text }}>
      
      {/* HEADER */}
      <header style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 50, 
        backgroundColor: darkMode ? 'rgba(9, 9, 11, 0.95)' : 'rgba(250, 250, 249, 0.95)', 
        backdropFilter: 'blur(8px)', 
        borderBottom: '1px solid ' + border 
      }}>
        <div style={{ maxWidth: 896, margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', flexDirection: 'column', gap: 2, textDecoration: 'none' }}>
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: darkMode ? '#71717a' : '#78716c', lineHeight: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 8px rgba(34, 197, 94, 0.5)' }} />
              Online
            </span>
            <span style={{ fontSize: 16, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: darkMode ? '#ffffff' : '#18181b', lineHeight: 1 }}>
              LISTING LENS
            </span>
          </Link>
          <button 
            onClick={toggleDarkMode}
            style={{ 
              padding: 10, 
              borderRadius: '50%', 
              border: 'none', 
              backgroundColor: darkMode ? '#27272a' : '#f5f5f4', 
              color: darkMode ? '#fbbf24' : '#52525b', 
              cursor: 'pointer', 
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 896, margin: '0 auto', padding: '48px 24px' }}>
        
        {/* HERO */}
        <section style={{ textAlign: 'center', marginBottom: 64 }}>
          <h1 style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 16px', lineHeight: 1.1 }}>
            See Listing Lens<br/>in Action
          </h1>
          <p style={{ fontSize: 18, color: muted, maxWidth: 600, margin: '0 auto' }}>
            Watch how we transform a marketplace screenshot into a comprehensive buyer's report in seconds.
          </p>
        </section>

        {/* STEP 1: THE LISTING */}
        <section style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', padding: '6px 12px', backgroundColor: darkMode ? '#27272a' : '#f5f5f4', borderRadius: 6, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>
            Step 1
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 16px' }}>The Listing Screenshot</h2>
          <p style={{ color: muted, marginBottom: 24, lineHeight: 1.6 }}>
            User uploads a screenshot from any marketplace — Facebook, Gumtree, Carsales, anywhere.
          </p>
          <div style={{ 
            padding: 0, 
            backgroundColor: cardBg, 
            border: '2px solid ' + border, 
            borderRadius: 16, 
            overflow: 'hidden'
          }}>
            {/* Mock listing screenshot */}
            <div style={{ 
              padding: 24, 
              backgroundColor: darkMode ? '#1a1a1a' : '#fafafa',
              borderBottom: '1px solid ' + border
            }}>
              <div style={{ 
                width: '100%',
                aspectRatio: '16/9',
                backgroundColor: darkMode ? '#27272a' : '#e5e7eb',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'linear-gradient(45deg, ' + (darkMode ? '#3f3f46' : '#d1d5db') + ' 25%, transparent 25%, transparent 75%, ' + (darkMode ? '#3f3f46' : '#d1d5db') + ' 75%), linear-gradient(45deg, ' + (darkMode ? '#3f3f46' : '#d1d5db') + ' 25%, transparent 25%, transparent 75%, ' + (darkMode ? '#3f3f46' : '#d1d5db') + ' 75%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 10px 10px',
                position: 'relative'
              }}>
                <div style={{ 
                  backgroundColor: darkMode ? 'rgba(9, 9, 11, 0.9)' : 'rgba(255, 255, 255, 0.95)',
                  padding: 32,
                  borderRadius: 12,
                  border: '2px solid ' + border,
                  textAlign: 'center',
                  maxWidth: 400
                }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: text, marginBottom: 8 }}>📸 Example Marketplace Screenshot</p>
                  <p style={{ fontSize: 13, color: muted, marginBottom: 16 }}>
                    User captures any listing from Facebook Marketplace, Gumtree, Carsales, etc.
                  </p>
                  <div style={{ 
                    padding: 12, 
                    backgroundColor: darkMode ? '#27272a' : '#f5f5f4',
                    borderRadius: 8,
                    fontSize: 12,
                    color: muted,
                    fontStyle: 'italic'
                  }}>
                    In production, you would see an actual listing image here
                  </div>
                </div>
              </div>
            </div>
            
            {/* Listing details card */}
            <div style={{ padding: 24 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: text, marginBottom: 8 }}>
                2018 Toyota Camry LE
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 14, color: muted, marginBottom: 16 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 16 }}>💵</span>
                  <strong style={{ color: text }}>$18,500</strong>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 16 }}>🚗</span>
                  87,450 km
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 16 }}>📍</span>
                  Melbourne, VIC
                </span>
              </div>
              <div style={{ 
                padding: 12, 
                backgroundColor: darkMode ? '#27272a' : '#f5f5f4',
                borderRadius: 8,
                fontSize: 13,
                color: muted,
                lineHeight: 1.5
              }}>
                <strong style={{ color: text }}>Seller's description:</strong><br/>
                "Well maintained, second owner, full service history, new tyres recently fitted. Must sell as upgrading to SUV."
              </div>
            </div>
          </div>
        </section>

        {/* ARROW */}
        <div style={{ textAlign: 'center', margin: '32px 0', color: blue }}>
          <ArrowDownIcon />
        </div>

        {/* STEP 2: AI RESEARCH */}
        <section style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', padding: '6px 12px', backgroundColor: darkMode ? '#27272a' : '#f5f5f4', borderRadius: 6, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>
            Step 2
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 16px' }}>AI Searches Real Sources</h2>
          <p style={{ color: muted, marginBottom: 24, lineHeight: 1.6 }}>
            Our AI extracts the listing details and researches actual databases, forums, and market data in seconds.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
            {[
              { title: 'Manufacturer Data', items: ['Safety ratings', 'Recall checks', 'Technical specs', 'Known issues'] },
              { title: 'Owner Forums', items: ['Common complaints', 'Reliability reports', 'Maintenance costs', 'Real experiences'] },
              { title: 'Market Analysis', items: ['25+ similar listings', 'Price comparisons', 'Regional trends', 'Resale values'] },
            ].map((source, idx) => (
              <div key={idx} style={{ 
                padding: 20, 
                backgroundColor: cardBg, 
                border: '1px solid ' + border, 
                borderRadius: 12 
              }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{source.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {source.items.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8, fontSize: 13, color: muted }}>
                      <span style={{ color: '#22c55e', flexShrink: 0, marginTop: 2 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ARROW */}
        <div style={{ textAlign: 'center', margin: '32px 0', color: blue }}>
          <ArrowDownIcon />
        </div>

        {/* STEP 3: THE REPORT */}
        <section style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', padding: '6px 12px', backgroundColor: darkMode ? '#27272a' : '#f5f5f4', borderRadius: 6, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>
            Step 3
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 16px' }}>Your Comprehensive Report</h2>
          <p style={{ color: muted, marginBottom: 24, lineHeight: 1.6 }}>
            Instant analysis with everything you need to make a confident buying decision.
          </p>
          
          <div style={{ 
            padding: 0, 
            backgroundColor: cardBg, 
            border: '3px solid ' + blue, 
            borderRadius: 16,
            overflow: 'hidden'
          }}>
            {/* Report Header */}
            <div style={{ 
              padding: 24, 
              background: 'linear-gradient(135deg, ' + blue + ' 0%, #2563eb 100%)',
              color: '#fff',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>Listing Analysis Report</h3>
                <span style={{ 
                  padding: '4px 12px', 
                  backgroundColor: 'rgba(255,255,255,0.2)', 
                  borderRadius: 6, 
                  fontSize: 12,
                  fontWeight: 700
                }}>
                  VEHICLES
                </span>
              </div>
              <p style={{ fontSize: 14, opacity: 0.9, margin: 0 }}>2018 Toyota Camry LE • Generated in 28 seconds</p>
            </div>

            <div style={{ padding: 32 }}>
              {/* Fair Value */}
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 24 }}>💰</span> Fair Value Estimate
                </h3>
                <div style={{ 
                  padding: 20, 
                  background: darkMode 
                    ? 'linear-gradient(135deg, #166534 0%, #15803d 100%)' 
                    : 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                  borderRadius: 12,
                  border: '2px solid ' + (darkMode ? '#16a34a' : '#22c55e')
                }}>
                  <p style={{ fontSize: 13, color: darkMode ? '#86efac' : '#166534', fontWeight: 600, marginBottom: 4 }}>MARKET RANGE</p>
                  <p style={{ fontSize: 32, fontWeight: 900, color: darkMode ? '#fff' : '#166534', margin: '8px 0', letterSpacing: '-0.02em' }}>
                    $16,800 – $18,200
                  </p>
                  <p style={{ fontSize: 14, color: darkMode ? '#d1fae5' : '#166534', marginBottom: 12, lineHeight: 1.5 }}>
                    Based on analysis of 25 comparable listings in Victoria
                  </p>
                  <div style={{ 
                    padding: 12, 
                    backgroundColor: darkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)',
                    borderRadius: 8,
                    fontSize: 13,
                    color: darkMode ? '#fff' : '#166534'
                  }}>
                    ⚠️ <strong>Price Analysis:</strong> Asking price of $18,500 is <strong>$300-$1,700 above fair market value</strong>. There's room for negotiation.
                  </div>
                </div>
              </div>

              {/* Red Flags */}
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 24 }}>🚩</span> Red Flags & Concerns
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ 
                    padding: 16, 
                    backgroundColor: darkMode ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)', 
                    border: '2px solid ' + (darkMode ? 'rgba(239, 68, 68, 0.4)' : 'rgba(239, 68, 68, 0.3)'), 
                    borderRadius: 12,
                    borderLeft: '4px solid #ef4444'
                  }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#ef4444', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ 
                        display: 'inline-block', 
                        padding: '2px 8px', 
                        backgroundColor: '#ef4444', 
                        color: '#fff', 
                        borderRadius: 4, 
                        fontSize: 11, 
                        fontWeight: 800 
                      }}>HIGH PRIORITY</span>
                      2 Outstanding Recalls
                    </p>
                    <p style={{ fontSize: 13, color: darkMode ? '#fca5a5' : '#991b1b', margin: '0 0 8px', lineHeight: 1.5 }}>
                      <strong>Fuel Pump Recall (2019):</strong> Potential fuel leak hazard. Recall #19V-333<br/>
                      <strong>Airbag Sensor Recall (2020):</strong> May not deploy in crash. Recall #20V-089
                    </p>
                    <p style={{ fontSize: 12, color: darkMode ? '#fecaca' : '#7f1d1d', fontStyle: 'italic', margin: 0 }}>
                      ⚡ Ask seller for proof these recalls were completed before purchase.
                    </p>
                  </div>
                  
                  <div style={{ 
                    padding: 16, 
                    backgroundColor: darkMode ? 'rgba(234, 179, 8, 0.15)' : 'rgba(234, 179, 8, 0.1)', 
                    border: '2px solid ' + (darkMode ? 'rgba(234, 179, 8, 0.4)' : 'rgba(234, 179, 8, 0.3)'), 
                    borderRadius: 12,
                    borderLeft: '4px solid #eab308'
                  }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#eab308', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ 
                        display: 'inline-block', 
                        padding: '2px 8px', 
                        backgroundColor: '#eab308', 
                        color: '#000', 
                        borderRadius: 4, 
                        fontSize: 11, 
                        fontWeight: 800 
                      }}>CAUTION</span>
                      Known Issue: Excessive Oil Consumption
                    </p>
                    <p style={{ fontSize: 13, color: darkMode ? '#fde047' : '#713f12', margin: 0, lineHeight: 1.5 }}>
                      2018 Camry models have reported burning 1 quart of oil per 1,000 miles. Check service records for oil top-ups between changes. Owner forums report this as common issue requiring engine monitoring.
                    </p>
                  </div>
                </div>
              </div>

              {/* Questions to Ask */}
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 24 }}>❓</span> Essential Questions for Seller
                </h3>
                <div style={{ 
                  padding: 20, 
                  backgroundColor: darkMode ? '#27272a' : '#f5f5f4',
                  borderRadius: 12
                }}>
                  {[
                    'Have the 2019 fuel pump recall and 2020 airbag recall been completed? Can you provide documentation?',
                    'What is the oil consumption like? Do you need to add oil between services?',
                    'Can you provide the full service history showing all oil changes and maintenance?',
                    'Why is the vehicle priced $300-$1,700 above the market average for this model and mileage?',
                    'Are there any warning lights on the dashboard or known mechanical issues?',
                    'Has the transmission been serviced according to Toyota schedule?'
                  ].map((q, i) => (
                    <div key={i} style={{ 
                      padding: '12px 0', 
                      borderBottom: i < 5 ? '1px solid ' + border : 'none',
                      display: 'flex',
                      gap: 12
                    }}>
                      <span style={{ 
                        flexShrink: 0,
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: blue,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 700
                      }}>
                        {i + 1}
                      </span>
                      <p style={{ fontSize: 14, color: text, margin: 0, lineHeight: 1.5 }}>{q}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Negotiation Strategy */}
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 24 }}>💡</span> Negotiation Strategy
                </h3>
                <div style={{ 
                  padding: 20, 
                  background: darkMode 
                    ? 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)'
                    : 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                  borderRadius: 12,
                  border: '2px solid ' + blue
                }}>
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: darkMode ? '#93c5fd' : '#1e40af', marginBottom: 4 }}>OPENING OFFER</p>
                    <p style={{ fontSize: 24, fontWeight: 900, color: darkMode ? '#fff' : '#1e40af', margin: 0 }}>$17,200</p>
                    <p style={{ fontSize: 13, color: darkMode ? '#dbeafe' : '#1e40af', marginTop: 4 }}>
                      Cite outstanding recalls and above-market pricing. Start low to create negotiation room.
                    </p>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: darkMode ? '#93c5fd' : '#1e40af', marginBottom: 4 }}>TARGET PRICE</p>
                    <p style={{ fontSize: 24, fontWeight: 900, color: darkMode ? '#fff' : '#1e40af', margin: 0 }}>$17,800</p>
                    <p style={{ fontSize: 13, color: darkMode ? '#dbeafe' : '#1e40af', marginTop: 4 }}>
                      Fair market value with recall discount. Reasonable outcome for both parties.
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: darkMode ? '#93c5fd' : '#1e40af', marginBottom: 4 }}>WALK-AWAY PRICE</p>
                    <p style={{ fontSize: 24, fontWeight: 900, color: darkMode ? '#fff' : '#1e40af', margin: 0 }}>$18,200</p>
                    <p style={{ fontSize: 13, color: darkMode ? '#dbeafe' : '#1e40af', marginTop: 4 }}>
                      Top of market range — only if recalls are completed and oil consumption is documented as normal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ 
          textAlign: 'center', 
          padding: 48, 
          backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)', 
          border: '2px solid ' + (darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'), 
          borderRadius: 16 
        }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 16px' }}>
            Ready to analyze your listing?
          </h2>
          <p style={{ fontSize: 16, color: muted, marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
            Upload any marketplace screenshot and get your comprehensive report in seconds.
          </p>
          <Link 
            href="/" 
            style={{ 
              display: 'inline-block',
              padding: '16px 32px', 
              backgroundColor: blue, 
              color: '#fff', 
              borderRadius: 12, 
              textDecoration: 'none', 
              fontWeight: 700, 
              fontSize: 18
            }}
          >
            Analyze a Listing — $5
          </Link>
          <p style={{ fontSize: 13, color: muted, marginTop: 16 }}>
            No account needed • Instant delivery • Privacy first
          </p>
        </section>

      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid ' + border, marginTop: 64 }}>
        <div style={{ maxWidth: 896, margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', fontSize: 14 }}>
            <Link href="/faq" style={{ color: muted, textDecoration: 'none' }}>FAQ</Link>
            <Link href="/pricing" style={{ color: muted, textDecoration: 'none' }}>Pricing</Link>
            <Link href="/about" style={{ color: muted, textDecoration: 'none' }}>About</Link>
            <Link href="/demo" style={{ color: muted, textDecoration: 'none' }}>Demo</Link>
            <Link href="/partners" style={{ color: muted, textDecoration: 'none' }}>API</Link>
            <Link href="/privacy" style={{ color: muted, textDecoration: 'none' }}>Privacy</Link>
            <Link href="/terms" style={{ color: muted, textDecoration: 'none' }}>Terms</Link>
            <Link href="/contact" style={{ color: muted, textDecoration: 'none' }}>Say Hello</Link>
          </div>
          <p style={{ textAlign: 'center', fontSize: 12, color: muted, margin: 0 }}>
            © {new Date().getFullYear()} Listing Lens. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
