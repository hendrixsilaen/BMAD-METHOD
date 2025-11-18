# ADR-003: Offline-First Architecture

**Status:** Accepted
**Date:** 2025-09-20
**Deciders:** Emma Rodriguez, Maria Santos (Backend), Team

## Context

Users need to log workouts without internet connection (gym has poor signal).

## Decision

Implement **offline-first architecture** with background sync using Async Storage + sync queue.

## Approach

1. **Local Storage:** All data written to Async Storage first
2. **Sync Queue:** Track pending changes in Redux state
3. **Background Sync:** Background task syncs queue when online
4. **Conflict Resolution:** Last-write-wins strategy

**Flow:**

```
User Action → Redux Store → Async Storage → Sync Queue
                                                   ↓
                                            Background Sync
                                                   ↓
                                              Backend API
```

## Benefits

- App works without internet
- Better UX (no loading spinners)
- Reduced API errors
- Lower battery usage (batch syncing)

## Trade-offs

- More complex state management
- Conflict resolution logic needed
- Storage space considerations

---

**Document Owner:** Emma Rodriguez
**Last Updated:** 2025-09-20
