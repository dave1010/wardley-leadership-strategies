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

In the last post, we explored how [background AI can drive relentless improvement](/blog/ai-and-leadership/background-ai-continual-improvement), ensuring that the organisation is always operating from a position of strength. But a strong internal foundation is only half the battle. How do we anticipate and prepare for the moves of our competitors in a rapidly evolving, AI-driven landscape?

**Competitors rarely share their Wardley Maps, but language models can synthesize likely alternatives so you can prepare without guessing blindly.** Treating large language models as hypothesis engines lets leaders surface combinations of doctrine, climatic patterns, and intent that rival teams could pursue. The trick is to design the prompts like Monte Carlo simulations—generate many maps, prune bias, and focus your attention on the handful of plays that would genuinely disrupt your landscape.

## How this post fits the series

- Extends [positioning readiness](/blog/ai-and-leadership/positioning-readiness) with rehearsal tools rather than relying on intuition.
- Feeds back into [continuous map governance](/blog/ai-and-leadership/continuous-map-governance) by generating scenarios the governance stack must monitor.
- Connects to [NK-model rugged landscapes](/blog/complexity/nk-model-rugged-wardley-maps) for readers who want deeper complexity science behind the simulations.

<!-- truncate -->

## Build a simulation-ready baseline map

Start by codifying your current landscape in a language that LLMs can easily understand: concise, human-readable text. Write a narrative that names your users, the needs you meet, the steps in the value chain, and where each component sits on the evolution axis. Annotate this story with the doctrine you already apply and any inertia you are experiencing. Pair the narrative with public signals about your competitors—earnings calls, hiring surges, patent filings, or ecosystem commitments—so that the model can ground its synthesis in evidence you trust. The model should not invent data; it should only recompose the information you provide.

Once the baseline is set, you can generate competitor variants by toggling one assumption at a time. For example, you could run scenarios in which a hyperscaler partner decides to vertically integrate a component that you currently treat as a commodity. Another variant might assume that a startup is accelerating a custom platform toward the product stage faster than expected. Each run will yield an alternative map annotated with the competitor's likely doctrine choices—"Use appropriate methods," "Focus on high situational awareness," or "Challenge assumptions"—so that you can see which plays they would be likely to favour.

## Use LLMs like Monte Carlo engines

Rather than asking for a single "best guess" map, create batches of 50-100 small disruptions. Vary demand growth, regulatory friction, or access to capital. Ask the model to rank each outcome by its plausibility and potential impact. Collate the results into a heatmap that shows which combinations recur. Patterns might reveal that in 40% of the runs, a competitor launches an open-standard gambit when ecosystem risk spikes, while only 5% of the runs suggest a frontal price war.

To avoid model bias, it's a good idea to seed the runs with counter-narratives. Include data sources that contradict the consensus view, such as customer complaints or failed pilot announcements. Alternate between "optimistic competitor" and "constrained competitor" framings so that the model explores both aggressive and defensive plays.

## Anchor scenarios in doctrine and climate

Language models are excellent at synthesising doctrine-specific reasoning when you prompt them with explicit patterns. Ask the model to evaluate each simulated map against climatic patterns such as [Efficiency enables innovation](/climatic-patterns/efficiency-enables-innovation) or [Competitors' actions will change the game](/climatic-patterns/competitors-actions-will-change-the-game). When a scenario claims that a rival will commoditise your differentiator, the model should explain which doctrine (e.g., "Focus on user needs" or "Remove bias and duplication") is empowering that move and where inertia might be slowing them down.

For instance, if you're defending a regional logistics platform, you could simulate what would happen if a global competitor applied the "Bias for the new" doctrine alongside the climatic signal of accelerating infrastructure commoditisation. The LLM might surface a plausible play: bundling a commodity delivery API with embedded financing to erode your ecosystem leverage. That insight would tell you to watch the flow of capital in the supply chain, not just the parity of features.

## Manage "what if" depth without freezing

Wide scenario nets can lead to analysis paralysis. It's important to use tiered reviews: after each simulation batch, triage the maps into **watch**, **prepare**, or **ignore**. Only escalate a scenario when it triggers multiple doctrinal alarms or contradicts your current strategy. For example, a telecom operator might ignore simulations that show boutique entrants because they fail the "Use appropriate methods" doctrine test. However, they might prepare for scenarios in which a cloud provider combines satellite coverage (Genesis) with AI service commoditisation (Utility) to leapfrog the incumbent infrastructure.

Combine the LLM output with red-team workshops. Let humans challenge the simulated maps, annotate the most dangerous plays, and design counter-moves, such as accelerating your own open-standard push or pre-emptively investing in supply diversification.

## Keep simulation loops lean

Set explicit decision cadences—weekly tactical sweeps and quarterly deep dives—to ensure that the simulations are feeding real choices. Automate the archival of low-signal scenarios to avoid having to defend every hypothetical. Capture metrics such as the percentage of simulations that translate into doctrine updates, the number of counterplays executed, and the lead time gained when a predicted competitor move materialises.

Two hypothetical scenarios can help illustrate the payoff:

1. **Energy storage race** – Imagine a utility running LLM simulations to map how battery suppliers might leap from custom integrations to commodity services. By spotting a repeated pattern—competitors betting on the climatic shift toward capacity marketplaces—they could negotiate supplier exclusivity and launch a subscription grid-balancing offer before their rivals could move.
2. **Healthcare data platforms** – Picture a hospital network exploring what would happen if a tech giant turned its patient engagement tools into a commodity utility. The LLM might highlight a doctrine clash: the tech giant is prioritising "Standardise and automate," while the hospital is relying on bespoke workflows. That insight would push the leadership to modularise their platform, invest in open interfaces, and form a public-private data trust that would raise switching costs.

By treating LLMs as disciplined simulation partners rather than as oracle storytellers, you can explore a broad range of competitor strategies, lock onto the few that matter, and respond with precision—without drowning the organisation in defensive thrash. This practice reinforces the warning about the [collapse of differentiation](/blog/ai-and-leadership/collapse-of-differentiation) and feeds the rapid decision tempo outlined in [OODA-driven leadership cycles](/blog/ai-and-leadership/winning-ai-leadership-cycles-with-the-ooda-loop), all of which is rooted in the [OODA loop](/terms/ooda-loop).

## References

- Metropolis, N., & Ulam, S. (1949). The Monte Carlo method. *Journal of the American Statistical Association, 44*(247), 335–341. [https://doi.org/10.1080/01621459.1949.10483310](https://doi.org/10.1080/01621459.1949.10483310)
- Park, J. S., O’Brien, J. C., Cai, C. J., Morris, M. R., Liang, P., & Bernstein, M. S. (2023). Generative agents: Interactive simulacra of human behavior. *Proceedings of the 36th Annual ACM Symposium on User Interface Software and Technology*. [https://doi.org/10.48550/arXiv.2304.03442](https://doi.org/10.48550/arXiv.2304.03442)
- Rasal, S., & Hauer, E. J. (2024). Optimal decision making through scenario simulations using large language models. *arXiv*. [https://doi.org/10.48550/arXiv.2407.06486](https://doi.org/10.48550/arXiv.2407.06486)
