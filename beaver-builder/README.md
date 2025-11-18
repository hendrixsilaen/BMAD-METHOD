# Beaver-Builder: Portable AI Agent Team

> **Stop repeating context. Start building faster.**
> A self-contained system of 21+ AI expert personas that remember your project, document decisions, and provide specialized expertise.

## The Problem

Every time you work with AI assistants:

- ❌ You repeat the same project context over and over
- ❌ Decisions get lost between conversations
- ❌ Generic AI gives generic answers
- ❌ No specialized expertise (architecture, PM, testing, UX)
- ❌ Each session starts from zero

## The Solution

Beaver-builder gives you a **portable AI expert team**:

- ✅ **21 specialized agents** - Architect, PM, senior dev, QA, UX designer, technical writer, and more
- ✅ **Project memory** - All context persists in `docs/` folder across sessions
- ✅ **Decision documentation** - Automatic ADRs, user stories, progress tracking
- ✅ **100% portable** - Just copy one folder to any project
- ✅ **Framework optional** - Works standalone or with BMAD METHOD
- ✅ **Intelligent routing** - Orchestrator selects the right expert for each task

## Quick Start (3 Steps)

### 1. Copy beaver-builder/ to your project

```bash
cp -r path/to/beaver-builder /your/project/
cd /your/project
```

### 2. Run onboarding

Choose based on your situation:

- **First time?** → `/quickstart` (5-10 min, minimal setup, start immediately)
- **Existing project?** → `/onboard-existing` (30-45 min, deep codebase analysis)
- **New project?** → `/onboard-new` (20-30 min, discovery interview)

**See [Quick Start Guide](./QUICK-START.md) for details**

### 3. Start working

```bash
/orchestrate    # General help - orchestrator routes to right expert
/status         # Check project status and progress
/create-project # Start major initiative
/create-task    # Create small task
/architecture   # System design (loads Winston)
/implement      # Write code (loads Amelia)
```

**[See all 17 commands](./.claude/commands/README.md)**

---

## Overview

The BMAD METHOD orchestrates **20+ specialized AI agents** across multiple modules, each with distinct personalities and expertise. This personas directory provides both a centralized reference for all agent definitions AND a portable team you can use in any project.

## Directory Structure

```
beaver-builder/
├── README.md                # This file - overview of all agents
├── PORTABLE-GUIDE.md       # Complete guide for using personas in any project
├── personas/               # 🎭 All specialized expert agents
│   ├── orchestrator/       # Your entry point for multi-agent coordination
│   │   ├── README.md       # Orchestrator documentation
│   │   ├── persona.yaml    # Orchestrator definition
│   │   └── workflows.yaml  # Orchestrator capabilities
│   └── {agent-name}/       # 20+ specialized expert agents
│       ├── README.md       # Full agent documentation
│       ├── persona.yaml    # Structured persona data
│       └── workflows.yaml  # Available workflows and capabilities
└── docs/                   # 📚 Project knowledge base (grows over time)
    ├── project-context/    # Core project information
    ├── architecture/       # System design and decisions
    ├── requirements/       # Product specs and stories
    ├── research/           # Analysis and insights
    └── meetings/           # Decision records
```

### What Each Component Does:

- **personas/orchestrator/**: Intelligent coordinator that selects and engages the right agents for each task
- **personas/{agent-name}/**: Individual expert personas with specialized skills
- **docs/**: Project-specific knowledge that all agents can read and contribute to

Each agent folder contains:

- **README.md**: Human-readable documentation with persona details, principles, and available workflows
- **persona.yaml**: Machine-readable YAML with metadata, role, identity, communication style, and principles
- **workflows.yaml**: List of all workflows the agent can execute with triggers and descriptions

## Agents by Module

### 🎭 Orchestrator (START HERE!)

- **[Orchestrator](./personas/orchestrator/)** 🎭 - **Portable multi-agent coordinator** (use this in any project!)
  - **Handles ANY request** through systematic analysis framework
  - Intelligently routes requests to relevant agents with transparent reasoning
  - Asks clarifying questions for ambiguous requests
  - Decomposes complex multi-step tasks into manageable phases
  - Maintains project knowledge base and progress tracking in `docs/`
  - Facilitates multi-agent collaboration (2-3 agents per response)
  - Works without any framework dependencies
  - **[See Request Handling Guide](./personas/orchestrator/REQUEST-HANDLING-GUIDE.md)** for examples

### Core Module (Original BMAD Agents)

- **[BMad Master](./personas/bmad-master/)** 🧙 - Master orchestrator and workflow coordinator (BMAD framework)
- **[BMad Builder](./personas/bmad-builder/)** 🧙 - Module Builder (Master BMad Module Agent Team Builder)

### BMM - BMad Method Module (9 agents)

Software development and agile project management specialists:

- **[John](./personas/john/)** 📋 - Product Manager (Investigative Product Strategist)
- **[Mary](./personas/mary/)** 📊 - Business Analyst (Strategic Business Analyst)
- **[Winston](./personas/winston/)** 🏗️ - Architect (Solutions Architect)
- **[Amelia](./personas/amelia/)** 💻 - Developer (Senior Software Engineer)
- **[Bob](./personas/bob/)** 🏃 - Scrum Master (Technical Scrum Master)
- **[Murat](./personas/murat/)** 🧪 - Test Architect (Quality & Test Strategy Expert)
- **[Sally](./personas/sally/)** 🎨 - UX Designer (User Experience Designer)
- **[Paige](./personas/paige/)** 📚 - Technical Writer (Documentation Specialist)
- **[Saif](./personas/saif/)** 📐 - Frame Expert (Diagramming & Visualization Specialist)

### BMGD - BMad Game Development Module (4 agents)

Game development specialists:

- **[Cloud Dragonborn](./personas/cloud-dragonborn/)** 🏛️ - Game Designer
- **[Max](./personas/max/)** 🎯 - Game Scrum Master
- **[Link Freeman](./personas/link-freeman/)** 🕹️ - Game Developer
- **[Samus Shepard](./personas/samus-shepard/)** 🎲 - Game Architect

### CIS - Creative Intelligence Suite Module (5 agents)

Creative facilitation and innovation specialists:

- **[Carson](./personas/carson/)** 🧠 - Elite Brainstorming Specialist
- **[Dr. Quinn](./personas/dr-quinn/)** 🔬 - Design Thinking Coach
- **[Maya](./personas/maya/)** 🎨 - Creative Problem Solver
- **[Victor](./personas/victor/)** ⚡ - Innovation Strategist
- **[Sophia](./personas/sophia/)** 📖 - Storyteller

## Agent Characteristics

Each agent has:

### Metadata

- **Name**: The agent's given name
- **Title**: Their professional role
- **Icon**: Visual identifier emoji
- **Module**: Which BMAD module they belong to

### Persona

- **Role**: Their primary expertise and function
- **Identity**: Background, experience, and specialization
- **Communication Style**: How they interact and communicate
- **Principles**: Core values and decision-making philosophy

### Critical Actions (some agents)

Mandatory behaviors and guardrails that the agent must follow

### Available Workflows

All workflows the agent can execute, including:

- Trigger commands (e.g., `*workflow-init`, `*create-prd`)
- Descriptions of what each workflow does
- Platform availability (IDE-only, web-only, or both)

## Usage

### In Party Mode

When party mode is activated, relevant agents are automatically selected based on the topic and their expertise. For example:

- Product questions → John (PM) + Winston (Architect)
- Implementation issues → Amelia (Dev) + Murat (TEA)
- Creative brainstorming → Carson (Brainstorming Coach) + Maya (Problem Solver)

### Portable Mode - Direct Agent Loading

In portable mode, you can load any agent directly:

1. Navigate to `beaver-builder/personas/{agent-name}/README.md`
2. Load the agent in your IDE
3. Follow the agent's documentation for interaction

**Recommended:** Use the orchestrator (`beaver-builder/personas/orchestrator/README.md`) as your entry point - it will coordinate multiple agents automatically.

### BMAD Framework Mode - Agent Customization

**Note:** This section applies only to users of the full BMAD METHOD framework.

When using beaver-builder within the BMAD framework:

- Agents can be customized via `{bmad_folder}/_cfg/agents/`
- Framework provides additional workflows and integrations
- See BMAD METHOD documentation for framework-specific features

## About This Folder

This `beaver-builder/` folder is designed to be:

- **Self-contained**: Everything needed is in this folder
- **Portable**: Copy to any project and start working
- **Framework-optional**: Works standalone or within BMAD METHOD
- **Knowledge-based**: Agents learn and store project context in `docs/`

## Relationship to BMAD METHOD

Beaver-builder was originally part of the BMAD METHOD framework but is now **fully standalone and portable**.

**Use beaver-builder standalone if:**

- ✅ You want portable AI agents in any project
- ✅ You don't need the full BMAD framework
- ✅ You want simplicity and flexibility
- ✅ You're working on a single project
- ✅ You prefer file-based configuration

**Use beaver-builder with BMAD if:**

- ✅ You're using the full BMAD METHOD workflow
- ✅ You want deeper integration with BMAD tools
- ✅ You need framework-specific workflows
- ✅ You're managing multiple projects with shared configuration
- ✅ You want the complete BMAD ecosystem

**Bottom line:** Beaver-builder works great on its own. BMAD METHOD adds additional capabilities if you need them, but it's 100% optional.

## Slash Commands

Beaver-builder includes **15 slash commands** for quick access to common workflows:

**Essential:**

- `/orchestrate` - Start orchestrator for any request
- `/status` - Check project status overview
- `/agent` - Load specific agent

**Project Management:**

- `/create-project` - Initialize major project
- `/create-task` - Create small task
- `/list-projects` - Show all projects
- `/list-tasks` - Show all tasks

**Workflows:**

- `/brainstorm` - Creative ideation
- `/design` - Design solutions
- `/architecture` - System architecture
- `/implement` - Write code
- `/test` - Testing strategy
- `/document` - Create documentation
- `/review` - Code review
- `/party-mode` - Multi-agent collaboration

**→ [See Command Documentation](./.claude/commands/README.md)** for detailed usage

---

## Learn More

### Beaver Builder Documentation (Portable Mode)

- **[Portable Guide](./PORTABLE-GUIDE.md)** - Complete usage guide for any project
- **[Slash Commands](./.claude/commands/README.md)** - Quick command reference (15 commands)
- **[Orchestrator Documentation](./personas/orchestrator/README.md)** - Your intelligent coordinator
- **[Request Handling Guide](./personas/orchestrator/REQUEST-HANDLING-GUIDE.md)** - How orchestrator handles different requests
- **[Projects Guide](./docs/projects/README.md)** - Managing major initiatives (multi-week work)
- **[Tasks Guide](./docs/tasks/README.md)** - Managing small changes (hours/days work)
- **[Knowledge Base README](./docs/README.md)** - How agents store and share project knowledge

### BMAD Framework Integration (Optional)

For users of the full BMAD METHOD framework, these personas integrate with framework-specific workflows and customization options. The framework provides additional capabilities beyond the portable mode described above.

---

_These personas represent the distributed expertise model of the BMAD METHOD, where specialized AI agents collaborate through structured workflows while maintaining authentic personalities._
