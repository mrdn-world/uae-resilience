import { reactive } from 'vue'
import en from './locales/en.json'

const locales: Record<string, any> = { en }

const state = reactive({
  locale: 'en',
  messages: en as any,
})

export function setLocale(loc: string) {
  if (locales[loc]) {
    state.locale = loc
    state.messages = locales[loc]
  }
}

export function t(key: string, vars?: Record<string, string | number>): any {
  const parts = key.split('.')
  let v: any = state.messages
  for (const p of parts) {
    if (v == null) return key
    v = v[p]
  }
  if (v == null) return key
  if (typeof v === 'string' && vars) {
    return v.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? String(vars[k]) : `{${k}}`))
  }
  return v
}

export function tHtml(key: string, vars?: Record<string, string | number>): string {
  const v = t(key, vars)
  if (typeof v !== 'string') return String(v)
  return v
    .replace(/\{strong\}/g, '<strong>').replace(/\{\/strong\}/g, '</strong>')
    .replace(/\{em\}/g, '<em>').replace(/\{\/em\}/g, '</em>')
}

export const i18n = state
