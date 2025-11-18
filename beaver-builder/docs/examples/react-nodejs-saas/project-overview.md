# Project Overview: SubscriptFlow

**Last Updated:** 2025-11-18
**Project Phase:** MVP Development (Month 3 of 5)
**Status:** Active Development

## Executive Summary

SubscriptFlow is a B2B SaaS platform that helps businesses manage recurring subscription billing, customer lifecycle management, and payment processing. We're building a Stripe alternative focused on the SMB market with better UX and more flexible pricing models.

**Target Launch:** January 2026 (2 months remaining)
**Current MRR Target:** $50K by Month 6 post-launch
**Initial Customer Segment:** SaaS companies with 10-500 customers

## Project Identity

### Basic Information

- **Project Name:** SubscriptFlow
- **Repository:** github.com/subscriptflow/platform (private)
- **Domain:** subscriptflow.com
- **Environment:**
  - Production: app.subscriptflow.com
  - Staging: staging.subscriptflow.com
  - Local: localhost:3000 (frontend) / localhost:5000 (backend)

### Team Composition

- **Engineering Team:** 5 full-time engineers
  - Frontend: Sarah Chen (Lead), Marcus Rodriguez
  - Backend: David Kumar (Lead), Elena Popov
  - DevOps/Infrastructure: James Park
- **Product:** Jessica Martinez (PM)
- **Design:** Alex Thompson (UX/UI)
- **Business:** Founders (2): CEO + CTO

### Communication Channels

- **Daily Standups:** 9:30 AM PST via Zoom
- **Planning:** Biweekly Mondays, 2:00 PM PST
- **Slack:** #engineering, #product, #general
- **Documentation:** Notion for business docs, Confluence for technical specs
- **Code Review:** GitHub PRs (2 approvals required)

## Technical Architecture

### Technology Stack

#### Frontend

- **Framework:** React 18.2.0
- **Language:** TypeScript 5.1.6
- **State Management:** Redux Toolkit 1.9.5
- **Server State:** React Query 4.0.10
- **Routing:** React Router 6.11.2
- **Styling:** Tailwind CSS 3.3.2
- **UI Components:** Headless UI 1.7.15
- **Forms:** React Hook Form 7.44.3
- **Validation:** Zod 3.21.4
- **Build Tool:** Vite 4.3.9
- **Testing:** Vitest, React Testing Library

#### Backend

- **Runtime:** Node.js 20.5.0 LTS
- **Framework:** Express 4.18.2
- **Language:** TypeScript 5.1.6
- **ORM:** Prisma 5.0.0
- **Validation:** Zod 3.21.4
- **Authentication:** jsonwebtoken 9.0.1, bcrypt 5.1.0
- **API Documentation:** OpenAPI 3.0, Swagger UI
- **Testing:** Jest 29.5.0, Supertest 6.3.3

#### Database & Caching

- **Primary Database:** PostgreSQL 15.3
- **Caching Layer:** Redis 7.0.11
- **Search:** PostgreSQL Full-Text Search (considering Elasticsearch)
- **File Storage:** AWS S3
- **Database Migrations:** Prisma Migrate

#### Infrastructure & DevOps

- **Container:** Docker 24.0, Docker Compose for local dev
- **Orchestration:** AWS ECS Fargate
- **CI/CD:** GitHub Actions
- **Hosting:** AWS (us-west-2)
- **CDN:** CloudFront
- **Monitoring:** CloudWatch, Sentry
- **Logging:** Winston, CloudWatch Logs

#### External Services

- **Payments:** Stripe Connect API v2023-08-16
- **Email:** SendGrid (transactional) + Customer.io (marketing)
- **Authentication:** Auth0 (OAuth social login)
- **Error Tracking:** Sentry
- **Analytics:** Mixpanel
- **Support:** Intercom

### System Architecture

#### High-Level Components

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  React SPA + Redux Store + React Query Cache                │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTPS/REST
┌────────────────────▼────────────────────────────────────────┐
│                      API Gateway                             │
│  Express Server + JWT Auth + Rate Limiting                  │
└──┬──────────┬───────────┬──────────────┬───────────────────┘
   │          │           │              │
   ▼          ▼           ▼              ▼
┌──────┐  ┌──────┐  ┌──────────┐  ┌──────────┐
│ Auth │  │Billing│  │Customer  │  │Analytics │
│Service│  │Service│  │Service   │  │Service   │
└──┬───┘  └──┬───┘  └────┬─────┘  └────┬─────┘
   │         │           │              │
   └─────────┴───────────┴──────────────┘
                     │
        ┌────────────▼────────────┐
        │   PostgreSQL 15         │
        │   (Primary Database)    │
        └─────────────────────────┘
        ┌─────────────────────────┐
        │      Redis 7            │
        │   (Cache + Sessions)    │
        └─────────────────────────┘
```

#### Data Flow

1. **User Request:** Client sends authenticated request to API
2. **Authentication:** JWT validated, user context loaded from Redis cache
3. **Business Logic:** Service layer processes request, applies business rules
4. **Data Layer:** Prisma ORM translates to SQL, PostgreSQL executes
5. **Response:** JSON response with appropriate status code
6. **Caching:** Frequently accessed data cached in Redis (5-minute TTL)

### Database Schema (Core Tables)

#### Users & Authentication

- `users` - User accounts (email, password_hash, created_at)
- `sessions` - Active sessions (token, user_id, expires_at)
- `oauth_providers` - Social login connections (provider, provider_user_id)

#### Billing & Subscriptions

- `organizations` - Customer businesses (name, domain, stripe_customer_id)
- `plans` - Subscription plans (name, price, billing_interval)
- `subscriptions` - Active subscriptions (org_id, plan_id, status, current_period_end)
- `invoices` - Billing history (org_id, amount, status, paid_at)
- `payment_methods` - Stored payment methods (stripe_payment_method_id)

#### Usage & Analytics

- `usage_events` - Metered billing events (org_id, event_type, quantity, timestamp)
- `audit_logs` - System audit trail (user_id, action, resource, timestamp)

### Key Features

#### Phase 1 (Current MVP - Month 3/5)

- ✅ User registration and authentication
- ✅ Organization/workspace management
- 🔄 Subscription plan creation and management (80% complete)
- 🔄 Payment processing via Stripe (60% complete)
- ⏳ Usage tracking and metered billing (planned Month 4)
- ⏳ Invoice generation and delivery (planned Month 4)

#### Phase 2 (Post-MVP - Months 6-8)

- Customer portal for end-users
- Dunning management (failed payment recovery)
- Webhook management for customer integrations
- Advanced analytics dashboard
- Multi-currency support

#### Phase 3 (Growth - Months 9-12)

- API access for customers
- Custom billing rules engine
- Revenue recognition reporting
- Team collaboration features
- White-label options

## Development Workflow

### Environment Setup

```bash
# Prerequisites
node --version  # 20.5.0 or higher
docker --version  # 24.0 or higher
git --version

# Clone and setup
git clone git@github.com:subscriptflow/platform.git
cd platform
npm install

# Environment configuration
cp .env.example .env.local
# Edit .env.local with local database credentials

# Start services
docker-compose up -d  # Starts PostgreSQL + Redis
npm run db:migrate    # Run Prisma migrations
npm run db:seed       # Seed test data

# Start development servers
npm run dev:frontend  # Vite dev server on :3000
npm run dev:backend   # Express server on :5000
```

### Git Workflow

- **Main Branch:** `main` (production-ready, protected)
- **Development Branch:** `develop` (integration branch)
- **Feature Branches:** `feature/[ticket-id]-brief-description`
- **Hotfix Branches:** `hotfix/[issue-description]`

**Branch Strategy:**

1. Create feature branch from `develop`
2. Implement feature with tests
3. Open PR with description and screenshots
4. Require 2 approvals (1 from team lead)
5. Pass CI checks (lint, tests, build)
6. Squash merge to `develop`
7. Weekly releases from `develop` → `main`

### Testing Strategy

- **Unit Tests:** Jest for backend, Vitest for frontend (target: 80% coverage)
- **Integration Tests:** API endpoint testing with Supertest
- **E2E Tests:** Playwright for critical user flows (auth, subscription purchase)
- **Manual Testing:** QA checklist before each release
- **Performance Testing:** Lighthouse CI for frontend, k6 for API load tests

### Deployment Pipeline

#### CI/CD Workflow (GitHub Actions)

```yaml
Pull Request:
  - Lint (ESLint, Prettier)
  - Type check (TypeScript)
  - Unit tests + coverage report
  - Integration tests
  - Build verification

Merge to develop:
  - All PR checks
  - Deploy to staging environment
  - Run smoke tests
  - Notify team in Slack

Merge to main:
  - All develop checks
  - Deploy to production (ECS blue/green)
  - Database migrations (zero-downtime)
  - Run smoke tests
  - Monitor error rates for 1 hour
```

#### Environments

- **Local:** Full stack on developer machine (Docker)
- **Staging:** AWS ECS, mirrors production, uses test Stripe account
- **Production:** AWS ECS, auto-scaling (2-10 containers), production Stripe

## Security & Compliance

### Authentication & Authorization

- **Password Policy:** 12 chars min, complexity requirements
- **Password Hashing:** bcrypt with cost factor 12
- **JWTs:** RS256 signing, 15-minute access tokens, 7-day refresh tokens
- **Session Management:** Redis-backed, secure httpOnly cookies
- **OAuth:** Auth0 for Google, GitHub, Microsoft login

### Data Security

- **Encryption at Rest:** RDS encryption enabled (AES-256)
- **Encryption in Transit:** TLS 1.3 for all API traffic
- **Secrets Management:** AWS Secrets Manager
- **Database Access:** Private subnet, VPC security groups
- **PII Handling:** Pseudonymization for analytics, GDPR-compliant deletion

### Compliance Requirements

- **PCI DSS:** Achieved through Stripe (SAQ-A compliance)
- **GDPR:** Data export, deletion, consent management
- **SOC 2 Type II:** Target for Month 12 (currently building controls)

### Security Practices

- **Dependency Scanning:** Snyk in CI/CD, weekly audits
- **SAST:** SonarCloud for code quality and security
- **Penetration Testing:** Planned before launch (external firm)
- **Incident Response:** Runbook in Confluence, PagerDuty alerts

## Performance & Scalability

### Current Performance Metrics

- **API Response Time:** p95 < 200ms (current: 150ms avg)
- **Frontend Load Time:** LCP < 2.5s (current: 1.8s)
- **Database Query Time:** p95 < 50ms (current: 35ms avg)
- **Uptime Target:** 99.9% (allows 43min downtime/month)

### Scalability Considerations

- **Database:** Connection pooling (max 20), read replicas planned for Month 6
- **Caching:** Redis for session + frequently accessed data (5-min TTL)
- **Rate Limiting:** 1000 req/hour per user, 10000 req/hour per org
- **Background Jobs:** Bull Queue for async processing (emails, webhooks)
- **Auto-scaling:** ECS scales 2-10 containers based on CPU (target: 70%)

### Monitoring & Alerting

- **Application Metrics:** Response time, error rate, throughput (CloudWatch)
- **Infrastructure Metrics:** CPU, memory, disk, network (CloudWatch)
- **Business Metrics:** Signups, subscriptions, MRR, churn (Mixpanel)
- **Error Tracking:** Sentry for exceptions and performance issues
- **Alerts:** PagerDuty for P0/P1, Slack for P2/P3
  - P0: Production down (< 5 min response)
  - P1: Feature broken (< 30 min response)
  - P2: Performance degradation (< 4 hour response)
  - P3: Minor issues (next business day)

## Project Timeline

### Historical Milestones

- **Month 0 (Aug 2025):** Project kickoff, architecture planning
- **Month 1 (Sep 2025):** Basic authentication, database schema, CI/CD setup
- **Month 2 (Oct 2025):** Organization management, Stripe integration started
- **Month 3 (Nov 2025):** Subscription flow implementation (current)

### Current Sprint (Nov 11-24, 2025)

- Complete subscription purchase flow
- Implement payment method management
- Add subscription upgrade/downgrade
- Write E2E tests for checkout flow

### Upcoming Milestones

- **Month 4 (Dec 2025):** Usage tracking, invoice generation, customer portal MVP
- **Month 5 (Jan 2026):** Beta testing, bug fixes, security audit, launch prep
- **Launch (End of Jan 2026):** Public release with 10 design partners

### Post-Launch Roadmap (Feb-Jun 2026)

- Month 6: Dunning management, advanced analytics
- Month 7: API access, webhook management
- Month 8: Multi-currency, custom billing rules
- Month 9-12: Enterprise features, SOC 2 certification

## Known Issues & Technical Debt

### P1 Issues (Must fix before launch)

1. Webhook retry logic not implemented (causes dropped events)
2. No rate limiting on password reset endpoint (security risk)
3. Invoice PDF generation is synchronous (blocks API response)

### P2 Issues (Should fix post-launch)

1. N+1 queries in subscription listing page (performance)
2. Frontend bundle size is 800KB (target: <500KB)
3. No database query optimization for reporting queries

### Technical Debt

1. Backend integration tests coverage is 45% (target: 80%)
2. Error messages are developer-focused, not user-friendly
3. No feature flag system (makes gradual rollouts hard)
4. Some TypeScript files use `any` types (reduces type safety)

## Risks & Mitigation

### Technical Risks

- **Risk:** Stripe webhook reliability during high load
  - **Mitigation:** Implement idempotent webhook handlers, SQS queue for retries
- **Risk:** Database performance as data grows
  - **Mitigation:** Proper indexing, query optimization, read replicas planned

### Business Risks

- **Risk:** Design partners churn before launch
  - **Mitigation:** Weekly check-ins, rapid bug fixes, feature prioritization
- **Risk:** Stripe API changes breaking integration
  - **Mitigation:** Pin API version, monitor Stripe changelog, test in staging first

### Security Risks

- **Risk:** Payment data exposure
  - **Mitigation:** Never store card numbers, use Stripe Elements, regular audits
- **Risk:** Account takeover attacks
  - **Mitigation:** 2FA implementation (planned Month 4), login anomaly detection

## Resources & References

### Documentation Links

- **Technical Specs:** https://subscriptflow.atlassian.net/wiki
- **API Documentation:** http://localhost:5000/api-docs (Swagger)
- **Design System:** https://www.figma.com/subscriptflow-design-system
- **Runbooks:** https://subscriptflow.atlassian.net/wiki/runbooks

### External Documentation

- **React:** https://react.dev/
- **Express:** https://expressjs.com/
- **Prisma:** https://www.prisma.io/docs
- **PostgreSQL:** https://www.postgresql.org/docs/15/
- **Stripe:** https://stripe.com/docs/api

### Learning Resources

- **TypeScript Deep Dive:** https://basarat.gitbook.io/typescript/
- **Node.js Best Practices:** https://github.com/goldbergyoni/nodebestpractices
- **React Patterns:** https://reactpatterns.com/

## Decision History

Major architectural decisions are documented in ADRs:

- [ADR-001: Tech Stack Choice](./architecture/ADR-001-tech-stack-choice.md)
- [ADR-002: Database Choice](./architecture/ADR-002-database-choice.md)
- [ADR-003: Authentication Approach](./architecture/ADR-003-auth-approach.md)

## Contact & Support

### Team Leads

- **Technical:** David Kumar (backend-lead@subscriptflow.com)
- **Frontend:** Sarah Chen (frontend-lead@subscriptflow.com)
- **Product:** Jessica Martinez (pm@subscriptflow.com)

### Getting Help

- **Code Questions:** #engineering Slack channel
- **Product Questions:** #product Slack channel
- **Infrastructure Issues:** Tag @james-park in Slack
- **Urgent Issues:** PagerDuty escalation

---

**Document Maintenance:** This document is reviewed and updated at the end of each sprint (biweekly).
