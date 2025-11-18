# ADR-003: Authentication and Authorization Approach

**Status:** Accepted
**Date:** 2025-08-20
**Deciders:** David Kumar (Tech Lead), Elena Popov (Backend Engineer), Security Consultant
**Consulted:** Sarah Chen (Frontend Lead), CTO

## Context

SubscriptFlow requires secure authentication and authorization for:

1. **User Authentication:** Email/password and social login (Google, GitHub, Microsoft)
2. **Session Management:** Secure, scalable session handling
3. **API Authorization:** Token-based API access for SPA
4. **Multi-Tenancy:** Organization-level access control
5. **Role-Based Access:** Owner, Admin, Member roles within organizations
6. **Security Requirements:** PCI DSS compliance, GDPR compliance, industry best practices

### Key Requirements

**Security:**

- Passwords must be hashed with industry-standard algorithms
- Protection against common attacks (XSS, CSRF, brute force, account takeover)
- Secure token storage (no localStorage for sensitive tokens)
- Session expiration and refresh mechanism
- Multi-factor authentication support (future requirement, Month 6)

**User Experience:**

- Single sign-on with social providers
- "Remember me" functionality
- Smooth token refresh (no forced logouts)
- Fast authentication checks (< 50ms)

**Scalability:**

- Stateless authentication for horizontal scaling
- Session storage that scales horizontally
- Support 100K concurrent sessions at target scale

**Compliance:**

- GDPR (consent, data deletion, data export)
- PCI DSS (secure authentication)
- SOC 2 (audit logging, access controls)

## Decision

We will implement a hybrid authentication system:

### Primary Authentication: JWT (JSON Web Tokens)

- **Access Tokens:** Short-lived (15 minutes), stored in memory
- **Refresh Tokens:** Long-lived (7 days), stored in httpOnly cookies
- **Token Type:** RS256 (asymmetric signing with RSA)
- **Token Storage:** Access tokens in memory, refresh tokens in secure httpOnly cookies

### Session Management: Redis-backed

- **Session Store:** Redis for refresh token metadata
- **Session Duration:** 7 days (slidin expiration on refresh)
- **Session Invalidation:** Support logout from all devices

### Social Authentication: OAuth 2.0 via Auth0

- **Provider:** Auth0 for Google, GitHub, Microsoft
- **Flow:** Authorization Code Flow with PKCE
- **Account Linking:** Link social accounts to existing email accounts

### Authorization: Role-Based Access Control (RBAC)

- **Scope:** Organization-level roles (Owner, Admin, Member)
- **Enforcement:** Middleware checks on API endpoints
- **Permissions:** Defined per role in database

## Options Considered

### Option 1: JWT (Access + Refresh Tokens) + OAuth 2.0 (CHOSEN)

**Pros:**

- Industry standard, well-understood approach
- Stateless access tokens enable horizontal scaling
- Refresh tokens allow revoking access
- Short-lived access tokens limit damage from token theft
- httpOnly cookies protect against XSS attacks
- Compatible with social login (OAuth 2.0)
- No database lookup for every request (access tokens are self-contained)
- Team familiar with JWT pattern

**Cons:**

- More complex than session-only approach
- Requires careful implementation to avoid vulnerabilities
- Token refresh flow adds complexity to frontend
- Cannot revoke access tokens before expiration (mitigated by short TTL)
- Requires key management for RS256 signing

**Security Profile:** High (with proper implementation)
**Implementation Complexity:** Medium
**Scalability:** Excellent (stateless access tokens)

### Option 2: Session-Based Authentication (Traditional Cookies)

**Pros:**

- Simpler implementation
- Easy to invalidate sessions
- Server has full control over sessions
- Well-understood security model
- Easy to implement "logout everywhere"

**Cons:**

- Requires database/Redis lookup on every request
- Horizontal scaling more complex (sticky sessions or shared session store)
- Not ideal for API-first architecture
- Harder to integrate with mobile apps (if needed later)
- Session fixation vulnerabilities if not careful
- Less suitable for microservices architecture (future consideration)

**Security Profile:** High
**Implementation Complexity:** Low
**Scalability:** Moderate (requires shared session store)

**Decision:** Rejected. JWT better fits our API-first, scalable architecture.

### Option 3: OAuth 2.0 Only (Delegated to Auth0 entirely)

**Pros:**

- Offload all authentication to Auth0
- No password storage or management
- Built-in social login
- Compliance features included
- Regular security updates from Auth0

**Cons:**

- Vendor lock-in to Auth0
- Additional cost ($0.023/MAU, ~$2300/month at 100K users)
- Less control over authentication flow
- Users must trust third-party with credentials
- Cannot customize authentication experience fully
- Dependency on Auth0 uptime

**Security Profile:** Excellent (managed by experts)
**Implementation Complexity:** Low
**Scalability:** Excellent (managed by Auth0)

**Decision:** Rejected. Too expensive and reduces control. Use Auth0 only for social login.

### Option 4: Passwordless Authentication (Magic Links / OTP)

**Pros:**

- No passwords to manage or hash
- No password-related vulnerabilities
- Better UX for some users
- Reduces support burden (no "forgot password")

**Cons:**

- Requires reliable email delivery
- Users expect traditional password option
- Harder to implement "remember me"
- Not suitable for all use cases (users on multiple devices)
- May reduce conversion (users unfamiliar with pattern)

**Security Profile:** Moderate to High (depends on email security)
**Implementation Complexity:** Medium
**Scalability:** Good

**Decision:** Rejected for MVP. Consider as optional alternative in Month 6+.

## Detailed Design

### JWT Structure

#### Access Token (15-minute TTL)

```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "iat": 1698765432,
  "exp": 1698766332,
  "aud": "subscriptflow-api",
  "iss": "subscriptflow.com"
}
```

**Properties:**

- Signed with RS256 (asymmetric signing)
- No sensitive data included
- Short expiration (15 minutes)
- Stored in memory (React context/Redux)
- Sent in Authorization header: `Bearer <token>`

#### Refresh Token (7-day TTL)

```json
{
  "sub": "user-uuid",
  "session_id": "session-uuid",
  "iat": 1698765432,
  "exp": 1699370232,
  "aud": "subscriptflow-api",
  "iss": "subscriptflow.com",
  "type": "refresh"
}
```

**Properties:**

- Stored in httpOnly, secure, sameSite=strict cookie
- Cannot be accessed by JavaScript (XSS protection)
- Longer expiration (7 days)
- Linked to session in Redis for revocation
- Used only for obtaining new access tokens

### Authentication Flows

#### Registration Flow

```
1. User submits email + password + name
2. Backend validates:
   - Email format and uniqueness
   - Password strength (12+ chars, complexity)
3. Hash password with bcrypt (cost factor 12)
4. Create user record in database
5. Create session in Redis
6. Generate access + refresh tokens
7. Set refresh token in httpOnly cookie
8. Return access token in response body
9. Frontend stores access token in memory
10. Redirect to dashboard
```

#### Login Flow (Email/Password)

```
1. User submits email + password
2. Backend validates:
   - User exists
   - Password matches (bcrypt compare)
   - Account not locked (after 5 failed attempts, lock for 15 min)
3. Create session in Redis
4. Generate access + refresh tokens
5. Set refresh token in httpOnly cookie
6. Return access token in response body
7. Frontend stores access token in memory
8. Redirect to dashboard
```

#### Social Login Flow (OAuth 2.0)

```
1. User clicks "Continue with Google"
2. Frontend redirects to Auth0:
   GET https://subscriptflow.auth0.com/authorize?
     response_type=code&
     client_id=<client-id>&
     redirect_uri=<callback-url>&
     scope=openid profile email&
     state=<random-state>
3. User authenticates with Google
4. Auth0 redirects to callback with code
5. Frontend sends code to backend
6. Backend exchanges code for tokens with Auth0
7. Backend fetches user profile from Auth0
8. Backend checks if user exists (by email):
   - If yes: Link social account to existing user
   - If no: Create new user with social provider
9. Create session in Redis
10. Generate access + refresh tokens
11. Set refresh token in httpOnly cookie
12. Return access token to frontend
13. Redirect to dashboard
```

#### Token Refresh Flow

```
1. Access token expires (15 minutes)
2. Frontend detects 401 Unauthorized response
3. Frontend calls /auth/refresh endpoint
4. Backend reads refresh token from httpOnly cookie
5. Backend validates refresh token:
   - Signature valid
   - Not expired
   - Session exists in Redis
6. Generate new access token
7. Return new access token in response
8. Frontend stores new access token in memory
9. Retry original request with new token
```

#### Logout Flow

```
1. User clicks logout
2. Frontend calls /auth/logout endpoint
3. Backend invalidates session in Redis
4. Backend clears refresh token cookie
5. Frontend clears access token from memory
6. Redirect to login page
```

#### Logout from All Devices

```
1. User clicks "Logout from all devices"
2. Frontend calls /auth/logout-all endpoint
3. Backend invalidates ALL sessions for user in Redis
4. Backend clears refresh token cookie
5. Frontend clears access token from memory
6. All other devices receive 401 on next request
7. Redirect to login page
```

### Redis Session Structure

```javascript
// Session key: `session:{session-uuid}`
{
  "user_id": "user-uuid",
  "created_at": "2025-11-18T10:00:00Z",
  "last_accessed": "2025-11-18T14:30:00Z",
  "ip_address": "192.168.1.1",
  "user_agent": "Mozilla/5.0...",
  "expires_at": "2025-11-25T10:00:00Z"
}
// TTL: 7 days (sliding expiration on refresh)
```

### Authorization Middleware

```typescript
// Example middleware for role-based access control
async function requireOrgRole(req, res, next, requiredRole: 'owner' | 'admin' | 'member') {
  const userId = req.user.id; // From JWT
  const orgId = req.params.orgId || req.body.organization_id;

  // Query database for user's role in organization
  const membership = await db.organizationMember.findUnique({
    where: { organizationId_userId: { organizationId: orgId, userId } },
  });

  if (!membership) {
    return res.status(403).json({ error: 'Not a member of organization' });
  }

  const roleHierarchy = { owner: 3, admin: 2, member: 1 };
  if (roleHierarchy[membership.role] < roleHierarchy[requiredRole]) {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }

  req.organizationRole = membership.role;
  next();
}

// Usage in routes
router.delete('/organizations/:orgId', authenticate, requireOrgRole('owner'), deleteOrganization);
```

## Security Considerations

### Password Security

**Hashing:**

- Algorithm: bcrypt
- Cost factor: 12 (balances security and performance)
- Salt: Automatic (bcrypt handles salting)

**Password Policy:**

- Minimum 12 characters
- Must include: uppercase, lowercase, number, special character
- Cannot be commonly used passwords (check against list)
- Cannot be same as email

**Password Reset:**

- Time-limited tokens (1 hour expiration)
- Tokens stored hashed in database
- Single-use tokens (invalidated after use)
- Email verification required

### Token Security

**JWT Signing:**

- Algorithm: RS256 (asymmetric)
- Private key: Stored in AWS Secrets Manager
- Public key: Embedded in application for verification
- Key rotation: Every 90 days

**Token Storage:**

- Access tokens: In-memory only (React context/Redux)
- Refresh tokens: httpOnly, secure, sameSite=strict cookies
- Never store tokens in localStorage (XSS vulnerability)

**Token Validation:**

- Signature verification on every request
- Expiration check
- Audience and issuer validation
- Revocation check for refresh tokens (Redis lookup)

### Attack Mitigation

**XSS (Cross-Site Scripting):**

- httpOnly cookies for refresh tokens (inaccessible to JavaScript)
- Content Security Policy headers
- Input sanitization and output encoding

**CSRF (Cross-Site Request Forgery):**

- SameSite=strict cookie attribute
- Custom request headers (Authorization: Bearer)
- CSRF tokens for state-changing operations (future enhancement)

**Brute Force:**

- Rate limiting: 5 failed login attempts → 15-minute lockout
- Progressive delays after failed attempts
- Account lockout after 10 failed attempts in 24 hours
- CAPTCHA after 3 failed attempts (future enhancement)

**Session Hijacking:**

- httpOnly, secure cookies
- IP address and user agent validation (future enhancement)
- Anomaly detection for suspicious login patterns (future enhancement)

**Token Theft:**

- Short-lived access tokens (15 minutes)
- Refresh token rotation (new refresh token issued on refresh)
- Session invalidation on logout

### Audit Logging

All authentication events logged:

- Login attempts (success and failure)
- Logout events
- Token refresh events
- Password changes
- Social account linking
- Session invalidations

Log includes:

- User ID
- Timestamp
- IP address
- User agent
- Action result (success/failure)
- Failure reason (if applicable)

## Organizational Access Control

### Role Definitions

**Owner:**

- Full access to organization
- Can delete organization
- Can manage billing and subscriptions
- Can manage members and roles
- Can change organization settings
- Cannot be removed (must transfer ownership first)

**Admin:**

- Can manage members (add, remove, change roles except Owner)
- Can change organization settings
- Can view billing and subscriptions
- Cannot delete organization
- Cannot manage subscription (billing operations)

**Member:**

- Can view organization data
- Can use organization features
- Cannot manage members
- Cannot change organization settings
- Cannot access billing information

### Permission Matrix

| Action                      | Owner | Admin | Member |
| --------------------------- | ----- | ----- | ------ |
| View organization           | ✅    | ✅    | ✅     |
| Update organization details | ✅    | ✅    | ❌     |
| Delete organization         | ✅    | ❌    | ❌     |
| Invite members              | ✅    | ✅    | ❌     |
| Remove members              | ✅    | ✅    | ❌     |
| Change member roles         | ✅    | ✅    | ❌     |
| View billing                | ✅    | ✅    | ❌     |
| Manage subscriptions        | ✅    | ❌    | ❌     |
| View usage metrics          | ✅    | ✅    | ✅     |

## Implementation Plan

### Phase 1: Basic Authentication (Week 1)

- Email/password registration and login
- Password hashing with bcrypt
- JWT generation and validation
- Access token in memory, refresh token in cookie
- Basic authentication middleware

### Phase 2: Session Management (Week 2)

- Redis session store
- Token refresh endpoint
- Logout and logout-all endpoints
- Session expiration handling

### Phase 3: Social Login (Week 3)

- Auth0 integration
- OAuth 2.0 flow implementation
- Social account linking
- User profile merging

### Phase 4: Authorization (Week 4)

- Organization membership model
- Role-based access control middleware
- Permission checking on all protected routes
- Audit logging for auth events

### Phase 5: Security Hardening (Week 5)

- Rate limiting
- Account lockout
- IP and user agent tracking
- Security headers (CSP, HSTS, etc.)

## Monitoring & Alerts

### Metrics to Track

- Login success rate (target: >98%)
- Average login time (target: <500ms)
- Token refresh rate (track for anomalies)
- Failed login attempts per user (alert on >5/hour)
- Session duration (track for UX insights)

### Alerts

- High failed login rate (>100/hour) → Possible brute force attack
- Unusual token refresh pattern → Possible token theft
- Social login errors (>5% error rate) → Auth0 integration issue
- Redis connection failures → Session store unavailable

## Future Enhancements (Post-MVP)

### Month 6+

- **Multi-Factor Authentication (MFA):** TOTP-based 2FA
- **Magic Link Login:** Passwordless authentication option
- **CAPTCHA:** After repeated failed login attempts
- **Anomaly Detection:** Suspicious login patterns (new device, new location)
- **Biometric Authentication:** For mobile apps (fingerprint, face ID)

### Month 12+

- **SSO (Single Sign-On):** SAML 2.0 for enterprise customers
- **API Keys:** For programmatic API access
- **OAuth 2.0 Provider:** Allow customers to authenticate their users via SubscriptFlow

## Compliance & Regulations

### GDPR Compliance

- **Consent:** Explicit consent for data processing
- **Data Export:** User can download all their data
- **Right to Deletion:** User can request account deletion (soft delete with 30-day retention)
- **Data Minimization:** Only collect necessary data

### PCI DSS Compliance

- **No Card Storage:** Stripe handles all card data
- **Secure Authentication:** Strong password policy, encrypted tokens
- **Audit Logging:** Track all access to sensitive data

### SOC 2 Requirements

- **Access Controls:** Role-based access, principle of least privilege
- **Audit Logging:** Comprehensive logs of authentication events
- **Session Management:** Secure session handling with timeouts
- **Encryption:** TLS for all communication, encrypted tokens

## Revisit Conditions

Reconsider this decision if:

1. **Security Incident:** Authentication-related breach or vulnerability
2. **Scale Issues:** Session management becomes bottleneck (>10K concurrent users)
3. **Compliance Changes:** New regulations require different approach
4. **User Feedback:** Significant UX issues with current flow
5. **Cost:** Auth0 social login costs become prohibitive (>$500/month)
6. **Mobile App:** If we build mobile apps, may need additional flow

**Next Review Date:** February 2026 (6 months after launch)

## References

- [JWT Best Practices](https://datatracker.ietf.org/doc/html/rfc8725)
- [OAuth 2.0 Specification](https://datatracker.ietf.org/doc/html/rfc6749)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Auth0 Documentation](https://auth0.com/docs)
- [bcrypt Best Practices](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/)

## Related Decisions

- [ADR-001: Tech Stack Choice](./ADR-001-tech-stack-choice.md) - Context on Node.js + Express choice
- [ADR-002: Database Choice](./ADR-002-database-choice.md) - Redis for session storage

---

**Document Owner:** David Kumar (Tech Lead)
**Last Updated:** 2025-08-20
**Next Review:** 2026-02-20
