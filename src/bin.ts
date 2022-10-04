import { Printer } from './printer/printer';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';

mkdirSync(resolve('output/'), { recursive: true });

const datetime = new Date().toISOString();

const printer = new Printer({
  name: 'My Printer' + datetime,
  description: 'My Printer' + datetime,
  uri: new URL('http://0.0.0.0:5001'),
  format: ['application/postscript', 'application/pdf'],
});

printer.on('server-opened', (error) => {
  console.error(error);
});
printer.on('data', (handledJob, data) => {
  console.log(handledJob);
  writeFileSync(resolve('output/', handledJob.createdAt + '.prn'), data);
});
