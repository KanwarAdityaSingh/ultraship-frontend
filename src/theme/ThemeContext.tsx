import type { ReactNode } from 'react'
import { createContext, useEffect, useMemo } from 'react'

type ThemeVariables = Record<string, string>

type ThemeContextValue = {
  themeVariables: ThemeVariables
}

export const ThemeContext = createContext<ThemeContextValue>({
  themeVariables: {},
})

const luxuryBabyPinkTheme: ThemeVariables = {
  '--font-family':
    'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',

  // Core palette
  '--color-bg': '#FBF7F4',
  '--bg-gradient': 'linear-gradient(135deg, #FBF7F4 0%, #EFDCD6 50%, #E2CFCB 100%)',
  '--color-surface': '#FFFFFF',
  '--color-text': '#3F3331', // warm deep cocoa instead of pure black
  '--color-muted': '#7A6966',
  '--color-border': 'rgba(141, 92, 84, 0.25)',

  // Brand accents
  '--color-primary': '#A56A64', // wooden rose primary
  '--color-primary-contrast': '#ffffff',
  '--color-accent': '#8D5C54', // deeper wooden-rose accent
  '--primary-rgb': '165, 106, 100',
  '--accent-rgb': '141, 92, 84',

  // Controls
  '--input-bg': '#FFFFFF',
  '--input-border': 'rgba(141, 92, 84, 0.25)',
  '--input-focus': '#A56A64',
  '--placeholder-color': 'rgba(0, 0, 0, 0.35)',

  '--button-bg': '#A56A64',
  '--button-hover-bg': '#945D58',
  '--button-text': '#FFFFFF',

  // Radii
  '--radius-lg': '16px',
  '--radius-md': '12px',
  '--radius-sm': '10px',

  // Spacing scale
  '--spacing-1': '4px',
  '--spacing-2': '8px',
  '--spacing-3': '12px',
  '--spacing-4': '16px',
  '--spacing-5': '20px',
  '--spacing-6': '24px',
  '--spacing-7': '32px',
  '--spacing-8': '40px',

  // Elevation
  '--shadow-soft': '0 10px 30px rgba(165, 106, 100, 0.12)',
  '--focus-ring': '0 0 0 4px rgba(165, 106, 100, 0.20)',
  '--button-shadow': '0 10px 24px rgba(165, 106, 100, 0.28)',
  '--button-shadow-hover': '0 14px 28px rgba(165, 106, 100, 0.32)',
  '--panel-accent-1': 'rgba(141, 92, 84, 0.22)',
  '--panel-accent-2': 'rgba(165, 106, 100, 0.30)',
  '--panel-accent-3': 'rgba(141, 92, 84, 0.38)',
  '--panel-accent-4': 'rgba(165, 106, 100, 0.32)',
  '--panel-accent-5': 'rgba(141, 92, 84, 0.36)',
  '--panel-accent-6': 'rgba(165, 106, 100, 0.28)',

  // Page-specific backgrounds
  '--right-panel-bg': '#FAF1EF', // light wooden-rose tint, near white
  '--card-surface': '#F4EAE7', // subtle wooden-rose tint for contrast
  '--card-border': 'rgba(141, 92, 84, 0.30)',
  '--card-accent-1': 'rgba(165, 106, 100, 0.28)',
  '--card-accent-2': 'rgba(141, 92, 84, 0.20)',
  '--card-accent-3': 'rgba(165, 106, 100, 0.16)',
  '--card-accent-4': 'rgba(141, 92, 84, 0.14)',
  '--card-accent-dark-1': 'rgba(112, 70, 64, 0.24)',
  '--card-accent-dark-2': 'rgba(90, 57, 52, 0.18)',
  '--shadow-card': '0 16px 36px rgba(165, 106, 100, 0.22)',
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const value = useMemo<ThemeContextValue>(() => {
    return { themeVariables: luxuryBabyPinkTheme }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    for (const [key, val] of Object.entries(luxuryBabyPinkTheme)) {
      root.style.setProperty(key, val)
    }
  }, [])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}


