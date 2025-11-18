# Beaver-Builder Example Projects

These are **3 complete, realistic examples** showing what "good" beaver-builder documentation looks like. Each example demonstrates beaver-builder applied to a different domain with ZERO placeholders - every section contains real, production-ready content.

## Purpose

These examples serve multiple purposes:

1. **Quality Standard:** Show what complete beaver-builder documentation looks like
2. **Templates:** Provide structure you can copy for your own projects
3. **Learning Tool:** Demonstrate different domains (web, ML, mobile)
4. **Reference:** Link to these when stuck or unsure what to document

## Available Examples

### 1. React + Node.js SaaS Platform

**Path:** [`react-nodejs-saas/`](./react-nodejs-saas/)

**Use when:** Building web applications, SaaS platforms, full-stack projects, subscription-based services

**Tech Stack:** React 18, TypeScript, Express 4, PostgreSQL 15, Redis 7

**Domain:** B2B SaaS subscription management platform (SubscriptFlow)

**What you'll see:**

- ✅ Complete tech stack decision ADRs with real trade-offs
- ✅ Production-ready user stories with Given/When/Then acceptance criteria
- ✅ Realistic project progress tracking with blockers and risks
- ✅ Authentication and subscription management examples
- ✅ Database schema design decisions
- ✅ Real sprint velocity and metrics tracking
- ✅ 10 files: Overview, progress, 3 ADRs, 2 user stories, project tracking

**Key Features:**

- Multi-tenancy architecture
- Stripe payment integration
- JWT authentication + OAuth 2.0
- Role-based access control
- Real-time subscription management

**Best for learning:**

- How to document architectural decisions
- Complete user story format with edge cases
- Project progress tracking patterns
- Technical debt management

---

### 2. Python ML/AI API

**Path:** [`python-ml-api/`](./python-ml-api/)

**Use when:** Building ML models, data pipelines, AI services, prediction APIs

**Tech Stack:** Python 3.11, FastAPI, scikit-learn, PyTorch, PostgreSQL

**Domain:** Sentiment analysis API service (SentimentPro)

**What you'll see:**

- ✅ ML-specific architectural decisions (framework choices, deployment)
- ✅ Model training pipeline documentation
- ✅ Experiment tracking with MLflow
- ✅ API design for ML predictions
- ✅ Data pipeline and versioning strategy
- ✅ Model performance monitoring
- ✅ 8 files: Overview, progress, 3 ADRs, 2 user stories

**Key Features:**

- BERT fine-tuning pipeline
- Hyperparameter tuning with Optuna
- ONNX model optimization
- Real-time and batch prediction APIs
- Data drift detection
- Model versioning and A/B testing

**Best for learning:**

- ML project documentation patterns
- Experiment tracking approaches
- Model deployment strategies
- API design for ML services
- Performance optimization decisions

---

### 3. React Native Mobile App

**Path:** [`mobile-app/`](./mobile-app/)

**Use when:** Building mobile apps (iOS/Android), offline-first applications, cross-platform projects

**Tech Stack:** React Native 0.72, TypeScript, Redux Toolkit, Expo 49

**Domain:** Fitness tracking mobile app (FitTrack Pro)

**What you'll see:**

- ✅ Mobile-specific architectural decisions (React Native vs native)
- ✅ Offline-first data architecture
- ✅ Background sync strategies
- ✅ Device permissions and camera integration
- ✅ App store submission process
- ✅ Performance considerations (app size, battery, FPS)
- ✅ 8 files: Overview, progress, 3 ADRs, 2 user stories

**Key Features:**

- Offline-first with background sync
- Photo upload to S3
- Cross-platform (iOS + Android)
- Redux Persist for local storage
- Push notifications planning
- TestFlight/Play Store deployment

**Best for learning:**

- Mobile-specific documentation patterns
- Offline-first architecture decisions
- Platform-specific considerations
- App store compliance documentation
- Performance optimization strategies

---

## How to Use These Examples

### 1. Browse Before Creating Your Own Docs

**Start here first:** Before creating your project documentation, spend 30-60 minutes reviewing these examples to understand the quality bar.

**What to look for:**

- Level of detail in each section
- How decisions are justified with pros/cons
- How user stories include edge cases
- How progress tracking shows real work (not idealized plans)

### 2. Copy Structure

**Don't reinvent the wheel:** Copy the folder organization and file structure directly:

```bash
# Example: Starting a new web project
cp -r examples/react-nodejs-saas/architecture/ my-project/beaver-builder/docs/architecture/
cp -r examples/react-nodejs-saas/requirements/ my-project/beaver-builder/docs/requirements/

# Then adapt content to your project specifics
```

### 3. Adapt Content

**Replace specifics, keep structure:**

- Change project name (SubscriptFlow → YourProjectName)
- Update tech stack (React → Vue, Express → NestJS, etc.)
- Replace business context with your domain
- Keep the format, completeness, and level of detail

### 4. Reference When Stuck

**Link to relevant example:**

When you're unsure what to document:

- "Not sure how to write this ADR? See [React SaaS ADR-001](./react-nodejs-saas/architecture/ADR-001-tech-stack-choice.md) for format"
- "Need user story example? Check [ML API US-001](./python-ml-api/requirements/US-001-model-training-pipeline.md)"
- "Struggling with progress tracking? Look at [Mobile App progress](./mobile-app/project-progress.md)"

### 5. Use as Quality Checklist

**Before considering documentation "done":**

- [ ] Is it as complete as the examples? (no "[Fill this]" placeholders)
- [ ] Do ADRs explain the "why" like the examples do?
- [ ] Do user stories have acceptance criteria like the examples?
- [ ] Does progress tracking show real blockers like the examples?

---

## What Makes These "Good"?

### ✅ No Placeholders

Every section has real content. Compare:

**❌ Bad (with placeholders):**

```markdown
## Tech Stack

- Frontend: [Framework]
- Backend: [Framework]
- Database: [Database choice]
```

**✅ Good (like our examples):**

```markdown
## Tech Stack

- Frontend: React 18.2.0 with TypeScript 5.1
- Backend: Express 4.18.2 with TypeScript 5.1
- Database: PostgreSQL 15.3 (AWS RDS Multi-AZ)
```

### ✅ Realistic Decisions

ADRs show actual trade-offs considered, not just the chosen option. Includes costs, alternatives considered, and rationale.

**Example:** [React SaaS ADR-001](./react-nodejs-saas/architecture/ADR-001-tech-stack-choice.md) shows 4 options with detailed pros/cons for each.

### ✅ Complete User Stories

All sections filled with testable acceptance criteria and edge cases.

**Example:** [React SaaS US-001](./react-nodejs-saas/requirements/US-001-user-authentication.md) includes 10 acceptance criteria + 8 edge cases.

### ✅ Concrete Tech Stack

Specific versions and tools, not generic descriptions.

**Example:** "React 18.2.0" not "React", "PostgreSQL 15.3" not "SQL database"

### ✅ Real Progress Tracking

Shows actual work with blockers, risks, and metrics - not idealized plans.

**Example:** [ML API progress](./python-ml-api/project-progress.md) shows flaky tests, model loading time issues, real sprint velocity.

---

## Comparison Matrix

Choose the example closest to your project type:

| Aspect              | React SaaS              | Python ML API              | React Native Mobile   |
| ------------------- | ----------------------- | -------------------------- | --------------------- |
| **Domain**          | Web application         | Machine Learning API       | Mobile app            |
| **Language**        | TypeScript              | Python                     | TypeScript            |
| **Deployment**      | AWS ECS (Docker)        | Kubernetes (Docker)        | App Stores            |
| **Data Storage**    | PostgreSQL + Redis      | PostgreSQL + S3            | Local + API           |
| **Key Challenge**   | Multi-tenancy + billing | Model training + inference | Offline-first         |
| **Team Size**       | 5 engineers             | 4 engineers                | 3 engineers           |
| **Complexity**      | High (multiple domains) | High (ML-specific)         | Medium                |
| **Best Example Of** | Full-stack web app      | ML/AI service              | Cross-platform mobile |

---

## File Count Summary

- **React + Node.js SaaS:** 10 files
  - 1 README
  - 1 Project Overview
  - 1 Project Progress
  - 3 Architecture Decision Records
  - 2 User Stories
  - 1 Project Tracking (mvp-launch/progress.md)

- **Python ML API:** 8 files
  - 1 README
  - 1 Project Overview
  - 1 Project Progress
  - 3 Architecture Decision Records
  - 2 User Stories

- **React Native Mobile App:** 8 files
  - 1 README
  - 1 Project Overview
  - 1 Project Progress
  - 3 Architecture Decision Records
  - 2 User Stories

**Total:** 26 files (this README makes 27)

---

## Next Steps

1. **Read through one complete example** (15-20 minutes)
   - Choose the one closest to your project type
   - Read all files to understand depth and completeness

2. **Compare your documentation** (if you have any)
   - Does yours have this level of detail?
   - Are there placeholders you need to fill?
   - Is your ADR rationale this thorough?

3. **Use examples as templates**
   - Copy folder structure
   - Adapt content to your project
   - Link to examples when sharing with team

4. **Bookmark for reference**
   - Come back when writing ADRs
   - Reference when creating user stories
   - Use for onboarding new team members

---

## Feedback & Improvements

These examples are living documents. If you:

- Find gaps or unclear sections
- Have suggestions for improvements
- Want to contribute additional examples (e.g., Go microservices, data engineering pipeline)

Please open an issue or PR in the beaver-builder repository.

---

**Document Maintenance:** Examples reviewed and updated quarterly
**Last Review:** 2025-11-18
**Next Review:** 2026-02-18
