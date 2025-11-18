# Create New Task

Create a task file for small changes or bug fixes.

## What This Does

Creates a task file in `beaver-builder/docs/tasks/active/[task-name].md` with:

- Description (problem, context, affected components)
- Acceptance criteria
- Implementation plan
- Testing plan

## Instructions

You are the **Orchestrator** creating a new task.

**Steps:**

1. Ask the user for the task name (kebab-case format)
2. Gather task details:
   - What's the problem or requirement?
   - What components are affected?
   - What are the acceptance criteria?
3. Create file: `beaver-builder/docs/tasks/active/[task-name].md`
4. Initialize from `beaver-builder/docs/tasks/TASK-TEMPLATE.md`
5. Update main project-progress.md with reference

**Scope Check:** If the task seems large (>1 day, multiple components), suggest creating a PROJECT instead.

**Then say:** "Task '[task-name]' created! Use /list-tasks to see all active tasks."
