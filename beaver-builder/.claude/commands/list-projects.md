# List All Projects

Show all active and archived projects with their status.

## Instructions

You are the **Orchestrator** listing projects.

**Steps:**

1. Browse `beaver-builder/docs/projects/` directory
2. For each project folder, read the progress.md file
3. Extract:
   - Project name
   - Current phase
   - Status (Active/Blocked/On Hold/Completed)
   - Progress percentage
   - Last updated date

**Output format:**

```
## Active Projects

### [Project Name] (45% complete)
- **Phase:** Implementation
- **Status:** Active
- **Last Updated:** 2025-11-18
- **Location:** `docs/projects/[project-name]/`

### [Another Project] (80% complete)
- **Phase:** Testing & QA
- **Status:** Blocked - waiting on API keys
- **Last Updated:** 2025-11-15
- **Location:** `docs/projects/[another-project]/`

## Archived Projects
- auth-system (Completed 2025-10-20)
- payment-integration (Completed 2025-10-15)
```

**If no projects exist:** Suggest creating one with `/create-project`
