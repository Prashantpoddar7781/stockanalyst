import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { analyzeStock } from './services/geminiService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy - required for Railway/reverse proxy deployments
app.set('trust proxy', 1);

// Security middleware - configure for mobile apps
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false
}));

// CORS configuration - allow Vercel preview URLs and localhost
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  'http://localhost:3000',
  'http://localhost:5173',
  'capacitor://localhost'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    // This is critical for Capacitor apps which may not send an origin header
    if (!origin) {
      return callback(null, true);
    }
    
    // Check if origin is in allowed list
    if (allowedOrigins.some(allowed => origin === allowed)) {
      return callback(null, true);
    }
    
    // Allow all Vercel preview URLs
    if (origin.includes('.vercel.app')) {
      return callback(null, true);
    }
    
    // Allow Capacitor/ionic origins (mobile apps)
    if (origin.startsWith('capacitor://') || origin.startsWith('ionic://') || origin.startsWith('http://localhost') || origin.startsWith('https://localhost')) {
      return callback(null, true);
    }
    
    // Allow file:// origins (some mobile app scenarios)
    if (origin.startsWith('file://')) {
      return callback(null, true);
    }
    
    // Reject unknown origins
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Health check
app.get('/health', (req: express.Request, res: express.Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Stock analysis endpoint
app.post('/api/analyze', async (req: express.Request, res: express.Response) => {
  try {
    const { symbol, analysisType } = req.body;

    if (!symbol || !analysisType) {
      return res.status(400).json({ 
        error: 'Missing required fields: symbol and analysisType' 
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: 'Server configuration error: API key not set' 
      });
    }

    const result = await analyzeStock(symbol, analysisType);
    res.json(result);
  } catch (error: any) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to generate analysis' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

