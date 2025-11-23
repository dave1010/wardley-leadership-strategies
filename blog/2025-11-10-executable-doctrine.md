---
title: Executable Doctrine
description: Convert Wardley Maps and Cynefin playbooks into policy-as-code guardrails so AI agents can act within codified doctrine while humans handle exceptions.
tags:
  - ai-and-leadership
  - ai
  - leadership
  - wardley-mapping
  - doctrine
  - governance
  - automation
slug: ai-and-leadership/executable-doctrine
authors:
  - dave-hulbert
---

Continuous map governance gave us living Wardley Maps tied to telemetry. The next leap is **turning doctrine into code so agents can execute plays safely, surface exceptions fast, and keep governance adaptive instead of static**. This post outlines how we might be able to codify Wardley and Cynefin guidance into machine-enforced guardrails using policy-as-code, feature flags, and control planes—while keeping humans as arbiters of judgement.

<!-- truncate -->

## Why executable doctrine matters now

- AI agents already negotiate contracts, schedule migrations, and open standards. Without codified doctrine they optimise locally and erode intent.
- Regulators increasingly expect explainability and audit trails; policy-as-code can provide both.
- Living doctrine makes continuous map governance actionable, letting leaders focus on exceptions, ethics, and narrative instead of approvals.

## Translate maps and playbooks into rules the stack understands

1. **Identify doctrine clauses** – Pull explicit Wardley doctrines (e.g., "remove duplication") and Cynefin signposts (e.g., "probe-sense-respond in complex contexts") into a canonical catalogue.
2. **Bind clauses to map components** – Annotate map nodes with metadata: evolutionary stage, dependency risk, user needs, regulatory class, reversibility. Store in versioned config (e.g., GitOps repo) or a control-plane CRD.
3. **Express intent as policy** – Use Open Policy Agent (OPA) to encode when a play is permissible, required, or forbidden. Examples: "If component stage=Product and latency > SLO for 3 weeks, allow auto-switch to managed utility"; "If component class=Sensitive and environment=ChaosTest, block agent actions".
4. **Expose flags for bounded autonomy** – Wrap risky moves in feature flags via OpenFeature/LaunchDarkly so agents can act within narrow blast radiuses. Flags carry owner, expiry, and rollback semantics.
5. **Instrument for evidence** – Tie policies to OpenTelemetry traces and map IDs. Every agent action emits decision context, doctrine clause ID, and map version so auditors can replay reasoning.

## Reference architecture for machine-enforced guardrails

- **Map state store** – A source of truth (e.g., Postgres/Neon) holding map topology, component evolution scores, and dependencies; updated by governance pipelines.
- **Doctrine registry** – Versioned policy bundles (OPA bundles, Cedar templates, or Rego/JSON) mapped to component labels and Cynefin domains.
- **Decision API** – A thin service that evaluates policies, enforces feature-flag scopes, and returns allow/deny/advise with rationale. Cache short-lived decisions but always stamp map version + policy hash.
- **Agent mesh** – Domain agents (procurement, platform, marketing, compliance) that call the Decision API before acting. They must support `enforce`, `propose`, and `escalate` modes.
- **Exception desk** – A queue (e.g., Slack bot + ticket) where agents send "advise" or "escalate" responses. Humans approve, modify doctrine, or grant break-glass tokens with expiry.
- **Control plane** – Kubernetes/Spiffe/Spire/Istio or service meshes that enforce identity, mTLS, and rate limits, ensuring policy decisions propagate consistently.

## Keeping governance live instead of static

- **Doctrine SLOs** – Track staleness: time since last map refresh, time since policy change, and drift between observed evolution and encoded stage. Alert when SLOs breach.
- **Auto-hypothesis tests** – Chaos experiments aligned to doctrine (e.g., simulate supplier failure on a "Commodity" node) to validate that guardrails trigger expected plays.
- **Policy canaries** – Deploy new doctrines to 5–10% of agents or regions first. Use progressive delivery tools (Argo Rollouts/Flagger) and compare incident and outcome metrics.
- **Feedback loops** – Agents file suggestions when policies deny frequently or when exceptions become routine. Governance guilds review weekly and update doctrine metadata.
- **Map-to-policy lineage** – Every policy references the map component IDs it governs. If a map changes (component split/merge), dependency analysis flags orphaned or overlapping policies for review.

## Practical playbook: from governance backlog to code

1. **Catalogue candidates** – Start with recurring decisions: utility migrations, standardisation triggers, vendor diversification, personal-data handling, kill switches for unsafe experiments.
2. **Shape semantics** – Define verbs (allow/deny/advise), contexts (environment, region, user tier), and thresholds (SLO/SLA, risk score, cost caps). Avoid vague adjectives.
3. **Codify and simulate** – Author Rego/Cedar/Kyverno rules; run them against historical traces and synthetic map states. Fail the build if policies lack tests or coverage for critical components.
4. **Wire to agents** – Require every agent to call the Decision API with map component IDs. Enforce transport security and signed payloads to prevent spoofing.
5. **Observe and adapt** – Ship dashboards for exception rates, policy evaluation latency, and divergence between advised and executed actions. Tune thresholds weekly.

## Human judgement stays central

- **Ethical checkpoints** – Hard-code ethics triggers (e.g., "non-reversible harm", "equity impact") that force escalation regardless of confidence scores.
- **Context switches** – Allow humans to reclassify contexts: a "complicated" domain may become "complex" after a shock, changing which Cynefin playbook applies. Policies must accept human overrides with expiry.
- **Narrative reviews** – Quarterly doctrine reviews should combine map changes, incident reports, and agent narratives to decide which plays remain safe to automate.

## What’s emerging

- **Policy-aware foundation models** – LLMs fine-tuned to emit Rego/Cedar snippets with citations back to doctrine clauses, reducing translation errors.
- **Self-describing maps** – Map editors that export CRDs/OPA bundles directly, keeping visual updates and enforcement in lockstep.
- **Outcome-linked funding** – FinOps + policy engines that auto-adjust budgets when doctrine play outcomes deviate, tightening the feedback loop between spending and strategy.
- **Cross-organisation treaty layers** – Shared policy schemas that let partner agents negotiate guardrails automatically while preserving each party’s doctrine.

## Starter checklist

- Map components labelled with stage, dependency criticality, and regulatory class.
- Doctrine catalogue with IDs, owners, and test cases.
- Decision API instrumented with OpenTelemetry + map version stamps.
- Feature flags for high-blast-radius plays with expiry dates.
- Exception desk with time-bound break-glass tokens.
- Weekly governance review fed by agent-deny/advise logs.

Executable doctrine is not about eliminating humans; it is about letting agents move at machine speed while staying inside codified intent. When maps, doctrine, and policy engines co-evolve, governance becomes a living capability rather than a compliance artefact.
