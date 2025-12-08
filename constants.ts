import { Stock } from './types';

export const SECTOR_BENCHMARKS = `
Sector                 | Revenue Growth | Operating Margin | Net Margin | EPS Growth | ROE  | ROCE | Debt-to-Equity | Interest Coverage | FCF                       | Capex/Sales | Inventory Days | Receivable Days | Valuation Benchmark | P/E    | Current Ratio      | Quick Ratio | Cash Ratio        | Dividend Yield | Dividend Payout Ratio | Price-to-Sales (P/S) | Debt-to-Assets | Debt-to-EBITDA | Financial Leverage Ratio | Operating Cash Flow Growth        | CFO / Net Profit Ratio | Free Cash Flow Yield | Asset Turnover | Operating Cycle (Days) | Payables Days | Revenue CAGR (3–5Y) | EPS CAGR (3–5Y) | Profit CAGR (3–5Y) | FCF CAGR (3–5Y)
-----------------------+----------------+------------------+------------+------------+------+------+----------------+-------------------+---------------------------+-------------+----------------+-----------------+---------------------+--------+--------------------+-------------+-------------------+----------------+-----------------------+----------------------+----------------+----------------+--------------------------+-----------------------------------+------------------------+----------------------+----------------+------------------------+---------------+---------------------+-----------------+--------------------+-----------------------
Banking & Financials   | 8%+            |                  | 8%+        | 10%+       | 12%+ |      |                |                   | Stable positive           |             |                |                 | P/E 10–18x          | 10–18x | N/A (use LCR/CRAR) |             | High vs RBI norms | 0.5–2%         | 15–30%                | 1–6x                 |                |                | Regulated (CAR > 12%)    | In line with profit & loan growth | ~1 over cycle          | 2%+                  |                |                        |               | 10%+                | 12%+            | 12%+               | Positive with advances
Information Technology | 10%+           | 12%+             | 8%+        | 15%+       | 20%+ | 20%+ | <0.5           | >=10x             | Positive, 70%+ conversion | 1–5%        |                | 0–60            | P/E 20–40x          | 20–40x | >1.5               | >1.3        | 0.2–0.6           | 1–3%           | 20–40%                | 3–8x                 | <0.4           | <1             | <2                       | High, aligned with earnings       | 0.9–1.1                | 3%+                  | 1.0+           | 0–80                   | 0–60          | 12%+                | 15%+            | 15%+               | 5%+
Pharma & Healthcare    | 8%+            | 10%+             | 8%+        | 8%+        | 15%+ | 15%+ | <0.5           | >=4x              | Positive                  | 2–6%        | 0–120          | 0–120           | P/E 15–30x          | 15–30x | 1.3–2.0            | 1.0–1.5     | 0.2–0.5           | 0.5–2%         | 15–30%                | 2–5x                 | <0.5           | <2.5           | <2.5                     | Steady with sales                 | 0.8–1.1                | 3%+                  | 0.7+           | 0–160                  | 0–90          | 8%+                 | 8%+             | 8%+                | 3%+
FMCG & Consumer Goods  | 6%+            | 12%+             | 8%+        | 8%+        | 18%+ | 18%+ | <0.5           | >=8x              | Strong                    | 1–4%        | 0–90           | 0–45            | P/E 25–50x          | 25–50x | 1.3–1.8            | 1.0–1.4     | 0.1–0.4           | 1–3%           | 40–70%                | 3–8x                 | <0.4           | <2.0           | <2.0                     | Stable & strong                   | 0.9–1.1                | 3%+                  | 1.5+           | 0–90                   | 0–60          | 6%+                 | 8%+             | 8%+                | 3%+
Automobiles            | 5%+            | 5%+              | 3%+        | 8%+        | 12%+ | 12%+ | 0–1            | >=3x              | Positive                  | 3–8%        | 0–120          | 0–90            | P/E 10–18x          | 10–18x | 1.2–1.6            | 0.9–1.3     | 0.1–0.3           | 1–3%           | 20–40%                | 1–3x                 | 0–0.6          | 0–3            | 0–3.0                    | Cyclical but positive over cycle  | 0.8–1.1                | 2%+                  | 1.0+           | 0–150                  | 0–120         | 6%+                 | 8%+             | 8%+                | 2%+
Metals & Mining        | 0%+            | 5%+              | 3%+        | 8%+        | 8%+  | 8%+  | 0–1.5          | >=2x              | Cyclical                  | 5–12%       | 0–180          | 0–120           | EV/EBITDA 4–8x      | 6–12x  | 1.1–1.5            | 0.8–1.2     | 0.05–0.2          | 1–4%           | 10–30%                | 1–3x                 | 0–0.7          | 0–4            | 0–4                      | Strong in upcycles                | 0.7–1.1                | 3%+                  | 0.7+           | 0–200                  | 0–120         | 5%+                 | 5%+             | 5%+                | 3%+
Oil & Gas              | 3%+            | 5%+              | 3%+        | 5%+        | 10%+ | 10%+ | 0–1            | >=3x              | Mixed                     | 5–15%       | 0–90           | 0–90            | P/E 6–15x           | 6–15x  | 1.1–1.5            | 0.8–1.2     | 0.05–0.2          | 2–5%           | 20–40%                | 0.5–2x               | 0–0.7          | 0–3            | 0–3                      | Linked to margins & prices        | 0.8–1.1                | 4%+                  | 1.0+           | 0–150                  | 0–90          | 4%+                 | 4%+             | 4%+                | 2%+
Power & Utilities      | 3%+            | 10%+             | 8%+        | 5%+        | 12%+ | 10%+ | 0–1.5          | >=2x              | Capex heavy               | 8–20%       | 0–90           | 0–60            | EV/EBITDA 6–12x     | 8–15x  | 1.0–1.4            | 0.8–1.1     | 0.05–0.2          | 2–5%           | 20–40%                | 1–3x                 | 0–0.8          | 0–4            | 0–4                      | Rises post capex phase            | 0.7–1.0                | 4%+                  | 0.4+           | 0–150                  | 0–90          | 3%+                 | 3%+             | 3%+                | 1%+
Infra & Construction   | 8%+            | 5%+              | 3%+        | 10%+       | 10%+ | 10%+ | 0–1.5          | >=2x              | Project-based             | High        | 0–240          | 0–180           | P/E 10–18x          | 10–18x | 1.1–1.5            | 0.8–1.1     | 0.05–0.2          | 0.5–2%         | 10–30%                | 0.3–2x               | 0–0.7          | 0–4            | 0–4                      | Tied to execution & collections   | 0.7–1.0                | 3%+                  | 1.0+           | 0–250                  | 0–150         | 8%+                 | 8%+             | 8%+                | 3%+
Cement & Materials     | 3%+            | 10%+             | 8%+        | 8%+        | 12%+ | 12%+ | 0–1            | >=3x              | Positive                  | 3–8%        | 0–90           | 0–60            | EV/EBITDA 6–12x     | 12–20x | 1.1–1.5            | 0.8–1.1     | 0.05–0.2          | 1–3%           | 15–30%                | 1–3x                 | 0–0.7          | 0–3            | 0–3                      | Healthy in demand upcycle         | 0.8–1.1                | 3%+                  | 0.8+           | 0–140                  | 0–90          | 4%+                 | 5%+             | 5%+                | 2%+
Chemicals              | 6%+            | 8%+              | 6%+        | 8%+        | 15%+ | 15%+ | <0.8           | >=3x              | Positive                  | 3–10%       | 0–120          | 0–120           | P/E 12–25x          | 12–25x | 1.2–1.8            | 1.0–1.4     | 0.1–0.3           | 0.5–2%         | 15–30%                | 2–6x                 | <0.6           | <3             | <3                       | Strong for specialty players      | 0.8–1.1                | 3%+                  | 0.8+           | 0–160                  | 0–90          | 6%+                 | 8%+             | 8%+                | 3%+
Real Estate            | 10%+           | Project-based    | 10%+       | 10%+       | 15%+ | 15%+ | Varies         | >=3x              | Project cashflows         | High        | 0–240          | 0–180           | Yield 6–8% REIT     | 8–20x  | 1.1–1.5            | 0.8–1.1     | 0.05–0.2          | 1–3%           | 10–30%                | 1–3x                 | 0–0.7          | 0–5            | 0–5                      | Lumpy but improving               | 0.6–1.0                | 3%+                  | 1%+            | 0–300                  | 0–150         | 10%+                | 10%+            | 10%+               | Variable
Telecom                | 0%+            | 25%+             | 8%+        | 5%+        | 12%+ | 12%+ | 0–1.5          | >=2x              | Capex heavy               | 8–18%       | 0–120          | 0–120           | EV/EBITDA 4–10x     | 10–18x | 0.9–1.3            | 0.7–1.0     | 0.05–0.2          | 0–2%           | 0–30%                 | 1–3x                 | 0–0.8          | 0–4            | 0–5                      | Improves after heavy capex        | 0.7–1.0                | 3%+                  | 1%+            | 0–200                  | 0–120         | 3%+                 | 3%+             | 3%+                | 1%+
Media & Entertainment  | 8%+            | 8%+              | 6%+        | 10%+       | 15%+ | 15%+ | <0.5           | >=4x              | Positive                  | 2–6%        | 0–60           | 0–60            | P/E 15–30x          | 15–30x | 1.1–1.6            | 0.9–1.3     | 0.05–0.2          | 0.5–2%         | 10–30%                | 2–5x                 | 0–0.6          | <2.5           | <2.5                     | Positive with ad cycle            | 0.8–1.1                | 2%+                  | 0.8+           | 0–120                  | 0–90          | 8%+                 | 8%+             | 8%+                | 3%+
Retail & E-commerce    | 8%+            | 3%+              | 2%+        | 10%+       | 12%+ | 12%+ | <1             | >=3x              | Positive                  | 3–8%        | 0–90           | 0–45            | P/E 15–30x          | 15–30x | 1.1–1.6            | 0.9–1.3     | 0.05–0.2          | 0.5–2%         | 10–30%                | 1–3x                 | 0–0.6          | <3             | <3                       | Improving as scale grows          | 0.8–1.1                | 2%+                  | 2.0+           | 0–120                  | 0–60          | 10%+                | 10%+            | 10%+               | 3%+
Hospitality            | 5%+            | 10%+             | 5%+        | 8%+        | 12%+ | 12%+ | 0–1.5          | >=2x              | Cyclical                  | 5–12%       | 0–60           | 0–60            | Varies              | 10–20x | 1.0–1.5            | 0.8–1.1     | 0.05–0.2          | 0–2%           | 0–30%                 | 1–3x                 | 0–0.7          | 0–4            | 0–4                      | Cyclical with occupancy           | 0.7–1.0                | 2%+                  | 0.8+           | 0–120                  | 0–90          | 5%+                 | 5%+             | 5%+                | 2%+
Agriculture            | 4%+            | Varies           | 5%+        | 5%+        | 12%+ | 12%+ | <1             | >=3x              | Seasonal                  | 1–5%        | 0–120          | 0–60            | P/E 10–20x          | 10–20x | 1.1–1.6            | 0.9–1.3     | 0.05–0.2          | 1–3%           | 10–30%                | 1–3x                 | 0–0.6          | <3             | <3                       | Seasonally volatile               | 0.7–1.1                | 3%+                  | 1%+            | 0–160                  | 0–90          | 4%+                 | 4%+             | 4%+                | 2%+
Textiles               | 4%+            | 6%+              | 4%+        | 5%+        | 12%+ | 10%+ | <0.8           | >=3x              | Seasonal                  | 2–6%        | 0–180          | 0–90            | P/E 10–20x          | 10–20x | 1.1–1.6            | 0.8–1.2     | 0.05–0.2          | 0–2%           | 10–30%                | 1–3x                 | 0–0.6          | 0–4            | 0–4                      | Volatile with exports & demand    | 0.7–1.1                | 3%+                  | 1%+            | 0–200                  | 0–120         | 4%+                 | 4%+             | 4%+                | 2%+
Logistics              | 8%+            | 6%+              | 5%+        | 8%+        | 12%+ | 12%+ | 0–1            | >=3x              | Positive                  | 3–8%        | 0–90           | 0–60            | P/E 12–25x          | 12–25x | 1.1–1.6            | 0.9–1.3     | 0.05–0.2          | 0.5–2%         | 10–30%                | 1–3x                 | 0–0.6          | <3             | <3                       | Strong with volume growth         | 0.8–1.1                | 3%+                  | 2.0+           | 0–120                  | 0–90          | 8%+                 | 8%+             | 8%+                | 3%+
Defence                | 6%+            | 8%+              | 6%+        | 8%+        | 12%+ | 12%+ | <1             | >=3x              | Orderbook driven          | 3–8%        | 0–60           | 0–60            | P/E 15–30x          | 15–30x | 1.1–1.6            | 0.9–1.3     | 0.05–0.2          | 0.5–2%         | 10–30%                | 1–3x                 | 0–0.6          | <3             | <3                       | Steady with execution             | 0.8–1.1                | 3%+                  | 1%+            | 0–120                  | 0–90          | 6%+                 | 6%+             | 6%+                | 3%+
Capital Goods          | 6%+            | 6%+              | 5%+        | 6%+        | 12%+ | 12%+ | 0–1            | >=3x              | Orderbook driven          | 3–8%        | 0–90           | 0–90            | P/E 12–25x          | 12–25x | 1.1–1.6            | 0.9–1.3     | 0.05–0.2          | 0.5–2%         | 10–30%                | 1–3x                 | 0–0.6          | <3             | <3                       | Tied to capex cycle               | 0.8–1.1                | 3%+                  | 1%+            | 0–150                  | 0–90          | 6%+                 | 6%+             | 6%+                | 3%+
`;

export const TECHNICAL_GUIDE = `
Candlestick Patterns
- Hammer: After downtrend, small body at top, long lower wick. Bullish.
- Inverted Hammer: After downtrend, small body at bottom, long upper wick. Bullish.
- Shooting Star: After uptrend, small body at bottom, long upper wick. Bearish.
- Doji: Open approx equal to close. Indecision.
- Spinning Top: Small body, indecision.
- Bullish Marubozu: Long green, no wick. Strong Buying.
- Bearish Marubozu: Long red, no wick. Strong Selling.
- Bullish Engulfing: Green engulfs previous red. Bullish.
- Bearish Engulfing: Red engulfs previous green. Bearish.
- Morning Star: Bearish -> Indecision -> Strong Bullish. Reversal Up.
- Evening Star: Bullish -> Indecision -> Strong Bearish. Reversal Down.
- Tweezer Top: Equal highs at top. Resistance.
- Tweezer Bottom: Equal lows at bottom. Support.
- Piercing Pattern: Green closes above 50% of previous red. Bullish.
- Dark Cloud Cover: Red closes below 50% of previous green. Bearish.
- Three White Soldiers: 3 consecutive strong greens. Bullish.
- Three Black Crows: 3 consecutive strong reds. Bearish.

Chart Patterns
- Head and Shoulders: Bearish Reversal. Short on neckline break.
- Inverse H&S: Bullish Reversal. Long on neckline break.
- Double Top: Bearish. Short on neckline break.
- Double Bottom: Bullish. Long on neckline break.
- Triple Top/Bottom: Reversal patterns.
- Rounding Top/Bottom: Slow reversal.
- Falling Wedge: Bullish. Long on breakout.
- Rising Wedge: Bearish. Short on breakdown.
- Bullish Flag/Pennant: Continuation Up.
- Bearish Flag/Pennant: Continuation Down.
- Symmetrical/Ascending/Descending Triangles: Breakout patterns.
- Cup and Handle: Bullish Continuation.

Moving Averages
- Uptrend: Price > Rising MA.
- Downtrend: Price < Falling MA.
- Golden Cross: 50 MA crosses ABOVE 200 MA. Bullish.
- Death Cross: 50 MA crosses BELOW 200 MA. Bearish.
- MA Slope: Steep = Strong Trend. Flat = Sideways.

Momentum & Volume
- RSI > 70: Overbought (Caution/Sell).
- RSI < 30: Oversold (Buy opportunity).
- Volume Breakout: Breakout with high volume is reliable.
- Volume Divergence: Price high, volume low -> Weakness.
- VWAP: Intraday reference. Above = Bullish.
`;

// A larger list of popular NSE Stocks (Approximating Nifty 200/500 coverage)
export const NSE_STOCKS: Stock[] = [
  // NIFTY 50
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', sector: 'Oil & Gas' },
  { symbol: 'TCS', name: 'Tata Consultancy Services Ltd', sector: 'Information Technology' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', sector: 'Banking & Financials' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', sector: 'Banking & Financials' },
  { symbol: 'INFY', name: 'Infosys Ltd', sector: 'Information Technology' },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', sector: 'FMCG & Consumer Goods' },
  { symbol: 'ITC', name: 'ITC Ltd', sector: 'FMCG & Consumer Goods' },
  { symbol: 'SBIN', name: 'State Bank of India', sector: 'Banking & Financials' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', sector: 'Telecom' },
  { symbol: 'LICI', name: 'Life Insurance Corporation of India', sector: 'Banking & Financials' },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank Ltd', sector: 'Banking & Financials' },
  { symbol: 'LT', name: 'Larsen & Toubro Ltd', sector: 'Infra & Construction' },
  { symbol: 'AXISBANK', name: 'Axis Bank Ltd', sector: 'Banking & Financials' },
  { symbol: 'HCLTECH', name: 'HCL Technologies Ltd', sector: 'Information Technology' },
  { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd', sector: 'FMCG & Consumer Goods' },
  { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd', sector: 'Automobiles' },
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical Industries Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'TITAN', name: 'Titan Company Ltd', sector: 'Retail & E-commerce' },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd', sector: 'Banking & Financials' },
  { symbol: 'ULTRACEMCO', name: 'UltraTech Cement Ltd', sector: 'Cement & Materials' },
  { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd', sector: 'Automobiles' },
  { symbol: 'NTPC', name: 'NTPC Ltd', sector: 'Power & Utilities' },
  { symbol: 'ONGC', name: 'Oil & Natural Gas Corporation Ltd', sector: 'Oil & Gas' },
  { symbol: 'POWERGRID', name: 'Power Grid Corporation of India Ltd', sector: 'Power & Utilities' },
  { symbol: 'WIPRO', name: 'Wipro Ltd', sector: 'Information Technology' },
  { symbol: 'M&M', name: 'Mahindra & Mahindra Ltd', sector: 'Automobiles' },
  { symbol: 'ADANIENT', name: 'Adani Enterprises Ltd', sector: 'Metals & Mining' },
  { symbol: 'ADANIPORTS', name: 'Adani Ports and Special Economic Zone Ltd', sector: 'Infra & Construction' },
  { symbol: 'COALINDIA', name: 'Coal India Ltd', sector: 'Metals & Mining' },
  { symbol: 'BAJAJFINSV', name: 'Bajaj Finserv Ltd', sector: 'Banking & Financials' },
  { symbol: 'TATAPOWER', name: 'Tata Power Company Ltd', sector: 'Power & Utilities' },
  { symbol: 'TATASTEEL', name: 'Tata Steel Ltd', sector: 'Metals & Mining' },
  { symbol: 'JSWSTEEL', name: 'JSW Steel Ltd', sector: 'Metals & Mining' },
  { symbol: 'GRASIM', name: 'Grasim Industries Ltd', sector: 'Cement & Materials' },
  { symbol: 'TECHM', name: 'Tech Mahindra Ltd', sector: 'Information Technology' },
  { symbol: 'BRITANNIA', name: 'Britannia Industries Ltd', sector: 'FMCG & Consumer Goods' },
  { symbol: 'INDUSINDBK', name: 'IndusInd Bank Ltd', sector: 'Banking & Financials' },
  { symbol: 'HINDALCO', name: 'Hindalco Industries Ltd', sector: 'Metals & Mining' },
  { symbol: 'DIVISLAB', name: 'Divi\'s Laboratories Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'CIPLA', name: 'Cipla Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'SBILIFE', name: 'SBI Life Insurance Company Ltd', sector: 'Banking & Financials' },
  { symbol: 'HDFCLIFE', name: 'HDFC Life Insurance Company Ltd', sector: 'Banking & Financials' },
  { symbol: 'DRREDDY', name: 'Dr. Reddy\'s Laboratories Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'EICHERMOT', name: 'Eicher Motors Ltd', sector: 'Automobiles' },
  { symbol: 'BPCL', name: 'Bharat Petroleum Corporation Ltd', sector: 'Oil & Gas' },
  { symbol: 'HEROMOTOCO', name: 'Hero MotoCorp Ltd', sector: 'Automobiles' },
  { symbol: 'APOLLOHOSP', name: 'Apollo Hospitals Enterprise Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'SHRIRAMFIN', name: 'Shriram Finance Ltd', sector: 'Banking & Financials' },
  
  // NIFTY NEXT 50 & OTHERS
  { symbol: 'ZOMATO', name: 'Zomato Ltd', sector: 'Retail & E-commerce' },
  { symbol: 'PAYTM', name: 'One 97 Communications Ltd', sector: 'Banking & Financials' },
  { symbol: 'VEDL', name: 'Vedanta Ltd', sector: 'Metals & Mining' },
  { symbol: 'JIOFIN', name: 'Jio Financial Services Ltd', sector: 'Banking & Financials' },
  { symbol: 'DMART', name: 'Avenue Supermarts Ltd', sector: 'Retail & E-commerce' },
  { symbol: 'HAL', name: 'Hindustan Aeronautics Ltd', sector: 'Defence' },
  { symbol: 'IRFC', name: 'Indian Railway Finance Corporation Ltd', sector: 'Banking & Financials' },
  { symbol: 'VBL', name: 'Varun Beverages Ltd', sector: 'FMCG & Consumer Goods' },
  { symbol: 'DLF', name: 'DLF Ltd', sector: 'Real Estate' },
  { symbol: 'INDIGO', name: 'InterGlobe Aviation Ltd', sector: 'Logistics' },
  { symbol: 'GODREJCP', name: 'Godrej Consumer Products Ltd', sector: 'FMCG & Consumer Goods' },
  { symbol: 'LTIM', name: 'LTIMindtree Ltd', sector: 'Information Technology' },
  { symbol: 'BEL', name: 'Bharat Electronics Ltd', sector: 'Defence' },
  { symbol: 'ADANIGREEN', name: 'Adani Green Energy Ltd', sector: 'Power & Utilities' },
  { symbol: 'ADANIPOWER', name: 'Adani Power Ltd', sector: 'Power & Utilities' },
  { symbol: 'PIDILITIND', name: 'Pidilite Industries Ltd', sector: 'Chemicals' },
  { symbol: 'SIEMENS', name: 'Siemens Ltd', sector: 'Capital Goods' },
  { symbol: 'IOC', name: 'Indian Oil Corporation Ltd', sector: 'Oil & Gas' },
  { symbol: 'RECLTD', name: 'REC Ltd', sector: 'Banking & Financials' },
  { symbol: 'SHREECEM', name: 'Shree Cement Ltd', sector: 'Cement & Materials' },
  { symbol: 'PFC', name: 'Power Finance Corporation Ltd', sector: 'Banking & Financials' },
  { symbol: 'TRENT', name: 'Trent Ltd', sector: 'Retail & E-commerce' },
  { symbol: 'GAIL', name: 'GAIL (India) Ltd', sector: 'Oil & Gas' },
  { symbol: 'AMBUJACEM', name: 'Ambuja Cements Ltd', sector: 'Cement & Materials' },
  { symbol: 'PNB', name: 'Punjab National Bank', sector: 'Banking & Financials' },
  { symbol: 'BANKBARODA', name: 'Bank of Baroda', sector: 'Banking & Financials' },
  { symbol: 'TVSMOTOR', name: 'TVS Motor Company Ltd', sector: 'Automobiles' },
  { symbol: 'LODHA', name: 'Macrotech Developers Ltd', sector: 'Real Estate' },
  { symbol: 'ABB', name: 'ABB India Ltd', sector: 'Capital Goods' },
  { symbol: 'NAUKRI', name: 'Info Edge (India) Ltd', sector: 'Information Technology' },
  { symbol: 'POLYCAB', name: 'Polycab India Ltd', sector: 'Capital Goods' },
  { symbol: 'CANBK', name: 'Canara Bank', sector: 'Banking & Financials' },
  { symbol: 'IRCTC', name: 'Indian Railway Catering and Tourism Corp', sector: 'Hospitality' },
  { symbol: 'UNIONBANK', name: 'Union Bank of India', sector: 'Banking & Financials' },
  { symbol: 'TORNTPHARM', name: 'Torrent Pharmaceuticals Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'MANKIND', name: 'Mankind Pharma Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'ZYDUSLIFE', name: 'Zydus Lifesciences Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'HAVELLS', name: 'Havells India Ltd', sector: 'Capital Goods' },
  { symbol: 'CUMMINSIND', name: 'Cummins India Ltd', sector: 'Capital Goods' },
  { symbol: 'OBEROIRLTY', name: 'Oberoi Realty Ltd', sector: 'Real Estate' },
  { symbol: 'GODREJPROP', name: 'Godrej Properties Ltd', sector: 'Real Estate' },
  { symbol: 'MOTHERSON', name: 'Samvardhana Motherson International', sector: 'Automobiles' },
  { symbol: 'MARICO', name: 'Marico Ltd', sector: 'FMCG & Consumer Goods' },
  { symbol: 'PIIND', name: 'PI Industries Ltd', sector: 'Chemicals' },
  { symbol: 'UPL', name: 'UPL Ltd', sector: 'Chemicals' },
  { symbol: 'SRF', name: 'SRF Ltd', sector: 'Chemicals' },
  { symbol: 'COLPAL', name: 'Colgate-Palmolive (India) Ltd', sector: 'FMCG & Consumer Goods' },
  { symbol: 'BERGEPAINT', name: 'Berger Paints India Ltd', sector: 'FMCG & Consumer Goods' },
  { symbol: 'ICICIGI', name: 'ICICI Lombard General Insurance Co', sector: 'Banking & Financials' },
  { symbol: 'DABUR', name: 'Dabur India Ltd', sector: 'FMCG & Consumer Goods' },
  { symbol: 'MAXHEALTH', name: 'Max Healthcare Institute Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'BOSCHLTD', name: 'Bosch Ltd', sector: 'Automobiles' },
  { symbol: 'ASHOKLEY', name: 'Ashok Leyland Ltd', sector: 'Automobiles' },
  { symbol: 'AUBANK', name: 'AU Small Finance Bank Ltd', sector: 'Banking & Financials' },
  { symbol: 'BHARATFORG', name: 'Bharat Forge Ltd', sector: 'Capital Goods' },
  { symbol: 'PERSISTENT', name: 'Persistent Systems Ltd', sector: 'Information Technology' },
  { symbol: 'IDFCFIRSTB', name: 'IDFC First Bank Ltd', sector: 'Banking & Financials' },
  { symbol: 'MPHASIS', name: 'Mphasis Ltd', sector: 'Information Technology' },
  { symbol: 'LTTS', name: 'L&T Technology Services Ltd', sector: 'Information Technology' },
  { symbol: 'MRF', name: 'MRF Ltd', sector: 'Automobiles' },
  { symbol: 'CONCOR', name: 'Container Corporation of India Ltd', sector: 'Logistics' },
  { symbol: 'ASTRAL', name: 'Astral Ltd', sector: 'Capital Goods' },
  { symbol: 'JINDALSTEL', name: 'Jindal Steel & Power Ltd', sector: 'Metals & Mining' },
  { symbol: 'NHPC', name: 'NHPC Ltd', sector: 'Power & Utilities' },
  { symbol: 'NMDC', name: 'NMDC Ltd', sector: 'Metals & Mining' },
  { symbol: 'SJVN', name: 'SJVN Ltd', sector: 'Power & Utilities' },
  { symbol: 'ABCAPITAL', name: 'Aditya Birla Capital Ltd', sector: 'Banking & Financials' },
  { symbol: 'LUPIN', name: 'Lupin Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'BIOCON', name: 'Biocon Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'BANDHANBNK', name: 'Bandhan Bank Ltd', sector: 'Banking & Financials' },
  { symbol: 'JUBLFOOD', name: 'Jubilant FoodWorks Ltd', sector: 'Hospitality' },
  { symbol: 'GMRINFRA', name: 'GMR Airports Infrastructure Ltd', sector: 'Infra & Construction' },
  { symbol: 'RVNL', name: 'Rail Vikas Nigam Ltd', sector: 'Infra & Construction' },
  { symbol: 'MAZDOCK', name: 'Mazagon Dock Shipbuilders Ltd', sector: 'Defence' },
  { symbol: 'COCHINSHIP', name: 'Cochin Shipyard Ltd', sector: 'Defence' },
  { symbol: 'BHEL', name: 'Bharat Heavy Electricals Ltd', sector: 'Capital Goods' },
  { symbol: 'SAIL', name: 'Steel Authority of India Ltd', sector: 'Metals & Mining' },
  { symbol: 'PETRONET', name: 'Petronet LNG Ltd', sector: 'Oil & Gas' },
  { symbol: 'YESBANK', name: 'Yes Bank Ltd', sector: 'Banking & Financials' },
  { symbol: 'IDEA', name: 'Vodafone Idea Ltd', sector: 'Telecom' },
  { symbol: 'SUZLON', name: 'Suzlon Energy Ltd', sector: 'Power & Utilities' },
  { symbol: 'TRIDENT', name: 'Trident Ltd', sector: 'Textiles' },
  { symbol: 'RAYMOND', name: 'Raymond Ltd', sector: 'Textiles' },
  { symbol: 'KPRMILL', name: 'K.P.R. Mill Ltd', sector: 'Textiles' },
  { symbol: 'WELSPUNLIV', name: 'Welspun Living Ltd', sector: 'Textiles' },
  { symbol: 'PAGEIND', name: 'Page Industries Ltd', sector: 'Textiles' },
  { symbol: 'PVRINOX', name: 'PVR INOX Ltd', sector: 'Media & Entertainment' },
  { symbol: 'ZEEL', name: 'Zee Entertainment Enterprises Ltd', sector: 'Media & Entertainment' },
  { symbol: 'SUNTV', name: 'Sun TV Network Ltd', sector: 'Media & Entertainment' },
  { symbol: 'NYKAA', name: 'FSN E-Commerce Ventures Ltd', sector: 'Retail & E-commerce' },
  { symbol: 'DELHIVERY', name: 'Delhivery Ltd', sector: 'Logistics' },
  { symbol: 'BLUE DART', name: 'Blue Dart Express Ltd', sector: 'Logistics' },
  { symbol: 'EIHOTEL', name: 'EIH Ltd', sector: 'Hospitality' },
  { symbol: 'INDHOTEL', name: 'The Indian Hotels Company Ltd', sector: 'Hospitality' },
  { symbol: 'CHALET', name: 'Chalet Hotels Ltd', sector: 'Hospitality' },
  { symbol: 'UBL', name: 'United Breweries Ltd', sector: 'FMCG & Consumer Goods' },
  { symbol: 'MCDOWELL-N', name: 'United Spirits Ltd', sector: 'FMCG & Consumer Goods' },
  { symbol: 'RADICO', name: 'Radico Khaitan Ltd', sector: 'FMCG & Consumer Goods' },
  { symbol: 'COROMANDEL', name: 'Coromandel International Ltd', sector: 'Agriculture' },
  { symbol: 'CHAMBLFERT', name: 'Chambal Fertilisers and Chemicals Ltd', sector: 'Agriculture' },
  { symbol: 'FACT', name: 'Fertilisers and Chemicals Travancore Ltd', sector: 'Agriculture' },
  { symbol: 'BAYERCROP', name: 'Bayer CropScience Ltd', sector: 'Agriculture' },
  { symbol: 'KAJARIACER', name: 'Kajaria Ceramics Ltd', sector: 'Cement & Materials' },
  { symbol: 'CENTURYPLY', name: 'Century Plyboards (India) Ltd', sector: 'Cement & Materials' },
  { symbol: 'APLAPOLLO', name: 'APL Apollo Tubes Ltd', sector: 'Capital Goods' },
  { symbol: 'SOLARINDS', name: 'Solar Industries India Ltd', sector: 'Chemicals' },
  { symbol: 'DEEPAKNTR', name: 'Deepak Nitrite Ltd', sector: 'Chemicals' },
  { symbol: 'TATACHEM', name: 'Tata Chemicals Ltd', sector: 'Chemicals' },
  { symbol: 'ATGL', name: 'Adani Total Gas Ltd', sector: 'Oil & Gas' },
  { symbol: 'IGL', name: 'Indraprastha Gas Ltd', sector: 'Oil & Gas' },
  { symbol: 'MGL', name: 'Mahanagar Gas Ltd', sector: 'Oil & Gas' },
  { symbol: 'POLICYBZR', name: 'PB Fintech Ltd', sector: 'Banking & Financials' },
  { symbol: 'KPITTECH', name: 'KPIT Technologies Ltd', sector: 'Information Technology' },
  { symbol: 'TATAELXSI', name: 'Tata Elxsi Ltd', sector: 'Information Technology' },
  { symbol: 'COFORGE', name: 'Coforge Ltd', sector: 'Information Technology' },
  { symbol: 'ACC', name: 'ACC Ltd', sector: 'Cement & Materials' },
  { symbol: 'DALBHARAT', name: 'Dalmia Bharat Ltd', sector: 'Cement & Materials' },
  { symbol: 'JKCEMENT', name: 'J.K. Cement Ltd', sector: 'Cement & Materials' },
  { symbol: 'RAMCOCEM', name: 'The Ramco Cements Ltd', sector: 'Cement & Materials' },
  { symbol: 'PRESTIGE', name: 'Prestige Estates Projects Ltd', sector: 'Real Estate' },
  { symbol: 'PHOENIXLTD', name: 'The Phoenix Mills Ltd', sector: 'Real Estate' },
  { symbol: 'BRIGADE', name: 'Brigade Enterprises Ltd', sector: 'Real Estate' },
  { symbol: 'MFSL', name: 'Max Financial Services Ltd', sector: 'Banking & Financials' },
  { symbol: 'NIACL', name: 'The New India Assurance Company Ltd', sector: 'Banking & Financials' },
  { symbol: 'GICRE', name: 'General Insurance Corporation of India', sector: 'Banking & Financials' },
  { symbol: 'HINDPETRO', name: 'Hindustan Petroleum Corporation Ltd', sector: 'Oil & Gas' },
  { symbol: 'OIL', name: 'Oil India Ltd', sector: 'Oil & Gas' },
  { symbol: 'INDTOWER', name: 'Indus Towers Ltd', sector: 'Telecom' },
  { symbol: 'TATACOMM', name: 'Tata Communications Ltd', sector: 'Telecom' },
  { symbol: 'SUNDARMFIN', name: 'Sundaram Finance Ltd', sector: 'Banking & Financials' },
  { symbol: 'M&MFIN', name: 'Mahindra & Mahindra Financial Services Ltd', sector: 'Banking & Financials' },
  { symbol: 'CHOLAFIN', name: 'Cholamandalam Investment and Finance Company Ltd', sector: 'Banking & Financials' },
  { symbol: 'POONAWALLA', name: 'Poonawalla Fincorp Ltd', sector: 'Banking & Financials' },
  { symbol: 'BSE', name: 'BSE Ltd', sector: 'Banking & Financials' },
  { symbol: 'MCX', name: 'Multi Commodity Exchange of India Ltd', sector: 'Banking & Financials' },
  { symbol: 'CDSL', name: 'Central Depository Services (India) Ltd', sector: 'Banking & Financials' },
  { symbol: 'ISEC', name: 'ICICI Securities Ltd', sector: 'Banking & Financials' },
  { symbol: 'ANGELONE', name: 'Angel One Ltd', sector: 'Banking & Financials' },
  { symbol: 'MOTILALOFS', name: 'Motilal Oswal Financial Services Ltd', sector: 'Banking & Financials' },
  { symbol: '360ONE', name: '360 ONE WAM LTD', sector: 'Banking & Financials' },
  { symbol: 'CRISIL', name: 'CRISIL Ltd', sector: 'Banking & Financials' },
  { symbol: 'ABBOTINDIA', name: 'Abbott India Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'ALKEM', name: 'Alkem Laboratories Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'AUROPHARMA', name: 'Aurobindo Pharma Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'GLAND', name: 'Gland Pharma Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'GLAXO', name: 'GlaxoSmithKline Pharmaceuticals Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'IPCALAB', name: 'IPCA Laboratories Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'JBCHEPHARM', name: 'J.B. Chemicals & Pharmaceuticals Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'LAURUSLABS', name: 'Laurus Labs Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'NATCOPHARM', name: 'Natco Pharma Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'SYNGENE', name: 'Syngene International Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'PFIZER', name: 'Pfizer Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'SANOFI', name: 'Sanofi India Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'AIAENG', name: 'AIA Engineering Ltd', sector: 'Capital Goods' },
  { symbol: 'CARBORUNIV', name: 'Carborundum Universal Ltd', sector: 'Capital Goods' },
  { symbol: 'CGPOWER', name: 'CG Power and Industrial Solutions Ltd', sector: 'Capital Goods' },
  { symbol: 'ELGIEQUIP', name: 'Elgi Equipments Ltd', sector: 'Capital Goods' },
  { symbol: 'GRINDWELL', name: 'Grindwell Norton Ltd', sector: 'Capital Goods' },
  { symbol: 'HONAUT', name: 'Honeywell Automation India Ltd', sector: 'Capital Goods' },
  { symbol: 'SCHAEFFLER', name: 'Schaeffler India Ltd', sector: 'Capital Goods' },
  { symbol: 'SKFINDIA', name: 'SKF India Ltd', sector: 'Capital Goods' },
  { symbol: 'THERMAX', name: 'Thermax Ltd', sector: 'Capital Goods' },
  { symbol: 'TIMKEN', name: 'Timken India Ltd', sector: 'Capital Goods' },
  { symbol: 'VOLTAS', name: 'Voltas Ltd', sector: 'Capital Goods' },
  { symbol: 'WHIRLPOOL', name: 'Whirlpool of India Ltd', sector: 'FMCG & Consumer Goods' },
  { symbol: 'CROMPTON', name: 'Crompton Greaves Consumer Electricals Ltd', sector: 'FMCG & Consumer Goods' },
  { symbol: 'DIXON', name: 'Dixon Technologies (India) Ltd', sector: 'FMCG & Consumer Goods' },
  { symbol: 'AMBER', name: 'Amber Enterprises India Ltd', sector: 'FMCG & Consumer Goods' },
  { symbol: 'KAYNES', name: 'Kaynes Technology India Ltd', sector: 'FMCG & Consumer Goods' },
  { symbol: 'AARTIIND', name: 'Aarti Industries Ltd', sector: 'Chemicals' },
  { symbol: 'ALKYLAMINE', name: 'Alkyl Amines Chemicals Ltd', sector: 'Chemicals' },
  { symbol: 'ATUL', name: 'Atul Ltd', sector: 'Chemicals' },
  { symbol: 'CLEAN', name: 'Clean Science and Technology Ltd', sector: 'Chemicals' },
  { symbol: 'FLUOROCHEM', name: 'Gujarat Fluorochemicals Ltd', sector: 'Chemicals' },
  { symbol: 'LINDEINDIA', name: 'Linde India Ltd', sector: 'Chemicals' },
  { symbol: 'NAVINFLUOR', name: 'Navin Fluorine International Ltd', sector: 'Chemicals' },
  { symbol: 'VINATIORGA', name: 'Vinati Organics Ltd', sector: 'Chemicals' },
  { symbol: 'DEVYANI', name: 'Devyani International Ltd', sector: 'Hospitality' },
  { symbol: 'SAPPHIRE', name: 'Sapphire Foods India Ltd', sector: 'Hospitality' },
  { symbol: 'WESTLIFE', name: 'Westlife Foodworld Ltd', sector: 'Hospitality' },
  { symbol: 'MANYAVAR', name: 'Vedant Fashions Ltd', sector: 'Retail & E-commerce' },
  { symbol: 'METROBRAND', name: 'Metro Brands Ltd', sector: 'Retail & E-commerce' },
  { symbol: 'BATAINDIA', name: 'Bata India Ltd', sector: 'Retail & E-commerce' },
  { symbol: 'RELAXO', name: 'Relaxo Footwears Ltd', sector: 'Retail & E-commerce' },
  { symbol: 'TTKPRESTIG', name: 'TTK Prestige Ltd', sector: 'FMCG & Consumer Goods' },
  { symbol: 'NAM-INDIA', name: 'Nippon Life India Asset Management Ltd', sector: 'Banking & Financials' },
  { symbol: 'HAMSFERGEN', name: 'CAMS', sector: 'Banking & Financials' },
  { symbol: 'LALPATHLAB', name: 'Dr. Lal PathLabs Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'METROPOLIS', name: 'Metropolis Healthcare Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'VIJAYA', name: 'Vijaya Diagnostic Centre Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'NH', name: 'Narayana Hrudayalaya Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'FORTIS', name: 'Fortis Healthcare Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'ASTERDM', name: 'Aster DM Healthcare Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'KIMS', name: 'Krishna Institute of Medical Sciences Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'RAINBOW', name: 'Rainbow Childrens Medicare Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'MEDANTA', name: 'Global Health Ltd', sector: 'Pharma & Healthcare' },
  { symbol: 'BSOFT', name: 'Birlasoft Ltd', sector: 'Information Technology' },
  { symbol: 'CYIENT', name: 'Cyient Ltd', sector: 'Information Technology' },
  { symbol: 'ZENSARTECH', name: 'Zensar Technologies Ltd', sector: 'Information Technology' },
  { symbol: 'SONACOMS', name: 'Sona BLW Precision Forgings Ltd', sector: 'Automobiles' },
  { symbol: 'TIINDIA', name: 'Tube Investments of India Ltd', sector: 'Automobiles' },
  { symbol: 'UNO_MINDA', name: 'Uno Minda Ltd', sector: 'Automobiles' },
  { symbol: 'ENDURANCE', name: 'Endurance Technologies Ltd', sector: 'Automobiles' },
  { symbol: 'SUNDRMFAST', name: 'Sundram Fasteners Ltd', sector: 'Automobiles' },
  { symbol: 'EXIDEIND', name: 'Exide Industries Ltd', sector: 'Automobiles' },
  { symbol: 'AMARAJABAT', name: 'Amara Raja Energy & Mobility Ltd', sector: 'Automobiles' },
  { symbol: 'JBMA', name: 'JBM Auto Ltd', sector: 'Automobiles' },
  { symbol: 'OLECTRA', name: 'Olectra Greentech Ltd', sector: 'Automobiles' },
  { symbol: 'APARINDS', name: 'Apar Industries Ltd', sector: 'Capital Goods' },
  { symbol: 'KEI', name: 'KEI Industries Ltd', sector: 'Capital Goods' },
  { symbol: 'FINCABLES', name: 'Finolex Cables Ltd', sector: 'Capital Goods' },
  { symbol: 'VGUARD', name: 'V-Guard Industries Ltd', sector: 'Capital Goods' },
  { symbol: 'SYRMA', name: 'Syrma SGS Technology Ltd', sector: 'Capital Goods' },
  { symbol: 'TEJASNET', name: 'Tejas Networks Ltd', sector: 'Telecom' },
  { symbol: 'ITI', name: 'ITI Ltd', sector: 'Telecom' },
  { symbol: 'HFCL', name: 'HFCL Ltd', sector: 'Telecom' },
  { symbol: 'RAILTEL', name: 'RailTel Corporation of India Ltd', sector: 'Telecom' },
  { symbol: 'RITES', name: 'RITES Ltd', sector: 'Infra & Construction' },
  { symbol: 'IRCON', name: 'Ircon International Ltd', sector: 'Infra & Construction' },
  { symbol: 'NBCC', name: 'NBCC (India) Ltd', sector: 'Infra & Construction' },
  { symbol: 'NCC', name: 'NCC Ltd', sector: 'Infra & Construction' },
  { symbol: 'PNCINFRA', name: 'PNC Infratech Ltd', sector: 'Infra & Construction' },
  { symbol: 'KNRCON', name: 'KNR Constructions Ltd', sector: 'Infra & Construction' },
  { symbol: 'GRINFRA', name: 'G R Infraprojects Ltd', sector: 'Infra & Construction' },
  { symbol: 'HGINFRA', name: 'H.G. Infra Engineering Ltd', sector: 'Infra & Construction' },
  { symbol: 'ASHOKA', name: 'Ashoka Buildcon Ltd', sector: 'Infra & Construction' },
  { symbol: 'DUMMY1', name: 'Nifty 50 ETF', sector: 'Banking & Financials' }, // Fallback/Test
];