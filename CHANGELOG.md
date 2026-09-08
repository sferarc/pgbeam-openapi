# @pgbeam/openapi

## 0.3.4

### Patch Changes

- 3f33063: feat(api): split errors into RFC 9457 problem documents
- 022577d: feat(api): the audit log handed out a cursor with nowhere to put it, so a generated client could not page it at all
- eca3f27: feat(payments): an agent whose query budget runs out can buy more over HTTP 402
- c1fa878: feat(scan): the hostile-text detector was a library nobody could call without running Postgres through us
- 9818ecf: fix(api): a caller could tell whether a project existed in someone else's tenant, and two collections had no bound at all

## 0.3.3

### Patch Changes

- bd2d132: feat(api): an agent revoking fifty credentials had to make fifty calls
- 58d0ed0: feat(api): every write was last-writer-wins, so an agent's read-modify-write silently discarded whatever landed in between
- 43acb8e: feat(api): publish organization membership endpoints, split out of #2079
- 379b817: feat(webhooks): publish delivery contract and validate event types
- 7a26954: fix(api): a revoked agent credential could be put back to active, and the revoked password worked again
- 8deebf2: fix(ci): the conformance job reported a failure it could not name, on one run in three
- 43acb8e: fix(api): the member API contract claimed two things the server refuses

  `UpdateOrgMemberRoleRequest.role` and `CreateOrgInvitationRequest.role` now use a new `AssignableOrgRole` enum, which is `OrgRole` without `owner`. The server has always rejected `owner` on both paths with a 400, so every generated client, the CLI help and the reference pages were advertising a call that never works. Responses keep the full `OrgRole`, because a member really can be an owner. `role` is also no longer required on an invitation, matching the server, which defaults an absent role to `member`.

  `listOrgMembers` and `listOrgInvitations` now enforce the `page_size` range they declare. They read the query string directly and clamped anything outside 1 to 100 back to the default of 20, so `?page_size=500` was a documented 400 everywhere else in the API and a silent 20 here.

  `listOrgInvitations` now enforces the `status` enum it declares. Anything outside `pending`, `accepted`, `rejected` and `canceled` went to the database as a literal filter and came back as an empty page with a 200, so a caller who mistyped the status was told the organization has no invitations. It is a 400 now, as the contract has always said. `?status=` with no value is also a 400 rather than the unfiltered list; omit the parameter to list everything.

  `removeOrgMember`'s published description said "An owner cannot be removed; demote them first", and the server does neither half of that. It refuses only when the organization is down to its last owner, so removing any other owner returns 204, and demoting the last owner hits the same guard and returns the same 409. The description now says what the guard does: the last remaining owner cannot be removed or demoted, so transfer ownership first, which is the advice the 409 itself gives.

  Go SDK callers: nothing to migrate. `OrgRole` and `AssignableOrgRole` are both new types in `go.pgbeam.com/sdk` as of this release, which is what the minor bump is for.

## 0.3.2

### Patch Changes

- 8b04b38: feat(api): the contract never declared Idempotency-Key, and a reused key with a changed body replayed the wrong response

## 0.3.1

### Patch Changes

- dd2e970: chore(format): reflow prose to one line per paragraph, and let CI see it

## 0.3.0

### Minor Changes

- 16803b8: Release the current API contract. The published 0.2.4 was cut in #1180 and has since fallen fifteen commits behind the specification in this repository without the version moving, because the changeset generator could not name this package. The accumulated change is additive: eleven new operations (honeytokens, schema annotations, per-agent usage, audit session summaries, policy recommendations), thirteen new schemas, and no removed path, operation, schema, property or enum value. The two response schemas that gained a required field (`AuditChainVerification.keyed_count`, `PolicyReplaySummary.traffic_scope`) are read-only, so a client sees more than before and never less.

## 0.2.5

### Patch Changes

- 6bf2e14: Update the published package description from the pre-pivot pooling-and-caching pitch to the current agent-gateway positioning.

## 0.2.4

### Patch Changes

- 06f9609: feat(cli): first-run golden path. New public `GET /v1/organizations` lists the organizations visible to the caller's credential (an org-scoped `pbo_` key sees exactly its org, a user credential sees memberships with roles). `pgbeam auth login` now verifies the key against the API before storing it (a rejected key fails the login and stores nothing) and resolves the organization automatically, auto-selecting a single org and prompting a pick among several. `orgs list` shows live organizations with the active one marked (falling back to saved profiles offline) and `orgs switch` with no argument lists and picks interactively. `auth status`/`whoami` verify the credential live when online and print the masked key, method, email, and org, degrading gracefully offline; `whoami --help` now shows its own name. Top-level `pgbeam link` and `pgbeam unlink` aliases are registered so every hint that references them works, and the project link is discovered by walking ancestor directories like git. `policies create` gains the write-safety flags `update` already had (`--write-mode`, `--approval-mode`, `--approval-timeout-seconds`, `--approval-auto-max-rows`, `--migration-safety`, `--table-allowlist`, `--table-denylist`). The "No organization set" error now names the exact dashboard location to copy an org ID, the `mcp --help` example shows the real `.mcp.json` stanza, and `agents mcp-config` explains all three ways to supply credentials when input is missing.

## 0.2.3

### Patch Changes

- 31cb990: feat(byoc): self-host enrollment hardening, optional `expires_at` on enrollment create/list and a rotate operation that mints a new `pbh_` token once and atomically invalidates the old one

## 0.2.2

### Patch Changes

- 19a6caf: feat(approvals): affected-row estimate, target tables, and statement kind on approval requests
- 5d49e15: feat(providers): SelfHostEnrollment resource in all three IaC providers, gateway-resource secret-lifecycle tests, crossplane generator fix for immutable resources with wrapped create responses

## 0.2.1

### Patch Changes

- 9ce842e: Fix the mirror repository link in the README. It pointed at `sferarc/@pgbeam/openapi` (the npm scope path) instead of the GitHub repository `sferarc/pgbeam-openapi`.

## 0.2.0

### Minor Changes

- 86fcc6c: Publish `@pgbeam/openapi`, a public mirror of the PgBeam OpenAPI contract.

  The package ships the exact public spec that drives every PgBeam consumer (the API server, the TypeScript and Go SDKs, the Terraform, Crossplane, and Pulumi providers, the CLI, and the docs). It is generated as part of `pnpm generate`, so it never drifts from the source contract. Consumers can `npm i @pgbeam/openapi` and import the parsed document (`openapiSpec`, `openapiVersion`), or read the raw `@pgbeam/openapi/openapi.json` / `@pgbeam/openapi/openapi.yaml` files directly to generate their own clients, validate requests, or render API reference docs.
