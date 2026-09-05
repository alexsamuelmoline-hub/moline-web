import { MapPin, Phone, Mail, ExternalLink, Clock } from 'lucide-react';
import { WHATSAPP_GENERAL } from '@/data/businessUnits';

interface FooterProps {
  onNavigate: (page: 'home', section?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-brand-blue text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg ring-2 ring-brand-copper/40">
                <span className="font-display text-xl font-bold text-brand-blue">
                  m.
                </span>
              </div>
              <div>
                <span className="block font-display text-lg font-bold">
                  Moliné Electromecánica
                </span>
                <span className="text-xs text-white/60">CUIT: 20-30626573-4</span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              +40 años de trayectoria en ingeniería e instalaciones industriales
              en Neuquén y Vaca Muerta.
            </p>
          </div>

          {/* Location & Contact */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-brand-copper">
              Ubicación
            </h3>
            <div className="mt-4 flex items-start gap-3 text-sm text-white/70">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-copper" />
              <span>
                Gobernador Franklin Rawson 872,
                <br />
                Neuquén Capital, Argentina
              </span>
            </div>
            <div className="mt-4 flex items-start gap-3 text-sm text-white/70">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-copper" />
              <span>Asistencia Técnica 24/7</span>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-brand-copper">
              Contactos
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-brand-copper" />
                <a
                  href="tel:+5492995809928"
                  className="transition-colors hover:text-white"
                >
                  +54 9 299 580 99 28
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-brand-copper" />
                <a
                  href="tel:+5492994636455"
                  className="transition-colors hover:text-white"
                >
                  +54 9 299 4 63 64 55
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-brand-copper" />
                <a
                  href="mailto:alexsamuelmoline@gmail.com"
                  className="transition-colors hover:text-white"
                >
                  alexsamuelmoline@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-brand-copper">
              Links Directos
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="https://bghcloudtech.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
                >
                  BGH Cloud Tech
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.pintegralco.com.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
                >
                  Pintegralco S.R.L.
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-white/50">
                Hernán Parada
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/40">
                  Próximamente
                </span>
              </li>
            </ul>
            <button
              onClick={() => onNavigate('home', '#contacto')}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-copper px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105"
            >
              <Mail className="h-4 w-4" />
              Enviar Consulta
            </button>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Moliné Electromecánica. Todos los
              derechos reservados.
            </p>
            <a
              href={WHATSAPP_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/40 transition-colors hover:text-white"
            >
              Asistencia Técnica 24/7
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
