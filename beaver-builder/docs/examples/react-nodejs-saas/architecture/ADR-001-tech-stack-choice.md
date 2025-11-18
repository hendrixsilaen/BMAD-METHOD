# ADR-001: Technology Stack Selection

**Status:** Accepted
**Date:** 2025-08-15
**Deciders:** David Kumar (Tech Lead), Sarah Chen (Frontend Lead), CTO
**Consulted:** Engineering team, external advisor (scaling expert)

## Context

We're building SubscriptFlow, a B2B SaaS platform for subscription billing management. We need to select a technology stack that supports:

1. **Rapid MVP development** (5-month timeline to launch)
2. **Team expertise** (existing skills in JavaScript/TypeScript ecosystem)
3. **Scalability** (target: 1000 businesses, 100K end-users by year 1)
4. **Developer productivity** (small team of 5 engineers)
5. **Ecosystem maturity** (stable libraries, good documentation, active community)
6. **Hiring availability** (ability to expand team post-launch)

### Business Constraints

- **Budget:** Limited (bootstrapped startup, $500K seed round)
- **Timeline:** Must launch by January 2026 (5 months)
- **Team:** 2 frontend, 2 backend, 1 DevOps engineer
- **Existing expertise:** Strong in JavaScript/TypeScript, moderate in Python

### Technical Requirements

- **Real-time updates:** Needed for dashboard and usage metrics
- **Third-party integrations:** Stripe, SendGrid, Auth0, analytics tools
- **Data consistency:** Critical for billing and payment processing
- **Security:** PCI DSS compliance, data encryption, secure authentication
- **Performance:** Sub-200ms API responses, <3s page loads

## Decision

We will use the following technology stack:

### Frontend

- **React 18.2** with TypeScript 5.1
- **Redux Toolkit** for state management
- **React Query** for server state and caching
- **Tailwind CSS** for styling
- **Vite** as build tool

### Backend

- **Node.js 20 LTS** with TypeScript 5.1
- **Express 4.18** for API server
- **Prisma 5.0** as ORM
- **PostgreSQL 15** for primary database
- **Redis 7** for caching and sessions

### Infrastructure

- **Docker** for containerization
- **AWS ECS Fargate** for deployment
- **GitHub Actions** for CI/CD

## Options Considered

### Option 1: React + Node.js + PostgreSQL (CHOSEN)

**Pros:**

- Team has strong expertise in JavaScript/TypeScript ecosystem
- Unified language (TypeScript) across frontend and backend
- Rich ecosystem of libraries and tools
- Excellent third-party integration support
- Fast development velocity with familiar tools
- Strong hiring pool for future expansion
- Mature tooling (Prisma, Express, React)
- Good TypeScript support throughout stack

**Cons:**

- Node.js single-threaded model may limit CPU-intensive operations
- JavaScript ecosystem can be volatile (frequent breaking changes)
- Type safety weaker than compiled languages (even with TypeScript)
- Package management complexity (npm/yarn ecosystem)

**Cost Estimate:** $800/month infrastructure (AWS ECS, RDS, ElastiCache)

### Option 2: React + Python/Django + PostgreSQL

**Pros:**

- Django has excellent built-in admin interface
- Python better for data processing and analytics
- Django ORM is mature and well-documented
- Strong security features out-of-box
- Better for CPU-intensive tasks (if needed)

**Cons:**

- Split language stack (TypeScript frontend, Python backend)
- Team has less Python expertise (would slow development)
- Django's opinionated structure less flexible for API-first design
- Smaller pool of full-stack engineers
- Longer development time with learning curve
- Less straightforward real-time updates (would need Django Channels)

**Cost Estimate:** $900/month infrastructure (similar to Node.js)

### Option 3: Next.js (Full-Stack React Framework)

**Pros:**

- Unified React framework for frontend and backend
- Excellent developer experience
- Built-in API routes (no separate backend needed)
- Server-side rendering and static generation
- Vercel deployment is simple

**Cons:**

- Tightly coupled frontend and backend (harder to scale independently)
- Less flexibility for complex backend logic
- API routes less suitable for complex business logic
- Vendor lock-in risk with Vercel
- Overkill for our API-first architecture
- Team prefers separate frontend/backend for scalability

**Cost Estimate:** $600/month (Vercel Pro + database)

### Option 4: React + Go + PostgreSQL

**Pros:**

- Go has excellent performance and concurrency
- Compiled language with strong type safety
- Low memory footprint
- Fast execution speed
- Good for high-throughput systems

**Cons:**

- Team has zero Go expertise (significant learning curve)
- Smaller ecosystem compared to Node.js
- Longer development time
- Harder to find Go developers for hiring
- Overkill for current scale requirements
- Would delay MVP launch by 2-3 months

**Cost Estimate:** $700/month infrastructure

## Rationale

### Why React for Frontend

1. **Team Expertise:** Both frontend engineers have 3+ years React experience
2. **Component Ecosystem:** Rich library of pre-built components (Tailwind UI, Headless UI)
3. **Hiring:** Largest pool of frontend developers
4. **TypeScript Support:** Excellent type checking and IDE support
5. **Performance:** Virtual DOM performs well for our dashboard use case

### Why Node.js + Express for Backend

1. **Unified Language:** TypeScript across full stack reduces context switching
2. **Team Productivity:** Team most productive in Node.js ecosystem
3. **Fast Development:** Express is lightweight and flexible
4. **Integration Support:** Excellent SDKs for Stripe, SendGrid, Auth0
5. **Real-time Capable:** Easy to add WebSockets if needed
6. **Proven at Scale:** Many companies run Node.js successfully (Netflix, Uber, PayPal)

### Why PostgreSQL

1. **ACID Compliance:** Critical for financial transactions
2. **Data Integrity:** Strong constraints and foreign keys
3. **Mature Ecosystem:** 30+ years of development
4. **JSON Support:** Flexible schema when needed (jsonb columns)
5. **Full-Text Search:** Built-in search capabilities
6. **AWS Support:** Excellent RDS managed service
7. **Team Experience:** Team familiar with PostgreSQL

### Why Prisma ORM

1. **Type Safety:** Auto-generated TypeScript types from schema
2. **Developer Experience:** Excellent tooling and IDE support
3. **Migrations:** Built-in migration system
4. **Query Builder:** Type-safe queries, prevents SQL injection
5. **Modern:** Built specifically for TypeScript/Node.js

### Why Redis

1. **Session Storage:** Fast, reliable session management
2. **Caching:** Reduce database load for frequently accessed data
3. **Rate Limiting:** Built-in data structures for rate limiting
4. **Simple:** Easy to understand and operate
5. **AWS Support:** ElastiCache managed service

## Consequences

### Positive Consequences

1. **Fast Time to Market**
   - Team can start building immediately with familiar tools
   - Rich ecosystem accelerates feature development
   - Expected to save 4-6 weeks vs. learning new stack

2. **Developer Productivity**
   - Unified TypeScript codebase improves collaboration
   - Hot module reloading speeds up development
   - Strong IDE support (VS Code) with auto-completion

3. **Hiring & Team Growth**
   - React/Node.js skills are most common in market
   - Easier to find contractors for short-term needs
   - Can hire full-stack engineers (same language)

4. **Third-Party Integrations**
   - Excellent SDKs for all planned integrations
   - Large community means solutions to common problems exist
   - npm ecosystem has packages for almost everything

5. **Deployment & Operations**
   - Docker containerization simplifies deployment
   - AWS ECS is mature and well-documented
   - Many monitoring tools support Node.js out-of-box

### Negative Consequences

1. **Performance Limitations**
   - May need to move heavy processing to separate services
   - CPU-intensive tasks (complex reports) could block event loop
   - Mitigation: Use worker threads or separate service for heavy tasks

2. **Ecosystem Volatility**
   - npm packages sometimes have breaking changes
   - Need to carefully vet dependencies
   - Mitigation: Lock versions, regular dependency audits

3. **Type Safety Gaps**
   - TypeScript doesn't prevent all runtime errors
   - Need extensive testing to catch edge cases
   - Mitigation: Zod for runtime validation, comprehensive test suite

4. **Single Vendor (AWS) Lock-in**
   - Choosing AWS ECS ties us to AWS ecosystem
   - Migration to other clouds would require effort
   - Mitigation: Use Docker, avoid AWS-specific services where possible

## Implementation Notes

### Phase 1: Foundation (Month 1)

- Set up monorepo with frontend and backend
- Configure TypeScript, ESLint, Prettier
- Set up Prisma with PostgreSQL
- Create Docker Compose for local development
- Configure GitHub Actions CI/CD

### Phase 2: Core Features (Months 2-4)

- Build authentication system
- Implement subscription management
- Integrate Stripe for payments
- Create dashboard UI

### Phase 3: Production Readiness (Month 5)

- Performance optimization
- Security hardening
- Monitoring and alerting
- Load testing and scaling validation

### Monitoring & Review

- **Performance:** Track API response times weekly
- **Developer Velocity:** Track story points per sprint
- **Incidents:** Review any production issues related to stack choice
- **Team Feedback:** Monthly retrospective on tooling satisfaction

## Revisit Conditions

We should reconsider this decision if:

1. **Performance Issues:** API response times consistently exceed 500ms at moderate load
2. **Scalability Blocks:** Node.js becomes a bottleneck for concurrent requests
3. **Team Changes:** New hires have strong expertise in different stack
4. **Feature Requirements:** Need CPU-intensive features Node.js can't handle efficiently
5. **Cost:** Infrastructure costs exceed $2000/month (3x current estimate)

**Next Review Date:** June 2026 (6 months post-launch)

## References

- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [React Documentation](https://react.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL 15 Release Notes](https://www.postgresql.org/docs/15/release-15.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Related Decisions

- [ADR-002: Database Choice](./ADR-002-database-choice.md) - Details on PostgreSQL schema design
- [ADR-003: Authentication Approach](./ADR-003-auth-approach.md) - OAuth 2.0 + JWT implementation

---

**Document Owner:** David Kumar (Tech Lead)
**Last Updated:** 2025-08-15
**Next Review:** 2026-06-01
