# @pgbeam/openapi

## 0.2.1

### Patch Changes

- 9ce842e: Fix the mirror repository link in the README. It pointed at `sferarc/@pgbeam/openapi` (the npm scope path) instead of the GitHub repository `sferarc/pgbeam-openapi`.

## 0.2.0

### Minor Changes

- 86fcc6c: Publish `@pgbeam/openapi`, a public mirror of the PgBeam OpenAPI contract.

  The package ships the exact public spec that drives every PgBeam consumer (the API server, the TypeScript and Go SDKs, the Terraform, Crossplane, and Pulumi providers, the CLI, and the docs). It is generated as part of `pnpm generate`, so it never drifts from the source contract. Consumers can `npm i @pgbeam/openapi` and import the parsed document (`openapiSpec`, `openapiVersion`), or read the raw `@pgbeam/openapi/openapi.json` / `@pgbeam/openapi/openapi.yaml` files directly to generate their own clients, validate requests, or render API reference docs.
