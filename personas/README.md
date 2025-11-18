# BMAD METHOD Personas

This directory contains all the AI agent personas from the BMAD METHOD project. Each persona represents a specialized expert agent with unique skills, communication styles, and workflows.

## Overview

The BMAD METHOD orchestrates **20 specialized AI agents** across multiple modules, each with distinct personalities and expertise. This personas directory provides a centralized reference for all agent definitions.

## Directory Structure

```
personas/
├── README.md (this file)
├── {agent-name}/
│   ├── README.md         # Full agent documentation
│   ├── persona.yaml      # Structured persona data
│   └── workflows.yaml    # Available workflows and capabilities
```

Each agent folder contains:

- **README.md**: Human-readable documentation with persona details, principles, and available workflows
- **persona.yaml**: Machine-readable YAML with metadata, role, identity, communication style, and principles
- **workflows.yaml**: List of all workflows the agent can execute with triggers and descriptions

## Agents by Module

### Core Module (1 agent)

- **[BMad Master](./bmad-master/)** 🧙 - Master orchestrator and workflow coordinator

### BMM - BMad Method Module (9 agents)

Software development and agile project management specialists:

- **[John](./john/)** 📋 - Product Manager (Investigative Product Strategist)
- **[Mary](./mary/)** 📊 - Business Analyst (Strategic Business Analyst)
- **[Winston](./winston/)** 🏗️ - Architect (Solutions Architect)
- **[Amelia](./amelia/)** 💻 - Developer (Senior Software Engineer)
- **[Bob](./bob/)** 🏃 - Scrum Master (Technical Scrum Master)
- **[Murat](./murat/)** 🧪 - Test Architect (Quality & Test Strategy Expert)
- **[Sally](./sally/)** 🎨 - UX Designer (User Experience Designer)
- **[Paige](./paige/)** 📚 - Technical Writer (Documentation Specialist)
- **[Saif](./saif/)** 📐 - Frame Expert (Diagramming & Visualization Specialist)

### BMGD - BMad Game Development Module (4 agents)

Game development specialists:

- **[Cloud Dragonborn](./cloud-dragonborn/)** 🏛️ - Game Designer
- **[Max](./max/)** 🎯 - Game Scrum Master
- **[Link Freeman](./link-freeman/)** 🕹️ - Game Developer
- **[Samus Shepard](./samus-shepard/)** 🎲 - Game Architect

### BMB - BMad Builder Module (1 agent)

Custom agent and workflow creation:

- **[BMad Builder](./bmad-builder/)** 🧙 - Module Builder (Master BMad Module Agent Team Builder)

### CIS - Creative Intelligence Suite Module (5 agents)

Creative facilitation and innovation specialists:

- **[Carson](./carson/)** 🧠 - Elite Brainstorming Specialist
- **[Dr. Quinn](./dr-quinn/)** 🔬 - Design Thinking Coach
- **[Maya](./maya/)** 🎨 - Creative Problem Solver
- **[Victor](./victor/)** ⚡ - Innovation Strategist
- **[Sophia](./sophia/)** 📖 - Storyteller

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

### Direct Agent Loading

You can load any agent in your IDE to access their specific workflows and persona:

1. Navigate to `{bmad_folder}/{module}/agents/{agent-name}.md`
2. Load the agent in your IDE
3. Access their menu of available workflows

### Agent Customization

All agent personas can be customized via `{bmad_folder}/_cfg/agents/` without modifying core files. Customizations persist through updates.

## How This Was Generated

This personas directory was automatically generated using the `tools/extract-personas.js` script, which:

1. Scans all `*.agent.yaml` files across modules
2. Parses agent definitions and metadata
3. Extracts persona information, workflows, and critical actions
4. Generates structured documentation in multiple formats

To regenerate after agent updates:

```bash
node tools/extract-personas.js
```

## Learn More

- **[BMAD METHOD Documentation](../README.md)** - Project overview
- **[BMM Agents Guide](../src/modules/bmm/docs/agents-guide.md)** - Detailed agent usage guide
- **[Party Mode Guide](../src/modules/bmm/docs/party-mode.md)** - Multi-agent collaboration
- **[Agent Customization Guide](../docs/agent-customization-guide.md)** - Customize agent personas

---

_These personas represent the distributed expertise model of the BMAD METHOD, where specialized AI agents collaborate through structured workflows while maintaining authentic personalities._
