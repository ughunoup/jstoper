import type { RenderResult } from "@testing-library/svelte";
import { act, fireEvent, render, screen } from "@testing-library/svelte";
import Counter from './Counter.svelte';
import { vi } from 'vitest'

const timerValues = () => {
  const minutes = screen.getByTestId('minutes').innerHTML;
  const seconds = screen.getByTestId('seconds').innerHTML;
  return [minutes, seconds];
};
describe('Counter', () => {
  let counter: RenderResult<Counter>;
  beforeEach(() => {
    vi.useFakeTimers();
    counter = render(Counter, {props: {
        refreshRateInMs: 1000
    }});
  })

  it('should show time 00:00:000 and start / stop buttons by default', async () => {
    const timer = screen.getByTestId('timer');
    expect(timer).toBeInTheDocument()
    expect(screen.getByText('Start')).toBeInTheDocument()
    await fireEvent.click(screen.getByText('Start'))
    expect(screen.getByText('Stop')).toBeInTheDocument()
  });


  it('should increase the counter after clicking start', async () => {
    await fireEvent.click(screen.getByText('Start'))

    await act(() => vi.advanceTimersByTime(5200));

    const [minutes, seconds] = timerValues();
    const s = parseInt(seconds);
    expect(s).toEqual(5);
    expect(parseInt(minutes)).toEqual(0);
  });

  it('should stop increasing time when "stop" is clicked', async () => {
    await fireEvent.click(screen.getByText('Start'))

    await act(() => {
      vi.advanceTimersByTime(1200);
    })
    const [, sBefore] = timerValues();
    const msB = parseInt(sBefore);

    await fireEvent.click(screen.getByText('Stop'))

    await act(() => {
      vi.advanceTimersByTime(1200);
    })

    const [, sAfter] = timerValues();
    const msA = parseInt(sAfter);
    expect(msA).toEqual(msB);
  });

  it('should be able to create rounds to split the timer into rounds', async () => {
    await fireEvent.click(screen.getByText('Start'));
    await fireEvent.click(screen.getByTestId('round-button'));

    expect(screen.getByTestId('ranges').children).toHaveLength(3);
  });

  it('should show hours when stoper have more than 60 minutes', async () => {
    await fireEvent.click(screen.getByText('Start'));

    await act(() => {
      vi.advanceTimersByTime(1000 * 60 * 60  + 50);
    })

    expect(screen.getByText('HOURS')).toBeInTheDocument()
  });
});
