# Invoice Review

An ObjectStack application built to evaluate invoice workflows and company-level access for Stratum. It includes suppliers, purchase orders, invoices and line items, company assignments, role definitions, invoice views, and a dashboard.

**Status: learning prototype. The audited build partially delivers the submitted requirements and is not ready for use across separate companies.** The application behavior described below has not been repaired in this snapshot.

## Analysis document

[Read or download the full Invoice Review Application Analysis](docs/invoice-review-application-analysis.docx).

[All submitted prompts, formatted for reading](docs/submitted-prompts.md), including follow-up requests and corrections. The [original plain text](docs/submitted-prompts.txt) is also available.

The 11-page report, dated **21 September 2026**, covers 43 grouped requirement checks against the submitted Stage 1 and Stage 2 prompts. Evidence comes from browser journeys, five demo role accounts, controlled server requests, database inspection, and review of the app and its installed ObjectStack **17.4.0** packages. The user identified the build model as Sol light; this assessment does not establish that the model caused the failures.

## Summary of findings

| Area | Observed behavior | Implication |
| --- | --- | --- |
| Company separation | Northstar-only demo Auditor and Analyst accounts could read Evergreen invoices. Switching companies did not scope lists and the dashboard. | The company selector is not an enforced access boundary. |
| Membership and roles | Changing or deactivating a Company Users assignment did not remove access. Expiring a native permission grant did revoke access in the same session. | Custom membership records are disconnected from native access enforcement. |
| Financial consistency | Editing a line on a Paid invoice returned HTTP 500 but saved the line change; the invoice total stayed unchanged. Reproduced as admin and Finance Analyst. | A failed save can leave inconsistent financial records. |
| Invoice lifecycle | Submitters could mark their invoices Paid or Cancelled. Paid and Cancelled invoices could reopen as Draft. | The requested status and read-only rules are incomplete. |
| Relationships and deletion | Mismatched supplier/PO and cross-company supplier references were accepted. A referenced PO and an Open invoice could be deleted. | Required business checks are missing from server writes. |
| Submitter creation | A valid create request was rejected; supplying the caller's creator ID made it succeed. | The creator-based policy and audit-field stamping order do not work together for normal creation. |
| Amounts and currency | Ten seeded lines had missing stored amounts. The entry form displayed yen and summed unit prices in its footer. | Samples and entry screens can present misleading financial values. |
| Role experience | Submitters had an empty company selector; Auditors saw an inaccessible Company Users link. | Role-specific navigation and company selection are unfinished. |

The financial consistency example is particularly important: `1 × 100.10 + 2 × 25.25 = 150.60`. After marking the invoice Paid, changing the second quantity to 3 returned an error, but the saved lines summed to **175.85** while the parent total remained **150.60**.

### What worked

- Supplier, PO and invoice screens; supplier search; four invoice views; and five live dashboard widgets.
- Newly created line amounts and totals, including **USD 150.60**, recalculation after edits, and recalculation after line removal.
- Duplicate supplier-code rejection, positive whole-number quantities, nonnegative prices, and due-date validation.
- Submitter ownership checks for reading and editing existing invoices, and an own-invoice dashboard.
- Internal finance note restrictions on the tested record/API paths, including hidden notes for Auditors and Submitters.
- Protection against deleting a referenced supplier, and same-session revocation of a native permission grant.

Metadata validation and TypeScript checking passed during the audit despite these behavioral failures. Passing those checks does not demonstrate financial correctness or company isolation.

## What this means for ObjectStack and Stratum

The findings have different causes:

- **Application implementation:** companies were not connected to a supported tenant boundary; status predicates and several relationship/deletion checks were missing or incorrect.
- **Runtime behavior requiring investigation:** the installed engine persisted a child write before a failed parent summary update, and the Submitter insertion policy depended on audit data not yet available at its evaluation point.
- **Console integration:** USD metadata did not produce correct currency presentation or line-total feedback in the entry grid.
- **Build and verification process:** incoherent sample values survived, the supplied role-definition section was blank, and earlier prompts prohibited browser verification. Historical builder replies and logs were unavailable.

The report assesses this installation, not every ObjectStack deployment. It separates confirmed failures from unverified paths. Approvals, document reading, and AI were later-stage work, so their absence was not counted as a failure.

For Stratum's Blueprint-style direction, reusable finance primitives should include enforced behavior and acceptance tests alongside fields: invoice lifecycle, company scope, line/total consistency, relationship rules, and role permissions. A context or RAG layer can explain policies; it cannot enforce record writes by itself.

## Recommended repair order

1. **Establish company isolation and access authority.** Connect membership, active company, role assignment, creation, and revocation to a supported tenancy model.
2. **Fix financial write consistency.** Reject mutations against Paid or Cancelled invoices before writing, including child lines. Prove that later failures cannot leave lines and totals inconsistent.
3. **Complete server-side business rules.** Enforce allowed status changes, matching suppliers and POs, company relationships, and deletion restrictions.
4. **Reconcile samples and repair entry screens.** Verify both the existing database and a fresh installation; display USD line amounts and correct totals before and after saving.
5. **Finish the role experience and repeat acceptance testing.** Test ordinary users in both the browser and server requests, including attempts that must be rejected.

Approvals and AI should wait until these foundations pass. The full report includes concrete acceptance scenarios and distinguishes reasonable Stratum-owned product logic from foundational infrastructure commitments.

## Run locally

Use **Node.js 22**; the audited installation used 22.15.0. Install from the committed npm lockfile:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000/](http://localhost:3000/). The REST API is under `/api/v1`; the Console is available under `/_console/`. Use a local development account provisioned by the runtime. Audit accounts and their credentials are not part of this repository.

Run the static checks:

```bash
npm run validate
npm run lint
npm run typecheck
```

`npm run build` compiles the metadata artifact. A GitHub Actions setup template is included at [docs/ci-workflow.example.yml](docs/ci-workflow.example.yml). To enable it, copy it to `.github/workflows/ci.yml` and commit using a GitHub login with permission to publish workflows. Automated checks are not enabled in this snapshot because the upload login lacks that permission. Existing Docker and Compose files are included, but deployment was not validated by this audit.

## Repository contents and review limits

- `objectstack.config.ts`: application registration, plugins, metadata, seeds and hooks.
- `src/`: objects, views, dashboard, datasets, permissions, API and handlers.
- `docs/invoice-review-application-analysis.docx`: full assessment and acceptance plan.
- `.claude/skills/` and `AGENTS.md`: existing authoring guidance shipped with the project.
- `package-lock.json`: dependency resolution used by this app.

Application source and the dependency lockfile match the audited snapshot. Repository preparation updated documentation, file exclusions and CI configuration; it did not repair the application findings.

Local databases, sessions, credentials, installed dependencies, generated build output and raw audit artifacts are excluded. The report's evidence register refers to local audit files and paths not included here. Its retained accounts and invoices describe the original local installation; cloning this repository does not recreate that database state.

The audit did not test a full restart, concurrency, all bulk/import paths, or shared links. It is not an exhaustive security assessment. A fresh-install comparison is still required before attributing historical sample-data problems to a particular runtime path.
