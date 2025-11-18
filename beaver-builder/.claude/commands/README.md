# Beaver-Builder Slash Commands

Quick access commands for common beaver-builder workflows. These slash commands make it easy to engage specific agents and workflows without manually loading personas.

## 🚀 Quick Start Commands

### `/orchestrate`

**Load the intelligent orchestrator** - Let the orchestrator analyze your request and route to the right agent(s) automatically. Best for when you're not sure which agent to use.

**Use when:** Starting any new request, complex multi-step work, or need help figuring out approach

---

### `/status`

**Get project overview** - See all active projects, tasks, blockers, and recent activity in one glance.

**Use when:** Starting your day, checking progress, identifying what to work on next

---

## 📋 Project & Task Management

### `/create-project`

**Initialize new major project** - Creates project folder with complete documentation structure (progress.md, requirements.md, architecture.md, phase tracking).

**Use when:** Starting multi-week initiatives, major features, significant system changes

### `/create-task`

**Create new task** - Creates task file for small changes, bug fixes, or incremental improvements.

**Use when:** Quick fixes, small features, documentation updates, refactoring

### `/list-projects`

**Show all projects** - Lists active and archived projects with current phase, status, and progress percentage.

**Use when:** Need overview of all ongoing initiatives

### `/list-tasks`

**Show all active tasks** - Lists active tasks with status, priority, and next actions.

**Use when:** Planning what to work on, checking task status

---

## 👥 Agent Commands

### `/agent`

**Load specific agent** - Browse and select from 21 specialized agents organized by expertise (Software Dev, Game Dev, Creative).

**Use when:** You know exactly which expert you need (e.g., "I need Winston for architecture" or "I need Paige for docs")

### `/party-mode`

**Multi-agent collaboration** - Orchestrator coordinates 2-3 relevant agents for complex challenges requiring diverse expertise.

**Use when:** Complex problems needing multiple perspectives, cross-domain challenges, important decisions

---

## 🛠️ Workflow Commands

### `/brainstorm`

**Start brainstorming session** - Loads Carson (Brainstorming Specialist) for creative ideation with structured techniques.

**Use when:** Need creative solutions, generating ideas, exploring alternatives

### `/design`

**Design solutions** - Choose between Winston (technical architecture) or Sally (UX design).

**Use when:**

- System architecture decisions (Winston)
- User interface and experience design (Sally)

### `/architecture`

**Deep architecture design** - Comprehensive architecture workflow with Winston including C4 diagrams, technology decisions, and implementation roadmap.

**Use when:** Major system design, technology stack decisions, architectural patterns

### `/implement`

**Start implementation** - Loads Amelia (Senior Developer) for coding features with acceptance criteria validation.

**Use when:** Ready to write code, have clear requirements, need implementation help

### `/test`

**Create testing strategy** - Loads Murat (Test Architect) for test design, automation, and quality assurance.

**Use when:** Need testing strategy, set up test frameworks, improve test coverage

### `/document`

**Create documentation** - Choose between Paige (technical writing) or Saif (diagrams/visualization).

**Use when:**

- Writing docs, guides, API documentation (Paige)
- Creating diagrams, flowcharts, architecture visuals (Saif)

### `/review`

**Multi-agent code review** - Coordinates Amelia, Winston, and Murat for comprehensive code review covering quality, architecture, and testing.

**Use when:** Code review needed, PR review, quality assessment

---

## 📊 Command Categories

### Essential Commands (Use These First)

1. `/orchestrate` - Universal entry point
2. `/status` - Check what's happening
3. `/agent` - Load specific expert

### Project Organization

4. `/create-project` - Major initiatives
5. `/create-task` - Small changes
6. `/list-projects` - Project overview
7. `/list-tasks` - Task overview

### Specialized Workflows

8. `/brainstorm` - Creative ideation
9. `/design` - Design solutions
10. `/architecture` - System architecture
11. `/implement` - Write code
12. `/test` - Testing strategy
13. `/document` - Documentation
14. `/review` - Code review
15. `/party-mode` - Multi-agent collaboration

---

## 💡 Usage Tips

### When to Use Each Command

**Starting Fresh?**
→ Use `/orchestrate` or `/status` to get oriented

**Know What You Need?**
→ Use specific workflow command (`/implement`, `/test`, `/document`)

**Not Sure Which Agent?**
→ Use `/orchestrate` to let the system decide

**Complex Problem?**
→ Use `/party-mode` for multi-agent collaboration

**Quick Task?**
→ Use `/create-task` then `/agent [name]`

**Big Project?**
→ Use `/create-project` then `/orchestrate`

### Combining Commands

**Typical Project Flow:**

```
1. /create-project → Initialize project
2. /architecture → Design system
3. /implement → Build features
4. /test → Add testing
5. /review → Code review
6. /document → Create docs
7. /status → Check progress
```

**Quick Task Flow:**

```
1. /create-task → Create task
2. /implement → Code the fix
3. /review → Quick review
4. /status → Verify completion
```

**Design Flow:**

```
1. /brainstorm → Generate ideas
2. /design → Design solution
3. /party-mode → Multi-agent validation
4. /document → Document decision
```

---

## 🎯 Command Selection Guide

| Need              | Command           | Agent(s)                 |
| ----------------- | ----------------- | ------------------------ |
| General help      | `/orchestrate`    | Orchestrator             |
| Project overview  | `/status`         | Orchestrator             |
| Create initiative | `/create-project` | Orchestrator             |
| Quick task        | `/create-task`    | Orchestrator             |
| Creative ideas    | `/brainstorm`     | Carson                   |
| System design     | `/architecture`   | Winston                  |
| UX design         | `/design` → Sally | Sally                    |
| Write code        | `/implement`      | Amelia                   |
| Test strategy     | `/test`           | Murat                    |
| Documentation     | `/document`       | Paige or Saif            |
| Code review       | `/review`         | Amelia + Winston + Murat |
| Complex problem   | `/party-mode`     | Multiple agents          |
| Specific expert   | `/agent`          | Your choice              |

---

## 🔧 Technical Details

### Command Structure

Each command is a markdown file in `.claude/commands/` that:

1. Explains what the command does
2. Loads appropriate agent persona(s)
3. Provides workflow instructions
4. Asks initial questions

### Agent Personas

All agents read their persona definition from:

- `beaver-builder/personas/[agent-name]/persona.yaml`
- `beaver-builder/personas/[agent-name]/README.md`
- `beaver-builder/personas/[agent-name]/workflows.yaml`

### Knowledge Base Integration

Commands that create or update project artifacts use:

- `beaver-builder/docs/project-context/` - Main progress tracking
- `beaver-builder/docs/projects/` - Project documentation
- `beaver-builder/docs/tasks/` - Task tracking

---

## 📚 Related Documentation

- **[Portable Guide](../PORTABLE-GUIDE.md)** - How to use beaver-builder in any project
- **[Orchestrator README](../personas/orchestrator/README.md)** - Understanding the orchestrator
- **[Agent Catalog](../README.md)** - All 21 available agents
- **[Projects Guide](../docs/projects/README.md)** - Project management
- **[Tasks Guide](../docs/tasks/README.md)** - Task management

---

## 🎨 Customizing Commands

To add your own slash command:

1. Create `.claude/commands/your-command.md`
2. Follow this structure:

   ```markdown
   # Your Command Title

   Brief description of what this does.

   ## Instructions

   You are now [Agent Name] from beaver-builder.

   [Workflow instructions]

   **Ask the user:** [Initial question]
   ```

3. Save and use with `/your-command`

---

**🚀 Ready to start? Try `/orchestrate` or `/status` to begin!**
