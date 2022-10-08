import { Printer } from '../printer/printer';
import * as ipp from 'ipp';
import {
  getJobs,
  getPrinterAttributes,
  printJob,
  validateJob,
} from './handle-request';
import { getResponder, ServiceEvent } from '@homebridge/ciao';
import { Constants, ParsedIPP } from './interfaces/parsed-body';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as ippEncoder from 'ipp-encoder';

export function openServer(printer: Printer) {
  printer.server.addContentTypeParser(
    'application/ipp',
    (request, payload, done) => {
      const data: Buffer[] = [];
      payload.on('data', (chunk) => {
        data.push(Buffer.from(chunk));
      });
      payload.on('end', () => {
        done(null, data);
      });
    },
  );

  printer.server.post('*', (request, reply) => {
    const buffers = request.body as Buffer[];
    const body = ippEncoder.request.decode(buffers[0]) as ParsedIPP;
    reply.header('Content-Type', 'application/ipp');
    if (body.operationId === Constants.PRINT_JOB) {
      const data = printJob(printer, request, body, buffers);
      reply.send(data);
    } else {
      let data: any;
      switch (body.operationId) {
        case Constants.GET_JOBS:
          data = getJobs(printer, body);
          break;
        case Constants.GET_PRINTER_ATTRIBUTES:
          data = getPrinterAttributes(printer, body);
          break;
        case Constants.VALIDATE_JOB:
          data = validateJob(printer, body);
          break;
        default: {
          data = {
            id: body.requestId,
            version: '2.0',
            statusCode: 'server-error-operation-not-supported',
          };
          break;
        }
      }
      reply.send(ipp.serialize(data));
    }
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
      type: !printer.printerOption.security ? 'ipp' : 'ipps',
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
