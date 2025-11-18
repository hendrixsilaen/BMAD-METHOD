# Example: React + Node.js SaaS Platform

**Domain:** Web Application, SaaS Platform
**Tech Stack:** React 18, TypeScript, Express 4, PostgreSQL 15, Redis
**Project Type:** Multi-tenant subscription management platform

## Overview

This example demonstrates a complete beaver-builder documentation setup for a modern SaaS platform. The project is a subscription management system called "SubscriptFlow" that helps businesses manage recurring billing, customer subscriptions, and payment processing.

## What This Example Shows

### Architecture Decisions (3 ADRs)

- **ADR-001:** Tech stack selection (React + Express + PostgreSQL)
- **ADR-002:** Database choice and schema design (PostgreSQL with row-level security)
- **ADR-003:** Authentication approach (OAuth 2.0 + JWT with refresh tokens)

### Requirements (2 Complete User Stories)

- **US-001:** User authentication with email/password and social login
- **US-002:** Subscription management with plan upgrades/downgrades

### Project Tracking

- **MVP Launch Project:** Realistic progress tracking showing completed, in-progress, and planned work

## Key Features of This Documentation

- **No Placeholders:** Every section contains realistic, production-ready content
- **Real Tech Stack:** Specific versions and justified technology choices
- **Complete User Stories:** Full Given/When/Then acceptance criteria
- **Realistic Progress:** Shows actual development workflow with blockers and decisions
- **Production Concerns:** Security, scalability, monitoring, and compliance addressed

## How to Use This Example

1. **Review Structure:** See how documentation is organized across folders
2. **Read ADRs:** Understand decision-making process with pros/cons
3. **Study User Stories:** See complete acceptance criteria and edge cases
4. **Check Progress Tracking:** Learn realistic project management practices
5. **Adapt for Your Project:** Copy structure and replace with your specifics

## Project Context

**Project Name:** SubscriptFlow
**Team Size:** 5 engineers (2 frontend, 2 backend, 1 DevOps)
**Stage:** MVP development (3 months in, 2 months to launch)
**Users:** B2B customers managing subscription billing
**Scale Target:** 1000 businesses, 100K end-users by end of year 1

## Technologies Demonstrated

### Frontend

- React 18.2.0 with TypeScript 5.1
- Redux Toolkit 1.9 for state management
- React Query 4.0 for server state
- Tailwind CSS 3.3 for styling
- Vite 4.3 as build tool

### Backend

- Node.js 20 LTS
- Express 4.18 with TypeScript
- Prisma 5.0 as ORM
- PostgreSQL 15 for primary database
- Redis 7.0 for caching and sessions

### Infrastructure

- Docker containers for local development
- AWS ECS for production deployment
- RDS PostgreSQL with automatic backups
- ElastiCache Redis for session storage
- CloudWatch for logging and monitoring

### External Services

- Stripe for payment processing
- SendGrid for transactional emails
- Auth0 for OAuth social login
- Sentry for error tracking

## Files in This Example

```
react-nodejs-saas/
├── README.md (this file)
├── project-overview.md (complete project context)
├── project-progress.md (current work tracking)
├── architecture/
│   ├── ADR-001-tech-stack-choice.md
│   ├── ADR-002-database-choice.md
│   └── ADR-003-auth-approach.md
├── requirements/
│   ├── US-001-user-authentication.md
│   └── US-002-subscription-management.md
└── projects/
    └── mvp-launch/
        └── progress.md
```

## Next Steps After Reviewing

1. Copy folder structure to your project
2. Replace SubscriptFlow specifics with your project details
3. Use ADR template for your architectural decisions
4. Create user stories following the complete format shown
5. Track progress using the project tracking structure
