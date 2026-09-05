import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { NAV_LINKS, WHATSAPP_GENERAL } from '@/data/businessUnits';

interface HeaderProps {
  onNavigate: (page: 'home', section?: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href === '#inicio') {
      onNavigate('home');
    } else {
      onNavigate('home', href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-blue/95 backdrop-blur-md shadow-lg shadow-black/10'
          : 'bg-brand-blue/80 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo - centered/prominent */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group transition-transform hover:scale-105"
          >
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg ring-2 ring-brand-copper/40 transition-all group-hover:ring-brand-copper">
              <span className="font-display text-xl font-bold text-brand-blue">
                m.
              </span>
            </div>
            <div className="text-left">
              <span className="block font-display text-lg font-bold leading-tight text-white">
                Moliné
              </span>
              <span className="block text-xs font-medium uppercase tracking-wider text-brand-copper">
                Electromecánica
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition-all hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <a
              href={WHATSAPP_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-copper px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-copper/30 transition-all hover:bg-brand-copper/90 hover:shadow-brand-copper/50 hover:scale-105"
            >
              <Phone className="h-4 w-4" />
              Solicitar Asistencia 24/7
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-brand-blue/95 backdrop-blur-md lg:hidden animate-fade-in-down">
          <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="rounded-lg px-4 py-3 text-left text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </button>
              ))}
              <a
                href={WHATSAPP_GENERAL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand-copper px-5 py-3 text-sm font-semibold text-white shadow-lg"
              >
                <Phone className="h-4 w-4" />
                Solicitar Asistencia 24/7
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
