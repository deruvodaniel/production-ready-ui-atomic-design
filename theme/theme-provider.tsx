'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  typography: {
    fontFamily: {
      sans: string;
      serif: string;
      mono: string;
      display: string;
    };
  };
  spacing: {
    scale: 'compact' | 'comfortable' | 'spacious';
  };
}

interface ThemeContextType {
  isDark: boolean;
  toggleDarkMode: () => void;
  config: ThemeConfig;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultConfig: ThemeConfig = {
  colors: {
    primary: '#3b82f6',
    secondary: '#64748b',
    accent: '#d946ef',
  },
  typography: {
    fontFamily: {
      sans: 'Inter',
      serif: 'Georgia',
      mono: 'Monaco',
      display: 'Inter',
    },
  },
  spacing: {
    scale: 'comfortable',
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [config, setConfig] = useState<ThemeConfig>(defaultConfig);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const savedConfig = localStorage.getItem('theme-config');

    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }

    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error('Failed to parse saved theme config:', e);
      }
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    // Apply theme configuration
    const root = document.documentElement;
    
    // Generate color scales from base colors
    const generateColorScale = (baseColor: string) => {
      const hex = baseColor.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      
      return {
        50: `${Math.min(255, r + 40)} ${Math.min(255, g + 40)} ${Math.min(255, b + 40)}`,
        100: `${Math.min(255, r + 30)} ${Math.min(255, g + 30)} ${Math.min(255, b + 30)}`,
        200: `${Math.min(255, r + 20)} ${Math.min(255, g + 20)} ${Math.min(255, b + 20)}`,
        300: `${Math.min(255, r + 10)} ${Math.min(255, g + 10)} ${Math.min(255, b + 10)}`,
        400: `${Math.min(255, r + 5)} ${Math.min(255, g + 5)} ${Math.min(255, b + 5)}`,
        500: `${r} ${g} ${b}`,
        600: `${Math.max(0, r - 10)} ${Math.max(0, g - 10)} ${Math.max(0, b - 10)}`,
        700: `${Math.max(0, r - 20)} ${Math.max(0, g - 20)} ${Math.max(0, b - 20)}`,
        800: `${Math.max(0, r - 30)} ${Math.max(0, g - 30)} ${Math.max(0, b - 30)}`,
        900: `${Math.max(0, r - 40)} ${Math.max(0, g - 40)} ${Math.max(0, b - 40)}`,
        950: `${Math.max(0, r - 50)} ${Math.max(0, g - 50)} ${Math.max(0, b - 50)}`,
      };
    };

    // Apply color variables
    const primaryScale = generateColorScale(config.colors.primary);
    const secondaryScale = generateColorScale(config.colors.secondary);
    const accentScale = generateColorScale(config.colors.accent);

    Object.entries(primaryScale).forEach(([shade, color]) => {
      root.style.setProperty(`--color-primary-${shade}`, color);
    });
    
    Object.entries(secondaryScale).forEach(([shade, color]) => {
      root.style.setProperty(`--color-secondary-${shade}`, color);
    });
    
    Object.entries(accentScale).forEach(([shade, color]) => {
      root.style.setProperty(`--color-accent-${shade}`, color);
    });

    // Apply font variables
    root.style.setProperty('--font-sans', `'${config.typography.fontFamily.sans}', system-ui, sans-serif`);
    root.style.setProperty('--font-serif', `'${config.typography.fontFamily.serif}', serif`);
    root.style.setProperty('--font-mono', `'${config.typography.fontFamily.mono}', monospace`);
    root.style.setProperty('--font-display', `'${config.typography.fontFamily.display}', system-ui, sans-serif`);

    // Apply spacing scale
    const scales = {
      compact: 0.75,
      comfortable: 1,
      spacious: 1.25,
    };
    
    const scale = scales[config.spacing.scale];
    const baseSpacings = {
      xs: 0.25,
      sm: 0.5,
      md: 1,
      lg: 1.5,
      xl: 2,
      '2xl': 3,
    };

    Object.entries(baseSpacings).forEach(([size, value]) => {
      root.style.setProperty(`--spacing-${size}`, `${value * scale}rem`);
    });

    // Save config
    localStorage.setItem('theme-config', JSON.stringify(config));
  }, [config]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    setConfig(prev => ({
      ...prev,
      ...updates,
      colors: { ...prev.colors, ...updates.colors },
      typography: { 
        ...prev.typography, 
        ...updates.typography,
        fontFamily: { ...prev.typography.fontFamily, ...updates.typography?.fontFamily }
      },
      spacing: { ...prev.spacing, ...updates.spacing },
    }));
  };

  return (
    <ThemeContext.Provider value={{
      isDark,
      toggleDarkMode,
      config,
      updateTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}