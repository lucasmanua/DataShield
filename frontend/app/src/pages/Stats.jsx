import { useState, useEffect } from 'react';
import { api } from '../services/api';

function Bar({ label, count, max, color }) {
  const pct = max > 0 ? (count / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-32 text-right text-sm text-slate-300 shrink-0">{label}</span>
      <div className="flex-1 h-6 rounded-lg bg-slate-800 overflow-hidden">
        <div className={`h-full rounded-lg ${color} transition-all duration-500`} style={{ width: `${pct}%` }}></div>
      </div>
      <span className="w-10 text-sm text-slate-400 font-medium">{count}</span>
    </div>
  );
}

export default function Stats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await api.reports.stats();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-slate-400">Cargando estadísticas...</p>;
  if (!stats) return <p className="text-slate-400">No se pudieron cargar las estadísticas.</p>;

  const maxByType = Math.max(...(stats.reportsByType?.map(r => r.count) || [1]));
  const maxByRegion = Math.max(...(stats.reportsByRegion?.map(r => r.count) || [1]));

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Estadísticas públicas</h1>
      <p className="text-sm text-slate-400 mb-6">Datos agregados del sistema DataShield en Paraguay.</p>

      <div className="grid gap-4 md:grid-cols-5 mb-6">
        <StatCard label="Total reportes" value={stats.totalReports} color="text-white" />
        <StatCard label="Validados" value={stats.validatedReports} color="text-emerald-400" />
        <StatCard label="Pendientes" value={stats.pendingReports} color="text-amber-400" />
        <StatCard label="En investigación" value={stats.investigationCount} color="text-blue-400" />
        <StatCard label="Rechazados" value={stats.rejectedCount} color="text-red-400" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Por tipo de fraude</h2>
          <div className="space-y-2">
            {stats.reportsByType?.length > 0 ? stats.reportsByType.map(r => (
              <Bar key={r.type} label={FRAUD_LABELS[r.type] || r.type} count={r.count} max={maxByType} color="bg-brand-600" />
            )) : <p className="text-sm text-slate-500">Sin datos</p>}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Por departamento</h2>
          <div className="space-y-2">
            {stats.reportsByRegion?.length > 0 ? stats.reportsByRegion.map(r => (
              <Bar key={r.region} label={r.region} count={r.count} max={maxByRegion} color="bg-emerald-600" />
            )) : <p className="text-sm text-slate-500">Sin datos regionales</p>}
          </div>
        </div>
      </div>

      {stats.activeAlerts?.length > 0 && (
        <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
          <h2 className="text-lg font-semibold text-amber-300 mb-4">🚨 Alertas activas</h2>
          <div className="space-y-2">
            {stats.activeAlerts.map(a => (
              <div key={a.id} className="flex items-center justify-between rounded-lg bg-amber-500/5 px-4 py-2.5 text-sm">
                <span className="text-amber-200">{a.type}: <strong>{a.indicator}</strong></span>
                <span className="text-amber-400 font-semibold">{a.count} reportes</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-center">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-slate-400 mt-1">{label}</p>
    </div>
  );
}

const FRAUD_LABELS = {
  PHISHING: 'Phishing',
  MARKETPLACE: 'Marketplace',
  IDENTITY_THEFT: 'Robo de identidad',
  BANK_SCAM: 'Suplantación bancaria',
  SOCIAL_MEDIA: 'Redes sociales',
  PHONE_SCAM: 'Estafa telefónica',
  FAKE_LOAN: 'Préstamo falso',
  FAKE_INVESTMENT: 'Inversión falsa',
  ROMANCE_SCAM: 'Estafa romántica',
  FAKE_TECH_SUPPORT: 'Soporte técnico falso',
  OTHER: 'Otros'
};