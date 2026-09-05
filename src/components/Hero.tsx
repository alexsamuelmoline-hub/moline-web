import { ArrowRight, MessageCircle, Award, Building2, Zap, Clock } from 'lucide-react';
import { WHATSAPP_GENERAL } from '@/data/businessUnits';

interface HeroProps {
  onNavigate: (page: 'home', section?: string) => void;
}

const metrics = [
  { icon: Award, value: '+40', label: 'Años de Experiencia' },
  { icon: Building2, value: '+15.000', label: 'm² Intervenidos' },
  { icon: Zap, value: '+5.000', label: 'HP Instalados' },
  { icon: Clock, value: '24/7', label: 'Respuesta Operativa Inmediata' },
];

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden bg-hero-gradient pt-20"
    >
      {/* INCLUIR IMAGEN DE FONDO AQUÍ: /public/images/hero-patagonia.jpg */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-blue/20 to-brand-blue" />

      {/* Floating accent shapes */}
      <div className="absolute -right-20 top-40 h-72 w-72 rounded-full bg-brand-copper/10 blur-3xl animate-pulse-slow" />
      <div className="absolute -left-20 bottom-20 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl animate-pulse-slow" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[calc(100vh-5rem)] flex-col justify-center py-12">
          {/* Badge */}
          <div className="animate-fade-in-down inline-flex w-fit items-center gap-2 rounded-full border border-brand-copper/30 bg-brand-copper/10 px-4 py-2 backdrop-blur-sm">
            <Award className="h-4 w-4 text-brand-copper" />
            <span className="text-sm font-medium text-brand-copper">
              +40 Años de Trayectoria en Ingeniería e Instalaciones Industriales
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-tight text-white text-balance animate-fade-in-up sm:text-5xl lg:text-6xl">
            Ingeniería, Climatización y Soluciones Electromecánicas en la{' '}
            <span className="text-brand-copper">Patagonia</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 animate-fade-in-up">
            Continuidad operativa, automatización IoT, energía solar y obras de
            infraestructura para la industria Oil &amp; Gas, hotelería, seguros
            y sector residencial.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-4 animate-fade-in-up sm:flex-row">
            <button
              onClick={() => onNavigate('home', '#unidades')}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-copper px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-brand-copper/30 transition-all hover:scale-105 hover:shadow-brand-copper/50"
            >
              Ver Unidades de Negocio
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href={WHATSAPP_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
            >
              <MessageCircle className="h-5 w-5 text-green-400" />
              Hablar con un Ingeniero
            </a>
          </div>

          {/* Metrics Grid */}
          <div className="mt-16 grid grid-cols-2 gap-4 animate-fade-in-up lg:grid-cols-4">
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-brand-copper/30 hover:bg-white/10"
              >
                <metric.icon className="h-8 w-8 text-brand-copper transition-transform group-hover:scale-110" />
                <div className="mt-3 font-display text-2xl font-bold text-white">
                  {metric.value}
                </div>
                <div className="mt-1 text-sm text-white/60">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          className="h-12 w-full fill-brand-light sm:h-16"
          preserveAspectRatio="none"
        >
          <path d="M0,32 C320,80 720,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}
