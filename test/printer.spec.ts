import { Printer } from '../src';

describe('Printer', () => {
  let printer: Printer;

  afterEach(async () => {
    if (printer) {
      await printer.server.close();
    }
  });

  it('should initialize with default options when no options are provided', () => {
    printer = new Printer({
      bonjour: false,
      serverUrl: new URL('http://127.0.0.1:4002'),
    });

    expect(printer.printerOption.name).toBe('Printer');
    expect(printer.printerOption.description).toBe(
      'IPP Printer created by NodeJS',
    );
    expect(printer.printerOption.format).toEqual(['application/pdf']);
    expect(printer.handledJobs).toEqual([]);
    expect(printer.startedAt).toBeInstanceOf(Date);
    expect(printer.server).toBeDefined();
  });

  it('should merge custom options overriding defaults', () => {
    printer = new Printer({
      bonjour: false,
      name: 'Custom Office Printer',
      description: 'Custom Description',
      location: 'Building 1',
      format: ['application/pdf', 'application/postscript'],
      serverUrl: new URL('http://127.0.0.1:4003'),
      printerUriSupported: new URL('ipp://127.0.0.1:4003/printers/custom'),
    });

    expect(printer.printerOption.name).toBe('Custom Office Printer');
    expect(printer.printerOption.description).toBe('Custom Description');
    expect(printer.printerOption.location).toBe('Building 1');
    expect(printer.printerOption.format).toEqual([
      'application/pdf',
      'application/postscript',
    ]);
  });

  it('should default port to 3000 if not specified in serverUrl', () => {
    printer = new Printer({
      bonjour: false,
      serverUrl: new URL('http://localhost'),
    });

    expect((printer.printerOption.serverUrl as URL).port).toBe('3000');
  });

  it('should support string socket path as serverUrl', (done) => {
    const socketPath = `/tmp/virtual-printer-${Date.now()}.sock`;
    printer = new Printer({
      bonjour: false,
      serverUrl: socketPath,
    });

    printer.on('server-opened', (error) => {
      expect(error).toBeNull();
      done();
    });
  });
});
