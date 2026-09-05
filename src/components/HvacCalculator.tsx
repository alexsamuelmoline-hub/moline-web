import { useState, useMemo } from 'react';
import { Calculator, MessageCircle, RotateCcw, Thermometer } from 'lucide-react';

type UsageType = 'residencial' | 'oficina' | 'comercio' | 'industrial';
type SolarExposure = 'sombra' | 'moderado' | 'directo';

const usageFactors: Record<UsageType, number> = {
  residencial: 130,
  oficina: 150,
  comercio: 180,
  industrial: 220,
};

const solarFactors: Record<SolarExposure, number> = {
  sombra: 0.85,
  moderado: 1.0,
  directo: 1.2,
};

const usageLabels: Record<UsageType, string> = {
  residencial: 'Residencial',
  oficina: 'Oficina',
  comercio: 'Comercio / Hotel',
  industrial: 'Planta Industrial / Data Center',
};

const solarLabels: Record<SolarExposure, string> = {
  sombra: 'Sombra',
  moderado: 'Sol Moderado',
  directo: 'Sol Directo / Techo Chapa',
};

function recommendModel(frigorias: number): string {
  if (frigorias <= 3000) return 'BGH Split Inverter 3000 Frigorías';
  if (frigorias <= 6000) return 'BGH Split Inverter 6000 Frigorías';
  if (frigorias <= 12000) return 'BGH VRF/VRV Multizona 12000 Frigorías';
  if (frigorias <= 24000) return 'BGH Chiller Compacto 24000 Frigorías';
  return 'BGH Rooftop Industrial 36000+ Frigorías';
}

export default function HvacCalculator() {
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [usage, setUsage] = useState<UsageType>('residencial');
  const [exposure, setExposure] = useState<SolarExposure>('moderado');
  const [calculated, setCalculated] = useState(false);

  const result = useMemo(() => {
    const w = parseFloat(width);
    const l = parseFloat(length);
    const h = parseFloat(height);
    if (!w || !l || !h || w <= 0 || l <= 0 || h <= 0) return null;

    const volume = w * l * h;
    const baseFrigorias = volume * usageFactors[usage];
    const totalFrigorias = Math.round(baseFrigorias * solarFactors[exposure]);
    const model = recommendModel(totalFrigorias);

    return { volume: Math.round(volume), totalFrigorias, model };
  }, [width, length, height, usage, exposure]);

  const handleCalculate = () => {
    if (result) setCalculated(true);
  };

  const handleReset = () => {
    setWidth('');
    setLength('');
    setHeight('');
    setUsage('residencial');
    setExposure('moderado');
    setCalculated(false);
  };

  const buildWhatsAppUrl = () => {
    if (!result) return '#';
    const text = `Hola Moliné Electromecánica, necesito un equipo HVAC. Dimensiones: ${width}m x ${length}m x ${height}m. Uso: ${usageLabels[usage]}. Exposición: ${solarLabels[exposure]}. Resultado: ${result.totalFrigorias} frigorías. Equipo recomendado: ${result.model}. ¿Tienen disponibilidad?`;
    return `https://wa.me/5492995809928?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="calculadora" className="bg-brand-blue py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-copper/20 px-4 py-1.5 text-sm font-semibold text-brand-copper">
            <Calculator className="h-4 w-4" />
            Herramienta Interactiva
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            Calculador HVAC
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/60">
            Estimá las frigorías necesarias y el equipo BGH recomendado para tu
            espacio.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="grid lg:grid-cols-2">
            {/* Form side */}
            <div className="p-8 lg:p-10">
              <h3 className="font-display text-xl font-bold text-brand-slate">
                Datos del Espacio
              </h3>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-brand-slate">
                    Ancho (m)
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="5"
                    className="w-full rounded-xl border border-brand-slate/15 px-3 py-2.5 text-sm text-brand-slate outline-none transition-all focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-brand-slate">
                    Largo (m)
                  </label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="8"
                    className="w-full rounded-xl border border-brand-slate/15 px-3 py-2.5 text-sm text-brand-slate outline-none transition-all focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-brand-slate">
                    Alto (m)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="2.7"
                    className="w-full rounded-xl border border-brand-slate/15 px-3 py-2.5 text-sm text-brand-slate outline-none transition-all focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-1.5 block text-sm font-medium text-brand-slate">
                  Tipo de Uso
                </label>
                <select
                  value={usage}
                  onChange={(e) => setUsage(e.target.value as UsageType)}
                  className="w-full rounded-xl border border-brand-slate/15 px-3 py-2.5 text-sm text-brand-slate outline-none transition-all focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                >
                  {(Object.keys(usageLabels) as UsageType[]).map((key) => (
                    <option key={key} value={key}>
                      {usageLabels[key]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <label className="mb-1.5 block text-sm font-medium text-brand-slate">
                  Exposición Solar
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(solarLabels) as SolarExposure[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => setExposure(key)}
                      className={`rounded-xl border px-2 py-2.5 text-xs font-medium transition-all ${
                        exposure === key
                          ? 'border-brand-blue bg-brand-blue text-white'
                          : 'border-brand-slate/15 bg-white text-brand-slate/70 hover:border-brand-blue/50'
                      }`}
                    >
                      {solarLabels[key]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleCalculate}
                  disabled={!result}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Calculator className="h-4 w-4" />
                  Calcular
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-slate/15 px-4 py-3 text-sm font-medium text-brand-slate/70 transition-all hover:bg-brand-slate/5"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Result side */}
            <div className="relative flex flex-col justify-center bg-gradient-to-br from-brand-blue to-brand-blue/80 p-8 lg:p-10">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-copper/10 blur-2xl" />

              {!calculated || !result ? (
                <div className="relative flex flex-col items-center justify-center py-12 text-center">
                  <Thermometer className="h-16 w-16 text-white/20" />
                  <p className="mt-4 text-sm text-white/40">
                    Ingresá las dimensiones y presioná "Calcular" para ver el
                    resultado.
                  </p>
                </div>
              ) : (
                <div className="relative animate-scale-in">
                  <div className="flex items-center gap-2 text-brand-copper">
                    <Thermometer className="h-5 w-5" />
                    <span className="text-sm font-semibold uppercase tracking-wider">
                      Resultado
                    </span>
                  </div>

                  <div className="mt-6">
                    <div className="text-sm text-white/50">Volumen del espacio</div>
                    <div className="font-display text-2xl font-bold text-white">
                      {result.volume} m³
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                    <div className="text-sm text-white/50">Frigorías totales</div>
                    <div className="font-display text-4xl font-bold text-brand-copper">
                      {result.totalFrigorias.toLocaleString('es-AR')}
                      <span className="ml-1 text-lg text-white/60">frig</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="text-sm text-white/50">Equipo recomendado</div>
                    <div className="mt-1 font-display text-lg font-semibold text-white">
                      {result.model}
                    </div>
                  </div>

                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-500/30 transition-all hover:scale-105 hover:bg-green-600"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Consultar disponibilidad por WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
