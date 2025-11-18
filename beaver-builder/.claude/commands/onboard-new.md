# Onboard New Project

Conduct a structured discovery interview to gather comprehensive project context for a new project.

## Instructions

You are now the **Orchestrator** conducting a discovery interview for a new project. Your goal is to understand requirements, make key decisions, and set up the complete beaver-builder knowledge base.

### Phase 1: Project Discovery Interview (15-20 minutes)

**Conduct structured discovery by asking these questions systematically:**

#### 1. Project Vision & Goals

**Ask:**

- "What is the project's name and primary purpose?"
- "What problem does this project solve?"
- "Who are the target users?"
- "What does success look like for this project?"
- "What are the key business or user outcomes?"

**Capture:**

- Project name, vision statement
- Problem statement and user impact
- Success metrics and goals

#### 2. Functional Requirements

**Ask:**

- "What are the core features or capabilities needed?"
- "What are the must-have features for v1?"
- "What features are nice-to-have for future versions?"
- "Are there any integrations or external systems to connect with?"
- "What workflows or user journeys are most critical?"

**Capture:**

- Feature list (prioritized)
- User workflows
- Integration requirements
- Scope boundaries (in/out of scope)

#### 3. Technical Context

**Ask:**

- "Do you have preferred technologies or tech stack constraints?"
- "Will this be a web app, mobile app, API, or something else?"
- "Are there performance, scalability, or availability requirements?"
- "Are there security or compliance requirements?"
- "Do you have existing infrastructure or deployment preferences?"

**Capture:**

- Tech stack preferences or constraints
- Platform targets (web/mobile/desktop)
- Non-functional requirements
- Infrastructure constraints

#### 4. Team & Process

**Ask:**

- "How large is the development team?"
- "What development methodology do you prefer (Agile, Kanban, etc.)?"
- "What is the timeline or deadline?"
- "How will you measure progress?"
- "Who are the key stakeholders or decision-makers?"

**Capture:**

- Team size and roles
- Development methodology
- Timeline and milestones
- Stakeholders

#### 5. Constraints & Risks

**Ask:**

- "Are there budget constraints?"
- "Are there any technical constraints (legacy systems, specific vendors)?"
- "What are the biggest risks or concerns?"
- "Are there dependencies on other projects or teams?"

**Capture:**

- Constraints (budget, technical, time)
- Identified risks
- Dependencies

### Phase 2: Architecture & Technical Planning (15 minutes)

**Orchestrate Winston (Architect) and other agents to:**

1. **Recommend tech stack:**
   - Based on requirements and constraints
   - Consider team expertise
   - Evaluate options (pros/cons)
   - Make recommendations with rationale

2. **Design initial architecture:**
   - High-level system design
   - Component breakdown
   - Data model concepts
   - Integration points

3. **Identify key architectural decisions:**
   - Database choice
   - API design approach
   - Authentication strategy
   - Deployment approach
   - Testing strategy

4. **Create initial ADRs:**
   - Document each major architectural decision
   - Capture options considered
   - Explain rationale

### Phase 3: Project Setup (10 minutes)

**Create comprehensive project documentation:**

1. **Create `beaver-builder/docs/project-context/project-overview.md`:**
   - Project vision and goals
   - Target users and use cases
   - Tech stack and architecture overview
   - Key decisions made
   - Team and timeline
   - Success metrics

2. **Create `beaver-builder/docs/project-context/project-progress.md`:**
   - Initialize from template
   - Phase: Discovery & Planning (Completed)
   - Document onboarding session as first milestone
   - Set up initial backlog in "Up Next"

3. **Create `beaver-builder/docs/requirements/US-001-[first-feature].md`:**
   - Create first user story from core feature
   - Use strict USER-STORY-TEMPLATE.md
   - Write comprehensive acceptance criteria
   - Link to project overview

4. **Create architecture decision records:**
   - `ADR-001-tech-stack-choice.md`
   - `ADR-002-database-choice.md`
   - `ADR-003-api-design-approach.md`
   - (Based on decisions made)

5. **Create initial project in `docs/projects/`:**
   - Use PROJECT-TEMPLATE.md
   - Document the first major initiative (v1 MVP)
   - Break into phases
   - Set milestones

### Phase 4: Development Roadmap (10 minutes)

**Create prioritized roadmap:**

1. **Immediate next steps (Week 1):**
   - Environment setup
   - Project scaffolding
   - Core infrastructure

2. **Short-term (Weeks 2-4):**
   - First user story implementation
   - Basic functionality
   - Initial testing

3. **Medium-term (Months 2-3):**
   - Core features
   - Integration work
   - Quality assurance

4. **Long-term (Months 4+):**
   - Advanced features
   - Optimization
   - Deployment

### Phase 5: Summary & Kickoff (5 minutes)

**Present comprehensive onboarding summary:**

1. **Project Overview:**
   - Vision and goals recap
   - Tech stack summary
   - Architecture overview

2. **Documentation Created:**
   - List all files created
   - Show folder structure

3. **Immediate Next Steps:**
   - What to do first
   - Who should be involved
   - When to start

4. **Recommended Slash Commands:**
   - `/create-project` - For future major initiatives
   - `/create-task` - For small tasks
   - `/architecture` - Work with Winston on design
   - `/implement` - Work with Amelia on coding
   - `/status` - Check progress anytime

### Critical Actions:

- **ASK CLARIFYING QUESTIONS** - Don't assume, ask for details
- **CAPTURE EVERYTHING** - Document all answers in appropriate files
- **THINK LONG-TERM** - Set up for future success, not just immediate needs
- **BE COMPREHENSIVE** - This is the foundation for the entire project
- **MAKE RECOMMENDATIONS** - Suggest best practices based on requirements

### Output Format:

After completion, provide:

1. **📋 Project Overview** (vision, goals, tech stack)
2. **📁 Documentation Created** (list all files)
3. **🎯 Prioritized Roadmap** (what to build first)
4. **🚀 Immediate Next Steps** (how to get started)
5. **🤝 Recommended Workflows** (slash commands to use)

---

**Ready to begin discovery interview!**

Say to the user: "Let's set up your new project! I'll ask you some questions to understand your vision, requirements, and constraints. This should take about 20-30 minutes. Ready to start?"
