import { curriculum } from './curriculum.js';
import { sourcesByLesson } from './sources.js';

export const draft = 'Editorial draft — source verification pending';
export const domains = [
  'Strategy & Transformation', 'Skills Intelligence', 'Workforce & Talent',
  'Learning & Development', 'Human–AI & Governance',
];
const skillDetails = [
  ['strategy','Connect an operating problem to a testable skills intervention.','Enterprise strategy approval','Pilot business case'],
  ['transformation','Assign decision rights and adapt a change pilot using evidence.','Authority to change employment terms','Operating model and review memo'],
  ['taxonomy','Define and maintain a controlled skills vocabulary.','Comprehensive occupational standards','Versioned vocabulary'],
  ['gap-analysis','Estimate coverage gaps with explicit evidence and uncertainty.','Verified competence of individuals','Prioritized gap analysis'],
  ['workforce-planning','Translate work scenarios into options for capacity and coverage.','Binding hiring decisions','Scenario and trigger plan'],
  ['mobility','Build transparent matching, selection and release processes.','Individual appointment authority','Opportunity and selection rubric'],
  ['learning-design','Design measurable practice and evaluate transfer.','Accredited qualification design','Practice and evaluation plan'],
  ['assessment','Assess learning evidence with anchored criteria and review.','Formal occupational certification','Calibrated rubric and appeal record'],
  ['human-ai','Delegate tasks between people and AI with defined safeguards.','Autonomous employment decisions','Task map and oversight plan'],
  ['governance','Define permissible use, accountability and remedies for skills information.','Legal determinations','Governance and incident plan'],
];

export const skills = skillDetails.map(([id, definition, boundary, evidence], index) => ({
  id, definition, boundary, evidenceTypes: [evidence], version: 1, owner: 'Academy editorial role',
  name: curriculum[index + 1][0], domain: domains[Math.floor(index / 2)],
  moduleId: String(index + 1).padStart(2, '0'),
  levels: [
    ['Foundation', 'Explain the concepts and identify a relevant example.'],
    ['Practitioner', 'Produce the specified work product for a bounded scenario.'],
    ['Advanced', 'Compare contexts and defend adaptations using diverse evidence.'],
    ['Strategic Expert', 'Evaluate competing approaches and define oversight at organizational scale.'],
  ],
}));

export const cases = {
  nova: 'NOVA Manufacturing is fictional. It has 180 staff at two sites and is considering a six-month skills pilot during modernization. HR and manager capacity are limited.',
  atlas: 'ATLAS Global is fictional. It has 30,000 staff, regional operating differences and shared taxonomy governance challenges.',
};

export const modules = curriculum.map(([title, outcome, lessons, challenges], index) => {
  const id = String(index).padStart(2, '0');
  const skill = skills[index - 1];
  return {
    id, title, outcome, domain: skill?.domain ?? 'Foundations', skillIds: skill ? [skill.id] : [],
    minutes: lessons.length * 5 + challenges.length * 12,
    audience: 'HR, L&D, workforce planners and leaders', prerequisites: index ? ['00'] : [],
    status: draft, version: 1,
    lessons: lessons.map(([title, body, example, limit, check, answer], position) => ({
      id: String(position + 1), title, body, example, limit, check, answer, status: draft, minutes: 5,
      sourceClaims: sourcesByLesson[id + '/' + (position + 1)] ?? [],
    })),
    challenges: challenges.map(([title, prompt, deliverable, hint, supported, weak], position) => ({
      id: id + '-' + (position + 1), moduleId: id, title, prompt, deliverable, hint,
      status: draft, version: 1, minutes: 12, scenarioId: prompt.includes('ATLAS') ? 'atlas' : 'nova',
      skillIds: skill ? [skill.id] : [],
      rubric: {
        version: '1.0',
        criteria: [
          { label: 'Decision quality', question: 'Which approach should guide your response?', options: [supported, weak],
            strong: 'Your selected approach addresses the decision in the scenario.',
            revise: 'Reconsider your approach. ' + hint },
          { label: 'Evidence quality', question: 'How will you support your decision?',
            options: ['Use scenario evidence and flag important missing information', 'Treat all assumptions as established facts'],
            strong: 'You distinguished evidence from assumptions.',
            revise: 'Identify a specific observation and explain what remains uncertain.' },
          { label: 'Tradeoffs and next step', question: 'How will you make the response actionable?',
            options: ['Name a tradeoff, an owner and a review condition', 'State the preferred outcome without a review condition'],
            strong: 'You selected a way to make tradeoffs and follow-up visible.',
            revise: 'State who acts, what might go wrong and when the decision should be revisited.' },
        ],
      },
    })),
  };
});
