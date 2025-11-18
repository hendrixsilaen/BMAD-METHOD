# Troubleshooting Guide

Common issues and solutions for beaver-builder.

## Quick Diagnostics

**Start here:** Run `/verify-onboarding` to check your setup and identify missing components.

## Onboarding Issues

### Problem: "Onboarding never completes"

**Symptoms:**

- Command runs for >60 minutes with no progress
- Process seems stuck or frozen
- No documentation files created

**Causes:**

- Very large codebase (>50K files)
- Network/LLM timeouts
- Context window exhaustion
- Too many files to analyze

**Solutions:**

1. **Cancel and use quick start:**

   ```
   /quickstart
   ```

   This takes 5-10 minutes instead of 30-45 minutes.

2. **Try on smaller scope:**
   - If using `/onboard-existing`, cd to a specific subdirectory first
   - Analyze one service/module at a time in monorepos
   - Use `.gitignore` to exclude node_modules, build artifacts, etc.

3. **Check what completed:**

   ```
   /verify-onboarding
   ```

   This shows what was created and what's missing.

4. **Manual fallback:**
   - Copy template from `docs/project-context/project-overview-quick.md`
   - Fill in essential sections manually
   - Use examples in `docs/examples/` as reference

### Problem: "Onboarding created incomplete docs"

**Symptoms:**

- `project-overview.md` has many "[Fill this]" or "TBD" placeholders
- Sections are empty or have generic content
- Tech stack shows "Unknown" or "Detect from codebase"

**Causes:**

- Quick start mode used (by design - minimal setup)
- Interruption during onboarding process
- Codebase analysis failed to detect tech stack
- Files were created but not populated

**Solutions:**

1. **Check completion level:**

   ```
   /verify-onboarding
   ```

   This reports what percentage is complete.

2. **Fill manually using examples:**
   - Browse `docs/examples/react-nodejs-saas/` or other examples
   - Copy sections that match your project
   - Replace example content with your specifics

3. **Re-run full onboarding:**

   ```
   /onboard-existing
   ```

   This does deeper analysis than quick start.

4. **Incremental completion:**
   - Start working with partial context
   - Fill sections as questions arise
   - Let agents help complete sections (ask Winston for architecture, etc.)

### Problem: "Error reading persona.yaml files"

**Symptoms:**

- Error messages like "Failed to load Winston" or "Persona not found"
- Commands fail with file reading errors
- Orchestrator can't find agents

**Causes:**

- Corrupted YAML files (syntax errors)
- File permissions issue (can't read files)
- Missing persona files (incomplete copy)
- YAML indentation errors

**Solutions:**

1. **Check file exists:**

   ```bash
   ls beaver-builder/personas/winston/persona.yaml
   ```

2. **Validate YAML syntax:**
   - Copy contents to online YAML validator
   - Check for proper indentation (spaces, not tabs)
   - Look for unclosed quotes or brackets

3. **Restore from git:**

   ```bash
   git checkout beaver-builder/personas/winston/persona.yaml
   ```

4. **Check file permissions:**

   ```bash
   chmod 644 beaver-builder/personas/*/persona.yaml
   ```

5. **Verify complete copy:**
   - Count persona folders: should have 21+ agents
   - Check each has `persona.yaml` and `README.md`

### Problem: "Can't find beaver-builder/ folder"

**Symptoms:**

- Commands fail with "folder not found"
- "No such file or directory" errors
- Slash commands don't work

**Causes:**

- Working from wrong directory
- Folder not copied to project
- Incorrect folder name (typo)

**Solutions:**

1. **Verify you're in project root:**

   ```bash
   pwd
   ls -la | grep beaver-builder
   ```

2. **Copy folder if missing:**

   ```bash
   cp -r /path/to/source/beaver-builder /your/project/
   ```

3. **Check exact name:**
   - Must be `beaver-builder` (with hyphen)
   - Case-sensitive on Linux/Mac
   - Should be at project root level

## Context & Memory Issues

### Problem: "Agents don't remember previous work"

**Symptoms:**

- Asking questions already answered
- Repeating context you've provided before
- Not aware of recent changes
- Acting like first conversation

**Causes:**

- `project-overview.md` missing or empty
- Agents not reading context files correctly
- Context files exist but have placeholders
- Project progress not being updated

**Solutions:**

1. **Verify setup complete:**

   ```
   /verify-onboarding
   ```

2. **Check critical files exist and have content:**

   ```bash
   # Should be >500 bytes, not just template
   ls -lh beaver-builder/docs/project-context/project-overview.md

   # Should have recent updates
   cat beaver-builder/docs/project-context/project-progress.md
   ```

3. **Manually update project context:**
   - Edit `docs/project-context/project-overview.md`
   - Fill in key project info: name, tech stack, purpose
   - Remove placeholder text, add real content

4. **Update progress after major work:**
   - Edit `docs/project-context/project-progress.md`
   - Add completed work items
   - Document current status

5. **Explicitly reference context:**
   - Say "Check project-overview.md for tech stack"
   - Point agents to relevant docs

### Problem: "Context is outdated"

**Symptoms:**

- Agents reference old tech stack (e.g., React 16 when you're on React 18)
- Mention removed features or old architecture
- Suggest approaches that don't match current project state
- Unaware of recent major changes

**Causes:**

- Project evolved since onboarding
- Documentation not updated after major changes
- Tech stack migrations not documented
- Old ADRs not updated/superseded

**Solutions:**

1. **Manual update (fast):**
   - Edit `docs/project-context/project-overview.md`
   - Update tech stack versions
   - Update architecture section
   - Note major changes since last update

2. **Re-run onboarding (comprehensive):**

   ```
   /onboard-existing
   ```

   This re-analyzes current codebase state.

3. **Create superseding ADR:**
   - Document tech stack changes
   - Explain migration decisions
   - Reference old ADR and note it's superseded

4. **Update regularly:**
   - After major refactors, update project-overview.md
   - After migrations, create new ADR
   - Monthly review of project context accuracy

### Problem: "Agents hallucinate features that don't exist"

**Symptoms:**

- Suggesting APIs that aren't built
- Referencing components that don't exist
- Assuming infrastructure that's not there

**Causes:**

- Generic AI knowledge interfering
- Incomplete project context
- Assumptions based on common patterns

**Solutions:**

1. **Strengthen project context:**
   - Document what EXISTS in project-overview.md
   - Be explicit about what's NOT built yet
   - List current features/APIs clearly

2. **Correct immediately:**
   - "That doesn't exist in this project"
   - "We don't have that component yet"
   - Agents will adjust understanding

3. **Add constraints to project-overview:**

   ```markdown
   ## What We Don't Have

   - No user authentication yet (planned Q3)
   - No database (using in-memory for now)
   - No API layer (planned next sprint)
   ```

## Command Issues

### Problem: "Command not found"

**Symptoms:**

- `/command-name` doesn't work
- "Unknown command" error
- Nothing happens when typing slash command

**Causes:**

- Typo in command name
- Command file missing from `.claude/commands/`
- Not using slash prefix
- Wrong environment (some commands IDE-only)

**Solutions:**

1. **Check available commands:**
   - Read `.claude/commands/README.md`
   - List all command files: `ls .claude/commands/`

2. **Verify exact command name:**
   - Use `/onboard-existing` not `/onboard-project`
   - Use `/create-task` not `/new-task`
   - Commands are case-sensitive

3. **Verify command file exists:**

   ```bash
   ls .claude/commands/onboard-existing.md
   ```

4. **Use slash prefix:**
   - Correct: `/orchestrate`
   - Wrong: `orchestrate`

5. **Check environment compatibility:**
   - Some commands only work in Claude Code (IDE)
   - Some require specific setup

### Problem: "Orchestrator selects wrong agent"

**Symptoms:**

- Got developer help when needed architecture advice
- Got PM help when needed technical implementation
- Wrong expertise for the task

**Causes:**

- Ambiguous request phrasing
- Orchestrator misinterpreted intent
- Request spans multiple domains

**Solutions:**

1. **Be more specific:**
   - Instead of: "Help me with users"
   - Try: "I need architecture help designing user authentication system"

2. **Use direct agent commands:**

   ```
   /agent winston    # Directly load Winston (architect)
   /agent amelia     # Directly load Amelia (developer)
   /agent john       # Directly load John (PM)
   ```

3. **Clarify domain upfront:**
   - "From architecture perspective..."
   - "As a product question..."
   - "For implementation..."

4. **Request specific agents:**
   - "I need Winston's input on database choice"
   - "Can Amelia review this code?"

### Problem: "Slash commands don't seem to work"

**Symptoms:**

- Typing `/command` does nothing
- Commands not recognized
- No auto-complete

**Causes:**

- Not using Claude Code (IDE with command support)
- `.claude/` folder not in project root
- Commands not properly loaded

**Solutions:**

1. **Verify environment:**
   - Slash commands work best in Claude Code
   - May need manual loading in other environments

2. **Check folder location:**

   ```bash
   ls -la .claude/commands/
   ```

   Should be at project root.

3. **Manual alternative:**
   - Load command file directly
   - Copy command text to prompt
   - Use orchestrator: `/orchestrate` then describe what you need

## Template Issues

### Problem: "Don't know which template to use"

**Symptoms:**

- Overwhelmed by template options
- Not sure if should use Quick, Standard, or Comprehensive
- Confused by multiple USER-STORY templates

**Solutions:**

1. **See Template Guide:**
   - Read `docs/TEMPLATE-GUIDE.md`
   - Shows decision tree for template selection

2. **Default to Standard:**
   - When in doubt, use **Standard** tier
   - Balanced between completeness and time
   - Recommended for most use cases

3. **Use this simple rule:**
   - **Quick/Minimal:** Small projects, trying it out, time-constrained
   - **Standard:** Normal projects (RECOMMENDED)
   - **Comprehensive:** Enterprise, complex multi-team systems

4. **Start small, upgrade later:**
   - Begin with Quick template
   - Upgrade to Standard when you need more detail
   - Templates are just markdown - easy to expand

### Problem: "Template too long to fill out"

**Symptoms:**

- 490-line comprehensive template feels overwhelming
- Takes too long to complete
- Lots of sections don't apply

**Solutions:**

1. **Use tiered templates:**
   - Quick: 100 lines, 5 minutes
   - Standard: 250 lines, 15 minutes
   - Comprehensive: 490 lines, 30 minutes

2. **Fill incrementally:**
   - Complete essential sections first
   - Fill "nice to have" sections later
   - Leave some sections for future if not relevant yet

3. **See examples for guidance:**
   - Browse `docs/examples/react-nodejs-saas/`
   - See what "complete" looks like
   - Copy structure, adapt to your project

4. **Get help from agents:**
   - Ask Winston to fill architecture sections
   - Ask John to complete product sections
   - Ask Amelia for technical details

### Problem: "Template sections don't apply to my project"

**Symptoms:**

- Questions about database when project has no database
- Sections about team when solo developer
- Infrastructure questions for simple script

**Solutions:**

1. **Skip or mark N/A:**

   ```markdown
   ## Database

   N/A - This is a static site, no database needed.
   ```

2. **Use simpler template:**
   - Switch from Comprehensive to Quick
   - Less sections = more applicable

3. **Customize template:**
   - Templates are just markdown files
   - Edit to match your project type
   - Delete irrelevant sections

4. **Create project-type-specific templates:**
   - Copy and adapt for your domain
   - Save custom templates for reuse

## File & Folder Issues

### Problem: "Docs folder is empty"

**Symptoms:**

- No documentation created
- `docs/` exists but has no content
- Only empty folders present

**Causes:**

- Onboarding not run yet
- Onboarding failed silently
- Files created then deleted

**Solutions:**

1. **Run onboarding:**

   ```
   /quickstart      # Fast (5-10 min)
   /onboard-existing  # Comprehensive (30-45 min)
   ```

2. **Check for errors in previous commands:**
   - Review command output
   - Look for error messages
   - Check if process completed

3. **Manually create structure:**

   ```bash
   mkdir -p beaver-builder/docs/project-context
   mkdir -p beaver-builder/docs/architecture
   mkdir -p beaver-builder/docs/requirements
   mkdir -p beaver-builder/docs/projects
   mkdir -p beaver-builder/docs/tasks/active
   mkdir -p beaver-builder/docs/tasks/completed
   ```

4. **Copy templates manually:**
   ```bash
   cp beaver-builder/docs/project-context/project-overview-quick.md \
      beaver-builder/docs/project-context/project-overview.md
   ```

### Problem: "Too many documentation files cluttering project"

**Symptoms:**

- Hundreds of ADR files
- Documentation overwhelming codebase
- Hard to find what matters

**Solutions:**

1. **Use archive folders:**

   ```bash
   mkdir -p docs/architecture/archive
   mv docs/architecture/ADR-00*.md docs/architecture/archive/
   ```

2. **Maintain index files:**
   - Create `docs/architecture/README.md` with active ADRs only
   - Link to archived decisions
   - Update regularly

3. **Delete superseded decisions:**
   - ADRs can reference and replace older ones
   - Move old decisions to archive
   - Keep current decisions visible

4. **Clean up completed tasks:**
   - Periodically move `docs/tasks/completed/` to archive
   - Keep only recent completed tasks (last month)

### Problem: "Git is tracking large generated files"

**Symptoms:**

- Huge git commits from docs/ folder
- Binary files in docs/
- Generated diagrams committed

**Solutions:**

1. **Add to .gitignore:**

   ```
   # In .gitignore
   beaver-builder/docs/**/*.png
   beaver-builder/docs/**/*.pdf
   beaver-builder/docs/**/temp/
   ```

2. **Separate generated from source:**

   ```
   docs/
   ├── diagrams/           # Source (Mermaid, PlantUML)
   └── diagrams/generated/ # Output (PNG, PDF) - gitignored
   ```

3. **Use text-based diagrams:**
   - Mermaid (markdown-embedded)
   - PlantUML (text source)
   - Avoid binary image files when possible

## Integration Issues

### Problem: "Conflicts with existing project structure"

**Symptoms:**

- Project already has `docs/` folder
- Naming conflicts
- Existing documentation standards

**Solutions:**

1. **Merge documentation:**
   - Move existing docs into `beaver-builder/docs/`
   - Adapt existing structure to beaver-builder format
   - Update internal links

2. **Rename beaver-builder docs:**

   ```bash
   mv beaver-builder/docs beaver-builder/ai-docs
   ```

   Update agent configs to use new path.

3. **Use prefix for clarity:**

   ```
   project-root/
   ├── docs/              # Your existing docs
   └── beaver-builder/
       └── ai-context/    # AI agent context (renamed from docs/)
   ```

4. **Create integration guide:**
   - Document where each type of content goes
   - Link between human docs and AI docs
   - Maintain both systems

### Problem: "Team members confused by beaver-builder folder"

**Symptoms:**

- "What is this?"
- "Can I delete this?"
- "Why so many YAML files?"

**Solutions:**

1. **Add project README:**
   Create `docs/ABOUT-BEAVER-BUILDER.md`:

   ```markdown
   # About beaver-builder/

   This folder contains AI agent personas and project context.

   - **Don't delete** - AI assistants need this
   - **Do commit** - Helps whole team
   - **Can read** - All files are plain text
   - **Questions?** See beaver-builder/README.md
   ```

2. **Add to main README:**

   ```markdown
   ## 🤖 AI Assistant Setup

   This project uses beaver-builder for AI-powered development.
   See `beaver-builder/README.md` for details.
   ```

3. **Team onboarding:**
   - Share FAQ.md with team
   - Demo in team meeting
   - Add to developer onboarding docs

4. **Make it visible but not intrusive:**
   - Keep at root level (visible)
   - Use clear folder names
   - Document in project conventions

## Performance Issues

### Problem: "Commands are slow to respond"

**Symptoms:**

- Long wait times for agent responses
- Timeouts during onboarding
- Sluggish command execution

**Causes:**

- Large context files being read
- Network latency to Claude API
- Very large codebase analysis

**Solutions:**

1. **Reduce context file size:**
   - Remove verbose sections from project-overview.md
   - Archive old ADRs
   - Summarize instead of including full details

2. **Use incremental onboarding:**
   - Start with `/quickstart`
   - Add detail incrementally
   - Don't try to document everything at once

3. **Check network connection:**
   - Stable internet required for API calls
   - Use wired connection if WiFi unstable

4. **Limit scope:**
   - Analyze one module at a time
   - Use focused onboarding per feature area
   - Don't try to analyze entire monorepo at once

### Problem: "Running out of context window"

**Symptoms:**

- "Context too large" errors
- Responses cut off mid-sentence
- Agent can't read all files

**Causes:**

- Too many large files loaded
- Comprehensive documentation too verbose
- Trying to load entire codebase

**Solutions:**

1. **Reduce documentation verbosity:**
   - Use bullet points instead of paragraphs
   - Link to details instead of including everything
   - Keep project-overview.md under 5000 words

2. **Use tiered information:**
   - Summary in project-overview.md
   - Details in separate files
   - Agents load details only when needed

3. **Strategic file organization:**
   - Keep active context small
   - Archive historical decisions
   - Link to archived content when needed

## Still Stuck?

### Escalation Path

1. **Run diagnostics:**

   ```
   /verify-onboarding
   ```

2. **Check FAQ:**
   - See [FAQ.md](./FAQ.md) for common questions

3. **Review examples:**
   - Browse `docs/examples/` for working setups

4. **Read guides:**
   - [Portable Guide](../PORTABLE-GUIDE.md) - Complete usage
   - [Commands README](../.claude/commands/README.md) - All commands
   - [Orchestrator Guide](../personas/orchestrator/README.md) - How orchestration works

5. **Manual recovery:**
   - Copy working example from `docs/examples/`
   - Manually create essential files
   - Start simple, add complexity incrementally

### Emergency Reset

If everything is broken and you want to start fresh:

```bash
# Backup your work
cp -r beaver-builder/docs beaver-builder/docs.backup

# Remove generated docs
rm -rf beaver-builder/docs

# Re-run onboarding
/quickstart  # or /onboard-existing
```

Your personas and commands are untouched, only project context is reset.

### Useful Debug Commands

```bash
# Check if essential files exist
ls -lh beaver-builder/docs/project-context/project-overview.md
ls -lh beaver-builder/docs/project-context/project-progress.md

# Count persona files (should be 21+)
ls beaver-builder/personas/ | wc -l

# Verify YAML files are readable
cat beaver-builder/personas/orchestrator/persona.yaml

# Check command files exist
ls .claude/commands/*.md

# See recent documentation changes
git log --oneline beaver-builder/docs/ | head -10
```

---

**Remember:** Beaver-builder is designed to be resilient. Most issues can be fixed by updating a few markdown files or re-running onboarding. Don't hesitate to start fresh if needed - your code is separate from the documentation.
