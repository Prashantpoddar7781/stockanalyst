import React, { useState, useEffect, useRef } from 'react';
import { Stock } from '../types';
import { NSE_STOCKS } from '../constants';
import { Search, ChevronDown, Check } from 'lucide-react';

interface StockSelectorProps {
  onSelect: (stock: Stock) => void;
  selectedStock: Stock | null;
  disabled: boolean;
}

const StockSelector: React.FC<StockSelectorProps> = ({ onSelect, selectedStock, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>(NSE_STOCKS);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    setFilteredStocks(
      NSE_STOCKS.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(lowerTerm) ||
          stock.name.toLowerCase().includes(lowerTerm)
      )
    );
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (stock: Stock) => {
    onSelect(stock);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative w-full max-w-lg" ref={wrapperRef}>
      <label className="block text-sm font-medium text-slate-400 mb-2">
        Select a Stock (NSE)
      </label>
      
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-slate-800 border ${isOpen ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-700'} text-white rounded-lg px-4 py-3 flex items-center justify-between shadow-sm hover:border-slate-600 transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <span className="flex flex-col items-start truncate">
            {selectedStock ? (
                <>
                <span className="font-bold text-base">{selectedStock.symbol}</span>
                <span className="text-xs text-slate-400 truncate max-w-[200px] sm:max-w-xs">{selectedStock.name}</span>
                </>
            ) : (
                <span className="text-slate-400">Search for a company...</span>
            )}
        </span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-h-80 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <div className="p-2 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                className="w-full bg-slate-900 text-white rounded-md pl-9 pr-3 py-2 text-sm border border-slate-700 focus:border-blue-500 focus:outline-none"
                placeholder="Type symbol or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1">
            {filteredStocks.length === 0 ? (
              <div className="p-4 text-center text-sm text-slate-500">No stocks found</div>
            ) : (
              <ul>
                {filteredStocks.map((stock) => (
                  <li key={stock.symbol}>
                    <button
                      onClick={() => handleSelect(stock)}
                      className="w-full text-left px-4 py-3 hover:bg-slate-700 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {stock.symbol}
                        </span>
                        <span className="text-xs text-slate-400">{stock.name}</span>
                      </div>
                      <span className="text-xs text-slate-500 bg-slate-900/50 px-2 py-1 rounded border border-slate-700">
                        {stock.sector}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StockSelector;
