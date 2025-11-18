# Meeting Notes and Decision Records

This folder contains meeting notes, decision records, and discussion summaries.

---

## 📋 Strict Template Requirements

### Decision Records - **REQUIRED TEMPLATE**

**When documenting meetings with decisions, you MUST use the strict template:**

```
beaver-builder/docs/meetings/DECISION-RECORD-TEMPLATE.md
```

**Why strict?** Decision records prevent:

- Lost context about why decisions were made
- Duplicate discussions on same topics
- Unclear action items and ownership
- Forgotten commitments and next steps
- Conflicting decisions

**Naming convention:**

```
DR-001-YYYY-MM-DD-sprint-planning.md
DR-002-YYYY-MM-DD-architecture-review.md
DR-003-YYYY-MM-DD-product-strategy.md
```

Number sequentially, include date, use kebab-case titles.

---

## 📁 Folder Structure

```
meetings/
├── README.md (this file)
├── DECISION-RECORD-TEMPLATE.md    # Template for decision-making meetings
├── DR-001-[date]-[topic].md       # Decision records (numbered)
├── DR-002-[date]-[topic].md
├── standup-notes/                  # Daily standup notes (flexible)
├── retrospectives/                 # Sprint retrospectives (flexible)
└── planning/                       # Sprint planning notes (flexible)
```

---

## ✅ When to Create a Decision Record

Create a decision record for meetings that:

- **Make important decisions** - Choices affecting project direction
- **Involve multiple stakeholders** - Requiring coordination
- **Create action items** - Commitments to deliver
- **Define strategy** - Product, technical, or process strategy
- **Resolve disagreements** - Consensus building

**Examples:**

- ✅ Sprint planning (decisions on what to build)
- ✅ Architecture review (technical decisions)
- ✅ Product strategy (feature prioritization)
- ✅ Technical design session (implementation approach)
- ✅ Post-mortem / retrospective (process improvements)

**Counter-examples (don't need decision record):**

- ❌ Daily standup - Use flexible format in standup-notes/
- ❌ Casual check-in - No decisions made
- ❌ Status update meeting - Just information sharing
- ❌ One-on-one - Unless strategic decisions made

---

## 📝 Creating a Decision Record

### Process

1. **Determine if decisions were made:**
   - **Yes:** Use DECISION-RECORD-TEMPLATE.md
   - **No:** Use flexible meeting notes format

2. **Copy the template:**

   ```bash
   cp DECISION-RECORD-TEMPLATE.md DR-XXX-YYYY-MM-DD-meeting-topic.md
   ```

3. **Find the next number:**

   ```bash
   ls DR-*.md | sort | tail -1
   # If last is DR-008, create DR-009
   ```

4. **Fill out during or immediately after meeting:**
   - Participants
   - Decisions made (with rationale)
   - Action items (with owners and dates)
   - Risks and dependencies

5. **Circulate to participants:**
   - Share with all attendees
   - Request confirmation/corrections
   - Update based on feedback

6. **Track action items:**
   - Create tasks for each action item
   - Link decision record from tasks
   - Monitor completion

---

## 🎯 Capturing Good Decisions

### Decision Format

```markdown
### Decision 1: Choose PostgreSQL for Database

**Decision:**
We will use PostgreSQL 15 as our primary database.

**Rationale:**

- Supports complex queries and relationships we need
- Team has PostgreSQL experience
- Strong ecosystem and tooling
- Excellent performance for our scale (< 1M records)

**Options Considered:**

1. **PostgreSQL** - Chosen for above reasons
2. **MongoDB** - Rejected: No ACID guarantees, team unfamiliar
3. **MySQL** - Rejected: Less advanced features than PostgreSQL

**Impact:**

- **Immediate:** Install PostgreSQL locally, update docker-compose
- **Short-term:** Design schema, create migrations
- **Long-term:** PostgreSQL expertise becomes team strength

**Action Items:**

- [ ] Amelia: Set up PostgreSQL in docker-compose - Due: 2025-11-20
- [ ] Winston: Design database schema - Due: 2025-11-22
- [ ] Murat: Create DB integration tests - Due: 2025-11-25

**Success Criteria:**

- All user queries respond in < 100ms
- Database handles 1000 concurrent connections

**Review Date:** 2026-02-01
```

### Action Items Format

```markdown
- [ ] **Set up CI pipeline**
  - **Owner:** Amelia
  - **Due:** 2025-11-25
  - **Status:** Not Started
  - **Dependencies:** None
```

---

## 🎨 Other Meeting Notes (Flexible Format)

### Daily Standup Notes

**Folder:** `standup-notes/`
**Format:** Flexible - whatever works for your team
**Naming:** `standup-YYYY-MM-DD.md`

**Simple format:**

```markdown
# Standup - 2025-11-18

## Amelia

- Yesterday: Implemented login API
- Today: Adding tests
- Blockers: None

## Winston

- Yesterday: Reviewed architecture
- Today: Design database schema
- Blockers: Waiting on product requirements
```

### Retrospectives

**Folder:** `retrospectives/`
**Format:** Flexible
**Naming:** `retro-YYYY-MM-DD-sprint-N.md`

**Common format:**

```markdown
# Sprint 5 Retrospective - 2025-11-18

## What Went Well

- [Item 1]
- [Item 2]

## What Could Be Better

- [Item 1]
- [Item 2]

## Action Items

- [ ] [Action 1] - Owner - Due date
```

### Planning Meetings

**Folder:** `planning/`
**Format:** Flexible
**Naming:** `planning-YYYY-MM-DD.md`

---

## 🔄 Meeting Follow-up

### After Every Decision Record

1. **Create tasks for action items:**

   ```bash
   /create-task [action-item-name]
   ```

2. **Link decision record from tasks:**

   ```markdown
   **Related Decision:** [DR-005](../meetings/DR-005-2025-11-18-api-design.md)
   ```

3. **Link from projects if applicable:**
   Update project progress.md with decision reference

4. **Track completion:**
   Update decision record as action items complete

### Weekly Review

- Review all open decision records
- Check action item status
- Identify overdue items
- Escalate blockers

---

## 🔍 Finding Decisions

### By Date

```bash
ls DR-*-2025-11* # All decisions in November 2025
```

### By Topic

```bash
grep -l "architecture" DR-*.md
grep -l "sprint" DR-*.md
grep -l "product" DR-*.md
```

### Open Action Items

```bash
grep "Status: Not Started\|Status: In Progress" DR-*.md
```

---

## 🤝 Agent Responsibilities

### Orchestrator

- Facilitates decision-making process
- Ensures all voices heard
- Captures decisions accurately
- Tracks action items

### Bob (Scrum Master)

- Owns sprint planning decisions
- Tracks action items
- Ensures follow-through

### John (Product Manager)

- Owns product strategy decisions
- Defines business priorities

### Winston (Architect)

- Owns technical design decisions
- Ensures architectural soundness

### All Agents

- Participate in relevant meetings
- Contribute expertise
- Own assigned action items
- Report status

---

## 💡 Tips for Effective Decision Records

### Do:

- ✅ Document immediately (while fresh)
- ✅ Capture WHY, not just WHAT
- ✅ Be specific with action items (who, what, when)
- ✅ Note disagreements and how resolved
- ✅ Set review dates for important decisions
- ✅ Link to related documents (ADRs, stories, tasks)

### Don't:

- ❌ Wait days to document (memory fades)
- ❌ Skip rationale (seems obvious now, won't later)
- ❌ Leave action items vague ("someone should...")
- ❌ Forget to track completion
- ❌ Hide disagreements (capture them honestly)

---

## 📊 Decision Quality Metrics

Track over time to improve decision-making:

- **Decision Speed:** How long to reach decision?
- **Decision Quality:** How many decisions get reversed?
- **Action Item Completion:** What % of action items complete on time?
- **Meeting Effectiveness:** Do meetings achieve expected outcomes?

---

**Need help documenting a meeting? Use `/party-mode` to coordinate decision-making with multiple agents!**
