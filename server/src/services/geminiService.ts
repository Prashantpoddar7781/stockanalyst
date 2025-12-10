import { GoogleGenAI } from "@google/genai";
import { AnalysisType, AnalysisResult } from '../types.js';
import { SECTOR_BENCHMARKS, TECHNICAL_GUIDE } from '../constants.js';

// Initialize the Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

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
  - **PRIMARY SOURCE**: Search specifically for "${stockSymbol} financial ratios screener.in" or "${stockSymbol} consolidated ratios moneycontrol".
  - **DERIVE DATA**: If a specific metric (e.g., "Receivable Days") is not explicitly found, TRY TO CALCULATE it from available data (e.g., 365 / Receivable Turnover) or look for synonyms.
  - **AVOID N/A**: Do not output 'N/A' unless the data is absolutely impossible to find or calculate. Make a reasonable estimate if possible and note it.
  
  ${isFundamental ? `
  FUNDAMENTAL ANALYSIS LOGIC WITH SECTOR BENCHMARKING:
  
  Below is a strict table of SECTOR BENCHMARKS for 32 Fundamental Factors:
  ${SECTOR_BENCHMARKS}
  
  STEPS:
  1. **Classify Sector**: Identify which of the sectors in the table above best fits "${stockSymbol}".
  2. **Fetch & Calculate**: Retrieve values for the columns. 
     - *Hint*: For "Valuation Benchmark", compare the stock's P/E or EV/EBITDA to the benchmark range.
     - *Hint*: For "Debt-to-EBITDA", if not found, divide Total Debt by EBITDA.
  3. **Filter N/A**: Check the Benchmark value for the identified sector. 
     - **CRITICAL**: If the benchmark for a specific factor is "N/A", "empty", or clearly not applicable (e.g., "Inventory Days" for Banks), **COMPLETELY REMOVE** that row from your analysis. Do not show it in the table.
  4. **Compare**: Compare actuals vs benchmarks for the *remaining applicable factors*. (PASS / FAIL).
  5. **Score**: Calculate the score as [Number of PASS] / [Total Number of APPLICABLE Factors].
     - *Example*: If 5 factors are N/A, the denominator is 27, not 32.

  VERDICT CRITERIA (STRICT RULE-BASED):
  - **BUY**: If Score percentage is ≥ 70% (e.g., 20/28).
    *Exception*: If "Valuation Benchmark" is FAIL (Overvalued), downgrade to HOLD.
  - **HOLD**: If Score percentage is between 50% and 69%.
  - **SELL**: If Score percentage is < 50%.

  REQUIRED OUTPUT ORDER (To ensure accuracy):
  1. **Sector Classification**
  2. **Detailed Analysis Table** (Only show applicable factors)
  3. **Fundamental Score** (Calculated based on the table above)
  4. **Verdict & Insights**
  
  FORMATTING:
  
  **Sector Classification:** [Sector Name]
  
  ### 📊 Detailed Factor Analysis
  | Factor | Actual Value | Benchmark | Status |
  | :--- | :--- | :--- | :--- |
  | Revenue Growth | 12.5% | 8%+ | ✅ PASS |
  | Operating Margin | 24% | ... | ✅ PASS |
  ... (Only include rows where benchmark is applicable)
  
  ### 🏆 Fundamental Score: [Pass Count]/[Total Applicable Count]
  
  ### 📝 Verdict & Insights
  - **Strengths**: [Key passing metrics]
  - **Weaknesses**: [Key failing metrics]
  - **Final Recommendation**: [Buy/Sell/Hold] (Based on strict criteria above)
  ` : `
  TECHNICAL ANALYSIS LOGIC WITH PATTERN RECOGNITION:

  Below is the TECHNICAL ANALYSIS GUIDE:
  ${TECHNICAL_GUIDE}

  STEPS:
  1. **Fetch Data**: Get daily candle data, RSI(14), MACD, 50/200 SMA, and Volume.
  2. **Apply Guide**: Check for Golden Cross, Overbought/Oversold, and Candlestick patterns.
  3. **Formulate Verdict**: Bullish/Bearish/Neutral.

  REQUIRED OUTPUT FORMAT:
  Start with the verdict clearly.

  ### 🧭 Technical Signal: [Bullish / Bearish / Neutral]
  **Timeframe:** Short to Medium Term

  ### 📉 Key Indicators
  | Indicator | Value | Status/Interpretation |
  | :--- | :--- | :--- |
  | CMP (Price) | ... | ... |
  | RSI (14) | ... | ... |
  | 50-Day SMA | ... | ... |
  | 200-Day SMA | ... | ... |
  | MACD | ... | ... |
  
  ### 🕯️ Pattern & Trend Analysis
  - **Moving Averages**: [Analysis based on Golden/Death cross or trend checks]
  - **Candlestick Patterns**: [Mention specific patterns found]
  - **Momentum**: [RSI and MACD interpretation]
  - **Volume**: [Volume analysis]

  ### 📝 Final Verdict
  - **Action**: [Buy/Sell/Wait]
  - **Support Levels**: [Price levels]
  - **Resistance Levels**: [Price levels]
  `}

  FORMATTING RULES:
  - Use clear Markdown.
  - Use emojis (✅, ❌, ⚠️) in the table status.
  - **ACCURACY CHECK**: The "Fundamental Score" MUST match the exact number of "✅ PASS" rows in the table. Count carefully.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Perform a deep ${isFundamental ? 'fundamental' : 'technical'} analysis of ${stockSymbol} (NSE). Retrieve all required data points.`,
      config: {
        systemInstruction: systemInstruction,
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 4096 } 
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

