'use client';

import React, { useState, useRef, useEffect } from 'react';

type Category = 'vehicles' | 'property' | 'electronics' | 'fashion' | 'watches' | 'home' | 'other' | null;

export default function ListingLens() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<Category>(null);
  const [region, setRegion] = useState('');
  const [regionFlag, setRegionFlag] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');
  const [teaserData, setTeaserData] = useState<any>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [reportData, setReportData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 1);
    document.body.style.overscrollBehavior = 'none';

    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get('session_id');
    const cancelled = query.get('cancelled');

    if (cancelled) {
      const savedTeaser = localStorage.getItem('ll_teaser');
      const savedCategory = localStorage.getItem('ll_category') as Category;
      const savedRegion = localStorage.getItem('ll_region');
      const savedRegionFlag = localStorage.getItem('ll_regionFlag');
      const savedCheckoutUrl = localStorage.getItem('ll_checkoutUrl');
      const savedPreview = localStorage.getItem('ll_preview');

      if (savedTeaser) {
        setTeaserData(JSON.parse(savedTeaser));
        setCategory(savedCategory);
        setRegion(savedRegion || 'AU');
        setRegionFlag(savedRegionFlag || '🇦🇺');
        setCheckoutUrl(savedCheckoutUrl);
        setPreview(savedPreview);
        setStep(4);
      }
      window.history.replaceState({}, '', window.location.pathname);
      return;
    }

    if (sessionId) {
      const savedCategory = localStorage.getItem('ll_category') as Category;
      const savedRegion = localStorage.getItem('ll_region');
      const savedRegionFlag = localStorage.getItem('ll_regionFlag');
      const savedPreview = localStorage.getItem('ll_preview');

      setCategory(savedCategory || 'vehicles');
      setRegion(savedRegion || 'AU');
      setRegionFlag(savedRegionFlag || '🇦🇺');
      setPreview(savedPreview);
      setStep(5);
      setIsProcessing(true);
      setProcessingMessage('Payment verified. Generating your full report...');

      generateFullReport(sessionId, savedPreview || '');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const generateTeaser = async (file: File) => {
    setIsProcessing(true);
    setProcessingMessage('Analyzing your listing...');

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("category", category || "vehicles");
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
      
      localStorage.setItem('ll_teaser', JSON.stringify(data.teaser));
      localStorage.setItem('ll_category', category || 'vehicles');
      localStorage.setItem('ll_region', region);
      localStorage.setItem('ll_regionFlag', regionFlag);
      localStorage.setItem('ll_checkoutUrl', data.checkoutUrl);
      localStorage.setItem('ll_preview', preview || '');

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

  const generateFullReport = async (sessionId: string, imageData: string) => {
    try {
      const response = await fetch('/api/complete-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, image: imageData }),
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

      localStorage.removeItem('ll_teaser');
      localStorage.removeItem('ll_category');
      localStorage.removeItem('ll_region');
      localStorage.removeItem('ll_regionFlag');
      localStorage.removeItem('ll_checkoutUrl');
      localStorage.removeItem('ll_preview');

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate report. Please contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCategorySelect = (cat: Category) => {
    setSelectedCategory(cat);
    setTimeout(() => {
      setCategory(cat);
      setStep(2);
      setSelectedCategory(null);
    }, 200);
  };

  const handleRegionSelect = (reg: string, flag: string) => {
    setRegion(reg);
    setRegionFlag(flag);
    setStep(3);
  };

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        generateTeaser(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePay = () => {
    if (checkoutUrl) window.location.href = checkoutUrl;
  };

  const reset = () => {
    setStep(1);
    setCategory(null);
    setSelectedCategory(null);
    setRegion('');
    setRegionFlag('');
    setPreview(null);
    setSelectedFile(null);
    setTeaserData(null);
    setCheckoutUrl(null);
    setReportData(null);
    setError(null);
    localStorage.removeItem('ll_teaser');
    localStorage.removeItem('ll_category');
    localStorage.removeItem('ll_region');
    localStorage.removeItem('ll_regionFlag');
    localStorage.removeItem('ll_checkoutUrl');
    localStorage.removeItem('ll_preview');
  };

  const getCategoryLabel = (cat: Category): string => {
    const labels: Record<string, string> = {
      vehicles: 'Vehicle',
      property: 'Property',
      electronics: 'Electronics',
      fashion: 'Fashion',
      watches: 'Watches & Jewellery',
      home: 'Home & Equipment',
      other: 'Item'
    };
    return labels[cat || 'other'] || 'Item';
  };

  return (
    <div className={`min-h-screen flex flex-col selection:bg-blue-100 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      
      {/* TOP BREADCRUMB */}
      <div className="fixed top-2 left-0 w-full px-6 flex justify-between z-50 pointer-events-none">
        <div className={`text-[8px] font-black uppercase tracking-[0.3em] ${darkMode ? 'opacity-30' : 'opacity-20'}`}>
          {category ? getCategoryLabel(category) : 'ADVOCATE MODE'} {region && `• ${region}`}
        </div>
      </div>

      {/* HEADER */}
      <header className={`sticky top-0 backdrop-blur-sm border-b px-6 py-4 flex justify-between items-center z-40 ${darkMode ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-gray-100'}`}>
        <button onClick={reset} className="text-sm font-black tracking-widest uppercase">LISTING LENS</button>
        <div className="flex items-center gap-3">
          {step > 1 && step < 5 && !isProcessing && (
            <button onClick={() => setStep(step - 1)} className={`px-5 py-2 text-xs font-black border rounded-full active:scale-95 transition-all ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>BACK</button>
          )}
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        
        {/* ERROR */}
        {error && (
          <div className={`w-full max-w-md mb-6 p-4 rounded-2xl text-center ${darkMode ? 'bg-red-900/50 border border-red-700' : 'bg-red-50 border border-red-200'}`} role="alert">
            <p className={`text-sm ${darkMode ? 'text-red-300' : 'text-red-700'}`}>{error}</p>
            <button onClick={() => { setError(null); reset(); }} className={`mt-2 text-xs underline ${darkMode ? 'text-red-400' : 'text-red-500'}`}>Start Over</button>
          </div>
        )}

        {/* STEP 1: HERO + CATEGORY */}
        {step === 1 && (
          <div className="w-full max-w-lg text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-5xl font-black tracking-tighter leading-[0.85] mb-4">DON'T BUY<br/>BLIND<span className="text-blue-600">.</span></h1>
            
            <div className="mb-8">
              <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your Personal Online Buyer's Advocate</p>
              <p className={`text-lg leading-relaxed px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Screenshot any listing. Get the red flags, fair value, and questions you should be asking — for less than the cost of a cup of coffee.
              </p>
              <p className={`text-sm mt-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Instant Analysis · No Account Needed · <button onClick={() => setShowHowItWorks(true)} className="text-blue-600 underline underline-offset-2 hover:text-blue-500">How does this work?</button>
              </p>
            </div>

            <p className={`text-sm font-black uppercase tracking-[0.15em] mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>
              What are you looking at buying?
            </p>

            {/* Simple Accessible Category Buttons */}
            <div className="grid grid-cols-2 gap-3 w-full mb-4">
              {[
                { id: 'vehicles', label: 'Vehicles' },
                { id: 'property', label: 'Property' },
                { id: 'electronics', label: 'Electronics' },
                { id: 'fashion', label: 'Fashion' },
                { id: 'watches', label: 'Watches & Jewellery' },
                { id: 'home', label: 'Home & Equipment' },
              ].map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => handleCategorySelect(item.id as Category)} 
                  className={`rounded-2xl py-6 px-4 font-bold text-sm uppercase tracking-wide transition-all active:scale-95 border ${
                    selectedCategory === item.id 
                      ? 'bg-blue-600 border-blue-600 text-white scale-95' 
                      : darkMode 
                        ? 'bg-gray-800 border-gray-700 hover:border-blue-500' 
                        : 'bg-white border-gray-200 hover:border-blue-500 shadow-sm'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Everything Else */}
            <button 
              onClick={() => handleCategorySelect('other')} 
              className={`w-full py-4 rounded-2xl font-medium text-sm border transition-all active:scale-95 ${
                selectedCategory === 'other' 
                  ? 'bg-blue-600 border-blue-600 text-white scale-95' 
                  : darkMode 
                    ? 'border-gray-700 text-gray-400 hover:border-gray-500' 
                    : 'border-gray-200 text-gray-400 hover:border-gray-400'
              }`}
            >
              Everything Else
            </button>
            <p className={`text-[10px] mt-3 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>
              Collectibles · Art · Sports Gear · Anything
            </p>
          </div>
        )}

        {/* STEP 2: REGION */}
        {step === 2 && (
          <div className="w-full max-w-lg text-center animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-xl font-black tracking-tight mb-2">Where are you buying?</h2>
            <p className={`text-xs mb-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>We'll tailor market data to your region</p>
            
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { id: 'AU', flag: '🇦🇺', name: 'Australia' }, 
                { id: 'CA', flag: '🇨🇦', name: 'Canada' }, 
                { id: 'HK', flag: '🇭🇰', name: 'Hong Kong' }, 
                { id: 'JP', flag: '🇯🇵', name: 'Japan' }, 
                { id: 'NZ', flag: '🇳🇿', name: 'New Zealand' }, 
                { id: 'SG', flag: '🇸🇬', name: 'Singapore' }, 
                { id: 'KR', flag: '🇰🇷', name: 'South Korea' }, 
                { id: 'UK', flag: '🇬🇧', name: 'United Kingdom' }
              ].map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => handleRegionSelect(item.id, item.flag)} 
                  className={`rounded-2xl p-5 flex items-center gap-3 transition-all active:scale-95 border ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 hover:border-blue-500' 
                      : 'bg-white border-gray-100 hover:border-blue-500 shadow-sm'
                  }`}
                >
                  <span className="text-2xl">{item.flag}</span>
                  <span className="text-sm font-bold">{item.name}</span>
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => handleRegionSelect('GLOBAL', '🌍')} 
              className={`text-xs font-medium ${darkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'} transition-colors`}
            >
              🌍 Global / Other Region
            </button>
          </div>
        )}

        {/* STEP 3: UPLOAD */}
        {step === 3 && !isProcessing && (
          <div className="w-full max-w-md text-center animate-in fade-in">
            <h2 className="text-xl font-black tracking-tight mb-2">Upload Your Screenshot</h2>
            <p className={`text-xs mb-6 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Any listing from any platform</p>
            
            <div 
              onClick={() => fileInputRef.current?.click()} 
              className={`p-12 border-2 border-dashed rounded-3xl hover:border-blue-500 transition-all cursor-pointer ${
                darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <input 
                ref={fileInputRef} 
                type="file" 
                accept="image/*" 
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} 
                className="hidden" 
              />
              
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <svg className={`w-8 h-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              
              <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Drop screenshot here</p>
              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>or tap to browse</p>
            </div>
            
            <div className={`mt-6 p-4 rounded-xl text-left ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <p className={`text-[10px] font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>TIPS FOR BEST RESULTS</p>
              <ul className={`text-[11px] space-y-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <li>• Include the full listing with price visible</li>
                <li>• Make sure text is readable</li>
                <li>• One listing per screenshot</li>
              </ul>
            </div>
          </div>
        )}

        {/* PROCESSING */}
        {isProcessing && (
          <div className="w-full max-w-md text-center py-20 animate-in fade-in">
            <div className={`w-16 h-16 border-4 border-t-blue-600 rounded-full animate-spin mx-auto mb-6 ${darkMode ? 'border-gray-700' : 'border-gray-100'}`} />
            <p className="text-sm font-medium text-blue-600 animate-pulse">{processingMessage}</p>
          </div>
        )}

        {/* STEP 4: TEASER + PAYWALL */}
        {step === 4 && teaserData && !isProcessing && (
          <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4">
            
            {preview && (
              <div className="mb-6">
                <img src={preview} className={`w-full max-h-48 object-cover rounded-2xl border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`} alt="Listing" />
              </div>
            )}

            <div className={`rounded-2xl p-6 mb-4 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className={`text-[10px] font-medium uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Listing Identified</p>
              </div>
              <h3 className="text-lg font-bold mb-4">{teaserData.extracted?.title || 'Listing'}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className={`text-[10px] font-medium uppercase ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Price</p>
                  <p className="font-bold text-blue-600">{teaserData.extracted?.price || 'N/A'}</p>
                </div>
                <div>
                  <p className={`text-[10px] font-medium uppercase ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Location</p>
                  <p className="font-medium">{teaserData.extracted?.location || region}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-2xl mb-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-medium uppercase tracking-wider opacity-70">Initial Scan</p>
                <div className="bg-white/20 px-3 py-1 rounded-full">
                  <span className="text-xs font-bold">{teaserData.teaser?.flagCount || 0} flags found</span>
                </div>
              </div>
              <p className="text-sm font-medium mb-2">📊 {teaserData.teaser?.marketPosition || 'Market analysis available'}</p>
              {teaserData.teaser?.knownIssue && (
                <p className="text-sm opacity-90">⚠️ {teaserData.teaser.knownIssue}</p>
              )}
            </div>

            <div className="relative mb-6">
              <div className="space-y-3 blur-xl opacity-30 pointer-events-none select-none">
                <div className={`h-20 rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`} />
                <div className={`h-16 rounded-2xl ${darkMode ? 'bg-red-900' : 'bg-red-100'}`} />
                <div className={`h-16 rounded-2xl ${darkMode ? 'bg-green-900' : 'bg-green-100'}`} />
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`backdrop-blur-sm p-8 rounded-2xl shadow-2xl text-center border max-w-sm ${darkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-100'}`}>
                  <h3 className="text-lg font-bold mb-2">Full Report Ready</h3>
                  <p className={`text-xs mb-6 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {teaserData.teaser?.hookLine || 'Unlock detailed market analysis, red flags, and negotiation tips.'}
                  </p>
                  <button 
                    onClick={handlePay} 
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all mb-3"
                  >
                    Unlock Report — $3.95
                  </button>
                  <p className={`text-[10px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Secure payment via Stripe</p>
                </div>
              </div>
            </div>

            <button onClick={reset} className={`w-full py-3 text-xs font-medium transition-colors ${darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}>
              ← Analyze a different listing
            </button>
          </div>
        )}

        {/* STEP 5: GENERATING */}
        {step === 5 && (
          <div className="w-full max-w-md text-center py-20 animate-in fade-in">
            <div className={`w-16 h-16 border-4 border-t-blue-600 rounded-full animate-spin mx-auto mb-6 ${darkMode ? 'border-gray-700' : 'border-gray-100'}`} />
            <p className="text-sm font-medium text-blue-600 animate-pulse">Generating Your Report...</p>
            <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Researching market data and expert insights</p>
          </div>
        )}

        {/* STEP 6: FULL REPORT */}
        {step === 6 && reportData && (
          <div className="w-full max-w-lg space-y-4 animate-in fade-in">
            
            <div className="bg-black text-white p-6 rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h2 className="text-lg font-bold leading-tight">{reportData.extracted?.title || 'Listing Analysis'}</h2>
                  <p className="text-gray-400 text-xs mt-1">{reportData.extracted?.location}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-3xl font-black text-blue-500">{reportData.verdict?.score || '—'}</p>
                  <p className="text-[9px] uppercase tracking-wider text-gray-500">Score</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800">
                <div>
                  <p className="text-[9px] text-gray-500 uppercase">Listed</p>
                  <p className="font-bold">{reportData.extracted?.price || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 uppercase">Fair Value</p>
                  <p className="font-bold text-blue-400">{reportData.marketAnalysis?.fairValueRange || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 text-white p-5 rounded-2xl">
              <p className="text-[9px] font-medium uppercase tracking-wider opacity-60 mb-1">Verdict</p>
              <p className="text-lg font-bold uppercase">{reportData.verdict?.recommendation || 'ANALYSIS COMPLETE'}</p>
              <p className="text-sm opacity-90 mt-2">{reportData.verdict?.summary}</p>
            </div>

            {reportData.marketAnalysis && (
              <div className={`p-5 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <p className="text-[9px] font-medium uppercase tracking-wider mb-2 text-gray-500">Market Analysis</p>
                <p className="text-sm font-medium mb-1">{reportData.marketAnalysis.pricePosition}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{reportData.marketAnalysis.comparables}</p>
              </div>
            )}

            {reportData.authenticityCheck && (
              <div className={`p-5 rounded-2xl border ${
                reportData.authenticityCheck.riskLevel === 'HIGH' 
                  ? darkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200'
                  : reportData.authenticityCheck.riskLevel === 'MEDIUM'
                    ? darkMode ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'
                    : darkMode ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-200'
              }`}>
                <p className={`text-[9px] font-medium uppercase tracking-wider mb-2 ${
                  reportData.authenticityCheck.riskLevel === 'HIGH' ? 'text-red-600' : 
                  reportData.authenticityCheck.riskLevel === 'MEDIUM' ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  Authenticity — {reportData.authenticityCheck.riskLevel} Risk
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{reportData.authenticityCheck.whatToVerify}</p>
              </div>
            )}

            {reportData.recalls && (
              <div className={`p-5 rounded-2xl border ${reportData.recalls.active 
                ? darkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200'
                : darkMode ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-200'
              }`}>
                <p className={`text-[9px] font-medium uppercase tracking-wider mb-2 ${reportData.recalls.active ? 'text-red-600' : 'text-green-600'}`}>
                  {reportData.recalls.active ? 'Recall Notice' : 'No Active Recalls'}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{reportData.recalls.details}</p>
              </div>
            )}

            {reportData.concerns?.length > 0 && (
              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-100'}`}>
                <p className="text-[9px] font-medium text-red-600 uppercase tracking-wider mb-3">Concerns</p>
                <ul className="space-y-3">
                  {reportData.concerns.map((item: any, i: number) => (
                    <li key={i} className="text-sm">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded mr-2 ${
                        item.severity === 'HIGH' ? 'bg-red-200 text-red-700' : 
                        item.severity === 'MEDIUM' ? 'bg-orange-200 text-orange-700' : 'bg-yellow-200 text-yellow-700'
                      }`}>{item.severity}</span>
                      <span className={`font-medium ${darkMode ? 'text-red-300' : 'text-red-900'}`}>{item.issue}</span>
                      <p className={`text-xs mt-1 ${darkMode ? 'text-red-400' : 'text-red-700'}`}>{item.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {reportData.positives?.length > 0 && (
              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-100'}`}>
                <p className="text-[9px] font-medium text-green-600 uppercase tracking-wider mb-3">Positives</p>
                <ul className="space-y-2">
                  {reportData.positives.map((item: any, i: number) => (
                    <li key={i} className="text-sm">
                      <span className={`font-medium ${darkMode ? 'text-green-300' : 'text-green-900'}`}>{item.point}</span>
                      <p className={`text-xs mt-1 ${darkMode ? 'text-green-400' : 'text-green-700'}`}>{item.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {reportData.questionsForSeller?.length > 0 && (
              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <p className="text-[9px] font-medium uppercase tracking-wider mb-3 text-gray-500">Ask the Seller</p>
                <ol className="space-y-2">
                  {reportData.questionsForSeller.map((q: string, i: number) => (
                    <li key={i} className={`text-sm flex items-start gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="font-bold text-blue-600 text-xs">{i + 1}.</span>
                      {q}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {reportData.negotiationTips?.length > 0 && (
              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-100'}`}>
                <p className="text-[9px] font-medium text-blue-600 uppercase tracking-wider mb-3">Negotiation Leverage</p>
                <ul className="space-y-2">
                  {reportData.negotiationTips.map((tip: string, i: number) => (
                    <li key={i} className={`text-sm flex items-start gap-2 ${darkMode ? 'text-blue-200' : 'text-blue-900'}`}>
                      <span className="text-blue-400">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-3 pt-4">
              <button onClick={() => window.print()} className="w-full bg-black text-white py-4 rounded-xl font-bold text-sm">
                Save / Print Report
              </button>
              <button 
                onClick={reset} 
                className={`w-full py-4 border rounded-xl text-sm font-medium transition-colors ${
                  darkMode ? 'border-gray-700 text-gray-500 hover:text-white' : 'border-gray-200 text-gray-400 hover:text-black'
                }`}
              >
                Analyze Another Listing
              </button>
            </div>
          </div>
        )}

      </main>

      {/* HOW IT WORKS MODAL */}
      {showHowItWorks && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6" onClick={() => setShowHowItWorks(false)}>
          <div 
            className={`w-full max-w-md rounded-3xl p-8 relative ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setShowHowItWorks(false)}
              className={`absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full ${darkMode ? 'bg-gray-700 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-400 hover:text-gray-600'}`}
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-2xl font-black mb-1">
              How It Works<span className="text-blue-600">.</span>
            </h2>
            
            {/* Subtitle */}
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-6">
              AI-Powered Research, Not AI-Generated Content
            </p>

            {/* Body */}
            <div className={`space-y-4 text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <p>
                <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>We don't make things up.</span> Everything in your report comes from real sources — recalls, forums, reviews, market data.
              </p>
              <p>
                You could find this yourself. But it would take hours searching dozens of websites and databases.
              </p>
              <p>
                <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Our AI does that in seconds</span> — like a thousand researchers working simultaneously on your behalf.
              </p>
              <p className={`italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                The intelligence is in the searching — not in making things up.
              </p>
            </div>

            {/* Got It Button */}
            <button 
              onClick={() => setShowHowItWorks(false)}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider mt-8 active:scale-95 transition-transform"
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className={`p-8 text-center border-t ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className={`flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          <a href="/faq" className="hover:underline">FAQ</a>
          <a href="/pricing" className="hover:underline">Pricing</a>
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/api" className="hover:underline">API</a>
        </div>
        <div className={`flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-wider mb-6 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          <a href="/privacy" className="hover:underline">Privacy</a>
          <a href="/terms" className="hover:underline">Terms</a>
        </div>
        <p className={`text-xs ${darkMode ? 'text-gray-700' : 'text-gray-300'}`}>© 2026 Listing Lens</p>
      </footer>
    </div>
  );
}
