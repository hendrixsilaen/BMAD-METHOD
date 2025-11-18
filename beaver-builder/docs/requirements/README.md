# Requirements Documentation

This folder contains all product requirements, user stories, and feature specifications for the project.

---

## 📋 Strict Template Requirements

### User Stories - **REQUIRED TEMPLATE**

**When creating user stories, you MUST use the strict template:**

```
beaver-builder/docs/requirements/USER-STORY-TEMPLATE.md
```

**Why strict?** User stories define WHAT agents build. Inconsistent stories lead to:

- Ambiguous acceptance criteria
- Incomplete implementations
- Missed edge cases
- Unclear definition of "done"
- Testing gaps

**Naming convention:**

```
US-001-user-login-with-email.md
US-002-save-favorite-articles.md
US-003-password-reset-flow.md
```

Number sequentially, use kebab-case titles.

---

## 📁 Folder Structure

```
requirements/
├── README.md (this file)
├── USER-STORY-TEMPLATE.md      # Template for all user stories
├── US-001-[story].md           # Individual user stories (numbered)
├── US-002-[story].md
├── epics/                       # Epic-level stories (flexible)
├── prd/                         # Product requirements docs (flexible)
├── personas/                    # User personas (flexible)
└── research/                    # User research (flexible)
```

---

## ✅ When to Create a User Story

Create a user story for:

- **User-facing features** - Something users directly interact with
- **API endpoints** - External interfaces
- **Data migrations** - Changes affecting user data
- **Critical workflows** - Multi-step user journeys
- **Bug fixes with user impact** - Not all bugs, but user-facing ones

**Examples:**

- ✅ User can log in with email and password
- ✅ User can save articles to favorites
- ✅ API returns user profile data
- ✅ System sends password reset email
- ✅ Dashboard displays last 30 days of activity

**Counter-examples (use Task instead):**

- ❌ Refactor authentication code - Use `/create-task`
- ❌ Update dependency versions - Use `/create-task`
- ❌ Fix typo in error message - Use `/create-task`
- ❌ Add code comments - Use `/create-task`

---

## 📝 Creating a User Story

### Process

1. **Determine if it's a story or task:**
   - **User Story:** User-facing, has acceptance criteria, user value
   - **Task:** Internal, technical, no direct user value
   - **Use `/create-task` for tasks!**

2. **Copy the template:**

   ```bash
   cp USER-STORY-TEMPLATE.md US-XXX-your-story-title.md
   ```

3. **Find the next number:**

   ```bash
   ls US-*.md | sort | tail -1
   # If last is US-012, create US-013
   ```

4. **Fill out ALL required sections:**
   - User Story (As a / I want / So that)
   - Acceptance Criteria (Given/When/Then format)
   - Technical Details
   - Dependencies
   - Testing Strategy

5. **Get approval:**
   - Product Owner (John) reviews
   - Architect (Winston) reviews technical approach
   - Developer (Amelia) confirms feasibility
   - Tester (Murat) reviews acceptance criteria

6. **Mark as Approved:**
   - Change status from "Draft" to "Approved"
   - Assign to developer/agent
   - Add to sprint/milestone

---

## 🎯 Writing Good Acceptance Criteria

### Format: Given/When/Then

```markdown
- [ ] **AC1:** User can log in with valid credentials
  - **Given** user has an account
  - **When** user enters valid email and password
  - **Then** user is redirected to dashboard
  - **And** session cookie is set
  - **And** "Welcome back" message is displayed
```

### Make them SMART

- **Specific:** Not "fast load times" but "page loads in < 2 seconds"
- **Measurable:** Can be tested objectively
- **Achievable:** Technically feasible
- **Relevant:** Relates to user story goal
- **Testable:** Can write automated or manual test

### Include Edge Cases

```markdown
- [ ] **AC5:** Handle invalid login attempts
  - **Given** user enters wrong password
  - **When** user clicks "Log In"
  - **Then** show error "Invalid email or password"
  - **And** do not reveal which field was incorrect (security)
  - **And** limit to 5 attempts per hour (prevent brute force)
```

---

## 🎨 Other Requirements Docs (Flexible Format)

### Product Requirements Documents (PRDs)

**Folder:** `prd/`
**Format:** Flexible
**Purpose:** High-level product vision and requirements

**Use John (Product Manager) with `/design` to create PRDs**

### Epics

**Folder:** `epics/`
**Format:** Flexible
**Purpose:** Group related user stories

**Structure:**

```markdown
# Epic: User Authentication System

## Goal

[What we're building and why]

## User Stories

- US-001: User login
- US-002: User registration
- US-003: Password reset
- US-004: Email verification

## Success Metrics

[How we measure success]
```

### User Personas

**Folder:** `personas/`
**Format:** Flexible
**Purpose:** Define target users

**Use Sally (UX Designer) with `/design` to create personas**

---

## 🔄 User Story Lifecycle

### 1. Draft

- Story created from template
- Initial details filled in
- Not yet reviewed

**Actions:**

- Gather requirements
- Define acceptance criteria
- Identify dependencies

### 2. Approved

- Product Owner reviewed and approved
- Technical feasibility confirmed
- Ready for implementation

**Actions:**

- Add to backlog
- Prioritize
- Size/estimate

### 3. In Progress

- Assigned to developer/agent
- Implementation underway

**Actions:**

- Follow acceptance criteria
- Write tests
- Update story with progress

### 4. In Review

- Implementation complete
- Code review in progress
- Testing underway

**Actions:**

- Verify all AC met
- Run tests
- Get peer review

### 5. Done

- All AC met
- Tests passing
- Deployed (or ready to deploy)

**Actions:**

- Mark as Done
- Close related tasks
- Update documentation

### 6. Blocked

- Cannot proceed due to dependency or blocker

**Actions:**

- Document blocker
- Identify resolution path
- Update status when unblocked

---

## 🔍 Finding User Stories

### By Status

```bash
grep "Status: Approved" US-*.md
grep "Status: In Progress" US-*.md
grep "Status: Done" US-*.md
```

### By Epic

```bash
grep "Epic: Authentication" US-*.md
```

### By Priority

```bash
grep "Priority: Critical" US-*.md
grep "Priority: High" US-*.md
```

---

## 🤝 Agent Responsibilities

### John (Product Manager)

- **Primary owner** of user stories
- Defines business value
- Writes user story format
- Approves acceptance criteria

### Mary (Business Analyst)

- Refines requirements
- Identifies edge cases
- Validates business logic
- Documents workflows

### Winston (Architect)

- Reviews technical approach
- Identifies architecture decisions needed
- Flags technical risks

### Amelia (Developer)

- Confirms implementation feasibility
- Breaks down into tasks
- Implements according to AC
- Marks as complete

### Murat (Test Architect)

- Reviews acceptance criteria for testability
- Defines test strategy
- Creates test scenarios
- Validates completion

### Sally (UX Designer)

- Defines user flows
- Creates wireframes
- Ensures good UX

---

## 💡 Tips for Writing Good User Stories

### Do:

- ✅ Focus on user value (not technical implementation)
- ✅ Include both happy path and error cases
- ✅ Make acceptance criteria specific and testable
- ✅ Consider edge cases and boundary conditions
- ✅ Link to wireframes, mockups, or prototypes
- ✅ Define non-functional requirements (performance, security, accessibility)

### Don't:

- ❌ Skip acceptance criteria
- ❌ Make AC too vague ("works well", "looks good")
- ❌ Forget error handling and edge cases
- ❌ Mix multiple features in one story
- ❌ Start implementation without approval
- ❌ Mark as done without meeting all AC

---

**Need help creating a user story? Use `/create-task` for small changes or work with John (PM) for features!**
