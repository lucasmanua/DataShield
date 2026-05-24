import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';

export default function ReportDetail() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadReport();
  }, [id]);

  const loadReport = async () => {
    try {
      const data = await api.reports.getById(id);
      setReport(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-slate-400">Cargando reporte...</p>;
  if (error) return <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>;
  if (!report) return <p className="text-slate-400">Reporte no encontrado</p>;

  return (
    <div className="mx-auto max-w-2xl">
      <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition mb-4">← Volver al panel</Link>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h1 className="text-xl font-bold text-white">#{report.id} - {report.title}</h1>
            <p className="text-xs text-slate-500">Reportado el {new Date(report.createdAt).toLocaleString('es-PY')}</p>
          </div>
          <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            report.status === 'VALIDATED' ? 'bg-emerald-500/15 text-emerald-300' :
            report.status === 'INVESTIGATION' ? 'bg-amber-500/15 text-amber-300' :
            report.status === 'REJECTED' ? 'bg-red-500/15 text-red-300' :
            'bg-slate-500/15 text-slate-300'
          }`}>{report.status}</span>
        </div>

        <div className="mb-4">
          <span className="rounded-md bg-brand-500/10 px-2.5 py-1 text-xs text-brand-300 font-medium">{report.fraudType}</span>
          {report.region && <span className="ml-2 rounded-md bg-slate-500/10 px-2.5 py-1 text-xs text-slate-300">📍 {report.region}</span>}
        </div>

        <p className="text-slate-200 text-sm leading-relaxed mb-6">{report.description}</p>

        <div className="grid gap-3 md:grid-cols-2 mb-6">
          {report.phoneNumber && <InfoBox label="Teléfono" value={report.phoneNumber} />}
          {report.email && <InfoBox label="Email" value={report.email} />}
          {report.bankAccount && <InfoBox label="Cuenta bancaria" value={report.bankAccount} />}
          {report.url && <InfoBox label="URL" value={report.url} />}
          {report.socialMediaProfile && <InfoBox label="Red social" value={report.socialMediaProfile} />}
        </div>

        {report.validator && (
          <div className="border-t border-slate-800 pt-4 text-xs text-slate-500">
            <p>Validado por: {report.validator.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
      <p className="text-xs uppercase tracking-wider text-slate-500 mb-0.5">{label}</p>
      <p className="text-sm text-white break-all">{value}</p>
    </div>
  );
}