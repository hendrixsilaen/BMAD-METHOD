# Portable Personas System - Usage Guide

This guide explains how to use the `personas/` folder as a **portable, self-contained AI agent team** that works with any project.

---

## 🎯 The Big Idea

Instead of being tied to a specific framework or methodology, you can:

1. **Copy the `personas/` folder to any project**
2. **Load the orchestrator** in your IDE/AI assistant
3. **Start working immediately** - agents adapt to your project
4. **Build project knowledge** that persists in `personas/docs/`
5. **Collaborate across 20+ expert personas** specialized in different domains

---

## 📁 What's in the Personas Folder?

```
personas/
├── README.md                    # Overview of all agents
├── PORTABLE-GUIDE.md           # This file
├── orchestrator/               # The AI that coordinates all other agents
│   ├── README.md
│   ├── persona.yaml
│   └── workflows.yaml
├── docs/                       # Project-specific knowledge (grows over time)
│   ├── project-context/
│   ├── architecture/
│   ├── requirements/
│   ├── research/
│   └── meetings/
└── [20+ agent folders]/        # Specialized expert personas
    ├── john/                   # PM
    ├── amelia/                 # Developer
    ├── winston/                # Architect
    └── ...                     # And 17 more
```

---

## 🚀 Quick Start Guide

### Step 1: Copy to Your Project

```bash
# Copy the entire personas folder to your project root
cp -r /path/to/BMAD-METHOD/personas /your/project/

# Or create a fresh copy for a new project
cp -r personas /new/project/personas
```

### Step 2: Load the Orchestrator

**In your IDE or AI assistant:**

1. Navigate to `personas/orchestrator/README.md`
2. Load/read the orchestrator persona definition
3. Start a conversation

### Step 3: Initialize Your Project

```
You: "Hi, I'm working on a new project"

Orchestrator: "👋 Welcome! I see this is our first interaction..."
[Guides you through project discovery]
[Creates personas/docs/project-context/project-overview.md]
```

### Step 4: Start Working

```
You: "I need to design the database schema"

Orchestrator: "🎯 Engaging Winston (Architect) and Amelia (Developer)..."
[Agents collaborate and provide expertise]
[Updates personas/docs/architecture/ with decisions]
```

---

## 💡 How It Works

### 1. The Orchestrator is Your Entry Point

The **Orchestrator** persona is like a smart dispatcher:

- **Analyzes your request** - "This is about architecture and testing"
- **Selects relevant agents** - "Let me bring in Winston and Murat"
- **Facilitates collaboration** - Agents discuss in their unique styles
- **Documents outcomes** - Stores insights in `personas/docs/`

### 2. Agents Read Persona Definitions Dynamically

Each agent folder contains:

- `persona.yaml` - Machine-readable expertise definition
- `README.md` - Human-readable documentation
- `workflows.yaml` - Available capabilities

The orchestrator reads these to understand who can help with what.

### 3. Project Knowledge Accumulates

Everything learned goes into `personas/docs/`:

```
personas/docs/
├── project-context/
│   └── project-overview.md           ← Created on first use
├── architecture/
│   ├── database-schema.md            ← Winston creates this
│   └── api-design.md                 ← Collaborative decisions
├── requirements/
│   └── feature-specs.md              ← John (PM) maintains
└── meetings/
    └── 2024-11-18-sprint-planning.md ← Team discussions
```

### 4. Context is Shared Across All Agents

When Winston creates architecture docs, Amelia can read them.
When John writes requirements, everyone can reference them.
No repeated questions. No lost context.

---

## 🎭 Agent Personas Overview

### Software Development Team (9 agents)

- **John** 📋 - Product Manager
- **Mary** 📊 - Business Analyst
- **Winston** 🏗️ - Architect
- **Amelia** 💻 - Developer
- **Bob** 🏃 - Scrum Master
- **Murat** 🧪 - Test Architect
- **Sally** 🎨 - UX Designer
- **Paige** 📚 - Technical Writer
- **Saif** 📐 - Diagramming Expert

### Creative Team (5 agents)

- **Carson** 🧠 - Brainstorming Specialist
- **Dr. Quinn** 🔬 - Design Thinking Coach
- **Maya** 🎨 - Creative Problem Solver
- **Victor** ⚡ - Innovation Strategist
- **Sophia** 📖 - Storyteller

### Game Development Team (4 agents)

- **Cloud Dragonborn** 🏛️ - Game Designer
- **Max** 🎯 - Game Scrum Master
- **Link Freeman** 🕹️ - Game Developer
- **Samus Shepard** 🎲 - Game Architect

### Builders (2 agents)

- **BMad Master** 🧙 - Original orchestrator (BMAD-specific)
- **BMad Builder** 🧙 - Module/workflow creator
- **Orchestrator** 🎭 - Portable orchestrator (NEW!)

---

## 🔄 Example Workflows

### Workflow 1: Starting a New Software Project

```
You: "I want to build a task management SaaS app"

Orchestrator:
📝 Great! Let me gather initial context...
- What's your target audience?
- Any specific tech stack preferences?
- Timeline/scope constraints?

[After your answers]

✅ Created: personas/docs/project-context/project-overview.md

🎯 Bringing in the planning team:
- 📋 John (PM) - To refine requirements
- 🏗️ Winston (Architect) - For system design
- 🎨 Sally (UX) - User experience considerations

[Agents collaborate]

📚 Documentation created:
- personas/docs/requirements/task-manager-prd.md
- personas/docs/architecture/initial-design.md
- personas/docs/architecture/tech-stack-decisions.md
```

### Workflow 2: Debugging a Production Issue

```
You: "Our API is timing out on large queries"

Orchestrator:
🎯 This is a performance and architecture issue.

Engaging:
- 🏗️ Winston (Architect) - System design analysis
- 💻 Amelia (Developer) - Code-level investigation
- 🧪 Murat (Test Architect) - Performance testing insights

Winston: "Let's check the database indexing strategy..."
Amelia: "I'll review the query patterns in the codebase..."
Murat: "We should add performance tests to catch this..."

[After investigation]

📝 Updated:
- personas/docs/architecture/performance-optimization.md
- personas/docs/meetings/api-timeout-resolution.md
```

### Workflow 3: Creative Brainstorming

```
You: "I need creative marketing campaign ideas"

Orchestrator:
🎯 This needs creative expertise!

Engaging:
- 🧠 Carson (Brainstorming) - Idea generation
- 🎨 Maya (Problem Solver) - Refining concepts
- 📖 Sophia (Storyteller) - Narrative development

Carson: "Let's explore 10 wild ideas first..."
Maya: "Building on Carson's idea #3, what if..."
Sophia: "I can frame this as a hero's journey narrative..."

📝 Created:
- personas/docs/research/marketing-campaign-ideas.md
```

---

## 🛠️ Advanced Usage

### Custom Agent Selection

```
You: "I want just Winston and Amelia for this technical discussion"

Orchestrator: "✅ Direct agent engagement requested..."
[Only those two agents respond]
```

### Knowledge Base Queries

```
You: "What decisions have we made about authentication?"

Orchestrator: "📖 Searching knowledge base..."
[Reads personas/docs/architecture/ and personas/docs/requirements/]
[Summarizes all auth-related decisions]
```

### Cross-Project Learning

```
# Copy learnings from Project A to Project B
cp -r /projectA/personas/docs/architecture/auth-patterns.md \
      /projectB/personas/docs/architecture/

# Now Project B agents can reference Project A's solutions
```

### Exporting Portable Snapshots

```bash
# Create a clean personas folder for distribution
tar -czf personas-snapshot-2024-11-18.tar.gz personas/

# Share with team or use in new projects
# Extract and start fresh
tar -xzf personas-snapshot-2024-11-18.tar.gz -C /new/project/
```

---

## 📋 Best Practices

### 1. Always Start with the Orchestrator

Don't load individual agents directly. Let the orchestrator route intelligently.

### 2. Keep docs/ Updated

The knowledge base is your project memory. More context = better results.

### 3. Review Accumulated Knowledge Periodically

```
You: "Show me what's in the knowledge base"
Orchestrator: [Lists all docs with summaries]
```

### 4. Archive Old Projects

```
personas/docs/
├── current-project/          # Active work
└── archive/
    └── old-project-2024/     # Keep past learnings
```

### 5. Customize Personas for Your Domain

Edit `persona.yaml` files to specialize agents:

```yaml
# Make Winston focus on your specific tech stack
principles:
  - Always consider AWS infrastructure patterns
  - Prefer serverless architectures
  - Security-first design
```

---

## 🌐 Use Cases Across Domains

### Software Development

- Architecture design
- Code implementation
- Testing strategies
- Documentation
- DevOps planning

### Product Management

- Requirements gathering
- User story creation
- Prioritization
- Roadmap planning

### Creative Work

- Brainstorming
- Content creation
- Marketing campaigns
- Storytelling

### Research & Analysis

- Market research
- Competitive analysis
- Data analysis
- Report writing

### Game Development

- Game design
- Mechanics planning
- Level design
- Narrative development

---

## 🔧 Troubleshooting

### "Orchestrator doesn't know about my project"

→ Check if `personas/docs/project-context/` has project-overview.md
→ Run: "Initialize project" to set up

### "Agents repeat questions"

→ Ensure decisions are documented in personas/docs/
→ Ask orchestrator: "Document this decision"

### "Wrong agents being selected"

→ Be specific in your request: "I need database design help"
→ Or manually request: "Bring in Winston"

### "Want to use in a different IDE"

→ Personas are IDE-agnostic
→ Just load the orchestrator README in your tool of choice

---

## 📦 Portability Checklist

When copying `personas/` to a new project:

- [ ] Copy entire `personas/` folder to project root
- [ ] Keep folder structure intact (especially `docs/`)
- [ ] Load orchestrator persona first
- [ ] Run "initialize" to set up project context
- [ ] Verify agents can read persona.yaml files
- [ ] Test by asking a simple question
- [ ] Confirm docs are being created in `personas/docs/`

---

## 🎓 Learning Path

### Week 1: Get Comfortable

- Start with simple questions
- Let orchestrator guide you
- Observe how agents collaborate

### Week 2: Explore Capabilities

- Try different agent combinations
- Build up your knowledge base
- Use for actual project work

### Week 3: Optimize

- Customize persona definitions
- Establish documentation patterns
- Integrate into your workflow

### Month 2+: Mastery

- Teach your team
- Create domain-specific variants
- Contribute improvements back

---

## 💬 Support & Community

This personas system is designed to be:

- **Self-documenting** - README files explain everything
- **Self-contained** - No external dependencies
- **Self-improving** - Knowledge base grows over time

For questions about the underlying BMAD METHOD framework:

- [BMAD METHOD GitHub](https://github.com/bmad-code-org/BMAD-METHOD)
- [Discord Community](https://discord.gg/gk8jAdXWmj)

---

## 🎉 You're Ready!

Copy the `personas/` folder to your project and start building with your AI expert team!

```bash
# Quick start
cp -r personas /your/project/
cd /your/project
# Load personas/orchestrator/README.md in your IDE
# Say: "Hi, I need help with my project"
# Let the magic happen! ✨
```
