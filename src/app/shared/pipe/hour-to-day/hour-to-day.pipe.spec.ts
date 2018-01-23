import { HourToDayPipe } from './hour-to-day.pipe';

describe('HourToDayPipe', () => {
  it('create an instance', () => {
    const pipe = new HourToDayPipe();
    expect(pipe).toBeTruthy();
  });
});
