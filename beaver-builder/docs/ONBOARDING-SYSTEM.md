# Onboarding System Design

**Created:** 2025-11-18
**Status:** Implemented
**Purpose:** Comprehensive project context gathering for both new and existing projects

---

## 🎯 Problem Statement

Previously, beaver-builder had no formal onboarding process. When first interacting with a project, the orchestrator would:

1. Try to read `project-progress.md`
2. Create folder structure if missing
3. Hope the user provides context organically

**Issues with this approach:**

- **Existing projects:** No systematic codebase analysis, tech stack discovery, or architecture mapping
- **New projects:** No structured requirements gathering, no discovery interview, no comprehensive planning
- **Lost opportunity:** The first interaction is the perfect time to build a complete knowledge base
- **Inconsistent context:** Agents would work with incomplete or missing project understanding

---

## 💡 Solution: Dual Onboarding Flows

We've implemented two comprehensive onboarding slash commands:

### 1. `/onboard-existing` - For Existing Projects

**Purpose:** Deep codebase analysis and context creation

**Duration:** ~30-45 minutes

**What it does:**

#### Phase 1: Initial Analysis (10 min)

- Detects tech stack (package.json, requirements.txt, go.mod, etc.)
- Maps folder structure (src/, lib/, components/, etc.)
- Reviews existing documentation (README, ADRs, API docs)
- Identifies configuration files and entry points

#### Phase 2: Multi-Agent Deep Dive (20 min)

- **Winston (Architect):** Analyzes architecture patterns, tech decisions, component dependencies
- **Amelia (Developer):** Reviews code quality, conventions, business logic, API endpoints
- **Murat (Test Architect):** Examines test infrastructure, coverage, strategies
- **Paige (Tech Writer):** Inventories documentation, identifies gaps

#### Phase 3: Context Creation (15 min)

Creates comprehensive documentation:

- `project-overview.md` - Complete project understanding
- `project-progress.md` - Current state and recent work
- `tech-stack.md` - Technologies and tools
- `ADR-001-initial-architecture.md` - Existing architectural decisions
- `system-architecture.md` - High-level design

#### Phase 4: Summary & Next Steps (5 min)

- Analysis summary report
- Recommended improvements
- Quick reference card
- Suggested first projects

**Result:** Complete knowledge base that all agents can reference

---

### 2. `/onboard-new` - For New Projects

**Purpose:** Structured discovery interview and project setup

**Duration:** ~20-30 minutes

**What it does:**

#### Phase 1: Project Discovery Interview (15-20 min)

**Systematic questioning:**

1. **Project Vision & Goals**
   - Project name and purpose
   - Problem being solved
   - Target users
   - Success criteria and metrics

2. **Functional Requirements**
   - Core features (must-have vs nice-to-have)
   - User workflows
   - Integrations
   - Scope boundaries

3. **Technical Context**
   - Tech stack preferences or constraints
   - Platform (web/mobile/API/desktop)
   - Non-functional requirements (performance, security, compliance)
   - Infrastructure preferences

4. **Team & Process**
   - Team size and roles
   - Development methodology (Agile, Kanban, etc.)
   - Timeline and deadlines
   - Stakeholders

5. **Constraints & Risks**
   - Budget constraints
   - Technical constraints (legacy systems, vendors)
   - Identified risks
   - Dependencies

#### Phase 2: Architecture & Technical Planning (15 min)

**Winston + multi-agent collaboration:**

- Tech stack recommendations (with rationale)
- Initial architecture design
- Key architectural decisions
- Create initial ADRs for major choices

#### Phase 3: Project Setup (10 min)

**Creates documentation:**

- `project-overview.md` - Vision, goals, tech stack, architecture
- `project-progress.md` - Initialized with discovery milestone
- `US-001-[first-feature].md` - First user story
- `ADR-001-tech-stack-choice.md` - Stack decision
- `ADR-002-database-choice.md` - Database decision
- `ADR-003-api-design-approach.md` - API approach
- First project in `docs/projects/` for v1 MVP

#### Phase 4: Development Roadmap (10 min)

**Prioritized roadmap:**

- Immediate next steps (Week 1)
- Short-term (Weeks 2-4)
- Medium-term (Months 2-3)
- Long-term (Months 4+)

#### Phase 5: Summary & Kickoff (5 min)

- Project overview recap
- Documentation created list
- Immediate next steps
- Recommended slash commands

**Result:** Fully planned project ready for implementation

---

## 🔄 Integration with Orchestrator

### First Interaction Behavior

**Before onboarding system:**

```yaml
ON FIRST INTERACTION: Locate and read project-progress.md.
  If it doesn't exist, create folder structure and initialize from templates.
```

**After onboarding system:**

```yaml
ON FIRST INTERACTION:
  Check if project-overview.md exists.
  If YES, read it for context, then read project-progress.md.
  If NO, offer onboarding:
    (1) For EXISTING projects - offer '/onboard-existing'
    (2) For NEW projects - offer '/onboard-new'
  If user declines, create folder structure and initialize from templates.
```

### Detection Strategy

**project-overview.md as signal:**

- If exists → Project is already onboarded, read context
- If missing → Project needs onboarding, offer options

**Why project-overview.md?**

- More comprehensive than project-progress.md
- Contains tech stack, architecture, vision
- Only created during proper onboarding
- Clear indicator of setup completion

---

## 📁 Files Created

### New Slash Commands

1. **`beaver-builder/.claude/commands/onboard-existing.md`**
   - 4-phase workflow for existing project analysis
   - Multi-agent orchestration instructions
   - Comprehensive analysis checklist
   - Documentation creation guide

2. **`beaver-builder/.claude/commands/onboard-new.md`**
   - 5-phase workflow for new project setup
   - Structured interview questions
   - Architecture planning process
   - Complete documentation initialization

### New Templates

3. **`beaver-builder/docs/project-context/project-overview-template.md`**
   - 400+ line comprehensive template
   - Project vision and goals
   - Tech stack and architecture
   - Core features and roadmap
   - Team and stakeholders
   - Development workflow
   - Key decisions and technical debt

### Updated Files

4. **`beaver-builder/personas/orchestrator/persona.yaml`**
   - Updated `ON FIRST INTERACTION` critical action
   - Now offers onboarding when project-overview.md is missing

5. **`beaver-builder/.claude/commands/README.md`**
   - Added "Onboarding Commands" section
   - Updated command count (15 → 17)
   - Added onboarding to categories
   - Added setup flows to combining commands
   - Updated selection guide

6. **`beaver-builder/README.md`**
   - Added onboarding to Quick Start
   - Highlighted first-time setup step
   - Updated command count

---

## 🎯 Usage Patterns

### For Users Installing Beaver-Builder

**Existing Project:**

```
1. Copy beaver-builder/ to project
2. Run /onboard-existing
3. Wait 30-45 minutes for analysis
4. Review generated documentation
5. Start using /orchestrate, /create-project, etc.
```

**New Project:**

```
1. Copy beaver-builder/ to project root
2. Run /onboard-new
3. Answer discovery questions (~15 min)
4. Review architecture recommendations
5. Approve setup and documentation
6. Start implementing with /implement
```

### For Orchestrator Behavior

**First interaction without project-overview.md:**

```
Orchestrator: "I notice this project doesn't have beaver-builder context yet.
Would you like to:

1. /onboard-existing - Deep analysis of your existing codebase (~30-45 min)
2. /onboard-new - Discovery interview for new project (~20-30 min)
3. Skip onboarding and start with basic setup

Which option works best for you?"
```

**First interaction with project-overview.md:**

```
Orchestrator reads project-overview.md
Orchestrator reads project-progress.md
Orchestrator: "I'm familiar with [Project Name] - [brief context from overview].
How can I help you today?"
```

---

## 🔍 Technical Design Decisions

### Why Two Separate Commands?

**Could have been one `/onboard` command**, but separated because:

1. **Different workflows:** Analysis vs interview are fundamentally different
2. **Different durations:** 30-45 min vs 20-30 min
3. **Different agents:** Multi-agent parallel vs orchestrator-led
4. **User clarity:** Clear choice between existing and new
5. **Flexibility:** Can skip one if partially applicable

### Why 30-45 Minutes?

**Existing project analysis is thorough:**

- 4 agents analyzing in parallel
- Reading code, tests, docs
- Creating multiple documentation files
- Better to be comprehensive once than superficial repeatedly

**New project interview is detailed:**

- 5 distinct discovery areas
- Architecture recommendations require research
- ADR creation for each major decision
- Foundation for entire project lifecycle

### Why Multi-Agent for Existing?

**Different expertise needed:**

- **Winston:** Architecture and system design perspective
- **Amelia:** Code quality and implementation patterns
- **Murat:** Testing strategy and coverage
- **Paige:** Documentation completeness

**Parallel execution:**

- All analyze concurrently
- Reduces total time vs sequential
- Comprehensive coverage in one pass

### Why project-overview.md as Detection Signal?

**Alternatives considered:**

| Signal                 | Pros                   | Cons                                |
| ---------------------- | ---------------------- | ----------------------------------- |
| project-progress.md    | Already used           | Can exist without proper onboarding |
| .onboarded flag file   | Explicit               | Hidden file, not user-visible       |
| project-overview.md    | Comprehensive, visible | None                                |
| docs/ folder existence | Simple                 | Can exist with minimal content      |

**Chose project-overview.md because:**

- Only created during comprehensive onboarding
- Contains most valuable context (tech stack, architecture, vision)
- Human-readable and valuable on its own
- Clear indicator of setup quality

---

## 📊 Expected Outcomes

### For Existing Projects

**Before onboarding:**

- Agents have no project context
- Must ask about tech stack, architecture, conventions
- Risk of inconsistent decisions
- Slow initial ramp-up

**After onboarding:**

- Complete tech stack understanding
- Documented architecture patterns
- Code conventions identified
- Test strategy mapped
- Documentation gaps known
- Agents can work autonomously

### For New Projects

**Before onboarding:**

- Ad-hoc requirements gathering
- Missing edge cases
- Unclear success criteria
- Reactive decision making

**After onboarding:**

- Comprehensive requirements documented
- Success metrics defined
- Architecture decided with rationale
- Roadmap prioritized
- First user stories ready
- Team aligned on vision

---

## 🔮 Future Enhancements

### Potential Improvements

1. **Incremental Onboarding**
   - Option for "quick onboarding" (15 min) vs "deep onboarding" (45 min)
   - Progressive context building over time

2. **Onboarding Templates by Project Type**
   - React SPA template
   - Node.js API template
   - Python data science template
   - Mobile app template

3. **Onboarding Verification**
   - `/verify-onboarding` command to check completeness
   - Scoring system for context quality
   - Suggestions for missing pieces

4. **Re-onboarding**
   - `/re-onboard` to update context after major changes
   - Diff between original and current state
   - Update recommendations

5. **Onboarding Exports**
   - Generate onboarding summary PDF
   - Create architecture diagrams from context
   - Export to external tools (Confluence, Notion, etc.)

---

## 📚 Related Documentation

- **[Slash Commands README](../.claude/commands/README.md)** - All available commands
- **[Orchestrator README](../personas/orchestrator/README.md)** - How orchestrator works
- **[Project Overview Template](./project-context/project-overview-template.md)** - Template used in onboarding
- **[PROJECT-TEMPLATE.md](./projects/PROJECT-TEMPLATE.md)** - Major project template
- **[Portable Guide](../PORTABLE-GUIDE.md)** - Using beaver-builder in any project

---

## 🎓 Key Learnings

### Why Onboarding Matters

1. **First impressions count:** Initial context quality affects all future work
2. **Prevents drift:** Comprehensive setup prevents knowledge fragmentation
3. **Scales with project:** Good foundation supports project growth
4. **Enables autonomy:** Agents can work independently with good context
5. **Reduces interruptions:** Fewer clarifying questions needed

### Design Principles Applied

1. **Be thorough, not fast:** 30-45 min investment pays off long-term
2. **Multi-agent collaboration:** Leverage diverse expertise
3. **Structured discovery:** Systematic questions prevent gaps
4. **Document everything:** Context is valuable, capture it all
5. **Make it optional:** Power users can skip if they prefer

---

**This onboarding system transforms beaver-builder from a passive tool into an active project partner that deeply understands your codebase and vision.**

_Last updated: 2025-11-18_
