# US-001: User Authentication with Email/Password and Social Login

**Status:** Completed
**Priority:** P0 (Critical)
**Created:** 2025-08-21
**Completed:** 2025-09-28
**Sprint:** Sprint 2 (Sep 15-28, 2025)
**Owner:** Elena Popov (Backend), Sarah Chen (Frontend)

## User Story

**As a** new user
**I want** to create an account using my email and password, or sign in with my Google/GitHub account
**So that** I can securely access SubscriptFlow and manage my subscriptions

## Context & Background

Authentication is the foundation of our platform. Users need a secure, frictionless way to create accounts and access the system. We're supporting both traditional email/password authentication and modern social login (OAuth 2.0) to maximize conversion and user convenience.

### Business Value

- **User Acquisition:** Reduce signup friction with social login
- **Security:** Protect user accounts and organization data
- **Conversion Rate:** Estimated 15-20% higher completion with social login option
- **Competitive Parity:** All major SaaS platforms offer social login

### User Personas

1. **Sarah (Startup Founder):** Prefers Google login for speed, doesn't want another password
2. **David (Enterprise Admin):** Requires traditional email/password for compliance, avoids social login
3. **Maria (Freelancer):** Uses password manager, prefers email/password for control

## Acceptance Criteria

### AC1: Email/Password Registration

**Given** I am a new user on the registration page
**When** I enter a valid email address, secure password, and full name
**And** I click "Create Account"
**Then** my account is created in the system
**And** I receive a welcome email
**And** I am redirected to the onboarding flow
**And** my session is established with valid JWT tokens

**Details:**

- Email must be unique (not already registered)
- Password must meet security requirements (12+ chars, complexity)
- Name is required and displayed in the UI
- Welcome email sent within 30 seconds
- JWT access token stored in memory
- Refresh token stored in httpOnly cookie

### AC2: Email/Password Login

**Given** I am a registered user on the login page
**When** I enter my email and password
**And** I click "Sign In"
**Then** I am authenticated and redirected to my dashboard
**And** my session is established with valid JWT tokens
**And** my recent activity is displayed

**Details:**

- Credentials validated against database
- Password compared using bcrypt
- Session created in Redis
- JWT tokens generated and delivered
- Last login timestamp updated

### AC3: Social Login (Google)

**Given** I am on the login/registration page
**When** I click "Continue with Google"
**And** I complete Google OAuth flow and authorize the app
**Then** my account is created (if new) or I'm logged into my existing account
**And** I am redirected to my dashboard
**And** my session is established with valid JWT tokens

**Details:**

- OAuth 2.0 Authorization Code Flow with Auth0
- If email exists, link Google account to existing user
- If email doesn't exist, create new user with Google profile data
- No password stored for OAuth-only users
- Profile picture pulled from Google account

### AC4: Social Login (GitHub)

**Given** I am on the login/registration page
**When** I click "Continue with GitHub"
**And** I complete GitHub OAuth flow and authorize the app
**Then** my account is created (if new) or I'm logged into my existing account
**And** I am redirected to my dashboard
**And** my session is established with valid JWT tokens

**Details:**

- Same behavior as Google OAuth
- Pull email, name, and avatar from GitHub profile
- Handle case where GitHub email is private (prompt for email)

### AC5: Password Security Requirements

**Given** I am registering with email/password
**When** I enter a password that doesn't meet requirements
**Then** I see clear error messages explaining the requirements
**And** I cannot submit the form until password is valid

**Password Requirements:**

- Minimum 12 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character
- Not in list of common passwords (top 10,000)
- Not same as email address

**Error Messages:**

- "Password must be at least 12 characters"
- "Password must include uppercase, lowercase, number, and special character"
- "This password is too common. Please choose a more secure password"
- "Password cannot be the same as your email"

### AC6: Email Validation

**Given** I am registering or logging in
**When** I enter an invalid email address
**Then** I see an error message: "Please enter a valid email address"
**And** I cannot submit the form until email is valid

**Validation:**

- RFC 5322 compliant email format
- Must contain @ symbol and domain
- Domain must have valid TLD
- No whitespace allowed

### AC7: Failed Login Handling

**Given** I am attempting to log in
**When** I enter incorrect credentials
**Then** I see an error message: "Invalid email or password"
**And** the failed attempt is logged for security monitoring

**Security:**

- Generic error message (don't reveal if email exists)
- Rate limiting after 5 failed attempts (15-minute lockout)
- Account lockout after 10 failed attempts in 24 hours
- Failed attempts logged with IP address and timestamp
- Alert triggered if >100 failed attempts/hour (brute force detection)

### AC8: Successful Login Feedback

**Given** I have successfully logged in
**When** the dashboard loads
**Then** I see a welcome message with my name: "Welcome back, Sarah!"
**And** I see my last login timestamp: "Last login: Nov 18, 2025 at 2:30 PM"
**And** I see a session indicator (logged in status)

### AC9: Session Persistence

**Given** I am logged in
**When** I close the browser and reopen it within 7 days
**Then** I am still logged in (refresh token is still valid)
**And** I can access protected pages without re-authenticating

**Details:**

- Refresh token stored in httpOnly cookie (7-day expiration)
- Access token refreshed automatically when expired
- Session remains active unless explicitly logged out

### AC10: Logout

**Given** I am logged in
**When** I click "Logout" in the navigation menu
**Then** my session is terminated
**And** my refresh token is invalidated
**And** I am redirected to the login page
**And** I must re-authenticate to access protected pages

**Details:**

- Session deleted from Redis
- Refresh token cookie cleared
- Access token cleared from memory
- Redirect to login page with message: "You have been logged out"

## Edge Cases & Error Scenarios

### Edge Case 1: Email Already Exists (Registration)

**Given** I am registering with email/password
**When** I enter an email address that's already registered
**And** I submit the form
**Then** I see an error: "An account with this email already exists"
**And** I see a link: "Forgot password?" for recovery
**And** I see a suggestion: "Did you mean to sign in instead?"

### Edge Case 2: Email Already Exists (Social Login)

**Given** I am signing in with Google
**When** my Google email matches an existing email/password account
**Then** my Google account is linked to my existing account
**And** I am logged in to my existing account
**And** I see a success message: "Google account linked successfully"
**And** I can now use either method to log in

### Edge Case 3: Social Login Account Linking

**Given** I registered with Google
**And** I later try to register with GitHub using the same email
**When** I complete GitHub OAuth flow
**Then** my GitHub account is linked to my existing account
**And** I am logged in to my existing account
**And** I can use either Google or GitHub to log in

### Edge Case 4: Network Error During Login

**Given** I am submitting login credentials
**When** a network error occurs (timeout, connection lost)
**Then** I see an error message: "Network error. Please check your connection and try again."
**And** I can retry without losing my form data
**And** A retry button is displayed: "Try Again"

### Edge Case 5: Auth0 Service Unavailable

**Given** I am attempting social login
**When** Auth0 service is unavailable
**Then** I see an error: "Social login temporarily unavailable. Please try email/password or try again later."
**And** Email/password login remains functional
**And** Engineering is alerted via PagerDuty

### Edge Case 6: Password Too Long

**Given** I am registering with email/password
**When** I enter a password longer than 72 characters
**Then** I see an error: "Password must be no more than 72 characters"
**And** The form is not submitted

**Reason:** bcrypt has 72-character limit

### Edge Case 7: Unicode Characters in Name

**Given** I am registering with my name containing Unicode characters (e.g., "José Müller")
**When** I submit the registration form
**Then** my account is created successfully with Unicode name preserved
**And** my name displays correctly throughout the application

### Edge Case 8: Email Case Sensitivity

**Given** I previously registered with "Sarah@Example.com"
**When** I try to log in with "sarah@example.com" (lowercase)
**Then** I am successfully logged in
**And** Email comparison is case-insensitive

**Implementation:** Store emails in lowercase, compare case-insensitively

## Technical Implementation

### Frontend (React + TypeScript)

**Components:**

- `LoginPage.tsx` - Login form with email/password and social buttons
- `RegisterPage.tsx` - Registration form with validation
- `AuthLayout.tsx` - Shared layout for auth pages
- `PasswordStrengthMeter.tsx` - Visual password strength indicator
- `SocialLoginButtons.tsx` - Google and GitHub OAuth buttons

**State Management:**

- Redux slice: `authSlice.ts`
  - State: `{ user, accessToken, isAuthenticated, loading, error }`
  - Actions: `login()`, `register()`, `socialLogin()`, `logout()`, `refreshToken()`
- React Query mutations for API calls
- Token refresh interceptor in axios config

**Form Validation:**

- Zod schema for email and password validation
- React Hook Form for form state management
- Real-time validation feedback (as user types)

### Backend (Node.js + Express + TypeScript)

**API Endpoints:**

```typescript
POST /api/auth/register
  Body: { email, password, name }
  Response: { user, accessToken }
  Sets refresh token cookie

POST /api/auth/login
  Body: { email, password }
  Response: { user, accessToken }
  Sets refresh token cookie

POST /api/auth/social-login
  Body: { provider, code }
  Response: { user, accessToken }
  Sets refresh token cookie

POST /api/auth/refresh
  Reads refresh token from cookie
  Response: { accessToken }

POST /api/auth/logout
  Clears refresh token cookie
  Invalidates session in Redis
  Response: { success: true }
```

**Database Models (Prisma):**

```prisma
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  passwordHash  String?   // NULL for OAuth-only users
  name          String
  createdAt     DateTime  @default(now())
  deletedAt     DateTime?

  oauthProviders OAuthProvider[]
  sessions       Session[]
  organizationMembers OrganizationMember[]
}

model OAuthProvider {
  id             String @id @default(uuid())
  userId         String
  provider       String  // 'google', 'github', etc.
  providerUserId String

  user User @relation(fields: [userId], references: [id])

  @@unique([provider, providerUserId])
}

model Session {
  id            String   @id @default(uuid())
  userId        String
  token         String   @unique
  expiresAt     DateTime
  createdAt     DateTime @default(now())
  ipAddress     String?
  userAgent     String?

  user User @relation(fields: [userId], references: [id])
}
```

**Services:**

- `AuthService.ts` - Business logic for authentication
- `JWTService.ts` - Token generation and validation
- `PasswordService.ts` - Hashing and validation
- `OAuth2Service.ts` - Auth0 integration
- `SessionService.ts` - Redis session management

**Security:**

- bcrypt password hashing (cost factor 12)
- RS256 JWT signing with rotating keys
- httpOnly, secure, sameSite=strict cookies
- Rate limiting middleware (5 attempts/15 min)
- CORS configured for frontend domain only
- Input sanitization for all user inputs

### External Services

**Auth0 Configuration:**

- Application type: Regular Web Application
- Allowed callback URLs: `https://app.subscriptflow.com/auth/callback`
- Allowed logout URLs: `https://app.subscriptflow.com/login`
- Connections enabled: Google, GitHub
- Token expiration: 10 hours

**SendGrid (Welcome Email):**

- Template: welcome-email
- Variables: `{ name, email, dashboardUrl }`
- Send within 30 seconds of registration
- Fallback to queue if SendGrid unavailable

## Testing Strategy

### Unit Tests

**Backend:**

- Password hashing and comparison (bcrypt)
- JWT token generation and validation
- Email validation logic
- Password strength validation
- OAuth token exchange logic

**Frontend:**

- Form validation logic (Zod schemas)
- Password strength meter calculation
- Auth state management (Redux actions/reducers)

### Integration Tests

**Backend API Tests:**

```typescript
describe('POST /api/auth/register', () => {
  it('creates user with valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'SecurePass123!',
        name: 'Test User',
      })
      .expect(201);

    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('accessToken');
    expect(response.headers['set-cookie']).toBeDefined(); // refresh token
  });

  it('rejects weak password', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'weak',
        name: 'Test User',
      })
      .expect(400);

    expect(response.body.error).toContain('Password must be at least 12 characters');
  });

  it('rejects duplicate email', async () => {
    // Create user
    await request(app).post('/api/auth/register').send({
      email: 'test@example.com',
      password: 'SecurePass123!',
      name: 'Test User 1',
    });

    // Attempt duplicate
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'DifferentPass123!',
        name: 'Test User 2',
      })
      .expect(409);

    expect(response.body.error).toContain('already exists');
  });
});

describe('POST /api/auth/login', () => {
  it('authenticates valid credentials', async () => {
    // Setup: create user
    await createTestUser({ email: 'test@example.com', password: 'SecurePass123!' });

    // Test: login
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'SecurePass123!',
      })
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');
  });

  it('rejects invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'WrongPassword123!',
      })
      .expect(401);

    expect(response.body.error).toBe('Invalid email or password');
  });
});
```

### E2E Tests (Playwright)

```typescript
test('complete registration flow', async ({ page }) => {
  await page.goto('/register');

  // Fill form
  await page.fill('input[name="email"]', 'e2e@test.com');
  await page.fill('input[name="password"]', 'SecurePassword123!');
  await page.fill('input[name="name"]', 'E2E Test User');

  // Submit
  await page.click('button[type="submit"]');

  // Verify redirect to dashboard
  await page.waitForURL('/dashboard');
  await expect(page.locator('h1')).toContainText('Welcome');

  // Verify session persists after reload
  await page.reload();
  await expect(page.locator('h1')).toContainText('Welcome');
});

test('Google social login', async ({ page, context }) => {
  await page.goto('/login');

  // Click Google login button
  const [popup] = await Promise.all([context.waitForEvent('page'), page.click('button:has-text("Continue with Google")')]);

  // Complete OAuth flow in popup (using test credentials)
  await popup.waitForLoadState();
  await popup.fill('input[type="email"]', 'test@example.com');
  await popup.click('button:has-text("Next")');
  await popup.fill('input[type="password"]', 'test-password');
  await popup.click('button:has-text("Sign in")');

  // Verify redirected to dashboard
  await page.waitForURL('/dashboard');
  await expect(page.locator('h1')).toContainText('Welcome');
});
```

### Manual Testing Checklist

- [ ] Register with email/password → Receive welcome email
- [ ] Login with correct credentials → Access dashboard
- [ ] Login with incorrect password → See error message
- [ ] Attempt 5 failed logins → Account locked for 15 minutes
- [ ] Register with Google → Account created, logged in
- [ ] Register with GitHub → Account created, logged in
- [ ] Link Google to existing email account → Accounts merged
- [ ] Logout → Session cleared, redirected to login
- [ ] Close browser, reopen within 7 days → Still logged in
- [ ] Close browser, reopen after 7 days → Must login again
- [ ] Try weak password → See validation errors
- [ ] Enter invalid email → See validation error
- [ ] Network error during login → See retry option

## Security Considerations

### Threat Model

- **Password Brute Force:** Rate limiting + account lockout
- **Credential Stuffing:** Monitor for unusual login patterns
- **XSS Attacks:** httpOnly cookies, CSP headers
- **CSRF Attacks:** SameSite cookies, custom headers
- **Session Hijacking:** Secure cookies, IP validation (future)
- **OAuth Token Theft:** PKCE flow, state parameter validation

### Compliance

- **GDPR:** Consent for data processing, right to deletion
- **PCI DSS:** No card data stored, secure authentication
- **SOC 2:** Audit logging, access controls

### Monitoring & Alerts

- Failed login rate (alert if >100/hour)
- Account creation rate (alert if >50/hour - possible bot)
- OAuth errors (alert if >5% error rate)
- Password reset requests (alert if >20/hour - possible attack)

## Performance Requirements

- **Registration:** < 1 second response time (p95)
- **Login:** < 500ms response time (p95)
- **Social Login:** < 3 seconds total (including OAuth redirect)
- **Token Refresh:** < 100ms response time (p95)
- **Welcome Email:** Delivered within 30 seconds

## Dependencies

- **Completed:** Database schema (ADR-002)
- **Completed:** Tech stack selection (ADR-001)
- **Completed:** Auth0 account setup and configuration
- **Completed:** SendGrid account and email templates
- **Completed:** Redis instance for session storage

## Success Metrics

### Completion Criteria (MVP)

- [ ] ✅ All acceptance criteria implemented and tested
- [ ] ✅ Unit test coverage > 80% for auth code
- [ ] ✅ Integration tests pass for all API endpoints
- [ ] ✅ E2E tests pass for registration and login flows
- [ ] ✅ Security review completed (penetration testing)
- [ ] ✅ Load testing passed (1000 concurrent logins)

### Business Metrics (Post-Launch)

- **Registration Completion Rate:** Target >70%
- **Social Login Adoption:** Target >40% of signups
- **Failed Login Rate:** < 2% of attempts
- **Session Duration:** Average >30 minutes
- **Password Reset Requests:** < 5% of users/month

## Related Documents

- [ADR-003: Authentication Approach](../architecture/ADR-003-auth-approach.md)
- [ADR-001: Tech Stack Choice](../architecture/ADR-001-tech-stack-choice.md)
- [ADR-002: Database Choice](../architecture/ADR-002-database-choice.md)

## Notes & Decisions

### Decision Log

**2025-08-21:** Chose JWT + httpOnly cookies over session-only approach for better scalability

**2025-08-25:** Decided to use Auth0 for social login instead of implementing OAuth 2.0 directly (reduces complexity, improves security)

**2025-09-10:** Increased password length requirement from 8 to 12 characters based on NIST guidelines

**2025-09-15:** Added account lockout after 10 failed attempts (was 5) - better balance between security and UX

### Known Limitations

- No 2FA/MFA in MVP (planned for Month 6)
- No biometric authentication (planned for mobile apps)
- Social login limited to Google and GitHub (will add Microsoft, Apple post-launch)
- Session invalidation delay up to 1 minute (Redis TTL)

---

**Document Owner:** Elena Popov (Backend Lead)
**Last Updated:** 2025-09-28 (marking as completed)
**Implementation PR:** #89, #92, #97
**Test Coverage:** 87% (backend), 82% (frontend)
