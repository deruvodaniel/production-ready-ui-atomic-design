# Accessibility Guide

## WCAG 2.1 AA Compliance

This starter is built to meet WCAG 2.1 AA standards, ensuring your application is accessible to users with disabilities.

## Keyboard Navigation

### Navigation Patterns

All interactive elements support keyboard navigation:

- **Tab** - Move focus forward
- **Shift + Tab** - Move focus backward  
- **Enter/Space** - Activate buttons and links
- **Escape** - Close dialogs and dropdowns
- **Arrow Keys** - Navigate within components (menus, tabs)

### Focus Management

```typescript
// Example: Focus trap for modals
const focusTrap = {
  onKeyDown: (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      // Trap focus within modal
    }
    if (e.key === 'Escape') {
      // Close modal and return focus
    }
  }
};
```

## Screen Reader Support

### ARIA Implementation

#### Landmarks
- `role="banner"` - Site header
- `role="navigation"` - Navigation menus  
- `role="main"` - Main content area
- `role="contentinfo"` - Site footer

#### Interactive Elements
- `aria-label` - Accessible names
- `aria-describedby` - Additional descriptions
- `aria-expanded` - Expansion states
- `aria-invalid` - Form validation states

#### Live Regions
```typescript
<div aria-live="polite" aria-atomic="true">
  {/* Dynamic content updates */}
</div>
```

### Alternative Text

- **Decorative Images** - `alt=""` or `aria-hidden="true"`
- **Informative Images** - Descriptive alt text
- **Complex Images** - Extended descriptions via `aria-describedby`

## Color and Contrast

### Compliance Standards

- **Normal Text** - 4.5:1 contrast ratio minimum
- **Large Text** - 3:1 contrast ratio minimum (18px+ or 14px+ bold)
- **Interactive Elements** - 3:1 contrast for focus indicators

### Color System

All color combinations are tested for WCAG compliance:

```css
/* High contrast examples */
.primary-text { @apply text-primary-700 dark:text-primary-300; }
.muted-text { @apply text-neutral-600 dark:text-neutral-400; }
.error-text { @apply text-error-700 dark:text-error-300; }
```

### Color Independence

Information is never conveyed through color alone:
- Icons accompany color-coded states
- Text labels provide context
- Patterns or shapes differentiate elements

## Form Accessibility

### Labels and Descriptions

```typescript
<FormField
  label="Email Address"           // Visible label
  required                        // Required indicator
  helperText="We'll never share"  // Helper information
  errorMessage="Invalid email"    // Error description
  aria-describedby="email-help"   // Additional context
/>
```

### Validation

- **Real-time Validation** - Immediate feedback
- **Error Summarization** - Error list at form top
- **Success Confirmation** - Clear completion messages
- **Field Relationships** - Group related fields

## Component-Specific Guidelines

### Button Accessibility

```typescript
<Button
  aria-label="Save document"        // Descriptive label
  aria-describedby="save-help"      // Additional context
  disabled={isProcessing}           // State communication
  aria-pressed={isToggled}          // Toggle state
>
  {isLoading ? 'Saving...' : 'Save'}
</Button>
```

### Navigation Accessibility

```typescript
<nav role="navigation" aria-label="Main navigation">
  <ul>
    <li>
      <a 
        href="/dashboard"
        aria-current={pathname === '/dashboard' ? 'page' : undefined}
      >
        Dashboard
      </a>
    </li>
  </ul>
</nav>
```

### Modal Accessibility

```typescript
<Dialog
  aria-labelledby="modal-title"
  aria-describedby="modal-description"  
  onEscapeKeyDown={closeModal}
  onPointerDownOutside={closeModal}
>
  <Dialog.Title id="modal-title">
    Confirm Action
  </Dialog.Title>
  <Dialog.Description id="modal-description">
    This action cannot be undone.
  </Dialog.Description>
</Dialog>
```

## Testing Accessibility

### Automated Testing

```typescript
// Jest + React Testing Library
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('should not have accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Manual Testing

1. **Keyboard Only** - Navigate without mouse
2. **Screen Reader** - Test with NVDA, JAWS, or VoiceOver
3. **High Contrast** - Verify visibility in high contrast mode
4. **Zoom Testing** - Test at 200% zoom level

### Storybook A11y Addon

Each component story includes accessibility testing:
- Automated rule checking
- Manual testing guidelines
- Color contrast verification
- Keyboard navigation verification

## Common Accessibility Patterns

### Loading States

```typescript
<Button disabled={isLoading} aria-describedby="loading-status">
  {isLoading ? 'Processing...' : 'Submit'}
</Button>
<div id="loading-status" aria-live="polite" className="sr-only">
  {isLoading ? 'Form is being processed' : ''}
</div>
```

### Error Handling

```typescript
<Input
  aria-invalid={hasError}
  aria-describedby={hasError ? 'error-message' : 'helper-text'}
/>
{hasError && (
  <div id="error-message" role="alert" className="text-error-600">
    {errorMessage}
  </div>
)}
```

### Progressive Enhancement

- Core functionality works without JavaScript
- Enhanced interactions layer on top
- Graceful degradation for unsupported features

## Tools and Resources

### Browser Extensions
- **axe DevTools** - Automated accessibility scanning
- **WAVE** - Web accessibility evaluation
- **Lighthouse** - Performance and accessibility audit

### Screen Readers
- **NVDA** (Windows) - Free screen reader
- **VoiceOver** (Mac) - Built-in screen reader
- **ORCA** (Linux) - Open-source screen reader

### Testing Tools
- **jest-axe** - Automated accessibility testing
- **@testing-library/react** - Accessible testing utilities
- **Storybook A11y addon** - Interactive accessibility testing

## Compliance Checklist

### WCAG 2.1 AA Requirements

#### Perceivable
- ✅ Text alternatives for images
- ✅ Captions for media
- ✅ Sufficient color contrast
- ✅ Resize text up to 200%

#### Operable  
- ✅ Keyboard accessible
- ✅ No seizure-inducing content
- ✅ Users can navigate and find content
- ✅ Input modalities beyond keyboard

#### Understandable
- ✅ Text is readable and understandable
- ✅ Content appears and operates predictably
- ✅ Users are helped to avoid and correct mistakes

#### Robust
- ✅ Content can be interpreted by assistive technologies
- ✅ Content remains accessible as technologies advance

### Testing Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible and clear
- [ ] Color contrast meets 4.5:1 minimum ratio
- [ ] Form fields have proper labels and error messages
- [ ] Images have appropriate alternative text
- [ ] Headings follow logical hierarchy (h1-h6)
- [ ] Dynamic content updates are announced
- [ ] Modal focus is properly managed
- [ ] Error states are clearly communicated

## Implementation Examples

### Accessible Form

```typescript
<form onSubmit={handleSubmit} noValidate>
  <fieldset>
    <legend>Personal Information</legend>
    
    <FormField
      label="Full Name"
      required
      errorMessage={errors.name?.message}
      aria-describedby="name-help"
    />
    <div id="name-help" className="text-sm text-neutral-600">
      Enter your legal name as it appears on official documents
    </div>
    
    <FormField
      label="Email Address"
      type="email"
      required
      errorMessage={errors.email?.message}
    />
  </fieldset>
  
  <Button type="submit" disabled={isSubmitting}>
    {isSubmitting ? 'Creating Account...' : 'Create Account'}
  </Button>
</form>
```

### Accessible Navigation

```typescript
<nav role="navigation" aria-label="Main navigation">
  <ul className="flex space-x-4" role="list">
    {navigationItems.map((item) => (
      <li key={item.href} role="listitem">
        <a
          href={item.href}
          className="nav-link"
          aria-current={isCurrentPage(item.href) ? 'page' : undefined}
        >
          {item.label}
        </a>
      </li>
    ))}
  </ul>
</nav>
```

This accessibility implementation ensures your application serves all users effectively while maintaining excellent user experience standards.