import { HandledJob, Printer } from '../printer/printer';
import { ParsedBodyInterface } from './open-server';

export function printJob(printer: Printer, parsedBody: ParsedBodyInterface) {
  const handledJob = new HandledJob(
    printer.handledJobs,
    parsedBody['operation-attributes-tag']['job-name'],
    parsedBody['operation-attributes-tag']['requesting-user-name'],
  );
  printer.handledJobs.push(handledJob);
  printer.emit('data', handledJob, Buffer.from(parsedBody.data));
  return {
    'status-code': parsedBody.statusCode,
    'version-number': '2.0',
    'request-id': parsedBody.id,
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

export function getPrinterAttributes(
  printer: Printer,
  parsedBody: ParsedBodyInterface,
) {
  const printerAttributesTag: Record<string, any> = {
    'printer-info': printer.printerOption.additional?.description,
    'printer-is-accepting-jobs': true,
    'printer-location': printer.printerOption.additional?.location,
    'printer-name': printer.printerOption.name,
    'printer-make-and-model': printer.printerOption.additional?.makeAndModel,
    'printer-more-info': printer.printerOption.additional?.moreInfo,
    'operations-supported': [
      'Print-Job',
      'Validate-Job',
      'Get-Printer-Attributes',
    ],
    'printer-state': '3',
    'printer-state-reasons': 'none',
    'compression-supported': 'none',
  };
  const data: Record<string, any> = {
    'version-number': '2.0',
    'request-id': parsedBody.id,
    'operation-attributes-tag': {
      'attributes-charset': 'utf-8',
      'attributes-natural-language': 'en-us',
    },
    'printer-attributes-tag': {},
  };
  parsedBody['operation-attributes-tag']['requested-attributes'].forEach(
    (attributeName) => {
      if (printerAttributesTag[attributeName]) {
        data['printer-attributes-tag'][attributeName] =
          printerAttributesTag[attributeName];
      }
    },
  );
  return data;
}

export function validateJob(printer: Printer, parsedBody: ParsedBodyInterface) {
  return {
    'status-code': parsedBody.statusCode,
    'version-number': '2.0',
    'request-id': parsedBody.id,
    'operation-attributes-tag': {
      'attributes-charset': 'utf-8',
      'attributes-natural-language': 'en-us',
    },
  };
}

export function getJobs(printer: Printer, parsedBody: ParsedBodyInterface) {
  return {
    'status-code': parsedBody.statusCode,
    'version-number': '2.0',
    'request-id': parsedBody.id,
    'operation-attributes-tag': {
      'attributes-charset': 'utf-8',
      'attributes-natural-language': 'en-us',
      'status-code': 'successful',
    },
    'job-attributes-tag': {},
  };
}
