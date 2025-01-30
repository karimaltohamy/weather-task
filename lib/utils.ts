import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timer: any = null
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => func(...args), delay)
  }
}
