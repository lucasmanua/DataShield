import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const FRAUD_TYPES = [
  { value: 'PHISHING', label: 'Phishing' },
  { value: 'MARKETPLACE', label: 'Estafa en Marketplace' },
  { value: 'IDENTITY_THEFT', label: 'Robo de identidad' },
  { value: 'BANK_SCAM', label: 'Suplantación bancaria' },
  { value: 'SOCIAL_MEDIA', label: 'Fraude en redes sociales' },
  { value: 'PHONE_SCAM', label: 'Estafa telefónica' },
  { value: 'FAKE_LOAN', label: 'Préstamo falso' },
  { value: 'FAKE_INVESTMENT', label: 'Inversión falsa' },
  { value: 'ROMANCE_SCAM', label: 'Estafa romántica' },
  { value: 'FAKE_TECH_SUPPORT', label: 'Soporte técnico falso' },
  { value: 'OTHER', label: 'Otro' }
];

export default function CreateReport() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    fraudType: 'OTHER',
    phoneNumber: '',
    email: '',
    bankAccount: '',
    url: '',
    socialMediaProfile: '',
    region: '',
    anonymous: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.reports.create({
        ...form,
        evidenceUrls: []
      });
      navigate(`/reports/${data.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const update = (field, value) => setForm({...form, [field]: value});

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-2">Reportar un fraude</h1>
      <p className="text-sm text-slate-400 mb-6">Ayuda a la comunidad reportando incidentes de fraude digital.</p>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-5">
        {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}

        <div>
          <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Título del reporte</label>
          <input type="text" value={form.title} onChange={e => update('title', e.target.value)} placeholder="Ej: Suplantación por WhatsApp" required className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-500" />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Descripción detallada</label>
          <textarea value={form.description} onChange={e => update('description', e.target.value)} placeholder="Describe cómo ocurrió el fraude, incluye todos los detalles relevantes..." required rows={4} className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-500 resize-y" />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Tipo de fraude</label>
          <select value={form.fraudType} onChange={e => update('fraudType', e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-brand-500">
            {FRAUD_TYPES.map(ft => <option key={ft.value} value={ft.value}>{ft.label}</option>)}
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Teléfono del infractor</label>
            <input type="text" value={form.phoneNumber} onChange={e => update('phoneNumber', e.target.value)} placeholder="+595 981 123456" className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Email del infractor</label>
            <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="fraude@email.com" className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Cuenta bancaria</label>
            <input type="text" value={form.bankAccount} onChange={e => update('bankAccount', e.target.value)} placeholder="Número de cuenta" className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">URL sospechosa</label>
            <input type="url" value={form.url} onChange={e => update('url', e.target.value)} placeholder="https://..." className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-500" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Perfil de red social</label>
            <input type="text" value={form.socialMediaProfile} onChange={e => update('socialMediaProfile', e.target.value)} placeholder="Facebook: nombre.perfil" className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Departamento (opcional)</label>
            <input type="text" value={form.region} onChange={e => update('region', e.target.value)} placeholder="Ej: Central, Alto Paraná" className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-500" />
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.anonymous} onChange={e => update('anonymous', e.target.checked)} className="rounded border-slate-600 bg-slate-800 text-brand-600" />
          <span className="text-sm text-slate-300">Reportar de forma anónima (no se mostrará mi nombre)</span>
        </label>

        <button type="submit" disabled={loading} className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-500 transition disabled:opacity-50">
          {loading ? 'Enviando reporte...' : 'Publicar reporte'}
        </button>
      </form>
    </div>
  );
}