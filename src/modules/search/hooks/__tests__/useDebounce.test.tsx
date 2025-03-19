import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';
import { afterEach } from 'node:test';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return the initial value immediately', () => {
    const initialValue = 'initial';
    const { result } = renderHook(() => useDebounce(initialValue, 500));
    
    expect(result.current).toBe(initialValue);
  });

  it('should not update the value before the delay period', () => {
    const initialValue = 'initial';
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: initialValue, delay: 500 } }
    );
    
    // Change the value
    rerender({ value: 'updated', delay: 500 });
    
    // Advance time but not enough to trigger the update
    act(() => {
      vi.advanceTimersByTime(400);
    });
    
    // Value should still be the initial value
    expect(result.current).toBe(initialValue);
  });

  it('should update the value after the delay period', () => {
    const initialValue = 'initial';
    const updatedValue = 'updated';
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: initialValue, delay: 500 } }
    );
    
    // Change the value
    rerender({ value: updatedValue, delay: 500 });
    
    // Advance time enough to trigger the update
    act(() => {
      vi.advanceTimersByTime(500);
    });
    
    // Value should be updated
    expect(result.current).toBe(updatedValue);
  });

  it('should handle multiple value changes within the delay period', () => {
    const initialValue = 'initial';
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: initialValue, delay: 500 } }
    );
    
    // Change the value multiple times
    rerender({ value: 'intermediate1', delay: 500 });
    
    act(() => {
      vi.advanceTimersByTime(200);
    });
    
    rerender({ value: 'intermediate2', delay: 500 });
    
    act(() => {
      vi.advanceTimersByTime(200);
    });
    
    rerender({ value: 'final', delay: 500 });
    
    // Value should still be the initial value
    expect(result.current).toBe(initialValue);
    
    // Advance time enough to trigger the update
    act(() => {
      vi.advanceTimersByTime(500);
    });
    
    // Value should be the final value
    expect(result.current).toBe('final');
  });

  it('should handle delay changes', () => {
    const initialValue = 'initial';
    const updatedValue = 'updated';
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: initialValue, delay: 1000 } }
    );
    
    // Change the value and reduce the delay
    rerender({ value: updatedValue, delay: 300 });
    
    // Advance time enough for the new delay
    act(() => {
      vi.advanceTimersByTime(300);
    });
    
    // Value should be updated
    expect(result.current).toBe(updatedValue);
  });

  it('should clear timeout on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    
    const { unmount } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'test', delay: 500 } }
    );
    
    unmount();
    
    // Cleanup function should have been called
    expect(clearTimeoutSpy).toHaveBeenCalled();
    
    clearTimeoutSpy.mockRestore();
  });
});