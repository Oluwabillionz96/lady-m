/**
 * Validates a phone number for WhatsApp
 * Accepts formats: +1234567890, 1234567890, +1-234-567-8900, etc.
 */
export function validatePhoneNumber(phone: string): boolean {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, "");

  // Check if it has at least 10 digits (minimum for most countries)
  const digitCount = cleaned.replace(/\+/g, "").length;
  return digitCount >= 10 && digitCount <= 15;
}

/**
 * Formats a phone number for WhatsApp URL
 * Removes all non-digit characters except +
 */
export function formatPhoneForWhatsApp(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

/**
 * Generates a WhatsApp URL with optional pre-filled message
 */
export function getWhatsAppUrl(
  phoneNumber: string,
  message?: string,
): string | null {
  if (!validatePhoneNumber(phoneNumber)) {
    console.error("Invalid phone number for WhatsApp:", phoneNumber);
    return null;
  }

  const formattedPhone = formatPhoneForWhatsApp(phoneNumber);
  const encodedMessage = message ? encodeURIComponent(message) : "";
  const baseUrl = `https://wa.me/${formattedPhone}`;

  return encodedMessage ? `${baseUrl}?text=${encodedMessage}` : baseUrl;
}

export function formatMetricValue(metric: { value: string; label: string }) {
  const value = parseInt(metric.value);
  const label = metric.label.toLowerCase();

  switch (label) {
    case "happy clients":
      return value > 50 ? "50+" : metric.value;
    case "years experience":
      return value > 4 ? "5+" : metric.value;
    case "custom pieces":
      return value > 50 ? "50+" : metric.value;
    default:
      return metric.value;
  }
}
