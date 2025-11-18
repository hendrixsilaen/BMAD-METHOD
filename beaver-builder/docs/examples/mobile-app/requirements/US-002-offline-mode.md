# US-002: Offline Workout Logging with Background Sync

**Status:** Not Started
**Priority:** P0 (Critical)
**Owner:** Emma Rodriguez
**Target:** December 2025

## User Story

**As a** user
**I want** to log workouts without internet connection
**So that** I can track my training even when the gym has poor signal

## Acceptance Criteria

### AC1: Log Workout Offline

**Given** I have no internet connection
**When** I log a workout (exercises, sets, reps)
**Then** workout is saved locally to Async Storage
**And** I see "Sync pending" indicator
**And** workout appears in history immediately

### AC2: Background Sync

**Given** I have pending offline workouts
**When** internet connection is restored
**Then** background task automatically syncs pending workouts
**And** "Sync pending" indicator disappears
**And** I receive confirmation: "3 workouts synced"

### AC3: Sync Status Visibility

**Given** I'm using the app
**Then** I always see sync status indicator:

- Green checkmark: "All synced"
- Orange clock: "3 workouts pending sync"
- Red warning: "Sync failed - retry?"

### AC4: Conflict Resolution

**Given** I edited a workout offline that was also edited elsewhere
**When** sync occurs
**Then** last-write-wins (most recent timestamp)
**And** I'm notified if conflict occurred

### AC5: Manual Sync Trigger

**Given** I have pending syncs
**When** I pull-to-refresh on workout history
**Then** sync is triggered immediately
**And** I see loading indicator during sync

## Technical Implementation

```typescript
// Sync Queue in Redux
interface SyncQueue {
  pendingWorkouts: Workout[];
  lastSyncTime: Date;
  syncStatus: 'synced' | 'pending' | 'failed';
}

// Background Sync Task
import BackgroundFetch from 'react-native-background-fetch';

BackgroundFetch.configure(
  {
    minimumFetchInterval: 15, // minutes
  },
  async (taskId) => {
    console.log('[BackgroundFetch] Task running');

    // Sync pending workouts
    await syncPendingWorkouts();

    // Required: Signal completion
    BackgroundFetch.finish(taskId);
  },
  (taskId) => {
    // Task timeout
    BackgroundFetch.finish(taskId);
  },
);

// Sync Function
const syncPendingWorkouts = async () => {
  const pendingWorkouts = await getPendingWorkouts();

  for (const workout of pendingWorkouts) {
    try {
      await api.post('/workouts', workout);
      await markAsSynced(workout.id);
    } catch (error) {
      await markSyncFailed(workout.id, error);
    }
  }
};
```

## Success Metrics

- [ ] Offline logging works (all device scenarios)
- [ ] Background sync triggers reliably
- [ ] Sync success rate > 99%
- [ ] Conflicts resolved gracefully
- [ ] Battery impact < 2% for background sync

---

**Document Owner:** Emma Rodriguez
**Last Updated:** 2025-11-18
