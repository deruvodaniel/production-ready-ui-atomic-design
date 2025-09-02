<<<<<<< HEAD
# Production-Ready UI Starter

A comprehensive Next.js starter template built with atomic design principles, accessibility compliance, and white-label theming capabilities. Perfect for enterprise-level applications that require scalability, maintainability, and professional polish.

## 🚀 Features

### Architecture & Framework
- **Next.js 13** with App Router and React Server Components
- **TypeScript** with strict type checking and comprehensive interfaces
- **Atomic Design** component organization (Atoms → Molecules → Organisms → Templates → Pages)
- **CSS Modules** with design token system for scoped, maintainable styles

### Accessibility & Standards
- **WCAG 2.1 AA compliant** components with semantic HTML
- **Full keyboard navigation** support with proper focus management
- **ARIA attributes** and screen reader optimization
- **Color contrast** compliance and reduced motion preferences

### White-Label Theming
- **Design token system** with customizable colors, typography, and spacing
- **Real-time theme switching** with three configurable brand colors
- **Dark mode support** with system preference detection
- **CSS custom properties** for dynamic theming

### Developer Experience
- **Storybook** with A11y addon and responsive testing
- **Jest + React Testing Library** for comprehensive testing
- **ESLint + Prettier** with enterprise-grade rules
- **Husky + lint-staged** for pre-commit quality checks

### Performance & Production
- **SSR/SSG** optimization for Next.js
- **Component lazy loading** and code splitting
- **SEO optimization** with meta tags and Open Graph
- **Responsive design** with mobile-first approach

## 📦 Quick Start

### Prerequisites
- Node.js 18+ 
- Yarn 4.0+

### Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Run Storybook
yarn storybook

# Run tests
yarn test

# Build for production
yarn build
```

## 🏗️ Project Structure

```
├── app/                          # Next.js App Router pages
├── components/                   # Atomic Design components
│   ├── atoms/                   # Basic building blocks
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Typography/
│   ├── molecules/               # Simple combinations
│   │   ├── Card/
│   │   └── FormField/
│   ├── organisms/               # Complex UI sections
│   │   └── Header/
│   ├── templates/               # Page-level layouts
│   │   └── PageLayout/
│   └── ui/                      # Shadcn/ui components
├── design-tokens/               # Design system tokens
├── theme/                       # Theme provider and configuration
├── lib/                         # Shared utilities
├── hooks/                       # Custom React hooks
└── .storybook/                  # Storybook configuration
```

## 🎨 White-Label Theming

### Quick Theme Setup

The starter supports easy branding through the theme provider:

```typescript
// In your app or component
import { useTheme } from '@/theme/theme-provider';

const { updateTheme } = useTheme();

// Update brand colors
updateTheme({
  colors: {
    primary: '#your-primary-color',
    secondary: '#your-secondary-color', 
    accent: '#your-accent-color',
  }
});
```

### Design Tokens

All design decisions are centralized in `design-tokens/tokens.ts`:

```typescript
export const customTokens: DesignTokens = {
  colors: {
    primary: {
      500: '#your-brand-color',
      // ... full color scale
    },
    // ... other color ramps
  },
  typography: {
    fontFamily: {
      sans: ['Your Brand Font', 'Inter', 'sans-serif'],
    },
  },
  // ... spacing, breakpoints, etc.
};
```

### CSS Custom Properties

For runtime theming, CSS custom properties are automatically applied:

```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #14b8a6;
  --color-accent: #f97316;
}
```

## 🧪 Component Development

### Creating New Components

Follow the atomic design principles:

1. **Atoms** - Basic elements (buttons, inputs, typography)
2. **Molecules** - Simple combinations (form fields, cards)
3. **Organisms** - Complex sections (headers, forms, lists)
4. **Templates** - Page layouts
5. **Pages** - Specific instances

### Component Template

```typescript
// components/atoms/NewComponent/NewComponent.tsx
'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import styles from './NewComponent.module.css';

const componentVariants = cva(styles.base, {
  variants: {
    variant: {
      default: styles.default,
      // ... other variants
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface NewComponentProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  children: React.ReactNode;
}

export const NewComponent = React.forwardRef<HTMLDivElement, NewComponentProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NewComponent.displayName = 'NewComponent';
```

### Required Files for Each Component

1. **Component file** - `ComponentName.tsx`
2. **Styles** - `ComponentName.module.css`
3. **Stories** - `ComponentName.stories.tsx`
4. **Tests** - `ComponentName.test.tsx`

## 🧪 Testing

### Running Tests

```bash
# Run all tests
yarn test

# Watch mode
yarn test:watch

# Coverage report
yarn test:coverage
```

### Test Structure

Each component should include:
- **Rendering tests** - Verify component renders correctly
- **Interaction tests** - Test user interactions
- **Accessibility tests** - Ensure ARIA attributes and keyboard navigation
- **Variant tests** - Test all component variants

## 📚 Storybook

### Development

```bash
# Start Storybook
yarn storybook

# Build Storybook
yarn build-storybook
```

### Story Template

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Atoms/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Example content',
  },
};
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

### Theme Configuration

Update `theme/theme-provider.tsx` for default brand colors:

```typescript
const [config, setConfig] = useState<ThemeConfig>({
  colors: {
    primary: '#your-primary',
    secondary: '#your-secondary', 
    accent: '#your-accent',
  },
  typography: {
    fontFamily: 'Your Brand Font',
  },
});
```

## 🎯 Accessibility Guidelines

### Requirements Met
- ✅ Semantic HTML structure
- ✅ ARIA labels and descriptions
- ✅ Keyboard navigation (Tab, Enter, Escape, Arrow keys)
- ✅ Focus management and visible focus indicators
- ✅ Color contrast compliance (4.5:1 minimum)
- ✅ Screen reader optimization
- ✅ Reduced motion preferences

### Testing Accessibility

```bash
# Run accessibility tests in Storybook
yarn storybook
# Navigate to any story and check the A11y panel
```

## 🚀 Deployment

### Build Commands

```bash
# Production build
yarn build

# Start production server
yarn start

# Static export (for CDN deployment)
yarn build && yarn export
```

### Deployment Platforms

The starter is optimized for:
- **Vercel** (recommended for Next.js)
- **Netlify** (with static export)
- **AWS Amplify**
- **Docker** containers

## 📋 Code Quality

### Pre-commit Hooks

Automatically run on each commit:
- ESLint with auto-fix
- Prettier formatting
- TypeScript type checking
- Test execution

### ESLint Rules

Enterprise-grade rules including:
- TypeScript strict checking
- React best practices
- Accessibility rules (jsx-a11y)
- Import organization
- Code complexity limits

## 🛠️ Customization Guide

### Adding New Brand Colors

1. Update design tokens in `design-tokens/tokens.ts`
2. Add corresponding CSS classes in component modules
3. Update the theme provider configuration
4. Test in Storybook with new color variants

### Creating Component Variants

1. Add variant to `componentVariants` using CVA
2. Create corresponding CSS classes
3. Update TypeScript interfaces
4. Add Storybook stories for new variants
5. Write tests for variant behavior

### Responsive Breakpoints

Customize breakpoints in `design-tokens/tokens.ts`:

```typescript
breakpoints: {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet portrait
  lg: '1024px',  // Tablet landscape
  xl: '1280px',  // Desktop
  '2xl': '1536px', // Large desktop
}
```

## 📖 Component API Reference

### Button
- **Variants**: primary, secondary, outline, ghost, destructive
- **Sizes**: sm, md, lg, xl
- **Props**: loading, leftIcon, rightIcon, disabled
- **Accessibility**: Full keyboard support, ARIA labels

### Input
- **Variants**: default, filled
- **States**: default, error, success
- **Props**: label, helperText, errorMessage, leftIcon, rightIcon
- **Accessibility**: Proper labeling, error announcements

### Typography
- **Variants**: h1-h6, body, caption, overline
- **Weights**: light, normal, medium, semibold, bold
- **Colors**: All semantic colors from design tokens
- **Accessibility**: Proper heading hierarchy, readable line heights

### Card
- **Variants**: default, outlined, elevated
- **Padding**: none, sm, md, lg
- **Props**: header, footer, interactive
- **Accessibility**: Proper focus management for interactive cards

## 🔄 Migration Guide

### From Other UI Libraries

1. **Audit existing components** for accessibility compliance
2. **Map design tokens** to match your current brand
3. **Replace components incrementally** following atomic design
4. **Test thoroughly** with automated accessibility checks

### Upgrading Dependencies

```bash
# Check for updates
yarn outdated

# Update specific packages
yarn upgrade package-name

# Update all dependencies
yarn upgrade
```

## 🐛 Troubleshooting

### Common Issues

**Build Errors**: Ensure all TypeScript types are properly defined
**Styling Issues**: Check CSS Module imports and class name conflicts
**Storybook Problems**: Verify addon configuration in `.storybook/main.ts`
**Test Failures**: Ensure proper mocking of Next.js components

### Performance Optimization

- Use `next/dynamic` for component lazy loading
- Implement proper image optimization with `next/image`
- Monitor bundle size with Next.js analyzer
- Use React.memo for expensive components

## 📞 Support

### Documentation
- Component API docs generated in Storybook
- TypeScript IntelliSense for all props
- Accessibility guidelines in component stories

### Contributing

1. Follow atomic design principles
2. Ensure accessibility compliance
3. Add comprehensive tests
4. Update Storybook stories
5. Document breaking changes

---

Built with ❤️ for enterprise-level applications requiring production-ready UI components with accessibility and theming at their core.
=======
# production-ready-ui-atomic-design
>>>>>>> 3222b4648ac21a8e7009806113e2a11edd2c13df
