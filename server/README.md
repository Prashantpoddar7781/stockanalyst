# MarketInsight India - Backend API

Express.js backend server for MarketInsight India mobile app.

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY

# Run in development mode
npm run dev

# Or build and run
npm run build
npm start
```

### Environment Variables

Create a `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,capacitor://localhost
```

## API Endpoints

### Health Check
```
GET /health
```

### Stock Analysis
```
POST /api/analyze
Body: {
  "symbol": "RELIANCE",
  "analysisType": "FUNDAMENTAL" | "TECHNICAL"
}
```

## Deployment

See `RAILWAY_DEPLOYMENT.md` for Railway deployment instructions.

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run type-check` - Type check without building

