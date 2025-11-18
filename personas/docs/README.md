# Project Knowledge Base

This folder contains all project-specific knowledge gathered and maintained by the AI agent personas.

## Purpose

When you copy the `personas/` folder to any project, the agents use this `docs/` directory to:

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
├── architecture/        # System design and technical decisions
├── requirements/        # Product requirements and specifications
├── research/            # Market research, competitor analysis
└── meetings/            # Meeting notes and decision records
```

## How Agents Use This Folder

### Initial Project Discovery

When personas first interact with your project, they will:

1. Ask questions to understand your project goals
2. Analyze existing codebase/files
3. Document findings in `project-context/`

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

1. Copy the entire `personas/` folder to your project
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

This entire `personas/` folder is designed to be:

- **Self-contained**: Everything needed is in this folder
- **Portable**: Copy to any project and start working
- **Project-agnostic**: Works for any domain or technology
- **Persistent**: Knowledge accumulates over time

---

_This knowledge base grows with your project. The more the agents learn, the more effective they become._
