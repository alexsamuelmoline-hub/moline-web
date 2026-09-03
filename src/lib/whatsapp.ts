export function generateWhatsAppLink(serviceName: string, customDetails?: string): string {
  const phoneNumber = "5491112345678"; // Reemplaza con tu número real con código de país
  let message = `Hola Moliné Electromecánica, estuve viendo en la web el servicio de ${serviceName}`;
  
  if (customDetails) {
    message += ` y quisiera cotizar: ${customDetails}`;
  } else {
    message += ` y quisiera solicitar más información.`;
  }

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
