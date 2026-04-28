---
title: "Everything evolves"
tags: [components]
---


All parts of a value chain move from novel beginnings toward well defined commodities. Competition and user demand push activities, practices, and even mental models from experimentation to standardisation. Early on you might custom build an entire stack yourself, but over time those same capabilities become utilities that you simply plug into.
Supply and demand competition drives this progression.

This evolution means every component has a history and a future. Knowing that change is inevitable helps leaders anticipate when once "special" capabilities will become routine services and when new components may be about to appear.

Everything evolves: AI and automation capability is no exception. It’s diffusing from novel prototypes to industrialised utilities, with agents following the same product-to-commodity trajectory.

## 🗺️ **Wardley Map Example**

```mermaid
wardley-beta
title Everything Evolves

anchor User [0.95, 0.82]
component Differentiated AI Assistant [0.72, 0.42] (build)
component LLM Platform [0.48, 0.66] (buy)
component Cloud Compute [0.26, 0.86] (market)

User -> Differentiated AI Assistant
Differentiated AI Assistant -> LLM Platform
LLM Platform -> Cloud Compute

evolve Differentiated AI Assistant 0.60
evolve LLM Platform 0.80
```
