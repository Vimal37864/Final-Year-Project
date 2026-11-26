import { useState, useEffect } from 'react';
import { api } from '../services/api';

export function SettingsPage() {
  const [modelPerf, setModelPerf] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get('/model-performance').then(r => setModelPerf(r.data)).catch(() => {});
    api.get('/stats').then(r => setStats(r.data)).catch(() => {});
  }, []);

  // Filter models that have performance metrics (exclude feature_importance array)
  const models = modelPerf
    ? Object.entries(modelPerf).filter(
        ([key, val]) => key !== 'feature_importance' && typeof val === 'object' && val !== null && !Array.isArray(val)
      )
    : [];

  const featureImportance: Array<{ feature: string; importance: number }> =
    modelPerf?.feature_importance && Array.isArray(modelPerf.feature_importance)
      ? modelPerf.feature_importance
      : [];

  const backendUrl = api.defaults.baseURL || 'http://localhost:8000/api/v1';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings & System Info</h1>
        <p className="text-sm text-slate-500 mt-1">Model performance, database statistics, and system configuration</p>
      </div>

      {/* System Stats */}
      {stats && (
        <div className="dashboard-card p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Database Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatItem label="Total Records" value={stats.total_crimes?.toLocaleString() || '0'} />
            <StatItem label="Crime Types" value={stats.crime_types || 0} />
            <StatItem label="Areas Covered" value={stats.areas_covered || 0} />
            <StatItem label="Arrest Rate" value={`${stats.arrest_rate || 0}%`} />
            <StatItem label="High Risk %" value={`${stats.high_risk_pct || 0}%`} />
          </div>
        </div>
      )}

      {/* Model Performance */}
      {models.length > 0 && (
        <div className="dashboard-card p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Model Evaluation Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {models.map(([modelName, metrics]: [string, any]) => (
              <div key={modelName} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <h3 className="font-semibold text-slate-800 mb-4">{modelName}</h3>
                <div className="space-y-3">
                  {Object.entries(metrics)
                    .filter(([metric, val]) => metric !== 'confusion_matrix' && typeof val === 'number')
                    .map(([metric, value]: [string, any]) => (
                      <div key={metric}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-600 capitalize">{metric.replace(/_/g, ' ')}</span>
                          <span className="font-semibold text-slate-800">{(value * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${Math.min(100, Math.max(0, value * 100))}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feature Importance (if available) */}
      {featureImportance.length > 0 && (
        <div className="dashboard-card p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Feature Importance Factors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featureImportance.slice(0, 10).map((item, idx) => (
              <div key={idx} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700 font-medium capitalize">{item.feature.replace(/_/g, ' ')}</span>
                  <span className="font-semibold text-slate-800">{(item.importance * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-indigo-500"
                    style={{ width: `${Math.min(100, item.importance * 100 * 3.5)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* API Config */}
      <div className="dashboard-card p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">API Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ConfigRow label="Backend API Endpoint" value={backendUrl} />
          <ConfigRow label="API Version" value="v1" />
          <ConfigRow label="Backend Architecture" value="FastAPI + SQLAlchemy" />
          <ConfigRow label="Classification Models" value="Random Forest, XGBoost" />
          <ConfigRow label="Database Engine" value="SQLite (crimes.db)" />
          <ConfigRow label="Frontend Engine" value="React 19 + Vite + TailwindCSS v4" />
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-slate-50 rounded-lg p-3 text-center border border-slate-100">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className="text-xl font-bold text-slate-800">{value}</p>
    </div>
  );
}

function ConfigRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3 border border-slate-100">
      <span className="text-sm text-slate-600">{label}</span>
      <span className="text-sm font-semibold text-slate-800 font-mono truncate max-w-[200px]" title={value}>{value}</span>
    </div>
  );
}
