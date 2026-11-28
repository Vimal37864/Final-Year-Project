# AI-Powered Crime Forecasting & Suspect Prediction System

![React](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite%208-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/CSS-TailwindCSS%20v4-38bdf8?logo=tailwindcss)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)
![Machine Learning](https://img.shields.io/badge/ML-RandomForest%20%7C%20XGBoost-orange?logo=scikit-learn)
![Deployment](https://img.shields.io/badge/Deployment-Vercel-black?logo=vercel)

An intelligent enterprise dashboard and analytical system designed for law enforcement and municipal planning to forecast crime hotspots, assess severity risk levels in real time, and generate AI-driven suspect profiles using Random Forest, XGBoost, and temporal predictive modeling.

---

## 🌐 Live Deployment on Vercel

- **Live URL**: [https://final-year-project-lac.vercel.app](https://final-year-project-lac.vercel.app) *(or your deployed Vercel URL)*
- **GitHub Repository**: [https://github.com/Vimal37864/Final-Year-Project](https://github.com/Vimal37864/Final-Year-Project)

---

## 🚀 How to Deploy to Vercel

### Option 1: Import via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New"** > **"Project"**.
2. Select your imported GitHub repository: `Vimal37864/Final-Year-Project`.
3. Configure the Project Settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend` *(Click Edit and select the `frontend` folder)*
   - **Build Command**: `npm run build` *(Auto-detected)*
   - **Output Directory**: `dist` *(Auto-detected)*
   - **Install Command**: `npm install` *(Auto-detected)*
4. (Optional) In **Environment Variables**, add:
   - `VITE_API_BASE_URL`: `https://your-backend-api.onrender.com/api/v1` *(If you have hosted the FastAPI backend; otherwise, the frontend automatically runs in high-fidelity interactive demo mode)*.
5. Click **Deploy**. Vercel will build and deploy the application in under 1 minute!

### Option 2: Deploy from Repository Root
If you prefer deploying without changing the root directory setting:
- Pre-configured `vercel.json` at the root automatically runs `npm run build --prefix frontend` and routes traffic to `frontend/dist`.

---

## 🛠️ Key Features

- **Executive Crime Dashboard**: High-level KPI summary cards for 30-day crime counts, categorized risk distribution, and 7-day predicted volume.
- **Interactive Hotspot Geospatial Map**: Leaflet-powered heatmaps plotting crime clusters, severity levels (Low, Medium, High), and GPS coordinates across metropolitan sectors.
- **AI Crime Risk Predictor**: Multi-variable inputs (crime type, area, time period, suspect traits, weapon) evaluated through trained Random Forest and XGBoost classification models.
- **Suspect Profiling Engine**: Historical statistical correlation matching incident factors to generate suspect age groups, gender probabilities, and recidivism likelihood.
- **Temporal Analytics**: Granular charts analyzing hourly distributions, day-of-week trends, monthly seasonality, and area crime concentration.
- **Real-Time Incident Alerts**: Filterable live feed of active crime reports with severity tags and arrest statuses.

---

## 💻 Local Development Setup

### 1. Frontend (React + Vite + TailwindCSS v4)
```bash
cd frontend
npm install
npm run dev
```
The frontend will start at `http://localhost:5173`.

### 2. Backend (FastAPI + SQLite + Scikit-Learn)
```bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
API Documentation will be available at `http://localhost:8000/docs`.

---

## 📁 Project Structure

```
Final-Year-Project/
├── frontend/                     # React 19 + TypeScript + Vite + Tailwind v4
│   ├── src/
│   │   ├── components/           # Dashboard, CrimeMap, Prediction forms, Analytics
│   │   ├── services/
│   │   │   └── api.ts            # Dynamic Axios client with live fallback support
│   │   ├── App.tsx               # Primary layout and routing
│   │   └── main.tsx              # App bootstrap
│   ├── vite.config.ts            # Vite + React + Tailwind v4 plugin configuration
│   ├── vercel.json               # SPA routing configuration for Vercel
│   └── package.json
├── backend/                      # FastAPI Python Application
│   ├── app/
│   │   ├── api/endpoints.py      # REST API route handlers
│   │   ├── db/database.py        # SQLAlchemy SQLite engine
│   │   ├── models/               # ORM database models
│   │   ├── schemas/              # Pydantic validation schemas
│   │   └── services/ml_service.py# Model inference and scoring
│   ├── requirements.txt
│   └── run.py
├── ml_pipeline/                  # ML training scripts and saved artifacts
│   ├── artifacts/                # Trained .joblib models (RF, XGBoost, Scaler)
│   └── data/                     # Historical crime dataset (crimes.db)
├── vercel.json                   # Root monorepo deployment config for Vercel
├── package.json                  # Root convenience scripts
└── README.md
```

---

## 📄 License
This project is developed for academic and enterprise evaluation purposes.
