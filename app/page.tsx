'use client';

import { useState, useRef, useEffect } from 'react';

// ============================================
// ICONS
// ============================================

function CarIcon({ size = 24 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-2-2.2-3.2C12.9 5.7 11.8 5 10.5 5H5.8c-1 0-1.9.5-2.4 1.3L1 10"/><path d="M7 17H1v-4c0-1.1.9-2 2-2h10.6"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>;
}
function HomeIcon({ size = 24 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function PhoneIcon({ size = 24 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>;
}
function ShirtIcon({ size = 24 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46 16 2 12 5 8 2 3.62 3.46a2 2 0 0 0-1.34 1.89v.8c0 .74.4 1.42 1.05 1.78L7 10v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V10l3.67-2.07c.65-.36 1.05-1.04 1.05-1.78v-.8a2 2 0 0 0-1.34-1.89z"/></svg>;
}
function WatchIcon({ size = 24 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="6"/><polyline points="12 10 12 12 13 13"/><path d="m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05"/><path d="m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.78-4.05"/></svg>;
}
function PackageIcon({ size = 24 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>;
}
function UploadIcon({ size = 40 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>;
}
function XIcon({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
}
function ChevronDownIcon({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>;
}
function MoonIcon() {
  return <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;
}
function SunIcon() {
  return <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
}
function ShieldIcon() {
  return <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>;
}
function ZapIcon() {
  return <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>;
}
function GlobeIcon() {
  return <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>;
}

// ============================================
// FLAG COMPONENT
// ============================================

function Flag({ region, size = 20 }: { region: { code: string; name: string }; size?: number }) {
  const flagMap: Record<string, string> = {
    AU: 'au', NZ: 'nz', SG: 'sg', HK: 'hk', IN: 'in',
    PH: 'ph', TH: 'th', KR: 'kr', JP: 'jp', EU: 'eu',
    NA: 'us',
  };
  const countryCode = flagMap[region.code];
  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/w40/${countryCode}.png`}
        alt={region.name}
        width={size * 1.33}
        height={size}
        style={{ borderRadius: 2, objectFit: 'cover', display: 'inline-block', verticalAlign: 'middle' }}
      />
    );
  }
  // Globe emoji fallback for catch-all regions
  const globes: Record<string, string> = {
    APAC: '\u{1F30F}',
    SA: '\u{1F30E}',
    MEA: '\u{1F30D}',
  };
  return <span style={{ fontSize: size, lineHeight: 1, verticalAlign: 'middle' }}>{globes[region.code] || '\u{1F310}'}</span>;
}

// ============================================
// CONFIG
// ============================================

const CATEGORIES = [
  { id: 'vehicles', label: 'VEHICLES', Icon: CarIcon, description: 'Cars, bikes, boats, caravans, jet skis, e-bikes, trailers', useWebSearch: true },
  { id: 'property', label: 'PROPERTY', Icon: HomeIcon, description: 'Houses, apartments, land, commercial', useWebSearch: true },
  { id: 'electronics', label: 'ELECTRONICS', Icon: PhoneIcon, description: 'Phones, laptops, consoles, cameras, audio', useWebSearch: true },
  { id: 'fashion', label: 'FASHION', Icon: ShirtIcon, description: 'Clothing, bags, shoes, designer items', useWebSearch: true },
  { id: 'watches-jewellery', label: 'WATCHES & JEWELLERY', Icon: WatchIcon, description: 'Timepieces, rings, luxury accessories', useWebSearch: true },
  { id: 'everything-else', label: 'EVERYTHING ELSE', Icon: PackageIcon, description: 'Furniture, instruments, tools, collectibles, art, appliances', useWebSearch: false },
];

const REGION_GROUPS = [
  {
    label: 'ASIA-PACIFIC',
    regions: [
      { code: 'AU', name: 'Australia' },
      { code: 'NZ', name: 'New Zealand' },
      { code: 'SG', name: 'Singapore' },
      { code: 'HK', name: 'Hong Kong' },
      { code: 'IN', name: 'India' },
      { code: 'PH', name: 'Philippines' },
      { code: 'TH', name: 'Thailand' },
      { code: 'KR', name: 'South Korea' },
      { code: 'JP', name: 'Japan' },
      { code: 'APAC', name: 'Asia-Pacific' },
    ]
  },
  {
    label: 'GLOBAL',
    regions: [
      { code: 'EU', name: 'Europe' },
      { code: 'NA', name: 'Americas' },
      { code: 'SA', name: 'South America' },
      { code: 'MEA', name: 'Middle East & Africa' },
    ]
  }
];

const ALL_REGIONS = REGION_GROUPS.flatMap(g => g.regions);

// ============================================
// MAIN COMPONENT
// ============================================

export default function ListingLensHome() {
  const [dark, setDark] = useState(false);
  const [cat, setCat] = useState<string | null>(null);
  const [region, setRegion] = useState(ALL_REGIONS[0]);
  const [showRegions, setShowRegions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [img, setImg] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const ddRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) {
        setShowRegions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const onFile = (f: File) => {
    if (!f.type.startsWith('image/')) return;
    const r = new FileReader();
    r.onload = (e) => {
      setImg(e.target?.result as string);
      setFile(f);
    };
    r.readAsDataURL(f);
  };

  const clear = () => {
    setImg(null);
    setFile(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const analyze = async () => {
    if (!file || !cat) return;
    setBusy(true);
    setStep('Reading your listing...');
    try {
      const fd = new FormData();
      fd.append('image', file);
      fd.append('category', cat);
      fd.append('region', region.code);
      fd.append('useWebSearch', String(CATEGORIES.find(c => c.id === cat)?.useWebSearch ?? true));
      setStep('Analyzing screenshot...');
      const res = await fetch('/api/create-checkout', { method: 'POST', body: fd });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed');
      }
      const data = await res.json();
      setStep('Redirecting to checkout...');
      window.location.href = data.checkoutUrl;
    } catch (err: any) {
      alert(err.message || 'Failed to analyze');
    } finally {
      setBusy(false);
      setStep('');
    }
  };

  // Theme
  const bg = dark ? '#09090b' : '#fafaf9';
  const cardBg = dark ? '#18181b' : '#ffffff';
  const border = dark ? '#27272a' : '#e7e5e4';
  const text = dark ? '#ffffff' : '#18181b';
  const muted = dark ? '#a1a1aa' : '#78716c';
  const catBrd = dark ? '#3f3f46' : '#d6d3d1';
  const blue = '#2563eb';

  const btnStyle = (selected: boolean): React.CSSProperties => ({
    padding: 16,
    borderRadius: 12,
    border: '2px solid ' + (selected ? blue : catBrd),
    backgroundColor: selected ? blue : cardBg,
    color: selected ? '#fff' : text,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 8,
    transition: 'all 0.2s',
    fontSize: 13,
    fontWeight: 700,
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: bg, color: text, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', transition: 'all 0.3s' }}>

      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: cardBg, borderBottom: '1px solid ' + border }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: muted, margin: 0 }}>Advocate Mode</p>
            <h1 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>LISTING LENS</h1>
          </div>
          <button onClick={() => setDark(!dark)} style={{ padding: 8, borderRadius: '50%', border: 'none', backgroundColor: 'transparent', color: text, cursor: 'pointer' }}>
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '32px 16px' }}>

        {/* HERO */}
        <section style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 52, fontWeight: 900, letterSpacing: '-0.03em', margin: 0, lineHeight: 1 }}>
            {"DON\u2019T BUY"}
          </h2>
          <h2 style={{ fontSize: 52, fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 24px', lineHeight: 1 }}>
            BLIND<span style={{ color: '#3b82f6' }}>.</span>
          </h2>
          <p style={{ fontSize: 18, fontWeight: 500, color: muted, marginBottom: 16 }}>
            {"Your Personal Online Buyer\u2019s Advocate"}
          </p>
          <p style={{ color: muted, maxWidth: 440, margin: '0 auto 24px', lineHeight: 1.6 }}>
            {"Screenshot any listing. Get the red flags, fair value, and questions you should be asking \u2014 for less than a cup of coffee."}
          </p>
          <p style={{ fontSize: 14, color: muted }}>
            {"Instant Analysis \u00B7 No Account Needed \u00B7 "}
            <button onClick={() => setShowModal(true)} style={{ color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3, fontSize: 14 }}>
              How does this work?
            </button>
          </p>
        </section>

        {/* REGION */}
        <section style={{ marginBottom: 32 }}>
          <p style={{ textAlign: 'center', fontSize: 13, fontWeight: 600, color: muted, marginBottom: 12, letterSpacing: '0.02em' }}>
            WHERE ARE YOU BUYING?
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative' }} ref={ddRef}>
              <button
                onClick={() => setShowRegions(!showRegions)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10, backgroundColor: cardBg, border: '1px solid ' + border, color: text, cursor: 'pointer', fontSize: 15, fontWeight: 500 }}
              >
                <Flag code={region.code} size={22} />
                <span>{region.name}</span>
                <ChevronDownIcon />
              </button>
              {showRegions && (
                <div style={{ position: 'absolute', top: '100%', marginTop: 8, left: '50%', transform: 'translateX(-50%)', backgroundColor: cardBg, border: '1px solid ' + border, borderRadius: 12, boxShadow: '0 10px 40px rgba(0,0,0,0.25)', overflow: 'hidden', zIndex: 50, minWidth: 240, maxHeight: 420, overflowY: 'auto' }}>
                  {REGION_GROUPS.map((group) => (
                    <div key={group.label}>
                      <div style={{ padding: '10px 16px 6px', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: muted, textTransform: 'uppercase' }}>
                        {group.label}
                      </div>
                      {group.regions.map((r) => (
                        <button
                          key={r.code}
                          onClick={() => { setRegion(r); setShowRegions(false); }}
                          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', border: 'none', backgroundColor: region.code === r.code ? blue : 'transparent', color: region.code === r.code ? '#fff' : text, cursor: 'pointer', fontSize: 14, textAlign: 'left' }}
                        >
                          <Flag code={r.code} size={20} />
                          <span>{r.name}</span>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section style={{ marginBottom: 32 }}>
          <h3 style={{ textAlign: 'center', fontWeight: 700, marginBottom: 16, color: muted, fontSize: 14, letterSpacing: '0.02em' }}>
            WHAT ARE YOU LOOKING AT BUYING?
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {CATEGORIES.map((c) => {
              const sel = cat === c.id;
              return (
                <button key={c.id} onClick={() => setCat(c.id)} style={btnStyle(sel)}>
                  <c.Icon size={24} />
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>
          {cat && (
            <p style={{ textAlign: 'center', fontSize: 13, marginTop: 16, color: muted }}>
              {CATEGORIES.find(c => c.id === cat)?.description}
            </p>
          )}
        </section>

        {/* UPLOAD */}
        {cat && (
          <section style={{ marginBottom: 32 }}>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) onFile(f); }}
              style={{ position: 'relative', border: '2px dashed ' + (img ? '#3b82f6' : border), borderRadius: 16, padding: 32, textAlign: 'center', backgroundColor: img ? 'rgba(59,130,246,0.08)' : 'transparent', transition: 'all 0.2s' }}
            >
              {img ? (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img src={img} alt="Listing" style={{ maxHeight: 256, borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }} />
                  <button onClick={clear} style={{ position: 'absolute', top: 8, right: 8, padding: 4, backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <XIcon size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ color: muted, marginBottom: 16 }}><UploadIcon /></div>
                  <p style={{ fontWeight: 500, marginBottom: 8 }}>Drop your screenshot here</p>
                  <p style={{ fontSize: 14, color: muted }}>or click to browse</p>
                  <input ref={fileRef} type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                </>
              )}
            </div>
          </section>
        )}

        {/* ANALYZE */}
        {img && cat && (
          <section style={{ marginBottom: 32 }}>
            <button onClick={analyze} disabled={busy} style={{ width: '100%', padding: 16, borderRadius: 12, border: 'none', backgroundColor: busy ? '#52525b' : blue, color: '#fff', fontSize: 18, fontWeight: 700, cursor: busy ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
              {busy ? step : 'ANALYZE THIS LISTING \u2192'}
            </button>
            <p style={{ textAlign: 'center', fontSize: 14, marginTop: 12, color: muted }}>
              {"$4.99 AUD \u00B7 Full report in under 60 seconds"}
            </p>
          </section>
        )}

        {/* TRUST */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, padding: '32px 0', borderTop: '1px solid ' + border }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#3b82f6', display: 'flex', justifyContent: 'center', marginBottom: 8 }}><ShieldIcon /></div>
            <p style={{ fontSize: 12, fontWeight: 600, margin: 0 }}>Privacy First</p>
            <p style={{ fontSize: 12, color: muted, margin: '4px 0 0' }}>Deleted in 5 mins</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#eab308', display: 'flex', justifyContent: 'center', marginBottom: 8 }}><ZapIcon /></div>
            <p style={{ fontSize: 12, fontWeight: 600, margin: 0 }}>Instant Analysis</p>
            <p style={{ fontSize: 12, color: muted, margin: '4px 0 0' }}>AI-powered</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#22c55e', display: 'flex', justifyContent: 'center', marginBottom: 8 }}><GlobeIcon /></div>
            <p style={{ fontSize: 12, fontWeight: 600, margin: 0 }}>Global Coverage</p>
            <p style={{ fontSize: 12, color: muted, margin: '4px 0 0' }}>14 regions</p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{ backgroundColor: cardBg, borderTop: '1px solid ' + border, padding: '24px 0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, fontSize: 14 }}>
            {[
              { label: 'FAQ', href: '/faq' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
              { label: 'API', href: '/partners' },
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
            ].map(l => (
              <a key={l.label} href={l.href} style={{ color: muted, textDecoration: 'none' }}>{l.label}</a>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: 12, marginTop: 16, color: muted }}>
            {"\u00A9 2026 Listing Lens"}
          </p>
        </div>
      </footer>

      {/* HOW IT WORKS MODAL */}
      {showModal && (
        <div onClick={() => setShowModal(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: cardBg, borderRadius: 16, maxWidth: 480, width: '100%', padding: 24, border: '1px solid ' + border, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>How It Works</h3>
              <button onClick={() => setShowModal(false)} style={{ padding: 4, borderRadius: '50%', border: 'none', backgroundColor: 'transparent', color: text, cursor: 'pointer' }}>
                <XIcon />
              </button>
            </div>

            {/* STEP 1 */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: blue, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0, fontSize: 14 }}>1</div>
              <div>
                <h4 style={{ fontWeight: 700, margin: 0 }}>Screenshot Any Listing</h4>
                <p style={{ fontSize: 14, color: muted, margin: '4px 0 0', lineHeight: 1.5 }}>{"From Carsales, Facebook Marketplace, Gumtree, REA, OLX \u2014 anywhere."}</p>
              </div>
            </div>

            {/* STEP 2 */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: blue, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0, fontSize: 14 }}>2</div>
              <div>
                <h4 style={{ fontWeight: 700, margin: 0 }}>AI Analysis</h4>
                <p style={{ fontSize: 14, color: muted, margin: '4px 0 0', lineHeight: 1.5 }}>We extract the details, search market data, and identify red flags automatically.</p>
              </div>
            </div>

            {/* STEP 3 */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: blue, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0, fontSize: 14 }}>3</div>
              <div>
                <h4 style={{ fontWeight: 700, margin: 0 }}>Get Your Report</h4>
                <p style={{ fontSize: 14, color: muted, margin: '4px 0 0', lineHeight: 1.5 }}>{"Fair value estimate, questions to ask, negotiation tips \u2014 everything you need."}</p>
              </div>
            </div>

            {/* PRIVACY BOX */}
            <div style={{ padding: 16, borderRadius: 12, backgroundColor: dark ? '#27272a' : '#f5f5f4', marginBottom: 24 }}>
              <p style={{ fontSize: 14, color: muted, margin: 0, lineHeight: 1.5 }}>
                <strong style={{ color: text }}>Privacy First:</strong>{" Your screenshots are automatically deleted after 5 minutes. We never store or share your data."}
              </p>
            </div>

            {/* DIVIDER */}
            <div style={{ height: 1, backgroundColor: border, margin: '0 0 24px' }} />

            {/* FAQ: SINGLE SCREENSHOT */}
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontWeight: 700, margin: '0 0 8px', fontSize: 15 }}>
                {"\u{1F4F8}"} Does this really work from a single screenshot?
              </h4>
              <p style={{ fontSize: 14, color: muted, margin: 0, lineHeight: 1.6 }}>
                {"Yes \u2014 and here\u2019s how. Our AI reads your screenshot the way a human expert would: it identifies the make, model, year, price, location, and every other detail visible in the listing. It then takes that information and searches real, publicly available sources \u2014 manufacturer recall databases, owner forums, review sites, market listings, and pricing guides \u2014 all in seconds. You\u2019d find the same information yourself if you spent hours searching across dozens of websites. We just do it instantly."}
              </p>
            </div>

            {/* FAQ: SCRAPING / LEGALITY */}
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontWeight: 700, margin: '0 0 8px', fontSize: 15 }}>
                {"\u{1F512}"} Does this scrape websites or do anything dodgy?
              </h4>
              <p style={{ fontSize: 14, color: muted, margin: 0, lineHeight: 1.6 }}>
                {"Absolutely not. Listing Lens does not scrape, crawl, or access any website in an unauthorised way. When we research your listing, our AI searches publicly available information the same way you would using a search engine \u2014 recall databases, owner forums, review sites, and market data that anyone can freely access. We don\u2019t log into any platform, bypass any paywalls, or collect anyone\u2019s personal data. Your screenshot is processed, your report is generated, and your image is automatically deleted within minutes. Your privacy isn\u2019t just a feature \u2014 it\u2019s how we built this from day one."}
              </p>
            </div>

            <button onClick={() => setShowModal(false)} style={{ width: '100%', padding: 12, backgroundColor: blue, color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
