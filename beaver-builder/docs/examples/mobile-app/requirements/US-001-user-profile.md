# US-001: User Profile with Avatar Upload

**Status:** In Progress (80% complete)
**Priority:** P1
**Owner:** David Kim

## User Story

**As a** user
**I want** to create and edit my profile with a photo
**So that** I can personalize my account and be recognized by friends

## Acceptance Criteria

### AC1: View Profile

**Given** I'm logged in
**When** I navigate to Profile tab
**Then** I see:

- My name
- Email address
- Profile photo (or default avatar)
- Membership status (Free/Premium)
- Account stats (workouts logged, streak)

### AC2: Edit Profile

**Given** I'm on profile screen
**When** I tap "Edit Profile"
**Then** I can edit:

- Name
- Bio (optional)
- Fitness goals
  **And** changes save to backend when online

### AC3: Upload Avatar

**Given** I'm editing profile
**When** I tap profile photo
**Then** I see options:

- Take Photo
- Choose from Library
- Remove Photo
  **And** selected photo is resized (400x400) and uploaded to S3
  **And** profile updates immediately

### AC4: Permissions Handling

**Given** I choose to take/upload photo
**When** app needs camera/library permission
**Then** I see permission request dialog
**And** if denied, I see helpful message explaining why permission needed

## Technical Implementation

```typescript
// Profile Screen
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uploadToS3 } from '../services/s3Service';

const handlePhotoSelect = async () => {
  const result = await launchImageLibrary({
    mediaType: 'photo',
    maxWidth: 400,
    maxHeight: 400,
    quality: 0.8,
  });

  if (result.assets?.[0]) {
    const photoUri = result.assets[0].uri;

    // Upload to S3
    const s3Url = await uploadToS3(photoUri);

    // Update profile
    dispatch(updateProfile({ avatarUrl: s3Url }));
  }
};
```

## Success Metrics

- [x] View profile screen complete
- [x] Camera/gallery integration working
- [ ] S3 upload (80% complete)
- [ ] Edit profile form
- [ ] Offline support for edits

---

**Document Owner:** David Kim
**Last Updated:** 2025-11-18
