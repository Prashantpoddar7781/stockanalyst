export interface Stock {
  symbol: string;
  name: string;
  sector?: string;
}

export enum AnalysisType {
  FUNDAMENTAL = 'FUNDAMENTAL',
  TECHNICAL = 'TECHNICAL'
}

export interface AnalysisResult {
  markdown: string;
  sources: { uri: string; title: string }[];
  timestamp: string;
}

export interface ChartDataPoint {
  metric: string;
  value: number;
  unit: string;
}
