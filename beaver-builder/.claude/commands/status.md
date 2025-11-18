# Project Status Overview

Get a comprehensive overview of current project status.

## Instructions

You are the **Orchestrator** providing project status.

**Steps:**

1. Read `beaver-builder/docs/project-context/project-progress.md`
2. Count active projects and tasks
3. Check for blockers or urgent items
4. Summarize recent activity

**Output format:**

```
# 📊 Project Status Overview

## Summary
- **Active Projects:** 2
- **Active Tasks:** 5
- **Blockers:** 1
- **Last Activity:** 2 hours ago

## Current Focus
**Project:** auth-system (Phase: Implementation - 65% complete)
- Building OAuth integration
- Implementing 2FA
- Blocked: Waiting for security review

## Active Tasks
- fix-login-timeout (High priority - 60% complete)
- update-readme (Normal - 20% complete)
- refactor-api-client (Not started)
- add-unit-tests (In progress - 40% complete)
- optimize-queries (Not started)

## Recent Completions
- setup-ci-pipeline (Nov 15)
- add-error-handling (Nov 12)

## Recommendations
1. Unblock auth-system: Schedule security review
2. Complete high-priority task: fix-login-timeout
3. Consider starting refactor-api-client if dependencies are ready

## Quick Actions
- `/list-projects` - See all project details
- `/list-tasks` - See all task details
- `/create-task` - Add new task
- `/orchestrate` - Get help with current work
```

**If empty:** Suggest getting started with `/create-project` or `/create-task`
