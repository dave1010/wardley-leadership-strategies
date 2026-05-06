---
title: "Agentic Coding Is an Organisational Design Problem"
description: "Agentic coding raises throughput; the real constraints are task readiness, verification, and safe delivery."
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

Agentic coding gives you sudden access to expertise at machine speed. It can draft a migration plan, wire a feature flag, or sketch a data pipeline in seconds. That is the upside. The harder truth is that its weaknesses are uneven and often subtle, so the work must be shaped and verified by humans who understand the system.

<!-- truncate -->

Speed therefore depends on organisational design. Decision rights, task shaping, interfaces, verification, and risk controls decide whether the acceleration compounds or collapses into rework. That idea lines up with earlier pieces on [continuous map governance](/blog/ai-and-leadership/continuous-map-governance) and [executable doctrine](/blog/ai-and-leadership/executable-doctrine), which frame speed as a property of the system, not a property of the model.

Throughput is the minimum of spec, build, verify, deploy, and observe. Agents flood the build stage with output. The constraint moves to spec quality and verification capacity, and runtime feedback becomes the referee that settles disputes. A team that can absorb many small, low‑risk changes with confidence will out‑ship one that simply generates more code.

## Spec: make the work shovel‑ready

Work must be shovel‑ready because ambiguity multiplies thrash. A clear PRD with acceptance criteria, edge cases, and non‑goals keeps the agent from inventing requirements. Stable interfaces and explicit system boundaries tell it where change is safe. Short ADRs still help when a decision needs a record, yet the PRD is the workhorse when you want precise outcomes.

## Build: exploit machine speed without flooding integration

Agent output is cheap; integration is not. Build speed only helps when the work is sliced small enough to merge independently and when the interfaces are stable enough to parallelise. Thin vertical slices beat component epics because they are testable and releasable. The build stage should feel like a conveyor belt, not a snowdrift.

## Verify: treat validation as the real rate limiter

High‑signal tests, deterministic builds, and explicit ownership of invariants determine how many changes you can trust each day. If tests are weak, you accumulate merge debt and spend tomorrow undoing today’s speed. This is where property‑based tests catch tricky logic, golden tests freeze output formats, and selective mutation testing measures test strength instead of assuming it.

## Deploy: separate release from deployment

Feature flags with ownership and expiry dates let you separate deploy from release, and they provide kill switches when something drifts. Modular boundaries reduce collision, even when the modules are imperfect. Long‑lived branches, by contrast, turn speed into conflict resolution. Small, frequent merges are the only way to keep agent throughput from overwhelming the integration surface.

## Observe: close the loop in production

Faster releases without observability are fast fires. Logs, traces, and metrics should answer a concrete question: did the change improve the user outcome we expected? Canaries deserve more than a name. A useful canary starts with a small slice of production traffic—perhaps one region or 1% of users—paired with explicit SLIs, then widens automatically only if error rates and latency stay within budget. If they do not, the system rolls back without debate.

## The cross‑cutting constraints

### Communication clarity

Communication has to be explicit because agents treat ambiguity as permission. Concrete examples, input/output pairs, and stated constraints prevent silent misinterpretation. A shared vocabulary and a single source of truth per subsystem keep teams aligned. Short context packs—relevant files, architectural notes, and known pitfalls—save time because they replace guesswork with reference material.

### Governance and InfoSec

Approved tools, clear data‑handling rules, and an audit trail of prompts, diffs, and approvals make acceleration defensible. Blanket bans push usage underground and increase risk. Tiered policies, safe sandbox repositories, synthetic datasets, and centralised logging offer a practical path that balances speed and control.

### Human capability and Theory of Constraints

Agentic work makes the bottleneck visible. When build is abundant, the constraint shifts to the human system that shapes, verifies, and accepts change. That is Theory of Constraints in practice: the organisation will only move as fast as its narrowest gate, and that gate is almost always review capacity and clarity of intent. The insight is that human skill should be invested at the bottleneck. A team that strengthens its verification muscle and its ability to frame good work will outperform one that merely adds more agent output.

### Developer experience

Developer experience sets the tempo. Fast tier‑1 checks, reproducible environments, and caching allow many small changes to flow. Split pipelines keep lint, type checks, and unit tests fast while heavier integration suites run on a cadence proportional to risk. If CI takes tens of minutes, agent throughput becomes a queueing problem instead of a speed advantage.

Agentic coding is an accelerant. It only helps when the system is ready to burn cleanly.
