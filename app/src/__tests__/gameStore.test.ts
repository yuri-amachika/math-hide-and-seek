import { describe, expect, it } from 'vitest';
import { act } from '@testing-library/react';
import { useGameStore } from '../store/useGameStore';

const resetStore = () => {
  const { snapshot, resetActive } = useGameStore.getState();
  const current = snapshot();
  if (current.activeCellId !== null) {
    act(() => {
      resetActive();
    });
  }
};

describe('useGameStore', () => {
  it('locks and unlocks when selecting and marking cells', () => {
    resetStore();
    const { selectCell, markResult, cells } = useGameStore.getState();

    act(() => selectCell(cells[0].id));
    expect(useGameStore.getState().isLocked).toBe(true);

    act(() => markResult('correct'));
    expect(useGameStore.getState().isLocked).toBe(false);
    expect(useGameStore.getState().completedCells).toBeGreaterThan(0);
  });
});
