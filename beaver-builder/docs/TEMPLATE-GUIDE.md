# Template Selection Guide

**Purpose:** Help you choose the right template tier for your documentation needs.

**Philosophy:** Different situations require different levels of detail. Use the smallest template that serves your needs - you can always upgrade later.

---

## 📊 Template Tiers Overview

### When to Use Which Template

#### Project Overview

| Tier          | Lines | Time   | Use When                                     | File                           |
| ------------- | ----- | ------ | -------------------------------------------- | ------------------------------ |
| Quick         | 100   | 5 min  | Quick starts, simple projects, minimal setup | `project-overview-quick.md`    |
| Standard      | 250   | 15 min | Most projects (RECOMMENDED)                  | `project-overview-standard.md` |
| Comprehensive | 490   | 30 min | Enterprise, complex multi-team systems       | `project-overview-template.md` |

#### User Stories

| Tier          | Lines | Time   | Use When                                                 | File                     |
| ------------- | ----- | ------ | -------------------------------------------------------- | ------------------------ |
| Minimal       | 75    | 5 min  | Bug fixes, small features, obvious requirements          | `USER-STORY-MINIMAL.md`  |
| Standard      | 180   | 15 min | Typical features (RECOMMENDED)                           | `USER-STORY-STANDARD.md` |
| Comprehensive | 378   | 30 min | Complex features with UX, security, performance concerns | `USER-STORY-TEMPLATE.md` |

#### Architecture Decision Records

| Tier     | Lines | Time   | Use When                                        | File              |
| -------- | ----- | ------ | ----------------------------------------------- | ----------------- |
| Minimal  | 100   | 10 min | Tactical decisions, small trade-offs            | `ADR-MINIMAL.md`  |
| Standard | 235   | 20 min | Important architectural decisions (RECOMMENDED) | `ADR-TEMPLATE.md` |

#### Projects

| Tier     | Lines | Time   | Use When                             | File                  |
| -------- | ----- | ------ | ------------------------------------ | --------------------- |
| Minimal  | 120   | 10 min | Small projects, 1-2 week efforts     | `PROJECT-MINIMAL.md`  |
| Standard | 304   | 20 min | Multi-week initiatives (RECOMMENDED) | `PROJECT-TEMPLATE.md` |

---

## 🎯 Decision Tree

### Creating project-overview.md?

**Start here:** What's your situation?

```
Are you setting up for the first time?
├─ YES → Is this a quick start session?
│  ├─ YES → Use QUICK (5 min)
│  └─ NO → Is this an enterprise/complex system?
│     ├─ YES → Use COMPREHENSIVE (30 min)
│     └─ NO → Use STANDARD (15 min) ⭐ RECOMMENDED
└─ NO → Are you updating existing docs?
   └─ Match the tier you're already using
```

**Quick wins:**

- 🚀 First time? Start with **QUICK**, upgrade later if needed
- 📋 Most projects? Use **STANDARD** - it's the sweet spot
- 🏆 Enterprise with multiple teams? Use **COMPREHENSIVE**

---

### Creating user story?

**Start here:** What are you building?

```
What's the complexity?
├─ Bug fix or tiny feature → MINIMAL (5 min)
├─ Normal feature development → STANDARD (15 min) ⭐ RECOMMENDED
└─ Complex feature with many concerns → COMPREHENSIVE (30 min)
```

**Ask yourself:**

- Does this affect security, UX, or performance? → **STANDARD** or **COMPREHENSIVE**
- Is this a 1-line code change? → **MINIMAL**
- Everything else? → **STANDARD**

**Examples:**

- "Fix typo in button text" → **MINIMAL**
- "Add user profile editing" → **STANDARD**
- "Build real-time chat with encryption" → **COMPREHENSIVE**

---

### Creating ADR?

**Start here:** What's the decision scope?

```
What are you deciding?
├─ Library/tool choice → MINIMAL (10 min)
├─ Small architectural decision → MINIMAL (10 min)
└─ Major architectural decision → STANDARD (20 min) ⭐ RECOMMENDED
```

**Ask yourself:**

- Will this decision affect multiple systems/teams? → **STANDARD**
- Is this just picking between two similar libraries? → **MINIMAL**
- Will this be hard to change later? → **STANDARD**

**Examples:**

- "Choose between lodash and ramda" → **MINIMAL**
- "Choose between PostgreSQL and MongoDB" → **STANDARD**
- "Choose authentication strategy for platform" → **STANDARD**

---

### Creating project tracking?

**Start here:** How long is the project?

```
What's the timeline?
├─ < 2 weeks → MINIMAL (10 min)
└─ > 2 weeks → STANDARD (20 min) ⭐ RECOMMENDED
```

**Ask yourself:**

- Single developer, single focus? → **MINIMAL**
- Multiple people or phases? → **STANDARD**
- Proof of concept? → **MINIMAL**

**Examples:**

- "Add dark mode toggle" → **MINIMAL**
- "Build admin dashboard" → **STANDARD**
- "MVP launch" → **STANDARD**

---

## 💡 Guiding Principles

### Start Small, Upgrade When Needed

**Don't over-document early:**

- Use **QUICK** or **MINIMAL** templates when starting
- Upgrade to **STANDARD** as complexity becomes clear
- Reserve **COMPREHENSIVE** for truly complex situations

**Signs you need to upgrade:**

- Template feels too constraining
- Missing important information
- Stakeholders asking questions not covered
- Complexity higher than initially thought

### Match Template to Effort

**5-minute rule:**

- If feature takes 1 hour to build, don't spend 30 minutes documenting
- Use **MINIMAL** templates for small work

**Proportional documentation:**

- 1-day task → **MINIMAL** template (5-10 min)
- 1-week task → **STANDARD** template (15-20 min)
- 1-month project → **COMPREHENSIVE** template (30 min+)

### When in Doubt, Use Standard

**STANDARD templates are the default choice:**

- Balanced detail without overwhelm
- Covers 80% of use cases
- Easy to fill, professional results
- Recommended for most situations

**Only deviate if:**

- Very simple (use **MINIMAL/QUICK**)
- Very complex (use **COMPREHENSIVE**)

---

## 🎨 Template Customization

### You Can Customize Templates

**It's OK to:**

- Remove sections that don't apply
- Add project-specific sections
- Adjust level of detail per section
- Merge sections if it makes sense

**Examples:**

- Mobile app project? Add "App Store Requirements" section
- ML project? Add "Model Performance Metrics" section
- Open source? Add "Contribution Guidelines" section

### But Preserve Core Structure

**Don't remove:**

- Headers and metadata (Status, Priority, Date, etc.)
- Acceptance criteria (for user stories)
- Decision rationale (for ADRs)
- Success criteria (for projects)

**Why?** These sections enable:

- Consistent communication across team
- Easy scanning and navigation
- Searchability and tooling integration

---

## 📚 Examples for Reference

### See Real Examples

Browse complete examples to understand quality standards:

- **[React SaaS Example](./examples/react-nodejs-saas/)** - Web application
- **[Python ML Example](./examples/python-ml-api/)** - ML/data science
- **[Mobile App Example](./examples/mobile-app/)** - Mobile development

**What to look for:**

- How sections are filled (not just placeholders)
- Level of detail appropriate to context
- How decisions are documented
- How progress is tracked

### Compare Tiers Side-by-Side

**Try this exercise:**

1. Read a **MINIMAL** template for user stories
2. Read a **STANDARD** template for user stories
3. Read a **COMPREHENSIVE** template for user stories
4. Notice: What's added at each tier? What complexity does it address?

**Result:** You'll develop intuition for which tier fits which situation.

---

## ⚙️ Template Workflow Recommendations

### New Project Setup

**Day 1: Quick Start**

```
1. Run `/quickstart` command
2. Use project-overview-QUICK.md
3. Get working immediately
```

**Week 1: Standard Documentation**

```
1. Upgrade to project-overview-STANDARD.md
2. Create user stories with USER-STORY-STANDARD.md
3. Document key decisions with ADR-MINIMAL.md
```

**Month 1: Comprehensive as Needed**

```
1. Upgrade project overview if complexity warrants
2. Use USER-STORY-COMPREHENSIVE for complex features
3. Use ADR-TEMPLATE for major architectural decisions
```

### Existing Project Onboarding

**First Session: Minimal Documentation**

```
1. Run `/onboard-existing`
2. Auto-generated project-overview (usually STANDARD tier)
3. Create initial stories with MINIMAL templates
```

**Ongoing: Match Effort to Template**

```
1. Bug fixes → USER-STORY-MINIMAL
2. Features → USER-STORY-STANDARD
3. Major initiatives → PROJECT-STANDARD
4. Tech decisions → ADR-MINIMAL or ADR-TEMPLATE
```

---

## 🔍 Common Scenarios

### Scenario 1: "I'm new to beaver-builder"

**Recommendation:** Start with **QUICK** and **MINIMAL** templates

**Why?**

- Lower barrier to entry
- Learn the system without overwhelm
- Upgrade as you become comfortable

**Path:**

1. `/quickstart` → creates project-overview-QUICK
2. First few stories → USER-STORY-MINIMAL
3. As you learn → upgrade to STANDARD templates

---

### Scenario 2: "I'm on a tight deadline"

**Recommendation:** Use **MINIMAL** templates, upgrade later

**Why?**

- 5-10 minute documentation per item
- Capture essentials, skip nice-to-haves
- Can upgrade documentation after deadline

**Important:** Still document! Even minimal docs prevent knowledge loss.

---

### Scenario 3: "I'm building MVP"

**Recommendation:** Use **STANDARD** templates

**Why?**

- Need good documentation for launch
- Not so much that it slows you down
- Professional quality for stakeholders

**Templates:**

- Project: PROJECT-STANDARD
- Features: USER-STORY-STANDARD
- Tech decisions: ADR-MINIMAL (most) or ADR-TEMPLATE (critical ones)

---

### Scenario 4: "I'm in a large enterprise"

**Recommendation:** Use **COMPREHENSIVE** or **STANDARD** templates

**Why?**

- Multiple teams need shared understanding
- Compliance and audit requirements
- Complex integrations and dependencies

**Templates:**

- Project: project-overview-COMPREHENSIVE
- Features: USER-STORY-STANDARD or COMPREHENSIVE
- Architecture: ADR-TEMPLATE (always)
- Projects: PROJECT-STANDARD

---

### Scenario 5: "I'm documenting a spike/POC"

**Recommendation:** Use **MINIMAL** templates

**Why?**

- Temporary/exploratory work
- Speed over completeness
- May throw away results

**Templates:**

- Project: PROJECT-MINIMAL
- Experiments: USER-STORY-MINIMAL
- Findings: ADR-MINIMAL

**Note:** If POC succeeds and goes to production, upgrade docs to STANDARD.

---

## 📈 Template Quality Checklist

### Good Documentation (Any Tier)

**All documentation should be:**

- [ ] **Specific** - No vague placeholders like "[Fill this in]"
- [ ] **Actionable** - Clear what to do next
- [ ] **Testable** - Acceptance criteria can be verified
- [ ] **Maintainable** - Easy to update as things change

**Common mistakes:**

- ❌ Leaving placeholder text
- ❌ Being too vague ("Improve performance")
- ❌ Missing success criteria
- ❌ No links to related docs

### Minimal Template Quality

**A good MINIMAL doc has:**

- [ ] Core information filled (no placeholders)
- [ ] 3-5 clear acceptance criteria
- [ ] Basic context (1-2 sentences)
- [ ] Next steps identified

**Time to fill:** 5-10 minutes max

---

### Standard Template Quality

**A good STANDARD doc has:**

- [ ] All sections filled (or marked "N/A" if not applicable)
- [ ] Detailed acceptance criteria with Given/When/Then
- [ ] Context explaining "why" not just "what"
- [ ] Dependencies and risks identified
- [ ] Testing approach documented

**Time to fill:** 15-20 minutes max

---

### Comprehensive Template Quality

**A good COMPREHENSIVE doc has:**

- [ ] Every section thoroughly filled
- [ ] Multiple perspectives (UX, security, performance, etc.)
- [ ] Detailed trade-off analysis
- [ ] Comprehensive test strategy
- [ ] Monitoring and observability plans
- [ ] Rollout and rollback strategies

**Time to fill:** 30+ minutes

---

## 🎓 Learning Path

### Week 1: Use QUICK and MINIMAL

**Goal:** Get comfortable with the system

**Activities:**

- Run `/quickstart`
- Create 3-5 user stories with MINIMAL template
- Document 1-2 decisions with ADR-MINIMAL
- Review examples folder

**Outcome:** Basic proficiency, low friction

---

### Week 2-4: Upgrade to STANDARD

**Goal:** Professional documentation habits

**Activities:**

- Upgrade project-overview to STANDARD
- Use USER-STORY-STANDARD for new features
- Use ADR-TEMPLATE for important decisions
- Track project with PROJECT-STANDARD

**Outcome:** High-quality, maintainable documentation

---

### Month 2+: Use Right Tier for Each Situation

**Goal:** Template selection becomes intuitive

**Activities:**

- Quick tasks? → MINIMAL
- Standard work? → STANDARD
- Complex initiatives? → COMPREHENSIVE
- Mix tiers based on needs

**Outcome:** Expert-level documentation practice

---

## 🔗 Related Resources

### Documentation

- **[FAQ](./FAQ.md)** - Common questions about beaver-builder
- **[Examples](./examples/)** - Real project examples at different tiers
- **[Troubleshooting](./TROUBLESHOOTING.md)** - Solve common issues

### Commands

- **`/quickstart`** - Fast onboarding (5-10 min)
- **`/onboard-existing`** - Deep codebase analysis (30-45 min)
- **`/onboard-new`** - New project discovery (20-30 min)
- **`/verify-onboarding`** - Check documentation completeness

### Templates

- **Project Context:** `docs/project-context/`
- **User Stories:** `docs/requirements/`
- **Architecture Decisions:** `docs/architecture/`
- **Projects:** `docs/projects/`

---

## 💬 Quick Tips

### Do's ✅

- ✅ Start with smaller templates, upgrade as needed
- ✅ Use STANDARD as default for most work
- ✅ Remove sections that don't apply (mark "N/A")
- ✅ Add custom sections for your domain
- ✅ Fill templates completely (no placeholders)
- ✅ Link related documents together
- ✅ Review examples before creating your own

### Don'ts ❌

- ❌ Don't use COMPREHENSIVE by default (overkill)
- ❌ Don't leave placeholder text
- ❌ Don't skip documentation because it's "too much work" (use MINIMAL instead)
- ❌ Don't copy-paste without customizing
- ❌ Don't document just to document (purpose matters)
- ❌ Don't forget to update docs as project evolves

---

## 🎯 Summary

**The Right Template is the One You'll Actually Fill Out**

**Remember:**

1. **Quick/Minimal** = Speed over detail (5-10 min)
2. **Standard** = Sweet spot for most work (15-20 min) ⭐
3. **Comprehensive** = Complex situations only (30+ min)

**When in doubt:**

- First time? → **QUICK** or **MINIMAL**
- Most situations? → **STANDARD**
- Complex/enterprise? → **COMPREHENSIVE**

**You can always upgrade later.** Start small, expand as needed.

---

**Ready to start?** Check out the [examples](./examples/) folder for real-world usage!
