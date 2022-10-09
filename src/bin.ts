import { Printer } from './printer/printer';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
mkdirSync(resolve('output/'), { recursive: true });

const datetime = new Date().toISOString();

const printer = new Printer({
  name: 'My Printer' + datetime,
  description: 'My Printer' + datetime,
  serverUrl: new URL('http://0.0.0.0:5001'),
  printerUriSupported: new URL('http://0.0.0.0:5001'),
  format: ['application/pdf', 'application/postscript'],
  bonjour: true,
});

printer.on('server-opened', (error) => {
  console.error(error);
});
printer.on('data', (handledJob, data, request) => {
  console.log(handledJob, request.url);
  writeFileSync(resolve('output/', handledJob.createdAt + '.prn'), data);
});

printer.server.get('/printer', (request, reply) => {
  reply.send('hi');
});
