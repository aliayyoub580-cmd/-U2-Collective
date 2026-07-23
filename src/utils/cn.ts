type ClassValue = string | undefined | null | false | Record<string, boolean>

export function cn(...classes: ClassValue[]): string {
  return classes
    .filter(Boolean)
    .map((cls) => {
      if (typeof cls === 'object' && cls !== null) {
        return Object.entries(cls)
          .filter(([, v]) => v)
          .map(([k]) => k)
          .join(' ')
      }
      return cls
    })
    .join(' ')
    .trim()
}
