import { useState } from 'react';
import {
  Send,
  MessageCircle,
  CheckCircle2,
  User,
  Phone,
  Building,
  Briefcase,
  FileText,
} from 'lucide-react';
import { businessUnits } from '@/data/businessUnits';

interface ContactFormProps {
  onNavigate: (page: 'home', section?: string) => void;
}

export default function ContactForm({ onNavigate }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    clientType: '',
    businessUnit: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio';
    if (!formData.clientType) newErrors.clientType = 'Seleccioná un tipo de cliente';
    if (!formData.businessUnit) newErrors.businessUnit = 'Seleccioná una unidad';
    if (!formData.message.trim()) newErrors.message = 'El mensaje es obligatorio';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      clientType: '',
      businessUnit: '',
      message: '',
    });
    setSubmitted(false);
  };

  const buildWhatsAppUrl = () => {
    const text = `Hola Moliné Electromecánica, soy ${formData.name}. Tel: ${formData.phone}. Cliente: ${formData.clientType}. Unidad de interés: ${formData.businessUnit}. Mensaje: ${formData.message}`;
    return `https://wa.me/5492995809928?text=${encodeURIComponent(text)}`;
  };

  if (submitted) {
    return (
      <section id="contacto" className="bg-brand-light py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
            <div className="flex flex-col items-center p-12 text-center animate-scale-in">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-brand-slate">
                ¡Consulta Enviada!
              </h3>
              <p className="mt-3 max-w-md text-base text-brand-slate/60">
                Gracias {formData.name}. Nuestro equipo técnico se pondrá en
                contacto a la brevedad. Para una respuesta inmediata, podés
                enviar tu consulta directamente por WhatsApp.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105"
                >
                  <MessageCircle className="h-5 w-5" />
                  Enviar por WhatsApp
                </a>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-slate/15 px-6 py-3 text-sm font-medium text-brand-slate/70 transition-all hover:bg-brand-slate/5"
                >
                  Enviar otra consulta
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="bg-brand-light py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-brand-blue/10 px-4 py-1.5 text-sm font-semibold text-brand-blue">
            Contacto
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-brand-slate sm:text-4xl">
            Póngase en Contacto con Nuestro Equipo Técnico
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-brand-slate/60">
            Respondemos consultas técnicas y comerciales con prioridad
            operativa.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 overflow-hidden rounded-3xl bg-white p-8 shadow-xl lg:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-brand-slate">
                Nombre y Apellido
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/30" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Juan Pérez"
                  className={`w-full rounded-xl border px-3 py-2.5 pl-10 text-sm text-brand-slate outline-none transition-all focus:ring-2 focus:ring-brand-blue/20 ${
                    errors.name
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-brand-slate/15 focus:border-brand-blue'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-brand-slate">
                Número de Teléfono
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/30" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+54 9 299 ..."
                  className={`w-full rounded-xl border px-3 py-2.5 pl-10 text-sm text-brand-slate outline-none transition-all focus:ring-2 focus:ring-brand-blue/20 ${
                    errors.phone
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-brand-slate/15 focus:border-brand-blue'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Client type */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-brand-slate">
                Tipo de Cliente
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/30 pointer-events-none" />
                <select
                  value={formData.clientType}
                  onChange={(e) =>
                    setFormData({ ...formData, clientType: e.target.value })
                  }
                  className={`w-full appearance-none rounded-xl border px-3 py-2.5 pl-10 text-sm text-brand-slate outline-none transition-all focus:ring-2 focus:ring-brand-blue/20 ${
                    errors.clientType
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-brand-slate/15 focus:border-brand-blue'
                  }`}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Particular">Particular</option>
                  <option value="Empresa / Corporativo">
                    Empresa / Corporativo
                  </option>
                </select>
              </div>
              {errors.clientType && (
                <p className="mt-1 text-xs text-red-500">{errors.clientType}</p>
              )}
            </div>

            {/* Business unit */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-brand-slate">
                Unidad de Negocio de Interés
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/30 pointer-events-none" />
                <select
                  value={formData.businessUnit}
                  onChange={(e) =>
                    setFormData({ ...formData, businessUnit: e.target.value })
                  }
                  className={`w-full appearance-none rounded-xl border px-3 py-2.5 pl-10 text-sm text-brand-slate outline-none transition-all focus:ring-2 focus:ring-brand-blue/20 ${
                    errors.businessUnit
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-brand-slate/15 focus:border-brand-blue'
                  }`}
                >
                  <option value="">Seleccionar...</option>
                  {businessUnits.map((unit) => (
                    <option key={unit.id} value={unit.title}>
                      {unit.id}) {unit.title}
                    </option>
                  ))}
                </select>
              </div>
              {errors.businessUnit && (
                <p className="mt-1 text-xs text-red-500">{errors.businessUnit}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="mt-5">
            <label className="mb-1.5 block text-sm font-medium text-brand-slate">
              Mensaje
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-brand-slate/30" />
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                placeholder="Describí tu consulta técnica o necesidad..."
                className={`w-full resize-none rounded-xl border px-3 py-2.5 pl-10 text-sm text-brand-slate outline-none transition-all focus:ring-2 focus:ring-brand-blue/20 ${
                  errors.message
                    ? 'border-red-400 focus:border-red-400'
                    : 'border-brand-slate/15 focus:border-brand-blue'
                }`}
              />
            </div>
            {errors.message && (
              <p className="mt-1 text-xs text-red-500">{errors.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-brand-blue/90"
            >
              <Send className="h-5 w-5" />
              Enviar Consulta
            </button>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!formData.name || !formData.phone) {
                  e.preventDefault();
                  handleSubmit(e as unknown as React.FormEvent);
                }
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-green-500 px-7 py-3.5 text-base font-semibold text-green-600 transition-all hover:bg-green-50"
            >
              <MessageCircle className="h-5 w-5" />
              Enviar por WhatsApp
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
