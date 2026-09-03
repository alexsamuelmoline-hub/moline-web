'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  ArrowRight,
  MessageCircle,
  Menu,
  X,
  Ruler,
  Building2,
  Factory,
  Home,
  Server,
  Sun,
  Cloud,
  CloudSun,
  Snowflake,
  Thermometer,
  Calculator,
  Phone,
  Mail,
  MapPin,
  Zap,
  Settings2,
  Wind,
  CheckCircle2,
  TrendingUp,
  Handshake,
  HardHat,
  Lightbulb,
  Cpu,
  Leaf,
  Hammer,
  Wrench,
  ShieldCheck,
  ExternalLink,
  Award,
  Target,
  Eye,
  Cog,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const WHATSAPP_NUMBER = '5492995809928';
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;
const WHATSAPP_BUDGET = `${WHATSAPP_BASE}?text=${encodeURIComponent(
  'Hola Moliné Electromecánica, quisiera solicitar un presupuesto.'
)}`;

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Misión y Visión', href: '#mision-vision' },
  { label: 'Unidades de Negocio', href: '#unidades' },
  { label: 'A/A Residencial & Pyme', href: '#climatizacion' },
  { label: 'Calculadora HVAC', href: '#calculadora' },
  { label: 'Partners', href: '#partners' },
  { label: 'Contacto', href: '#contacto' },
];

type UseType = 'residencial' | 'oficina' | 'deposito' | 'servidores';
type Exposure = 'mucha' | 'normal' | 'sombra';

const USE_TYPE_CONFIG: Record<
  UseType,
  { label: string; factor: number; icon: typeof Home }
> = {
  residencial: { label: 'Residencial', factor: 50, icon: Home },
  oficina: { label: 'Oficina', factor: 70, icon: Building2 },
  deposito: { label: 'Depósito / Taller', factor: 60, icon: Factory },
  servidores: { label: 'Servidores / IT', factor: 150, icon: Server },
};

const EXPOSURE_CONFIG: Record<
  Exposure,
  { label: string; multiplier: number; icon: typeof Sun }
> = {
  mucha: { label: 'Mucha', multiplier: 1.25, icon: Sun },
  normal: { label: 'Normal', multiplier: 1.1, icon: CloudSun },
  sombra: { label: 'Sombra', multiplier: 1.0, icon: Cloud },
};

function getEquipmentRecommendation(frigorias: number): string {
  if (frigorias <= 3000) return 'Equipo Split Inverter 3.000 Frig';
  if (frigorias <= 6000) return 'Equipo Split Piso-Cielo 6.000 Frig';
  if (frigorias <= 12000) return 'Sistema Multisplit 12.000 Frig';
  if (frigorias <= 30000) return 'Sistema VRF 30.000 Frig';
  if (frigorias <= 60000) return 'Chiller Enfriado por Aire 60.000 Frig';
  return 'Sistema Centralizado de Refrigeración Industrial';
}

export default function HomePage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [useType, setUseType] = useState<UseType>('residencial');
  const [exposure, setExposure] = useState<Exposure>('normal');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const calculation = useMemo(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);

    if (!l || !w || !h || l <= 0 || w <= 0 || h <= 0) return null;

    const volume = l * w * h;
    const baseFactor = USE_TYPE_CONFIG[useType].factor;
    const exposureMultiplier = EXPOSURE_CONFIG[exposure].multiplier;

    const baseFrigorias = volume * baseFactor * exposureMultiplier;
    const totalFrigorias = Math.round(baseFrigorias + 1000);

    return {
      volume: Math.round(volume * 100) / 100,
      totalFrigorias,
      baseFrigorias: Math.round(baseFrigorias),
      equipment: getEquipmentRecommendation(totalFrigorias),
    };
  }, [length, width, height, useType, exposure]);

  const whatsappConsultLink = useMemo(() => {
    if (!calculation) return WHATSAPP_BASE;
    const msg = `Hola Moliné, necesito consultar disponibilidad de un equipo de ${calculation.totalFrigorias.toLocaleString('es-AR')} frigorías (${calculation.equipment}). ¿Qué opciones tienen?`;
    return `${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`;
  }, [calculation]);

  const metrics = [
    { value: '+15.000', unit: 'm²', label: 'Intervenidos', icon: Ruler },
    { value: '+5.000', unit: 'HP', label: 'Instalados', icon: Zap },
    { value: '', unit: '', label: 'Cobertura en Neuquén y Río Negro', icon: MapPin },
  ];

  const businessUnits = [
    {
      icon: Wrench,
      title: 'Electromecánica',
      description: 'Instalaciones MT/BT, mantenimiento de motores y tableros, insumos industriales.',
      partner: false,
    },
    {
      icon: Wind,
      title: 'Climatización',
      description: 'Bombas de calor, VRF industrial, aire acondicionado comercial.',
      partner: true,
    },
    {
      icon: Leaf,
      title: 'Energía Solar',
      description: 'Proyectos On-Grid/Off-Grid, montaje de parques fotovoltaicos.',
      partner: true,
    },
    {
      icon: Cpu,
      title: 'Automatización y Control Industrial',
      description: 'Ingeniería de control, IIoT, ciberseguridad industrial, robótica.',
      partner: true,
    },
    {
      icon: Lightbulb,
      title: 'Domótica',
      description: 'Automatización inteligente para hogares, comercios y eficiencia energética.',
      partner: false,
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* HEADER & STICKY NAV */}
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-[#0F2C59]/10 bg-white/95 shadow-sm backdrop-blur-md'
            : 'bg-transparent'
        )}
      >
        {/* LOGO DE MOLINÉ ELECTROMECÁNICA */}
		<div className="flex items-center gap-3">
			<img 
				src="/logo.jpg" 
				alt="Moliné Electromecánica S.A.S." 
				className="h-14 sm:h-16 md:h-20 w-auto object-contain rounded-lg shadow-sm"
			/>
		</div>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          {/* Brand */}
          <a href="#inicio" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F2C59]">
              <Cog className="h-5 w-5 text-[#B85042]" />
            </div>
            <span
              className={cn(
                'text-sm font-bold tracking-tight transition-colors',
                scrolled ? 'text-[#0F2C59]' : 'text-white'
              )}
            >
              {/* LOGO OFICIAL MOLINÉ */}
				<div className="flex items-center gap-3">
				  <img 
					src="/logo.jpg" 
					alt="Moliné Electromecánica S.A.S." 
					className="h-12 w-auto object-contain rounded-lg shadow-sm"
				  />
				</div>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-md px-3 py-2 text-xs font-medium transition-colors',
                  scrolled
                    ? 'text-[#0F172A]/70 hover:bg-[#0F2C59]/5 hover:text-[#0F2C59]'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              size="sm"
              className="hidden bg-[#B85042] text-white hover:bg-[#B85042]/90 sm:inline-flex"
            >
              <a href={WHATSAPP_BUDGET} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                Presupuestar por WhatsApp
              </a>
            </Button>
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className={cn(
                'rounded-md p-2 lg:hidden',
                scrolled ? 'text-[#0F2C59]' : 'text-white'
              )}
            >
              {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileNavOpen && (
          <div className="border-t border-[#0F2C59]/10 bg-white px-6 py-4 lg:hidden">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-[#0F172A]/70 hover:bg-[#0F2C59]/5 hover:text-[#0F2C59]"
                >
                  {link.label}
                </a>
              ))}
              <Button
                asChild
                size="sm"
                className="mt-2 bg-[#B85042] text-white hover:bg-[#B85042]/90"
              >
                <a href={WHATSAPP_BUDGET} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                  Presupuestar por WhatsApp
                </a>
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section
        id="inicio"
        className="relative overflow-hidden bg-gradient-to-br from-[#0F2C59] via-[#1a3a6b] to-[#0F2C59] pt-28 pb-20 lg:pt-36 lg:pb-28"
      >
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(#F7F9FB 1px, transparent 1px), linear-gradient(90deg, #F7F9FB 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#B85042]/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              {/* Badges */}
              <div className="animate-fade-in mb-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#B85042]/40 bg-[#B85042]/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                  <Award className="h-3.5 w-3.5 text-[#B85042]" />
                  Distribuidor Oficial BGH
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
                  <ShieldCheck className="h-3.5 w-3.5 text-white/70" />
                  Installer Partner BGH
                </span>
              </div>

              <h1 className="animate-fade-in-up text-4xl font-bold leading-[1.15] text-white sm:text-5xl lg:text-[3.5rem]">
                Ingeniería, Automatización y{' '}
                <span className="text-[#B85042]">Soluciones Electromecánicas</span>{' '}
                Industriales
              </h1>

              <p className="animate-fade-in-up mt-6 max-w-2xl text-lg leading-relaxed text-white/70 [animation-delay:150ms]">
                Líderes en optimización de procesos productivos, climatización de
                precisión y energía renovable en Neuquén y Río Negro.
              </p>

              <div className="animate-fade-in-up mt-8 flex flex-col gap-4 sm:flex-row [animation-delay:300ms]">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#B85042] text-white hover:bg-[#B85042]/90"
                >
                  <a href="#unidades">
                    Ver Unidades de Negocio
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
                >
                  <a
                    href={`${WHATSAPP_BASE}?text=${encodeURIComponent('Hola Moliné')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Hablar con un Asesor (WhatsApp)
                  </a>
                </Button>
              </div>

              {/* Metrics bar */}
              <div className="animate-fade-in-up mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 [animation-delay:450ms]">
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className="group rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-[#B85042]/40 hover:bg-white/10"
                  >
                    <m.icon className="mb-3 h-6 w-6 text-[#B85042]" />
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white">{m.value}</span>
                      <span className="text-sm font-medium text-white/60">{m.unit}</span>
                    </div>
                    <p className="mt-1 text-sm text-white/50">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="animate-slide-in-right lg:col-span-5 [animation-delay:300ms]">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/38217230/pexels-photo-38217230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Sala de control electromecánico industrial"
                  className="h-[420px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2C59]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#B85042]">
                      <Settings2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Control &amp; Automatización
                      </p>
                      <p className="text-xs text-white/60">
                        Salas técnicas y procesos productivos
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[#B85042]/40 to-transparent" />
      </section>

      {/* MISIÓN Y VISIÓN */}
      <section id="mision-vision" className="bg-[#F1F5F9] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-[#B85042]">
              Institucional
            </span>
            <h2 className="mt-2 text-3xl font-bold text-[#0F2C59] sm:text-4xl">
              Misión y Visión
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Misión */}
            <Card className="border-[#0F2C59]/10 bg-white p-8 transition-all hover:shadow-lg">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#0F2C59]">
                <Target className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0F2C59]">Misión</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#0F172A]/70">
                Proveer soluciones integrales de ingeniería electromecánica,
                climatización, automatización y energías renovables, combinando
                idoneidad técnica con respuesta inmediata. Nos enfocamos en
                garantizar la continuidad operativa de industrias y comercios, así
                como el confort y la eficiencia energética en cada hogar,
                construyendo relaciones de confianza a largo plazo.
              </p>
            </Card>

            {/* Visión */}
            <Card className="border-[#0F2C59]/10 bg-white p-8 transition-all hover:shadow-lg">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#B85042]">
                <Eye className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0F2C59]">Visión</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#0F172A]/70">
                Convertirnos en el socio técnico de referencia indiscutido en la
                región; la primera opción en la mente de empresas y familias al
                momento de resolver una necesidad técnica o desarrollar un
                proyecto energético en su propiedad, comercio o industria.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* UNIDADES DE NEGOCIO */}
      <section id="unidades" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-[#B85042]">
              Unidades de Negocio
            </span>
            <h2 className="mt-2 text-3xl font-bold text-[#0F2C59] sm:text-4xl">
              Cinco pilares de especialización
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#0F172A]/60">
              Soluciones técnicas integrales para la industria, el comercio y el
              hogar en Patagonia.
            </p>
          </div>

          <Tabs defaultValue="electromecanica" className="w-full">
            <div className="mb-8 flex justify-center">
              <TabsList className="flex flex-wrap justify-center gap-1 rounded-xl bg-[#F1F5F9] p-1.5">
                {businessUnits.map((unit) => {
                  const slug = unit.title
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
                  return (
                    <TabsTrigger
                      key={slug}
                      value={slug}
                      className="rounded-lg px-3 py-2 text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-[#0F2C59] data-[state=active]:shadow-sm"
                    >
                      {unit.title}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {businessUnits.map((unit) => {
              const slug = unit.title
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
              return (
                <TabsContent key={slug} value={slug}>
                  <Card className="mx-auto max-w-3xl border-[#0F2C59]/10 bg-[#F8FAFC] p-8">
                    <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#0F2C59]">
                        <unit.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-bold text-[#0F2C59]">
                            {unit.title}
                          </h3>
                          {unit.partner && (
                            <Badge className="border-[#B85042]/30 bg-[#B85042]/10 text-[#B85042]">
                              <Award className="mr-1 h-3 w-3" />
                              BGH Partner
                            </Badge>
                          )}
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-[#0F172A]/70">
                          {unit.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* CLIMATIZACIÓN & CATÁLOGO */}
      <section id="climatizacion" className="bg-[#F1F5F9] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#B85042]">
              <Wind className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-semibold uppercase tracking-wider text-[#B85042]">
              Catálogo Destacado
            </span>
            <h2 className="mt-2 text-3xl font-bold text-[#0F2C59] sm:text-4xl">
              Soluciones en Climatización BGH
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Residencial */}
            <Card className="group overflow-hidden border-[#0F2C59]/10 bg-white transition-all hover:shadow-xl">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/38788452/pexels-photo-38788452.jpeg?auto=compress&cs=tinysrgb&w=940&h=400&dpr=2"
                  alt="Aire acondicionado residencial"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2C59]/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <Badge className="border-[#B85042]/40 bg-[#B85042]/90 text-white">
                    BGH Partner
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#0F2C59]">
                  Climatización Residencial
                </h3>
                <ul className="mt-3 space-y-2">
                  {['Equipos Inverter', 'Alta Eficiencia', 'Split / MultiSplit'].map(
                    (item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-[#0F172A]/70"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#B85042]" />
                        {item}
                      </li>
                    )
                  )}
                </ul>
                <Button
                  asChild
                  className="mt-5 w-full bg-[#0F2C59] text-white hover:bg-[#0F2C59]/90"
                >
                  <a
                    href={`${WHATSAPP_BASE}?text=${encodeURIComponent(
                      'Hola Moliné, quisiera consultar stock y precio de Aire Acondicionado Residencial.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Consultar Stock y Precio
                  </a>
                </Button>
              </div>
            </Card>

            {/* Grandes Superficies */}
            <Card className="group overflow-hidden border-[#0F2C59]/10 bg-white transition-all hover:shadow-xl">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/2539462/pexels-photo-2539462.jpeg?auto=compress&cs=tinysrgb&w=940&h=400&dpr=2"
                  alt="Climatización de grandes superficies"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2C59]/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <Badge className="border-[#B85042]/40 bg-[#B85042]/90 text-white">
                    BGH Partner
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#0F2C59]">
                  Climatización de Grandes Superficies
                </h3>
                <ul className="mt-3 space-y-2">
                  {['Sistemas VRF', 'Rooftop', 'Chillers', 'Chiller / Bomba de Calor'].map(
                    (item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-[#0F172A]/70"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#B85042]" />
                        {item}
                      </li>
                    )
                  )}
                </ul>
                <Button
                  asChild
                  className="mt-5 w-full bg-[#0F2C59] text-white hover:bg-[#0F2C59]/90"
                >
                  <a
                    href={`${WHATSAPP_BASE}?text=${encodeURIComponent(
                      'Hola Moliné, quisiera cotizar un equipo de Climatización de Grandes Superficies.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Consultar Stock y Precio
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CALCULADORA HVAC */}
      <section
        id="calculadora"
        className="relative overflow-hidden bg-[#1E293B] py-20"
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#F7F9FB 1px, transparent 1px), linear-gradient(90deg, #F7F9FB 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute -top-32 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-[#B85042]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#B85042]">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-semibold uppercase tracking-wider text-[#B85042]">
              Herramienta de Cálculo
            </span>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              Calculadora de Carga Térmica HVAC
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/50">
              Estime las frigorías necesarias para su espacio y obtenga una
              recomendación de equipo al instante.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* FORM */}
            <Card className="border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">
              <div className="mb-6 flex items-center gap-2">
                <Ruler className="h-5 w-5 text-[#B85042]" />
                <h3 className="text-lg font-semibold text-white">Datos del espacio</h3>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="length"
                      className="text-xs font-medium uppercase tracking-wide text-white/50"
                    >
                      Largo (m)
                    </Label>
                    <Input
                      id="length"
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="10"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-[#B85042] focus:ring-[#B85042]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="width"
                      className="text-xs font-medium uppercase tracking-wide text-white/50"
                    >
                      Ancho (m)
                    </Label>
                    <Input
                      id="width"
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="8"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-[#B85042] focus:ring-[#B85042]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="height"
                      className="text-xs font-medium uppercase tracking-wide text-white/50"
                    >
                      Alto (m)
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="3"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-[#B85042] focus:ring-[#B85042]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wide text-white/50">
                    Tipo de uso
                  </Label>
                  <Select
                    value={useType}
                    onValueChange={(v) => setUseType(v as UseType)}
                  >
                    <SelectTrigger className="border-white/10 bg-white/5 text-white focus:ring-[#B85042]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(USE_TYPE_CONFIG) as UseType[]).map((key) => {
                        const config = USE_TYPE_CONFIG[key];
                        return (
                          <SelectItem key={key} value={key}>
                            <span className="flex items-center gap-2">
                              <config.icon className="h-4 w-4 text-[#B85042]" />
                              {config.label}
                            </span>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wide text-white/50">
                    Exposición solar
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    {(Object.keys(EXPOSURE_CONFIG) as Exposure[]).map((key) => {
                      const config = EXPOSURE_CONFIG[key];
                      const isActive = exposure === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setExposure(key)}
                          className={cn(
                            'flex items-center justify-center gap-1.5 rounded-lg border px-3 py-3 text-sm font-medium transition-all',
                            isActive
                              ? 'border-[#B85042] bg-[#B85042]/15 text-white'
                              : 'border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/70'
                          )}
                        >
                          <config.icon className="h-4 w-4" />
                          {config.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-white/5 bg-white/[0.02] p-4">
                <p className="text-xs text-white/40">
                  <span className="font-semibold text-white/60">Fórmula:</span>{' '}
                  Frigorías = (Volumen × Factor) × Exposición + 1.000
                </p>
              </div>
            </Card>

            {/* RESULT */}
            <div className="flex flex-col">
              {calculation ? (
                <Card className="animate-fade-in flex-1 border-[#B85042]/20 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 backdrop-blur-sm">
                  <div className="mb-6 flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-[#B85042]" />
                    <h3 className="text-lg font-semibold text-white">
                      Resultado del cálculo
                    </h3>
                  </div>

                  <div className="animate-count-up rounded-xl border border-[#B85042]/20 bg-[#B85042]/10 p-6">
                    <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                      Frigorías totales requeridas
                    </p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <Snowflake className="h-8 w-8 text-[#B85042]" />
                      <span className="text-4xl font-bold text-white">
                        {calculation.totalFrigorias.toLocaleString('es-AR')}
                      </span>
                      <span className="text-lg font-medium text-white/60">fg</span>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3">
                      <span className="flex items-center gap-2 text-sm text-white/60">
                        <Ruler className="h-4 w-4 text-white/40" />
                        Volumen del espacio
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {calculation.volume.toLocaleString('es-AR')} m³
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3">
                      <span className="flex items-center gap-2 text-sm text-white/60">
                        <Zap className="h-4 w-4 text-white/40" />
                        Carga base (volumen)
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {calculation.baseFrigorias.toLocaleString('es-AR')} fg
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#B85042]" />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-white/40">
                        Equipo recomendado
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {calculation.equipment}
                      </p>
                    </div>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="mt-6 w-full bg-[#B85042] text-white hover:bg-[#B85042]/90"
                  >
                    <a href={whatsappConsultLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Consultar disponibilidad de este equipo por WhatsApp
                    </a>
                  </Button>
                </Card>
              ) : (
                <Card className="flex flex-1 flex-col items-center justify-center border-white/10 bg-white/[0.02] p-8 text-center backdrop-blur-sm">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                    <Calculator className="h-8 w-8 text-white/30" />
                  </div>
                  <h3 className="text-lg font-semibold text-white/60">
                    Ingrese las dimensiones
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-white/30">
                    Complete largo, ancho y alto del espacio para calcular las
                    frigorías necesarias y recibir una recomendación de equipo.
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F2C59]">
              <Handshake className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-semibold uppercase tracking-wider text-[#B85042]">
              Sello de Confianza
            </span>
            <h2 className="mt-2 text-3xl font-bold text-[#0F2C59] sm:text-4xl">
              Partners Estratégicos
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#0F172A]/60">
              Alianzas que respaldan cada proyecto con calidad y trayectoria.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* BGH */}
            <Card className="group border-[#0F2C59]/10 bg-[#F8FAFC] p-8 transition-all hover:border-[#B85042]/30 hover:shadow-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F2C59] transition-colors group-hover:bg-[#B85042]">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0F2C59]">BGH</h3>
                  <p className="text-xs text-[#0F172A]/50">
                    Official Partner
                  </p>
                </div>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-[#0F172A]/70">
                Partner oficial en Climatización, Energía Solar y Automatización.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: Wind, label: 'Climatización' },
                  { icon: Leaf, label: 'Energía Solar' },
                  { icon: Cpu, label: 'Automatización' },
                ].map((s) => (
                  <span
                    key={s.label}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#0F2C59]/10 bg-white px-3 py-1.5 text-xs font-medium text-[#0F2C59]"
                  >
                    <s.icon className="h-3.5 w-3.5 text-[#B85042]" />
                    {s.label}
                  </span>
                ))}
              </div>
              <Button
                asChild
                variant="outline"
                className="mt-5 border-[#0F2C59]/20 text-[#0F2C59] hover:bg-[#0F2C59]/5"
              >
                <a
                  href="https://www.bgh.com.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visitar bgh.com.ar
                </a>
              </Button>
            </Card>

            {/* Hernán Parada */}
            <Card className="group border-[#0F2C59]/10 bg-[#F8FAFC] p-8 transition-all hover:border-[#B85042]/30 hover:shadow-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F2C59] transition-colors group-hover:bg-[#B85042]">
                  <HardHat className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F2C59]">
                    Hernán Parada Construcciones
                  </h3>
                  <p className="text-xs text-[#0F172A]/50">
                    Sinergia estratégica
                  </p>
                </div>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-[#0F172A]/70">
                Obras desde cero y mejoramiento de envolventes térmicos para
                máxima eficiencia energética.
              </p>
              <div className="mb-4 flex items-center gap-2 rounded-lg bg-[#B85042]/10 px-4 py-2.5">
                <TrendingUp className="h-4 w-4 shrink-0 text-[#B85042]" />
                <span className="text-sm font-semibold text-[#B85042]">
                  Más de 40 años de trayectoria en la región
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: Hammer, label: 'Construcción desde cero' },
                  { icon: ShieldCheck, label: 'Envolventes Térmicos' },
                ].map((s) => (
                  <span
                    key={s.label}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#0F2C59]/10 bg-white px-3 py-1.5 text-xs font-medium text-[#0F2C59]"
                  >
                    <s.icon className="h-3.5 w-3.5 text-[#B85042]" />
                    {s.label}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FOOTER & CONTACTO */}
      <footer id="contacto" className="bg-[#0F2C59] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                  <Cog className="h-5 w-5 text-[#B85042]" />
                </div>
                <p className="text-base font-bold text-white">
                  Moliné Electromecánica S.A.S.
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/40">
                Ingeniería, automatización y energía para la industria y el
                comercio en Patagonia.
              </p>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#B85042]">
                Contacto
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={WHATSAPP_BUDGET}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                  >
                    <Phone className="h-4 w-4 text-[#B85042]" />
                    WhatsApp +54 9 299 580 9928
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contacto@moline.com.ar"
                    className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                  >
                    <Mail className="h-4 w-4 text-[#B85042]" />
                    contacto@moline.com.ar
                  </a>
                </li>
                <li className="flex items-start gap-2 text-sm text-white/60">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#B85042]" />
                  Cobertura: Provincias de Neuquén y Río Negro
                </li>
              </ul>
            </div>

            {/* Map link */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#B85042]">
                Cobertura
              </h4>
              <Button
                asChild
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Neuquen+Rio+Negro+Argentina"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Ver Mapa de Cobertura en Google Maps
                </a>
              </Button>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-center">
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} Moliné Electromecánica S.A.S. - Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

