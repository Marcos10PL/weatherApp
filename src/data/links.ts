import { routes } from '@/router'

const iconMap: Record<string, `pi pi-${string}`> = {
  home: 'pi pi-home',
} as const

export const links = routes
  .filter((route) => route.name !== undefined)
  .map((route) => ({
    icon: iconMap[route.name] || '',
    path: route.path,
    name: route.name || '',
  }))
