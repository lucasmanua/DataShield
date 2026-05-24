import { useState } from 'react';
import { api } from '../services/api';

function ReportCard({ report }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-white">{report.title}</h3>
          <p className="mt-1 text-sm text-slate-400">{report.description}</p>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
          report.status === 'VALIDATED' ? 'bg-emerald-500/15 text-emerald-300' :
          report.status === 'INVESTIGATION' ? 'bg-amber-500/15 text-amber-300' :
          'bg-slate-500/15 text-slate-300'
        }`}>{report.status}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
        {report.fraudType && <span>Tipo: {report.fraudType}</span>}
        {report.phoneNumber && <span>📞 {report.phoneNumber}</span>}
        {report.email && <span>✉️ {report.email}</span>}
        {report.bankAccount && <span>🏦 {report.bankAccount}</span>}
        {report.url && <span>🔗 {report.url}</span>}
        {report.region && <span>📍 {report.region}</span>}
        <span>📅 {new Date(report.createdAt).toLocaleDateString('es-PY')}</span>
      </div>
      {report.compromiseIndicators?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {report.compromiseIndicators.map(ci => (
            <span key={ci.id} className="rounded-md bg-red-500/10 px-2 py-0.5 text-xs text-red-300">{ci.type}: {ci.value}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Search() {
  const [filters, setFilters] = useState({ phoneNumber: '', email: '', bankAccount: '', url: '' });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await api.reports.publicSearch(filters);
      setResults(data);
    } catch (err) {
      setError(err.message);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Búsqueda pública de indicadores</h1>
      <p className="text-sm text-slate-400 mb-6">Consulta si un número, correo, cuenta bancaria o URL ha sido reportado como fraudulento.</p>

      <form onSubmit={handleSearch} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 mb-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Teléfono</label>
            <input type="text" value={filters.phoneNumber} onChange={e => setFilters({...filters, phoneNumber: e.target.value})} placeholder="+595 981 123456" className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Email</label>
            <input type="text" value={filters.email} onChange={e => setFilters({...filters, email: e.target.value})} placeholder="correo@sospechoso.com" className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Cuenta bancaria</label>
            <input type="text" value={filters.bankAccount} onChange={e => setFilters({...filters, bankAccount: e.target.value})} placeholder="Número de cuenta" className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">URL</label>
            <input type="text" value={filters.url} onChange={e => setFilters({...filters, url: e.target.value})} placeholder="https://..." className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-500" />
          </div>
        </div>
        <button type="submit" disabled={loading} className="mt-4 w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-500 transition disabled:opacity-50">
          {loading ? 'Buscando...' : 'Buscar coincidencias'}
        </button>
      </form>

      {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 mb-4">{error}</div>}

      {results && (
        <div>
          <p className="text-sm text-slate-400 mb-4">{results.total} reporte(s) encontrado(s)</p>
          <div className="space-y-4">
            {results.reports.length === 0 ? (
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-8 text-center">
                <p className="text-slate-400">No se encontraron reportes. Este indicador parece seguro.</p>
              </div>
            ) : (
              results.reports.map(r => <ReportCard key={r.id} report={r} />)
            )}
          </div>
        </div>
      )}

      {!results && !loading && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-8 text-center">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-slate-400">Ingresa un indicador y presiona "Buscar" para verificar si ha sido reportado como fraudulento.</p>
        </div>
      )}
    </div>
  );
}