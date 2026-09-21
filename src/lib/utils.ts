export { cn } from "cn";

// ---- Format Currency (IDR) ----
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ---- Format Date (Indonesian) ----
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  }).format(d);
}

// ---- Format Short Date ----
export function formatShortDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

// ---- Format Time ----
export function formatTime(time: string): string {
  return time.replace(":", ".") + " WIB";
}

// ---- Generate Slug ----
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// ---- Generate Couple Slug ----
export function generateCoupleSlug(groomName: string, brideName: string): string {
  const groom = groomName.split(" ")[0].toLowerCase();
  const bride = brideName.split(" ")[0].toLowerCase();
  return `${groom}-dan-${bride}`;
}

// ---- Generate Guest Link ----
export function generateGuestLink(baseUrl: string, slug: string, guestName?: string): string {
  const url = `${baseUrl}/${slug}`;
  if (guestName) {
    return `${url}?to=${encodeURIComponent(guestName)}`;
  }
  return url;
}

// ---- Generate WhatsApp Share Link ----
export function generateWhatsAppLink(url: string, guestName: string, coupleName: string): string {
  const message = encodeURIComponent(
    `Kepada Yth. ${guestName}\n\nTanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:\n\n💍 ${coupleName}\n\nUntuk info lebih lengkap, silakan buka undangan digital kami:\n${url}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.\n\nTerima kasih 🙏`
  );
  return `https://wa.me/?text=${message}`;
}

// ---- Calculate Days Remaining ----
export function calculateDaysRemaining(expiresAt: Date): number {
  const now = new Date();
  const diff = expiresAt.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

// ---- Calculate Countdown ----
export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function calculateCountdown(targetDate: Date): CountdownResult {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    isExpired: false,
  };
}

// ---- Validate Slug Availability ----
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;
  return slugRegex.test(slug) && slug.length >= 3 && slug.length <= 50;
}

// ---- Truncate Text ----
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

// ---- Get Initials ----
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

// ---- Debounce ----
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
