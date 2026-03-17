// Simple client-side stock management stored in localStorage.
const STORAGE_KEY = 'platano_stock_v1'

import { STOCK as INITIAL_STOCK } from './products'

function readStored(): number[] {
  try {
    if (typeof window === 'undefined') return [...INITIAL_STOCK]
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return [...INITIAL_STOCK]
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return [...INITIAL_STOCK]
    return parsed
  } catch (err) {
    return [...INITIAL_STOCK]
  }
}

function writeStored(arr: number[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr))
    // notify other listeners in same window
    try {
      window.dispatchEvent(new CustomEvent('platano_stock:update'))
    } catch (e) {
      // ignore
    }
  } catch (err) {
    // ignore
  }
}

export function getStock(idx: number) {
  const s = readStored()
  return typeof s[idx] === 'number' ? s[idx] : 0
}

export function setStock(idx: number, value: number) {
  const s = readStored()
  s[idx] = value
  writeStored(s)
}

export function decrementStock(idx: number, by = 1) {
  const s = readStored()
  if (typeof s[idx] !== 'number') s[idx] = 0
  s[idx] = Math.max(0, s[idx] - by)
  writeStored(s)
  return s[idx]
}

export function resetStock() {
  writeStored([...INITIAL_STOCK])
}

export function decrementByProductId(productId: string, by = 1) {
  // expects ids like `newin-1` (as used in the product pages)
  if (!productId.startsWith('newin-')) return
  const parts = productId.split('-')
  const n = parseInt(parts[1] || '', 10)
  if (Number.isNaN(n) || n <= 0) return
  decrementStock(n - 1, by)
}

export function listenStockUpdate(cb: () => void) {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('platano_stock:update', cb)
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) cb()
  })
  return () => {
    try { window.removeEventListener('platano_stock:update', cb) } catch (e) {}
  }
}
