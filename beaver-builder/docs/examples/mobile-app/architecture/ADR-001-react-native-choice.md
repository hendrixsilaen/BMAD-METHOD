# ADR-001: React Native vs Native Development

**Status:** Accepted
**Date:** 2025-09-15
**Deciders:** Emma Rodriguez, David Kim, Engineering Team

## Context

Need to choose mobile development approach: React Native (cross-platform) vs native iOS/Android separate codebases.

## Decision

Use **React Native 0.72 with Expo** for cross-platform development.

## Options Considered

### Option 1: React Native (CHOSEN)

**Pros:**

- Single codebase for iOS + Android (60% time savings)
- Faster development velocity
- Hot reloading for rapid iteration
- Strong ecosystem (libraries, community)
- Team JavaScript/TypeScript expertise
- Expo simplifies build/deployment

**Cons:**

- Performance slightly lower than native
- Some platform-specific code needed
- Larger app size than native

### Option 2: Native (Swift + Kotlin)

**Pros:**

- Best performance
- Full platform API access
- Smaller app size

**Cons:**

- Two separate codebases
- 2x development time
- Requires native expertise for each platform

## Rationale

- Team expertise in JavaScript/TypeScript
- Faster time to market critical
- Performance difference negligible for our use case
- Cross-platform code sharing saves significant effort

---

**Document Owner:** Emma Rodriguez
**Last Updated:** 2025-09-15
