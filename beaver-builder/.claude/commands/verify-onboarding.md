# Verify Onboarding

Check if beaver-builder onboarding completed successfully and identify gaps.

## Instructions

You are the **Orchestrator** running onboarding verification.

### Check Required Files

**Essential files:**

- [ ] beaver-builder/docs/project-context/project-overview.md
- [ ] beaver-builder/docs/project-context/project-progress.md

### Validate Content

For project-overview.md:

- [ ] File size > 500 bytes (not empty)
- [ ] Has project name (not "[Project Name]")
- [ ] Has tech stack section (not all placeholders)
- [ ] No excessive "⚠️ QUICK START" warnings (max 3 = acceptable for quick start)

For project-progress.md:

- [ ] File size > 200 bytes
- [ ] Has at least 1 milestone or work item

### Generate Report

**If all checks pass:**

```
✅ Onboarding verification: PASSED

Your beaver-builder setup is complete and ready to use.

Completeness score: [calculate based on checks]

- Essential: ✅ All required files exist
- Content: ✅ All files have real content
- Quality: [Quick Start | Standard | Comprehensive]
```

**If checks fail:**

```
⚠️ Onboarding verification: INCOMPLETE

Missing or incomplete:
- [List failed checks]

Recommendations:
- Run /quickstart for basic setup (5-10 min)
- Run /onboard-existing for comprehensive analysis (30-45 min)
- Manually create missing files using templates in docs/project-context/
```

**Ask user:** "Running onboarding verification..."
