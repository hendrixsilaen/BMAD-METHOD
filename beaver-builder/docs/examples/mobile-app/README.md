# Example: React Native Mobile App

**Domain:** Mobile Application Development, iOS/Android
**Tech Stack:** React Native, TypeScript, Redux Toolkit, Expo
**Project Type:** Cross-platform fitness tracking mobile app

## Overview

This example demonstrates beaver-builder documentation for a mobile app project. The project is "FitTrack Pro" - a fitness tracking app that helps users log workouts, track progress, and connect with friends.

## What This Example Shows

### Architecture Decisions (3 ADRs)

- **ADR-001:** React Native vs Native (iOS/Android separate)
- **ADR-002:** State management (Redux Toolkit vs Context API)
- **ADR-003:** Offline-first architecture with async data sync

### Requirements (2 Complete User Stories)

- **US-001:** User profile with avatar upload and settings
- **US-002:** Offline workout logging with background sync

### Mobile-Specific Concerns

- Offline-first data architecture
- Background sync strategies
- Push notifications
- App store submission process
- Device compatibility testing
- Performance on low-end devices
- Battery optimization

## Project Context

**Project Name:** FitTrack Pro
**Team:** 3 people (1 iOS dev, 1 Android dev, 1 backend engineer)
**Stage:** MVP development (Month 2/4)
**Platform:** iOS 14+ and Android 8+ (React Native 0.72)
**Target:** 50K users by Month 6

## Technologies

### Mobile

- React Native 0.72 + TypeScript
- Redux Toolkit + Redux Persist
- React Navigation 6
- Expo SDK 49 (managed workflow)
- React Native Async Storage
- React Native Background Fetch

### Backend Integration

- REST API (Node.js backend)
- WebSocket for real-time updates
- AWS S3 for media uploads

### Testing

- Jest + React Native Testing Library
- Detox for E2E tests
- Fastlane for CI/CD
- TestFlight (iOS) + Google Play Beta (Android)

## Files in This Example

```
mobile-app/
├── README.md (this file)
├── project-overview.md
├── project-progress.md
├── architecture/
│   ├── ADR-001-react-native-choice.md
│   ├── ADR-002-state-management.md
│   └── ADR-003-offline-first.md
└── requirements/
    ├── US-001-user-profile.md
    └── US-002-offline-mode.md
```

## Mobile-Specific Features Demonstrated

- Offline-first data sync
- Background task processing
- Push notifications
- Device permissions handling
- Camera/photo library integration
- Biometric authentication (Face ID/Touch ID)
- Deep linking
- App store deployment process

## Next Steps

1. Copy mobile-specific folder structure
2. Adapt ADRs for your platform choices
3. Implement offline-first patterns shown
4. Use user story templates for mobile features
5. Set up CI/CD pipeline for app stores
