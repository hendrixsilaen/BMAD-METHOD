# Architecture Documentation

This folder contains all architecture decisions, system design documentation, and technical patterns for the project.

---

## 📋 Strict Template Requirements

### Architecture Decision Records (ADRs) - **REQUIRED TEMPLATE**

**When creating ADRs, you MUST use the strict template:**

```
beaver-builder/docs/architecture/ADR-TEMPLATE.md
```

**Why strict?** ADRs directly impact what agents build and how. Inconsistent ADRs lead to:

- Agents making conflicting decisions
- Lost context about why choices were made
- Difficulty reversing or updating decisions
- Unclear consequences and trade-offs

**Naming convention:**

```
ADR-001-choose-database-system.md
ADR-002-api-authentication-strategy.md
ADR-003-frontend-state-management.md
```

Number sequentially, use kebab-case titles.

---

## 📁 Folder Structure

```
architecture/
├── README.md (this file)
├── ADR-TEMPLATE.md           # Template for all ADRs
├── ADR-001-[decision].md     # Individual ADRs (numbered)
├── ADR-002-[decision].md
├── system-architecture.md    # Overall system design (flexible)
├── c4-diagrams/              # Architecture diagrams (flexible)
├── patterns/                 # Reusable patterns (flexible)
└── api-design/               # API specs (flexible)
```

---

## ✅ When to Create an ADR

Create an ADR for decisions that:

- **Affect multiple components** - Not just one file
- **Have long-term impact** - Will affect future work
- **Are hard to reverse** - Significant cost to change
- **Require trade-offs** - Multiple options with pros/cons
- **Set precedents** - Will guide similar future decisions

**Examples:**

- ✅ Choosing a database (PostgreSQL vs MongoDB vs MySQL)
- ✅ API design approach (REST vs GraphQL vs gRPC)
- ✅ Authentication strategy (JWT vs sessions vs OAuth)
- ✅ State management (Redux vs Zustand vs Context)
- ✅ Deployment approach (Kubernetes vs Serverless vs VMs)

**Counter-examples (don't need ADR):**

- ❌ Variable naming conventions - Use code style guide
- ❌ Which CSS framework - Not architectural
- ❌ Folder structure for one component - Too granular
- ❌ Utility function implementation - Implementation detail

---

## 📝 Creating an ADR

### Process

1. **Copy the template:**

   ```bash
   cp ADR-TEMPLATE.md ADR-XXX-your-decision-title.md
   ```

2. **Find the next number:**

   ```bash
   ls ADR-*.md | sort | tail -1
   # If last is ADR-005, create ADR-006
   ```

3. **Fill out ALL sections:**
   - Context and Problem Statement
   - Decision Drivers (with priority)
   - Considered Options (minimum 2, ideally 3+)
   - Decision Outcome with detailed rationale
   - Consequences (positive and negative)
   - Implementation Notes

4. **Get review:**
   - Use `/review` or `/party-mode` for multi-agent review
   - Get feedback from Winston (Architect), Amelia (Dev), Murat (Test)

5. **Mark as Accepted:**
   - Change status from "Proposed" to "Accepted"
   - Add acceptance date

6. **Reference from related work:**
   - Link ADR from user stories
   - Link ADR from implementation tasks
   - Reference in code comments if applicable

---

## 🎨 Other Architecture Docs (Flexible Format)

### System Architecture Overview

**File:** `system-architecture.md`
**Format:** Flexible - use what makes sense
**Purpose:** Big picture of how the system works

**Include:**

- High-level components
- Data flow
- Integration points
- Infrastructure overview

### C4 Diagrams

**Folder:** `c4-diagrams/`
**Format:** Flexible - use Mermaid, PlantUML, D2, or images
**Purpose:** Visual system representations

**Use Saif (Frame Expert) with `/document` to create diagrams**

### Reusable Patterns

**Folder:** `patterns/`
**Format:** Flexible
**Purpose:** Document reusable architectural patterns

**Examples:**

- `repository-pattern.md`
- `error-handling-strategy.md`
- `logging-approach.md`

### API Design

**Folder:** `api-design/`
**Format:** OpenAPI/Swagger preferred, but flexible
**Purpose:** API specifications

**Use Paige (Tech Writer) with `/document` to create API docs**

---

## 🔍 Finding Relevant ADRs

### By Status

```bash
grep "Status: Accepted" ADR-*.md
grep "Status: Proposed" ADR-*.md
grep "Status: Deprecated" ADR-*.md
```

### By Topic

```bash
grep -l "database" ADR-*.md
grep -l "authentication" ADR-*.md
grep -l "performance" ADR-*.md
```

### By Date

```bash
ls -lt ADR-*.md | head -5  # Latest 5 ADRs
```

---

## 🔄 Updating ADRs

### When a Decision Changes

**Don't modify the original ADR.** Instead:

1. Create a new ADR that supersedes it:

   ```markdown
   # ADR-015: Switch from REST to GraphQL

   **Supersedes:** ADR-003-api-rest-design.md
   ```

2. Update the old ADR:

   ```markdown
   # ADR-003: API REST Design

   **Status:** Superseded by ADR-015
   ```

3. Explain why the decision changed in the new ADR

### Small Updates

For minor updates (fixing typos, adding clarifications):

- Update the ADR directly
- Add entry to Change Log
- Don't change the status or decision

---

## 💡 Tips for Writing Good ADRs

### Do:

- ✅ Write for future readers who weren't in the discussion
- ✅ Explain WHY, not just WHAT
- ✅ Consider at least 2-3 options
- ✅ Be honest about trade-offs
- ✅ Include concrete examples
- ✅ Link to research, spikes, or POCs

### Don't:

- ❌ Skip sections of the template
- ❌ Write vague options ("Option A is better")
- ❌ Hide or minimize negative consequences
- ❌ Make decisions without considering alternatives
- ❌ Forget to update when implementing

---

## 🤝 Agent Responsibilities

### Winston (Architect)

- **Primary owner** of ADRs
- Ensures technical soundness
- Proposes architecture decisions
- Reviews all ADRs before acceptance

### Amelia (Developer)

- Reviews for implementation feasibility
- Identifies technical risks
- Provides implementation perspective

### Murat (Test Architect)

- Reviews for testability
- Identifies quality impacts
- Provides testing strategy input

### Orchestrator

- Coordinates ADR creation process
- Ensures all stakeholders involved
- Tracks ADR status and follow-up

---

**Need help creating an ADR? Use `/architecture` to work with Winston!**
