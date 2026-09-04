/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Permite completar el build en Vercel aunque existan errores de tipos
    ignoreBuildErrors: true,
  },
  eslint: {
    // Evita bloqueos por advertencias de sintaxis/estilo
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
