'use client';

import React, { useState, useRef, useEffect } from 'react';

type Category = 'property' | 'motors' | 'marine' | 'aircraft' | null;

export default function ListingLens() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<Category>(null);
  const [region, setRegion] = useState('');
  const [regionFlag, setRegionFlag] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');
  const [teaserData, setTeaserData] = useState<any>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [reportData, setReportData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- CHECK FOR STRIPE RETURN ---
  useEffect(() => {
    window.scrollTo(0, 1);
    document.body.style.overscrollBehavior = 'none';

    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get('session_id');
    const cancelled = query.get('cancelled');

    if (cancelled) {
      const savedCategory = localStorage.getItem('ll_category') as Category;
      const savedRegion = localStorage.getItem('ll_region');
      const savedRegionFlag = localStorage.getItem('ll_regionFlag');

      if (savedCategory) {
        setCategory(savedCategory);
        setRegion(savedRegion || 'AU');
        setRegionFlag(savedRegionFlag || 'au');
        setStep(1);
        setError("Payment cancelled. Please try again.");
      }
      window.history.replaceState({}, '', window.location.pathname);
      return;
    }

    if (sessionId) {
      const savedCategory = localStorage.getItem('ll_category') as Category;
      const savedRegion = localStorage.getItem('ll_region');
      const savedRegionFlag = localStorage.getItem('ll_regionFlag');

      setCategory(savedCategory || 'motors');
      setRegion(savedRegion || 'AU');
      setRegionFlag(savedRegionFlag || 'au');
      setStep(5);
      setIsProcessing(true);
      setProcessingMessage('Payment verified. Generating your full report...');

      generateFullReport(sessionId);
      
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  // --- GENERATE TEASER (After upload) ---
  const generateTeaser = async (file: File) => {
    setIsProcessing(true);
    setProcessingMessage('Reading your listing...');

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("category", category || "motors");
      formData.append("region", region || "AU");

      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to analyze');
      }

      const data = await response.json();
      
      localStorage.setItem('ll_category', category || 'motors');
      localStorage.setItem('ll_region', region);
      localStorage.setItem('ll_regionFlag', regionFlag);

      setTeaserData(data.teaser);
      setCheckoutUrl(data.checkoutUrl);
      setStep(4);

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to analyze screenshot');
    } finally {
      setIsProcessing(false);
    }
  };

  // --- GENERATE FULL REPORT (After payment) ---
  const generateFullReport = async (sessionId: string) => {
    try {
      const response = await fetch('/api/complete-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId }),
      });

      if (response.status === 402) {
        setError("Payment verification failed. Please contact support.");
        setIsProcessing(false);
        return;
      }

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Report generation failed');
      }

      const data = await response.json();
      setReportData(data);
      setStep(6);

      localStorage.removeItem('ll_category');
      localStorage.removeItem('ll_region');
      localStorage.removeItem('ll_regionFlag');

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate report. Please contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  // --- HANDLERS ---
  const handleCategorySelect = (cat: Category) => {
    setSelectedCategory(cat);
    setTimeout(() => {
      setCategory(cat);
      setStep(2);
      setSelectedCategory(null);
    }, 700);
  };

  const handleRegionSelect = (reg: string, flag: string) => {
    setSelectedRegion(reg);
    setTimeout(() => {
      setRegion(reg);
      setRegionFlag(flag);
      setStep(3);
      setSelectedRegion(null);
    }, 700);
  };

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      generateTeaser(file);
    }
  };

  const handlePay = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  const reset = () => {
    setStep(1);
    setCategory(null);
    setSelectedCategory(null);
    setSelectedRegion(null);
    setRegion('');
    setRegionFlag('');
    setPreview(null);
    setTeaserData(null);
    setCheckoutUrl(null);
    setReportData(null);
    setError(null);
    localStorage.removeItem('ll_category');
    localStorage.removeItem('ll_region');
    localStorage.removeItem('ll_regionFlag');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-blue-100">
      
      {/* TOP BREADCRUMB */}
      <div className="fixed top-2 left-0 w-full px-6 flex justify-between z-50 pointer-events-none">
        <div className="text-[8px] font-black uppercase tracking-[0.3em] opacity-20">
          {category ? `${category}` : 'ADVOCATE MODE'} {region && `• ${region}`}
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-6 py-4 flex justify-between items-center z-40">
        <div className="flex items-center gap-3">
          <span className="text-sm font-black tracking-widest uppercase">LISTING LENS</span>
          {regionFlag && regionFlag !== 'global' && (
            <img 
              src={`https://flagcdn.com/w40/${regionFlag}.png`}
              alt={region}
              className="w-6 h-4 object-cover rounded shadow-sm"
            />
          )}
        </div>
        {step > 1 && step < 5 && !isProcessing && (
          <button onClick={() => setStep(step - 1)} className="px-5 py-2 text-xs font-black border border-gray-200 rounded-full active:scale-95 transition-all">BACK</button>
        )}
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        
        {/* ERROR DISPLAY */}
        {error && (
          <div className="w-full max-w-md mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-center">
            <p className="text-sm text-red-700">{error}</p>
            <button onClick={() => { setError(null); reset(); }} className="mt-2 text-xs text-red-500 underline">Start Over</button>
          </div>
        )}

        {/* ============ STEP 1: HERO + CATEGORY ============ */}
        {step === 1 && (
          <div className="w-full max-w-lg text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 px-4">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.85] mb-6">DON'T BUY<br/>BLIND<span className="text-blue-600">.</span></h1>
            
            <div className="mb-10">
              <p className="text-lg font-bold text-gray-400 uppercase tracking-tight italic mb-3">Your Personal Buyer's Advocate</p>
              <p className="text-base text-gray-500 leading-relaxed">Screenshot any listing. We'll research red flags, market value, and owner insights in seconds.</p>
            </div>

            <p className="text-sm font-black text-blue-600 uppercase tracking-widest mb-4">Choose Category to Begin</p>
            
            <div className="grid grid-cols-2 gap-4 w-full">
              {(['motors', 'property', 'marine', 'aircraft'] as const).map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => handleCategorySelect(cat)} 
                  className={`py-6 rounded-2xl font-black text-base tracking-wider border-2 transition-all uppercase
                    ${selectedCategory === cat ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-100 hover:border-blue-600'}`}
                >
                  {cat === 'motors' ? 'Vehicles' : cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ============ STEP 2: REGION ============ */}
        {step === 2 && (
          <div className="w-full max-w-lg text-center animate-in fade-in slide-in-from-bottom-4 px-4">
            <h2 className="text-2xl font-black tracking-tighter uppercase italic mb-8">Where are you purchasing from?</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { id: 'AU', code: 'au', name: 'Australia' }, 
                { id: 'NZ', code: 'nz', name: 'New Zealand' }, 
                { id: 'UK', code: 'gb', name: 'United Kingdom' }, 
                { id: 'SG', code: 'sg', name: 'Singapore' }, 
                { id: 'CA', code: 'ca', name: 'Canada' }, 
                { id: 'HK', code: 'hk', name: 'Hong Kong' }, 
                { id: 'KR', code: 'kr', name: 'South Korea' }, 
                { id: 'JP', code: 'jp', name: 'Japan' }
              ].map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => handleRegionSelect(item.id, item.code)} 
                  className={`bg-white rounded-3xl p-6 flex flex-col items-center gap-3 transition-all duration-300 active:scale-95 shadow-sm border-2 ${
                    selectedRegion === item.id 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-100 hover:border-blue-600'
                  }`}
                >
                  <img 
                    src={`https://flagcdn.com/w80/${item.code}.png`}
                    alt={item.name}
                    className={`w-14 h-10 object-cover rounded shadow-sm transition-all duration-300 ${
                      selectedRegion === item.id ? '' : 'grayscale'
                    }`}
                  />
                  <span className="text-sm font-black">{item.name}</span>
                </button>
              ))}
            </div>
            <button 
              onClick={() => handleRegionSelect('GLOBAL', 'global')} 
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all"
            >
              🌐 Global Lens
            </button>
          </div>
        )}

        {/* ============ STEP 3: UPLOAD ============ */}
        {step === 3 && !isProcessing && (
          <div className="w-full max-w-md text-center animate-in fade-in px-4">
            <h2 className="text-2xl font-black tracking-tighter uppercase italic mb-6">Upload Your Screenshot</h2>
            
            <div 
              onClick={() => fileInputRef.current?.click()} 
              className="p-10 border-2 border-dashed border-gray-200 rounded-[2rem] bg-white hover:border-blue-600 transition-all cursor-pointer"
            >
              <input 
                ref={fileInputRef} 
                type="file" 
                accept="image/*" 
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} 
                className="hidden" 
              />
              <p className="text-base font-black text-blue-600 uppercase tracking-widest mb-3">Drop Screenshot Here</p>
              <p className="text-sm text-gray-400 font-medium mb-6">Any listing. Any platform.</p>
              
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-base tracking-wider hover:bg-blue-700 transition-colors"
              >
                TAP TO UPLOAD
              </button>
            </div>
            
            <div className="mt-6 p-5 bg-gray-50 rounded-xl text-left">
              <p className="text-sm font-bold text-gray-500 mb-3">💡 TIPS FOR BEST RESULTS</p>
              <ul className="text-base text-gray-500 space-y-2">
                <li>• Include the full listing with price visible</li>
                <li>• Make sure text is readable</li>
                <li>• One listing per screenshot</li>
              </ul>
            </div>
          </div>
        )}

        {/* ============ PROCESSING STATE ============ */}
        {isProcessing && (
          <div className="w-full max-w-md text-center py-20 animate-in fade-in">
            <div className="w-16 h-16 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-6" />
            <p className="text-sm font-black tracking-widest text-blue-600 animate-pulse uppercase">{processingMessage}</p>
          </div>
        )}

        {/* ============ STEP 4: TEASER + PAYWALL ============ */}
        {step === 4 && teaserData && !isProcessing && (
          <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4">
            
            {/* Screenshot Preview */}
            {preview && (
              <div className="mb-6">
                <img src={preview} className="w-full max-h-48 object-cover rounded-2xl border-2 border-gray-100" alt="Listing" />
              </div>
            )}

            {/* Extracted Info Card */}
            <div className="bg-white border-2 border-gray-100 rounded-[2rem] p-6 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Listing Identified</p>
              </div>
              <h3 className="text-xl font-black tracking-tight mb-4 italic">{teaserData.extracted?.title || 'Listing'}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 text-[9px] font-black uppercase">Price</p>
                  <p className="font-black text-blue-600">{teaserData.extracted?.price || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[9px] font-black uppercase">Location</p>
                  <p className="font-bold">{teaserData.extracted?.location || region}</p>
                </div>
                {teaserData.extracted?.specs && (
                  <div className="col-span-2">
                    <p className="text-gray-400 text-[9px] font-black uppercase">Specs</p>
                    <p className="font-medium text-gray-700">{teaserData.extracted?.specs}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Teaser Insights */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-2xl mb-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[9px] font-black uppercase tracking-widest opacity-70">Initial Scan</p>
                <div className="bg-white/20 px-3 py-1 rounded-full">
                  <span className="text-xs font-black">{teaserData.teaser?.flagCount || 0} concerns found</span>
                </div>
              </div>
              <p className="text-sm font-bold mb-2">📊 {teaserData.teaser?.marketPosition || 'Market analysis available'}</p>
              {teaserData.teaser?.knownIssue && (
                <p className="text-sm opacity-90">🔧 {teaserData.teaser.knownIssue}</p>
              )}
            </div>

            {/* Blurred Preview */}
            <div className="relative mb-6">
              <div className="space-y-3 blur-xl opacity-30 pointer-events-none select-none">
                <div className="h-20 bg-gray-100 rounded-2xl" />
                <div className="h-16 bg-red-100 rounded-2xl" />
                <div className="h-16 bg-green-100 rounded-2xl" />
                <div className="h-24 bg-gray-100 rounded-2xl" />
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/95 backdrop-blur-sm p-8 rounded-[2rem] shadow-2xl text-center border border-gray-100 max-w-sm">
                  <p className="text-2xl mb-2">🔒</p>
                  <h3 className="text-xl font-black mb-2 uppercase italic">Full Report Ready</h3>
                  <p className="text-[11px] text-gray-500 mb-6 leading-relaxed">
                    {teaserData.teaser?.hookLine || 'Unlock detailed market analysis, owner insights, red flags, and negotiation tips.'}
                  </p>
                  <button 
                    onClick={handlePay} 
                    className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.3em] shadow-xl active:scale-95 transition-all mb-3"
                  >
                    Unlock — $3.95
                  </button>
                  <p className="text-[9px] text-gray-400">Secure payment via Stripe · Less than a coffee ☕</p>
                </div>
              </div>
            </div>

            {/* Start Over */}
            <button onClick={reset} className="w-full py-3 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors">
              ← Analyze a different listing
            </button>
          </div>
        )}

        {/* ============ STEP 5: GENERATING FULL REPORT ============ */}
        {step === 5 && (
          <div className="w-full max-w-md text-center py-20 animate-in fade-in">
            <div className="w-16 h-16 border-4 border-gray-50 border-t-blue-600 rounded-full animate-spin mx-auto mb-6" />
            <p className="text-xs font-black tracking-[0.3em] text-blue-600 animate-pulse italic uppercase">Generating Your Report...</p>
            <p className="text-[10px] text-gray-400 mt-2">Searching market data, recalls, and owner reviews</p>
          </div>
        )}

        {/* ============ STEP 6: FULL REPORT ============ */}
        {step === 6 && reportData && (
          <div className="w-full max-w-lg space-y-6 animate-in fade-in">
            
            {/* Header Card */}
            <div className="bg-black text-white p-8 rounded-[2rem] shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-black uppercase italic leading-tight">{reportData.extracted?.title || 'Listing Analysis'}</h2>
                  <p className="text-gray-400 text-xs mt-1">{reportData.extracted?.location}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-4xl font-black text-blue-500">{reportData.verdict?.score || '—'}</p>
                  <p className="text-[9px] uppercase tracking-widest text-gray-500">Score</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800">
                <div>
                  <p className="text-[9px] text-gray-500 uppercase">Listed Price</p>
                  <p className="font-black text-lg">{reportData.extracted?.price || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 uppercase">Fair Value</p>
                  <p className="font-black text-lg text-blue-400">{reportData.marketAnalysis?.fairValueRange || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Verdict */}
            <div className="bg-blue-600 text-white p-6 rounded-2xl">
              <p className="text-[9px] font-bold uppercase tracking-widest opacity-60 mb-2">The Verdict</p>
              <p className="text-xl font-black uppercase">{reportData.verdict?.recommendation || 'ANALYSIS COMPLETE'}</p>
              <p className="text-sm opacity-90 mt-2">{reportData.verdict?.summary}</p>
              {reportData.verdict?.bottomLine && (
                <p className="text-xs opacity-70 mt-3 italic">"{reportData.verdict.bottomLine}"</p>
              )}
            </div>

            {/* Market Analysis */}
            {reportData.marketAnalysis && (
              <div className="bg-gray-50 p-6 rounded-2xl">
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-3">📊 Market Analysis</p>
                <p className="text-sm font-bold mb-2">{reportData.marketAnalysis.pricePosition}</p>
                <p className="text-xs text-gray-600">{reportData.marketAnalysis.comparables}</p>
                {reportData.marketAnalysis.demandLevel && (
                  <p className="text-xs text-gray-500 mt-2">Demand: {reportData.marketAnalysis.demandLevel}</p>
                )}
              </div>
            )}

            {/* Recalls */}
            {reportData.recalls && (
              <div className={`p-6 rounded-2xl border ${reportData.recalls.active ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                <p className={`text-[9px] font-bold uppercase tracking-widest mb-2 ${reportData.recalls.active ? 'text-red-600' : 'text-green-600'}`}>
                  {reportData.recalls.active ? '⚠️ Recall Notice' : '✅ Recall Check'}
                </p>
                <p className={`text-sm ${reportData.recalls.active ? 'text-red-900' : 'text-green-900'}`}>{reportData.recalls.details}</p>
              </div>
            )}

            {/* Concerns */}
            {reportData.concerns?.length > 0 && (
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                <h3 className="text-xs font-black text-red-600 uppercase tracking-widest mb-4">🚩 Concerns</h3>
                <ul className="space-y-3">
                  {reportData.concerns.map((item: any, i: number) => (
                    <li key={i} className="text-sm">
                      <div className="flex items-start gap-2">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded ${
                          item.severity === 'HIGH' ? 'bg-red-200 text-red-700' : 
                          item.severity === 'MEDIUM' ? 'bg-orange-200 text-orange-700' : 
                          'bg-yellow-200 text-yellow-700'
                        }`}>{item.severity}</span>
                        <div>
                          <p className="font-bold text-red-900">{item.issue}</p>
                          <p className="text-xs text-red-700 mt-1">{item.detail}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Positives */}
            {reportData.positives?.length > 0 && (
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                <h3 className="text-xs font-black text-green-600 uppercase tracking-widest mb-4">✅ Positives</h3>
                <ul className="space-y-3">
                  {reportData.positives.map((item: any, i: number) => (
                    <li key={i} className="text-sm">
                      <p className="font-bold text-green-900">{item.point}</p>
                      <p className="text-xs text-green-700 mt-1">{item.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Owner Insights */}
            {reportData.ownerInsights && (
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-xs font-black text-gray-600 uppercase tracking-widest mb-3">👥 What Owners Say</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-[9px] font-bold text-green-600 uppercase">Common Praise</p>
                    <p className="text-gray-700">{reportData.ownerInsights.commonPraise}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-red-600 uppercase">Common Complaints</p>
                    <p className="text-gray-700">{reportData.ownerInsights.commonComplaints}</p>
                  </div>
                  {reportData.ownerInsights.reliabilityRating && (
                    <div>
                      <p className="text-[9px] font-bold text-gray-500 uppercase">Reliability</p>
                      <p className="text-gray-700">{reportData.ownerInsights.reliabilityRating}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Questions for Seller */}
            {reportData.questionsForSeller?.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border-2 border-gray-100">
                <h3 className="text-xs font-black text-gray-600 uppercase tracking-widest mb-3">❓ Ask the Seller</h3>
                <ol className="space-y-2">
                  {reportData.questionsForSeller.map((q: string, i: number) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-3">
                      <span className="font-black text-blue-600 text-xs">{i + 1}.</span>
                      {q}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Negotiation Tips */}
            {reportData.negotiationStrategy && (
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">💰 Negotiation Strategy</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-white p-3 rounded-xl">
                    <span className="text-xs text-gray-500">Opening Offer</span>
                    <span className="font-black text-blue-600">{reportData.negotiationStrategy.openingOffer}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-3 rounded-xl">
                    <span className="text-xs text-gray-500">Target Price</span>
                    <span className="font-black text-green-600">{reportData.negotiationStrategy.targetPrice}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-3 rounded-xl">
                    <span className="text-xs text-gray-500">Walk Away If Above</span>
                    <span className="font-black text-red-600">{reportData.negotiationStrategy.walkAwayPrice}</span>
                  </div>
                  {reportData.negotiationStrategy.leveragePoints?.length > 0 && (
                    <div className="mt-3">
                      <p className="text-[9px] font-bold text-blue-600 uppercase mb-2">Leverage Points</p>
                      <ul className="space-y-1">
                        {reportData.negotiationStrategy.leveragePoints.map((point: string, i: number) => (
                          <li key={i} className="text-sm text-blue-900 flex items-start gap-2">
                            <span className="text-blue-400">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Visual Analysis */}
            {reportData.visualAnalysis && (
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-xs font-black text-gray-600 uppercase tracking-widest mb-3">👁️ Visual Analysis</h3>
                <p className="text-sm font-bold mb-3">{reportData.visualAnalysis.conditionAssessment}</p>
                {reportData.visualAnalysis.concernsSpotted?.length > 0 && (
                  <div className="mb-3">
                    <p className="text-[9px] font-bold text-red-600 uppercase mb-1">Issues Spotted</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {reportData.visualAnalysis.concernsSpotted.map((concern: string, i: number) => (
                        <li key={i}>• {concern}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {reportData.visualAnalysis.photosNeeded?.length > 0 && (
                  <div>
                    <p className="text-[9px] font-bold text-blue-600 uppercase mb-1">Request These Photos</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {reportData.visualAnalysis.photosNeeded.map((photo: string, i: number) => (
                        <li key={i}>📸 {photo}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <button 
                onClick={() => window.print()} 
                className="w-full bg-black text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest"
              >
                Save / Print Report
              </button>
              <button 
                onClick={reset} 
                className="w-full py-4 border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
              >
                Analyze Another Listing
              </button>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="p-10 text-center border-t border-gray-100">
        <div className="flex justify-center gap-8 text-sm font-black uppercase tracking-widest text-gray-400 mb-6">
          <a href="/faq" className="hover:text-black transition-colors">FAQ</a>
          <a href="/pricing" className="hover:text-black transition-colors">Pricing</a>
          <a href="/about" className="hover:text-black transition-colors">About</a>
          <a href="/contact" className="hover:text-black transition-colors">Contact</a>
        </div>
        <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">© 2026 Listing Lens Labs Pty Ltd</p>
      </footer>
    </div>
  );
}
