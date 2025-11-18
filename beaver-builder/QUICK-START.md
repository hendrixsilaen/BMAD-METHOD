# Quick Start Guide

Get started with beaver-builder in 5 minutes.

## Step 1: Copy Folder (30 seconds)

```bash
# Copy beaver-builder to your project
cp -r path/to/beaver-builder /your/project/
cd /your/project
```

**Verify:**

```bash
ls beaver-builder/  # Should see: personas/, docs/, .claude/
```

## Step 2: Run Onboarding (5-45 minutes)

Choose your path based on your needs:

### Option A: Quick Start (5-10 min) ⚡ RECOMMENDED for first time

```bash
/quickstart
```

**What happens:**

- Answer 3 quick questions about your project
- Minimal setup - just enough to start working
- Creates basic project context
- You're ready to use agents immediately

**Best for:**

- First time trying beaver-builder
- Want to start working now, deep dive later
- Simple projects
- Time-constrained

### Option B: New Project (20-30 min)

```bash
/onboard-new
```

**What happens:**

- Full discovery interview about your project
- Architecture planning assistance
- Complete documentation setup
- Tech stack and approach guidance

**Best for:**

- Starting a new project from scratch
- Want comprehensive planning
- Need architecture decisions documented
- Green-field development

### Option C: Existing Project (30-45 min)

```bash
/onboard-existing
```

**What happens:**

- Deep codebase analysis and scanning
- Automatic tech stack detection
- Comprehensive documentation generation
- Full project context creation

**Best for:**

- Existing codebase with code to analyze
- Want thorough documentation of current state
- Need complete project understanding
- Brown-field development

## Step 3: Verify Setup (30 seconds)

```bash
/verify-onboarding
```

**You should see:**

- ✅ Essential files exist
- ✅ Content is filled (not just placeholders)
- ✅ Completeness score

**If verification fails:**

- Check which files are missing
- Run onboarding again
- Or manually create missing files using templates

## Step 4: Start Working (immediately)

Now you can use beaver-builder! Common first commands:

### General Help

```bash
/orchestrate
```

Tell the orchestrator what you need. It will analyze your request and engage the right expert agent(s).

**Example:**

> "I need help designing a user authentication system"

The orchestrator will engage Winston (architect) + Murat (testing) + possibly Amelia (developer).

### Check Status

```bash
/status
```

See project overview, current work, and progress.

### Create Work Items

```bash
/create-task      # Small task (<1 day)
/create-project   # Major initiative (>1 week)
```

### Specialized Workflows

```bash
/architecture     # System design help (loads Winston)
/implement        # Write code (loads Amelia)
/brainstorm       # Creative ideation (loads Carson)
/test            # Testing strategy (loads Murat)
/document        # Create documentation (loads Paige)
```

## What You Get

After onboarding, you have:

### ✅ Project Memory

All agents know your project because context is stored in:

- `docs/project-context/project-overview.md` - Core project info
- `docs/project-context/project-progress.md` - Current status

### ✅ 21+ Expert Agents

Specialized personas ready to help:

- **Winston** - Solutions Architect
- **Amelia** - Senior Developer
- **John** - Product Manager
- **Mary** - Business Analyst
- **Murat** - Test Architect
- **Sally** - UX Designer
- **Paige** - Technical Writer
- **Carson** - Brainstorming Specialist
- ...and 13 more!

### ✅ Documentation System

Structured folders for:

- `docs/architecture/` - ADRs (Architecture Decision Records)
- `docs/requirements/` - User stories and specs
- `docs/projects/` - Major initiatives
- `docs/tasks/` - Small work items
- `docs/research/` - Analysis and insights

### ✅ Intelligent Coordination

The orchestrator:

- Analyzes your requests
- Selects relevant experts
- Coordinates multi-agent responses
- Maintains project context
- Updates progress tracking

## Quick Reference

### Essential Commands

| Command              | Purpose        | Time      |
| -------------------- | -------------- | --------- |
| `/quickstart`        | Minimal setup  | 5-10 min  |
| `/onboard-existing`  | Deep analysis  | 30-45 min |
| `/onboard-new`       | Full planning  | 20-30 min |
| `/orchestrate`       | General help   | Instant   |
| `/status`            | Check progress | Instant   |
| `/verify-onboarding` | Check setup    | Instant   |

### Common Workflows

| Command         | Agent   | Use For                       |
| --------------- | ------- | ----------------------------- |
| `/architecture` | Winston | System design, tech decisions |
| `/implement`    | Amelia  | Writing code, debugging       |
| `/brainstorm`   | Carson  | Creative ideas, innovation    |
| `/test`         | Murat   | Testing strategy, QA          |
| `/document`     | Paige   | Documentation, guides         |

### Documentation Locations

| Path                    | Contains               |
| ----------------------- | ---------------------- |
| `docs/project-context/` | Core project info      |
| `docs/architecture/`    | Tech decisions (ADRs)  |
| `docs/requirements/`    | User stories, features |
| `docs/projects/`        | Major initiatives      |
| `docs/tasks/`           | Small work items       |

## Next Steps

### 1. Explore Examples

See what good documentation looks like:

```bash
ls docs/examples/
```

Browse complete examples:

- `docs/examples/react-nodejs-saas/` - Full-stack SaaS
- `docs/examples/python-ml-api/` - ML/AI project
- `docs/examples/mobile-app/` - React Native app

### 2. Learn All Commands

```bash
cat .claude/commands/README.md
```

See all 17 available slash commands.

### 3. Read Full Guide

```bash
cat PORTABLE-GUIDE.md
```

Complete usage documentation.

### 4. Review FAQ

```bash
cat docs/FAQ.md
```

Answers to 20+ common questions.

### 5. Start Building

Just ask the orchestrator:

```bash
/orchestrate
```

> "I'm ready to start building. What should we work on first?"

## Troubleshooting

### "Command not found"

- Verify you're in project root directory
- Check `.claude/commands/` folder exists
- Use slash prefix: `/command-name`
- See [Commands README](./.claude/commands/README.md)

### "No project context"

- Run `/verify-onboarding` to diagnose
- May need to run `/quickstart` or `/onboard-existing`
- Check `docs/project-context/project-overview.md` exists

### "Onboarding taking too long"

- Use `/quickstart` instead (5-10 min vs 30-45 min)
- Can run deeper analysis later when needed
- Large codebases may need subset analysis

### "Agents don't understand my project"

- Check `docs/project-context/project-overview.md` has real content
- Update tech stack and project info manually
- Re-run `/onboard-existing` to refresh

**More help:**

- [Troubleshooting Guide](./docs/TROUBLESHOOTING.md)
- [FAQ](./docs/FAQ.md)

## Tips for Success

### ✅ Do This

- Commit `docs/` folder to git (team knowledge base)
- Start with `/quickstart` on first use
- Use `/orchestrate` when unsure which agent to use
- Update `project-overview.md` after major changes
- Let agents document decisions (ADRs, user stories)

### ❌ Avoid This

- Don't skip onboarding entirely (agents need context)
- Don't delete `docs/` folder (it's project memory)
- Don't use comprehensive templates when quick is enough
- Don't expect agents to know unstated project details
- Don't forget to commit documentation to git

## Success in 3 Steps

```
1. Copy folder     (30 seconds)
2. Run /quickstart (5-10 minutes)
3. Use /orchestrate (start building!)
```

**Total time: 5-15 minutes to full productivity ✨**

---

## Need Help?

- **Quick questions:** See [FAQ](./docs/FAQ.md)
- **Problems:** See [Troubleshooting](./docs/TROUBLESHOOTING.md)
- **Full guide:** See [Portable Guide](./PORTABLE-GUIDE.md)
- **Commands:** See [Commands Reference](./.claude/commands/README.md)
- **Examples:** See [Example Projects](./docs/examples/)

**Welcome to beaver-builder! Your portable AI expert team is ready.** 🎉
