# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`virtual-printer` is a TypeScript/Node.js library that creates a virtual IPP (Internet Printing Protocol) printer server conforming to RFC 8011. It advertises the printer on the local network via Bonjour/mDNS (`@homebridge/ciao`) and receives print jobs over HTTP (`fastify`), parsing binary IPP payloads via the `ipp` library.

## Common Commands

- **Install**: `pnpm install`
- **Build**: `pnpm build` (compiles TypeScript to `dist/` via `tsc --build`)
- **Development**: `pnpm dev` (runs `src/bin.ts` with `nodemon` and `ts-node`)
- **Lint**: `pnpm exec eslint src/`
- **Format check**: `pnpm exec prettier --check src/`
- **Format write**: `pnpm exec prettier --write src/`

## Architecture

```
src/
├── index.ts                     # Public package entry point (exports Printer, HandledJob, FastifyRequest)
├── bin.ts                       # Standalone execution script (saves received jobs to output/*.prn)
├── printer/
│   ├── printer.ts               # Printer class (extends TypedEmitter, manages options, state, Fastify instance)
│   └── vos/
│       └── handled-job.ts       # HandledJob value object representing received print jobs
└── server/
    ├── open-server.ts           # Fastify server bootstrap, 'application/ipp' parser, routing, and Bonjour advertisement
    ├── handle-request.ts        # Handlers for IPP operations (Print-Job, Get-Printer-Attributes, Validate-Job, Get-Jobs)
    └── interfaces/
        └── parsed-body.ts       # IPP constants, operation enums, status codes, and request/response interfaces
```

### Key Components & Flow

1. **`Printer` (`src/printer/printer.ts`)**:
   - Subclasses `tiny-typed-emitter` to provide typed events: `server-opened`, `data`, `bonjour-published`, `bonjour-name-change`, `bonjour-hostname-change`.
   - Initializes default configuration options (server URL, printer URI, MIME formats, Bonjour discovery toggle) and starts the server via `openServer(this)`.

2. **Server & Bonjour Setup (`src/server/open-server.ts`)**:
   - Registers a raw buffer content-type parser for `application/ipp` on the Fastify instance.
   - Listens on `POST *` and parses IPP binary payloads using `ipp.parse()`.
   - Dispatches requests by `body.operation` to corresponding handler functions and serializes responses via `ipp.serialize()`.
   - When `bonjour` is enabled, publishes an IPP service (`_ipp._tcp`) via `@homebridge/ciao`.

3. **IPP Request Handlers (`src/server/handle-request.ts`)**:
   - `printJob`: Instantiates a `HandledJob`, stores it in `printer.handledJobs`, emits the `'data'` event with the document buffer, and returns a completed (`job-state: 9`) IPP response.
   - `getPrinterAttributes`: Returns RFC 8011 compliant printer metadata including supported MIME types, operations, and uptime.
   - `validateJob` / `getJobs`: Handles validation and job listing queries.