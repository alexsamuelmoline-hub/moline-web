'use client';

// ============================================================================
// [IMPORTS]
// - React hooks para estado local y efectos de ciclo de vida.
// - Iconos de lucide-react usados en toda la página (hero, unidades, footer, etc).
// - Componentes de UI (shadcn/ui): Button, Card, Input, Label, Badge, Select, Tabs.
// - `cn` es un helper para combinar clases de Tailwind condicionalmente.
// ============================================================================
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

// ============================================================================
// [CONFIGURACIÓN DE BOTÓN WHATSAPP]
// Centraliza el número de contacto y arma los links de WhatsApp con mensajes
// pre-cargados (encodeURIComponent evita romper la URL con espacios/acentos).
// Si el número de la empresa cambia, solo hay que tocar WHATSAPP_NUMBER acá.
// ============================================================================
const WHATSAPP_NUMBER = '5492995809928';
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;
const WHATSAPP_BUDGET = `${WHATSAPP_BASE}?text=${encodeURIComponent(
  'Hola Moliné Electromecánica, quisiera solicitar un presupuesto.'
)}`;

// ============================================================================
// [NAVEGACIÓN PRINCIPAL]
// Array de links del header, tanto para el nav desktop como el mobile.
// Un solo array evita tener que mantener dos listas sincronizadas.
// ============================================================================
const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Misión y Visión', href: '#mision-vision' },
  { label: 'Unidades de Negocio', href: '#unidades' },
  { label: 'A/A Residencial & Pyme', href: '#climatizacion' },
  { label: 'Calculadora HVAC', href: '#calculadora' },
  { label: 'Partners', href: '#partners' },
  { label: 'Contacto', href: '#contacto' },
];

// ============================================================================
// [CALCULADORA HVAC - TIPOS Y CONFIGURACIÓN]
// UseType/Exposure son los dos selectores que alimentan la fórmula de
// frigorías. Cada opción tiene un factor/multiplicador numérico y un ícono
// asociado para la UI. Mantener esto tipado evita valores inválidos.
// ============================================================================
type UseType = 'residencial' | 'oficina' | 'deposito' | 'servidores';
type Exposure = 'mucha' | 'normal' | 'sombra';

// Factor de frigorías por m³ según el uso del espacio (a mayor carga térmica
// esperada -ej. servidores-, mayor factor).
const USE_TYPE_CONFIG: Record<
  UseType,
  { label: string; factor: number; icon: typeof Home }
> = {
  residencial: { label: 'Residencial', factor: 50, icon: Home },
  oficina: { label: 'Oficina', factor: 70, icon: Building2 },
  deposito: { label: 'Depósito / Taller', factor: 60, icon: Factory },
  servidores: { label: 'Servidores / IT', factor: 150, icon: Server },
};

// Multiplicador de corrección según la exposición solar del ambiente.
const EXPOSURE_CONFIG: Record<
  Exposure,
  { label: string; multiplier: number; icon: typeof Sun }
> = {
  mucha: { label: 'Mucha', multiplier: 1.25, icon: Sun },
  normal: { label: 'Normal', multiplier: 1.1, icon: CloudSun },
  sombra: { label: 'Sombra', multiplier: 1.0, icon: Cloud },
};

// [CALCULADORA HVAC - RECOMENDADOR DE EQUIPO]
// Dado un total de frigorías, devuelve el nombre del equipo sugerido.
// Es una función pura (sin estado), fácil de testear y de ajustar si cambian
// los cortes de frigorías o el catálogo de equipos.
function getEquipmentRecommendation(frigorias: number): string {
  if (frigorias <= 3000) return 'Equipo Split Inverter 3.000 Frig';
  if (frigorias <= 6000) return 'Equipo Split Piso-Cielo 6.000 Frig';
  if (frigorias <= 12000) return 'Sistema Multisplit 12.000 Frig';
  if (frigorias <= 30000) return 'Sistema VRF 30.000 Frig';
  if (frigorias <= 60000) return 'Chiller Enfriado por Aire 60.000 Frig';
  return 'Sistema Centralizado de Refrigeración Industrial';
}

export default function HomePage() {
  // ==========================================================================
  // [ESTADO - NAVEGACIÓN]
  // mobileNavOpen: controla si el menú hamburguesa mobile está desplegado.
  // scrolled: true cuando el usuario bajó más de 20px; se usa para cambiar
  //           el header de "transparente sobre el hero" a "sólido con blur".
  // ==========================================================================
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ==========================================================================
  // [ESTADO - CALCULADORA HVAC]
  // length/width/height: dimensiones del espacio en metros (como string
  //   porque vienen de un <Input type="number"> controlado).
  // useType: tipo de uso del espacio (residencial, oficina, depósito, IT).
  // exposure: nivel de exposición solar del ambiente.
  // ==========================================================================
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [useType, setUseType] = useState<UseType>('residencial');
  const [exposure, setExposure] = useState<Exposure>('normal');

  // [HANDLER - DETECCIÓN DE SCROLL]
  // Suscribe un listener de scroll al montar el componente para togglear
  // `scrolled`. Se limpia el listener al desmontar para evitar memory leaks.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ==========================================================================
  // [LÓGICA - CÁLCULO DE FRIGORÍAS]
  // useMemo recalcula el resultado solo cuando cambian length/width/height/
  // useType/exposure (evita recalcular en cada render por otros estados,
  // como mobileNavOpen).
  // Fórmula: Frigorías = (Volumen × Factor de uso × Multiplicador de
  // exposición) + 1000 (carga base fija).
  // Devuelve null si falta algún dato o si algún valor es inválido (<= 0),
  // lo que dispara el estado "vacío" de la tarjeta de resultado.
  // ==========================================================================
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

  // [LÓGICA - LINK DE WHATSAPP CON RESULTADO DEL CÁLCULO]
  // Arma dinámicamente el mensaje de WhatsApp incluyendo el resultado de la
  // calculadora, para que el asesor comercial reciba el contexto completo
  // (frigorías + equipo sugerido) sin que el usuario tenga que escribirlo.
  const whatsappConsultLink = useMemo(() => {
    if (!calculation) return WHATSAPP_BASE;
    const msg = `Hola Moliné, necesito consultar disponibilidad de un equipo de ${calculation.totalFrigorias.toLocaleString('es-AR')} frigorías (${calculation.equipment}). ¿Qué opciones tienen?`;
    return `${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`;
  }, [calculation]);

  // [DATOS ESTÁTICOS - MÉTRICAS DEL HERO]
  // Números destacados que se muestran como tarjetas debajo del CTA del hero.
  const metrics = [
    { value: '+15.000', unit: 'm²', label: 'Intervenidos', icon: Ruler },
    { value: '+5.000', unit: 'HP', label: 'Instalados', icon: Zap },
    { value: '', unit: '', label: 'Cobertura en Neuquén y Río Negro', icon: MapPin },
  ];

  // [DATOS ESTÁTICOS - UNIDADES DE NEGOCIO]
  // Alimenta tanto los tabs (triggers) como el contenido de cada tab en la
  // sección "Unidades de Negocio". `partner: true` muestra el badge BGH.
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
      {/* ====================================================================
          [HEADER / NAV STICKY]
          Header fijo (fixed) que cambia de transparente a sólido con blur
          cuando `scrolled` es true. Contiene: logo/marca, nav desktop, CTA de
          WhatsApp y el toggle del menú mobile.
          NOTA DE CORRECCIÓN: en el archivo original había un <img> del logo
          duplicado y renderizado FUERA del contenedor `max-w-7xl` (rompía el
          alineado), más un ícono "Cog" redundante dentro de un <span> anidado
          incorrectamente con un <div>. Se unificó todo en un solo bloque de
          marca dentro del contenedor centrado.
      ==================================================================== */}
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-[#0F2C59]/10 bg-white/95 shadow-sm backdrop-blur-md'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          {/* [MARCA / LOGO] Único render del logo, dentro del link a #inicio */}
          <a href="#inicio" className="flex items-center gap-2.5">
            <img
              src="/logo.jpg"
              alt="Moliné Electromecánica S.A.S."
              className="h-10 w-auto rounded-lg object-contain shadow-sm sm:h-12"
            />
          </a>

          {/* [NAV DESKTOP] Oculto en mobile (hidden lg:flex) */}
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

          {/* [CTA WHATSAPP + TOGGLE MOBILE] */}
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
            {/* Botón hamburguesa: alterna mobileNavOpen (Menu <-> X) */}
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

        {/* [NAV MOBILE] Render condicional: solo si mobileNavOpen es true */}
        {mobileNavOpen && (
          <div className="border-t border-[#0F2C59]/10 bg-white px-6 py-4 lg:hidden">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileNavOpen(false)} // cierra el menú al navegar
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

      {/* ====================================================================
          [SECCIÓN HERO]
          Bloque principal de bienvenida: fondo degradado + grilla decorativa,
          título, copy, botones de acción, métricas destacadas e imagen lateral.
      ==================================================================== */}
      <section
        id="inicio"
        className="relative overflow-hidden bg-gradient-to-br from-[#0F2C59] via-[#1a3a6b] to-[#0F2C59] pt-28 pb-20 lg:pt-36 lg:pb-28"
      >
        {/* Grilla de fondo decorativa (muy baja opacidad) */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(#F7F9FB 1px, transparent 1px), linear-gradient(90deg, #F7F9FB 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Manchas de color decorativas (blur) */}
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#B85042]/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* [HERO - COLUMNA DE TEXTO] */}
            <div className="lg:col-span-7">
              {/* Badges de certificación/partner */}
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

              {/* [HERO - CTAs PRINCIPALES] */}
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

              {/* [HERO - MÉTRICAS] Recorre `metrics` para pintar cada tarjeta */}
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

            {/* [HERO - COLUMNA DE IMAGEN] */}
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

      {/* ====================================================================
          [SECCIÓN MISIÓN Y VISIÓN]
          Contenido actualizado a pedido: refleja el posicionamiento B2B en
          Vaca Muerta / cuenca neuquina, Alto Valle, BESS, telemetría
          industrial y la alianza con BGH Tech Solutions.
      ==================================================================== */}
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
            {/* [MISIÓN] */}
            <Card className="border-[#0F2C59]/10 bg-white p-8 transition-all hover:shadow-lg">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#0F2C59]">
                <Target className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0F2C59]">Misión</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#0F172A]/70">
                En Moliné Electromecánica &amp; Energía proporcionamos soluciones
                integrales de ingeniería, climatización de alta eficiencia,
                energías renovables (Solar y BESS) y telemetría industrial para
                los sectores corporativo, comercial e industrial de la cuenca
                neuquina y el Alto Valle. Como partners estratégicos de BGH Tech
                Solutions, combinamos innovación tecnológica, flexibilidad de
                financiamiento y soporte técnico local con los más altos
                estándares de calidad y seguridad, impulsando la continuidad
                operativa y la transición energética de nuestros clientes.
              </p>
            </Card>

            {/* [VISIÓN] */}
            <Card className="border-[#0F2C59]/10 bg-white p-8 transition-all hover:shadow-lg">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#B85042]">
                <Eye className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0F2C59]">Visión</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#0F172A]/70">
                Consolidarnos como la empresa líder y referente en la región
                patagónica para el desarrollo e integración B2B de soluciones
                electromecánicas y de eficiencia energética, reconocida por la
                excelencia en la ejecución de proyectos en Vaca Muerta, nuestro
                compromiso con la sustentabilidad medioambiental y la creación de
                alianzas estratégicas de largo plazo que transformen el futuro
                energético e industrial de la región.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ====================================================================
          [SECCIÓN UNIDADES DE NEGOCIO]
          Tabs generados dinámicamente a partir de `businessUnits`. El slug de
          cada unidad se calcula normalizando el título (sin tildes, en
          minúsculas, separado por guiones) para usarlo como `value` del tab.
      ==================================================================== */}
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
            {/* [TABS TRIGGERS] */}
            <div className="mb-8 flex justify-center">
              <TabsList className="flex flex-wrap justify-center gap-1 rounded-xl bg-[#F1F5F9] p-1.5">
                {businessUnits.map((unit) => {
                  // Genera un slug URL-safe a partir del título (ej: "Energía Solar" -> "energia-solar")
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

            {/* [TABS CONTENIDO] Un TabsContent por cada unidad de negocio */}
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
                          {/* Badge condicional: solo si la unidad tiene partner BGH */}
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

      {/* ====================================================================
          [SECCIÓN CLIMATIZACIÓN - CATÁLOGO DESTACADO]
          Dos tarjetas de producto (Residencial / Grandes Superficies), cada
          una con imagen, badge de partner, lista de features y CTA a WhatsApp
          con un mensaje pre-armado específico para ese segmento.
      ==================================================================== */}
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
            {/* [CATÁLOGO - RESIDENCIAL] */}
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

            {/* [CATÁLOGO - GRANDES SUPERFICIES] */}
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

      {/* ====================================================================
          [SECCIÓN CALCULADORA HVAC]
          Formulario (largo/ancho/alto, tipo de uso, exposición solar) +
          panel de resultado en vivo. Todo el cálculo vive en `calculation`
          (useMemo definido arriba); esta sección solo pinta el estado.
      ==================================================================== */}
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
            {/* [CALCULADORA - FORMULARIO] Inputs controlados por useState */}
            <Card className="border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">
              <div className="mb-6 flex items-center gap-2">
                <Ruler className="h-5 w-5 text-[#B85042]" />
                <h3 className="text-lg font-semibold text-white">Datos del espacio</h3>
              </div>

              <div className="space-y-5">
                {/* Dimensiones: largo / ancho / alto en metros */}
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

                {/* Selector de tipo de uso (afecta el factor de frigorías) */}
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

                {/* Selector de exposición solar (botones tipo toggle) */}
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

              {/* Nota explicativa de la fórmula usada */}
              <div className="mt-6 rounded-lg border border-white/5 bg-white/[0.02] p-4">
                <p className="text-xs text-white/40">
                  <span className="font-semibold text-white/60">Fórmula:</span>{' '}
                  Frigorías = (Volumen × Factor) × Exposición + 1.000
                </p>
              </div>
            </Card>

            {/* [CALCULADORA - RESULTADO] Render condicional según `calculation` */}
            <div className="flex flex-col">
              {calculation ? (
                // Estado "con resultado": muestra frigorías, volumen, carga base,
                // equipo recomendado y CTA de WhatsApp con el resultado incluido.
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
                // Estado "vacío": se muestra mientras falten datos válidos.
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

      {/* ====================================================================
          [SECCIÓN PARTNERS ESTRATÉGICOS]
          Dos tarjetas: BGH (partner tecnológico) y Hernán Parada
          Construcciones (sinergia en obra civil / envolventes térmicos).
      ==================================================================== */}
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
            {/* [PARTNER - BGH] */}
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

            {/* [PARTNER - HERNÁN PARADA CONSTRUCCIONES] */}
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

      {/* ====================================================================
          [FOOTER / CONTACTO]
          Marca + descripción, datos de contacto (WhatsApp, email, cobertura)
          y link a Google Maps con el área de cobertura.
      ==================================================================== */}
      <footer id="contacto" className="bg-[#0F2C59] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {/* [FOOTER - MARCA] */}
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

            {/* [FOOTER - CONTACTO] */}
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

            {/* [FOOTER - MAPA DE COBERTURA] */}
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

          {/* [FOOTER - LEGAL] Año dinámico con new Date().getFullYear() */}
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
