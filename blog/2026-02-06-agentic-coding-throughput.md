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

Agentic coding feels like hiring 10–50 extremely fast juniors overnight. They type and search instantly, they confidently hallucinate when underspecified, they will not protect you from ambiguity, and you can reset them cheaply. The leverage is real, yet the constraint sits in organisational design. Decision rights, task shaping, interfaces, verification, and risk controls are what determine whether the acceleration is safe or chaotic.

<!-- truncate -->

## A question worth answering

The question is simple: why do some teams go faster with agents while others drown in rework? The thesis is equally direct. Teams that treat agents as throughput multipliers must redesign the system around specification, verification, and safe delivery, because those are the real choke points once code generation is abundant.

## The throughput model that explains the bottleneck

A helpful mental model is throughput = min(spec, build, verify, deploy, observe). Agents flood the build stage with output. That shift pushes the bottleneck toward spec quality and verification, with runtime feedback and InfoSec acting as hard boundaries. If you want a single sentence to carry forward, it is this: you need a codebase and process that can accept many small, low‑risk changes with high confidence.

## Task readiness and decomposition decide whether speed compounds

Agents perform best when work is already shovel‑ready, because ambiguity amplifies thrash. A well‑maintained backlog of small, independently mergeable slices keeps the work moving. Clear definitions of done, stable interfaces, and explicit system boundaries reduce rework because the agent is not forced to infer where change is safe. The practical enablers here are boring and powerful: short ADRs, RFC templates, examples‑as‑specs, and a bias toward thin vertical slices that deliver end‑to‑end value instead of component‑level epics.

## Verification capacity becomes the real rate limiter

Agent output is cheap while review and validation are expensive, which means the limiting factor is how many changes a team can confidently validate per day. High‑signal automated tests, deterministic environments, and explicit ownership of invariants are the backbone of this capacity. Weak tests create merge debt: progress that looks real until it has to be unpicked. That is why property‑based tests, golden tests for output formats, selective mutation testing, and review checklists focused on invariants matter more than style debates when agents are in the loop.

## Feedback loops keep acceleration safe in production

Shipping faster without observability is a fast path to firefighting. The system has to answer whether a change did what you expected, and it must do so quickly. Tracing, logging, and metrics only matter when they connect to user outcomes, and alerts must be quiet enough to preserve trust. Post‑deploy verification through canaries, synthetics, and shadow traffic is the difference between learning quickly and learning late, because runtime is where plausible code meets reality.

## Delivery architecture sets the limits of parallel work

Swarming only works when the codebase tolerates concurrency. Feature flags with clear ownership and expiry give you controlled blast radius. Modular boundaries, even imperfect ones, reduce collision. A merge strategy that avoids long‑lived branches keeps the integration cost low enough to benefit from parallelism. Without these traits, the gains are spent on conflict resolution and coordination overhead.

## Requirements must be explicit to survive agent interpretation

Outsourcing only works with crisp interfaces, and agents amplify the cost of ambiguity. Concrete examples, edge cases, and non‑goals belong in the spec alongside explicit constraints for security, performance, and backward compatibility. A shared vocabulary and a single source of truth per subsystem help prevent drift. The most reliable pattern is spec by executable example, backed by a small context pack of relevant files, architectural notes, and known pitfalls.

## Governance and InfoSec decide what is possible at all

Policy sets the outer boundary of agentic work. Approved tools, clear data‑handling rules, and an audit trail of prompts, diffs, and approvals are table stakes. Blanket bans push usage underground and increase risk, so tiered policies, safe sandbox repos, synthetic data, and centralised logging are the practical alternatives. These controls make acceleration defensible instead of accidental.

## Human capability is the scarce skill

The new leverage comes from orchestration: problem framing, decomposition, crisp acceptance tests, rapid review, and knowing when to stop the agent and take over. Prompting helps, yet the decisive skills are taste and verification discipline. Teams that succeed teach playbooks for when to use agents, how to spec work, and how to review at speed, often pairing one person who orchestrates with another who verifies and risk‑checks.

## Developer experience sets the tempo

Even with perfect specs, slow CI collapses the benefit. Fast tier‑1 checks, reproducible local environments, and caching allow many small changes to move safely. Split pipelines keep lint, type checks, and unit tests fast while heavier integration runs on a cadence proportional to risk. Without this, queues build and agent throughput becomes irrelevant.

## What I would prioritise first

Start with test strength and runtime safety because they determine how much agent output you can trust. Then shape the backlog into small, explicit slices with examples. Next, reduce CI latency to minutes, wire observability into every meaningful change, establish approved tooling and data boundaries, and train the team in orchestration and review.

## Quick self‑audit

- Can we merge 10 small PRs per engineer per day without fear?
- Do we know within 30 minutes if a deploy made things worse?
- Are our tests catching behavioural regressions or just line coverage?
- Are tasks defined with examples and non‑goals?
- Are feature flags treated as first‑class, with expiry?

Agentic coding is an accelerant. It only helps when the system is ready to burn cleanly.
