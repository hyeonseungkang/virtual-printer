# 🖨 virtual-printer
A Node.js module that makes Virtual IPP Printer.

[![https://nodei.co/npm/virtual-printer.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/virtual-printer.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/virtual-printer)

## Usage

```typescript
import { Printer, HandledJob, FastifyRequest } from 'virtual-printer';

const printer = new Printer({ //default options
  serverUrl: new URL('http://0.0.0.0:3000'),
  printerUriSupported: new URL('ipp://0.0.0.0:3000'),
  name: 'Printer',
  description: 'IPP Printer created by NodeJS',
  location: '0.0.0.0',
  moreInfo: new URL('ipp://0.0.0.0:3000'),
  format: ['application/pdf'],
  bonjour: true,
})

printer.on('server-opened', (error) => {
  console.error(error);
});

printer.on('data', (handledJob: HandledJob, data: Buffer, request: FastifyRequest) => {
  console.log(handledJob, request.url);
  writeFileSync(resolve('output/', handledJob.createdAt + '.ps'), data);
});
```

## API

### Class: Printer

#### `new Printer(PrinterOptions)`

The Printer object can be initialized with an object containing:
- `serverUrl: URL`
  - For fastify listing host and port.
- `bonjour: boolean`
  - `true` will publish printer server to bonjour network using `@homebridge/ciao`.
- `name: string` 
  - Name of the printer. (default: `Printer` )
  - rfc8011#5.4.4: `printer-name (name(127))`
- `printerUriSupported: URL`
  - URL for requesting print job for client.
  - rfc8011#5.4.1: `printer-uri-supported (1setOf uri)`
- `description: string`
  - rfc8011#5.4.6: `printer-info (text(127))`
- `location: string`
  - rfc8011#5.4.5: `printer-location (text(127))`
- `moreInfo: string`
  - rfc8011#5.4.7: `printer-more-info (uri)`
- `format: string[]`
  - Formats in string array must be taken from IANA MIME types.
  - First string in string array will set to `document-format-default`. 
  - rfc8011 #5.4.21: `document-format-default (mimeMediaType)`
  - rfc8011 #5.4.22: `document-format-supported (1setOf mimeMediaType)`

All attributes need to follow rules by [RFC 8011](https://www.rfc-editor.org/rfc/rfc8011.html) and [IANA MIME types](https://www.iana.org/assignments/media-types/media-types.xhtml).

#### Event: data

Emitted when server received new print job.<br>
The `handledJob: HandledJob` is an instance of [`HandleJob`]().<br>
`data: Buffer` is data part parsed from request. 
A `request: FastifyRequest` instance of `request.body` will `Buffer` and including data and request body.

```typescript
import { HandledJob, FastifyRequest } from 'virtual-printer';

printer.on('data', (handledJob: HandledJob, data: Buffer, request: FastifyRequest) => {
  console.log(handledJob, request.url);
  // const rawRequest = request.data;
  writeFileSync(resolve('output/', handledJob.createdAt + '.ps'), data);
});
```

#### Event: server-opened

Emitted when server started. The `error: Error` is from fastify server.

```typescript
printer.on('server-opened', (error?: Error | null) => {
  console.error(error);
});
```

#### Event: bonjour-published

Emitted when server published to bonjour network.

```typescript
printer.on('bonjour-published', () => {
  console.log('Server published to bonjour');
});
```

#### Event: bonjour-name-change

Emitted when server name changed which published to bonjour network. The `name: string` is new name that published to bonjour network.

```typescript
printer.on('bonjour-name-change', (name: string) => {
  console.log('Bonjour name changed', name);
});
```

#### Event: bonjour-hostname-change

Emitted when local hostname changed. The `hostname: string` is new name from your local.

```typescript
printer.on('bonjour-name-change', (hostname: string) => {
  console.log('Bonjour hostname changed', hostname);
});
```

#### handleJobs: HandleJob[]

The jobs that printer received.

#### startedAt: Date

#### server: FastifyInstance

The fastify instance that server listening.

#### printerOption: PrinterOptions

Printer options when you constructed with default values.

### Class: HandledJob

#### `job-id: number`

The id of the job.

#### `job-state: number`

The state of the job. Always `9`. (rfc8011#5.3.7 completed)<br>

#### `job-name: string`

The name of the job from request. If name cannot parse, it will be `new Date().toISOString()`.

#### `job-originating-user-name: string`

The username of the job from request. If username cannot parse, it will be `anonymous`.

#### `createdAt: Date`

The creation date of the job.

## License

MIT
