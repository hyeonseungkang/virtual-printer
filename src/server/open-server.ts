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
import { FastifyReply, FastifyRequest } from 'fastify';

export function openServer(printer: Printer) {
  printer.server.addContentTypeParser(
    'application/ipp',
    (
      request: FastifyRequest,
      payload: NodeJS.ReadableStream,
      done: (err: Error | null, body?: Buffer) => void,
    ) => {
      const data: Buffer[] = [];
      payload.on('data', (chunk: Buffer) => {
        data.push(Buffer.from(chunk));
      });
      payload.on('end', () => {
        done(null, Buffer.concat(data));
      });
    },
  );

  printer.server.post('*', (request: FastifyRequest, reply: FastifyReply) => {
    const buffer = request.body as Buffer;
    let body = {} as ParsedBodyInterface;
    try {
      body = ipp.parse(buffer) as ParsedBodyInterface;
    } catch (e) {
      console.error(e);
    }
    void reply.header('Content-Type', 'application/ipp');
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
    void reply.send(data);
  });

  if (printer.printerOption.serverUrl instanceof URL) {
    printer.server.listen(
      {
        port: Number(printer.printerOption.serverUrl.port),
        host: printer.printerOption.serverUrl.hostname,
      },
      (error) => {
        printer.emit('server-opened', error);
      },
    );
  } else {
    printer.server.listen(
      { path: printer.printerOption.serverUrl },
      (error) => {
        printer.emit('server-opened', error);
      },
    );
  }

  if (printer.printerOption.bonjour) {
    const responder = getResponder();
    const port =
      printer.printerOption.serverUrl instanceof URL
        ? Number(printer.printerOption.serverUrl.port)
        : 3000;
    const service = responder.createService({
      name: printer.printerOption.name,
      type: 'ipp',
      port,
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
