# Contributing and Site Context

- The site is built with Docusaurus.
- Main files are in `./docs`

## Strategies

### Files and Links

- Strategies are in `./docs/strategies`
- Strategies are in a category, eg `./docs/strategies/category-name`
- Each strategy is in its own folder, eg `./docs/strategies/category-name/strategy-name`
- Each strategy has an index.md file, which is the main entry point for the strategy, eg `./docs/strategies/foo/bar/index.md`
- Markdown links to strategies are in the format `[Bar](/strategies/foo/bar)`
- Read the file `./site-data/strategy-paths.txt` for a list of all strategies and their URLs. (These are all mounted on `/strategies`.)

### Strategy Content

Strategies should aim to follow this format as closely as possible.

1. Front matter YAML
2. 1 single senence accessible description in bold (`**`)
3. Quote from Simon Wardley. Eg

   ```md
   > *"Driving a market to a standard to create a cost of transition for others or remove the ability of others to differentiate."*
   >
   > - Simon Wardley
   ```

4. `## 🤔 **Explanation**`
   - Start with a subsection `## What is <strategy name>?`, which should be a paragraph or 2 and could include a few bullet points if a list is helpful. Only link to other strategies here if it is helpful to understand where it sits, eg if it is a sub-strategy or very closely related.
   - A few other subsections, again, only covering high level information. Eg `## Why use <strategy name>?`, `## How to use <strategy name>?`, `## Types of <strategy name>`, `## What does <strategy name> achieve?`, `## Core principles of applying <strategy name>`, `## Strategic rationale of <strategy name>`, `## How does <strategy name> affect the landscape?` (could add a Wardley Map in here). Consider value proposition, purpose, objectives, fundamentals, effectiveness, etc.
   - There can be flexibility within this section, where it makes sense for the particular strategy.
5. `## 🗺️ **Real-World Examples**`
   - 2 to 4 different examples, with a `###` heading each. Ideally specific but general if needed.
   - If there are no good examples then hypothetical examples are OK, but make it clear they're hypothetical.
   - One or 2 paragraphs max.
   - Failed examples are OK, but make it clear they're failed.
6. `## 🚦 **When to Use / When to Avoid**`. Include the Assessment Tool (see below). If more information is helpful then also include a paragraph for `## Use when` or `## Avoid when`.
7. `## 🎯 **Leadership**`
   Think about what a leader would need to know. Start with `### Core challenge` paragraph, `### Key leadership skills required` bullet points and `### Ethical considerations` paragraph. Add other subsections as needed.
8. `## 📋 **How to Execute**`
   - Either a simple ordered list or a numbered subsections.
9.  `## 📈 **Measuring Success**`
   - Unordered list of 3-5 bullet points. Metrics provided should be specific and indicative of the strategy's impact.
10. `## ⚠️ **Common Pitfalls and Warning Signs**`
    - `###` subsection and a sentence or 2 for each one. These should highlight realistic risks and be distinct from the "When to Avoid" criteria.
11. `## 🧠 **Strategic Insights**`
    - This is where the big ideas go.
    - Only put relevant insights here, not generic ones.
    - Consider evolution stages, counterplay, value chains, users, markets, leverage, higher order thinking, wider goals, etc.
    - Also if there's anything specific to the strategy that is not covered in the other sections.
    - Use `###` subsections and favour paragraphs over bullets for this section.
12. `## ❓ **Key Questions to Ask**`
    - Unordered list of 3-6 bullet points: `**Topic:** Question?`. These questions should be designed to be thought-provoking and directly assist users in applying the strategy to their specific context.
13. `🔀 **Related Strategies**`
    - Unordered list of 3-6 bullet points with links to other strategies.
    - Eg `- [Bar](/strategies/foo/bar) - <what Bar is in the context of this strategy.> <optional extra info, like how it relates to this strategy>`
14. `## 📚 **Further Reading & References**`
    - Unordered list of 3-6 bullet points with links to articles, books, academic papers, etc.
    - Eg `- [Title](https://site) - <description of the article, book, etc.> <optional extra info, like how it relates to this strategy>`

### Front Matter

Strategies have a front matter section at the top of the file, which is a YAML object. The front matter looks like this. There may be missing or additional fields for some strategies.

```yaml
---
title: Cooperation
description: Working with others, even competitors, to achieve a goal.
tags: [cooperation, accelerators, collaboration, partnerships, standards, alliances, ecosystem, mutual benefit]
---
```

### Tags

- Read the file `./site-data/tags.txt` for a list of current tags.
- Don't tag content with the strategy name, unless it is a parent or very generic strategy.

### Assessment Readiness Tool

Strategies _should_ have an assessment tool when appropriate. The assessment tool is a simple checklist of statements that the user can mark as true, false or uncertain. The tool is specific to each strategy. The component does not need importing into the MDX. Embed the component like this:

```md
<Assessment strategyName="Foo">
  <MapSignals>
    <li>Our map shows a critical components in an early stage of evolution.</li>
    <li>We control a critical bottleneck or dependency in the value chain.</li>
  </MapSignals>
  <Readiness>
    <li>We're good at managing inertia.</li>
    <li>We have a bias towards new.</li>
  </Readiness>
</Assessment>
```

The `MapSignals` list items should be things that someone could answer when looking at a map they've just made.
These should not be generic.
`Readiness` is more about Doctrine and organisational capability, maturity and culture. These should be specific skills
or capabilities that are directly relevant to the strategy - i.e. one or more of the steps in "How to Execute" hinges on them.
or at least generic skills that make it clear where they are applied in relation to the strategy.
4-7 of each is a good number but stick to what's important: insignificant indicators will skew the results.

## Terms

- Terms are for words or phrases that are specific to strategies, business, Wardley Mapping, etc.
- We're not trying to create a dictionary of all words or phrases.
- Don't make terms pages for strategies.
- Terms are in `./docs/terms/<term>.md`. eg `./docs/terms/critical-mass.md`.
- Read the file `./site-data/terms.txt` for a list of all terms. These are mounted on `/terms`.
- H1 heading title for the term, eg `# Critical Mass`
- Empty line, then 1 or 2 sentences describing the term. This should be a simple definition, not a long explanation.
- Link to a strategy only if it is *very* relevant
- Link to other terms only if it is *very* relevant: `[Foo](/terms/foo)`


## Tone, Voice and Style

- A mix of paragraphs and bullet points, tending towards paragraphs.
- Bold and italic for emphasis is OK but don't overuse.

Remember that there are 60+ strategies. Consider whether content is applicable to *all*, *many*, *few* or just *one* strategy. Most content in a stragegy should be relevant to *only* that strategy. There might be some content that is relevant to a few strategies, but it should be the exception rather than the rule. If content applies to many or all strategies, it should be in the main site content, not in a specific strategy. Also consider that strategies are related: sub strategies, counterplay, etc. If content is relevant to a sub-strategy or counterplay, it should be in the sub-strategy or counterplay, not in the main strategy (which links and provides a summary).

## Markdown formatting

- Markdown lists start with `- `.
- 1 empty line before and after a list, heading, or blockquote.
- H2s (`##`) have **bold text** and an emoji. Other headings don't.

## Maintenance Scripts

The utilities in `./scripts` help keep related links in sync when you edit many strategy files or reorganise content. See [scripts/README.md](./scripts/README.md) for a workflow that checks for missing and reciprocal links before adding them automatically.
