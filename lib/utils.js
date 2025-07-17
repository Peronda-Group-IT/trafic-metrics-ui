import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export function formatDate(date) {
  
    if (!date) return '';
    
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return '';
    
    // Format: DD/MM/YYYY
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    
    return `${day}/${month}/${year}`;
}

export function dateNowMinuteZero() {
  const now = new Date();
  now.setMinutes(0, 0, 0);
  return format(now, "dd/MM/yyyy");
}

export function dateNowPlusOneHourMinuteZero() {
  const now = new Date();
  now.setHours(now.getHours() + 1, 0, 0, 0);
  return format(now, "dd/MM/yyyy");
}

export function timeNowMinuteZero() {
  const now = new Date();
  now.setMinutes(0, 0, 0);
  return format(now, "HH:mm");
}

export function timeNowPlusOneHourMinuteZero() {
  const now = new Date();
  now.setHours(now.getHours() + 1, 0, 0, 0);
  return format(now, "HH:mm");
}

export function parseDateEU(dateString) {
  // Assumes format "DD/MM/YYYY HH:mm"
  const [datePart, timePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('/').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);

  return new Date(year, month - 1, day, hours, minutes); // JS months are 0-based
}

export function normalizeText(text) {
  if (!text) return '';
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}