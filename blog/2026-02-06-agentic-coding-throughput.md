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

Consider task readiness first. Work must be shovel‑ready because ambiguity multiplies thrash. A clear PRD with acceptance criteria, edge cases, and non‑goals keeps the agent from inventing requirements. Stable interfaces and explicit system boundaries tell it where change is safe. Short ADRs still help when a decision needs a record, yet the PRD is the workhorse when you want precise outcomes.

Verification is the real rate limiter. Agent output is cheap; validation is expensive. High‑signal tests, deterministic builds, and explicit ownership of invariants determine how many changes you can trust each day. If tests are weak, you accumulate merge debt and spend tomorrow undoing today’s speed. This is where property‑based tests catch tricky logic, golden tests freeze output formats, and selective mutation testing measures test strength instead of assuming it.

The runtime loop matters just as much. Faster releases without observability are fast fires. Logs, traces, and metrics should answer a concrete question: did the change improve the user outcome we expected? Canaries deserve more than a name. A useful canary starts with a small slice of production traffic—perhaps one region or 1% of users—paired with explicit SLIs, then widens automatically only if error rates and latency stay within budget. If they do not, the system rolls back without debate.

Delivery architecture decides whether parallel work is safe. Feature flags with ownership and expiry dates let you separate deploy from release, and they provide kill switches when something drifts. Modular boundaries reduce collision, even when the modules are imperfect. Long‑lived branches, by contrast, turn speed into conflict resolution. Small, frequent merges are the only way to keep agent throughput from overwhelming the integration surface.

Communication has to be explicit because agents treat ambiguity as permission. Concrete examples, input/output pairs, and stated constraints prevent silent misinterpretation. A shared vocabulary and a single source of truth per subsystem keep teams aligned. Short context packs—relevant files, architectural notes, and known pitfalls—save time because they replace guesswork with reference material.

Governance and InfoSec set the outer boundary. Approved tools, clear data‑handling rules, and an audit trail of prompts, diffs, and approvals make acceleration defensible. Blanket bans push usage underground and increase risk. Tiered policies, safe sandbox repositories, synthetic datasets, and centralised logging offer a practical path that balances speed and control.

Human capability is the scarce skill. The leverage comes from framing problems, decomposing work, writing crisp acceptance tests, reviewing quickly, and knowing when to stop the agent and take over. Prompting helps, yet orchestration is the differentiator. Teams that improve fastest write playbooks for when to use agents, how to spec work, and how to review at speed, often pairing an orchestrator with a verifier for risk‑heavy changes.

Developer experience sets the tempo. Fast tier‑1 checks, reproducible environments, and caching allow many small changes to flow. Split pipelines keep lint, type checks, and unit tests fast while heavier integration suites run on a cadence proportional to risk. If CI takes tens of minutes, agent throughput becomes a queueing problem instead of a speed advantage.

Start with test strength and runtime safety because they determine how much output you can trust. Then shape the backlog into small, explicit slices with examples. Reduce CI latency to minutes, wire observability into every meaningful change, establish approved tooling and data boundaries, and train the team in orchestration and review.

## Quick self‑audit

- Can we merge 10 small PRs per engineer per day without fear?
- Do we know within 30 minutes if a deploy made things worse?
- Are our tests catching behavioural regressions or just line coverage?
- Are tasks defined with examples and non‑goals?
- Are feature flags treated as first‑class, with expiry?

Agentic coding is an accelerant. It only helps when the system is ready to burn cleanly.
