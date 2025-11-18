# Tasks Folder

This folder contains **small changes, bug fixes, and enhancements** that can be completed in hours or a few days.

---

## When to Create a Task

Create a task when the work:

- **Duration:** Takes less than 1 day to complete
- **Scope:** Affects a single component or file
- **Complexity:** Straightforward with clear solution
- **Impact:** Incremental improvement or fix

**Examples:**

- Fix a bug
- Update documentation
- Improve error messages
- Add validation
- Refactor a function
- Update dependencies
- Fix typos
- Improve performance of specific function

---

## Task Structure

```
tasks/
├── active/                   ← Currently being worked on
│   ├── fix-login-timeout.md
│   ├── update-api-docs.md
│   └── improve-error-messages.md
│
└── completed/                ← Finished tasks (archived by month)
    ├── 2024-11/
    │   ├── fix-typo-readme.md
    │   ├── update-button-color.md
    │   └── add-loading-spinner.md
    └── 2024-10/
        └── ...
```

---

## How to Create a New Task

### 1. Ask the Orchestrator

```
"Fix the login timeout issue"
"Update the README with deployment instructions"
```

The Orchestrator will:

1. Analyze scope and complexity
2. Determine if it's a TASK (vs a project)
3. Create task file from template in `tasks/active/`
4. Assign appropriate agent
5. Track in main progress file

### 2. Manual Creation

If creating manually:

1. Copy `TASK-TEMPLATE.md` to `tasks/active/[task-name].md`
2. Fill in description, acceptance criteria, and steps
3. Update main `project-progress.md` with brief mention

---

## Task Lifecycle

### 1. Creation

- Task file created in `tasks/active/`
- Status: 🔵 Not Started
- Agent assigned

### 2. In Progress

- Agent begins work
- Status updated to: 🟡 In Progress
- Steps checked off as completed

### 3. Completion

- All acceptance criteria met
- Testing completed
- Documentation updated
- Status updated to: 🟢 Completed
- File moved to `tasks/completed/YYYY-MM/`

### 4. Archival

- Moved to monthly folder for historical reference
- Referenced in main progress tracker as completed

---

## Task Template Sections

### 📋 Description

- What needs to be done
- Why it's needed
- Affected components

### 🎯 Acceptance Criteria

- Specific, measurable outcomes
- Must be verifiable

### 📝 Implementation Plan

- High-level approach
- Step-by-step checklist

### 🧪 Testing Plan

- Test cases to verify
- How to confirm completion

### 🤝 Agents Involved

- Who worked on it
- What they contributed

---

## Completing Tasks

When a task is completed:

1. **✅ Check all acceptance criteria**
2. **📝 Fill completion summary**
   - What was done
   - Changes made
   - Test results
   - Lessons learned
3. **🔄 Update status** to 🟢 Completed
4. **📁 Move to completed folder**
   ```bash
   mv tasks/active/task-name.md tasks/completed/YYYY-MM/
   ```
5. **📊 Update main progress tracker**
   - Mark as completed in project-progress.md
   - Add to recent completions

---

## When to Escalate to Project

If during work you discover the task is larger than expected:

**Indicators:**

- Taking more than 2-3 days
- Affecting multiple components
- Requiring architectural decisions
- Needing multiple agents/phases

**Action:**

1. Update task status to note complexity
2. Inform Orchestrator
3. Create new project folder
4. Migrate work to project structure
5. Close task with reference to new project

---

## Best Practices

### 1. Keep Tasks Small

- If you can't complete in 1 day, consider breaking down
- Single responsibility
- Clear, focused scope

### 2. Clear Acceptance Criteria

- Must be specific and measurable
- Should be verifiable
- Define "done" explicitly

### 3. Update Regularly

- Check off steps as you complete them
- Add notes about challenges
- Document solutions for future reference

### 4. Link to Context

- Reference related projects
- Link to relevant docs
- Note dependencies

### 5. Archive Monthly

- Move completed tasks to month folders
- Keeps active/ folder clean
- Maintains history for review

---

## Task vs Project Decision Tree

```
Is the work > 1 week?
├─ Yes → PROJECT
└─ No → Continue
    │
    Does it affect multiple systems?
    ├─ Yes → PROJECT
    └─ No → Continue
        │
        Does it require multiple agents/phases?
        ├─ Yes → PROJECT
        └─ No → TASK
```

---

## Examples

### ✅ Good Tasks

- "Fix: Login timeout after 5 minutes"
- "Update: Add error handling to API endpoint"
- "Improve: Loading indicator on dashboard"
- "Docs: Add deployment section to README"
- "Refactor: Extract validation logic to helper"

### ❌ Should Be Projects

- "Build complete authentication system" → Too large
- "Redesign entire admin panel" → Multiple components
- "Implement payment processing" → Multiple phases
- "Add analytics dashboard" → Complex feature

---

## Monthly Review

At the end of each month:

1. Review completed tasks in `completed/YYYY-MM/`
2. Identify patterns (common bugs, improvements)
3. Extract lessons learned
4. Archive month folder
5. Start fresh next month

---

## Templates Available

- **TASK-TEMPLATE.md** - Complete task structure
- Copy and customize for each new task

---

_For large initiatives and multi-week work, use the `projects/` folder instead._

_See [projects/README.md](../projects/README.md) for project management._
