# Campus Accessibility & Bus Tracker

A Progressive Web App that helps students navigate campus using real-time accessibility information and bus tracking.

## Overview

This application provides an interactive map showing bus routes. Built as a PWA, it works offline and can be installed on any device for quick access.

## Features

- Interactive campus map with accessibility markers
- Installable on mobile devices (iOS and Android)
- Responsive design for all screen sizes

## Technology

**Frontend:** React, Leaflet.js, Service Workers  
**Backend:** FastAPI, PostgreSQL with PostGIS  
**Deployment:** Vercel (frontend), Railway (backend)

## Quick Start

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Installation for Users

**Android:** Visit the app URL in Chrome → Tap "Install App" button  
**iOS:** Visit in Safari → Share → "Add to Home Screen"

## Configuration

Update campus coordinates in `src/components/Map.js`:
```javascript
const campusCenter = [YOUR_LATITUDE, YOUR_LONGITUDE];
```

## Deployment

```bash
# Deploy frontend to Vercel
npm install -g vercel
cd frontend
vercel --prod
```

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   └── App.js         # Main application
│   └── public/
│       ├── manifest.json  # PWA configuration
│       └── service-worker.js
└── backend/
    └── app/
        ├── main.py        # FastAPI application
        └── models.py      # Database models
```

## License

MIT License - See LICENSE file for details

## Contact

For issues or questions, please open an issue on GitHub.
