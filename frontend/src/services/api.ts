import axios from 'axios';

// Dynamically pick backend URL from environment or default to local FastAPI dev server
const BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// Demo fallback data when backend is not connected or in live Vercel preview
const DEMO_HEATMAP = [
  { lat: 13.0418, lon: 80.2341, intensity: 0.8, crime_type: "Theft", area: "T. Nagar", severity: "High" },
  { lat: 13.0850, lon: 80.2101, intensity: 0.9, crime_type: "Robbery", area: "Anna Nagar", severity: "High" },
  { lat: 13.0012, lon: 80.2565, intensity: 0.4, crime_type: "Fraud", area: "Adyar", severity: "Low" },
  { lat: 12.9815, lon: 80.2180, intensity: 0.6, crime_type: "Burglary", area: "Velachery", severity: "Medium" },
  { lat: 12.9249, lon: 80.1000, intensity: 0.7, crime_type: "Assault", area: "Tambaram", severity: "High" },
  { lat: 13.0067, lon: 80.2206, intensity: 0.5, crime_type: "Theft", area: "Guindy", severity: "Medium" },
  { lat: 13.0368, lon: 80.2676, intensity: 0.4, crime_type: "Vandalism", area: "Mylapore", severity: "Low" },
  { lat: 13.0732, lon: 80.2609, intensity: 0.7, crime_type: "Drug Offense", area: "Egmore", severity: "Medium" },
  { lat: 12.9516, lon: 80.1462, intensity: 0.6, crime_type: "Theft", area: "Chromepet", severity: "Medium" },
  { lat: 13.0382, lon: 80.1565, intensity: 0.5, crime_type: "Cybercrime", area: "Porur", severity: "Medium" },
  { lat: 12.9010, lon: 80.2279, intensity: 0.8, crime_type: "Robbery", area: "Sholinganallur", severity: "High" },
  { lat: 13.0827, lon: 80.2707, intensity: 0.9, crime_type: "Assault", area: "Central Chennai", severity: "High" },
];

const DEMO_TEMPORAL = {
  hourly: [18, 12, 8, 5, 9, 14, 22, 35, 48, 55, 60, 52, 45, 50, 58, 64, 75, 88, 95, 110, 105, 85, 54, 30],
  daily: [142, 138, 155, 160, 195, 240, 218],
  daily_labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  monthly: [85, 92, 110, 125, 140, 135, 150, 165, 158, 145, 130, 115],
  crime_types: {
    "Theft": 420,
    "Burglary": 210,
    "Assault": 185,
    "Robbery": 130,
    "Fraud": 115,
    "Cybercrime": 95,
    "Drug Offense": 70,
    "Vandalism": 65,
    "Kidnapping": 15,
    "Homicide": 8,
  },
  severity: {
    "Low": 560,
    "Medium": 490,
    "High": 398,
  },
  areas: {
    "T. Nagar": 240,
    "Anna Nagar": 215,
    "Adyar": 180,
    "Tambaram": 165,
    "Velachery": 150,
    "Guindy": 135,
    "Mylapore": 120,
    "Egmore": 110,
    "Chromepet": 95,
    "Porur": 85,
    "Sholinganallur": 78,
  },
};

const DEMO_ALERTS = [
  { crime_id: "CR-9842", time: "24 Nov 2026 09:30 PM", area: "Anna Nagar", crime_type: "Robbery", severity: "High", risk_level: "High Risk", arrest_made: "No", weapon_used: "Knife" },
  { crime_id: "CR-9841", time: "24 Nov 2026 08:15 PM", area: "T. Nagar", crime_type: "Theft", severity: "Medium", risk_level: "Medium Risk", arrest_made: "Yes", weapon_used: "None" },
  { crime_id: "CR-9840", time: "24 Nov 2026 06:45 PM", area: "Velachery", crime_type: "Burglary", severity: "Medium", risk_level: "Medium Risk", arrest_made: "No", weapon_used: "None" },
  { crime_id: "CR-9839", time: "24 Nov 2026 05:20 PM", area: "Tambaram", crime_type: "Assault", severity: "High", risk_level: "High Risk", arrest_made: "Yes", weapon_used: "Blunt Object" },
  { crime_id: "CR-9838", time: "24 Nov 2026 03:00 PM", area: "Adyar", crime_type: "Fraud", severity: "Low", risk_level: "Low Risk", arrest_made: "No", weapon_used: "None" },
  { crime_id: "CR-9837", time: "24 Nov 2026 01:10 PM", area: "Guindy", crime_type: "Theft", severity: "Low", risk_level: "Low Risk", arrest_made: "Yes", weapon_used: "None" },
  { crime_id: "CR-9836", time: "24 Nov 2026 11:30 AM", area: "Egmore", crime_type: "Drug Offense", severity: "Medium", risk_level: "Medium Risk", arrest_made: "No", weapon_used: "None" },
  { crime_id: "CR-9835", time: "24 Nov 2026 09:40 AM", area: "Porur", crime_type: "Cybercrime", severity: "Medium", risk_level: "Medium Risk", arrest_made: "No", weapon_used: "None" },
];

const DEMO_DASHBOARD = {
  recent_alerts: DEMO_ALERTS.slice(0, 5).map(a => ({
    time: a.time,
    area: a.area,
    crime_type: a.crime_type,
    risk_level: a.risk_level,
  })),
  crime_predictions: [
    { area: "Anna Nagar", risk_level: "High Risk", probability: 85, predicted_crimes: 23 },
    { area: "Nungambakkam", risk_level: "Medium Risk", probability: 62, predicted_crimes: 15 },
    { area: "Velachery", risk_level: "Low Risk", probability: 28, predicted_crimes: 5 },
    { area: "Tambaram", risk_level: "Medium Risk", probability: 55, predicted_crimes: 12 },
    { area: "Adyar", risk_level: "High Risk", probability: 78, predicted_crimes: 19 },
  ],
  suspect_predictions: [
    { suspect_id: "SU2101", match_score: 92, risk_level: "High Risk" },
    { suspect_id: "SU3205", match_score: 78, risk_level: "High Risk" },
    { suspect_id: "SU4309", match_score: 65, risk_level: "Medium Risk" },
    { suspect_id: "SU5412", match_score: 58, risk_level: "Medium Risk" },
    { suspect_id: "SU2317", match_score: 42, risk_level: "Low Risk" },
  ],
  stats_override: {
    total_crimes_30d: 1248,
    total_crimes_pct: "+12.5%",
    low_risk_areas: 12,
    medium_risk_areas: 18,
    high_risk_areas: 7,
    predicted_crimes_7d: 342,
  },
};

const DEMO_STATS = {
  total_crimes: 14500,
  crime_types: 10,
  areas_covered: 12,
  arrest_rate: 68.4,
  high_risk_pct: 27.5,
  best_model_accuracy: 91.3,
};

const DEMO_MODEL_PERF = {
  "Random Forest": {
    accuracy: 0.913,
    precision: 0.914,
    recall: 0.913,
    f1_score: 0.913,
  },
  "XGBoost": {
    accuracy: 0.908,
    precision: 0.909,
    recall: 0.908,
    f1_score: 0.908,
  },
  feature_importance: [
    { feature: "severity", importance: 0.2101 },
    { feature: "weapon_used", importance: 0.1778 },
    { feature: "suspect_prior_record", importance: 0.155 },
    { feature: "crime_type", importance: 0.1239 },
    { feature: "is_night", importance: 0.0816 },
    { feature: "hour", importance: 0.0554 },
    { feature: "area", importance: 0.019 },
  ],
};

// Interceptor to gracefully supply fallback responses on Vercel live preview if backend is unreachable
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || '';
    const method = (error.config?.method || 'get').toLowerCase();

    console.warn(`[API Notice] Falling back to offline demo data for ${method.toUpperCase()} ${url}`);

    if (url.includes('/dashboard-data')) {
      return Promise.resolve({ data: DEMO_DASHBOARD, status: 200, statusText: 'OK', headers: {}, config: error.config });
    }
    if (url.includes('/heatmap')) {
      return Promise.resolve({ data: DEMO_HEATMAP, status: 200, statusText: 'OK', headers: {}, config: error.config });
    }
    if (url.includes('/temporal')) {
      return Promise.resolve({ data: DEMO_TEMPORAL, status: 200, statusText: 'OK', headers: {}, config: error.config });
    }
    if (url.includes('/alerts')) {
      return Promise.resolve({ data: DEMO_ALERTS, status: 200, statusText: 'OK', headers: {}, config: error.config });
    }
    if (url.includes('/stats')) {
      return Promise.resolve({ data: DEMO_STATS, status: 200, statusText: 'OK', headers: {}, config: error.config });
    }
    if (url.includes('/model-performance')) {
      return Promise.resolve({ data: DEMO_MODEL_PERF, status: 200, statusText: 'OK', headers: {}, config: error.config });
    }
    if (url.includes('/predict/risk') && method === 'post') {
      let body: any = {};
      try {
        body = typeof error.config?.data === 'string' ? JSON.parse(error.config.data) : error.config?.data || {};
      } catch {
        body = {};
      }
      const isHighCrime = ["Assault", "Robbery", "Kidnapping", "Homicide"].includes(body.crime_type);
      const isNight = body.hour >= 20 || body.hour <= 5;
      const isWeapon = body.weapon_used && body.weapon_used !== "None";

      let risk = "Low Risk";
      let probHigh = 15;
      let probMed = 25;
      let probLow = 60;

      if (isHighCrime || (isNight && isWeapon)) {
        risk = "High Risk";
        probHigh = 86;
        probMed = 11;
        probLow = 3;
      } else if (isNight || isWeapon || ["Burglary", "Drug Offense", "Fraud"].includes(body.crime_type)) {
        risk = "Medium Risk";
        probHigh = 28;
        probMed = 58;
        probLow = 14;
      }

      return Promise.resolve({
        data: {
          success: true,
          predictions: {
            "Random Forest": {
              prediction: risk,
              probabilities: { "High Risk": probHigh, "Medium Risk": probMed, "Low Risk": probLow },
            },
            "XGBoost": {
              prediction: risk,
              probabilities: { "High Risk": Math.min(100, probHigh + 3), "Medium Risk": Math.max(0, probMed - 2), "Low Risk": Math.max(0, probLow - 1) },
            },
          },
          input_summary: body,
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: error.config,
      });
    }

    if (url.includes('/predict/suspect') && method === 'post') {
      let body: any = {};
      try {
        body = typeof error.config?.data === 'string' ? JSON.parse(error.config.data) : error.config?.data || {};
      } catch {
        body = {};
      }

      const isViolent = ["Robbery", "Assault", "Homicide", "Kidnapping"].includes(body.crime_type);
      const isNight = (body.hour >= 20 || body.hour <= 5);
      const score = Math.min(95, (isViolent ? 35 : 15) + (isNight ? 25 : 10) + 25);

      return Promise.resolve({
        data: {
          success: true,
          suspect_profile: {
            most_likely_age_group: body.crime_type === "Cybercrime" ? "18-25" : "26-35",
            most_likely_gender: "Male",
            prior_record_likelihood: 68.5,
            suspect_match_score: score,
            age_distribution: {
              "18-25": body.crime_type === "Cybercrime" ? 55 : 22,
              "26-35": body.crime_type === "Cybercrime" ? 30 : 48,
              "36-45": 20,
              "46+": 10,
            },
            gender_distribution: {
              "Male": 82,
              "Female": 18,
            },
            weapon_distribution: {
              "None": isViolent ? 15 : 75,
              "Knife": isViolent ? 55 : 15,
              "Firearm": isViolent ? 20 : 5,
              "Blunt Object": 10,
            },
            arrest_likelihood: 62.4,
          },
          risk_factors: [
            isNight ? "Nighttime incident - elevated tactical response advised" : "Daytime incident",
            "Identified correlation with previous offenses in " + (body.area || "Area"),
            isViolent ? "Violent crime category - urgent patrol alert" : "Property crime profile",
          ],
          similar_cases_analyzed: 47,
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: error.config,
      });
    }

    return Promise.reject(error);
  }
);

export default api;
