import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  it('renders correctly with default props', () => {
    render(<SearchInput />);
    const searchInput = screen.getByLabelText('Search input');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('type', 'search');
  });

  it('displays placeholder text', () => {
    render(<SearchInput placeholder="Search products..." />);
    const input = screen.getByPlaceholderText('Search products...');
    expect(input).toBeInTheDocument();
  });

  it('shows clear button when there is text', () => {
    render(<SearchInput value="test query" />);
    const clearButton = screen.getByLabelText('Clear search');
    expect(clearButton).toBeInTheDocument();
  });

  it('hides clear button when input is empty', () => {
    render(<SearchInput value="" />);
    const clearButton = screen.queryByLabelText('Clear search');
    expect(clearButton).not.toBeInTheDocument();
  });

  it('calls onSearch when form is submitted', () => {
    const handleSearch = jest.fn();
    render(<SearchInput value="test query" onSearch={handleSearch} />);

    const form = screen.getByRole('search');
    fireEvent.submit(form);

    expect(handleSearch).toHaveBeenCalledWith('test query');
  });

  it('calls onClear when clear button is clicked', () => {
    const handleClear = jest.fn();
    render(<SearchInput value="test query" onClear={handleClear} />);

    const clearButton = screen.getByLabelText('Clear search');
    fireEvent.click(clearButton);

    expect(handleClear).toHaveBeenCalled();
  });

  it('clears input on Escape key', () => {
    const handleClear = jest.fn();
    render(<SearchInput value="test query" onClear={handleClear} />);

    const input = screen.getByLabelText('Search input');
    fireEvent.keyDown(input, { key: 'Escape' });

    expect(handleClear).toHaveBeenCalled();
  });

  it('shows search button when there is text', () => {
    render(<SearchInput value="test query" />);
    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeInTheDocument();
  });

  it('disables search button when input is empty', () => {
    render(<SearchInput value="" />);
    const searchButton = screen.queryByRole('button', { name: /search/i });
    expect(searchButton).not.toBeInTheDocument();
  });

  it('shows loading state correctly', () => {
    render(<SearchInput value="test" loading />);
    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeDisabled();
  });

  it('supports controlled input', () => {
    const handleSearch = jest.fn();
    render(<SearchInput value="controlled" onSearch={handleSearch} />);

    const input = screen.getByDisplayValue('controlled');
    expect(input).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<SearchInput />);
    const form = screen.getByRole('search');
    const input = screen.getByLabelText('Search input');

    expect(form).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-label', 'Search input');
    expect(input).toHaveAttribute('autoComplete', 'off');
  });
});
