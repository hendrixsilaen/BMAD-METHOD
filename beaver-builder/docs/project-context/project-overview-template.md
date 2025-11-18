# Project Overview

**Project Name:** [Name]
**Version:** [Current version or phase]
**Created:** [Date]
**Last Updated:** [Date] by [Agent Name]

---

## 🎯 Project Vision

### What We're Building

[2-3 paragraphs describing the project at a high level]

**In one sentence:**
[Elevator pitch - what this project does and why it matters]

### Problem Statement

**Current Situation:**
[What problem exists today that this project solves?]

**User Pain Points:**

- [Pain point 1]
- [Pain point 2]
- [Pain point 3]

**Solution:**
[How this project solves the problem]

### Success Criteria

**This project will be successful when:**

- [ ] [Measurable outcome 1]
- [ ] [Measurable outcome 2]
- [ ] [Measurable outcome 3]

**Success Metrics:**

- [Metric 1]: Target [value]
- [Metric 2]: Target [value]
- [Metric 3]: Target [value]

---

## 👥 Target Users

### Primary User Personas

#### Persona 1: [Name/Type]

- **Role:** [Job title or role]
- **Goals:** [What they want to accomplish]
- **Pain Points:** [What frustrates them today]
- **How this helps:** [How our project solves their problems]

#### Persona 2: [Name/Type]

- **Role:** [Job title or role]
- **Goals:** [What they want to accomplish]
- **Pain Points:** [What frustrates them today]
- **How this helps:** [How our project solves their problems]

### User Needs & Use Cases

**Primary Use Cases:**

1. **[Use Case 1]:** [Description]
2. **[Use Case 2]:** [Description]
3. **[Use Case 3]:** [Description]

---

## 🏗️ System Architecture

### Tech Stack

#### Frontend

- **Framework:** [React / Vue / Angular / etc.]
- **Language:** [TypeScript / JavaScript]
- **State Management:** [Redux / Zustand / Context / etc.]
- **UI Library:** [Tailwind / Material-UI / etc.]
- **Build Tool:** [Vite / Webpack / etc.]

#### Backend

- **Framework:** [Express / Django / Spring / etc.]
- **Language:** [TypeScript / Python / Java / etc.]
- **API Style:** [REST / GraphQL / gRPC]
- **Authentication:** [JWT / OAuth / Sessions]

#### Database

- **Primary Database:** [PostgreSQL / MongoDB / MySQL / etc.]
- **Caching:** [Redis / Memcached / etc.]
- **Search:** [Elasticsearch / etc. or None]

#### Infrastructure

- **Hosting:** [AWS / GCP / Azure / Vercel / etc.]
- **Container Orchestration:** [Kubernetes / Docker Compose / etc.]
- **CI/CD:** [GitHub Actions / GitLab CI / Jenkins / etc.]
- **Monitoring:** [DataDog / New Relic / Sentry / etc.]

### High-Level Architecture

**System Components:**

```
[ASCII diagram or description of major components and how they connect]

Example:
┌─────────────┐      ┌──────────────┐      ┌──────────────┐
│   Browser   │ ───> │  API Gateway │ ───> │   Services   │
└─────────────┘      └──────────────┘      └──────────────┘
                            │                      │
                            v                      v
                     ┌──────────────┐      ┌──────────────┐
                     │    Cache     │      │   Database   │
                     └──────────────┘      └──────────────┘
```

**Component Descriptions:**

- **[Component 1]:** [What it does, responsibilities]
- **[Component 2]:** [What it does, responsibilities]
- **[Component 3]:** [What it does, responsibilities]

### Data Flow

**Typical Request Flow:**

1. [Step 1: User action]
2. [Step 2: Frontend processing]
3. [Step 3: API call]
4. [Step 4: Backend processing]
5. [Step 5: Database interaction]
6. [Step 6: Response]

### External Integrations

**Third-Party Services:**

- **[Service 1]:** [Purpose] - [Docs link]
- **[Service 2]:** [Purpose] - [Docs link]
- **[Service 3]:** [Purpose] - [Docs link]

---

## 🗂️ Code Organization

### Folder Structure

```
project-root/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API clients
│   │   ├── store/          # State management
│   │   └── utils/          # Utility functions
│   └── tests/
├── backend/
│   ├── src/
│   │   ├── routes/         # API endpoints
│   │   ├── controllers/    # Business logic
│   │   ├── models/         # Data models
│   │   ├── services/       # Services layer
│   │   └── utils/          # Utilities
│   └── tests/
└── docs/
    └── beaver-builder/     # AI agent documentation
```

### Key Files & Entry Points

**Frontend:**

- **Entry Point:** `frontend/src/main.tsx` or `frontend/src/index.tsx`
- **Routing:** `frontend/src/router.tsx` or `frontend/src/App.tsx`
- **API Client:** `frontend/src/services/api.ts`

**Backend:**

- **Entry Point:** `backend/src/server.ts` or `backend/src/app.py`
- **API Routes:** `backend/src/routes/`
- **Database Config:** `backend/src/config/database.ts`

### Conventions & Standards

**Code Style:**

- **Linting:** [ESLint / Pylint / etc.]
- **Formatting:** [Prettier / Black / etc.]
- **Naming Conventions:** [camelCase / snake_case / etc.]

**Git Workflow:**

- **Branching:** [main/develop/feature branches]
- **Commit Messages:** [Conventional Commits / etc.]
- **PR Process:** [Review requirements]

**Testing:**

- **Unit Tests:** [Jest / pytest / etc.]
- **Integration Tests:** [Approach]
- **E2E Tests:** [Playwright / Cypress / etc.]
- **Coverage Target:** [X]%

---

## 📋 Core Features

### Implemented Features

- ✅ **[Feature 1]:** [Description]
  - **Status:** Production
  - **Documentation:** [Link]

- ✅ **[Feature 2]:** [Description]
  - **Status:** Production
  - **Documentation:** [Link]

### In Progress

- 🚧 **[Feature 3]:** [Description]
  - **Status:** [X]% complete
  - **Expected:** [Date]
  - **Assigned:** [Agent/Team]

### Planned Features

- 📋 **[Feature 4]:** [Description]
  - **Priority:** High / Medium / Low
  - **Timeline:** [Quarter or month]

---

## 🔐 Security & Compliance

### Security Measures

- **Authentication:** [How users authenticate]
- **Authorization:** [How permissions work]
- **Data Encryption:** [At rest and in transit approaches]
- **Secrets Management:** [How secrets are handled]

### Compliance Requirements

- **[Requirement 1]:** [e.g., GDPR, HIPAA, etc.]
- **[Requirement 2]:** [e.g., SOC2, etc.]

---

## 📊 Performance & Scale

### Performance Requirements

- **Page Load Time:** < [X] seconds
- **API Response Time:** < [X]ms (p95)
- **Concurrent Users:** Support [X] users
- **Database Queries:** < [X]ms average

### Current Metrics

- **Users:** [Active users or expected]
- **Requests:** [Requests per day/minute]
- **Data Volume:** [Database size]
- **Uptime:** [Target uptime %]

---

## 🚀 Development Workflow

### Local Development

**Prerequisites:**

- Node.js [version]
- [Database] [version]
- [Other tools]

**Setup Steps:**

```bash
# 1. Clone repository
git clone [repo-url]

# 2. Install dependencies
cd project && npm install

# 3. Set up environment
cp .env.example .env
# Edit .env with local values

# 4. Start database
docker-compose up -d db

# 5. Run migrations
npm run migrate

# 6. Start development server
npm run dev
```

**Available Commands:**

- `npm run dev` - Start development server
- `npm run test` - Run tests
- `npm run build` - Build for production
- `npm run lint` - Run linter
- `npm run typecheck` - Run type checking

### Testing Strategy

**Test Levels:**

1. **Unit Tests:** Test individual functions/components
2. **Integration Tests:** Test API endpoints and services
3. **E2E Tests:** Test critical user flows
4. **Performance Tests:** Load and stress testing

**Running Tests:**

```bash
npm run test           # All tests
npm run test:unit      # Unit tests only
npm run test:integration  # Integration tests
npm run test:e2e       # E2E tests
```

### Deployment

**Environments:**

- **Development:** Auto-deploy from `develop` branch
- **Staging:** Auto-deploy from `staging` branch
- **Production:** Manual deploy from `main` branch

**Deployment Process:**

1. [Step 1]
2. [Step 2]
3. [Step 3]

---

## 💡 Key Architectural Decisions

### Major Decisions

**See full ADRs in `docs/architecture/` for details:**

1. **[ADR-001: Tech Stack Choice](../architecture/ADR-001-tech-stack-choice.md)**
   - **Decision:** [Chosen tech]
   - **Why:** [Brief rationale]

2. **[ADR-002: Database Choice](../architecture/ADR-002-database-choice.md)**
   - **Decision:** [Chosen database]
   - **Why:** [Brief rationale]

3. **[ADR-003: API Design](../architecture/ADR-003-api-design.md)**
   - **Decision:** [REST/GraphQL/etc.]
   - **Why:** [Brief rationale]

---

## 🚨 Known Issues & Technical Debt

### Critical Issues

- 🔴 **[Issue 1]:** [Description]
  - **Impact:** [What's affected]
  - **Workaround:** [Temporary solution]
  - **Owner:** [Who's responsible]

### Technical Debt

- **[Debt Item 1]:** [Description]
  - **Impact:** [Why it matters]
  - **Plan:** [When/how to address]

---

## 📚 Documentation

### For Developers

- **Architecture:** `docs/architecture/`
- **API Docs:** [Link or location]
- **Code Comments:** [Standards and expectations]
- **Contributing Guide:** [CONTRIBUTING.md or equivalent]

### For Users

- **User Guide:** [Link]
- **FAQ:** [Link]
- **Support:** [How to get help]

---

## 🤝 Team & Stakeholders

### Development Team

- **Product Owner:** [Name/Agent]
- **Architect:** [Name/Agent - Winston]
- **Developers:** [Names/Agents - Amelia, etc.]
- **QA/Test:** [Name/Agent - Murat]
- **Documentation:** [Name/Agent - Paige]

### Stakeholders

- **Business Sponsor:** [Name]
- **Key Users:** [Names or user groups]
- **External Partners:** [If any]

---

## 🔄 Project History

### Major Milestones

- **[Date]:** Project initiated
- **[Date]:** First release (v1.0)
- **[Date]:** [Major milestone]

### Evolution

**Version History:**

- **v1.0:** [What was included]
- **v2.0:** [Major changes]
- **Current:** [Where we are now]

---

## 🎯 Future Vision

### Roadmap

**Near-term (3-6 months):**

- [Feature or improvement 1]
- [Feature or improvement 2]

**Medium-term (6-12 months):**

- [Feature or improvement 1]
- [Feature or improvement 2]

**Long-term (12+ months):**

- [Feature or improvement 1]
- [Feature or improvement 2]

### Open Questions

- [ ] **Q:** [Question that needs answering]
  - **Context:** [Why this matters]
  - **Decision needed by:** [Date]

---

## 📞 Getting Help

### Resources

- **Documentation:** `docs/`
- **Project Progress:** `docs/project-context/project-progress.md`
- **Meeting Notes:** `docs/meetings/`
- **Slack/Discord:** [Link or channel name]

### Key Contacts

- **Technical Questions:** [Winston or architect]
- **Product Questions:** [John or PM]
- **Process Questions:** [Bob or scrum master]

---

_This document provides a high-level overview of the entire project. For detailed information, see the linked documentation throughout._

_Last updated: [Date] by [Agent Name]_
