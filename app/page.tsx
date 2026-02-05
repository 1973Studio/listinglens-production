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
              <p className="text-sm font-medium mb-2">📊 {teaserData.teaser?.marketPosition || 'Market ana