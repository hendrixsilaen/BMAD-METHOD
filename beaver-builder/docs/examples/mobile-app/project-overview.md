# Project Overview: FitTrack Pro

**Last Updated:** 2025-11-18
**Project Phase:** MVP Development (Month 2/4)
**Status:** Active Development

## Executive Summary

FitTrack Pro is a cross-platform mobile fitness tracking app for iOS and Android. Users can log workouts, track progress over time, set fitness goals, and connect with friends for motivation. The app works offline-first with background sync.

**Target Launch:** January 2026 (2 months remaining)
**Target Users:** 50K downloads by Month 6
**Monetization:** Freemium (basic free, premium $9.99/month)

## Technical Stack

### Mobile

- React Native 0.72.6 + TypeScript 5.2
- Redux Toolkit 1.9 + Redux Persist
- React Navigation 6.1
- Expo SDK 49 (managed workflow)
- Async Storage for local data
- Background Fetch for sync

### Backend

- Node.js REST API
- PostgreSQL database
- AWS S3 for photos
- Firebase Cloud Messaging (push notifications)

### Platform Support

- iOS: 14.0+ (iPhone 8 and newer)
- Android: API 26+ (Android 8.0 Oreo and newer)

## Key Features

### MVP Features (Month 1-4)

- ✅ User authentication (email + social login)
- 🔄 Workout logging with exercise library (75% complete)
- 🔄 User profile with avatar upload (80% complete)
- ⏳ Offline mode with background sync (Month 3)
- ⏳ Progress tracking (charts and statistics)
- ⏳ Push notifications for reminders

### Post-MVP (Month 5-8)

- Social features (friends, activity feed)
- Workout plans and programs
- Integration with wearables (Apple Watch, Fitbit)
- Premium features (advanced analytics, custom workouts)

## Performance Targets

- **App Size:** < 50MB (iOS/Android combined)
- **Launch Time:** < 2 seconds on mid-range devices
- **FPS:** 60fps during animations
- **Memory Usage:** < 150MB on low-end devices
- **Battery Impact:** < 3% per hour active use

## App Store Requirements

### iOS (App Store)

- Apple Developer Program membership: $99/year
- TestFlight beta testing (100 external testers)
- App Store Connect submission
- Review process: 2-7 days average

### Android (Google Play)

- Google Play Console: $25 one-time fee
- Internal/beta testing tracks
- Play Store submission
- Review process: 1-3 days average

## Team

- **iOS/Mobile Lead:** Emma Rodriguez
- **Android Engineer:** David Kim
- **Backend Engineer:** Maria Santos

## Timeline

- **Month 1 (Oct 2025):** Authentication, basic UI ✅
- **Month 2 (Nov 2025):** Workout logging, profiles (current)
- **Month 3 (Dec 2025):** Offline mode, push notifications
- **Month 4 (Jan 2026):** Beta testing, launch prep, app store submission

---

**Document Owner:** Emma Rodriguez (Mobile Lead)
