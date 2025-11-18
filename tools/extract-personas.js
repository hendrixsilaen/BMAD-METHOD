const fs = require('node:fs').promises;
const fsSync = require('node:fs');
const path = require('node:path');
const yaml = require('js-yaml');

/**
 * Ensure directory exists
 */
async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

/**
 * Extract all agent personas and create persona folders
 */
async function extractPersonas() {
  const projectRoot = path.join(__dirname, '..');
  const srcDir = path.join(projectRoot, 'src');
  const personasDir = path.join(projectRoot, 'personas');

  // Ensure personas directory exists
  await ensureDir(personasDir);

  console.log('🔍 Searching for agent files...\n');

  // Find all .agent.yaml files
  const agentFiles = await findAgentFiles(srcDir);

  console.log(`✅ Found ${agentFiles.length} agents\n`);

  // Process each agent file
  for (const agentFile of agentFiles) {
    await processAgentFile(agentFile, personasDir);
  }

  console.log(`\n✨ Successfully extracted ${agentFiles.length} personas to ./personas/`);
}

/**
 * Recursively find all .agent.yaml files
 */
async function findAgentFiles(dir) {
  const agentFiles = [];

  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.name.endsWith('.agent.yaml')) {
        agentFiles.push(fullPath);
      }
    }
  }

  await walk(dir);
  return agentFiles;
}

/**
 * Process a single agent file and create persona folder
 */
async function processAgentFile(agentFilePath, personasDir) {
  try {
    // Read and parse the agent YAML file
    const content = await fs.readFile(agentFilePath, 'utf8');
    const agentData = yaml.load(content);

    if (!agentData || !agentData.agent) {
      console.warn(`⚠️  Skipping ${path.basename(agentFilePath)}: Invalid structure`);
      return;
    }

    const agent = agentData.agent;
    const metadata = agent.metadata || {};
    const persona = agent.persona || {};
    const menu = agent.menu || [];
    const criticalActions = agent.critical_actions || [];

    // Determine folder name from metadata.name or title
    const agentName = metadata.name || metadata.title || 'unknown';
    const folderName = sanitizeFolderName(agentName);
    const agentFolder = path.join(personasDir, folderName);

    // Create agent folder
    await ensureDir(agentFolder);

    // Extract module info from file path
    const relativePath = path.relative(path.join(__dirname, '..', 'src'), agentFilePath);
    const moduleName = relativePath.split(path.sep)[1]; // e.g., 'bmm', 'cis', 'core'

    // Create persona.yaml with core persona information
    const personaData = {
      metadata: {
        name: metadata.name || '',
        title: metadata.title || '',
        icon: metadata.icon || '',
        module: metadata.module || moduleName,
        source_file: relativePath,
      },
      persona: {
        role: persona.role || '',
        identity: persona.identity || '',
        communication_style: persona.communication_style || '',
        principles: Array.isArray(persona.principles) ? persona.principles : [persona.principles].filter(Boolean),
      },
    };

    // Add critical actions if present
    if (criticalActions.length > 0) {
      personaData.critical_actions = criticalActions;
    }

    // Save persona.yaml
    const personaYaml = yaml.dump(personaData, { lineWidth: 120, noRefs: true });
    await fs.writeFile(path.join(agentFolder, 'persona.yaml'), personaYaml, 'utf8');

    // Create workflows.yaml with menu information
    const workflowsData = {
      available_workflows: menu.map((item) => ({
        trigger: item.trigger || '',
        description: item.description || '',
        workflow: item.workflow || item.exec || item['validate-workflow'] || '',
        type: item.workflow ? 'workflow' : item.exec ? 'task' : item['validate-workflow'] ? 'validation' : 'unknown',
        platform: item['ide-only'] ? 'ide-only' : item['web-only'] ? 'web-only' : 'both',
      })),
    };

    const workflowsYaml = yaml.dump(workflowsData, { lineWidth: 120, noRefs: true });
    await fs.writeFile(path.join(agentFolder, 'workflows.yaml'), workflowsYaml, 'utf8');

    // Create README.md with full agent description
    const readme = generateReadme(metadata, persona, menu, criticalActions, moduleName);
    await fs.writeFile(path.join(agentFolder, 'README.md'), readme, 'utf8');

    console.log(`✅ ${metadata.icon || '📄'} ${agentName} (${moduleName})`);
  } catch (error) {
    console.error(`❌ Error processing ${path.basename(agentFilePath)}:`, error.message);
  }
}

/**
 * Sanitize folder name
 */
function sanitizeFolderName(name) {
  return name
    .toLowerCase()
    .replaceAll(/\s+/g, '-')
    .replaceAll(/[^\da-z-]/g, '')
    .replaceAll(/^-+|-+$/g, '');
}

/**
 * Generate README.md for agent
 */
function generateReadme(metadata, persona, menu, criticalActions, moduleName) {
  const name = metadata.name || metadata.title || 'Unknown Agent';
  const title = metadata.title || '';
  const icon = metadata.icon || '🤖';

  let readme = `# ${icon} ${name}\n\n`;

  if (title && title !== name) {
    readme += `**Role:** ${title}\n\n`;
  }

  readme += `**Module:** ${moduleName}\n\n`;

  readme += `---\n\n`;

  // Persona section
  readme += `## Persona\n\n`;
  readme += `**Role:** ${persona.role || 'N/A'}\n\n`;
  readme += `**Identity:** ${persona.identity || 'N/A'}\n\n`;
  readme += `**Communication Style:** ${persona.communication_style || 'N/A'}\n\n`;

  // Principles
  if (persona.principles) {
    readme += `**Principles:**\n`;
    const principles = Array.isArray(persona.principles) ? persona.principles : [persona.principles];
    for (const principle of principles) {
      if (principle) {
        readme += `- ${principle}\n`;
      }
    }
    readme += `\n`;
  }

  // Critical Actions
  if (criticalActions && criticalActions.length > 0) {
    readme += `---\n\n`;
    readme += `## Critical Actions\n\n`;
    readme += `These are mandatory actions this agent must follow:\n\n`;
    for (const action of criticalActions) {
      readme += `- ${action}\n`;
    }
    readme += `\n`;
  }

  // Menu / Workflows
  if (menu && menu.length > 0) {
    readme += `---\n\n`;
    readme += `## Available Workflows\n\n`;
    readme += `This agent can execute the following workflows:\n\n`;

    for (const item of menu) {
      const trigger = item.trigger || 'unknown';
      const description = item.description || 'No description';
      const platform = item['ide-only'] ? ' *(IDE only)*' : item['web-only'] ? ' *(Web only)*' : '';

      readme += `### \`*${trigger}\`${platform}\n\n`;
      readme += `${description}\n\n`;
    }
  }

  readme += `---\n\n`;
  readme += `*This persona was automatically extracted from the BMAD METHOD agent definitions.*\n`;

  return readme;
}

// Run the extraction
extractPersonas().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
