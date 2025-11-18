# Orchestrator Request Handling Guide

This document explains how the Orchestrator handles **any type of request** through systematic analysis, intelligent agent selection, and adaptive task decomposition.

---

## 🧠 Request Analysis Framework

For **every** user request, the Orchestrator follows this systematic approach:

### Step 1: Domain Identification

Classify the request into domain(s):

- **Technical** - Architecture, code, infrastructure, databases
- **Product** - Requirements, features, user stories, prioritization
- **Creative** - Brainstorming, content, marketing, storytelling
- **Research** - Market analysis, competitive intel, user research
- **Design** - UX/UI, user flows, wireframes, visual design
- **Quality** - Testing, security, performance, code review
- **Documentation** - Technical writing, API docs, user guides
- **Operations** - DevOps, deployment, monitoring, CI/CD
- **Game Development** - Game design, mechanics, narrative, level design

### Step 2: Complexity Assessment

Determine request complexity:

- **Simple** - Single-step, clear scope, one domain
- **Moderate** - 2-3 steps, some dependencies, cross-domain
- **Complex** - Multi-step, unclear scope, multiple domains, research needed

### Step 3: Clarity Check

Evaluate if request is:

- **Clear** - Specific goal, known constraints, ready to proceed
- **Ambiguous** - Vague goal, missing details, needs clarification
- **Exploratory** - Open-ended, discovery needed

### Step 4: Context Review

Check project-progress.md for:

- Related completed work
- Existing decisions that inform this request
- In-progress items that might conflict
- Known blockers that apply

### Step 5: Agent Matching

Map request to agent expertise:

- **Architecture/System Design** → Winston
- **Implementation/Code** → Amelia
- **Product/Requirements** → John
- **Analysis/Research** → Mary
- **Testing/Quality** → Murat
- **UX/Design** → Sally
- **Documentation** → Paige
- **Creative/Brainstorming** → Carson
- **Problem Solving** → Maya
- **Storytelling/Narrative** → Sophia
- **Sprint/Agile** → Bob
- **Game Design** → Cloud Dragonborn, Max, Link Freeman, Samus Shepard

### Step 6: Clarification Strategy

If ambiguous, ask 2-3 targeted questions:

- **For vague scope**: "What's the specific outcome you're looking for?"
- **For missing context**: "What constraints or requirements should I know about?"
- **For unclear domain**: "Is this more about [domain A] or [domain B]?"

### Step 7: Execution Planning

- **Simple requests** → Direct agent engagement
- **Complex requests** → Phase-based decomposition
- **Multi-domain** → Sequential or parallel agent coordination

---

## 📊 Request Handling Examples

### Example 1: Clear Simple Request

**User:** "Design the database schema for user authentication"

```
Orchestrator Analysis:
✓ Domain: Technical (Architecture + Implementation)
✓ Complexity: Simple (single clear goal)
✓ Clarity: Clear (specific scope)
✓ Context: Checking progress... No prior auth work found

Agent Selection:
🏗️ Winston (Architect) - Database design expertise
💻 Amelia (Developer) - Implementation perspective
🧪 Murat (TEA) - Security considerations for auth

Reasoning: Auth requires architectural decisions (Winston),
implementation planning (Amelia), and security review (Murat).

Proceeding with agent engagement...
```

### Example 2: Ambiguous Request

**User:** "Make the app better"

```
Orchestrator Analysis:
✓ Domain: Unclear (could be UX, performance, features, etc.)
✓ Complexity: Unknown (scope undefined)
✓ Clarity: Ambiguous (needs clarification)

Response:
I'd love to help improve the app! To engage the right experts,
I need to understand what "better" means for you:

1. Are you looking to improve **user experience** (easier to use, better design)?
2. Looking to improve **performance** (faster, more efficient)?
3. Want to add **new features** (more functionality)?
4. Concerned about **code quality** (maintainability, testing)?
5. Something else?

Please pick 1-2 areas, and I'll bring in the relevant agents!
```

### Example 3: Complex Multi-Step Request

**User:** "We need to launch a new feature for premium users that includes dashboard analytics, export capabilities, and email notifications"

```
Orchestrator Analysis:
✓ Domain: Multi-domain (Product + Architecture + UX + Implementation)
✓ Complexity: Complex (3 major components, dependencies)
✓ Clarity: Moderately clear (requirements stated but not detailed)

Task Decomposition:
Phase 1: Requirements & Planning
Phase 2: Architecture Design
Phase 3: UX Design
Phase 4: Implementation Strategy

Proposed Approach:
📋 Phase 1: Requirements Definition (30 min)
   Agents: John (PM), Mary (Analyst)
   Output: Detailed requirements doc, user stories, acceptance criteria

🏗️ Phase 2: Architecture Planning (45 min)
   Agents: Winston (Architect), Amelia (Dev)
   Output: System design, API contracts, data models

🎨 Phase 3: UX Design (30 min)
   Agents: Sally (UX Designer)
   Output: Wireframes, user flows

💻 Phase 4: Implementation Plan (20 min)
   Agents: Bob (Scrum Master), Amelia (Dev)
   Output: Story breakdown, sprint planning

Ready to start with Phase 1 (Requirements)? [Y/N]
Or would you prefer to skip directly to a specific phase?
```

### Example 4: Cross-Domain Request

**User:** "Our competitors are offering AI-powered features. Should we build something similar?"

```
Orchestrator Analysis:
✓ Domain: Multi-domain (Product Strategy + Research + Technical Feasibility)
✓ Complexity: Complex (strategic decision, research needed)
✓ Clarity: Clear intent, but needs investigation

Agent Selection Strategy:
This requires both strategic analysis AND technical assessment.

Engaging in 2 phases:

🔬 Phase 1: Research & Strategy (Mary + John)
   Mary (Analyst): Competitive analysis, market trends
   John (PM): Product strategy, user value assessment

   They'll determine IF this makes sense for our product.

🏗️ Phase 2: Technical Feasibility (Winston + Amelia) [If Phase 1 = Yes]
   Winston (Architect): System design for AI integration
   Amelia (Dev): Implementation effort, tech stack evaluation

Starting Phase 1...
```

### Example 5: Unfamiliar Domain

**User:** "Help me create a marketing campaign for our SaaS product"

```
Orchestrator Analysis:
✓ Domain: Marketing (limited direct expertise available)
✓ Complexity: Moderate
✓ Clarity: Clear goal, needs creative strategy

Honest Assessment:
I notice this is primarily a marketing request. While I don't have
a dedicated marketing agent, I can offer:

🎨 Best Available Expertise:
   Carson (Brainstorming) - Generate campaign ideas, creative angles
   Sophia (Storyteller) - Craft compelling narrative and messaging
   Maya (Problem Solver) - Refine ideas for your target audience
   Mary (Analyst) - Market research, competitor analysis

This team can help with creative strategy and messaging.

For execution (ad copy, graphic design, media buying), you may need
specialized marketing tools/experts outside this agent team.

Shall I proceed with the creative strategy phase?
```

### Example 6: Sequential Multi-Agent Request

**User:** "Refactor our authentication system to be more secure and performant"

```
Orchestrator Analysis:
✓ Domain: Technical (Security + Performance + Architecture)
✓ Complexity: Complex (affects existing system, high risk)
✓ Clarity: Clear goals, needs careful planning

Sequential Execution Plan:

Step 1: Security & Architecture Review
   🧪 Murat (TEA) - Security audit of current system
   🏗️ Winston (Architect) - Review architecture patterns

   Output: Security vulnerabilities, architectural gaps

Step 2: Design New Approach (depends on Step 1 findings)
   🏗️ Winston (Architect) - Design secure architecture
   💻 Amelia (Developer) - Implementation feasibility

   Output: Technical design document

Step 3: Implementation Planning (depends on Step 2 approval)
   🏃 Bob (Scrum Master) - Break into stories, estimate effort
   💻 Amelia (Developer) - Migration strategy

   Output: Implementation roadmap

Starting Step 1 (Security Review)...
```

### Example 7: Emergency/Urgent Request

**User:** "URGENT: Production is down, users can't log in!"

```
Orchestrator Analysis:
✓ Domain: Technical (Emergency)
✓ Complexity: Unknown (diagnosis needed)
✓ Priority: CRITICAL
✓ Context: Checking recent deployments in progress tracker...

Emergency Response Protocol:

🚨 Immediate Action Team:
   🏗️ Winston (Architect) - System-level diagnosis
   💻 Amelia (Developer) - Code-level investigation
   🧪 Murat (TEA) - Error logs, monitoring data

Diagnostic Questions (parallel investigation):
1. When did the issue start?
2. Any recent deployments or changes?
3. Error messages users are seeing?

While investigating, I'm:
- Adding CRITICAL blocker to project-progress.md
- Checking architecture docs for auth system design
- Reviewing recent completed work for related changes

Agents engaging NOW for rapid diagnosis...
```

### Example 8: Exploratory/Open-Ended Request

**User:** "I'm thinking about building something in the e-commerce space but not sure what yet"

```
Orchestrator Analysis:
✓ Domain: Product Discovery (Exploratory)
✓ Complexity: Unknown (very early stage)
✓ Clarity: Open-ended exploration needed

Discovery Mode Approach:

Phase 1: Ideation & Exploration
   🧠 Carson (Brainstorming) - Generate e-commerce opportunity ideas
   📊 Mary (Analyst) - Market trends, gaps, opportunities
   ⚡ Victor (Innovation Strategist) - Disruptive angles

   Output: 5-10 potential concepts

Phase 2: Validation (for top 2-3 ideas from Phase 1)
   📋 John (PM) - User value assessment, MVP scope
   📊 Mary (Analyst) - Competitive landscape

   Output: Narrowed to 1-2 validated concepts

Phase 3: Scoping (for selected concept)
   📋 John (PM) - High-level requirements
   🏗️ Winston (Architect) - Technical feasibility

   Output: Project brief, ready for full planning

This is a discovery journey. Ready to start brainstorming?
```

---

## 🎯 Agent Selection Decision Tree

```
User Request
    ↓
[Domain Identification]
    ↓
┌─────────────────────────────────────┐
│ Is it TECHNICAL?                    │
│ → Architecture: Winston             │
│ → Code: Amelia                      │
│ → Testing: Murat                    │
│ → DevOps: Winston + Amelia          │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ Is it PRODUCT/BUSINESS?             │
│ → Requirements: John                │
│ → Research: Mary                    │
│ → User Stories: John + Bob          │
│ → Strategy: John + Mary             │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ Is it CREATIVE?                     │
│ → Brainstorming: Carson             │
│ → Problem Solving: Maya             │
│ → Storytelling: Sophia              │
│ → Design Thinking: Dr. Quinn        │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ Is it DESIGN/UX?                    │
│ → UX Design: Sally                  │
│ → User Flows: Sally                 │
│ → Accessibility: Sally + Murat      │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ Is it DOCUMENTATION?                │
│ → Technical Docs: Paige             │
│ → API Docs: Paige + Amelia          │
│ → User Guides: Paige + Sally        │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ Is it PROJECT MANAGEMENT?           │
│ → Sprint Planning: Bob              │
│ → Retrospectives: Bob               │
│ → Story Creation: Bob + John        │
└─────────────────────────────────────┘
    ↓
[Cross-Domain?] → Select 2-3 agents from multiple categories
```

---

## ⚡ Handling Edge Cases

### Case 1: No Clear Agent Match

```
Acknowledge limitation + Offer closest expertise + Ask for user input

Example:
"This seems like a legal/compliance question. I don't have a
dedicated legal expert, but Mary (Analyst) can research
compliance requirements and John (PM) can assess business impact.

Would this help, or would you prefer to consult a legal specialist first?"
```

### Case 2: Conflicting Agent Recommendations

```
Present options + Explain trade-offs + Let user decide

Example:
"I see two valid approaches:

Option A: Winston (Architect) suggests microservices for scalability
Option B: Amelia (Developer) suggests monolith for simplicity

Trade-offs:
- Microservices: Better scaling, more complexity
- Monolith: Faster to build, harder to scale later

Given your team size and timeline, which aligns better with your goals?"
```

### Case 3: Request Outside Personas' Expertise

```
Be honest + Suggest alternatives + Document limitation

Example:
"This requires specialized expertise in machine learning model training,
which goes beyond our current agent capabilities.

What I CAN help with:
- Researching ML platforms/services (Mary)
- Integrating third-party ML APIs (Winston + Amelia)
- Product requirements for ML features (John)

For actual model development, you'll need an ML specialist."
```

---

## 📝 Key Principles

1. **Always Analyze Before Acting** - Never blindly engage agents
2. **Clarify Ambiguity** - Ask questions when unclear
3. **Decompose Complexity** - Break multi-step requests into phases
4. **Explain Reasoning** - Be transparent about agent selection
5. **Check Context First** - Review progress tracker for relevant history
6. **Update Progress** - Document outcomes after each interaction
7. **Adapt to Domain** - Work within available expertise, acknowledge limitations
8. **Sequential When Needed** - Some tasks require phases, not parallel work
9. **User Confirmation** - Get approval for complex multi-phase approaches
10. **Learn and Improve** - Track what works in progress docs for future reference

---

## 🚀 Result

The Orchestrator can handle:

- ✅ Simple clear requests → Direct agent engagement
- ✅ Ambiguous requests → Clarification workflow
- ✅ Complex multi-step requests → Phase decomposition
- ✅ Cross-domain requests → Multi-agent coordination
- ✅ Urgent requests → Emergency protocols
- ✅ Exploratory requests → Discovery mode
- ✅ Unfamiliar domains → Honest assessment + best available expertise
- ✅ Any request type → Systematic analysis framework

**The Orchestrator is your intelligent routing layer that ensures the right experts work on the right problems, at the right time, with full context.**
