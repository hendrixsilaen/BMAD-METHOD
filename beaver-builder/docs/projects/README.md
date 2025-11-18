# Projects Folder

This folder contains **major initiatives, features, and systems** that span multiple weeks or affect multiple components of the codebase.

---

## When to Create a Project

Create a project folder when the work:

- **Duration:** Takes more than 1 week to complete
- **Scope:** Affects multiple systems or components
- **Complexity:** Requires multiple agents and sequential phases
- **Impact:** Significant architectural or product changes

**Examples:**

- Building an authentication system
- Adding analytics dashboard
- Implementing payment processing
- Creating admin panel
- Major refactoring initiatives

---

## Project Structure

Each project gets its own folder with comprehensive documentation:

```
projects/
├── auth-system/
│   ├── progress.md          ← Project-specific progress tracking
│   ├── requirements.md      ← Detailed requirements and user stories
│   ├── architecture.md      ← System architecture and design
│   ├── implementation.md    ← Implementation details and code organization
│   ├── testing.md           ← Test strategy, cases, and results
│   ├── decisions.md         ← All technical and product decisions
│   └── meetings.md          ← Meeting notes and discussions
│
└── analytics-dashboard/
    └── ...
```

---

## How to Create a New Project

### 1. Ask the Orchestrator

```
"I need to build [feature/system description]"
```

The Orchestrator will:

1. Analyze scope and complexity
2. Determine if it's a PROJECT (vs a task)
3. Create project folder from template
4. Initialize project structure
5. Engage appropriate agents

### 2. Manual Creation

If creating manually:

1. Copy `PROJECT-TEMPLATE.md` to `projects/[project-name]/progress.md`
2. Fill in project overview, team, and phases
3. Create additional docs as needed (requirements.md, architecture.md, etc.)
4. Update main `project-progress.md` with reference to this project

---

## Project Lifecycle

### Phase 1: Discovery & Planning

- **Agents:** John (PM), Mary (Analyst)
- **Output:** requirements.md, project plan
- **Duration:** 1-3 days

### Phase 2: Architecture & Design

- **Agents:** Winston (Architect), Amelia (Dev), Sally (UX)
- **Output:** architecture.md, design docs
- **Duration:** 2-5 days

### Phase 3: Implementation

- **Agents:** Amelia (Dev), relevant specialists
- **Output:** Working code, tests
- **Duration:** 1-4 weeks

### Phase 4: Testing & QA

- **Agents:** Murat (TEA), Amelia (Dev)
- **Output:** Test results, bug fixes
- **Duration:** 3-7 days

### Phase 5: Deployment & Documentation

- **Agents:** Paige (Writer), Amelia (Dev)
- **Output:** User docs, deployment
- **Duration:** 1-3 days

---

## Tracking Project Progress

### Project-Specific Progress

Each project has its own `progress.md` with:

- Phase tracking
- Milestones
- Team assignments
- Detailed status

### Global Progress Reference

The main `project-context/project-progress.md` includes:

- High-level project status
- Reference to project folder
- Cross-project dependencies

---

## When to Archive

Move completed projects to `_archived/` when:

- ✅ All phases completed
- ✅ Deployed to production
- ✅ Documentation finalized
- ✅ No active work remaining

**How to archive:**

```bash
mv projects/project-name projects/_archived/project-name-YYYY-MM-DD
```

Keep for historical reference and learning.

---

## Best Practices

### 1. Keep It Updated

Update `progress.md` after each significant milestone or phase completion.

### 2. Document Decisions

Record all major decisions in `decisions.md` with:

- Context (why decision was needed)
- Decision (what was chosen)
- Rationale (why this choice)
- Alternatives considered

### 3. Cross-Reference

Link related documents:

- From progress.md to detailed docs
- From tasks to parent project
- From global architecture to project-specific design

### 4. Team Communication

- Tag agent names in updates
- Summarize discussions in meetings.md
- Track action items with owners

### 5. Metrics Matter

Track and update:

- Progress percentage
- Burn rate
- Test coverage
- Documentation completeness

---

## Templates Available

- **PROJECT-TEMPLATE.md** - Complete project structure
- Copy and customize for each new project

---

## Examples

### Small Initiative (NOT a project)

❌ "Add dark mode toggle" → This is a **task** (2-3 days, single feature)

### Medium Project

✅ "Build user authentication" → This is a **project** (1-2 weeks, multiple components)

### Large Project

✅ "Create admin dashboard with user management, analytics, and reporting" → This is a **major project** (4-6 weeks, many phases)

---

_For quick fixes and small changes, use the `tasks/` folder instead._

_See [tasks/README.md](../tasks/README.md) for task management._
