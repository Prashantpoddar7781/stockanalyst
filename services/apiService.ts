import { AnalysisType, AnalysisResult } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const analyzeStock = async (
  stockSymbol: string,
  analysisType: AnalysisType
): Promise<AnalysisResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        symbol: stockSymbol,
        analysisType: analysisType,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate analysis');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('API Error:', error);
    throw new Error(error.message || 'Failed to connect to analysis service');
  }
};

