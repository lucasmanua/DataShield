import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api, getUser } from '../services/api';

export default function Dashboard() {
  const user = getUser();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await api.reports.search({ limit: 20 });
      setReports(data.reports || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const pending = reports.filter(r => r.status === 'PENDING').length;
  const validated = reports.filter(r => r.status === 'VALIDATED').length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Bienvenido, {user?.name}</h1>
          <p className="text-sm text-slate-400">Panel de control ciudadano</p>
        </div>
        <Link to="/reports/new" className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-500 transition">
          + Nuevo reporte
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-xs uppercase tracking-wider text-slate-400">Mis reportes</p>
          <p className="text-2xl font-bold text-white mt-1">{reports.length}</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-xs uppercase tracking-wider text-slate-400">Validados</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{validated}</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-xs uppercase tracking-wider text-slate-400">Pendientes</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">{pending}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Mis reportes recientes</h2>
        {loading ? (
          <p className="text-slate-400">Cargando...</p>
        ) : reports.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-3xl mb-2">📝</p>
            <p className="text-slate-400">Aún no has creado ningún reporte.</p>
            <Link to="/reports/new" className="mt-3 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm text-white hover:bg-brand-500 transition">Crear primer reporte</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.map(r => (
              <Link key={r.id} to={`/reports/${r.id}`} className="block rounded-xl border border-slate-800 bg-slate-950/50 p-4 hover:border-slate-700 transition">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{r.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{r.description?.slice(0, 100)}{r.description?.length > 100 ? '...' : ''}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    r.status === 'VALIDATED' ? 'bg-emerald-500/15 text-emerald-300' :
                    r.status === 'INVESTIGATION' ? 'bg-amber-500/15 text-amber-300' :
                    r.status === 'REJECTED' ? 'bg-red-500/15 text-red-300' :
                    'bg-slate-500/15 text-slate-300'
                  }`}>{r.status}</span>
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  {r.fraudType && <span className="mr-3">{r.fraudType}</span>}
                  <span>{new Date(r.createdAt).toLocaleDateString('es-PY')}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}