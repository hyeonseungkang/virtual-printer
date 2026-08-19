import { Printer } from '../src';
import * as ipp from 'ipp';

describe('Server Integration (IPP Protocol over HTTP)', () => {
  let printer: Printer;

  beforeEach(() => {
    printer = new Printer({
      bonjour: false,
      serverUrl: new URL('http://127.0.0.1:4005'),
    });
  });

  afterEach(async () => {
    await printer.server.close();
  });

  it('should handle Print-Job POST request and emit data event', async () => {
    const documentContent = Buffer.from('%PDF-1.4 test print data');
    const ippRequest = ipp.serialize({
      version: '1.0',
      operation: 'Print-Job',
      id: 1,
      'operation-attributes-tag': {
        'attributes-charset': 'utf-8',
        'attributes-natural-language': 'en-us',
        'printer-uri': 'ipp://127.0.0.1:4005/printer',
        'requesting-user-name': 'alice',
        'job-name': 'invoice.pdf',
        'document-format': 'application/pdf',
      },
      data: documentContent,
    });

    let eventEmitted = false;
    printer.on('data', (handledJob, data) => {
      eventEmitted = true;
      expect(handledJob['job-id']).toBe(1);
      expect(handledJob['job-name']).toBe('invoice.pdf');
      expect(handledJob['job-originating-user-name']).toBe('alice');
      expect(data).toEqual(documentContent);
    });

    const response = await printer.server.inject({
      method: 'POST',
      url: '/printer',
      headers: {
        'content-type': 'application/ipp',
      },
      payload: ippRequest,
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe('application/ipp');
    expect(eventEmitted).toBe(true);

    const parsedResponse = ipp.parse(response.rawPayload) as Record<
      string,
      any
    >;
    expect(parsedResponse.statusCode).toBe('successful-ok');
    expect(parsedResponse.id).toBe(1);
    expect(parsedResponse['job-attributes-tag']['job-id']).toBe(1);
    expect(parsedResponse['job-attributes-tag']['job-state']).toBe('completed');
  });

  it('should handle Get-Printer-Attributes request', async () => {
    const ippRequest = ipp.serialize({
      version: '1.0',
      operation: 'Get-Printer-Attributes',
      id: 2,
      'operation-attributes-tag': {
        'attributes-charset': 'utf-8',
        'attributes-natural-language': 'en-us',
        'printer-uri': 'ipp://127.0.0.1:4005/printer',
      },
    });

    const response = await printer.server.inject({
      method: 'POST',
      url: '/printer',
      headers: {
        'content-type': 'application/ipp',
      },
      payload: ippRequest,
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe('application/ipp');

    const parsedResponse = ipp.parse(response.rawPayload) as Record<
      string,
      any
    >;
    expect(parsedResponse.statusCode).toBe('successful-ok');
    expect(parsedResponse.id).toBe(2);
    expect(
      parsedResponse['printer-attributes-tag']['printer-name'],
    ).toBeDefined();
    expect(
      parsedResponse['printer-attributes-tag']['document-format-supported'],
    ).toBe('application/pdf');
  });

  it('should handle Validate-Job request', async () => {
    const ippRequest = ipp.serialize({
      version: '1.0',
      operation: 'Validate-Job',
      id: 3,
      'operation-attributes-tag': {
        'attributes-charset': 'utf-8',
        'attributes-natural-language': 'en-us',
        'printer-uri': 'ipp://127.0.0.1:4005/printer',
      },
    });

    const response = await printer.server.inject({
      method: 'POST',
      url: '/printer',
      headers: {
        'content-type': 'application/ipp',
      },
      payload: ippRequest,
    });

    expect(response.statusCode).toBe(200);
    const parsedResponse = ipp.parse(response.rawPayload);
    expect(parsedResponse.statusCode).toBe('successful-ok');
    expect(parsedResponse.id).toBe(3);
  });

  it('should handle Get-Jobs request', async () => {
    const ippRequest = ipp.serialize({
      version: '1.0',
      operation: 'Get-Jobs',
      id: 4,
      'operation-attributes-tag': {
        'attributes-charset': 'utf-8',
        'attributes-natural-language': 'en-us',
        'printer-uri': 'ipp://127.0.0.1:4005/printer',
      },
    });

    const response = await printer.server.inject({
      method: 'POST',
      url: '/printer',
      headers: {
        'content-type': 'application/ipp',
      },
      payload: ippRequest,
    });

    expect(response.statusCode).toBe(200);
    const parsedResponse = ipp.parse(response.rawPayload);
    expect(parsedResponse.statusCode).toBe('successful-ok');
    expect(parsedResponse.id).toBe(4);
  });

  it('should return server-error-operation-not-supported for unknown operation', async () => {
    const ippRequest = ipp.serialize({
      version: '1.0',
      operation: 'Purge-Jobs' as any,
      id: 5,
      'operation-attributes-tag': {
        'attributes-charset': 'utf-8',
        'attributes-natural-language': 'en-us',
        'printer-uri': 'ipp://127.0.0.1:4005/printer',
      },
    });

    const response = await printer.server.inject({
      method: 'POST',
      url: '/printer',
      headers: {
        'content-type': 'application/ipp',
      },
      payload: ippRequest,
    });

    expect(response.statusCode).toBe(200);
    const parsedResponse = ipp.parse(response.rawPayload);
    expect(parsedResponse.statusCode).toBe(
      'server-error-operation-not-supported',
    );
    expect(parsedResponse.id).toBe(5);
  });
});
