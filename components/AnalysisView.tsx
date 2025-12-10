import React from 'react';
import { AnalysisResult, AnalysisType, Stock } from '../types';
import { ExternalLink, RefreshCw, AlertTriangle, Trophy, Target, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface AnalysisViewProps {
  result: AnalysisResult | null;
  loading: boolean;
  error: string | null;
  selectedStock: Stock | null;
  analysisType: AnalysisType;
  onRetry: () => void;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ 
  result, 
  loading, 
  error, 
  selectedStock, 
  analysisType,
  onRetry 
}) => {
  
  if (!selectedStock) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 bg-slate-800/30 rounded-xl border-2 border-dashed border-slate-700 p-8 text-center">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl">📈</span>
        </div>
        <h3 className="text-lg font-medium text-slate-300">Start Your Analysis</h3>
        <p className="max-w-sm mt-2">Select a stock from the list above and choose an analysis type to generate a real-time report.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full space-y-6 animate-pulse p-6 bg-slate-800 rounded-xl border border-slate-700">
        <div className="flex justify-between items-center">
            <div className="h-8 bg-slate-700 rounded w-1/3"></div>
            <div className="h-6 bg-slate-700 rounded w-24"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-slate-700 rounded w-3/4"></div>
          <div className="h-4 bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-700 rounded w-5/6"></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="h-32 bg-slate-700 rounded-lg"></div>
            <div className="h-32 bg-slate-700 rounded-lg"></div>
        </div>
        <div className="h-40 bg-slate-700 rounded-lg"></div>
        <div className="flex items-center justify-center pt-8">
            <p className="text-blue-400 animate-bounce font-medium">Analyzing {selectedStock.name} on Screener.in...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-950/30 border border-red-900/50 rounded-xl text-center">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-red-400 mb-2">Analysis Failed</h3>
        <p className="text-red-200 mb-6">{error}</p>
        <button 
          onClick={onRetry}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2 mx-auto"
        >
          <RefreshCw className="w-4 h-4" /> Try Again
        </button>
      </div>
    );
  }

  if (!result) return null;

  // Manual Markdown parsing to ensure styling control
  const formatText = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let tableBuffer: string[] = [];

    const flushTable = (keyPrefix: number) => {
        if (tableBuffer.length === 0) return null;
        
        // Basic table rendering
        const tableContent = (
            <div key={`table-${keyPrefix}`} className="my-6 overflow-x-auto rounded-lg border border-slate-700 bg-slate-900/50">
                <table className="w-full text-left border-collapse text-sm">
                    <tbody>
                        {tableBuffer.map((row, rIdx) => {
                            // Split by pipe, remove empty start/end
                            const cells = row.split('|').filter((c, i, arr) => {
                                // Keep only cells that are not empty string resulting from split at edges
                                // But some rows might have empty cells, so we have to be careful.
                                // Usually markdown tables start and end with |, so the first and last split are empty.
                                if (i === 0 && c.trim() === '') return false;
                                if (i === arr.length - 1 && c.trim() === '') return false;
                                return true;
                            });

                            const isHeader = rIdx === 0;
                            const isSeparator = row.includes('---');
                            
                            if (isSeparator) return null;

                            return (
                                <tr key={rIdx} className={isHeader ? "bg-slate-800 text-slate-200 font-semibold" : "border-t border-slate-700/50 text-slate-300 hover:bg-slate-800/30"}>
                                    {cells.map((cell, cIdx) => (
                                        <td key={cIdx} className="p-3 whitespace-pre-wrap min-w-[120px]">{parseBold(cell.trim())}</td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
        tableBuffer = [];
        return tableContent;
    };

    lines.forEach((line, i) => {
      // Check for Table Lines
      if (line.trim().startsWith('|')) {
        tableBuffer.push(line);
        return;
      } else {
        // If we were building a table and hit a non-table line, flush it
        if (tableBuffer.length > 0) {
            const table = flushTable(i);
            if(table) elements.push(table);
        }
      }

      // Headers
      if (line.startsWith('### ')) {
        const content = line.replace('### ', '');
        
        // Special highlighting for Fundamental Score
        if (content.includes('Score:')) {
            elements.push(
                <div key={i} className="bg-gradient-to-r from-blue-900/40 to-slate-900 border border-blue-500/30 rounded-xl p-5 my-8 flex items-center gap-4 shadow-lg">
                    <div className="bg-yellow-500/10 p-3 rounded-full">
                        <Trophy className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white">{content}</h3>
                        <p className="text-slate-400 text-sm mt-1">Based on 32-factor analysis benchmarks</p>
                    </div>
                </div>
            );
            return;
        }
        
        // Special highlighting for Technical Signal
        if (content.includes('Signal:')) {
            let colorClass = 'text-white';
            let Icon = Minus;
            let bgClass = 'bg-slate-700/50';
            
            if (content.toLowerCase().includes('bullish')) {
                colorClass = 'text-green-400';
                Icon = TrendingUp;
                bgClass = 'bg-green-900/20 border-green-500/30';
            } else if (content.toLowerCase().includes('bearish')) {
                colorClass = 'text-red-400';
                Icon = TrendingDown;
                bgClass = 'bg-red-900/20 border-red-500/30';
            } else if (content.toLowerCase().includes('neutral')) {
                colorClass = 'text-yellow-400';
                bgClass = 'bg-yellow-900/20 border-yellow-500/30';
            }

            elements.push(
                <div key={i} className={`border rounded-xl p-5 my-6 flex items-center gap-4 ${bgClass}`}>
                     <div className="bg-slate-900/30 p-3 rounded-full">
                        <Icon className={`w-8 h-8 ${colorClass} flex-shrink-0`} />
                     </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white">{content}</h3>
                        <p className="text-slate-400 text-sm mt-1">Short to Medium Term Trend</p>
                    </div>
                </div>
            );
            return;
        }

        elements.push(<h3 key={i} className="text-xl font-bold text-blue-400 mt-8 mb-4 flex items-center gap-2">{content}</h3>);
        return;
      }
      
      if (line.startsWith('## ')) {
          elements.push(<h2 key={i} className="text-2xl font-bold text-white mt-10 mb-6 border-b border-slate-700 pb-2">{line.replace('## ', '')}</h2>);
          return;
      }
      
      if (line.startsWith('# ')) {
          elements.push(<h1 key={i} className="text-3xl font-extrabold text-white mb-6">{line.replace('# ', '')}</h1>);
          return;
      }
      
      // List items
      if (line.trim().startsWith('- ')) {
         elements.push(
             <div key={i} className="flex gap-2 mb-2 ml-2 text-slate-300">
                <span className="text-blue-500 font-bold mt-1.5 text-xs">●</span>
                <span className="leading-relaxed">{parseBold(line.replace('- ', ''))}</span>
             </div>
         );
         return;
      }
      
      // Paragraphs (empty lines are spacers)
      if (line.trim() === '') {
          elements.push(<div key={i} className="h-3"></div>);
          return;
      }

      // Default paragraph
      elements.push(<p key={i} className="text-slate-300 leading-relaxed mb-2">{parseBold(line)}</p>);
    });

    // Flush any remaining table at the end
    if (tableBuffer.length > 0) {
        const table = flushTable(lines.length);
        if(table) elements.push(table);
    }

    return elements;
  };

  const parseBold = (text: string) => {
    if (!text) return text;
    // Check for "Sector Classification:" special case
    if (text.includes('Sector Classification:')) {
         const parts = text.split('Sector Classification:');
         return (
             <span>
                 <span className="text-slate-400">Sector Classification:</span>
                 <span className="text-blue-400 font-bold ml-2 text-lg">{parts[1]}</span>
             </span>
         )
    }

    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
      }
      // Check for PASS/FAIL
      if (part.includes('✅ PASS')) {
           return <span key={index} className="text-green-400 font-bold">✅ PASS</span>;
      }
      if (part.includes('❌ FAIL')) {
           return <span key={index} className="text-red-400 font-bold">❌ FAIL</span>;
      }
      
      return part;
    });
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-2xl overflow-hidden min-h-[500px]">
        {/* Header of the Report */}
        <div className="bg-slate-900 p-6 border-b border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    {analysisType === AnalysisType.FUNDAMENTAL ? <Target className="w-6 h-6 text-green-500"/> : <Trophy className="w-6 h-6 text-purple-500"/>}
                    {analysisType === AnalysisType.FUNDAMENTAL ? 'Fundamental' : 'Technical'} Analysis
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                    Generated for <span className="text-blue-400 font-semibold">{selectedStock.name}</span>
                </p>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-xs text-slate-500 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                    Updated: {result.timestamp}
                </span>
            </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 bg-slate-800">
            <div className="max-w-none text-slate-300">
                {formatText(result.markdown)}
            </div>
        </div>

        {/* Footer / Sources */}
        {result.sources.length > 0 && (
            <div className="bg-slate-900/50 p-4 px-6 border-t border-slate-700">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Data Sources</h4>
                <div className="flex flex-wrap gap-2">
                    {result.sources.map((source, idx) => (
                        <a 
                            key={idx}
                            href={source.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 bg-blue-900/20 px-2 py-1 rounded-md transition-colors"
                        >
                            {source.title} <ExternalLink className="w-3 h-3" />
                        </a>
                    ))}
                </div>
                <p className="text-[10px] text-slate-600 mt-3">
                    Disclaimer: This analysis is AI-generated based on search results from screener.in and other financial sites. It is for informational purposes only and does not constitute financial advice.
                </p>
            </div>
        )}
    </div>
  );
};

export default AnalysisView;
