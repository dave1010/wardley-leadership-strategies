---
title: "Agentic Coding Is an Organisational Design Problem"
description: "Treat agentic coding like hiring dozens of fast juniors: the real constraints are task readiness, verification, and safe delivery."
tags:
  - ai-and-leadership
  - ai
  - leadership
  - governance
  - delivery
  - software-architecture
slug: ai-and-leadership/agentic-coding-throughput
authors:
  - dave-hulbert
---

Treat “agentic coding” like you’ve suddenly hired 10–50 extremely fast juniors: they can type and search instantly, they **confidently hallucinate when underspecified**, they won’t protect you from your ambiguity, and you can reset them cheaply. The leverage is real, but it isn’t a model problem—it is an organisational design problem. Decision rights, task shaping, interfaces, verification, and risk controls become the bottlenecks.

<!-- truncate -->

## The real throughput model

A simple mental model: **throughput = min(spec, build, verify, deploy, observe)**. Agents massively increase “build” (code generation), which shifts the constraint to two things:

1. **Spec quality** (task readiness and clarity).
2. **Verification + runtime feedback**, bounded by InfoSec and governance.

If you want one sentence: you don’t need better agents first; you need a codebase and process that can accept many small, low-risk changes with high confidence.

## 1) Task readiness and decomposition quality

If work isn’t already shovel‑ready, agents amplify thrash.

**Requirements**

- A well-maintained backlog with small, independently mergeable slices.
- Clear definitions of done per slice (behaviour, performance, security, UX).
- Known system boundaries: where to make changes and where not to.
- Stable interfaces (APIs, schemas, contracts) so work proceeds in parallel.

**Common constraint**

Humans overestimate how well they’ve specified the problem. Shared context fills gaps; agents do not.

**Practical enablers**

- Short ADRs, RFC templates, and examples‑as‑specs.
- “Thin vertical slice” discipline: prefer end‑to‑end increments over component epics.

## 2) Verification capacity (the real bottleneck)

Agent output is cheap; review and validation are expensive. The limiting factor becomes: **how many changes can you confidently validate per day?**

**Requirements**

- High‑signal automated tests (unit + integration + contract + a few e2e).
- Deterministic environments (reproducible builds, seeded tests where needed).
- Clear ownership of invariants: security, privacy, performance budgets, data correctness.

**Common constraint**

Weak tests mean agents make progress that later has to be unpicked. You accrue **merge debt**.

**Practical enablers**

- Property‑based tests for tricky logic.
- Golden tests for output formats.
- Mutation testing (selectively) to measure test strength.
- Review checklists focused on invariants, not style.

## 3) System observability and feedback loops

If you can’t see what changed in production, you can’t safely accelerate.

**Requirements**

- Tracing/logging/metrics that answer: “did the change do what we thought?”
- Alert quality (low noise) so faster shipping doesn’t mean constant firefighting.
- Post‑deploy verification (synthetics, canaries, shadow traffic where applicable).

**Common constraint**

“Unknown unknowns” dominate. Agents generate plausible code; only runtime tells the truth.

**Practical enablers**

- Service‑level indicators tied to user outcomes.
- Per‑feature dashboards and automated rollback triggers.

## 4) Delivery architecture: safe parallelism

To use “swarms”, the codebase must tolerate concurrency.

**Requirements**

- Feature flags with good hygiene: ownership, expiry, and kill switches.
- Modular boundaries (even if imperfect): packages, services, bounded contexts, stable libs.
- Merge strategy that avoids long‑lived branches.

**Common constraint**

Monolithic coupling makes parallel changes collide; you spend the gains on conflict resolution.

**Practical enablers**

- Component contracts and “change surface area” discipline.
- Dependency direction rules (lintable).

## 5) Communication of requirements: ambiguity is the enemy

Outsourcing only works with crisp interfaces. With agents, any ambiguity turns into confident nonsense.

**Requirements**

- Concrete examples: input/output pairs, edge cases, non‑goals.
- Constraints explicitly stated (security, performance, backwards compatibility, migration rules).
- Shared vocabulary and canonical references (one source of truth per subsystem).

**Common constraint**

Humans write requirements optimised for human inference. Agents need explicitness and tests.

**Practical enablers**

- “Spec by executable example”: failing tests first, then implementation.
- Tiny context packs: relevant files, architectural notes, recent incidents, known pitfalls.

## 6) Governance, InfoSec, and risk controls

This decides what’s possible at all.

**Requirements**

- Approved tools/vendors and a clear policy on data handling.
- Redaction rules: what can/can’t go to external models.
- Audit trail: prompts, diffs, approvals, provenance.

**Common constraint**

Blanket bans push usage underground (worse risk, less benefit).

**Practical enablers**

- Tiered policy: public code vs proprietary vs regulated data.
- “Safe sandbox” repos and synthetic datasets for experimentation.
- Centralised logging of agent actions.

## 7) Human capability: the new “10×” is orchestration skill

The leverage comes from task shaping + verification + taste, not typing speed.

**Requirements**

Prompting is minor; the key skills are:

- Problem framing.
- Decomposition.
- Writing crisp acceptance tests.
- Rapid review.
- Knowing when to stop the agent and take over.

Comfort with iterative refinement and throwing away output matters more than prompt craft.

**Common constraint**

People treat agents as interns and as oracles. They’re neither: they’re compilers for intent.

**Practical enablers**

- Playbooks: “when to use agents”, “how to spec”, “how to review”.
- Pairing: one person orchestrates, one person verifies/risk‑checks.

## 8) CI speed and developer experience

If the loop is slow, swarms just create queues.

**Requirements**

- Fast CI (or at least fast tier‑1 checks) so you can validate many small changes.
- Local reproducibility and caching.
- Clear pre‑merge gates.

**Common constraint**

Slow tests mean fewer safe merges per day; agent throughput is irrelevant.

**Practical enablers**

- Split pipelines: lint/type/unit fast; integration nightly or per‑risk.
- Test impact analysis and selective execution (carefully).

## What I would prioritise first

1. **Test strength + runtime safety**: contract/integration tests + feature flags + rapid rollback.
2. **Backlog shaping**: smaller tasks with explicit done‑ness and examples.
3. **CI latency**: optimise tier‑1 checks to minutes, not tens of minutes.
4. **Observability‑as‑default**: every meaningful change ships with a way to verify impact.
5. **Policy + tooling**: approved agent stack, logging, and data boundaries.
6. **Training**: orchestration + review skills; not “prompting”.

## Quick self‑audit questions

- Can we merge 10 small PRs/day per engineer without fear?
- Do we know within 30 minutes if a deploy made things worse?
- Are our tests catching behavioural regressions or just line coverage?
- Are tasks defined with examples and non‑goals?
- Are feature flags treated as first‑class, with expiry?

Agentic coding is an accelerant. But accelerants only help when the system is ready to burn cleanly.
