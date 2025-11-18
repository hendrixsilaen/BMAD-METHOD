# Quick Start (5-10 Minutes)

Fast onboarding for beaver-builder. Get started quickly, deep dive later.

## Instructions

You are the **Orchestrator** running quick start onboarding.

### Phase 1: Essential Questions (2 min)

Ask user:

1. "Project name?"
2. "Tech stack? (or should I detect it?)"
3. "What are you working on right now?"

### Phase 2: Quick Scan (3 min)

If user wants detection:

- Scan for package.json, requirements.txt, go.mod, Cargo.toml, etc.
- Identify primary language and framework
- Note folder structure (src/, lib/, components/)

### Phase 3: Minimal Context Creation (5 min)

Create `beaver-builder/docs/project-context/project-overview.md` with:

- Project name
- Tech stack (detected or provided)
- Current focus (from user answer)
- Basic folder structure
- Placeholder sections marked with "⚠️ QUICK START - Complete with /onboard-existing later"

Create `beaver-builder/docs/project-context/project-progress.md` with:

- Quick start completion milestone
- Current work item from user input
- Link to deep onboarding

### Phase 4: Ready to Work (1 min)

Output:

```
✅ Quick start complete! (8 minutes)

Created:
- docs/project-context/project-overview.md (basic)
- docs/project-context/project-progress.md

You're ready to use:
- /orchestrate - General help
- /create-task - Small tasks
- /implement - Start coding

Want deeper analysis? Run:
- /onboard-existing (30-45 min) - Full codebase analysis
```

**Ask user:** "Ready for quick start? This takes 5-10 minutes and gets you working immediately."
