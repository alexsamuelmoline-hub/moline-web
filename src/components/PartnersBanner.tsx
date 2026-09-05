import { ExternalLink, Building2, AlertCircle } from 'lucide-react';

const partners = [
  {
    name: 'BGH Tech Solutions',
    url: 'https://bghcloudtech.com',
    description: 'Partner estratégico en climatización, energía solar e IoT',
    status: 'available' as const,
  },
  {
    name: 'Pintegralco S.R.L.',
    url: 'https://www.pintegralco.com.ar',
    description: 'Alianza en construcción civil e infraestructura',
    status: 'available' as const,
  },
  {
    name: 'Hernán Parada',
    url: '',
    description: 'Mantenimiento civil, envolventes e aislación térmica',
    status: 'soon' as const,
  },
];

export default function PartnersBanner() {
  return (
    <section id="partners" className="bg-brand-light py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-brand-blue/10 px-4 py-1.5 text-sm font-semibold text-brand-blue">
            Alianzas Estratégicas
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-brand-slate sm:text-4xl">
            Partners Corporativos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-brand-slate/60">
            Conectamos +40 años de trayectoria regional con el liderazgo de
            mercado de nuestros partners corporativos.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-brand-slate/10 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-blue/5 transition-transform group-hover:scale-150" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-blue text-white shadow-lg">
                  <Building2 className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-brand-slate">
                  {partner.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-slate/60">
                  {partner.description}
                </p>

                {partner.status === 'available' ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-copper"
                  >
                    Visitar sitio web
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700">
                    <AlertCircle className="h-4 w-4" />
                    Web en desarrollo / Próximamente
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
