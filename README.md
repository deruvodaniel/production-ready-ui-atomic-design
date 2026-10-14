# Production-Ready UI

A Next.js and TypeScript starter for building accessible, white-label product interfaces with atomic design, reusable design tokens and Storybook documentation.

[Live demo](https://production-ready-ui-atomic-design.vercel.app) · [Storybook](https://production-ready-ui-atomic-design.vercel.app/storybook)

## Why this project exists

Product teams often rebuild the same foundations: component APIs, theme configuration, accessibility behavior, documentation and quality checks. This starter packages those decisions into a reusable architecture that can be adapted to different brands without rewriting the component layer.

## Highlights

- Atomic component structure: atoms, molecules, organisms and templates.
- Centralized color, typography, spacing and breakpoint tokens.
- Runtime white-label theming through CSS custom properties and a React provider.
- Components designed around semantic HTML, keyboard use, focus management and reduced motion.
- Storybook stories for documentation, responsive review and accessibility checks.
- Jest and React Testing Library coverage for foundational components.
- Example product screens for admin, team and performance-review workflows.

## Architecture

```text
app/                 Next.js App Router pages and product examples
components/
  atoms/             Buttons, inputs, typography and status elements
  molecules/         Small reusable component compositions
  organisms/         Navigation, sidebars and complex product sections
  templates/         Page-level layout systems
design-tokens/       Typed design decisions
theme/               Runtime theme provider and brand configuration
.storybook/          Component documentation and review tooling
```

The component layer consumes semantic design tokens rather than page-specific values. A brand can change color, type and spacing decisions while component APIs remain stable.

## Stack

Next.js · React · TypeScript · CSS Modules · Radix UI · Storybook · Jest · React Testing Library

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run storybook       # component workshop
npm run test            # unit and component tests
npm run type-check      # TypeScript validation
npm run build           # production build
```

## Theming

Brand decisions are passed to the theme provider and exposed as CSS custom properties:

```tsx
const { updateTheme } = useTheme();

updateTheme({
  colors: {
    primary: '#3157ff',
    secondary: '#111111',
    accent: '#dfff00',
  },
});
```

## Component workflow

Every reusable component should include its implementation, scoped styles, Storybook story and focused tests. This keeps visual examples, behavior and documentation close to the source.

## Status

This is a portfolio starter and architecture reference. Before using it in a production product, update dependencies, run the full quality suite and validate the components against that product's accessibility requirements.
