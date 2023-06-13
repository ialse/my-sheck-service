export const getLocalItem = (key: string): string | null => {
  return localStorage.getItem(key)
}

export const setLocalItem = (key: string, value: string): void => {
  localStorage.setItem(key, value)
}

export const removeLocalItem = (key: string): void => {
  localStorage.removeItem(key)
}
