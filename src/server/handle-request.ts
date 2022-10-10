import { Printer } from '../printer/printer';
import { HandledJob } from '../printer/vos/handled-job';
import { ParsedBodyInterface } from './interfaces/parsed-body';
import { FastifyRequest } from 'fastify';
import * as ipp from 'ipp';

export function printJob(
  printer: Printer,
  fastifyRequest: FastifyRequest,
  parsedBody: ParsedBodyInterface,
) {
  let jobName = null;
  let requestingUserName = null;
  try {
    requestingUserName =
      parsedBody['operation-attributes-tag']['requesting-user-name'];
  } catch {}
  try {
    jobName = parsedBody['operation-attributes-tag']['job-name'];
  } catch {}
  const handledJob = new HandledJob(
    printer.handledJobs,
    jobName,
    requestingUserName,
  );
  printer.handledJobs.push(handledJob);
  const buffer = Buffer.from(parsedBody.data);
  let offset = 0;
  let tag = buffer.readInt8(offset);
  while (tag !== 0x03) {
    tag = buffer.readInt8(++offset);
  }
  printer.emit('data', handledJob, buffer.subarray(offset + 1), fastifyRequest);
  const data = {
    statusCode: 'successful-ok',
    version: '1.0',
    id: parsedBody.id,
    'operation-attributes-tag': {
      'attributes-charset': 'utf-8',
      'attributes-natural-language': 'en-us',
      'status-message': 'successful-ok',
    },
    'job-attributes-tag': {
      'job-id': handledJob['job-id'],
      'job-state': 9,
    },
  };
  return ipp.serialize(data);
}

export function getPrinterAttributes(
  printer: Printer,
  parsedBody: ParsedBodyInterface,
) {
  const data = {
    statusCode: 'successful-ok',
    version: '1.0',
    id: parsedBody.id,
    'operation-attributes-tag': {
      'attributes-charset': 'utf-8',
      'attributes-natural-language': 'en-us',
      'status-message': 'successful-ok',
    },
    'printer-attributes-tag': {
      'printer-uri-supported':
        printer.printerOption.printerUriSupported.toString(),
      'uri-security-supported': 'requesting-user-name',
      'uri-authentication-supported': 'none',
      'printer-name': printer.printerOption.name,
      'printer-state': 'idle',
      'printer-state-reasons': 'none',
      'ipp-versions-supported': '1.0',
      'operations-supported': [
        'Print-Job',
        'Validate-Job',
        'Get-Jobs',
        'Get-Printer-Attributes',
      ],
      'charset-configured': 'utf-8',
      'charset-supported': 'utf-8',
      'natural-language-configured': 'en-us',
      'generated-natural-language-supported': 'en-us',
      'document-format-default': printer.printerOption.format[0],
      'document-format-supported': printer.printerOption.format,
      'printer-is-accepting-jobs': true,
      'queued-job-count': 0,
      'pdl-override-supported': 'not-attempted',
      'printer-up-time': (
        (Date.now() - printer.startedAt.valueOf()) /
        1000
      ).toFixed(),
      'printer-current-time': printer.startedAt,
      'compression-supported': ['deflate', 'gzip'],
    },
  };
  return ipp.serialize(data);
}

export function validateJob(printer: Printer, parsedBody: ParsedBodyInterface) {
  const data = {
    statusCode: 'successful-ok',
    version: '1.0',
    id: parsedBody.id,
    'operation-attributes-tag': {
      'attributes-charset': 'utf-8',
      'attributes-natural-language': 'en-us',
    },
  };
  return ipp.serialize(data);
}

export function getJobs(printer: Printer, parsedBody: ParsedBodyInterface) {
  const data = {
    statusCode: 'successful-ok',
    version: '1.0',
    id: parsedBody.id,
    'operation-attributes-tag': {
      'attributes-charset': 'utf-8',
      'attributes-natural-language': 'en-us',
    },
    'job-attributes-tag': {},
  };
  return ipp.serialize(data);
}
