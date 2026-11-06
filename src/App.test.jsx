import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import App from './App.jsx';

const sample = [
  { id: 1, date: '2026-11-14', time: '09:00', field: 'Field 1', home: 'Canyon Hawks', away: 'Mesa Rockets', cancelled: false },
  { id: 2, date: '2026-11-14', time: '10:30', field: 'Field 2', home: 'Red Rock United', away: 'Flat Iron FC', cancelled: false },
];

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve(sample),
  })));
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('schedule app', () => {
  it('renders the schedule heading', async () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /wasatch front fall sports schedule/i })).toBeInTheDocument();
    await screen.findByRole('button', { name: /cancel canyon hawks vs mesa rockets/i });
  });

  it('shows one card per game in the schedule', async () => {
    render(<App />);
    await screen.findByRole('button', { name: /cancel canyon hawks vs mesa rockets/i });
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('shows the build stamp', () => {
    render(<App />);
    expect(screen.getByText(/build local/i)).toBeInTheDocument();
  });

  it('filters the list by field', async () => {
    render(<App />);
    await screen.findByRole('button', { name: /cancel canyon hawks vs mesa rockets/i });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Field 2' } });
    expect(screen.getByText((_, element) => element.classList.contains('game-count')))
      .toHaveTextContent('1 game shown');
    expect(screen.queryByText('Canyon Hawks')).not.toBeInTheDocument();
  });

  it('cancels a game and can reinstate it', async () => {
    render(<App />);
    await screen.findByRole('button', { name: /cancel canyon hawks vs mesa rockets/i });
    fireEvent.click(screen.getByRole('button', { name: /cancel canyon hawks vs mesa rockets/i }));
    expect(screen.getByRole('button', { name: /reinstate canyon hawks vs mesa rockets/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /reinstate canyon hawks vs mesa rockets/i }));
    expect(screen.getByRole('button', { name: /cancel canyon hawks vs mesa rockets/i })).toBeInTheDocument();
  });
});
