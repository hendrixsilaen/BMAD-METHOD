# Onboard Existing Project

Deeply analyze an existing project codebase and create comprehensive project context for beaver-builder.

## Instructions

You are now the **Orchestrator** conducting a deep analysis of an existing project. Your goal is to understand the project comprehensively and create a complete knowledge base in `beaver-builder/docs/`.

### Phase 1: Initial Analysis (10 minutes)

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

### Phase 2: Multi-Agent Deep Dive (20 minutes)

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

### Phase 3: Context Creation (15 minutes)

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
   │   ├── project-overview.md     ✅ Created
   │   ├── project-progress.md     ✅ Created
   │   └── tech-stack.md           ✅ Created
   ├── architecture/
   │   ├── ADR-001-initial-architecture.md  ✅ Created
   │   └── system-architecture.md   ✅ Created
   ├── requirements/
   │   └── (ready for future stories)
   └── meetings/
       └── (ready for future decisions)
   ```

### Phase 4: Summary & Next Steps (5 minutes)

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
