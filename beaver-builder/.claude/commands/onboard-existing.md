# Onboard Existing Project

Deeply analyze an existing project codebase and create comprehensive project context for beaver-builder.

## Instructions

You are now the **Orchestrator** conducting a deep analysis of an existing project. Your goal is to understand the project comprehensively and create a complete knowledge base in `beaver-builder/docs/`.

**Estimated total time:** 30-45 minutes

**Say to user:** "🔍 Starting comprehensive project analysis. This will take approximately 30-45 minutes and is divided into 4 phases. I'll show progress indicators and confirm with you between major phases."

---

### Phase 1: Initial Analysis (10 minutes)

**Say to user:** "📊 **Phase 1/4: Initial Analysis** (estimated 10 min) - Scanning codebase for tech stack, structure, and documentation..."

**Analyze codebase structure:**

1. **Identify project type and tech stack:**
   - Run file pattern analysis to detect frameworks, languages, build tools
   - Check package.json, requirements.txt, go.mod, Cargo.toml, pom.xml, etc.
   - Identify frontend framework (React, Vue, Angular, etc.)
   - Identify backend framework (Express, Django, Spring, etc.)
   - Identify database systems (PostgreSQL, MongoDB, MySQL, etc.)

2. **Understand codebase organization:**
   - Map folder structure (src/, lib/, components/, services/, etc.)
   - Identify main entry points
   - Find configuration files
   - Locate test directories
   - Find documentation (README, docs/, wiki/)

3. **Check existing documentation:**
   - Read README.md thoroughly
   - Scan for architecture docs, ADRs, design docs
   - Look for API documentation (OpenAPI, Swagger, etc.)
   - Check for contributing guides, code standards

**After Phase 1 completes, say to user:**

````
✅ **Phase 1 complete!** (actual time: [X] min)

📋 **Discovered:**
- **Tech stack:** [list primary technologies, e.g., "React 18.2.0, TypeScript 5.0, Express 4.18.0, PostgreSQL 15"]
- **Folder structure:** [key folders, e.g., "src/components/, src/services/, src/utils/"]
- **Entry points:** [main files, e.g., "src/App.tsx, server/index.ts"]
- **Build tools:** [e.g., "Vite 4.3.0, npm scripts"]
- **Documentation:** [what exists, e.g., "README.md (comprehensive), API docs in docs/api/"]

**Example output format:**

**Tech Stack Detected:**
```yaml
frontend:
  framework: React 18.2.0
  language: TypeScript 5.0
  build_tool: Vite 4.3.0
backend:
  framework: Express 4.18.0
  language: TypeScript 5.0
database:
  primary: PostgreSQL 15
````

**Folder Structure:**

```
src/
├── components/   (27 files - React components)
├── services/     (12 files - API clients)
├── utils/        (8 files - helpers)
└── App.tsx       (entry point)
```

```

**Checkpoint - Ask user:** "Phase 1 analysis complete. Please review the tech stack and folder structure above. Proceed to Phase 2 (multi-agent deep dive, ~20 min)? [Y/n]"

- If user says **no**: Save Phase 1 findings to `docs/project-context/project-overview.md` and exit gracefully with summary
- If user says **yes** or gives affirmative: Continue to Phase 2

---

### Phase 2: Multi-Agent Deep Dive (20 minutes)

**Say to user:** "🔬 **Phase 2/4: Multi-Agent Deep Dive** (estimated 20 min) - Deploying specialized agents (Winston, Amelia, Murat, Paige) for comprehensive analysis..."

**Orchestrate specialized agents for comprehensive analysis:**

1. **Deploy Winston (Architect) to:**
   - Analyze system architecture and patterns
   - Identify architectural decisions already made
   - Map component dependencies and data flow
   - Document technology choices and rationale
   - Identify technical debt or architectural concerns

2. **Deploy Amelia (Developer) to:**
   - Review code quality and conventions
   - Identify coding patterns and standards
   - Locate critical business logic
   - Map API endpoints and routes
   - Check test coverage and strategies

3. **Deploy Murat (Test Architect) to:**
   - Analyze existing test infrastructure
   - Review test coverage metrics
   - Identify testing gaps
   - Document test strategies (unit, integration, e2e)
   - Check CI/CD pipeline setup

4. **Deploy Paige (Tech Writer) to:**
   - Inventory existing documentation
   - Identify documentation gaps
   - Review code comments quality
   - Check API documentation completeness
   - Assess user-facing documentation

**After Phase 2 completes, say to user:**

```

✅ **Phase 2 complete!** (actual time: [X] min)

🔬 **Agent Analysis Summary:**

**Winston (Architecture):**

- Architecture pattern: [e.g., "Layered architecture with MVC pattern"]
- Key components: [e.g., "API layer, Service layer, Data access layer"]
- Tech decisions: [e.g., "REST API, JWT auth, SQL database"]
- Technical debt: [e.g., "Legacy authentication system, needs migration to OAuth"]

**Amelia (Development):**

- Code quality: [e.g., "Good - consistent TypeScript usage, 80% test coverage"]
- Coding patterns: [e.g., "Functional components, custom hooks, service layer abstraction"]
- Critical logic: [e.g., "src/services/payment/, src/auth/"]
- API endpoints: [e.g., "45 endpoints in src/routes/"]

**Murat (Testing):**

- Test coverage: [e.g., "82% overall, 95% on business logic"]
- Test types: [e.g., "Jest unit tests, Cypress E2E tests"]
- Testing gaps: [e.g., "Integration tests for payment flow"]
- CI/CD: [e.g., "GitHub Actions - tests run on every PR"]

**Paige (Documentation):**

- Existing docs: [e.g., "README, API docs (OpenAPI), deployment guide"]
- Doc quality: [e.g., "Good README, API docs up to date"]
- Gaps: [e.g., "Missing architecture diagrams, contribution guide"]

```

**Checkpoint - Ask user:** "Phase 2 complete. Review the multi-agent analysis above. Ready for Phase 3 (documentation creation, ~15 min)? [Y/n]"

- If user says **no**: Save all findings and exit with partial onboarding summary
- If user says **yes** or gives affirmative: Continue to Phase 3

---

### Phase 3: Context Creation (15 minutes)

**Say to user:** "📝 **Phase 3/4: Context Creation** (estimated 15 min) - Creating comprehensive project documentation in beaver-builder/docs/..."

**Create comprehensive project documentation:**

1. **Create `beaver-builder/docs/project-context/project-overview.md`:**
   - Use insights from all agent analyses
   - Document tech stack comprehensively
   - Describe system architecture
   - Map key components and their relationships
   - List external dependencies and integrations
   - Document conventions and patterns

2. **Create `beaver-builder/docs/project-context/project-progress.md`:**
   - Initialize from template
   - Document current development phase
   - List recent significant work (from git history)
   - Identify in-progress work (from open PRs, TODOs)
   - Set initial health status

3. **Create `beaver-builder/docs/architecture/ADR-001-initial-architecture.md`:**
   - Document existing architectural decisions discovered
   - Capture tech stack choices and rationale (inferred or discovered)
   - Note architectural patterns in use
   - Identify areas for future ADRs

4. **Create project knowledge base structure:**
```

beaver-builder/docs/
├── project-context/
│ ├── project-overview.md ✅ Created
│ ├── project-progress.md ✅ Created
│ └── tech-stack.md ✅ Created
├── architecture/
│ ├── ADR-001-initial-architecture.md ✅ Created
│ └── system-architecture.md ✅ Created
├── requirements/
│ └── (ready for future stories)
└── meetings/
└── (ready for future decisions)

```

**After Phase 3 completes, say to user:**

```

✅ **Phase 3 complete!** (actual time: [X] min)

📁 **Documentation Created:**

- ✅ beaver-builder/docs/project-context/project-overview.md ([X] KB)
- ✅ beaver-builder/docs/project-context/project-progress.md ([X] KB)
- ✅ beaver-builder/docs/project-context/tech-stack.md ([X] KB)
- ✅ beaver-builder/docs/architecture/ADR-001-initial-architecture.md ([X] KB)
- ✅ beaver-builder/docs/architecture/system-architecture.md ([X] KB)

**Sample from project-overview.md:**

```markdown
# Project: [Project Name]

## Overview

[Brief description of project based on codebase analysis]

## Tech Stack

- **Frontend:** React 18.2.0 + TypeScript 5.0
- **Backend:** Express 4.18.0 + TypeScript 5.0
- **Database:** PostgreSQL 15
- **Build Tools:** Vite 4.3.0

## Architecture

- Pattern: Layered architecture with MVC
- API: REST API with JWT authentication
- Testing: Jest (unit) + Cypress (E2E)
```

```

**Checkpoint - Ask user:** "Phase 3 complete. Documentation structure created. Proceed to Phase 4 (final summary & recommendations, ~5 min)? [Y/n]"

- If user says **no**: Skip to final time summary
- If user says **yes** or gives affirmative: Continue to Phase 4

---

### Phase 4: Summary & Next Steps (5 minutes)

**Say to user:** "🎯 **Phase 4/4: Summary & Next Steps** (estimated 5 min) - Generating comprehensive onboarding report and recommendations..."

**Present comprehensive onboarding report:**

1. **Summary of findings:**
   - Tech stack overview
   - Architecture patterns identified
   - Code quality assessment
   - Test coverage status
   - Documentation quality
   - Key risks or technical debt

2. **Recommended next steps:**
   - High-priority documentation to create
   - Architecture decisions to formalize
   - Technical debt to address
   - Testing gaps to fill
   - Suggested first projects or improvements

3. **Quick reference card:**
   - How to run the project locally
   - How to run tests
   - How to build for production
   - Key commands and scripts
   - Where to find critical code

**After Phase 4 completes, say to user:**

```

🎉 **Onboarding Complete!**

⏱️ **Total time:** [X] minutes (estimated: 30-45 min)

**Phase breakdown:**

- Phase 1 (Initial Analysis): [X] min
- Phase 2 (Multi-Agent Deep Dive): [X] min
- Phase 3 (Context Creation): [X] min
- Phase 4 (Summary & Next Steps): [X] min

📊 **Project Analysis Summary:**

- **Project:** [Project name]
- **Tech Stack:** [Primary stack]
- **Architecture:** [Pattern identified]
- **Code Quality:** [Assessment]
- **Test Coverage:** [Percentage]
- **Documentation:** [Status]

📁 **Files Created:** [X] files in beaver-builder/docs/

🎯 **Recommended Next Steps:**

1. [Priority 1 action]
2. [Priority 2 action]
3. [Priority 3 action]

🤝 **Start Working:**

- `/orchestrate` - General help with anything
- `/status` - Check project status
- `/create-task` - Create small task
- `/architecture` - Work with Winston on design
- `/implement` - Work with Amelia on coding

✅ **Your beaver-builder setup is complete and ready to use!**

```

---

### Critical Actions:

- **DEPLOY AGENTS IN PARALLEL** - Use multiple agents simultaneously for faster analysis
- **BE THOROUGH** - This is a one-time deep dive, accuracy matters more than speed
- **CAPTURE EVIDENCE** - Include code snippets, file paths, and concrete examples
- **BE HONEST** - Document technical debt, risks, and gaps candidly
- **CREATE ACTIONABLE CONTEXT** - Other agents will rely on this documentation

### Output Format:

After completion, provide:

1. **📊 Project Analysis Summary** (executive overview)
2. **📁 Files Created** (list all documentation created)
3. **🎯 Recommended Next Steps** (prioritized action items)
4. **🤝 Quick Start Guide** (how to start working on this project)

---

**Ready to begin deep project analysis!**

Ask the user: "I'll conduct a comprehensive analysis of your project. This will take about 30-45 minutes. Should I proceed?"
```
