import { GoogleGenAI } from "@google/genai";
import { AnalysisType, AnalysisResult } from '../types';
import { SECTOR_BENCHMARKS, TECHNICAL_GUIDE } from '../constants';

// Initialize the Gemini AI client
// Note: process.env.API_KEY is assumed to be available
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

export const analyzeStock = async (
  stockSymbol: string, 
  analysisType: AnalysisType
): Promise<AnalysisResult> => {
  
  const isFundamental = analysisType === AnalysisType.FUNDAMENTAL;
  
  const systemInstruction = `You are a world-class financial analyst specializing in the Indian Stock Market (NSE).
  Your task is to provide a comprehensive ${isFundamental ? 'Fundamental' : 'Technical'} Analysis report for the stock "${stockSymbol}".
  
  CRITICAL DATA SOURCE INSTRUCTION:
  - You MUST use the 'googleSearch' tool to find real-time data. 
  - Specifically search for data from 'screener.in', 'moneycontrol.com', or 'nseindia.com'.
  - Do not hallucinate data. If you cannot find specific metrics, state that the data is currently unavailable.
  
  ${isFundamental ? `
  FUNDAMENTAL ANALYSIS LOGIC WITH SECTOR BENCHMARKING:
  
  Below is a strict table of SECTOR BENCHMARKS for 32 Fundamental Factors:
  ${SECTOR_BENCHMARKS}
  
  STEPS:
  1. **Classify Sector**: Identify which of the sectors in the table above best fits "${stockSymbol}". Use "General" or the closest match if exact fit isn't clear.
  2. **Fetch Data**: Retrieve the CURRENT values for all 32 columns listed in the benchmark table for "${stockSymbol}" (e.g., Revenue Growth, ROE, P/E, Debt-to-Equity, etc.) from Screener.in or Moneycontrol.
  3. **Compare & Score**: For each factor, compare the stock's actual value against the benchmark criteria for its sector.
     - If it meets the criteria: PASS
     - If it fails: FAIL
     - If data is missing: N/A (Do not count towards total).
  4. **Calculate Score**: Count the total number of "PASS" items out of 32 (or total available metrics).
  
  REQUIRED OUTPUT FORMAT:
  Start with the score and sector clearly.
  
  ### 🏆 Fundamental Score: [X]/32
  **Sector Classification:** [Sector Name]
  
  ### 📊 Detailed 32-Factor Analysis
  (Create a Markdown table with these columns: **Factor**, **Actual Value**, **Benchmark**, **Status**)
  | Factor | Actual Value | Benchmark | Status |
  | :--- | :--- | :--- | :--- |
  | Revenue Growth | ... | ... | ✅ PASS / ❌ FAIL |
  | Operating Margin | ... | ... | ... |
  ... (list all 32 factors)
  
  ### 📝 Verdict & Insights
  - **Strengths**: [Key passing metrics]
  - **Weaknesses**: [Key failing metrics]
  - **Final Recommendation**: Buy/Sell/Hold based on the score and value investing principles.
  ` : `
  TECHNICAL ANALYSIS LOGIC WITH PATTERN RECOGNITION:

  Below is the TECHNICAL ANALYSIS GUIDE that defines patterns and indicators you must check:
  ${TECHNICAL_GUIDE}

  STEPS:
  1. **Fetch Data**: Use Google Search to find the latest daily candle data (Open, High, Low, Close), current RSI (14), MACD status, 50-day SMA, 200-day SMA, and Volume for "${stockSymbol}".
  2. **Apply Guide**: Compare the found data against the definitions in the GUIDE above.
     - Check Moving Averages: Is Price > 50 SMA? Is 50 SMA > 200 SMA (Golden Cross)?
     - Check Momentum: Is RSI > 70 (Overbought) or < 30 (Oversold)?
     - Check Patterns: Do recent candles match "Hammer", "Engulfing", "Doji", etc.?
     - Check Volume: Is there a breakout with high volume?
  3. **Formulate Verdict**: Based on the matching patterns, determine the trend (Bullish/Bearish/Neutral).

  REQUIRED OUTPUT FORMAT:
  Start with the verdict clearly.

  ### 🧭 Technical Signal: [Bullish / Bearish / Neutral]
  **Timeframe:** Short to Medium Term

  ### 📉 Key Indicators
  (Create a table of found values)
  | Indicator | Value | Status/Interpretation |
  | :--- | :--- | :--- |
  | CMP (Price) | ... | ... |
  | RSI (14) | ... | ... |
  | 50-Day SMA | ... | ... |
  | 200-Day SMA | ... | ... |
  | MACD | ... | ... |
  
  ### 🕯️ Pattern & Trend Analysis
  - **Moving Averages**: [Analysis based on Golden/Death cross or trend checks from Guide]
  - **Candlestick Patterns**: [Mention any specific patterns from Guide found in recent price action]
  - **Momentum**: [RSI and MACD interpretation based on Guide]
  - **Volume**: [Volume analysis based on Guide]

  ### 📝 Final Verdict
  - **Action**: [Buy/Sell/Wait]
  - **Support Levels**: [Price levels]
  - **Resistance Levels**: [Price levels]
  `}

  FORMATTING:
  - Use clear Markdown formatting.
  - Use emojis for visual appeal (✅, ❌, ⚠️, 🕯️, 📊).
  - Use bolding (**) for key metrics.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Perform a deep ${isFundamental ? 'fundamental' : 'technical'} analysis of ${stockSymbol} (NSE) using the latest available data.`,
      config: {
        systemInstruction: systemInstruction,
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 0 } 
      },
    });

    const markdownText = response.text || "No analysis generated. Please try again.";
    
    // Extract grounding metadata (sources)
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web?.uri && chunk.web?.title)
      .map((chunk: any) => ({
        uri: chunk.web.uri,
        title: chunk.web.title
      }));
    
    const uniqueSources = Array.from(new Map(sources.map((item: any) => [item['uri'], item])).values()) as { uri: string; title: string }[];

    return {
      markdown: markdownText,
      sources: uniqueSources,
      timestamp: new Date().toLocaleTimeString()
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate analysis. Please ensure your API Key is valid and try again.");
  }
};