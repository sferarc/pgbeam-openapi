import { describe, expect, it } from "vitest";
import openapiDefault, { openapiSpec, openapiVersion } from "./index.js";

describe("@pgbeam/openapi mirror", () => {
  it("exports a valid OpenAPI 3.x document", () => {
    expect(openapiSpec.openapi).toMatch(/^3\./);
    expect(openapiSpec.info.title).toContain("PgBeam");
    expect(typeof openapiSpec.info.version).toBe("string");
  });

  it("exposes the spec version separately and consistently", () => {
    expect(openapiVersion).toBe(openapiSpec.info.version);
  });

  it("includes the API paths and component schemas", () => {
    expect(Object.keys(openapiSpec.paths).length).toBeGreaterThan(0);
    expect(Object.keys(openapiSpec.components?.schemas ?? {}).length).toBeGreaterThan(0);
  });

  it("default-exports the same document", () => {
    expect(openapiDefault).toBe(openapiSpec);
  });
});
