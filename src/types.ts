/** A minimal, permissive OpenAPI 3.x document shape for the published mirror. */
export interface OpenApiDocument {
  openapi: string;
  info: {
    title: string;
    version: string;
    description?: string;
    [key: string]: unknown;
  };
  servers?: Array<{ url: string; description?: string; [key: string]: unknown }>;
  paths: Record<string, unknown>;
  components?: {
    schemas?: Record<string, unknown>;
    parameters?: Record<string, unknown>;
    responses?: Record<string, unknown>;
    [key: string]: unknown;
  };
  tags?: Array<{ name: string; description?: string; [key: string]: unknown }>;
  security?: unknown;
  [key: string]: unknown;
}
