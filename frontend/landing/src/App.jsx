const features = [
  {
    title: 'Deteccion de fraude en tiempo real',
    description:
      'Identifica patrones sospechosos y actividades anomalias antes de que escalen a una perdida operativa.'
  },
  {
    title: 'Analisis de indicadores de compromiso',
    description:
      'Consolida senales criticas en un solo flujo para priorizar riesgos reales y reducir ruido de alertas.'
  },
  {
    title: 'Reportes inteligentes para decision',
    description:
      'Genera reportes claros para operaciones, compliance y direccion sin depender de procesos manuales.'
  },
  {
    title: 'Seguridad avanzada de datos',
    description:
      'Protege evidencia, trazabilidad y contexto sensible con controles robustos de acceso y gobernanza.'
  }
];

const benefits = [
  'Reduce tiempos de investigacion hasta en 60%.',
  'Disminuye falsas alarmas y mejora foco del equipo.',
  'Acelera respuestas ante incidentes con un flujo unico.',
  'Mejora la confianza de clientes con trazabilidad verificable.'
];

const trustStats = [
  { value: '99.95%', label: 'Disponibilidad objetivo' },
  { value: '-47%', label: 'Reduccion promedio de fraude reportado' },
  { value: '< 5 min', label: 'Tiempo de triage inicial' }
];

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <header className="mx-auto mb-12 max-w-3xl text-center fade-up">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-brand-100">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-base text-slate-300 md:text-lg">{subtitle}</p> : null}
    </header>
  );
}

function App() {
  return (
    <div className="grid-bg relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.25),transparent_42%)]" />

      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <a href="#inicio" className="text-lg font-semibold tracking-tight text-white">
          DataShield
        </a>
        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <a href="#solucion" className="transition hover:text-white">Solucion</a>
          <a href="#caracteristicas" className="transition hover:text-white">Caracteristicas</a>
          <a href="#beneficios" className="transition hover:text-white">Beneficios</a>
        </nav>
        <a
          href="#cta-final"
          className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-medium text-white transition hover:border-brand-500 hover:bg-slate-800"
        >
          Solicitar demo
        </a>
      </header>

      <main>
        <section id="inicio" className="relative mx-auto max-w-6xl px-6 pb-16 pt-6 md:px-10 md:pb-24 md:pt-14">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="fade-up">
              <p className="mb-4 inline-flex rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.22em] text-brand-100">
                Ciberseguridad orientada a resultados
              </p>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
                Detecta fraude antes del impacto y protege cada dato critico.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
                DataShield conecta deteccion de fraude, analisis de indicadores de compromiso y reportes accionables
                en una plataforma pensada para equipos que no pueden perder tiempo ni precision.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#cta-final"
                  className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-500"
                >
                  Empezar ahora
                </a>
                <a
                  href="#caracteristicas"
                  className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
                >
                  Ver como funciona
                </a>
              </div>
            </div>

            <div className="fade-up rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-soft">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-200">Vista operativa DataShield</p>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Tiempo real
                </span>
              </div>
              <div className="space-y-3">
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Alertas de fraude</p>
                  <p className="mt-2 text-2xl font-bold text-white">18 eventos criticos</p>
                  <p className="mt-1 text-sm text-slate-400">Priorizados por impacto y probabilidad</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Indicadores de compromiso</p>
                  <p className="mt-2 text-2xl font-bold text-white">124 IoC correlacionados</p>
                  <p className="mt-1 text-sm text-slate-400">Con contexto para investigacion inmediata</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Reportes ejecutivos</p>
                  <p className="mt-2 text-2xl font-bold text-white">Listos en 1 clic</p>
                  <p className="mt-1 text-sm text-slate-400">Operacion, riesgo y compliance alineados</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="solucion" className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
          <SectionHeading
            eyebrow="Problema y solucion"
            title="Cuando el fraude se detecta tarde, el costo se multiplica."
            subtitle="Equipos dispersos, alertas sin contexto y reportes manuales generan retrasos. DataShield unifica el flujo completo para detectar, investigar y responder con velocidad."
          />
          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-6">
              <h3 className="text-xl font-semibold text-white">Sin DataShield</h3>
              <ul className="mt-4 space-y-3 text-slate-300">
                <li>- Alertas aisladas que saturan al equipo.</li>
                <li>- Investigaciones lentas por falta de contexto.</li>
                <li>- Reportes tardios y decisiones reactivas.</li>
              </ul>
            </article>
            <article className="rounded-2xl border border-brand-500/30 bg-brand-500/5 p-6">
              <h3 className="text-xl font-semibold text-white">Con DataShield</h3>
              <ul className="mt-4 space-y-3 text-slate-200">
                <li>- Deteccion temprana basada en senales reales.</li>
                <li>- IoC y evidencia consolidados en un solo panel.</li>
                <li>- Reportes automatizados para actuar con confianza.</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="caracteristicas" className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
          <SectionHeading
            eyebrow="Caracteristicas clave"
            title="Tecnologia de seguridad pensada para equipos de alto rendimiento"
          />
          <div className="grid gap-5 md:grid-cols-2">
            {features.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-slate-300">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="beneficios" className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
          <SectionHeading
            eyebrow="Beneficios"
            title="Resultados medibles para negocio, seguridad y operacion"
          />
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
            <div className="grid gap-4 md:grid-cols-2">
              {benefits.map((benefit) => (
                <p key={benefit} className="rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-200">
                  {benefit}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20" aria-label="Confianza">
          <SectionHeading
            eyebrow="Confianza"
            title="Equipos que priorizan seguridad eligen claridad operativa"
            subtitle="Metrica simulada de referencia para representar impacto potencial en adopcion inicial."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {trustStats.map((stat) => (
              <article key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900/75 p-6 text-center">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="mt-2 text-slate-300">{stat.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="cta-final" className="mx-auto max-w-6xl px-6 pb-20 pt-14 md:px-10">
          <div className="rounded-3xl border border-brand-500/30 bg-gradient-to-r from-brand-700/25 to-slate-900 p-8 md:p-10">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Convierte tu estrategia de fraude en una ventaja competitiva.
            </h2>
            <p className="mt-4 max-w-2xl text-slate-200">
              Activa DataShield y obtén visibilidad total sobre riesgo, indicadores de compromiso y decisiones de respuesta en menos tiempo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#inicio"
                className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-500"
              >
                Solicitar demo personalizada
              </a>
              <a
                href="#caracteristicas"
                className="rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400"
              >
                Explorar funcionalidades
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800/90 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 text-sm text-slate-400 md:flex-row md:items-center md:px-10">
          <p>© {new Date().getFullYear()} DataShield. Ciberseguridad y deteccion de fraude para organizaciones modernas.</p>
          <div className="flex gap-5">
            <a href="#inicio" className="transition hover:text-slate-200">Inicio</a>
            <a href="#beneficios" className="transition hover:text-slate-200">Beneficios</a>
            <a href="#cta-final" className="transition hover:text-slate-200">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
