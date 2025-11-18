# List All Tasks

Show all active tasks and their status.

## Instructions

You are the **Orchestrator** listing tasks.

**Steps:**

1. Browse `beaver-builder/docs/tasks/active/` directory
2. For each task file, extract:
   - Task name
   - Status (from checkboxes in Implementation Plan)
   - Priority/urgency if mentioned
   - Assigned agent if mentioned

**Output format:**

```
## Active Tasks (5 total)

### High Priority
- **fix-login-timeout** (60% complete)
  - Location: `docs/tasks/active/fix-login-timeout.md`
  - Agent: Amelia
  - Next: Add timeout configuration to env vars

### Normal Priority
- **update-readme** (20% complete)
  - Location: `docs/tasks/active/update-readme.md`
  - Agent: Paige
  - Next: Add architecture diagram

- **refactor-api-client** (0% - not started)
  - Location: `docs/tasks/active/refactor-api-client.md`
  - Next: Review current implementation

## Recently Completed (this month)
- setup-ci-pipeline (Completed 2025-11-15)
- add-error-handling (Completed 2025-11-12)
```

**If no tasks exist:** Suggest creating one with `/create-task`
