import { Printer } from '../printer/printer';
import * as ipp from 'ipp';
import {
  getJobs,
  getPrinterAttributes,
  printJob,
  validateJob,
} from './handle-request';
import { getResponder, ServiceEvent } from '@homebridge/ciao';
import { ParsedBodyInterface } from './interfaces/parsed-body';

export function openServer(printer: Printer) {
  printer.server.addContentTypeParser(
    'application/ipp',
    (request, payload, done) => {
      const data: Buffer[] = [];
      payload.on('data', (chunk) => {
        data.push(Buffer.from(chunk));
      });
      payload.on('end', () => {
        done(null, Buffer.concat(data));
      });
    },
  );

  printer.server.post('*', (request, reply) => {
    const buffer = request.body as Buffer;
    let body = {} as ParsedBodyInterface;
    try {
      body = ipp.parse(buffer) as ParsedBodyInterface;
    } catch (e) {
      console.error(e);
    }
    reply.header('Content-Type', 'application/ipp');
    let data: Buffer;
    switch (body.operation) {
      case 'Print-Job':
        data = printJob(printer, request, body);
        break;
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
        data = ipp.serialize({
          id: body.id,
          version: '1.0',
          statusCode: 'server-error-operation-not-supported',
          'operation-attributes-tag': {
            'attributes-charset': 'utf-8',
            'attributes-natural-language': 'en-us',
          },
        });
        break;
      }
    }
    reply.send(data);
  });

  printer.server.listen(
    {
      port: Number(printer.printerOption.serverUrl.port),
      host: printer.printerOption.serverUrl.hostname,
    },
    (error) => {
      printer.emit('server-opened', error);
    },
  );

  if (printer.printerOption.bonjour) {
    const responder = getResponder();
    const service = responder.createService({
      name: printer.printerOption.name,
      type: 'ipp',
      port: Number(printer.printerOption.serverUrl.port),
    });
    service.on(ServiceEvent.NAME_CHANGED, (name) => {
      printer.printerOption.name = name;
      printer.emit('bonjour-name-change', name);
    });
    service.on(ServiceEvent.HOSTNAME_CHANGED, (name) =>
      printer.emit('bonjour-hostname-change', name),
    );
    return service.advertise().then(() => printer.emit('bonjour-published'));
  }
}
