# Project Knowledge Base

This folder contains all project-specific knowledge gathered and maintained by the AI agent personas.

## Purpose

When you copy the `beaver-builder/` folder to any project, the agents use this `docs/` directory to:

- Learn about your project
- Store gathered context and insights
- Maintain project documentation
- Track decisions and progress
- Build shared understanding across all agents

## Directory Structure

```
docs/
├── README.md (this file)
├── project-context/     # Core project information
│   ├── project-progress.md          # 🎯 MAIN PROGRESS TRACKER (high-level overview)
│   ├── project-progress-template.md # Template for new projects
│   ├── project-progress.example.md  # Example filled-in tracker
│   └── project-overview.md          # Project goals and context
│
├── projects/            # 🚀 MAJOR INITIATIVES (multi-week work)
│   ├── PROJECT-TEMPLATE.md          # Template for new projects
│   ├── README.md                    # Guide to project management
│   ├── [project-name]/              # Individual project folders
│   │   ├── progress.md              # Project-specific progress
│   │   ├── requirements.md          # Detailed requirements
│   │   ├── architecture.md          # System design
│   │   └── ...                      # Other project docs
│   └── _archived/                   # Completed projects
│
├── tasks/               # ✅ SMALL CHANGES (hours/days work)
│   ├── TASK-TEMPLATE.md             # Template for new tasks
│   ├── README.md                    # Guide to task management
│   ├── active/                      # Currently active tasks
│   │   └── [task-name].md          # Individual task files
│   └── completed/                   # Archived completed tasks
│       └── YYYY-MM/                # Organized by month
│
├── architecture/        # 🏗️ SHARED: Global architecture patterns
│   ├── README.md                      # Architecture docs guide
│   ├── ADR-TEMPLATE.md                # ⚠️ STRICT TEMPLATE for Architecture Decision Records
│   └── ADR-XXX-[decision].md         # Individual ADRs (use template!)
├── requirements/        # 📋 SHARED: Global requirements
│   ├── README.md                      # Requirements docs guide
│   ├── USER-STORY-TEMPLATE.md         # ⚠️ STRICT TEMPLATE for User Stories
│   └── US-XXX-[story].md             # Individual user stories (use template!)
├── research/            # 🔬 SHARED: Market research, competitor analysis
└── meetings/            # 📝 SHARED: Meeting notes and decision records
    ├── README.md                      # Meeting docs guide
    ├── DECISION-RECORD-TEMPLATE.md    # ⚠️ STRICT TEMPLATE for Decision Records
    └── DR-XXX-[date]-[topic].md      # Individual decision records (use template!)
```

### Documentation Policy: Strict vs Flexible

#### ⚠️ STRICT TEMPLATES (Must Use)

These document types **REQUIRE** using strict templates because they directly impact workflow:

1. **Projects** - `docs/projects/PROJECT-TEMPLATE.md`
2. **Tasks** - `docs/tasks/TASK-TEMPLATE.md`
3. **Architecture Decision Records (ADRs)** - `docs/architecture/ADR-TEMPLATE.md`
4. **User Stories** - `docs/requirements/USER-STORY-TEMPLATE.md`
5. **Decision Records** - `docs/meetings/DECISION-RECORD-TEMPLATE.md`

**Why strict?** These define WHAT agents build, HOW they build it, and WHY decisions were made. Inconsistent formats lead to:

- Ambiguous requirements
- Conflicting decisions
- Lost context
- Incomplete implementations
- Testing gaps

#### 🎨 FLEXIBLE FORMATS (Use What Works)

These document types can use any format that makes sense:

- Research notes
- Meeting notes (non-decision)
- Brainstorming outputs
- System diagrams
- API documentation
- General documentation

**Why flexible?** These capture knowledge and context but don't directly drive implementation decisions.

---

## Organizational Philosophy

**Projects vs Tasks:**

- **Projects** (`projects/`) - Major initiatives taking > 1 week, affecting multiple systems, requiring phases
- **Tasks** (`tasks/`) - Small changes taking < 1 day, single component, straightforward solution
- **Shared Folders** - Global patterns and knowledge that span across all work

## 🎯 Progress Tracking System

### The Central Progress Tracker

**Location:** `project-context/project-progress.md`

This is the **single source of truth** for project status that all agents read and update:

**What it tracks:**

- ✅ **Completed work** - What's been accomplished
- 🚧 **In progress** - Current active work
- 📋 **Up next** - Planned work in priority order
- 🚨 **Blockers** - Issues preventing progress
- 💡 **Decisions** - Important technical and product choices
- 📈 **Milestones** - Key project checkpoints
- 🤝 **Agent activity** - Who's working on what

**Why it's important:**

- **Prevents duplicate work** - Agents see what's already done
- **Maintains context** - New agents can quickly get up to speed
- **Tracks decisions** - No lost context about why choices were made
- **Shows velocity** - Understand project momentum
- **Identifies blockers** - Surface issues before they become critical

**When it's updated:**

- After completing any task or feature
- When starting new work
- When making important decisions
- When encountering blockers
- At sprint/iteration boundaries

**Who updates it:**

- **Orchestrator** - Maintains overall structure and coordinates updates
- **All agents** - Add their contributions and progress
- **You** - Can manually update anytime

---

## 🎯 Scope-Based Routing

The Orchestrator automatically determines whether work should be organized as a PROJECT or TASK:

### When to Create a PROJECT

The Orchestrator creates a project folder when work:

- **Duration** > 1 week
- **Affects** multiple systems or components
- **Requires** multiple agents across different phases
- Has **major** architectural or product impact

**Example:** "Build authentication system with OAuth, 2FA, and session management"
→ Creates `projects/auth-system/` with full documentation structure

### When to Create a TASK

The Orchestrator creates a task file when work:

- **Duration** < 1 day
- **Affects** single component or file
- Has **clear** straightforward solution
- Is an **incremental** improvement or fix

**Example:** "Fix login timeout issue"
→ Creates `tasks/active/fix-login-timeout.md`

### The Orchestrator Process

1. **Analyzes** your request for domain, complexity, and scope
2. **Determines** PROJECT vs TASK based on criteria
3. **Creates** appropriate structure from templates
4. **Engages** relevant agents
5. **Updates** main `project-progress.md` with reference to work location
6. **Tracks** progress throughout lifecycle
7. **Archives** when complete

See [projects/README.md](./projects/README.md) and [tasks/README.md](./tasks/README.md) for detailed guides.

## How Agents Use This Folder

### First Interaction - Reading Progress

When personas join your project, they immediately:

1. **Read `project-progress.md`** to understand current status
2. **Check what's completed** to avoid duplicate work
3. **See what's in progress** to coordinate efforts
4. **Review recent decisions** to maintain consistency

### Initial Project Discovery

When starting a new project, personas will:

1. Ask questions to understand your project goals
2. Analyze existing codebase/files (if brownfield)
3. Create `project-overview.md` with project context
4. Initialize `project-progress.md` from template

### Knowledge Accumulation

As work progresses, agents will:

- **John (PM)**: Store PRDs, user stories in `requirements/`
- **Mary (Analyst)**: Add research findings to `research/`
- **Winston (Architect)**: Document system design in `architecture/`
- **Amelia (Dev)**: Reference implementation notes
- All agents can read from and contribute to these docs

### Cross-Agent Knowledge Sharing

- All agents have access to the same knowledge base
- When one agent gathers information, all agents can reference it
- Creates consistent understanding across the team
- Eliminates repeated questions and context loss

## Getting Started

### First Time Setup

1. Copy the entire `beaver-builder/` folder to your project
2. Run the orchestrator to introduce your project
3. Agents will ask initial questions and create base documentation

### Example: Initial Project Document

The orchestrator will help create `project-context/project-overview.md`:

```markdown
# Project: [Your Project Name]

## What We're Building

[Brief description]

## Goals

- Goal 1
- Goal 2

## Tech Stack

- Language:
- Framework:
- Database:

## Current Status

[Where things are now]
```

## Document Templates

Create consistent documentation using agent-specific templates:

### Product Requirements (`requirements/`)

- User stories
- Feature specifications
- Acceptance criteria

### Architecture (`architecture/`)

- System design diagrams
- Technology decisions
- Integration patterns

### Research (`research/`)

- Market analysis
- Competitor research
- User insights

### Meeting Notes (`meetings/`)

- Decision records
- Action items
- Discussion summaries

## Best Practices

### Keep It Current

- Update docs as the project evolves
- Archive outdated information
- Date all significant changes

### Make It Searchable

- Use clear, descriptive filenames
- Add tags and keywords
- Cross-reference related docs

### Collaborate Across Agents

- Any agent can update any document
- Include agent name in updates: `[Updated by John - PM]`
- Track who provided which insights

## Portability

This entire `beaver-builder/` folder is designed to be:

- **Self-contained**: Everything needed is in this folder
- **Portable**: Copy to any project and start working
- **Project-agnostic**: Works for any domain or technology
- **Persistent**: Knowledge accumulates over time

---

_This knowledge base grows with your project. The more the agents learn, the more effective they become._
