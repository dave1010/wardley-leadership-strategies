---
title: Rugged Landscapes and Wardley Maps
description: Using Kauffman's NK model to understand why modularity, doctrine, and exploratory gameplay matter when mapping complex systems.
tags:
  - wardley-mapping
  - strategy
  - complexity
  - systems-thinking
  - leadership
slug: complexity/nk-model-rugged-wardley-maps
authors:
  - dave-hulbert
---

In the previous post, we explored how the [Viable System Model](/blog/ai-and-leadership/cybernetic-ai-leadership-with-the-viable-system-model) provides a blueprint for designing adaptive organisations. We saw how the VSM helps us balance autonomy and control, creating a system that can sense and respond to a complex environment. But what makes an environment complex in the first place?

**Kauffman's NK model explains why the left side of a Wardley Map feels chaotic, and it shows how leaders can deliberately smooth that landscape without losing strategic edge.** When N components are tightly coupled (high K), every move can collapse into a local optimum; modularity, doctrine, and adaptive gameplay are the tools for reshaping the terrain.

<!-- truncate -->

## NK ruggedness as a vocabulary for mapping

The NK model gives strategists two dials. **N** represents the number of components in your value chain, while **K** measures how entangled each component is with the others. When K is low, the fitness landscape is smooth, meaning you can tweak a component without destabilising the rest. As K rises, the landscape becomes rugged and full of local peaks. Organisations that are exploring high-K terrain can get trapped by path dependence, inertia, and accidental lock-in long before they reach the global optimum. Evolutionary biologists use the model to show why genetic innovation is messy, and strategists can use it to explain why building new capabilities can feel like climbing a scree slope in the dark.

Wardley Maps already point to this gradient: Genesis and Custom-Built components are in tangled terrain, while Commodity utilities have well-marked paths. The NK vocabulary sharpens that intuition. Mapping becomes more than just placing dots on a canvas; it becomes a conversation about which subsystems are drowning in complexity and which can be treated as interchangeable utilities.

## Translating K into Wardley Map decisions

Think of each component on your map as an NK gene whose fitness contribution depends on its neighbours. Genesis components generally have a high K value, as experimentation forces cross-team synchronisation, custom tooling, and hidden dependencies. Commodity components tend to have a low K value because interfaces, standards, and supplier ecosystems dampen interdependence.

This translation creates actionable heuristics:

- **High K ≈ left side of the map.** Expect ruggedness and false peaks, and lean on exploratory gameplays such as [Experimentation](/strategies/attacking/experimentation/) or sensing plays like [Weak Signal (Horizon)](/strategies/positional/weak-signal-horizon/) to keep moving.
- **Low K ≈ right side of the map.** Optimisation plays like [Last Man Standing](/strategies/markets/last-man-standing/) can reward aggressive efficiency because each component's fitness contribution is isolated.
- **Moving right requires lowering K.** Standardising interfaces through plays like [Open Approaches](/strategies/accelerators/open-approaches/) or structural efforts such as [Value Chain Disaggregation and Re-aggregation](/strategies/dealing-with-toxicity/value-chain-disaggregation-and-re-aggregation/) can reduce the coupling that keeps a component rugged.

## Shaping rugged landscapes with doctrine

Doctrine is the mechanism for tuning K across the map. Practices such as "Use appropriate methods" and "Standardise" are really instructions for lowering K, which makes it safer to move components toward the product and commodity stages. Conversely, doctrines about "Bias for the new" or "Challenge assumptions" signal the need to tolerate a high K value temporarily while exploring new terrain.

Leaders can apply three deliberate moves:

1. **Modularise to decouple.** Define APIs, adopt open standards, or encapsulate bespoke elements behind facades. Each move can slice K, smoothing the landscape and easing handoffs.
2. **Run parallel adaptive walks.** Instead of pushing a single path, fund multiple small experiments (different NK configurations) so that local optima can become stepping stones rather than prisons.
3. **Instrument for rugged feedback.** Measure lagging indicators such as rework, coordination cost, or deployment friction. Spikes in these metrics are signals that K is higher than expected.

## Using maps to design K-adjusting gameplay

Wardley Maps can expose dependency chains. Overlaying NK thinking can prompt fresh strategic choices:

- **Where to increase K.** Sometimes you want more ruggedness, as temporary coupling can create differentiation. Designing a proprietary interface that locks competitors out can raise K around a bottleneck and buy you time. However, you should use this sparingly and pair it with an exit plan.
- **Where to decrease K.** If a component needs to evolve, you can design a campaign of decoupling tactics, such as facade patterns, strangler architectures, or ecosystem partnerships. Each tactic can reduce K, which will steepen the evolution curve.
- **When to jump peaks.** If a subsystem remains rugged despite incremental moves, you can plan a leap: rewrite the platform, acquire a specialist, or migrate to a utility provider. In NK terms, you're performing a long-range mutation to escape a local maximum.

## Implications for AI-era leadership

AI expansion accelerates both N and K. Teams are stitching together models, data pipelines, orchestration layers, and compliance controls, each of which is a potential coupling point. NK awareness can help leaders decide when to embrace ruggedness (e.g., experimenting with frontier models) and when to commoditise aggressively (e.g., adopting managed ML ops utilities). It also clarifies why pure optimisation mindsets fail: gradient descent logic collapses on rugged landscapes unless you invest in exploration, resilience, and doctrinal guardrails.

Ultimately, the NK model invites leaders to treat Wardley Maps as dynamic terrain. You're not just observing evolution; you are reshaping K through your architectural choices, sourcing plays, and doctrine. The goal is to be intentionally rugged: create differentiation where it matters, smooth out everything else, and keep the organisation mobile enough to jump peaks when the landscape shifts under AI-driven change.

## References

- Kauffman, S. A. (1993). *The origins of order: Self-organization and selection in evolution.* Oxford University Press. [https://global.oup.com/academic/product/the-origins-of-order-9780195079517](https://global.oup.com/academic/product/the-origins-of-order-9780195079517)
- Levinthal, D. A. (1997). Adaptation on rugged landscapes. *Management Science, 43*(7), 934–950. [https://doi.org/10.1287/mnsc.43.7.934](https://doi.org/10.1287/mnsc.43.7.934)
