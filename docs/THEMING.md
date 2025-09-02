# Theming Guide

## White-Label Theming System

This starter provides a comprehensive theming system that allows you to easily rebrand the entire application with your organization's visual identity.

## Theme Architecture

### Design Tokens

The theming system is built on design tokens that define all visual properties:

```typescript
interface DesignTokens {
  colors: ColorSystem;
  typography: TypographySystem;
  spacing: SpacingSystem;
  breakpoints: BreakpointSystem;
  borderRadius: BorderRadiusSystem;
  shadows: ShadowSystem;
}
```

### Color System

Each color has a complete scale (50-950) for maximum flexibility:

```typescript
colors: {
  primary: {
    50: '#eff6ff',   // Background tints
    100: '#dbeafe',  // Subtle backgrounds
    200: '#bfdbfe',  // Hover states
    300: '#93c5fd',  // Disabled states
    400: '#60a5fa',  // Subtle text
    500: '#3b82f6',  // Default/base color
    600: '#2563eb',  // Interactive elements
    700: '#1d4ed8',  // High contrast text
    800: '#1e40af',  // Dark backgrounds
    900: '#1e3a8a',  // Darkest backgrounds
    950: '#172554',  // Maximum contrast
  }
}
```

## Quick Theming

### Method 1: Runtime Theme Updates

```typescript
import { useTheme } from '@/theme/theme-provider';

function BrandCustomizer() {
  const { updateTheme } = useTheme();
  
  const applyBranding = () => {
    updateTheme({
      colors: {
        primary: '#your-primary-color',
        secondary: '#your-secondary-color',
        accent: '#your-accent-color',
      },
      typography: {
        fontFamily: 'Your Brand Font',
      },
    });
  };
  
  return <Button onClick={applyBranding}>Apply Branding</Button>;
}
```

### Method 2: Design Token Customization

Update `design-tokens/tokens.ts` with your brand colors:

```typescript
export const customTokens: DesignTokens = {
  colors: {
    primary: {
      50: '#fef7ff',
      500: '#d946ef',  // Your primary brand color
      950: '#4a044e',
    },
    secondary: {
      50: '#f0f9ff', 
      500: '#0ea5e9',  // Your secondary brand color
      950: '#0c4a6e',
    },
    accent: {
      50: '#fff7ed',
      500: '#f97316',  // Your accent brand color  
      950: '#9a3412',
    },
  },
  typography: {
    fontFamily: {
      sans: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
    },
  },
};
```

## Advanced Theming

### Creating Color Scales

Use online tools to generate complete color scales:

1. Start with your brand color (500 shade)
2. Generate lighter shades (50-400) for backgrounds and subtle elements
3. Generate darker shades (600-950) for text and high contrast elements

```typescript
// Example: Generate from brand color #7c3aed
const brandPurple = {
  50: '#faf5ff',
  100: '#f3e8ff', 
  200: '#e9d5ff',
  300: '#d8b4fe',
  400: '#c084fc',
  500: '#7c3aed',  // Your brand color
  600: '#7c3aed',
  700: '#6d28d9',
  800: '#5b21b6',
  900: '#4c1d95',
  950: '#2e1065',
};
```

### Typography Customization

```typescript
typography: {
  fontFamily: {
    sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
    serif: ['Playfair Display', 'Georgia', 'serif'],
    mono: ['JetBrains Mono', 'Monaco', 'monospace'],
  },
  fontSize: {
    // Customize scale ratios
    base: ['1rem', { lineHeight: '1.6rem' }],
    lg: ['1.125rem', { lineHeight: '1.8rem' }],
    // ... other sizes
  },
}
```

### Component-Level Theming

Override component styles using CSS custom properties:

```css
/* components/atoms/Button/Button.module.css */
.primary {
  background-color: var(--color-primary, theme('colors.primary.600'));
  color: var(--color-primary-foreground, theme('colors.white'));
}

.primary:hover {
  background-color: var(--color-primary-hover, theme('colors.primary.700'));
}
```

## Theme Provider Configuration

### Default Theme Setup

```typescript
// theme/theme-provider.tsx
const defaultConfig: ThemeConfig = {
  colors: {
    primary: '#3b82f6',    // Blue
    secondary: '#14b8a6',  // Teal  
    accent: '#f97316',     // Orange
  },
  typography: {
    fontFamily: 'Inter',
  },
  borderRadius: '0.5rem',
  spacing: 'default',
};
```

### Custom Theme Creation

```typescript
// Create a new theme configuration
export const acmeTheme: ThemeConfig = {
  colors: {
    primary: '#dc2626',    // Acme Red
    secondary: '#1f2937',  // Acme Dark Gray
    accent: '#fbbf24',     // Acme Gold
  },
  typography: {
    fontFamily: 'Roboto',
  },
  borderRadius: '0.25rem', // Sharper corners
};

// Apply theme
<ThemeProvider defaultConfig={acmeTheme}>
  <App />
</ThemeProvider>
```

## Dark Mode Implementation

### Automatic Detection

```typescript
useEffect(() => {
  // Detect system preference
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  setIsDark(mediaQuery.matches);
  
  // Listen for changes
  const handleChange = (e: MediaQueryListEvent) => {
    setIsDark(e.matches);
  };
  
  mediaQuery.addEventListener('change', handleChange);
  return () => mediaQuery.removeEventListener('change', handleChange);
}, []);
```

### CSS Variables for Dark Mode

```css
:root {
  --color-background: #ffffff;
  --color-text: #000000;
}

.dark {
  --color-background: #000000;
  --color-text: #ffffff;
}

.component {
  background-color: var(--color-background);
  color: var(--color-text);
}
```

## Multi-Brand Support

### Brand Configuration

```typescript
// config/brands.ts
export const brands = {
  acme: {
    name: 'Acme Corp',
    colors: {
      primary: '#dc2626',
      secondary: '#1f2937', 
      accent: '#fbbf24',
    },
    logo: '/logos/acme-logo.svg',
    fontFamily: 'Roboto',
  },
  globex: {
    name: 'Globex Corporation',
    colors: {
      primary: '#7c3aed',
      secondary: '#059669',
      accent: '#f59e0b', 
    },
    logo: '/logos/globex-logo.svg',
    fontFamily: 'Open Sans',
  },
};

// Apply brand theme
const brandSlug = 'acme'; // From URL or config
const brandConfig = brands[brandSlug];
```

### Dynamic Brand Loading

```typescript
function BrandProvider({ brand, children }: BrandProviderProps) {
  const brandConfig = brands[brand];
  
  useEffect(() => {
    // Apply brand CSS variables
    Object.entries(brandConfig.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--brand-${key}`, value);
    });
    
    // Update document title and favicon
    document.title = `${brandConfig.name} - Dashboard`;
  }, [brand, brandConfig]);
  
  return (
    <ThemeProvider defaultConfig={brandConfig}>
      {children}
    </ThemeProvider>
  );
}
```

## CSS Architecture

### Utility Classes

Generate utility classes from design tokens:

```css
/* Generated from design tokens */
.text-primary-500 { color: theme('colors.primary.500'); }
.bg-primary-500 { background-color: theme('colors.primary.500'); }
.border-primary-500 { border-color: theme('colors.primary.500'); }

/* Semantic utilities */
.btn-primary { 
  @apply bg-primary-600 text-white hover:bg-primary-700;
}
```

### Component Theming

```css
/* Component-specific theming */
.card {
  background-color: var(--card-background, theme('colors.white'));
  border: 1px solid var(--card-border, theme('colors.neutral.200'));
  border-radius: var(--card-radius, theme('borderRadius.lg'));
}

.card:hover {
  box-shadow: var(--card-hover-shadow, theme('boxShadow.md'));
}
```

## Responsive Theming

### Breakpoint-Specific Themes

```typescript
const responsiveTheme = {
  mobile: {
    fontSize: {
      h1: '2rem',
      body: '0.875rem',
    },
    spacing: {
      container: '1rem',
    },
  },
  desktop: {
    fontSize: {
      h1: '3rem', 
      body: '1rem',
    },
    spacing: {
      container: '2rem',
    },
  },
};
```

### Container Queries

```css
/* Modern responsive theming */
@container (min-width: 400px) {
  .card {
    padding: theme('spacing.lg');
  }
}

@container (min-width: 600px) {
  .card {
    padding: theme('spacing.xl');
  }
}
```

## Performance Considerations

### CSS-in-JS Optimization

- Use CSS Modules for static styles
- Reserve CSS-in-JS for truly dynamic theming
- Minimize runtime style calculations

### Theme Switching Performance

```typescript
// Debounced theme updates
const debouncedUpdateTheme = useMemo(
  () => debounce((config: ThemeConfig) => {
    updateTheme(config);
  }, 100),
  [updateTheme]
);
```

### Preload Theme Assets

```typescript
// Preload brand fonts
useEffect(() => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = `https://fonts.googleapis.com/css2?family=${brandConfig.fontFamily}`;
  link.as = 'style';
  document.head.appendChild(link);
}, [brandConfig.fontFamily]);
```

## Best Practices

### Design Token Naming

- Use semantic names over descriptive names
- Maintain consistent naming conventions
- Document token purposes and usage

```typescript
// Good: Semantic naming
colors: {
  primary: '#3b82f6',      // Main brand color
  danger: '#ef4444',       // Destructive actions
  success: '#22c55e',      // Positive feedback
}

// Avoid: Descriptive naming  
colors: {
  blue: '#3b82f6',         // What if brand changes?
  red: '#ef4444',          // Not semantic
  green: '#22c55e',        // Limits usage
}
```

### Theme Validation

```typescript
import { z } from 'zod';

const ThemeConfigSchema = z.object({
  colors: z.object({
    primary: z.string().regex(/^#[0-9a-f]{6}$/i),
    secondary: z.string().regex(/^#[0-9a-f]{6}$/i),
    accent: z.string().regex(/^#[0-9a-f]{6}$/i),
  }),
  typography: z.object({
    fontFamily: z.string(),
  }),
});

// Validate theme before applying
const validateAndApplyTheme = (config: unknown) => {
  const validConfig = ThemeConfigSchema.parse(config);
  updateTheme(validConfig);
};
```

### Performance Monitoring

```typescript
// Monitor theme switch performance
const measureThemeSwitch = (themeName: string) => {
  performance.mark('theme-switch-start');
  
  updateTheme(newTheme);
  
  requestAnimationFrame(() => {
    performance.mark('theme-switch-end');
    performance.measure('theme-switch', 'theme-switch-start', 'theme-switch-end');
    
    const measure = performance.getEntriesByName('theme-switch')[0];
    console.log(`Theme switch to ${themeName}: ${measure.duration}ms`);
  });
};
```

This theming system provides the flexibility needed for white-label applications while maintaining performance and accessibility standards.