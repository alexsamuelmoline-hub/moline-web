import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { businessUnits, type BusinessUnit } from '@/data/businessUnits';

interface BusinessUnitsGridProps {
  onNavigateUnit: (unitId: number) => void;
  onNavigate: (page: 'home', section?: string) => void;
}

export default function BusinessUnitsGrid({
  onNavigateUnit,
  onNavigate,
}: BusinessUnitsGridProps) {
  return (
    <section id="unidades" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-brand-copper/10 px-4 py-1.5 text-sm font-semibold text-brand-copper">
            Nuestras Divisiones
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-brand-slate sm:text-4xl">
            6 Unidades de Negocio
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-brand-slate/60">
            Cobertura integral electromecánica para la industria Oil &amp; Gas,
            hotelería, seguros y sector residencial en Neuquén y Vaca Muerta.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {businessUnits.map((unit: BusinessUnit) => (
            <div
              key={unit.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-brand-slate/10 bg-white shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                {/* INCLUIR IMAGEN AQUÍ: /public/images/unidad-{unit.slug}.jpg */}
                <img
                  src={unit.image}
                  alt={unit.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 via-brand-blue/20 to-transparent" />
                <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm shadow-lg">
                  <unit.icon className="h-6 w-6 text-brand-blue" />
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                    Unidad {unit.id}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-bold text-brand-slate">
                  {unit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-slate/60">
                  {unit.description}
                </p>

                {/* Service highlights */}
                <ul className="mt-4 space-y-1.5">
                  {unit.services.slice(0, 3).map((service, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs text-brand-slate/70"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-copper" />
                      {service}
                    </li>
                  ))}
                </ul>

                {unit.partner && (
                  <div className="mt-4">
                    <span className="inline-block rounded-full bg-brand-blue/5 px-3 py-1 text-xs font-medium text-brand-blue">
                      Partner: {unit.partner}
                    </span>
                  </div>
                )}

                {/* CTA */}
                <button
                  onClick={() => onNavigateUnit(unit.id)}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-copper group-hover:gap-3"
                >
                  Ver más detalles
                  <ArrowRight className="h-4 w-4 transition-all" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Services section link */}
        <div id="servicios" className="mt-16 text-center">
          <button
            onClick={() => onNavigate('home', '#contacto')}
            className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-brand-blue/90"
          >
            Solicitar un Servicio
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
