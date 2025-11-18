# BMAD METHOD Personas

This directory contains all the AI agent personas from the BMAD METHOD project. Each persona represents a specialized expert agent with unique skills, communication styles, and workflows.

## 🚀 Portable AI Expert Team

**NEW:** This `beaver-builder/` folder is now **completely portable and self-contained**!

Copy it to any project and get instant access to 20+ specialized AI agents coordinated by an intelligent orchestrator. No framework dependencies, no complex setup - just drop it in your project and start collaborating.

**→ [Read the Portable Guide](./PORTABLE-GUIDE.md) to get started!**

### Quick Start (Portable Mode)

1. Copy `beaver-builder/` folder to your project
2. Load `beaver-builder/personas/orchestrator/README.md` in your IDE
3. Say: _"Hi, I need help with my project"_
4. Let the orchestrator engage the right agents for your needs

### Quick Start (BMAD Framework Mode)

If you're using the full BMAD METHOD framework:

1. Run `npx bmad-method@alpha install`
2. Load any agent from `{bmad_folder}/`
3. Run `*workflow-init` to start

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

## Learn More

### Beaver Builder Documentation (Portable Mode)

- **[Portable Guide](./PORTABLE-GUIDE.md)** - Complete usage guide for any project
- **[Orchestrator Documentation](./personas/orchestrator/README.md)** - Your intelligent coordinator
- **[Request Handling Guide](./personas/orchestrator/REQUEST-HANDLING-GUIDE.md)** - How orchestrator handles different requests
- **[Projects Guide](./docs/projects/README.md)** - Managing major initiatives (multi-week work)
- **[Tasks Guide](./docs/tasks/README.md)** - Managing small changes (hours/days work)
- **[Knowledge Base README](./docs/README.md)** - How agents store and share project knowledge

### BMAD Framework Integration (Optional)

For users of the full BMAD METHOD framework, these personas integrate with framework-specific workflows and customization options. The framework provides additional capabilities beyond the portable mode described above.

---

_These personas represent the distributed expertise model of the BMAD METHOD, where specialized AI agents collaborate through structured workflows while maintaining authentic personalities._
