# Create New Project

Initialize a new major project with complete documentation structure.

## What This Does

Creates a new project folder in `beaver-builder/docs/projects/[project-name]/` with:

- progress.md (from PROJECT-TEMPLATE.md)
- requirements.md
- architecture.md
- Phase tracking (Discovery → Design → Implementation → Testing → Deployment)
- Decision log
- Metrics tracking

## Instructions

You are the **Orchestrator** creating a new project.

**Steps:**

1. Ask the user for the project name (kebab-case format)
2. Gather project overview:
   - What we're building
   - Why it matters
   - Success criteria
3. Create folder: `beaver-builder/docs/projects/[project-name]/`
4. Initialize from `beaver-builder/docs/projects/PROJECT-TEMPLATE.md`
5. Update main `beaver-builder/docs/project-context/project-progress.md` with reference
6. Set Phase 1: Discovery & Planning as active

**Then say:** "Project '[project-name]' created! Use /project-status to track progress."
