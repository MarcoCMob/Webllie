const PREFIX = 'webllie:'

function withPrefix(key: string) {
  return `${PREFIX}${key}`
}

export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(withPrefix(key))
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

export function writeStorage<T>(key: string, value: T) {
  localStorage.setItem(withPrefix(key), JSON.stringify(value))
}
