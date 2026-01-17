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
- Browse the folders in `./docs/strategies` to see every strategy category and slug. Routes map to `/strategies/<category>/<strategy>`.

### Strategy Content

Strategies should aim to follow this format as closely as possible.

1. Front matter YAML
2. 1 single senence accessible description in bold (`**`)
3. Quote from Simon Wardley if he directly references the strategy. Eg

   ```md
   > *"Driving a market to a standard to create a cost of transition for others or remove the ability of others to differentiate."*
   >
   > - Simon Wardley
   ```

   If Wardley hasn't mentioned the strategy, add a note after the description saying it
   "isn't explicitly mentioned" in his [On 61 different forms of gameplay](https://blog.gardeviance.org/2015/05/on-61-different-forms-of-gameplay.html). Refactoring is an example of this approach.

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
11. `## 🧠 **Strategic Insights**` – see the [Strategic Insights](#strategic-insights) section for guidance.
12. `## ❓ **Key Questions to Ask**`
    - Unordered list of 3-6 bullet points: `**Topic:** Question?`. These questions should be designed to be thought-provoking and directly assist users in applying the strategy to their specific context.
13. `🔀 **Related Strategies**`
    - Unordered list of 3-6 bullet points with links to other strategies.
    - Eg `- [Bar](/strategies/foo/bar) - <what Bar is in the context of this strategy.> <optional extra info, like how it relates to this strategy>`
14. `⛅ **Relevant Climatic Patterns**`
    - Unordered list of 2-5 bullet points with links to climatic patterns.
    - Each bullet should use `rel:` to describe how the pattern connects to the strategy (`trigger`, `influence`, etc.).
    - Eg `- [Efficiency enables innovation](/climatic-patterns/efficiency-enables-innovation) – trigger: industrialisation opens the door for alliances.`
15. `## 📚 **Further Reading & References**`
    - Unordered list of 3-6 bullet points with links to articles, books, academic papers, etc.
    - Eg `- [Title](https://site) - <description of the article, book, etc.> <optional extra info, like how it relates to this strategy>`

### Front Matter

Strategies have a front matter section at the top of the file, which is a YAML object. The front matter looks like this. If there are additional fields for some strategies then leave them in.

The `authors` field is an array of author IDs, which must match the keys in `/data/authors/authors.json`. Don't specify an author in the YAML if it's not in the JSON. The author YAML can always be added later if needed.

```yaml
---
title: Cooperation
description: Working with others, even competitors, to achieve a goal.
tags: [cooperation, accelerators, collaboration, partnerships, standards, alliances, ecosystem, mutual benefit]
authors: [dave-hulbert]
stages:
  - Genesis
  - Custom-Built
goals:
  - Accelerate adoption
  - Build ecosystem leverage
  - Secure long-term investment
pressures:
  - Limited resources or capacity
  - Market is nascent or undefined
  - Facing dominant incumbent
leadership_focus:
  - Trust-building
  - Partner choreography
  - Shared governance discipline
quick_signals:
  - The work is too risky or capital intensive to pursue alone.
  - Your map reveals complementary players around the same user need.
  - Speed to establish a de facto approach matters more than owning everything.
momentum_moves:
  - Map mutual value exchanges and publish the shared intent.
  - Pilot a narrow collaboration to build trust and working rhythms.
  - Create a lightweight governance forum that keeps decisions transparent.
watch_outs:
  - Misaligned incentives that turn collaboration into competition.
  - Sharing differentiating capabilities without a plan to protect them.
  - Cultural friction or slow decision cycles between partners.
effort_level: Cross-Functional Initiative
time_horizon: Medium-term shaping
---
```

#### Strategy Navigator metadata

The Strategy Navigator metadata lives at the top level of the front matter. Keep these keys present on every strategy page that should appear in the navigator and update them whenever the content changes. Use the following structure:

- `description` – a one sentence overview of the play (also used as the navigator summary).
- `stages` – evolution stages that best match the play (e.g. `Genesis`, `Custom-Built`, `Product`, `Commodity/Utility`).
- `goals` – high level outcomes the play advances.
- `pressures` – contextual pressures or triggers that make the play relevant.
- `leadership_focus` – leadership disciplines or mindsets that need emphasis.
- `quick_signals` – field signals that suggest the play might fit. Keep them specific and actionable.
- `momentum_moves` – first actions to build momentum once the play is selected.
- `watch_outs` – realistic risks or pitfalls to monitor.
- `effort_level` – choose one of `Lean Experiment`, `Cross-Functional Initiative`, or `Enterprise Transformation`.
- `time_horizon` – choose one of `Fast impact`, `Medium-term shaping`, or `Long-term positioning`.

The navigator summary reuses the `description` field, so keep that sentence short and accessible.

After editing any of the Strategy Navigator metadata run `npm run generate:strategy-navigator` to regenerate `src/data/strategyNavigator.ts`.

### Tags

- Check existing strategy front matter in `./docs/strategies/**/index.md` to understand the current tag set.
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

### Strategic Insights

The `## 🧠 **Strategic Insights**` section of a strategy is where the big ideas live. It's critical that these are well thought out, expert insights that are related to the specific strategy. Not just a vague idea or summary. These should add significant depth to the page. They can even expand the strategy beyond its confines a bit, whether that's more practical business thoughts, mental models, philosophy (don't get carried away!), left field techniques or practices, etc. See [notes/authoritative-content-writing.md](./notes/authoritative-content-writing.md) for additional guidance on writing with authority, [notes/strategy-page-best-practices.md](./notes/strategy-page-best-practices.md) for examples of what high-quality strategy content covers, and [notes/excellent-essay-writing.md](./notes/excellent-essay-writing.md) for a step-by-step playbook on crafting persuasive essays.

- Only put relevant insights here, not generic ones.
- Consider evolution stages, counterplay, value chains, users, markets, leverage, higher order thinking, wider goals, etc.
- Also if there's anything specific to the strategy that is not covered in the other sections.
- Use `###` subsections and favour paragraphs over bullets for this section.
- Each insight can be multiple paragraphs if it needs to dive deep or cover broad ideas.

## Blog

The blog currently focuses on the **AI and Leadership** series. All posts live in `./blog`.

- Blog posts are single Markdown files in the root of `./blog`.
- Name files using the publish date followed by a short slug, e.g. `2025-10-05-age-of-diffused-agency.md`.
- Keep the slug in the filename aligned with the `slug` field in the front matter (see below).
- Author metadata lives in `./blog/authors.yml`. Reuse existing author IDs; add new authors there first if needed.
- Each post starts with YAML front matter. Follow the structure already used.
- Add `<!-- truncate -->` after the intro paragraph(s) so the listing page shows an excerpt.
- Link to other content when helpful for context.

## Terms

- Terms are for words or phrases that are specific to strategies, business, Wardley Mapping, etc.
- We're not trying to create a dictionary of all words or phrases.
- Don't make terms pages for strategies.
- Terms are in `./docs/terms/<term>.md`. eg `./docs/terms/critical-mass.md`.
- The Markdown files in `./docs/terms` are the authoritative list of terms, each mounted on `/terms`.
- H1 heading title for the term, eg `# Critical Mass`
- Empty line, then 1 or 2 sentences describing the term. This should be a simple definition, not a long explanation.
- Link to a strategy only if it is *very* relevant
- Link to other terms only if it is *very* relevant: `[Foo](/terms/foo)`

## Leadership Skills

- Leadership skills are in `./docs/leadership-skills/<skill>.md` and mounted on `/leadership-skills/<skill>`.
- Each skill page should have a single H1 title (eg `# Strategic Sensemaking`) followed by 1-2 short paragraphs describing the capability.
- The `## 🎯 **Leadership**` section of every strategy should include a `### Key leadership skills required` (or similar) subsection.
- Every bullet in the leadership skills subsection must link to the relevant leadership skill page, e.g. `- [Strategic sensemaking](/leadership-skills/strategic-sensemaking) — Brief reason it matters.`

## Books

- Books capture sources that are referenced by strategies or terms. Focus on works that are cited multiple times or provide foundational context.
- Book pages live in `./docs/books/<book-name>.md` and the H1 should match the book title.
- Start with 1-2 short paragraphs that cover the subtitle (if useful), the author(s), and the key ideas readers should know. Only include details you can verify.
- Add a `## Referenced in` section that lists internal links to every strategy or term that cites the book. Keep the list updated when adding new references elsewhere on the site.
- When editing a strategy, prefer linking to the existing book page (eg `[Platform Revolution](/books/platform-revolution)`) instead of an external retailer or review. Create or update the book page first if it does not exist.
- Use the `<BookRef isbn="9781234567890" />` component when referencing a book inside MDX content. The component resolves the ISBN against the site-wide books index generated by `src/books-index/index.js`, so you don't need to import it manually.


## Tone, Voice and Style

- A mix of paragraphs and bullet points, tending towards paragraphs.
- Bold and italic for emphasis is OK but don't overuse.
- See [notes/authoritative-content-writing.md](./notes/authoritative-content-writing.md) for advice on writing with authority.

Remember that there are 60+ strategies. Consider whether content is applicable to *all*, *many*, *few* or just *one* strategy. Most content in a stragegy should be relevant to *only* that strategy. There might be some content that is relevant to a few strategies, but it should be the exception rather than the rule. If content applies to many or all strategies, it should be in the main site content, not in a specific strategy. Also consider that strategies are related: sub strategies, counterplay, etc. If content is relevant to a sub-strategy or counterplay, it should be in the sub-strategy or counterplay, not in the main strategy (which links and provides a summary).

## Markdown formatting

- Markdown lists start with `- `.
- 1 empty line before and after a list, heading, or blockquote.
- H2s (`##`) have **bold text** and an emoji. Other headings don't.

## Markdown Linting

This project uses `markdownlint-cli` to enforce markdown style and consistency.

To check for linting errors in the `docs` directory, run:

```bash
npm run lint:md
```

To automatically fix linting errors, run:

```bash
npm run lint:md:fix
```

## Maintenance Scripts and Tests

The utilities in `./scripts` help keep related links in sync when you edit many strategy files or reorganise content. See [scripts/README.md](./scripts/README.md) for a workflow that checks for missing and reciprocal links before adding them automatically.

When changing any content in `/docs`, run the Python tests to check for content quality issues:

```bash
python -m pytest tests
```
