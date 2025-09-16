const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const matter = require('gray-matter');
const ts = require('typescript');

const projectRoot = path.join(__dirname, '..');
const docsRoot = path.join(projectRoot, 'docs');
const strategiesRoot = path.join(docsRoot, 'strategies');
const outputPath = path.join(projectRoot, 'src', 'data', 'strategyNavigator.ts');

const propertyOrder = [
  'title',
  'slug',
  'summary',
  'stages',
  'goals',
  'pressures',
  'leadershipFocus',
  'quickSignals',
  'momentumMoves',
  'watchOuts',
  'effortLevel',
  'timeHorizon',
];

const indent = (level) => '  '.repeat(level);

const escapeString = (value) =>
  `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

const formatArray = (values, indentLevel) => {
  if (!Array.isArray(values) || values.length === 0) {
    return '[]';
  }

  const inline =
    values.length <= 3 && values.every((item) => item.length <= 40 && !item.includes('\n'));

  if (inline) {
    return `[${values.map(escapeString).join(', ')}]`;
  }

  const lines = values.map(
    (item) => `${indent(indentLevel + 1)}${escapeString(item)},`,
  );

  return `[\n${lines.join('\n')}\n${indent(indentLevel)}]`;
};

const formatProfile = (profile) => {
  const lines = [];

  for (const key of propertyOrder) {
    const value = profile[key];
    if (key === 'summary') {
      lines.push(`${indent(2)}summary:`);
      lines.push(`${indent(3)}${escapeString(value)},`);
      continue;
    }

    if (Array.isArray(value)) {
      lines.push(`${indent(2)}${key}: ${formatArray(value, 2)},`);
    } else {
      lines.push(`${indent(2)}${key}: ${escapeString(String(value))},`);
    }
  }

  return `${indent(1)}{\n${lines.join('\n')}\n${indent(1)}}`;
};

const loadExistingOrder = () => {
  if (!fs.existsSync(outputPath)) {
    return new Map();
  }

  try {
    const source = fs.readFileSync(outputPath, 'utf8');
    const {outputText} = ts.transpileModule(source, {
      compilerOptions: {module: ts.ModuleKind.CommonJS},
    });
    const moduleShim = {exports: {}};
    const compiled = new Function(
      'require',
      'module',
      'exports',
      `${outputText}\nreturn module.exports;`,
    );
    const exported = compiled(require, moduleShim, moduleShim.exports);
    const order = new Map();
    if (Array.isArray(exported.strategyProfiles)) {
      exported.strategyProfiles.forEach((profile, index) => {
        if (profile && typeof profile.slug === 'string') {
          order.set(profile.slug, index);
        }
      });
    }
    return order;
  } catch (error) {
    console.warn('Could not read existing strategyNavigator.ts for ordering:', error.message);
    return new Map();
  }
};

const collectStrategyFiles = async () => {
  const stack = [strategiesRoot];
  const files = [];

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = await fsp.readdir(current, {withFileTypes: true});

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (entry.isFile() && entry.name === 'index.md') {
        files.push(fullPath);
      }
    }
  }

  return files;
};

const normaliseArray = (value, name, slug) => {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    throw new Error(`${name} must be an array of strings for ${slug}`);
  }
  return value.map((item) => item.trim());
};

const main = async () => {
  const files = await collectStrategyFiles();
  const profiles = [];

  for (const filePath of files) {
    const raw = await fsp.readFile(filePath, 'utf8');
    const parsed = matter(raw);
    const {data} = parsed;
    const navigatorFields = [
      'stages',
      'goals',
      'pressures',
      'leadership_focus',
      'quick_signals',
      'momentum_moves',
      'watch_outs',
      'effort_level',
      'time_horizon',
    ];
    const hasTopLevelNavigatorData = navigatorFields.some((field) =>
      Object.prototype.hasOwnProperty.call(data, field),
    );

    let navSource = null;

    if (hasTopLevelNavigatorData) {
      navSource = data;
    } else if (data.strategy_navigator) {
      navSource = data.strategy_navigator;
    } else {
      continue;
    }

    const relativeDir = path.relative(docsRoot, path.dirname(filePath));
    const slug = `/${relativeDir.split(path.sep).join('/')}`;
    let title = data.title;

    if (typeof title !== 'string' || title.trim().length === 0) {
      const headingMatch = parsed.content.match(/^#\s+(.+?)\s*$/m);
      if (!headingMatch) {
        throw new Error(`Missing or invalid title in ${filePath}`);
      }
      title = headingMatch[1];
    }

    const summarySource =
      typeof data.description === 'string' && data.description.trim().length > 0
        ? data.description
        : navSource.summary;

    if (typeof summarySource !== 'string' || summarySource.trim().length === 0) {
      throw new Error(`description missing in ${filePath}`);
    }

    for (const field of navigatorFields) {
      if (!Object.prototype.hasOwnProperty.call(navSource, field)) {
        throw new Error(`${field} missing in ${filePath}`);
      }
    }

    const profile = {
      title: title.trim(),
      slug,
      summary: summarySource.trim(),
      stages: normaliseArray(navSource.stages, 'stages', slug),
      goals: normaliseArray(navSource.goals, 'goals', slug),
      pressures: normaliseArray(navSource.pressures, 'pressures', slug),
      leadershipFocus: normaliseArray(
        navSource.leadership_focus,
        'leadership_focus',
        slug,
      ),
      quickSignals: normaliseArray(navSource.quick_signals, 'quick_signals', slug),
      momentumMoves: normaliseArray(navSource.momentum_moves, 'momentum_moves', slug),
      watchOuts: normaliseArray(navSource.watch_outs, 'watch_outs', slug),
      effortLevel: String(navSource.effort_level).trim(),
      timeHorizon: String(navSource.time_horizon).trim(),
    };

    profiles.push(profile);
  }

  if (profiles.length === 0) {
    throw new Error('No strategy navigator data found in front matter.');
  }

  const existingOrder = loadExistingOrder();
  profiles.sort((a, b) => {
    const orderA = existingOrder.get(a.slug);
    const orderB = existingOrder.get(b.slug);

    if (orderA != null && orderB != null) {
      return orderA - orderB;
    }
    if (orderA != null) {
      return -1;
    }
    if (orderB != null) {
      return 1;
    }
    return a.slug.localeCompare(b.slug);
  });

  const profileBlocks = profiles.map((profile) => formatProfile(profile));
  const header = `// This file is generated by scripts/generate-strategy-navigator.js. Do not edit manually.\n\n`;
  const typeDef = `export type StrategyProfile = {\n  title: string;\n  slug: string;\n  summary: string;\n  stages: string[];\n  goals: string[];\n  pressures: string[];\n  leadershipFocus: string[];\n  quickSignals: string[];\n  momentumMoves: string[];\n  watchOuts: string[];\n  effortLevel: 'Lean Experiment' | 'Cross-Functional Initiative' | 'Enterprise Transformation';\n  timeHorizon: 'Fast impact' | 'Medium-term shaping' | 'Long-term positioning';\n};\n\n`;
  const arrayDef = `export const strategyProfiles: StrategyProfile[] = [\n${profileBlocks.join(',\n')}\n];\n`;

  await fsp.writeFile(outputPath, `${header}${typeDef}${arrayDef}`);
  console.log(`Wrote ${profiles.length} strategy profiles to ${path.relative(projectRoot, outputPath)}`);
};

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
