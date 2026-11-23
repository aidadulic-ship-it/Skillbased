# The Skills-Based Organization Academy

## Run locally

Run `npm start` from this checkout with Node.js and Python 3 installed. Open
`http://127.0.0.1:8000`. Static mode has no package installation, account,
API credentials or provider costs. Run `npm test` for the automated checks
and `npm run build` to copy the static application to `dist/`.

## Repository audit

The connected repository was `aidadulic-ship-it/Skillbased`. Its clone had an
unborn `main` branch and no refs or tracked files. GitHub reported Pages disabled
and no homepage or license. The expected Pages URL returned HTTP 404. There
were no package scripts, framework, routes, deployment workflows, assets,
tests or earlier lesson drafts to inspect. The local implementation uses
dependency-free HTML, CSS and JavaScript, navy and magenta, and hash-based URLs
that work under a Pages project subpath. Compare it with the existing site and
merge its content and routes if an additional source repository is identified.

## Implemented learning flow

- Eleven module pages, 56 lessons, ten versioned skills and 33 practice
  challenges. Content is an original editorial draft. Cases are fictional.
- Catalog search and domain filters, lesson completion, and an explainable
  recommendation based on unread lessons and missing evidence.
- Challenges with scenario-specific work products, hints, a reference to a
  saved earlier response for the same case where available, and a formative
  decision check. The fixed rubric evaluates the structured selections.
  Learners use that feedback to review their written response.
- A portfolio with practice records and captured rubric versions. Reassessment
  is local and credit-free and preserves prior records. The profile page
  exports and deletes local progress and evidence.

## Test report

| Verification | Result |
| --- | --- |
| `npm test` before implementation | Failed as expected because the content and learning modules did not exist yet |
| `npm test` after implementation | Six tests passed, covering curriculum inventory, module/lesson/challenge routes, invalid routes, formative rubric results, recommendations and reassessment |
| `npm run build` | Passed |
| `node --check` on each browser JavaScript module | Passed |
| Local HTTP requests to all six built files | HTTP 200 and response bodies matched build output |
| Managed browser preview | Browser relay timed out after the preview command started. Mobile, live keyboard flows, screen-reader behavior and screenshots remain unverified |
| Backend, authorization, appeals, concurrency and kill switch | Pending an approved backend and human review workflow |
| Editorial verification and assessment calibration | Pending editorial and qualified assessor review |

Browser acceptance sequence when preview is available: at phone and desktop
widths, tab through the skip link, nav, catalog filters, disclosure, radio
groups and profile deletion dialog. Complete a lesson, refresh, answer a
challenge, verify feedback, save it, reload the portfolio and reassess. Check
focus, contrast and horizontal overflow, a missing URL, empty search, empty
portfolio, export and deletion, storage denied, and operation with AI disabled.

## Phases and release

1. Establish the curriculum model and RED tests, then implement the static
   catalog, navigation, foundations and the remaining authored draft modules.
2. Connect practice, versioned feedback, local evidence and recommendations.
3. On an approved backend, validate EU region, service terms and ownership.
   Implement email OTP or magic links, least-privilege role policies, and
   server-side persistence. Prove negative authorization and deletion cases.
4. Add editorial approvals, human appeal ownership and AI behind a default-off
   server flag. Pilot with synthetic data. Verify atomic, idempotent credit
   reservation, consumption and refund, per-user limits, and global kill and
   spend controls before allowing any paid interaction. The proposed monthly
   allotment is 10 credits. Standard interaction is provisionally one credit.
   Static content costs zero. Display the quoted charge before any reservation.

For a staging or production release, run the tests and build, then serve
`dist/` from the approved host or artifact-based Pages workflow. Before
enabling Pages or repointing an existing domain, verify the original site,
compare routes and URLs, confirm the license and editorial approvals, and
obtain explicit release approval. Retain the prior artifact and a route
inventory. If staging or production fails, redeploy the previous approved
artifact or revert the integration commit on a normal branch. For this
empty repository's first release, retain the initial hosting configuration
and document how to withdraw the new deployment. Source changes are local.

## Cost and privacy risk register

| Risk | Control and validation before release |
| --- | --- |
| Shared-device storage | Use fictional data only in the preview. Export and deletion are browser-local. Review shared-device use and separate authenticated learner records before collecting personal data |
| Account or role leakage | Enforce role checks and row policies server-side. Test cross-learner reads, editor/learner access to admin operations and stale credentials |
| Uncontrolled provider spend | Use a protected provider adapter, explicit pricing, atomic ledger and idempotency. Test concurrent reservations, failure refunds and a global emergency shutoff |
| Excess retention and identifiability | Minimize data and avoid complete chat history by default. Review proportional access, small aggregates, incident logging, backups and deletion/export with the designated privacy owner |
| Provider processing and residency | Validate region, subprocessors, contractual terms and audit access before integration. Confirm applicability of the proposed 12/24-month inactivity rules and advance notice |
| Misleading assessment or provenance | Source-check before public release, preserve rubric versions and calibrate across representative examples. Route consequential decisions and contested evidence to qualified people |
