# ADR-002: State Management (Redux Toolkit)

**Status:** Accepted
**Date:** 2025-09-18
**Deciders:** Emma Rodriguez, David Kim

## Context

Need state management solution for complex app state (workouts, user data, offline queue).

## Decision

Use **Redux Toolkit** with Redux Persist for offline-capable state management.

## Options Considered

### Option 1: Redux Toolkit (CHOSEN)

**Pros:**

- Predictable state updates
- Excellent dev tools
- Redux Persist for offline storage
- Strong TypeScript support
- Team familiarity

**Cons:**

- More boilerplate than Context API
- Learning curve for new developers

### Option 2: React Context API

**Pros:**

- Built-in to React
- Simpler for small apps
- No external dependencies

**Cons:**

- Not ideal for complex state
- Performance issues with frequent updates
- No built-in persistence

## Rationale

- Complex state (workouts, sync queue, user prefs)
- Offline requirements need persistence
- Redux Toolkit reduces boilerplate
- Better debugging with Redux DevTools

---

**Document Owner:** Emma Rodriguez
**Last Updated:** 2025-09-18
