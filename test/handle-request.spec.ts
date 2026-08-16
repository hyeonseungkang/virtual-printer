import {
  printJob,
  getPrinterAttributes,
  validateJob,
  getJobs,
} from '../src/server/handle-request';
import { Printer } from '../src';
import { ParsedBodyInterface } from '../src/server/interfaces/parsed-body';
import { FastifyRequest } from 'fastify';
import * as ipp from 'ipp';

describe('handle-request', () => {
  let printer: Printer;

  beforeEach(() => {
    printer = new Printer({
      bonjour: false,
      serverUrl: new URL('http://127.0.0.1:4001'),
    });
  });

  afterEach(async () => {
    await printer.server.close();
  });

  describe('printJob', () => {
    it('should process a Print-Job request, add to handledJobs, emit data event, and return IPP response', (done) => {
      const mockRequest = { url: '/printer' } as FastifyRequest;
      const pdfBuffer = Buffer.from('%PDF-1.4 test document');
      const parsedBody = {
        version: '1.0',
        operation: 'Print-Job' as any,
        id: 1234,
        'operation-attributes-tag': {
          'attributes-charset': 'utf-8',
          'attributes-natural-language': 'en-us',
          'printer-uri': 'http://127.0.0.1:4001/printer',
          'requesting-user-name': 'bob',
          'job-name': 'Test Print',
          'requested-attributes': [],
        },
        data: pdfBuffer,
      } as unknown as ParsedBodyInterface;

      printer.on('data', (handledJob, data, request) => {
        expect(handledJob['job-id']).toBe(1);
        expect(handledJob['job-name']).toBe('Test Print');
        expect(handledJob['job-originating-user-name']).toBe('bob');
        expect(data).toEqual(pdfBuffer);
        expect(request).toBe(mockRequest);
      });

      const responseBuffer = printJob(printer, mockRequest, parsedBody);
      expect(printer.handledJobs.length).toBe(1);

      const parsedResponse = ipp.parse(responseBuffer) as Record<string, any>;
      expect(parsedResponse.statusCode).toBe('successful-ok');
      expect(parsedResponse.id).toBe(1234);
      expect(parsedResponse['job-attributes-tag']['job-id']).toBe(1);
      expect(parsedResponse['job-attributes-tag']['job-state']).toBe(
        'completed',
      );
      done();
    });

    it('should handle Print-Job when optional attributes are missing', () => {
      const mockRequest = { url: '/printer' } as FastifyRequest;
      const parsedBody = {
        version: '1.0',
        operation: 'Print-Job' as any,
        id: 5678,
        data: Buffer.from('raw data'),
      } as unknown as ParsedBodyInterface;

      const responseBuffer = printJob(printer, mockRequest, parsedBody);
      expect(printer.handledJobs.length).toBe(1);

      const parsedResponse = ipp.parse(responseBuffer) as Record<string, any>;
      expect(parsedResponse.statusCode).toBe('successful-ok');
      expect(parsedResponse.id).toBe(5678);
    });
  });

  describe('getPrinterAttributes', () => {
    it('should return printer metadata conforming to RFC 8011', () => {
      const parsedBody = {
        version: '1.0',
        operation: 'Get-Printer-Attributes' as any,
        id: 100,
        'operation-attributes-tag': {
          'attributes-charset': 'utf-8',
          'attributes-natural-language': 'en-us',
          'printer-uri': 'http://127.0.0.1:4001',
          'requesting-user-name': 'alice',
          'job-name': '',
          'requested-attributes': [],
        },
        data: Buffer.alloc(0),
      } as unknown as ParsedBodyInterface;

      const responseBuffer = getPrinterAttributes(printer, parsedBody);
      const parsedResponse = ipp.parse(responseBuffer) as Record<string, any>;

      expect(parsedResponse.statusCode).toBe('successful-ok');
      expect(parsedResponse.id).toBe(100);
      const attributes = parsedResponse['printer-attributes-tag'];
      expect(attributes['printer-name']).toBe(printer.printerOption.name);
      expect(attributes['printer-state']).toBe('idle');
      expect(attributes['document-format-supported']).toBe('application/pdf');
      expect(attributes['operations-supported']).toEqual([
        'Print-Job',
        'Validate-Job',
        'Get-Jobs',
        'Get-Printer-Attributes',
      ]);
    });
  });

  describe('validateJob', () => {
    it('should return successful-ok response', () => {
      const parsedBody = {
        version: '1.0',
        operation: 'Validate-Job' as any,
        id: 200,
        'operation-attributes-tag': {
          'attributes-charset': 'utf-8',
          'attributes-natural-language': 'en-us',
          'printer-uri': 'http://127.0.0.1:4001',
          'requesting-user-name': 'alice',
          'job-name': '',
          'requested-attributes': [],
        },
        data: Buffer.alloc(0),
      } as unknown as ParsedBodyInterface;

      const responseBuffer = validateJob(printer, parsedBody);
      const parsedResponse = ipp.parse(responseBuffer) as Record<string, any>;

      expect(parsedResponse.statusCode).toBe('successful-ok');
      expect(parsedResponse.id).toBe(200);
    });
  });

  describe('getJobs', () => {
    it('should return successful-ok response for Get-Jobs', () => {
      const parsedBody = {
        version: '1.0',
        operation: 'Get-Jobs' as any,
        id: 300,
        'operation-attributes-tag': {
          'attributes-charset': 'utf-8',
          'attributes-natural-language': 'en-us',
          'printer-uri': 'http://127.0.0.1:4001',
          'requesting-user-name': 'alice',
          'job-name': '',
          'requested-attributes': [],
        },
        data: Buffer.alloc(0),
      } as unknown as ParsedBodyInterface;

      const responseBuffer = getJobs(printer, parsedBody);
      const parsedResponse = ipp.parse(responseBuffer);

      expect(parsedResponse.statusCode).toBe('successful-ok');
      expect(parsedResponse.id).toBe(300);
    });
  });
});
