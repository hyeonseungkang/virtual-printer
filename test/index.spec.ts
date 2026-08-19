import { Printer, HandledJob } from '../src';

describe('virtual-printer exports', () => {
  it('should export Printer and HandledJob classes', () => {
    expect(Printer).toBeDefined();
    expect(HandledJob).toBeDefined();
  });
});
