# Validation Framework

Validation philosophy, checkpoints, and quality metrics for beaver-builder onboarding and documentation.

## Philosophy

**Core Principle:** Silent failures are the enemy of adoption.

Beaver-builder's validation system ensures that:

1. **Onboarding completes successfully** - No half-finished setups
2. **Context is actionable** - Documentation has real content, not just placeholders
3. **Users get feedback** - Clear success/failure indicators at every checkpoint
4. **Recovery is guided** - Failed validations provide actionable next steps

## Validation Levels

### Level 1: Essential (Required)

Files that MUST exist for beaver-builder to function:

- `docs/project-context/project-overview.md` (>500 bytes, real content)
- `docs/project-context/project-progress.md` (>200 bytes, real content)

**Why:** These are the minimum files agents need to understand your project.

**Validation:** `/verify-onboarding` checks for existence and minimum content.

### Level 2: Standard (Recommended)

Complete project context for effective agent coordination:

- Project overview with tech stack, architecture, team size
- Active progress tracking with current milestones
- At least 1 ADR documenting a key architectural decision
- At least 1 user story or requirement documented

**Why:** Provides enough context for agents to give specialized, relevant help.

**Validation:** Manual review or future `/verify-standard` command.

### Level 3: Comprehensive (Optional)

Full documentation ecosystem for complex projects:

- Complete architecture documentation (ADRs for all major decisions)
- Comprehensive requirements (user stories with acceptance criteria)
- Active project tracking with milestones and risks
- Meeting notes and research documentation

**Why:** Enterprise and multi-team projects need deeper documentation.

**Validation:** Team review and documentation audits.

## Validation Checkpoints

### Checkpoint 1: Onboarding Start

**Trigger:** User runs `/quickstart`, `/onboard-existing`, or `/onboard-new`

**Validation:**

- Verify `beaver-builder/` folder exists in project
- Check for write permissions in `docs/` directory
- Confirm no conflicting documentation structure

**On Failure:** Provide setup instructions and permissions help.

### Checkpoint 2: Onboarding Progress

**Trigger:** During multi-phase onboarding (onboard-existing, onboard-new)

**Validation:**

- Phase 1 completes: Tech stack detected
- Phase 2 completes: Codebase structure analyzed
- Phase 3 completes: Documentation files created
- Phase 4 completes: Agent personas initialized

**On Failure:** Save progress, allow resume from last successful phase.

### Checkpoint 3: Onboarding Completion

**Trigger:** End of any onboarding command

**Validation:**

- All required files created
- Files contain real content (not empty or all placeholders)
- Tech stack identified (not "[Unknown]")
- At least one work item captured

**On Failure:** Mark as incomplete, provide specific gaps and next steps.

### Checkpoint 4: First Agent Interaction

**Trigger:** User runs `/orchestrate` or any agent command

**Validation:**

- Check if `project-overview.md` exists and is readable
- Verify agents can load project context
- Confirm no YAML syntax errors in persona files

**On Failure:** Offer to run `/quickstart` or provide troubleshooting guide.

### Checkpoint 5: Documentation Quality

**Trigger:** Periodic (user-initiated with `/verify-onboarding`)

**Validation:**

- Check for excessive placeholder warnings ("⚠️ QUICK START")
- Verify timestamps are recent (documentation not stale)
- Confirm progress tracking is active (items in "In Progress")

**On Failure:** Recommend running `/onboard-existing` for refresh.

## Quality Metrics

### Completeness Score

**Formula:** (Completed checks / Total checks) × 100

**Tiers:**

- **Quick Start (30-50%):** Minimal setup, essential files only
- **Standard (60-80%):** Good project context, active documentation
- **Comprehensive (85-100%):** Full documentation ecosystem

**Display:**

```
Completeness score: 65% (Standard)

✅ Essential files: 2/2
✅ Content quality: Good
⚠️ Architecture docs: 0 ADRs (recommended: 3+)
⚠️ Requirements docs: 0 user stories (recommended: 5+)
```

### Content Quality Indicators

**Good Quality:**

- Project name is specific (not "[Project Name]")
- Tech stack has versions (e.g., "React 18.2.0" not "React")
- Architecture decisions explain "why" not just "what"
- User stories have testable acceptance criteria
- Progress items have dates and owners

**Poor Quality:**

- Multiple placeholder warnings ("⚠️ QUICK START")
- Generic descriptions ("This is a web application")
- Missing critical sections (no tech stack, no team info)
- Stale timestamps (>60 days old)

### Actionability Score

**Criteria:**

1. Can agents understand project domain? (Yes/No)
2. Can agents identify current tech stack? (Yes/No)
3. Can agents determine what's in progress? (Yes/No)
4. Can agents access architectural context? (Yes/No)

**Score:** Count of "Yes" answers (0-4)

**Interpretation:**

- **0-1:** Not actionable - run full onboarding
- **2-3:** Partially actionable - fill critical gaps
- **4:** Fully actionable - ready for agent work

## Validation Commands

### `/verify-onboarding`

**Purpose:** Check essential setup completion

**Checks:**

- File existence (project-overview.md, project-progress.md)
- Minimum file sizes (>500 bytes, >200 bytes)
- Real content vs placeholders

**Output:** PASSED or INCOMPLETE with specific gaps

**Frequency:** After onboarding, when troubleshooting, monthly maintenance

### `/quickstart` (Built-in Validation)

**Purpose:** Fast setup with minimal validation

**Checks:**

- Can create documentation files?
- User provided essential answers?
- Basic project info captured?

**Output:** Success message with created files list

**Frequency:** First-time setup, trial runs

### Future: `/verify-standard` (Planned)

**Purpose:** Check recommended documentation completeness

**Checks:**

- Level 2 validation (standard tier)
- At least 1 ADR exists
- At least 1 requirement documented
- Progress tracking is active

**Output:** Detailed completeness report with recommendations

## Error Recovery

### Common Failure Modes

**1. Empty Files Created**

**Symptom:** Files exist but contain only template headers

**Cause:** Onboarding interrupted, LLM timeout, network failure

**Recovery:**

```bash
# Option A: Re-run onboarding
/onboard-existing  # or /onboard-new

# Option B: Manual fill
# Use templates in docs/project-context/
# See examples in docs/examples/
```

**2. Placeholder Hell**

**Symptom:** Files full of "[Fill this]" and "⚠️ QUICK START" warnings

**Cause:** Used `/quickstart` but never completed deep onboarding

**Recovery:**

```bash
# Run comprehensive onboarding
/onboard-existing  # 30-45 min, fills all placeholders

# Or fill incrementally
# Edit project-overview.md section by section
# See examples/react-nodejs-saas/ for reference
```

**3. Stale Context**

**Symptom:** Agents reference old tech stack or removed features

**Cause:** Project evolved since last onboarding

**Recovery:**

```bash
# Refresh from current codebase
/onboard-existing  # Re-analyzes and updates all docs

# Or update manually
# Edit docs/project-context/project-overview.md
# Update tech stack and architecture sections
```

**4. Missing Files**

**Symptom:** `/verify-onboarding` reports missing essential files

**Cause:** Onboarding never run, files deleted, wrong directory

**Recovery:**

```bash
# Quick setup
/quickstart  # 5-10 min, creates essential files

# Verify fix
/verify-onboarding  # Should now PASS
```

## Validation Best Practices

### For Users

1. **Run validation after onboarding** - Always run `/verify-onboarding` after setup
2. **Don't skip quick start** - Even if you plan deep onboarding, `/quickstart` gets you working immediately
3. **Regular maintenance** - Run `/verify-onboarding` monthly to catch staleness
4. **Update after major changes** - Tech stack change? Run `/onboard-existing` to refresh context

### For Agents

1. **Check before acting** - Always verify project context exists before engaging
2. **Fail gracefully** - If context is missing, offer onboarding, don't proceed with generic advice
3. **Update after work** - After completing work, update `project-progress.md` with outcomes
4. **Link documentation** - Reference ADRs, user stories, and decisions in progress updates

### For Onboarding Commands

1. **Progress indicators** - Show user what phase is running and estimated time remaining
2. **Checkpoint confirmations** - Ask before long phases (20+ min)
3. **Save progress** - If interrupted, enable resume from last checkpoint
4. **Validate outputs** - Before marking complete, verify files have real content

## Measuring Success

### Adoption Metrics

Track these to measure validation effectiveness:

- **Onboarding completion rate:** % of users who finish setup
- **Time to first agent interaction:** Minutes from install to first productive use
- **Validation failure rate:** % of setups that fail `/verify-onboarding`
- **Recovery success rate:** % of failures resolved by following recovery steps

### Quality Metrics

Track these to measure documentation quality:

- **Average completeness score:** Across all active projects
- **Placeholder density:** Avg "⚠️ QUICK START" warnings per project
- **Staleness rate:** % of projects with >60 day old docs
- **Actionability score:** Avg score (0-4) across all projects

### Target Benchmarks

**Initial Release:**

- Onboarding completion: >60%
- Time to first value: <15 minutes
- Validation failure: <40%
- Recovery success: >70%

**Mature Product:**

- Onboarding completion: >85%
- Time to first value: <10 minutes
- Validation failure: <20%
- Recovery success: >90%

## Future Enhancements

### Planned Improvements

1. **Automated validation scoring** - `/verify-standard` and `/verify-comprehensive` commands
2. **Progressive enhancement** - Guide users from Quick Start → Standard → Comprehensive
3. **Health dashboard** - Visual report of documentation completeness and freshness
4. **Validation hooks** - Auto-validate before agent work, warn on low scores
5. **Smart recovery** - AI-guided gap filling based on failure analysis

### Research Areas

- **Optimal checkpoint granularity** - How many validation points are too many?
- **User interruption patterns** - When do users abandon onboarding?
- **Quality vs speed trade-offs** - Quick start vs comprehensive: what ratio?
- **Validation fatigue** - How often should validation run without annoying users?

---

**Remember:** Validation exists to improve user experience, not create busywork. Every check should have a clear purpose and actionable output.
