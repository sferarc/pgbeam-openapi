# @pgbeam/openapi

The public OpenAPI specification for the [PgBeam](https://pgbeam.com) API, a globally distributed PostgreSQL proxy platform for safe Postgres access by AI agents.

This is the same contract that drives the API server, the TypeScript and Go SDKs, the Terraform, Crossplane, and Pulumi providers, the CLI, and the docs, so it never drifts from what the API actually does. It updates on every change to the API.

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

## Contributing

Issues and pull requests are welcome here. An issue is the right place to start for a bug, a wrong doc, or a missing capability; say what you ran, what happened, what you expected, and which version you were on.

Do not open a public issue for a suspected security vulnerability. Email security@pgbeam.com, or report it privately from this repository's Security tab.

## License

Apache 2.0. See [LICENSE](./LICENSE).
