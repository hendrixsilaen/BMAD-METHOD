# Onboard New Project

Conduct a structured discovery interview to gather comprehensive project context for a new project.

## Instructions

You are now the **Orchestrator** conducting a discovery interview for a new project. Your goal is to understand requirements, make key decisions, and set up the complete beaver-builder knowledge base.

**Estimated total time:** 20-30 minutes

**Say to user:** "🚀 Starting new project onboarding! This will take approximately 20-30 minutes and is divided into 5 phases. I'll ask you questions to understand your vision and help set up your project for success."

---

### Phase 1: Project Discovery Interview (15-20 minutes)

**Say to user:** "💡 **Phase 1/5: Project Discovery Interview** (estimated 15-20 min) - Let me understand your vision, requirements, and constraints..."

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

**After Phase 1 completes, say to user:**

```
✅ **Phase 1 complete!** (actual time: [X] min)

📋 **Discovery Summary:**

**Project Vision:**
- Name: [Project name from answers]
- Purpose: [Problem statement from answers]
- Target Users: [User description]
- Success Criteria: [Goals/metrics]

**Core Features (Prioritized):**
1. [Must-have feature 1]
2. [Must-have feature 2]
3. [Must-have feature 3]
4. [Nice-to-have features...]

**Technical Context:**
- Platform: [Web/Mobile/API/Desktop]
- Tech Preferences: [Stack preferences or constraints]
- Non-functional Reqs: [Performance, security, scalability needs]

**Team & Timeline:**
- Team Size: [Number] developers
- Methodology: [Agile/Kanban/etc]
- Timeline: [Duration or deadline]

**Example Interview Response:**
```

Q: "What is the project's name and primary purpose?"
A: "TaskFlow - A collaborative task management platform for remote teams"

Q: "What problem does this project solve?"
A: "Remote teams struggle to coordinate tasks across time zones. TaskFlow provides real-time task sync with async updates and notifications."

Q: "What are the core features needed?"
A: "Must-have: User auth, task creation/assignment, real-time collaboration, notifications. Nice-to-have: Analytics dashboard, integrations with Slack/Teams."

Q: "Do you have preferred technologies?"
A: "Yes - React for frontend (team expertise), prefer PostgreSQL for reliability, need WebSocket support for real-time features."

```

```

**Checkpoint - Ask user:** "Phase 1 complete. Please review the discovery summary above. Is this accurate? Ready for Phase 2 (architecture & technical planning, ~15 min)? [Y/n]"

- If user says **no** or wants changes: Revise discovery summary based on feedback
- If user says **yes** or gives affirmative: Continue to Phase 2

---

### Phase 2: Architecture & Technical Planning (15 minutes)

**Say to user:** "🏗️ **Phase 2/5: Architecture & Technical Planning** (estimated 15 min) - Designing system architecture and making technical decisions with Winston (Architect)..."

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

**After Phase 2 completes, say to user:**

```
✅ **Phase 2 complete!** (actual time: [X] min)

🏗️ **Architecture & Tech Decisions:**

**Recommended Tech Stack:**
- **Frontend:** [e.g., "React 18 + TypeScript + Vite"]
- **Backend:** [e.g., "Node.js + Express + TypeScript"]
- **Database:** [e.g., "PostgreSQL 15 (primary) + Redis (caching)"]
- **Real-time:** [e.g., "Socket.io for WebSocket connections"]
- **Auth:** [e.g., "JWT with refresh tokens"]
- **Deployment:** [e.g., "Docker + AWS ECS"]

**Rationale:** [Brief explanation of why these choices fit requirements]

**High-Level Architecture:**
```

┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ React │─────▶│ Express │─────▶│ PostgreSQL │
│ Frontend │ │ API │ │ Database │
│ │◀─────│ │◀─────│ │
└─────────────┘ └─────────────┘ └─────────────┘
▲ │
│ ▼
│ ┌─────────────┐
└─────────────│ Socket.io │
│ Real-time │
└─────────────┘

````

**Key Architectural Decisions:**
1. **ADR-001: Tech Stack Choice** - React + Express + PostgreSQL
   - Options: React vs Vue, Express vs Fastify, PostgreSQL vs MongoDB
   - Decision: React (team expertise), Express (maturity), PostgreSQL (data consistency)

2. **ADR-002: Real-time Strategy** - WebSockets via Socket.io
   - Options: WebSockets, Server-Sent Events, Polling
   - Decision: WebSockets for bidirectional real-time communication

3. **ADR-003: Authentication Approach** - JWT with refresh tokens
   - Options: Sessions, JWT, OAuth only
   - Decision: JWT for stateless API, refresh tokens for security

**Example Architecture Output:**
```markdown
## System Architecture

### Components:
1. **Web Client (React)**
   - User interface
   - State management (Redux Toolkit)
   - Real-time updates via Socket.io client

2. **API Server (Express)**
   - RESTful API endpoints
   - WebSocket server for real-time
   - JWT authentication middleware
   - Business logic layer

3. **Database (PostgreSQL)**
   - User data
   - Task data with relations
   - Optimistic locking for concurrent updates

4. **Cache Layer (Redis)**
   - Session storage
   - Real-time presence data
   - Rate limiting
````

```

**Checkpoint - Ask user:** "Phase 2 complete. Review the architecture and tech decisions above. Any concerns or changes needed? Ready for Phase 3 (project setup, ~10 min)? [Y/n]"

- If user says **no** or wants changes: Revise architecture based on feedback
- If user says **yes** or gives affirmative: Continue to Phase 3

---

### Phase 3: Project Setup (10 minutes)

**Say to user:** "📝 **Phase 3/5: Project Setup** (estimated 10 min) - Creating comprehensive project documentation and initial requirements..."

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

**After Phase 3 completes, say to user:**

```

✅ **Phase 3 complete!** (actual time: [X] min)

📁 **Documentation Created:**

- ✅ beaver-builder/docs/project-context/project-overview.md
- ✅ beaver-builder/docs/project-context/project-progress.md
- ✅ beaver-builder/docs/requirements/US-001-[feature-name].md
- ✅ beaver-builder/docs/architecture/ADR-001-tech-stack-choice.md
- ✅ beaver-builder/docs/architecture/ADR-002-realtime-strategy.md
- ✅ beaver-builder/docs/architecture/ADR-003-authentication-approach.md
- ✅ beaver-builder/docs/projects/mvp-v1/progress.md

📋 **Sample User Story Created:**

```markdown
# US-001: User Authentication

## User Story

As a **remote team member**
I want to **securely log in to TaskFlow**
So that **I can access my team's tasks and collaborate**

## Acceptance Criteria

- [ ] User can register with email and password
- [ ] Password must be 8+ characters with complexity requirements
- [ ] User can log in with valid credentials
- [ ] JWT token issued on successful login
- [ ] Token expires after 24 hours
- [ ] User can log out (token invalidated)

## Technical Notes

- Use bcrypt for password hashing
- Implement JWT with refresh token pattern
- Store refresh tokens in PostgreSQL
- Rate limit login attempts (5 per 15 min)
```

```

**Checkpoint - Ask user:** "Phase 3 complete. Project documentation structure created. Ready for Phase 4 (development roadmap, ~10 min)? [Y/n]"

- If user says **no**: Skip to final summary
- If user says **yes** or gives affirmative: Continue to Phase 4

---

### Phase 4: Development Roadmap (10 minutes)

**Say to user:** "🗓️ **Phase 4/5: Development Roadmap** (estimated 10 min) - Creating prioritized roadmap and timeline..."

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

**After Phase 4 completes, say to user:**

```

✅ **Phase 4 complete!** (actual time: [X] min)

🗓️ **Development Roadmap Created:**

**Week 1: Foundation**

- Set up development environment (Node.js, PostgreSQL, Docker)
- Initialize React + Express projects
- Configure TypeScript, ESLint, testing frameworks
- Set up CI/CD pipeline (GitHub Actions)

**Weeks 2-4: Core Authentication & Infrastructure**

- Implement US-001: User Authentication
- Set up database schema and migrations
- Implement JWT authentication middleware
- Add basic error handling and logging

**Months 2-3: Core Features**

- Task CRUD operations
- Real-time collaboration (WebSocket integration)
- Notification system
- Team management

**Months 4+: Polish & Scale**

- Analytics dashboard
- Third-party integrations (Slack, Teams)
- Performance optimization
- Production deployment

**Milestones:**

- ✅ Week 1: Development environment ready
- 🎯 Week 4: Authentication complete and tested
- 🎯 Month 2: Core task features working
- 🎯 Month 3: Real-time collaboration live
- 🎯 Month 4: MVP launch

```

**Checkpoint - Ask user:** "Phase 4 complete. Review the roadmap above. Does this timeline align with expectations? Ready for Phase 5 (final summary, ~5 min)? [Y/n]"

- If user says **no** or wants changes: Adjust roadmap based on feedback
- If user says **yes** or gives affirmative: Continue to Phase 5

---

### Phase 5: Summary & Kickoff (5 minutes)

**Say to user:** "🎯 **Phase 5/5: Summary & Kickoff** (estimated 5 min) - Generating final summary and next steps..."

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

**After Phase 5 completes, say to user:**

```

🎉 **Onboarding Complete!**

⏱️ **Total time:** [X] minutes (estimated: 20-30 min)

**Phase breakdown:**

- Phase 1 (Discovery Interview): [X] min
- Phase 2 (Architecture & Planning): [X] min
- Phase 3 (Project Setup): [X] min
- Phase 4 (Development Roadmap): [X] min
- Phase 5 (Summary & Kickoff): [X] min

📊 **Project Summary:**

- **Name:** [Project name]
- **Purpose:** [Problem being solved]
- **Tech Stack:** [Primary stack]
- **Timeline:** [Target launch date]
- **First Milestone:** [Week 1 goal]

📁 **Documentation Created:** [X] files in beaver-builder/docs/

- Project context (overview, progress, tech stack)
- Architecture decisions ([X] ADRs)
- Initial user story (US-001)
- MVP project tracking

🎯 **Immediate Next Steps:**

1. Set up development environment (see roadmap Week 1)
2. Initialize project structure and dependencies
3. Start implementing US-001: [Feature name]

🤝 **Start Working:**

- `/orchestrate` - General help with anything
- `/create-task` - Create small tasks
- `/architecture` - Work with Winston on design
- `/implement` - Start coding with Amelia
- `/status` - Check project progress

✅ **Your new project is ready to build!**

```

---

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
```
