import {
  Zap,
  SunMedium,
  Wind,
  Cpu,
  Home,
  Building2,
  type LucideIcon,
} from 'lucide-react';

export interface BusinessUnit {
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  longDescription: string;
  services: string[];
  partner?: string;
  partnerUrl?: string;
  partnerNote?: string;
  whatsappUrl: string;
  image: string;
  icon: LucideIcon;
  accentColor: string;
}

export const businessUnits: BusinessUnit[] = [
  {
    id: 1,
    slug: 'electromecanica',
    title: 'Electromecánica',
    shortTitle: 'Electromecánica',
    tagline: 'Tableros, transferencias y ensayos eléctricos de alto nivel',
    description:
      'Diseño, montaje y mantenimiento de tableros eléctricos principales y seccionales, transferencia automática de grupos electrógenos, medición de PAT y ensayos dieléctricos para asegurar la continuidad operativa de instalaciones industriales.',
    longDescription:
      'Nuestra división de electromecánica cubre el ciclo completo de la infraestructura eléctrica industrial: desde el diseño y montaje de tableros principales y seccionales hasta la transferencia automática de grupos electrógenos. Realizamos medición de PAT con telurímetro, ensayos con megóhmetro y elaboramos informes de siniestralidad para aseguradoras. Aplicamos mantenimiento predictivo para minimizar paradas no programadas y garantizar la continuidad operativa en plantas Oil & Gas, hotelería y grandes comercios.',
    services: [
      'Tableros eléctricos principales y seccionales (diseño, montaje y mantenimiento)',
      'Transferencia automática de grupos electrógenos',
      'Medición de PAT con telurímetro',
      'Ensayos dieléctricos con megóhmetro',
      'Informes de siniestralidad para aseguradoras',
      'Mantenimiento predictivo de instalaciones eléctricas',
    ],
    whatsappUrl:
      'https://wa.me/5492995809928?text=Hola%20Molin%C3%A9%20Electromec%C3%A1nica,%20quiero%20consultar%20por%20servicios%20de%20Electromec%C3%A1nica.',
    image:
      'https://images.pexels.com/photos/10871929/pexels-photo-10871929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: Zap,
    accentColor: 'from-amber-500 to-amber-600',
  },
  {
    id: 2,
    slug: 'energia-solar',
    title: 'Energía Solar y Eficiencia Energética',
    shortTitle: 'Energía Solar',
    tagline: 'Parques fotovoltaicos Off-Grid, BESS y colectores solares',
    description:
      'Parques fotovoltaicos Off-Grid e Híbridos, almacenamiento BESS con baterías de litio, Power Packages para telemetría en yacimientos y colectores solares para agua caliente (ACS) y piscinas. Partner Oficial BGH.',
    longDescription:
      'Como Partner Oficial de BGH, diseñamos e implementamos parques fotovoltaicos Off-Grid e Híbridos para la industria Oil & Gas y sector residencial. Integramos sistemas de almacenamiento BESS con baterías de litio para garantizar autonomía energética total. Instalamos Power Packages para telemetría en yacimientos remotos de Vaca Muerta, y colectores solares para agua caliente sanitaria (ACS) y climatización de piscinas. Cada proyecto se dimensiona para maximizar el ahorro energético y la independencia de la red eléctrica.',
    services: [
      'Parques fotovoltaicos Off-Grid e Híbridos',
      'Almacenamiento BESS (baterías de litio)',
      'Power Packages para telemetría en yacimientos',
      'Colectores solares para agua caliente (ACS)',
      'Climatización solar de piscinas',
      'Auditorías y optimización de eficiencia energética',
    ],
    partner: 'BGH Tech Solutions',
    partnerUrl: 'https://bghcloudtech.com',
    whatsappUrl:
      'https://wa.me/5492995809928?text=Hola%20Molin%C3%A9%20Electromec%C3%A1nica,%20quiero%20consultar%20por%20Energ%C3%ADa%20Solar%20y%20BESS.',
    image:
      'https://images.pexels.com/photos/13932270/pexels-photo-13932270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: SunMedium,
    accentColor: 'from-orange-500 to-amber-500',
  },
  {
    id: 3,
    slug: 'climatizacion-hvac',
    title: 'Climatización (HVAC) y Refrigeración Industrial',
    shortTitle: 'Climatización HVAC',
    tagline: 'VRF/VRV, Chillers, Rooftop y Split Inverter con control digital',
    description:
      'Instalación y mantenimiento de sistemas VRF/VRV, Chillers, Rooftop y Split Inverter. Control con instrumental digital, detección de fugas de gas refrigerante y asistencia hotelera/industrial. Partner Oficial BGH.',
    longDescription:
      'Como Partner Oficial de BGH, cubrimos el espectro completo de climatización y refrigeración industrial: instalación, puesta en marcha y mantenimiento de sistemas VRF/VRV, Chillers, unidades Rooftop y Split Inverter. Utilizamos instrumental digital de última generación para el control de parámetros, detección de fugas de gas refrigerante y balanceo de cargas. Brindamos asistencia técnica integral a hoteles, industrias y grandes comercios con respuesta operativa inmediata.',
    services: [
      'Instalación y mantenimiento de VRF/VRV',
      'Chillers (enfriadoras) industriales',
      'Unidades Rooftop para grandes superficies',
      'Split Inverter residencial y comercial',
      'Control con instrumental digital y balanceo de cargas',
      'Detección de fugas de gas refrigerante',
      'Asistencia técnica hotelera e industrial',
    ],
    partner: 'BGH Tech Solutions',
    partnerUrl: 'https://bghcloudtech.com',
    whatsappUrl:
      'https://wa.me/5492995809928?text=Hola%20Molin%C3%A9%20Electromec%C3%A1nica,%20quiero%20consultar%20por%20sistemas%20de%20Climatizaci%C3%B3n%20HVAC.',
    image:
      'https://images.pexels.com/photos/32032996/pexels-photo-32032996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: Wind,
    accentColor: 'from-sky-500 to-cyan-500',
  },
  {
    id: 4,
    slug: 'automatizacion-iot',
    title: 'Automatización y Control con IoT',
    shortTitle: 'Automatización IoT',
    tagline: 'Telemetría en tiempo real, inmótica y tableros inteligentes',
    description:
      'Telemetría y monitoreo de redes y activos en tiempo real (vibración, temperatura, desbalances), inmótica para campamentos en Vaca Muerta, tableros inteligentes y ahorro energético automatizado. Partner Oficial BGH Tech Solutions.',
    longDescription:
      'Como Partner Oficial de BGH Tech Solutions, implementamos soluciones de automatización y control basadas en IoT para la industria Oil & Gas y campamentos en Vaca Muerta. Realizamos telemetría y monitoreo de redes y activos críticos en tiempo real: vibración, temperatura, desbalances eléctricos y consumo energético. Desarrollamos inmótica para campamentos, tableros inteligentes con comunicación remota y sistemas de ahorro energético automatizado que reducen costos operativos de forma medible.',
    services: [
      'Telemetría y monitoreo de redes/activos en tiempo real',
      'Sensores de vibración, temperatura y desbalances',
      'Inmótica para campamentos en Vaca Muerta',
      'Tableros inteligentes con comunicación remota',
      'Ahorro energético automatizado',
      'Dashboards de control y reportes operativos',
    ],
    partner: 'BGH Tech Solutions',
    partnerUrl: 'https://bghcloudtech.com',
    whatsappUrl:
      'https://wa.me/5492995809928?text=Hola%20Molin%C3%A9%20Electromec%C3%A1nica,%20quiero%20consultar%20por%20soluciones%20de%20Automatizaci%C3%B3n%20e%20IoT.',
    image:
      'https://images.pexels.com/photos/17828637/pexels-photo-17828637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: Cpu,
    accentColor: 'from-teal-500 to-emerald-500',
  },
  {
    id: 5,
    slug: 'domotica',
    title: 'Domótica Residencial y Comercial (Inmótica)',
    shortTitle: 'Domótica',
    tagline: 'Smart Hotel, control centralizado y eliminación de consumos fantasmas',
    description:
      'Smart Hotel, control centralizado de iluminación, accesos y clima, eliminación de consumos fantasmas y automatización del confort para residencias, hoteles y comercios.',
    longDescription:
      'Diseñamos e instalamos sistemas de domótica e inmótica para residencias, hoteles y comercios. Implementamos soluciones Smart Hotel con control centralizado de iluminación, accesos, clima y persianas. Eliminamos consumos fantasmas mediante automatización inteligente y programación de escenarios. Cada proyecto se personaliza para maximizar el confort, la seguridad y el ahorro energético del usuario final.',
    services: [
      'Smart Hotel: control centralizado de iluminación, accesos y clima',
      'Eliminación de consumos fantasmas',
      'Automatización del confort (escenarios programados)',
      'Control de persianas, toldos y cortinas motorizadas',
      'Integración con asistentes de voz y app móvil',
      'Gestión de accesos y seguridad perimetral',
    ],
    whatsappUrl:
      'https://wa.me/5492995809928?text=Hola%20Molin%C3%A9%20Electromec%C3%A1nica,%20quiero%20consultar%20por%20Dom%C3%B3tica%20y%20Gesti%C3%B3n%20Inteligente.',
    image:
      'https://images.pexels.com/photos/16423104/pexels-photo-16423104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: Home,
    accentColor: 'from-indigo-500 to-blue-500',
  },
  {
    id: 6,
    slug: 'construccion',
    title: 'Construcción de Todo Tipo de Escala',
    shortTitle: 'Construcción',
    tagline: 'Estructuras metálicas, aislación térmica y mantenimiento civil',
    description:
      'En alianza con Pintegralco y Hernán Parada: montaje de estructuras metálicas, envolventes e aislación térmica, pintura profesional, redes de agua/gas, cartelería corporativa y mantenimiento hotelero/industrial.',
    longDescription:
      'En alianza estratégica con Pintegralco S.R.L. y Hernán Parada, cubrimos la obra civil e infraestructura de todo tipo de escala. Realizamos montaje de estructuras metálicas, envolventes e aislación térmica de alta performance, pintura profesional industrial, redes de agua y gas, cartelería corporativa y mantenimiento integral hotelero e industrial. Esta división complementa el portfolio electromecánico con soluciones constructivas llave en mano.',
    services: [
      'Montaje de estructuras metálicas',
      'Envolventes e aislación térmica de alta performance',
      'Pintura profesional industrial',
      'Redes de agua y gas',
      'Cartelería corporativa',
      'Mantenimiento hotelero e industrial',
    ],
    partner: 'Pintegralco S.R.L. y Hernán Parada',
    partnerUrl: 'https://www.pintegralco.com.ar',
    partnerNote: 'Hernán Parada: Web en desarrollo',
    whatsappUrl:
      'https://wa.me/5492995809928?text=Hola%20Molin%C3%A9%20Electromec%C3%A1nica,%20quiero%20consultar%20por%20Obras%20de%20Construcci%C3%B3n%20e%20Infraestructura.',
    image:
      'https://images.pexels.com/photos/37162865/pexels-photo-37162865.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: Building2,
    accentColor: 'from-slate-600 to-slate-700',
  },
];

export const WHATSAPP_GENERAL =
  'https://wa.me/5492995809928?text=Hola%20Molin%C3%A9%20Electromec%C3%A1nica,%20necesito%20asistencia%20t%C3%A9cnica.';

export const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Unidades de Negocio', href: '#unidades' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Calculador HVAC', href: '#calculadora' },
  { label: 'Partners', href: '#partners' },
  { label: 'Contacto', href: '#contacto' },
];
