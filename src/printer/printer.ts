import { openServer } from '../server/open-server';
import Fastify from 'fastify';
import { HandledJob } from './vos/handled-job';
import { TypedEmitter } from 'tiny-typed-emitter';

interface PrinterEvents {
  'server-opened': (error?: Error | null) => void;
  data: (handledJob: HandledJob, data: Buffer) => void;
  'bonjour-published': (error?: Error | null) => void;
  'bonjour-name-change': (name: string) => void;
  'bonjour-hostname-change': (hostname: string) => void;
}

interface PrinterOptionsRequest {
  /**
   * printer-name (name(127))
   */
  name?: string;
  /**
   * printer-uri-supported (1setOf uri)
   */
  uri?: URL;
  /**
   * printer-info (text(127))
   */
  description?: string;
  /**
   * printer-location (text(127))
   */
  location?: string;
  /**
   * printer-more-info (uri)
   */
  moreInfo?: URL;
  /**
   * uri-security-supported (1setOf type2 keyword) 'tls', 'none'
   */
  security?: boolean;
  /**
   * document-format-supported (1setOf mimeMediaType)
   * 'application/postscript', 'application/pdf', 'application/octet-stream' ...IANA MIME TYPES
   *
   */
  format?: string[];
  /**
   * publish to bonjour
   */
  bonjour?: boolean;
}

interface PrinterOptions {
  name: string;
  uri: URL;
  description: string;
  location: string;
  moreInfo: URL;
  security: boolean;
  format: string[];
  bonjour: boolean;
}

export class Printer extends TypedEmitter<PrinterEvents> {
  constructor(options?: PrinterOptionsRequest) {
    super();
    this.printerOption = { ...this.printerOption, ...options };
    if (!this.printerOption.uri.port) this.printerOption.uri.port = '3000';
    !this.printerOption.security
      ? (this.printerOption.uri.protocol = 'ipp')
      : (this.printerOption.uri.protocol = 'ipps');
    openServer(this);
  }

  public readonly printerOption: PrinterOptions = {
    uri: new URL('ipp://0.0.0.0:3000'),
    name: 'Printer',
    description: 'IPP Printer created by NodeJS',
    location: '0.0.0.0',
    moreInfo: new URL('ipp://0.0.0.0:3000'),
    security: false,
    format: ['application/postscript'],
    bonjour: true,
  };
  public readonly handledJobs: HandledJob[] = [];
  public readonly startedAt = new Date();
  public readonly server = Fastify();
}
