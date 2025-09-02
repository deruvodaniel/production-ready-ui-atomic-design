import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from './Input';
import { Search } from 'lucide-react';

describe('Input', () => {
  it('renders correctly with default props', () => {
    render(<Input placeholder="Test input" />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Test input');
  });

  it('renders label when provided', () => {
    render(<Input label="Email Address" />);
    const label = screen.getByText('Email Address');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for');
  });

  it('shows required indicator when required', () => {
    render(<Input label="Required Field" required />);
    const required = screen.getByText('*');
    expect(required).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(<Input helperText="This is helpful information" />);
    const helperText = screen.getByText('This is helpful information');
    expect(helperText).toBeInTheDocument();
  });

  it('displays error message and sets aria-invalid', () => {
    render(<Input errorMessage="This field is required" />);
    const input = screen.getByRole('textbox');
    const errorMessage = screen.getByRole('alert');
    
    expect(errorMessage).toHaveTextContent('This field is required');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('renders icons correctly', () => {
    render(<Input leftIcon={<Search data-testid="search-icon" />} />);
    const icon = screen.getByTestId('search-icon');
    expect(icon).toBeInTheDocument();
  });

  it('handles user input', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: 'test input' } });
    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue('test input');
  });

  it('supports keyboard navigation', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    
    input.focus();
    expect(input).toHaveFocus();
  });

  it('applies disabled state correctly', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });
});