import { Printer } from '../printer/printer';
import * as ipp from 'ipp';
import { ParsedBuffer, PrinterOpertaion } from 'ipp';
import {
  getJobs,
  getPrinterAttributes,
  printJob,
  validateJob,
} from './handle-request';
import { getResponder } from '@homebridge/ciao';

export type ParsedBodyInterface = ParsedBuffer & {
  operation: PrinterOpertaion & [];
  'operation-attributes-tag': {
    'requested-attributes': string[];
    'attributes-charset': string;
    'attributes-natural-language': string;
    'printer-uri': string;
    'requesting-user-name': string;
    'job-name': string;
  };
};

export function openServer(printer: Printer) {
  printer.server.addContentTypeParser(
    'application/ipp',
    (request, payload, done) => {
      let data = '';
      payload.on('data', (chunk) => (data += chunk));
      payload.on('end', () => {
        done(null, ipp.parse(Buffer.from(data)));
      });
    },
  );

  printer.server.post('/printer/:id', (request, reply) => {
    console.log(request.body);
    reply.header('Content-Type', 'application/ipp');
    reply.send(null);
  });

  printer.server.post('/', (request, reply) => {
    const body = request.body as ParsedBodyInterface;
    reply.header('Content-Type', 'application/ipp');
    if (body.operation === 'Print-Job') {
      const data = printJob(printer, body);
      reply.send(data);
    } else {
      let data = {};
      switch (body.operation) {
        case 'Get-Jobs':
          data = getJobs(printer, body);
          break;
        case 'Get-Printer-Attributes':
          data = getPrinterAttributes(printer, body);
          break;
        case 'Validate-Job':
          data = validateJob(printer, body);
          break;
        default: {
          data = {
            id: body.id,
            version: '2.0',
            statusCode: 'server-error-operation-not-supported',
          };
          break;
        }
      }
      return reply.send(ipp.serialize(data));
    }
  });

  printer.server.listen(
    { port: printer.printerOption.port, host: printer.printerOption.host },
    (err) => {
      printer.emit('serverStart', err);
    },
  );

  const responder = getResponder();
  const service = responder.createService({
    name: printer.printerOption.name as string,
    type: 'ipp',
    port: printer.printerOption.port,
  });
  return service.advertise().then(() => {
    printer.emit('bonjourPublish');
  });
}
