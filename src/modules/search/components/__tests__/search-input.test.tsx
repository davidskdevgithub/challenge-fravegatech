import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchInput } from '../search-input';

describe('SearchInput', () => {
  it('renders with default placeholder', () => {
    const mockOnChange = vi.fn();
    
    render(<SearchInput value="" onChange={mockOnChange} />);
    
    const inputElement = screen.getByTestId('search-input');
    expect(inputElement).toBeDefined();
    expect(inputElement.getAttribute('placeholder')).toBe('Search...');
  });
  
  it('renders with custom placeholder', () => {
    const mockOnChange = vi.fn();
    const customPlaceholder = 'Find users...';
    
    render(<SearchInput value="" onChange={mockOnChange} placeholder={customPlaceholder} />);
    
    const inputElement = screen.getByTestId('search-input');
    expect(inputElement.getAttribute('placeholder')).toBe(customPlaceholder);
  });
  
  it('displays the provided value', () => {
    const mockOnChange = vi.fn();
    const testValue = 'test query';
    
    render(<SearchInput value={testValue} onChange={mockOnChange} />);
    
    const inputElement = screen.getByTestId('search-input');
    expect(inputElement.getAttribute('value')).toBe(testValue);
  });
  
  it('calls onChange handler when input changes', () => {
    const mockOnChange = vi.fn();
    
    render(<SearchInput value="" onChange={mockOnChange} />);
    
    const inputElement = screen.getByTestId('search-input');
    const testValue = 'new search';
    
    fireEvent.change(inputElement, { target: { value: testValue } });
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(testValue);
  });
});