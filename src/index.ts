import { openapiSpec, openapiVersion } from "./spec.gen.js";
import type { OpenApiDocument } from "./types.js";

export type { OpenApiDocument } from "./types.js";

/**
 * The public PgBeam OpenAPI 3.x document, as a JavaScript object.
 *
 * This package is a published mirror of the contract that drives every PgBeam
 * consumer (the API server, the TypeScript and Go SDKs, the Terraform,
 * Crossplane, and Pulumi providers, the CLI, and the docs). Use it to generate
 * your own client, validate requests, or render API reference docs.
 *
 * The raw document is also shipped as `@pgbeam/openapi/openapi.json` and
 * `@pgbeam/openapi/openapi.yaml` for tools that consume a spec file directly.
 */
export { openapiSpec, openapiVersion };

export default openapiSpec as OpenApiDocument;
