# Beaver-Builder Examples

> **Generate your own examples by running `/onboard-new` or `/onboard-existing`**

This directory previously contained hand-crafted example projects, but they have been removed because:

1. **They bloated the repository** (287KB)
2. **They set unrealistic expectations** (hand-crafted examples included post-implementation details that beaver-builder cannot generate)
3. **Templates are better** (use the templates in `docs/` folders instead)

---

## How to See Real Examples

### Option 1: Generate a New Project Example

Run `/onboard-new` to create documentation for a new project:

```bash
# Start interactive onboarding
/onboard-new

# Answer the discovery questions (20-30 min)
# Result: Complete project documentation in beaver-builder/docs/
```

**You'll get:**

- `project-context/project-overview.md` - Complete project context
- `project-context/project-progress.md` - Progress tracking
- `requirements/US-001-*.md` - First user story
- `architecture/ADR-001-*.md` - Architectural decisions (3+ ADRs)
- `projects/mvp-v1/progress.md` - MVP roadmap

### Option 2: Analyze an Existing Project

Run `/onboard-existing` for an existing codebase:

```bash
# Navigate to your project directory
cd /path/to/your/project

# Copy beaver-builder
cp -r /path/to/beaver-builder .

# Start onboarding
/onboard-existing

# Result: Reverse-engineered documentation from your codebase
```

---

## What Quality to Expect

Beaver-builder generates **planning-stage documentation** that is:

✅ **Complete:** No placeholders like "[Add details here]"
✅ **Concrete:** Real tech stack choices, specific versions
✅ **Actionable:** Ready to start implementation immediately
✅ **Interconnected:** Files link to each other
✅ **Appropriate:** Complexity matches project size (quick/standard/comprehensive templates)

### What Beaver-Builder Does NOT Generate

Beaver-builder creates pre-implementation planning docs. It cannot generate:

❌ Post-implementation details (test coverage %, PR numbers, completion dates)
❌ Business metrics (MRR, conversion rates, user personas)
❌ Actual test code (it documents what to test, not the tests themselves)
❌ Implementation learnings (what worked/didn't work)

These are added manually as the project progresses.

---

## Reference the Templates Instead

Instead of looking for examples, use the **templates** which show structure:

| Template Type    | Location                                     | Use Case                       |
| ---------------- | -------------------------------------------- | ------------------------------ |
| Project Overview | `docs/project-context/project-overview-*.md` | Quick/Standard/Comprehensive   |
| User Story       | `docs/requirements/USER-STORY-*.md`          | Minimal/Standard/Comprehensive |
| ADR              | `docs/architecture/ADR-*.md`                 | Minimal/Template               |
| Project          | `docs/projects/PROJECT-*.md`                 | Minimal/Template               |
| Task             | `docs/tasks/TASK-TEMPLATE.md`                | Simple tasks                   |

**Template Guide:** See `docs/TEMPLATE-GUIDE.md` for choosing the right template tier.

---

## Example Comparison: Simple vs Complex Projects

### Simple Project (TodoMaster - solo dev, 1-2 weeks)

Generated with `/onboard-new`:

- **project-overview.md:** 255 lines (quick template)
- **US-001:** 159 lines with 7 acceptance criteria (minimal template)
- **ADR-001:** 148 lines evaluating 3 options (minimal template)
- **Total:** ~1,330 lines, 7 files

**Appropriate for:** Solo projects, MVPs, proof-of-concepts

### Complex Project (B2B SaaS - team of 5, 3-6 months)

Generated with `/onboard-new` using comprehensive templates:

- **project-overview.md:** ~500 lines (comprehensive template)
- **US-001:** ~600 lines with 10 AC + 8 edge cases + full tech details
- **ADR-001:** ~300 lines evaluating 4 options with security/compliance
- **Total:** ~5,000 lines, 15+ files

**Appropriate for:** Enterprise projects, startups, funded products

---

## Quality Checklist

Before considering beaver-builder documentation "done":

- [ ] **No placeholders** - All "[Fill this]" sections completed
- [ ] **Concrete tech stack** - Specific versions (React 18.2, not "React")
- [ ] **ADRs explain "why"** - Not just what was chosen, but rationale
- [ ] **User stories have AC** - 5+ acceptance criteria in Given/When/Then format
- [ ] **Files link together** - Cross-references work correctly
- [ ] **Appropriate template tier** - Complexity matches project size

Run `/verify-onboarding` to check these automatically.

---

## Next Steps

1. **Run `/onboard-new`** for a test project to see beaver-builder in action
2. **Review the generated docs** to understand quality and structure
3. **Use templates** from `docs/` folders as starting points
4. **Reference TEMPLATE-GUIDE.md** for choosing appropriate template tiers

---

## Why Were Hand-Crafted Examples Removed?

**Transparency:** The 3 previous examples (SubscriptFlow, SentimentPro, FitTrack Pro) were hand-crafted, not generated by beaver-builder. They:

1. Included post-implementation details beaver-builder cannot generate
2. Set unrealistic expectations for AI-generated output
3. Added 287KB of bloat to the repository
4. Were less useful than actual templates

**Better approach:** Generate your own examples using `/onboard-new` to see authentic beaver-builder output.

---

**Last Updated:** 2025-11-18
**Recommendation:** Run `/onboard-new` for a simple project to see real beaver-builder documentation quality.
