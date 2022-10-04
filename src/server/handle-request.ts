import { Printer } from '../printer/printer';
import { HandledJob } from '../printer/vos/handled-job';
import {
  Attribute,
  Constants,
  Group,
  ParsedIPP,
} from './interfaces/parsed-body';

export function printJob(
  printer: Printer,
  parsedBody: ParsedIPP,
  raw: Buffer[],
) {
  let jobName = '';
  let requestingUserName = '';
  try {
    const group = parsedBody.groups.find(
      (v) => v.tag === Constants.OPERATION_ATTRIBUTES_TAG,
    ) as Group;
    jobName = (group.attributes.find((v) => v.name === 'job-name') as Attribute)
      .value[0];
    requestingUserName = (
      group.attributes.find(
        (v) => v.name === 'requesting-user-name',
      ) as Attribute
    ).value[0];
  } finally {
  }
  const handledJob = new HandledJob(
    printer.handledJobs,
    jobName,
    requestingUserName,
  );
  printer.handledJobs.push(handledJob);
  printer.emit('data', handledJob, Buffer.concat(raw.slice(1, raw.length)));
  return {
    statusCode: 'successful-ok',
    'version-number': '1.1',
    'request-id': parsedBody.requestId,
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
}

export function getPrinterAttributes(printer: Printer, parsedBody: ParsedIPP) {
  const data: Record<string, any> = {
    statusCode: 'successful-ok',
    'version-number': '1.1',
    'request-id': parsedBody.requestId,
    'operation-attributes-tag': {
      'attributes-charset': 'utf-8',
      'attributes-natural-language': 'en-us',
    },
    'printer-attributes-tag': {
      'printer-info': printer.printerOption.description,
      'printer-is-accepting-jobs': true,
      'printer-location': printer.printerOption.location,
      'printer-name': printer.printerOption.name,
      'printer-more-info': printer.printerOption.moreInfo.toString(),
      'printer-uri-supported': printer.printerOption.uri.toString(),
      'uri-security-supported': !printer.printerOption.security
        ? 'none'
        : 'tls',
      'uri-authentication-supported': 'requesting-user-name',
      'operations-supported': [
        'Print-Job',
        'Validate-Job',
        'Get-Printer-Attributes',
      ],
      'printer-state': Constants.PRINTER_IDLE,
      'printer-state-reasons': 'none',
      'compression-supported': 'none',
      'queued-job-count': 0,
      'document-format-supported': printer.printerOption.format,
      'document-format-default': printer.printerOption.format[0],
      'ipp-versions-supported': '1.1',
    },
  };
  return data;
}

export function validateJob(printer: Printer, parsedBody: ParsedIPP) {
  return {
    statusCode: 'successful-ok',
    'version-number': '1.1',
    'request-id': parsedBody.requestId,
    'operation-attributes-tag': {
      'attributes-charset': 'utf-8',
      'attributes-natural-language': 'en-us',
    },
  };
}

export function getJobs(printer: Printer, parsedBody: ParsedIPP) {
  return {
    statusCode: 'successful-ok',
    'version-number': '1.1',
    'request-id': parsedBody.requestId,
    'operation-attributes-tag': {
      'attributes-charset': 'utf-8',
      'attributes-natural-language': 'en-us',
    },
    'job-attributes-tag': {},
  };
}
