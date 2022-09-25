import { openServer } from '../server/open-server';
import Fastify from 'fastify';
import { TypedEmitter } from 'tiny-typed-emitter';

interface PrinterEvents {
  serverStart: (err: Error | null) => void;
  bonjourPublish: () => void;
  data: (data: Buffer) => void;
}

interface PrinterOption {
  name?: string;
  port?: number;
  host?: string;
  additional?: {
    description?: string;
    location?: string;
    makeAndModel?: string;
    moreInfo?: string;
  };
}

export class HandledJob {
  constructor(
    handledJobs: HandledJob[],
    jobName: string,
    jobOriginatingUserName: string,
  ) {
    this['job-id'] = handledJobs.length + 1;
    this['job-name'] = jobName;
    this['job-originating-user-name'] = jobOriginatingUserName;
  }
  public readonly 'job-id': number;
  public readonly 'job-state' = 9;
  public readonly 'job-name';
  public readonly 'job-originating-user-name': string;
  public readonly createdAt = Date.now();
}

export class Printer extends TypedEmitter<PrinterEvents> {
  constructor(printerOption?: PrinterOption) {
    super();
    printerOption = {
      ...printerOption,
      additional: { ...this.printerOption, ...printerOption?.additional },
    };
    this.printerOption = { ...this.printerOption, ...printerOption };
    openServer(this);
  }

  public readonly printerOption: PrinterOption = {
    port: 3000,
    name: 'IPP Printer created by NodeJS',
    host: '0.0.0.0',
    additional: {
      description: 'IPP Printer created by NodeJS',
      location: 'localhost',
      makeAndModel: 'Generic PostScript Printer',
      moreInfo: 'http://localhost:3000',
    },
  };
  public readonly handledJobs: HandledJob[] = [];
  public readonly started = Date.now();
  public readonly server = Fastify();
}
