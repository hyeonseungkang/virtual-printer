# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`virtual-printer` is a TypeScript/Node.js library that implements a virtual IPP (Internet Printing Protocol) printer server conforming to RFC 8011. It advertises the printer service on the local network via Bonjour/mDNS (`@homebridge/ciao`) and receives print jobs over HTTP or UNIX domain sockets (`fastify`), parsing binary IPP payloads via the `ipp` library.

## Common Commands

- **Install**: `pnpm install`
- **Build**: `pnpm build` (compiles TypeScript to `dist/` via `tsc --build`)
- **Development**: `pnpm dev` (runs `src/bin.ts` with `nodemon` and `ts-node`)
- **Test all**: `pnpm test`
- **Test single file**: `pnpm test test/handled-job.spec.ts`
- **Test coverage**: `pnpm run test:coverage`
- **Lint**: `pnpm run lint` (runs `eslint src/ test/` using `tsconfig.eslint.json`)
- **Format check**: `pnpm run format:check` (runs `prettier --check src/ test/`)
- **Format write**: `pnpm run format` (runs `prettier --write src/ test/`)

## Architecture

```
src/
├── index.ts                     # Public entry point (exports Printer, HandledJob, FastifyRequest)
├── bin.ts                       # Standalone CLI execution script (saves received print jobs to output/*.prn)
├── printer/
│   ├── printer.ts               # Printer class (extends TinyTypedEmitter, manages options, state, Fastify lifecycle)
│   └── vos/
│       └── handled-job.ts       # HandledJob value object representing received print jobs
└── server/
    ├── open-server.ts           # Fastify server bootstrap, 'application/ipp' parser, routing, socket/HTTP listen, Bonjour
    ├── handle-request.ts        # Handlers for IPP operations (Print-Job, Get-Printer-Attributes, Validate-Job, Get-Jobs)
    └── interfaces/
        └── parsed-body.ts       # IPP constants, operation enums, status codes, and request/response interfaces
```

### Key Components & Flow

1. **`Printer` (`src/printer/printer.ts`)**:
   - Subclasses `TinyTypedEmitter` for typed events: `server-opened`, `data`, `bonjour-published`, `bonjour-name-change`, `bonjour-hostname-change`.
   - `serverUrl` option accepts a `URL` (listens on HTTP host & port) or a `string` (listens on a UNIX domain socket path).
   - Starts the server instance via `openServer(this)`.

2. **Server & Bonjour Setup (`src/server/open-server.ts`)**:
   - Registers a raw buffer content-type parser for `application/ipp` on Fastify.
   - Listens on `POST *` and parses IPP binary payloads using `ipp.parse()`.
   - Dispatches requests by `body.operation` to corresponding handler functions and serializes responses via `ipp.serialize()`.
   - Note on Fastify v5: async route handlers must return/await the reply promise.
   - When `bonjour: true`, advertises IPP service (`_ipp._tcp`) via `@homebridge/ciao`.

3. **IPP Request Handlers (`src/server/handle-request.ts`)**:
   - `printJob`: Creates a `HandledJob`, pushes to `printer.handledJobs`, emits `'data'` event with the document buffer, and returns a completed (`job-state: 9`) IPP response.
   - `getPrinterAttributes`: Returns RFC 8011 compliant printer metadata including supported MIME types, operations, and uptime.
   - `validateJob` / `getJobs`: Handles validation and job listing queries.