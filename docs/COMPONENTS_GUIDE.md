# Component Development Guide

This project follows Atomic Design (Atoms → Molecules → Organisms → Templates → Pages). Build components to be accessible, theme-aware, and performant.

## Principles
- Accessibility first: semantic HTML, keyboard navigation, ARIA, visible focus.
- Theme-aware: use CSS variables and tokens (e.g., `--color-*`, `--font-*`, `--spacing-*`). Avoid hard-coded colors and fonts.
- Composition over inheritance: accept `className`, forward refs, expose minimal variants with CVA.
- Performance: avoid unnecessary re-renders, keep components pure, lazy-load heavy parts.

## Folder Structure
- `components/atoms/Button/Button.tsx` (component)
- `components/atoms/Button/Button.module.css` (scoped styles)
- `components/atoms/Button/Button.stories.tsx` (storybook)
- `components/atoms/Button/Button.test.tsx` (tests, optional)

## Styling
- Prefer CSS Modules with design tokens; avoid inline styles except dynamic cases.
- Support dark mode via `.dark` selectors or token-based colors.
- Use utility classes via `@apply` when helpful.

## Variants
- Use `class-variance-authority` (CVA) for variants and sizes.
- Export TypeScript types with `VariantProps<typeof cvaInstance>`.

## Accessibility Checklist
- Choose the correct element (`button`, `a`, `label`, `input`, etc.).
- Label controls (`htmlFor`, `aria-label`) and set roles when needed.
- Manage focus states (`:focus-visible`) and keyboard interactions.
- Maintain color contrast (≥ 4.5:1 for text).

## Theming
- Read theme via CSS variables set by `ThemeProvider` (see `theme/theme-provider.tsx`).
- Never hardcode brand colors; use tokens like `rgb(var(--color-primary-600))`.
- Fonts come from `--font-sans`, `--font-display`, etc.

## Adding a New Component
1. Create the folder under the proper atomic level.
2. Implement the component with props, ref forwarding, and CVA if needed.
3. Add CSS Module using tokens and dark-mode selectors.
4. Add Storybook stories demonstrating usage and a11y interactions.
5. Add tests (rendering, interactions, a11y) when appropriate.

## Responsive Patterns
- Prefer mobile-first. For complex tables, use card layouts on small screens (see `ResponsiveTable`).

## Storybook
- Run `yarn storybook` to open the design system.
- Add stories next to the component with `.stories.tsx`.

## Improvements
- Add visual regression tests (Storybook + Chromatic).
- Add a11y automated checks in CI.
- Introduce ESLint rules for a11y and import order across the repo.
- Consider code-splitting and lazy imports for large organisms.
