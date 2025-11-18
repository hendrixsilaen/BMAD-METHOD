# Frequently Asked Questions

## Getting Started

### Q: What is beaver-builder?

A: A portable system of 21+ AI expert personas (architect, PM, developer, QA, UX designer, etc.) that provide specialized help and remember your project context across sessions. It's a self-contained AI expert team you can drop into any project.

### Q: How is this different from ChatGPT or Claude?

A:

- **Specialized expertise** - 21 different expert personas vs one generic AI
- **Project memory** - Context persists in docs/ folder vs lost between chats
- **Documentation-first** - All decisions captured as ADRs, stories, progress tracking
- **Multi-agent coordination** - Orchestrator routes to right expert for each task
- **Portable** - Copy one folder, works everywhere

### Q: Do I need the BMAD METHOD framework?

A: No! Beaver-builder is 100% standalone. It can optionally integrate with BMAD but works independently in any project.

### Q: How long does onboarding take?

A:

- **Quick start:** 5-10 minutes (minimal setup, start working immediately)
- **Standard onboarding (new project):** 20-30 minutes (discovery interview)
- **Deep onboarding (existing project):** 30-45 minutes (full codebase analysis)

### Q: Which onboarding should I use?

A:

- **First time trying it?** → `/quickstart` (fast, minimal, recommended)
- **New project from scratch?** → `/onboard-new` (discovery interview)
- **Existing codebase?** → `/onboard-existing` (deep analysis)

### Q: What if I skip onboarding?

A: You can still use the agents, but they won't have project context. They'll ask more questions and may give generic answers. Onboarding creates project memory that makes all future interactions faster and more relevant.

### Q: Can I use this without an IDE?

A: Beaver-builder works best with Claude Code (IDE integration), but you can also load agent personas manually in any AI chat interface by copying their persona files.

## Using Beaver-Builder

### Q: Which command should I use?

A: Start with `/orchestrate` - the orchestrator will analyze your request and route to the right agent(s). See [Commands README](./.claude/commands/README.md) for all 17 commands.

### Q: Which agent should I use for...?

A:

- **Architecture/system design** → Winston (Solutions Architect)
- **Writing code** → Amelia (Senior Developer)
- **Product/requirements** → John (Product Manager)
- **Business analysis** → Mary (Business Analyst)
- **Testing/quality** → Murat (Test Architect)
- **UX/design** → Sally (UX Designer)
- **Documentation** → Paige (Technical Writer)
- **Creative/ideation** → Carson (Brainstorming Specialist)
- **Not sure?** → `/orchestrate` (auto-routing)

### Q: Can I talk to multiple agents at once?

A: Yes! The orchestrator can coordinate 2-3 agents in a single response. For example, requesting architecture advice might engage Winston (architect) + Amelia (developer) + Murat (testing) together.

### Q: How do agents remember my project?

A: All project context is stored in `beaver-builder/docs/` folder:

- `docs/project-context/` - Core project info, tech stack, team
- `docs/architecture/` - ADRs (Architecture Decision Records)
- `docs/requirements/` - User stories and feature specs
- `docs/projects/` - Major initiatives tracking
- `docs/tasks/` - Small tasks and daily work

Agents read these files before responding to understand your project.

### Q: Can I customize the personas?

A: Yes! Edit `beaver-builder/personas/[agent-name]/persona.yaml` to customize behavior, principles, communication style, or workflows. Each persona is just a structured YAML file.

### Q: What happens if I delete the docs/ folder?

A: You'll lose all project context and documentation. Agents will act like it's a fresh project. You'll need to run onboarding again to rebuild context. **Recommendation:** Commit docs/ to git so it's version controlled.

### Q: Can agents create files in my project?

A: Yes, when appropriate. For example:

- Amelia (developer) can write code files
- Winston (architect) can create architecture diagrams
- Paige (technical writer) can create documentation
- All agents can update files in `docs/` folder

## Project Organization

### Q: What's the difference between a project and a task?

A:

- **Project:** Major initiative (>1 week, multiple components, requires planning)
- **Task:** Small change (<1 day, single component, straightforward)

Use `/create-project` for major work, `/create-task` for small changes.

### Q: How do I track progress?

A: The orchestrator automatically updates `docs/project-context/project-progress.md` as work completes. You can also:

- Check `/status` for current overview
- Review `docs/projects/[name]/progress.md` for specific projects
- Look at `docs/tasks/active/` and `docs/tasks/completed/` folders

### Q: Can I use this for multiple projects?

A: Two options:

1. **Separate beaver-builder/ folders** - Copy beaver-builder to each project (recommended for independent projects)
2. **Shared beaver-builder/** - One folder with multiple project contexts in docs/ (works for monorepos)

## Troubleshooting

### Q: "Orchestrator doesn't know about my project"

A: Run `/verify-onboarding` to check if setup is complete. You may need to run `/onboard-existing` or `/quickstart` first. Check that `docs/project-context/project-overview.md` exists and has real content.

### Q: The agents keep asking the same questions

A: Your project context may be incomplete. Check `docs/project-context/project-overview.md` exists and has real content (not just placeholders). Update it manually or re-run onboarding.

### Q: Onboarding is taking too long

A: For quick setup, use `/quickstart` instead (5-10 min). You can run `/onboard-existing` later for deeper analysis when you need it.

### Q: How do I update project context after changes?

A: Two options:

1. **Manual:** Edit `docs/project-context/project-overview.md` directly
2. **Automatic:** Run `/onboard-existing` again to refresh from current codebase

### Q: Can I delete and start over?

A: Yes! Delete `beaver-builder/docs/` folder and run onboarding again. Or keep docs and just update specific files that need refreshing.

### Q: What if agents give wrong information about my project?

A: The project context may be outdated. Update `docs/project-context/project-overview.md` with correct information, or re-run `/onboard-existing` to analyze current codebase.

## Templates & Documentation

### Q: Do I have to fill out all template sections?

A: No! Beaver-builder provides tiered templates:

- **Quick:** Essential sections only (5-10 min)
- **Standard:** Recommended sections (15-20 min)
- **Comprehensive:** All sections (30+ min)

See [Template Guide](./TEMPLATE-GUIDE.md) for guidance on which to use.

### Q: What are ADRs and do I need them?

A: ADRs (Architecture Decision Records) document important tech decisions. They're recommended but not required. Use them to capture:

- Tech stack choices (React vs Vue)
- Database decisions (PostgreSQL vs MongoDB)
- Architecture patterns (microservices vs monolith)
- Major library/framework selections

### Q: Can I use my own templates?

A: Yes! Templates are just markdown files in `docs/` folders. Customize them or create your own. The agents will adapt to whatever structure you use.

## Advanced

### Q: Can I use this in a monorepo?

A: Yes! Two approaches:

1. **One beaver-builder/ at root** - Shared agents for all services (recommended)
2. **beaver-builder/ per service** - Isolated context per service

For option 1, use separate project-overview files: `docs/project-context/service-a-overview.md`, `docs/project-context/service-b-overview.md`

### Q: How do I add a new agent?

A: Create a new folder in `beaver-builder/personas/[agent-name]/` with:

1. `README.md` - Human-readable documentation
2. `persona.yaml` - Structured persona definition
3. `workflows.yaml` - Available workflows (optional)

See existing agents as examples. Update orchestrator to route requests to your new agent.

### Q: What if my tech stack isn't detected during onboarding?

A: Manually edit `docs/project-context/project-overview.md` tech stack section with correct information. The agents will use whatever's documented there.

### Q: Can I use this for non-code projects?

A: Yes! Beaver-builder works for any project that benefits from structured documentation and expert collaboration:

- Research projects
- Writing/content projects
- Design projects
- Business strategy
- Process improvement

Just customize the project-overview.md to your domain.

### Q: Can multiple people use the same beaver-builder/ folder?

A: Yes! As long as the docs/ folder is in git, everyone on the team can:

- Run onboarding (creates/updates shared context)
- Use agents (read from shared context)
- Create documentation (commit to shared docs/)
- Track progress (shared project-progress.md)

**Tip:** Have one person run initial onboarding, then commit to git for the team.

### Q: How do I upgrade to new versions?

A: Since beaver-builder is just files, upgrading means:

1. Back up your `docs/` folder (your project context)
2. Replace `personas/` and `.claude/` folders with new versions
3. Restore your `docs/` folder
4. Review changelog for any new features or breaking changes

Your project context is separate from the agent definitions, so upgrades are safe.

### Q: Can I disable certain agents?

A: Yes! Delete or rename their persona folders. The orchestrator will only route to agents that exist in `personas/` folder.

### Q: How much disk space does this use?

A: Minimal:

- Persona files: ~500KB-1MB (YAML + markdown)
- Initial docs/: ~100KB (templates + empty structure)
- After months of use: 1-10MB (depends on documentation created)

Total: Usually <5MB even for large projects.

## Integration & Compatibility

### Q: Does this work with GitHub Copilot?

A: Yes! They complement each other:

- **Copilot:** Code completion and suggestions
- **Beaver-builder:** Architecture decisions, project planning, documentation, multi-agent expertise

Use both together for best results.

### Q: Can I integrate with Jira/Linear/other tools?

A: Not directly. Beaver-builder is file-based. However, agents can:

- Read exported data from those tools
- Generate content to paste into those tools
- Help write API integration code

### Q: Does this work offline?

A: Partially:

- **Persona files:** Work offline (just markdown/YAML)
- **AI interactions:** Require internet (Claude API)
- **Project docs:** Work offline (local files)

You can read/edit all documentation offline, but need internet for AI agent responses.

## Still Have Questions?

- **Check:** [Troubleshooting Guide](./TROUBLESHOOTING.md)
- **See:** [Examples](./examples/) for reference implementations
- **Review:** [Portable Guide](../PORTABLE-GUIDE.md) for complete usage
- **Read:** [Commands README](../.claude/commands/README.md) for all available commands
