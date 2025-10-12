---
title: LLM-Driven Competitor Simulations
description: Using language models to stress-test your Wardley Maps against plausible competitor plays without drowning in hypotheticals.
tags:
  - ai-and-leadership
  - ai
  - leadership
  - wardley-mapping
  - strategy
  - simulation
slug: ai-and-leadership/llm-competitor-map-simulations
authors:
  - dave-hulbert
---

**Competitors rarely share their Wardley Maps, but language models can synthesize likely alternatives so you can prepare without guessing blindly.** Treating large language models as hypothesis engines lets leaders surface combinations of doctrine, climatic patterns, and intent that rival teams could pursue. The trick is to design the prompts like Monte Carlo simulations—generate many maps, prune bias, and focus your attention on the handful of plays that would genuinely disrupt your landscape.

<!-- truncate -->

## Build a simulation-ready baseline map

Start by codifying your current landscape in the language LLMs handle best: concise, human-readable text. Write a narrative that names your users, the needs you meet, the value-chain steps involved, and where each component sits on the evolution axis. Annotate this story with doctrine you already apply and any inertia you feel. Pair the narrative with public signals about competitors—earnings calls, hiring surges, patent filings, or ecosystem commitments—so the model grounds its synthesis in evidence you trust. The model should not invent data; it should only recompose what you supply.

Once the baseline is set, generate competitor variants by toggling one assumption at a time. For example, run scenarios where a hyperscaler partner decides to vertically integrate a component you currently treat as commodity. Another variant might assume a startup accelerates a custom platform toward product stage faster than expected. Each run yields an alternative map annotated with the competitor's likely doctrine choices—"Use appropriate methods", "Focus on high situational awareness", or "Challenge assumptions"—so you can see which plays they would favour.

## Use LLMs like Monte Carlo engines

Rather than asking for a single "best guess" map, create batches of 50-100 small perturbations. Vary demand growth, regulatory friction, or access to capital. Ask the model to rank each outcome by plausibility and potential impact. Collate the results into a heatmap showing which combinations recur. Patterns might reveal that in 40% of runs, a competitor launches an open-standard gambit when ecosystem risk spikes, while only 5% of runs suggest a frontal price war.

To avoid model bias, seed the runs with counter-narratives. Include data sources that contradict the consensus view, such as customer complaints or failed pilot announcements. Alternate between "optimistic competitor" and "constrained competitor" framings so the model explores both aggressive and defensive plays.

## Anchor scenarios in doctrine and climate

Language models excel at synthesising doctrine-specific reasoning when you prompt them with explicit patterns. Ask the model to evaluate each simulated map against climatic patterns such as [Efficiency enables innovation](/climatic-patterns/efficiency-enables-innovation) or [Competitors' actions will change the game](/climatic-patterns/competitors-actions-will-change-the-game). When a scenario claims a rival will commoditise your differentiator, the model should explain which doctrine (e.g., "Focus on user needs" or "Remove bias and duplication") empowers that move and where inertia might slow them down.

For instance, if you're defending a regional logistics platform, simulate what happens if a global competitor applies "Bias for the new" doctrine alongside the climatic signal of accelerating infrastructure commoditisation. The LLM may surface a plausible play: bundle a commodity delivery API with embedded financing to erode your ecosystem leverage. That insight tells you to watch supply chain capital flows, not just feature parity.

## Manage "what if" depth without freezing

Wide scenario nets risk analysis paralysis. Use tiered reviews: after each simulation batch, triage maps into **watch**, **prepare**, or **ignore**. Only escalate a scenario when it triggers multiple doctrinal alarms or contradicts your current strategy. For example, a telecom operator might ignore simulations showing boutique entrants because they fail the "Use appropriate methods" doctrine test, yet prepare for scenarios where a cloud provider combines satellite coverage (Genesis) with AI service commoditisation (Utility) to leapfrog incumbent infrastructure.

Combine LLM output with red-team workshops. Let humans challenge the simulated maps, annotate the most dangerous plays, and design counter-moves such as accelerating your own open-standard push or pre-emptively investing in supply diversification.

## Keep simulation loops lean

Set explicit decision cadences—weekly tactical sweeps and quarterly deep dives—so the simulations feed real choices. Automate archival of low-signal scenarios to avoid defending every hypothetical. Capture metrics: percentage of simulations that translate into doctrine updates, number of counterplays executed, and lead time gained when a predicted competitor move materialises.

Two hypothetical scenarios illustrate the payoff:

1. **Energy storage race** – Imagine a utility running LLM simulations to map how battery suppliers might leap from custom integrations to commodity services. By spotting a repeated pattern—competitors betting on the climatic shift toward capacity marketplaces—they could negotiate supplier exclusivity and launch a subscription grid-balancing offer before rivals moved.
2. **Healthcare data platforms** – Picture a hospital network exploring what would happen if a tech giant turned patient engagement tools into a commodity utility. The LLM might highlight a doctrine clash: the tech giant prioritises "Standardise and automate" while the hospital relies on bespoke workflows. That insight would push leadership to modularise their platform, invest in open interfaces, and form a public-private data trust that raises switching costs.

By treating LLMs as disciplined simulation partners rather than oracle storytellers, you can explore a broad space of competitor strategies, lock onto the few that matter, and respond with precision—without drowning the organisation in defensive thrash.
