# @pgbeam/openapi

The public OpenAPI specification for the [PgBeam](https://pgbeam.com) API, a globally distributed PostgreSQL proxy platform for safe Postgres access by AI agents.

The [`sferarc/pgbeam-openapi`](https://github.com/sferarc/pgbeam-openapi) repository is a read-only mirror. The specification is generated from the PgBeam source contract and synced there automatically on every change, so it never drifts from what actually drives the API server, the TypeScript and Go SDKs, the Terraform, Crossplane, and Pulumi providers, the CLI, and the docs. Do not open pull requests that edit the spec by hand; they cannot be merged back.

## Contents

- `openapi.yaml`, `openapi.json` — the full bundled OpenAPI document in both formats.
- `spec/` — the same public contract split into separated files (`spec/openapi.yaml` root plus `paths/` and `components/`), for consumers who prefer the modular layout. Split from the public bundle, so internal-only operations never appear.
- `src/` — a typed TypeScript module that re-exports the parsed document.

## Install

```bash
npm install @pgbeam/openapi
```

```ts
import { openapiSpec, openapiVersion } from "@pgbeam/openapi";

console.log(openapiVersion);
```

You can also read the raw documents without installing anything:

```ts
import spec from "@pgbeam/openapi/openapi.json";
```

Or point any OpenAPI tool at the bundled file (`openapi.yaml`) or the separated root (`spec/openapi.yaml`) to generate your own clients, validate requests, or render an API reference.

## License

Apache 2.0. See [LICENSE](./LICENSE).
