import { useState, useEffect } from 'react';
import { api } from '../services/api';

function AdminReportCard({ report, onUpdate }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium text-white">#{report.id} - {report.title}</p>
          <p className="text-xs text-slate-500">por {report.anonymous ? 'Anónimo' : report.user?.name || 'Desconocido'} | {report.fraudType} | {new Date(report.createdAt).toLocaleDateString('es-PY')}</p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
          report.status === 'VALIDATED' ? 'bg-emerald-500/15 text-emerald-300' :
          report.status === 'INVESTIGATION' ? 'bg-amber-500/15 text-amber-300' :
          report.status === 'REJECTED' ? 'bg-red-500/15 text-red-300' :
          'bg-slate-500/15 text-slate-300'
        }`}>{report.status}</span>
      </div>
      <p className="mt-1 text-sm text-slate-400 line-clamp-2">{report.description}</p>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
        {report.phoneNumber && <span>📞 {report.phoneNumber}</span>}
        {report.email && <span>✉️ {report.email}</span>}
        {report.bankAccount && <span>🏦 {report.bankAccount}</span>}
        {report.url && <span>🔗 {report.url}</span>}
        {report.region && <span>📍 {report.region}</span>}
      </div>
      {report.status === 'PENDING' && (
        <div className="mt-3 flex gap-2">
          <button onClick={() => onUpdate(report.id, 'VALIDATED')} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 transition">✅ Validar</button>
          <button onClick={() => onUpdate(report.id, 'INVESTIGATION')} className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-500 transition">🔍 Investigar</button>
          <button onClick={() => onUpdate(report.id, 'REJECTED')} className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-500 transition">❌ Rechazar</button>
        </div>
      )}
      {report.validator && <p className="mt-2 text-xs text-slate-500">Validado por: {report.validator.name}</p>}
    </div>
  );
}

export default function Admin() {
  const [reports, setReports] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState({ status: 'PENDING' });
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadAll(); }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [reportsData, alertsData] = await Promise.all([
        api.admin.list(filter),
        api.admin.alerts()
      ]);
      setReports(reportsData.reports || []);
      setAlerts(alertsData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async (id, status) => {
    try {
      await api.admin.validate(id, status);
      loadAll();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleExport = async () => {
    try {
      await api.admin.export(filter);
    } catch (err) {
      alert(err.message);
    }
  };

  const tabs = [
    { value: 'PENDING', label: 'Pendientes' },
    { value: 'INVESTIGATION', label: 'En investigación' },
    { value: 'VALIDATED', label: 'Validados' },
    { value: 'REJECTED', label: 'Rechazados' },
    { value: '', label: 'Todos' }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Panel de administración</h1>
          <p className="text-sm text-slate-400">Gestión de reportes y moderación</p>
        </div>
        <button onClick={handleExport} className="rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-700 transition">
          Exportar CSV
        </button>
      </div>

      {/* Alertas */}
      {alerts.length > 0 && (
        <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
          <h2 className="text-sm font-semibold text-amber-300 mb-3">🚨 Alertas activas ({alerts.length})</h2>
          <div className="space-y-2">
            {alerts.map(a => (
              <div key={a.id} className="flex items-center justify-between rounded-lg bg-amber-500/5 px-3 py-2 text-sm">
                <span className="text-amber-200">{a.type}: <strong>{a.indicator}</strong></span>
                <span className="text-amber-400 font-semibold">{a.count} reportes</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map(t => (
          <button key={t.value} onClick={() => { setFilter({...filter, status: t.value}); }} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${filter.status === t.value ? 'bg-brand-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Reportes */}
      {loading ? (
        <p className="text-slate-400">Cargando...</p>
      ) : reports.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-8 text-center">
          <p className="text-slate-400">No hay reportes con este filtro.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reports.map(r => <AdminReportCard key={r.id} report={r} onUpdate={handleValidate} />)}
        </div>
      )}
    </div>
  );
}