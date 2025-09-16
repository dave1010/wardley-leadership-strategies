---
title: Refactoring
description: Internally reorganising and repurposing legacy components to salvage value while eliminating toxicity.
tags: [refactoring, dealing-with-toxicity, legacy, transformation, reuse, reorganization, internal disposal]
authors: [dave-hulbert]
stages:
  - Product
  - Commodity/Utility
goals:
  - Reduce legacy drag
  - Stabilise operations
pressures:
  - Legacy system drag
  - Limited resources or capacity
  - Need to go faster than internal bureaucracy
leadership_focus:
  - Change management
  - Architectural thinking
  - Talent redeployment
quick_signals:
  - A legacy platform soaks up disproportionate budget and attention.
  - Maps reveal components worth keeping alongside toxic ones to retire.
  - The organisation needs runway to transition without a risky big-bang cutover.
momentum_moves:
  - Catalogue components, skills and data flows to inform decisions.
  - Sequence the refactor so value is released incrementally.
  - Communicate redeployment plans early to maintain morale and focus.
watch_outs:
  - Letting the effort sprawl without clear governance.
  - Refactoring only the technology and ignoring process or people impacts.
  - Running dual systems indefinitely because decisions are postponed.
effort_level: Enterprise Transformation
time_horizon: Long-term positioning
---

Internally **reorganizing and repurposing components of a legacy system** to salvage value or reduce toxicity. Refactoring means breaking the old asset into parts, reassigning useful parts to new roles, and eliminating the rest. Akin to code refactoring in software, but applied to business assets.

:::note
**Refactoring** isn't explicitly mentioned in Wardley's [On 61 differnt forms of gameplay](https://blog.gardeviance.org/2015/05/on-61-different-forms-of-gameplay.html).
:::

## 🤔 **Explanation**

Rather than outright disposal or sale, refactoring keeps the asset in-house but **transforms it**. Origin is from programming (improving internal structure without changing external behavior). In business, it might mean dividing a legacy operation into components: some can merge into other departments, some tasks automated or given new purpose, and only the truly unusable parts are shed.

Purpose: *reduce losses and integrate leftover value* into the organization in a leaner way.

Key principles: identify components (people, tech, processes) that can be useful elsewhere. For example, maybe the product is dead but the underlying database could support another service, or the team can be moved to a different project with slight retraining. By refactoring, you gradually wind down the old structure while not wasting everything.

## 🗺️ **Real-World Examples**

### Software/Tech

Many companies "refactor" their legacy IT. E.g., taking an old mainframe application and breaking it into microservices or migrating functions to modern systems one piece at a time (some parts might be turned into APIs for new apps). In doing so, they preserve critical logic or data (value) but eliminate the monolithic, hard-to-maintain structure. IBM's example with moving combustion engine production offshore (per forum) was partly a physical refactoring, shifting location and focusing that unit solely on being a cost-efficient piece until shut down.

### Industrial

A car manufacturer phasing out combustion engines might refactor its production: move older engine production lines to a lower-cost factory (like VW moving them to Poland) and repurpose some facilities to build electric components. They aren't scrapping everything: they reassign factories or workers to new tasks where possible (e.g., train engine designers to work on electric drive trains). Ultimately, when combustion ends, they have minimized domestic impact and squeezed remaining value from those engines in a cheaper setting. They have a mix of sweat (in cheaper plant) and integration (transition workforce to new tech).

### Hypothetical

A publishing company has a huge staff for print magazine layout, a diminishing need. Instead of mass layoffs, it refactors: it retrains a chunk of them in digital content layout and transfers them to the web team (useful skill reuse), it automates some layout tasks with software, and for the purely excess roles, it offers either internal transfers (some designers might move to marketing department) or packages out. The physical space freed by a smaller print team is converted into a multimedia studio for new digital content. This way, the company gradually morphs the legacy print operation into a leaner, partly repurposed unit that complements the digital side, rather than a sudden chop.

## 🚦 **When to Use / When to Avoid**

<Assessment strategyName="Refactoring">
  <MapSignals>
    <li>We are managing a legacy system or operation whose relevance or value is declining.</li>
    <li>Our mapping reveals subcomponents of the legacy asset with ongoing or potential value.</li>
    <li>The cost of full disposal is high, politically or practically, and we need a less abrupt exit.</li>
    <li>There are internal dependencies or knowledge embedded in the system worth preserving.</li>
    <li>We foresee a decline curve that allows time for planned transformation, rather than emergency action.</li>
    <li>There is an opportunity to integrate salvaged components into emerging strategic initiatives.</li>
    <li>The legacy asset is a source of internal toxicity or inertia that must be addressed methodically.</li>
  </MapSignals>
  <Readiness>
    <li>We have the capacity to assess legacy components for reuse (skills, tech, data, infrastructure).</li>
    <li>We are able to execute internal reorganizations without destabilizing other operations.</li>
    <li>We can support dual operations temporarily (legacy and new systems in parallel).</li>
    <li>Our culture tolerates gradual change and has experience with transformation projects.</li>
    <li>We have mechanisms in place to retrain or redeploy people effectively and respectfully.</li>
    <li>We can communicate clearly across teams and functions during transitions.</li>
    <li>We have a defined timeline and governance structure to keep the refactoring on track.</li>
  </Readiness>
</Assessment>

### Use when

The legacy asset has **subcomponents of value** that you can clearly redeploy. Often applicable if the asset's decline is not immediate overnight -- you have time to plan and execute a thoughtful re-org. It's good if you value retaining employees or knowledge and want to redeploy them (cultural continuity) rather than sever ties completely. Refactoring is best when the legacy's end state is foreseeable and you can systematically carve it up over time.

### Avoid when

The toxic asset is hemorrhaging so badly that incremental changes won't stop the bleeding -- sometimes you need a quick cut (disposal) rather than gentle refactor. Also avoid if the effort to refactor is too high or distracts too much from core (sometimes dismantling internally can consume a lot of management attention -- if that's the case, might be better to do sweat & dump or pig in poke). If no part of the old is really salvageable or compatible with new directions, refactoring may just delay the inevitable.

## 🎯 **Leadership**

### Core Challenge

The primary leadership challenge is **managing the transition sensitively and decisively**. This involves identifying true value amidst the legacy, overcoming internal resistance attached to the old ways, and effectively reallocating resources (especially people) without excessive disruption or loss of morale. It requires balancing the need to shed toxicity with the desire to preserve useful elements and knowledge.

### Key leadership skills required

- **Change Management:** Guiding teams through restructuring and role changes.
- **Strategic Assessment:** Accurately identifying which parts of the legacy asset are valuable and which are truly toxic.
- **Communication:** Clearly articulating the 'why' behind the refactoring and managing expectations.
- **Resource Allocation:** Deciding how to reinvest salvaged components (people, tech).
- **Empathy:** Understanding the impact on employees tied to the legacy system.

## 📋 **How to Execute**

1. **Map the Legacy System:** Use Wardley Mapping or similar techniques to break down the legacy asset (product, service, process) into its core components (technology, data, skills, customer segments).
2. **Assess Component Value & Evolution:** Evaluate each component. Is it still valuable? Can it be reused? Where is it on the evolution axis (Genesis, Custom, Product, Commodity)?
3. **Identify Reusable Parts:** Pinpoint components (e.g., a specific dataset, a skilled team, a modular piece of tech) that can be integrated into newer, strategic initiatives.
4. **Develop a Transition Plan:** Outline how reusable components will be extracted and repurposed. Plan for retraining or reassigning personnel. Define the timeline for phasing out the non-reusable parts.
5. **Execute Incrementally:** Refactor in manageable stages where possible. Migrate functionality, transition teams, and decommission old parts gradually to minimize disruption. Run old and new in parallel if necessary during transition.
6. **Communicate Clearly:** Keep stakeholders (especially affected employees) informed about the process, timelines, and future roles.
7. **Decommission Residual Toxicity:** Formally shut down or dispose of the components identified as purely toxic or unusable.

### Ethical Considerations

- **Employee Impact:** Refactoring often means roles change or disappear. Handle transitions transparently and fairly, offering retraining, redeployment opportunities, or severance packages. Avoid leaving employees in limbo.
- **Customer Communication:** If refactoring affects customer-facing services, communicate changes clearly and provide support during the transition. Ensure continuity of service where promised.
- **Data Handling:** Ensure any data migrated or repurposed is handled according to privacy regulations and ethical guidelines.

## 📈 **Measuring Success**

- **Cost Reduction:** Reduced operational or maintenance costs associated with the legacy system.
- **Resource Redeployment:** Successful transfer of staff, technology, or capital to new strategic areas.
- **Improved Agility:** Increased organizational speed or flexibility due to removal of legacy constraints.
- **Value Realization:** Measurable contribution of repurposed components to new products or services.
- **Employee Morale:** Retention and engagement levels of employees involved in the transition.
- **Timeline Adherence:** Completion of refactoring stages according to the plan.

## ⚠️ **Common Pitfalls and Warning Signs**

- **Scope creep:** Refactoring can turn into a never-ending project if not clearly bounded ("while we're at it, let's also overhaul X..."). Need discipline to ensure it serves the purpose of winding down legacy gracefully, not becoming an excuse to tinker indefinitely.
- **Parallel costs:** During refactoring, you often run old and new in parallel (to keep things running while transitioning parts). This can be costly. If not managed, you might double spend for a while and upper management could lose patience.
- **Internal confusion/Resistance:** Employees may be unsure of their future roles during the reassignments, or actively resist the change if attached to the old system. Clear communication and strong change leadership are needed.
- **Technical Debt Accumulation:** Sometimes refactoring is done hastily, creating new forms of technical debt in the "repurposed" components.

## 🧠 **Strategic Insights**

- **Value Preservation:** Unlike simple disposal, refactoring acknowledges that legacy systems often contain trapped value (knowledge, data, skills) that can be unlocked.
- **Gradual Evolution:** It allows for a less abrupt transition, managing inertia by evolving components rather than just cutting them off. Useful when a sudden stop is too disruptive.
- **Internal Focus:** It's an internally focused strategy for dealing with toxicity, contrasting with external plays like 'Sweat & Dump' or 'Pig in a Poke'.
- **Enabler for Future Growth:** By cleaning up legacy constraints and redeploying resources, refactoring frees up capacity for innovation and focus on future value streams.

## ❓ **Key Questions to Ask**

- What specific components make up this legacy system?
- Which of these components still hold value or could be repurposed?
- What is the true cost of maintaining the legacy system vs. the cost of refactoring?
- Where can the salvaged components (people, tech, data) be most effectively redeployed?
- What is the impact on employees, and how can we manage the transition fairly?
- What are the technical and operational risks during the transition?
- How long will the refactoring process take, and what are the key milestones?

## 🔀 **Related Strategies**

- [**Disposal of Liability**](/strategies/dealing-with-toxicity/disposal-of-liability) - Refactoring is an approach to disposal by reuse, focusing on salvaging internal value.
- [**Sweat & Dump**](/strategies/dealing-with-toxicity/sweat-and-dump) - An alternative to refactoring where the asset is pushed hard for short-term gain before disposal, often externally.
- [**Value Chain Disaggregation and Re-aggregation**](/strategies/dealing-with-toxicity/value-chain-disaggregation-and-re-aggregation) - While refactoring is about internal reorganization of a legacy asset, VCDAR is a broader strategic play involving breaking down and recombining entire value chains, often to create new market offerings or business models. Refactoring might be a small part of a larger VCDAR initiative if legacy components are repurposed into a new value chain structure.
- [Pig in a Poke](/strategies/dealing-with-toxicity/pig-in-a-poke) - Packaging toxic components within refactored entities so hidden liabilities surface only after acceptance or deployment.

## ⛅ **Relevant Climatic Patterns**

- [Everything evolves](/climatic-patterns/everything-evolves) – rel: Legacy systems inevitably reach a point where they need refactoring or disposal due to evolution.
- [Characteristics change](/climatic-patterns/characteristics-change) – rel: Components of a system change, making some parts obsolete (toxic) while others remain valuable and can be refactored.
- [Past success breeds inertia](/climatic-patterns/past-success-breeds-inertia) – rel: Inertia towards successful legacy systems can delay necessary refactoring.
- [Efficiency enables innovation](/climatic-patterns/efficiency-enables-innovation) – rel: Refactoring can improve efficiency by removing outdated components, freeing resources for innovation.
- [Higher order systems create new sources of worth](/climatic-patterns/higher-order-systems-create-new-sources-of-worth) – rel: Refactoring can involve integrating salvaged components into new, higher-order systems.

## 📚 **Further Reading & References**

- Agile/DevOps analogies - Many tech companies apply refactoring to processes: e.g., breaking a legacy business process into agile teams. Business literature on **business process re-engineering** touches similar ideas (though BPR often aimed at improvement, here aim is also removal).
- *"Dual Transformation" (Anthony, Johnson)* - a strategy book that talks about running a legacy business (Transformation B) while building new (Transformation A), and how to transfer capabilities from B to A. It's essentially how to refactor an organization during disruption, moving old capabilities to new growth, similar to refactoring concept described here.
