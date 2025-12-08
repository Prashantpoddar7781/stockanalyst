import React, { useState } from 'react';
import StockSelector from './components/StockSelector';
import AnalysisView from './components/AnalysisView';
import { Stock, AnalysisType, AnalysisResult } from './types';
import { analyzeStock } from './services/geminiService';
import { TrendingUp, BarChart3, LineChart } from 'lucide-react';

const App: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [activeTab, setActiveTab] = useState<AnalysisType>(AnalysisType.FUNDAMENTAL);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // Store results cache to avoid re-fetching when switching tabs if same stock
  const [cache, setCache] = useState<Record<string, AnalysisResult>>({});

  const handleStockSelect = (stock: Stock) => {
    setSelectedStock(stock);
    setResult(null); // Clear result on new stock selection
    setError(null);
  };

  const handleAnalyze = async (type: AnalysisType) => {
    if (!selectedStock) return;
    
    const cacheKey = `${selectedStock.symbol}-${type}`;
    if (cache[cacheKey]) {
      setResult(cache[cacheKey]);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeStock(selectedStock.symbol, type);
      setResult(data);
      setCache(prev => ({ ...prev, [cacheKey]: data }));
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Trigger analysis when tab changes or stock changes, if not already loaded
  React.useEffect(() => {
    if (selectedStock) {
        handleAnalyze(activeTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStock, activeTab]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                MarketInsight<span className="text-blue-500">.in</span>
              </span>
            </div>
            <div className="text-xs font-medium text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              NSE Edition
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-12 text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Intelligent Stock Analysis
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl">
                Get instant Fundamental and Technical insights for Indian stocks powered by AI. 
                Data grounded in sources like <span className="text-blue-400 font-medium">Screener.in</span>.
            </p>
        </div>

        {/* Input Section */}
        <div className="flex flex-col items-center max-w-xl mx-auto mb-10">
            <StockSelector 
                onSelect={handleStockSelect} 
                selectedStock={selectedStock}
                disabled={loading}
            />
        </div>

        {/* Tab Selection */}
        {selectedStock && (
            <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
                
                {/* Sidebar / Tabs */}
                <div className="md:w-64 flex-shrink-0 space-y-2">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 mb-2">Analysis Type</p>
                    <button
                        onClick={() => setActiveTab(AnalysisType.FUNDAMENTAL)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                            activeTab === AnalysisType.FUNDAMENTAL
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                        <BarChart3 className="w-5 h-5" />
                        Fundamental
                    </button>
                    <button
                        onClick={() => setActiveTab(AnalysisType.TECHNICAL)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                            activeTab === AnalysisType.TECHNICAL
                                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20'
                                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                        <LineChart className="w-5 h-5" />
                        Technical
                    </button>
                    
                    <div className="mt-8 p-4 bg-slate-900/50 rounded-lg border border-slate-800 text-xs text-slate-500 leading-relaxed">
                        <p className="mb-2 font-semibold text-slate-400">Analysis Logic:</p>
                        {activeTab === AnalysisType.FUNDAMENTAL ? (
                            <span>Focuses on financial statements, P/E ratios, ROE, Book Value, and long-term growth potential based on value investing principles.</span>
                        ) : (
                            <span>Focuses on price action, moving averages (SMA), RSI, MACD, and support/resistance levels for short-term trading.</span>
                        )}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1">
                    <AnalysisView 
                        result={result}
                        loading={loading}
                        error={error}
                        selectedStock={selectedStock}
                        analysisType={activeTab}
                        onRetry={() => handleAnalyze(activeTab)}
                    />
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default App;
