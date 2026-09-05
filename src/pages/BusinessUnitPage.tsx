import { useEffect } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  ExternalLink,
  AlertCircle,
  Building2,
} from 'lucide-react';
import { businessUnits } from '@/data/businessUnits';

interface BusinessUnitPageProps {
  unitId: number;
  onNavigateHome: () => void;
}

export default function BusinessUnitPage({
  unitId,
  onNavigateHome,
}: BusinessUnitPageProps) {
  const unit = businessUnits.find((u) => u.id === unitId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [unitId]);

  if (!unit) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-light">
        <div className="text-center">
          <p className="text-lg text-brand-slate">Unidad no encontrada.</p>
          <button
            onClick={onNavigateHome}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a la Página Principal
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-brand-light pt-20">
      {/* Back button - fixed */}
      <div className="sticky top-20 z-40 border-b border-brand-slate/10 bg-brand-light/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-blue shadow-sm transition-all hover:scale-105 hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a la Página Principal
          </button>
        </div>
      </div>

      {/* Banner */}
      <div className="relative h-72 overflow-hidden sm:h-96">
        {/* INCLUIR IMAGEN PORTADA AQUÍ: /public/images/banner-unidad-{unit.id}.jpg */}
        <img
          src={unit.image}
          alt={unit.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/60 to-brand-blue/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg">
                <unit.icon className="h-7 w-7 text-brand-blue" />
              </div>
              <div>
                <span className="block text-sm font-semibold uppercase tracking-wider text-brand-copper">
                  Unidad de Negocio {unit.id}
                </span>
                <h1 className="font-display text-2xl font-bold text-white sm:text-4xl">
                  {unit.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <h2 className="font-display text-2xl font-bold text-brand-slate">
                {unit.tagline}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brand-slate/70">
                {unit.longDescription}
              </p>
            </div>

            {/* Services list */}
            <h3 className="mt-10 font-display text-xl font-bold text-brand-slate">
              Servicios
            </h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {unit.services.map((service, idx) => (
                <div
                  key={idx}
                  className="group flex items-start gap-3 rounded-2xl border border-brand-slate/10 bg-white p-4 shadow-sm transition-all hover:border-brand-copper/30 hover:shadow-md"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-copper transition-transform group-hover:scale-110" />
                  <span className="text-sm leading-relaxed text-brand-slate/80">
                    {service}
                  </span>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-10">
              <a
                href={unit.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-green-500 px-7 py-4 text-base font-semibold text-white shadow-xl shadow-green-500/30 transition-all hover:scale-105 hover:bg-green-600"
              >
                <MessageCircle className="h-6 w-6" />
                Consultar por WhatsApp
                <ExternalLink className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Sidebar - Partner */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {unit.partner && (
                <div className="rounded-2xl border border-brand-slate/10 bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white shadow-lg">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-brand-slate">
                    Partner Estratégico
                  </h3>
                  <p className="mt-2 text-sm text-brand-slate/60">
                    {unit.partner}
                  </p>
                  {unit.partnerUrl && (
                    <a
                      href={unit.partnerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-copper"
                    >
                      Visitar sitio web
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {unit.partnerNote && (
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {unit.partnerNote}
                    </div>
                  )}
                </div>
              )}

              {/* Quick info card */}
              <div className="rounded-2xl bg-brand-blue p-6 text-white shadow-lg">
                <h3 className="font-display text-lg font-bold">
                  ¿Necesitás asistencia técnica?
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  Respuesta operativa inmediata 24/7 para la industria Oil &amp;
                  Gas, hotelería y seguros.
                </p>
                <a
                  href={unit.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-copper px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105"
                >
                  <MessageCircle className="h-4 w-4" />
                  Contactar ahora
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
