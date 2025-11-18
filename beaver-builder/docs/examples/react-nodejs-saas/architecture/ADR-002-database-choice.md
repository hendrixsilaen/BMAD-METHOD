# ADR-002: Database Choice and Schema Design

**Status:** Accepted
**Date:** 2025-08-18
**Deciders:** David Kumar (Tech Lead), Elena Popov (Backend Engineer), CTO
**Consulted:** Database consultant (external), DevOps engineer

## Context

SubscriptFlow requires a database solution for storing user accounts, subscription data, billing history, and usage metrics. The database must handle:

1. **Financial Transactions:** ACID compliance for payment processing
2. **Multi-Tenancy:** Isolate data between customer organizations
3. **Data Integrity:** Foreign keys, constraints, and referential integrity
4. **Query Flexibility:** Complex joins for reporting and analytics
5. **Scalability:** Support 1000 organizations with 100K end-users
6. **Regulatory Compliance:** GDPR data retention and deletion

### Data Characteristics

- **Transaction Volume:** ~500 writes/min, ~5000 reads/min at target scale
- **Data Growth:** Estimated 1GB/month (usage events, audit logs)
- **Query Patterns:** OLTP (real-time transactions) + light analytics
- **Data Relationships:** Highly relational (users → orgs → subscriptions → invoices)

### Requirements

- **ACID Compliance:** Must guarantee data consistency for payments
- **Schema Flexibility:** Some semi-structured data (metadata, config)
- **Full-Text Search:** Search organizations, users, subscription plans
- **Time-Series Data:** Usage events and metrics over time
- **Backup & Recovery:** Point-in-time recovery, automated backups
- **Multi-Region:** Not required initially, but future consideration

## Decision

We will use **PostgreSQL 15** as our primary database with the following approach:

### Database Architecture

- **Primary Database:** PostgreSQL 15 (AWS RDS Multi-AZ)
- **Read Replicas:** Add when read traffic exceeds 3000 req/min (Month 6+)
- **Connection Pooling:** PgBouncer for connection management (max 20 connections)
- **Caching Layer:** Redis for frequently accessed data (5-minute TTL)

### Schema Design Strategy

- **Multi-Tenancy:** Shared schema with `organization_id` column (row-level security)
- **Soft Deletes:** Use `deleted_at` timestamp (GDPR compliance)
- **Audit Logging:** Trigger-based audit logs for all sensitive tables
- **Versioning:** Schema migrations via Prisma Migrate

### Key Design Decisions

1. **Shared Schema Multi-Tenancy** (vs separate databases per tenant)
2. **Row-Level Security (RLS)** for data isolation
3. **JSONB Columns** for flexible metadata
4. **Partitioning Strategy** for usage_events table (by month)
5. **Index Strategy** for query performance

## Options Considered

### Option 1: PostgreSQL (CHOSEN)

**Pros:**

- ACID compliance guarantees data consistency
- Excellent support for complex queries and joins
- JSONB support for flexible schema when needed
- Full-text search built-in (good enough for MVP)
- Row-level security for multi-tenancy
- Mature ecosystem with 30+ years of development
- Strong AWS RDS support (automated backups, failover)
- Free version available (no licensing costs)
- Team has strong PostgreSQL experience
- Excellent TypeScript/Prisma integration

**Cons:**

- Vertical scaling limitations (need sharding for massive scale)
- Write performance lower than NoSQL for high-volume writes
- Complex queries can become slow without proper indexes
- Vacuum process can impact performance
- Requires more planning for horizontal scaling

**Cost:** $150/month (db.t3.medium Multi-AZ) initially, scales to $500/month at target load

### Option 2: MySQL 8

**Pros:**

- ACID compliant
- Slightly better read performance than PostgreSQL
- Wide adoption and ecosystem
- Good RDS support
- Lower memory footprint

**Cons:**

- Weaker JSON support compared to PostgreSQL JSONB
- Less robust full-text search
- No row-level security (harder multi-tenancy)
- Team less familiar with MySQL
- Fewer advanced features (materialized views, CTE)
- Less suitable for complex analytics queries

**Cost:** $140/month (similar to PostgreSQL)

### Option 3: MongoDB (NoSQL)

**Pros:**

- Flexible schema (no migrations needed)
- Horizontal scaling easier
- Better write performance for high-volume data
- Native JSON storage
- Good for document-oriented data

**Cons:**

- No ACID transactions across collections (until v4.0, still limited)
- Weaker data integrity (no foreign keys)
- Complex joins difficult and slow
- Financial data requires ACID compliance
- Team has limited MongoDB experience
- Harder to ensure data consistency
- Not suitable for complex reporting queries
- GDPR compliance harder (no referential integrity)

**Cost:** $200/month (Atlas M10)

### Option 4: Amazon Aurora PostgreSQL

**Pros:**

- PostgreSQL-compatible with better performance
- Faster failover and replication
- Storage auto-scales
- Better read replica performance
- Optimized for AWS

**Cons:**

- Vendor lock-in to AWS
- 2-3x more expensive than standard RDS PostgreSQL
- Overkill for current scale
- Some PostgreSQL features not supported
- Migration complexity if moving off AWS

**Cost:** $400/month (2x RDS PostgreSQL)

**Decision:** Rejected for MVP due to cost. Revisit at 5000+ organizations.

### Option 5: Multi-Database Approach (PostgreSQL + TimescaleDB)

**Pros:**

- PostgreSQL for transactional data
- TimescaleDB extension for time-series usage events
- Optimized for each use case
- Better performance for analytics

**Cons:**

- Operational complexity (two databases)
- Additional cost
- More complex application logic
- Overkill for current scale
- Adds DevOps burden

**Cost:** $300/month (two databases)

**Decision:** Rejected. PostgreSQL with partitioning sufficient for MVP.

## Rationale

### Why PostgreSQL

1. **ACID Compliance is Critical**
   - Billing and payments require guaranteed consistency
   - PostgreSQL's MVCC ensures reliable transactions
   - Financial data cannot afford eventual consistency

2. **Data Relationships are Complex**
   - Users → Organizations → Subscriptions → Invoices
   - Complex joins needed for reporting
   - Foreign keys ensure referential integrity
   - Relational model matches our domain

3. **Team Expertise**
   - Both backend engineers have 5+ years PostgreSQL experience
   - Familiar with query optimization and indexing
   - Reduces learning curve and mistakes

4. **JSONB Flexibility**
   - Allows flexible metadata storage without schema changes
   - Store Stripe webhook payloads as-is
   - Configuration options per organization
   - Best of both worlds: structure + flexibility

5. **Row-Level Security for Multi-Tenancy**
   - PostgreSQL RLS provides database-level isolation
   - Prevents accidental cross-tenant data leaks
   - Security enforced at database level (defense in depth)

6. **Cost-Effective**
   - No licensing fees (open source)
   - AWS RDS provides managed service
   - Can start small and scale

### Schema Design Decisions

#### 1. Shared Schema Multi-Tenancy

Instead of separate databases per tenant, we use a shared schema with `organization_id` column.

**Reasoning:**

- Simpler operations (one database to manage)
- More cost-effective (no per-tenant database cost)
- Easier backups and migrations
- Better resource utilization
- Sufficient for B2B SaaS with <10K tenants

**Trade-offs:**

- Careful indexing required (all queries must filter by org_id)
- Cross-tenant data leak risk (mitigated with RLS)
- Cannot customize schema per tenant

**Example:**

```sql
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id),
    plan_id UUID NOT NULL REFERENCES plans(id),
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    -- ... other columns
);

-- All queries must include organization_id
CREATE INDEX idx_subscriptions_org ON subscriptions(organization_id);
```

#### 2. Row-Level Security (RLS)

Enable PostgreSQL RLS to enforce tenant isolation at database level.

**Implementation:**

```sql
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON subscriptions
    USING (organization_id = current_setting('app.current_org_id')::UUID);
```

**Benefits:**

- Database enforces data isolation
- Prevents developer mistakes
- Defense in depth security
- Audit compliance easier

**Trade-offs:**

- Slight performance overhead
- Application must set session variable
- More complex query plans

#### 3. JSONB for Flexible Data

Use JSONB columns for semi-structured data.

**Use Cases:**

- Stripe webhook payloads (store raw event data)
- Organization-specific configuration
- Subscription metadata
- Custom fields per tenant

**Example:**

```sql
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY,
    organization_id UUID NOT NULL,
    -- ... other columns
    metadata JSONB,
    stripe_data JSONB  -- Store complete Stripe subscription object
);

-- Index JSONB fields for query performance
CREATE INDEX idx_subscription_metadata ON subscriptions USING GIN (metadata);
```

#### 4. Partitioning for Usage Events

Partition `usage_events` table by month for better query performance.

**Reasoning:**

- Usage events grow quickly (millions of rows)
- Queries typically filter by time range
- Partitioning improves query performance
- Easier data retention (drop old partitions)

**Implementation:**

```sql
CREATE TABLE usage_events (
    id BIGSERIAL,
    organization_id UUID NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    metadata JSONB
) PARTITION BY RANGE (timestamp);

-- Create monthly partitions
CREATE TABLE usage_events_2025_11 PARTITION OF usage_events
    FOR VALUES FROM ('2025-11-01') TO ('2025-12-01');

CREATE TABLE usage_events_2025_12 PARTITION OF usage_events
    FOR VALUES FROM ('2025-12-01') TO ('2026-01-01');
```

#### 5. Soft Deletes for GDPR Compliance

Use `deleted_at` timestamp instead of hard deletes.

**Reasoning:**

- GDPR requires ability to recover deleted data (within retention period)
- Audit trail of deletions
- Prevents accidental data loss
- Can hard-delete after retention period

**Implementation:**

```sql
CREATE TABLE organizations (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP  -- NULL = active, non-NULL = soft deleted
);

-- Queries exclude soft-deleted by default
SELECT * FROM organizations WHERE deleted_at IS NULL;
```

## Schema Overview

### Core Tables

#### Users & Authentication

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),  -- NULL for OAuth-only users
    name VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP
);

CREATE TABLE sessions (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE oauth_providers (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    provider VARCHAR(50) NOT NULL,  -- 'google', 'github', etc.
    provider_user_id VARCHAR(255) NOT NULL,
    UNIQUE(provider, provider_user_id)
);
```

#### Organizations (Multi-Tenancy)

```sql
CREATE TABLE organizations (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    stripe_customer_id VARCHAR(255) UNIQUE,
    settings JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP
);

CREATE TABLE organization_members (
    id UUID PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id),
    user_id UUID NOT NULL REFERENCES users(id),
    role VARCHAR(50) NOT NULL,  -- 'owner', 'admin', 'member'
    joined_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(organization_id, user_id)
);
```

#### Billing & Subscriptions

```sql
CREATE TABLE plans (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_cents INTEGER NOT NULL,
    billing_interval VARCHAR(20) NOT NULL,  -- 'monthly', 'yearly'
    stripe_price_id VARCHAR(255) UNIQUE,
    features JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE subscriptions (
    id UUID PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id),
    plan_id UUID NOT NULL REFERENCES plans(id),
    status VARCHAR(50) NOT NULL,  -- 'active', 'canceled', 'past_due'
    stripe_subscription_id VARCHAR(255) UNIQUE,
    current_period_start TIMESTAMP NOT NULL,
    current_period_end TIMESTAMP NOT NULL,
    cancel_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE invoices (
    id UUID PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id),
    subscription_id UUID REFERENCES subscriptions(id),
    stripe_invoice_id VARCHAR(255) UNIQUE,
    amount_cents INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL,  -- 'draft', 'open', 'paid', 'void'
    pdf_url TEXT,
    paid_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE payment_methods (
    id UUID PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id),
    stripe_payment_method_id VARCHAR(255) UNIQUE NOT NULL,
    type VARCHAR(50) NOT NULL,  -- 'card', 'bank_account'
    last4 VARCHAR(4),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

#### Usage Events (Metered Billing)

```sql
CREATE TABLE usage_events (
    id BIGSERIAL,
    organization_id UUID NOT NULL,
    subscription_id UUID NOT NULL REFERENCES subscriptions(id),
    event_type VARCHAR(100) NOT NULL,  -- 'api_call', 'storage_gb', etc.
    quantity INTEGER NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
    metadata JSONB,
    PRIMARY KEY (id, timestamp)
) PARTITION BY RANGE (timestamp);
```

#### Audit Logs

```sql
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    organization_id UUID REFERENCES organizations(id),
    action VARCHAR(100) NOT NULL,  -- 'user.created', 'subscription.updated'
    resource_type VARCHAR(100),
    resource_id UUID,
    changes JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### Key Indexes

```sql
-- Performance indexes
CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_sessions_user_expires ON sessions(user_id, expires_at);
CREATE INDEX idx_org_members_org ON organization_members(organization_id);
CREATE INDEX idx_org_members_user ON organization_members(user_id);
CREATE INDEX idx_subscriptions_org ON subscriptions(organization_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(organization_id, status);
CREATE INDEX idx_invoices_org ON invoices(organization_id);
CREATE INDEX idx_usage_events_org_time ON usage_events(organization_id, timestamp);

-- JSONB indexes
CREATE INDEX idx_plans_features ON plans USING GIN (features);
CREATE INDEX idx_org_settings ON organizations USING GIN (settings);
```

## Consequences

### Positive Consequences

1. **Data Integrity Guaranteed**
   - Foreign keys prevent orphaned records
   - Constraints enforce business rules at database level
   - ACID transactions ensure consistency for payments

2. **Complex Queries Supported**
   - Joins enable rich reporting features
   - Full-text search available out-of-box
   - Complex aggregations for analytics

3. **Security Built-In**
   - Row-level security prevents cross-tenant data leaks
   - Database enforces isolation (defense in depth)
   - Audit logs track all sensitive operations

4. **Scalability Path Clear**
   - Start with single database
   - Add read replicas for read scaling (Month 6+)
   - Partition large tables (usage_events)
   - Connection pooling handles concurrent requests

5. **Cost-Effective**
   - Start small ($150/month)
   - Scale gradually as needed
   - No licensing costs

### Negative Consequences

1. **Scaling Limitations**
   - Vertical scaling has limits (96 vCPU max on RDS)
   - Horizontal scaling (sharding) is complex
   - Write scaling harder than NoSQL
   - **Mitigation:** Sufficient for 10K organizations, shard after that

2. **Schema Changes Require Migrations**
   - Downtime possible for large table alterations
   - Must plan migrations carefully
   - **Mitigation:** Use Prisma Migrate, test in staging first

3. **Performance Tuning Required**
   - Must understand query plans and indexing
   - Vacuum process can impact performance
   - **Mitigation:** Regular monitoring, auto-vacuum tuning

4. **Single Point of Failure**
   - Primary database failure impacts entire system
   - **Mitigation:** Multi-AZ deployment (automatic failover)

## Monitoring & Success Metrics

### Performance Metrics

- **Query Performance:** p95 < 50ms for all queries
- **Connection Pool:** < 80% utilization
- **Database CPU:** < 70% average
- **Replication Lag:** < 1 second (after read replicas added)

### Scaling Triggers

- **Add Read Replica:** When read traffic > 3000 req/min
- **Upgrade Instance:** When CPU > 80% sustained
- **Implement Caching:** When cache hit rate < 70%
- **Consider Sharding:** When database > 1TB or 10K organizations

## Migration Path

### Current State

- Single RDS PostgreSQL instance (db.t3.medium)
- No read replicas
- Basic indexing

### Month 6 (If Needed)

- Add read replicas for read scaling
- Implement query caching layer
- Optimize slow queries

### Month 12 (If Needed)

- Consider Aurora PostgreSQL for better performance
- Implement database sharding if > 10K orgs
- Add TimescaleDB extension for time-series if needed

## Revisit Conditions

Reconsider this decision if:

1. **Scale Exceeds Expectations:** > 10K organizations or > 1TB data
2. **Write Performance Issues:** Write latency consistently > 100ms
3. **Cost Exceeds Budget:** Database costs > $2000/month
4. **New Requirements:** Need real-time analytics or massive time-series data
5. **Technology Changes:** Better PostgreSQL alternatives emerge

**Next Review Date:** August 2026 (1 year after decision)

## References

- [PostgreSQL 15 Documentation](https://www.postgresql.org/docs/15/)
- [Prisma Schema Design Best Practices](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate)
- [AWS RDS Best Practices](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_BestPractices.html)
- [Row-Level Security Guide](https://www.postgresql.org/docs/15/ddl-rowsecurity.html)
- [Multi-Tenant SaaS Database Patterns](https://docs.microsoft.com/en-us/azure/architecture/isv/application-tenancy)

## Related Decisions

- [ADR-001: Tech Stack Choice](./ADR-001-tech-stack-choice.md) - Context on Node.js + PostgreSQL choice
- [ADR-003: Authentication Approach](./ADR-003-auth-approach.md) - Session management using PostgreSQL

---

**Document Owner:** David Kumar (Tech Lead)
**Last Updated:** 2025-08-18
**Next Review:** 2026-08-18
