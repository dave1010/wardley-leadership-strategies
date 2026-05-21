---
name: mermaid-wardley-maps
description: Reference guide for creating Wardley Maps with Mermaid wardley-beta syntax, coordinates, and components.
---

# Wardley Maps (v11.14.0+)

From https://mermaid.ai/open-source/syntax/wardley.html

> Wardley Maps are visual representations of business strategy that map value chains and component evolution. They help identify strategic opportunities, dependencies, and guide technology decisions.

## Introduction

Wardley Maps position components along two axes:

- **Visibility** (Y-axis): How visible/valuable a component is to users (0.0 = infrastructure, 1.0 = user-facing)
- **Evolution** (X-axis): How evolved/mature a component is (0.0 = genesis/novel, 1.0 = commodity/utility)

This dual positioning enables strategic analysis of:

- Value chain dependencies
- Evolution of components over time
- Build vs. buy decisions
- Inertia and resistance to change

## Basic Example

```mermaid-example
wardley-beta
title Tea Shop Value Chain

anchor Business [0.95, 0.63]
component Cup of Tea [0.79, 0.61]
component Tea [0.63, 0.81]
component Hot Water [0.52, 0.80]
component Kettle [0.43, 0.35]
component Power [0.10, 0.70]

Business -> Cup of Tea
Cup of Tea -> Tea
Cup of Tea -> Hot Water
Hot Water -> Kettle
Kettle -> Power

evolve Kettle 0.62
evolve Power 0.89

note "Standardising power allows Kettles to evolve faster" [0.30, 0.49]
```

## Syntax

### Diagram Declaration

Every Wardley diagram starts with the `wardley-beta` keyword:

```mermaid
wardley-beta
title Your Map Title
size [width, height]
```

- `wardley-beta` - Required diagram type identifier (beta release)
- `title` - Optional title displayed at top
- `size` - Optional canvas dimensions in pixels (default: `[1100, 600]`)

### Coordinate System

**IMPORTANT**: Wardley Maps use the OnlineWardleyMaps (OWM) format: `[visibility, evolution]`

- **First value (Visibility)**: 0.0-1.0 (bottom to top) - Y-axis position
- **Second value (Evolution)**: 0.0-1.0 (left to right) - X-axis position

This is **opposite** of typical (x, y) notation!

```mermaid
wardley-beta
title Coordinate Examples

component Infrastructure [0.30, 0.20]  # Low visibility, low evolution
component Product [0.70, 0.60]         # High visibility, mid evolution
component User Need [0.90, 0.95]       # High visibility, high evolution
```

### Components and Anchors

#### Components

```mermaid
component Name [visibility, evolution]
component Name [visibility, evolution] label [offsetX, offsetY]
component Name [visibility, evolution] (decorator)
```

Example:

```mermaid-example
wardley-beta
title Components

component API [0.60, 0.70]
component Database [0.40, 0.85] label [-50, 10]
component "Custom Service" [0.55, 0.35]
```

#### Anchors

Anchors represent users or customers with bold labels:

```mermaid-example
wardley-beta
title Anchors

anchor Customer [0.90, 0.95]
anchor Business [0.85, 0.90]

component Service [0.70, 0.75]

Customer -> Service
Business -> Service
```

### Decorators

#### Inertia
