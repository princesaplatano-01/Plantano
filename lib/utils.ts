import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert Mexican Pesos (MXN) to centavos (smallest currency unit)
export function mxnToCentavos(mxn: number) {
  // Ensure number input; round to nearest centavo
  const n = Number(mxn) || 0
  return Math.round(n * 100)
}
