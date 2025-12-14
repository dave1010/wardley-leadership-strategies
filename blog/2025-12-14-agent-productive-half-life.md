---
title: "The Productive Half-Life of AI Agents"
description: Track how long AI agents stay useful before a human must step in, and design leadership rituals to extend that window without losing control.
tags:
  - ai-and-leadership
  - leadership
  - wardley-mapping
  - autonomy
  - productivity
slug: ai-and-leadership/agent-productive-half-life
authors:
  - dave-hulbert
---

Every executive asks the same question in different words: *how long can we let the agent run before someone has to look over its shoulder?* Call that interval the **productive half-life**—the span of time where an AI agent remains helpful, safe, and aligned without human intervention. There is real research to stand on here: [METR’s time-horizon studies](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/) measure how long agents can pursue a task at 50% reliability and how that varies by domain; [OSWorld](https://os-world.github.io/), [RealWebAssist](https://arxiv.org/abs/2404.07972), TOOLATHLON, and [SWE-bench Verified](https://openai.com/index/introducing-swe-bench-verified/) all probe long, messy task chains rather than single steps. Human–automation trust work ([Lee & See](https://csel.eng.ohio-state.edu/productions/intel/research/trust/Lee%20%26%20See%20Trust%20Review.pdf); [CHI 2019 Guidelines for Human–AI Interaction](https://www.microsoft.com/en-us/research/project/guidelines-for-human-ai-interaction/)) and decades of mixed-initiative research ([Horvitz](https://erichorvitz.com/chi99horvitz.pdf); [Hearst](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/11/mixedinit.pdf); [Bradshaw](https://www.jeffreymbradshaw.net/publications/Dimensions%20chapter.pdf)) show when people should re-enter the loop. The longer the half-life, the more the team can focus on higher-order choices instead of mechanical supervision—and the clearer the protocol for when to step back in.

<!-- truncate -->

![Agent half lives](2025-12-14-agent-productive-half-life.jpg)

## Why the half-life matters now (and how it’s measured)

AI agents have moved from narrow tools to broad collaborators. They draft policies, sequence experiments, and orchestrate workflows. But capability without a measure of sustainable autonomy is just bravado. METR’s horizon results give a capability ceiling—a rough answer to “how long can a model go before success drops below 50%?”—that doubles every few months in some domains and shifts across fields. Benchmarks like OSWorld and RealWebAssist surface where that ceiling collapses under GUI ambiguity or evolving instructions. Half-life turns this research into an operational metric: how many minutes, hours, or days before drift, ambiguity, or error accumulation demands a person in the loop.

Some anchor points to stand on:

- METR’s horizon data shows task length at 50% success and varies by domain, grounding half-life in empirical ceilings instead of vibes.
- OSWorld and RealWebAssist expose where long-horizon agents trip over GUI grounding and evolving user intent—practical failure modes that shrink half-life.
- SWE-bench Verified demonstrates how “end-to-end until merge” reliability still lags humans, reminding leaders that organisational context tightens the horizon.

## Mapping the decay curve

On a Wardley Map, components evolve from bespoke prompts to utility-like platforms. The half-life shortens in Genesis (agents hallucinate, context shifts) and lengthens as components commoditise (data quality stabilises, interfaces harden). Leaders should annotate maps with current half-life targets for each agent-facing component. When a component evolves, adjust the half-life expectation and the governance posture that surrounds it. Think of the half-life as three multiplicative factors: (1) model capability ceiling (the METR-style horizon for the task class), (2) system design (interfaces, guardrails, observability, and drift monitors), and (3) organisational feedback latency (how quickly humans review traces and intervene). Improving any factor lengthens productive autonomy; neglecting one collapses the whole product.

## Signals that the half-life is expiring

Concept drift is the early warning: agents trained on fast-changing domains start inventing policies or misinterpreting contracts. Drift literature shows the hazard rate rises as distributions shift; human-in-the-loop drift handling is often the safest adaptation. When incident reviews mention “model made a plausible but wrong call” more than once, the half-life is already too long. Opacity creeps in as agents call other agents, blurring attribution; Normal Accident Theory predicts tightly coupled systems hide root causes. If you cannot explain which upstream decision drove a bad output within a sprint, shorten the half-life or add breakpoints. Feedback loops that lag are another tell—weekly audits cannot rescue a system whose error rate spikes in hours.

## Extending the half-life without losing control

Make observability an affordance, not a bolt-on. Ship agents with native traces—source prompts, retrieved context, confidence ranges, and a change log of self-modifications—so humans can re-enter the loop at the right moment, not at random. Pair autonomy with contractual bounds inspired by adjustable autonomy research: define which actions an agent may take unaided, what budget it can spend, and how to degrade gracefully. When the half-life clock hits zero, the contract hands control to a person, not to chaos. Rotate reviewers like incident commanders on a rota that matches the half-life: a two-hour interval calls for short, clear handovers; a two-day interval needs richer context but fewer interruptions. Finally, probe the boundary by borrowing from [OODA loops](/blog/ai-and-leadership/winning-ai-leadership-cycles-with-the-ooda-loop): inject synthetic edge cases to see when the agent fails. If it survives a week of probes, widen the half-life; if not, shrink it before production users feel the pain.

## Leadership rituals for a world of longer-lived agents

Use half-life reviews during cadence planning the way agile teams use velocity: inspect trends, name the decay causes—data freshness, policy shifts, coupling—and pick experiments to extend the number. Keep the metric co-evolving with doctrine like [Use Appropriate Methods](/doctrines/use-appropriate-methods); a bespoke agent in a regulated domain might need a 30-minute half-life while a commoditised summariser can run for days with light sampling. Anchor this in High Reliability Organisation principles: preoccupation with failure keeps the half-life honest, and deference to expertise ensures the right humans step in when the clock expires. Make the number public and narrative: publish the current half-life and the specific conditions that would reset it, so teams trust autonomy because they know the escape hatches.

## Measuring success

You know the approach is working when the half-life rises quarter over quarter without incident severity creeping up alongside it. Mean time to human intervention should match the published half-life targets rather than spike unpredictably. Probe suites ought to catch degradation faster than customer feedback channels, proving that you are learning from your own tests before users pay the cost. Governance frameworks like [NIST AI RMF](https://nvlpubs.nist.gov/nistpubs/ai/nist.ai.100-1.pdf) and [ISO/IEC 42001](https://www.iso.org/standard/42001) expect explicit controls; half-life targets and reviews give you a concrete, repeatable control surface. The best indicator is when agents self-report confidence and boundary violations at or before the half-life threshold—machine humility as a service to human oversight.

## The future of productive autonomy

The goal is not to eliminate humans from the loop; it’s to make their presence timely and decisive. The productive half-life gives leaders a shared language to balance ambition with assurance. As agents grow more capable, the organisations that win will be those who design for longer, safer stretches of autonomy—and know exactly when to step back in. Start with the general research spine, then tune it to your organisation’s architecture, rhythms, and appetite for risk.
