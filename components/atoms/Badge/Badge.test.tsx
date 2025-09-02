import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Badge } from './Badge';
import { Star } from 'lucide-react';

describe('Badge', () => {
  it('renders correctly with default props', () => {
    render(<Badge>Test Badge</Badge>);
    const badge = screen.getByText('Test Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge', 'default', 'md');
  });

  it('applies the correct variant class', () => {
    render(<Badge variant="primary">Primary Badge</Badge>);
    const badge = screen.getByText('Primary Badge');
    expect(badge).toHaveClass('primary');
  });

  it('applies the correct size class', () => {
    render(<Badge size="lg">Large Badge</Badge>);
    const badge = screen.getByText('Large Badge');
    expect(badge).toHaveClass('lg');
  });

  it('renders icon correctly', () => {
    render(<Badge icon={<Star data-testid="star-icon" />}>With Icon</Badge>);
    const icon = screen.getByTestId('star-icon');
    expect(icon).toBeInTheDocument();
    expect(icon.closest('span')).toHaveAttribute('aria-hidden', 'true');
  });

  it('supports custom className', () => {
    render(<Badge className="custom-class">Custom</Badge>);
    const badge = screen.getByText('Custom');
    expect(badge).toHaveClass('custom-class');
  });

  it('passes through HTML attributes', () => {
    render(<Badge data-testid="badge" title="Tooltip">Badge</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveAttribute('title', 'Tooltip');
  });

  it('has proper semantic structure', () => {
    render(<Badge>Semantic Badge</Badge>);
    const badge = screen.getByText('Semantic Badge');
    expect(badge.tagName).toBe('SPAN');
  });
});