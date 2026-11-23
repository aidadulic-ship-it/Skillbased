import { mkdir, writeFile } from 'node:fs/promises';
import { cases, draft, modules, skills } from '../site/content.js';

const folder = new URL('../curriculum/', import.meta.url);
await mkdir(folder, { recursive: true });

const moduleLink = module => `[${module.id} · ${module.title}](./${module.id}.md)`;
const index = [
  '# Skills-Based Organization Academy',
  draft,
  'Read the lessons and try the fictional case exercises in your preferred order. The suggested path starts with Foundations.',
  ...modules.map(module => `- ${moduleLink(module)} · ${module.lessons.length} lessons · ${module.challenges.length} challenges`),
  '## Fictional cases',
  ...Object.values(cases).map(context => `- ${context}`),
];
await writeFile(new URL('README.md', folder), index.join('\n\n') + '\n');

for (const module of modules) {
  const relatedSkills = skills.filter(skill => module.skillIds.includes(skill.id));
  const content = [
    '[All modules](./README.md)',
    `# ${module.id} · ${module.title}`,
    draft,
    `**Learning outcome** — ${module.outcome}`,
    ...relatedSkills.map(skill => `**Skill** — ${skill.name}. ${skill.definition}\n\n**Scope boundary** — ${skill.boundary}.\n\n**Practice evidence** — ${skill.evidenceTypes.join(', ')}.`),
    '## Lessons',
    ...module.lessons.flatMap(lesson => [
      `### ${lesson.title}`, lesson.body,
      `**Example** — ${lesson.example}`, `**Limitation** — ${lesson.limit}`,
      ...lesson.sourceClaims.map(note => `**${note.reviewStatus} · ${note.reviewedAt}** — ${note.claim} ${note.limitation} [${note.title}](${note.url}) · ${note.publisher} · ${note.location} · ${note.evidenceType}${note.publicationDate ? ' · Published ' + note.publicationDate : ''}`),
      `**Knowledge check** — ${lesson.check}`,
      `<details>\n<summary>Suggested answer</summary>\n\n${lesson.answer}\n\n</details>`,
    ]),
    '## Challenges',
    ...module.challenges.flatMap(challenge => [
      `### ${challenge.title}`,
      cases[challenge.scenarioId],
      challenge.prompt,
      `**Work product** — ${challenge.deliverable}`,
      `<details>\n<summary>Hint</summary>\n\n${challenge.hint}\n\n</details>`,
      `<details>\n<summary>Review criteria · Rubric ${challenge.rubric.version}</summary>\n\n${challenge.rubric.criteria.map(criterion => `- **${criterion.label}** — ${criterion.options[0]}. ${criterion.revise}`).join('\n')}\n\n</details>`,
    ]),
    '[All modules](./README.md)',
  ];
  await writeFile(new URL(module.id + '.md', folder), content.join('\n\n') + '\n');
}
