import { modules } from './content.js';

export const pages = {
  dashboard: 'Dashboard', learn: 'Learn', skills: 'Skills', lab: 'Skills Lab',
  portfolio: 'Portfolio', sources: 'Sources', profile: 'Profile',
};
export const challenges = modules.flatMap(module => module.challenges);

export function resolve(hash) {
  const path = hash || '#/dashboard';
  if (!path.startsWith('#/')) return { page: 'missing' };
  const [page, id, lessonId, ...rest] = path.slice(2).split('/');
  if (rest.length === 0 && page === 'learn' && id) {
    const module = modules.find(item => item.id === id);
    const lesson = module?.lessons.find(item => item.id === lessonId);
    if (module && (lessonId === undefined || lesson)) return { page: lesson ? 'lesson' : 'module', module, lesson };
  }
  if (page === 'challenge' && id && lessonId === undefined) {
    const challenge = challenges.find(item => item.id === id);
    if (challenge) return { page, challenge };
  }
  if (Object.hasOwn(pages, page) && id === undefined) return { page };
  return { page: 'missing' };
}

export function restoreProgress(value) {
  const read = Array.isArray(value?.read) ? value.read : [];
  const evidence = Array.isArray(value?.evidence) ? value.evidence : [];
  const drafts = Object.fromEntries(challenges.flatMap(challenge => {
    const work = value?.drafts?.[challenge.id];
    return typeof work === 'string' && work.length <= 12000 ? [[challenge.id, work]] : [];
  }));
  return {
    drafts,
    read: [...new Set(read.filter(id => typeof id === 'string' && resolve('#/learn/' + id).page === 'lesson'))],
    evidence: evidence.filter(record => {
      const feedback = record?.feedback;
      return typeof record?.challengeId === 'string'
        && typeof record.at === 'string'
        && Number.isFinite(Date.parse(record.at))
        && typeof record.work === 'string'
        && typeof feedback?.rubricVersion === 'string'
        && typeof feedback.confidence === 'string'
        && Array.isArray(feedback.criteria)
        && feedback.criteria.length > 0
        && feedback.criteria.every(item => typeof item?.label === 'string' && typeof item.feedback === 'string');
    }),
  };
}

export function evaluate(challenge, choices) {
  if (choices.length !== challenge.rubric.criteria.length || Array.from(choices).some(choice => choice !== 0 && choice !== 1)) {
    throw new TypeError('Choose an answer for every criterion.');
  }
  const criteria = challenge.rubric.criteria.map(({label, strong, revise}, index) => ({
    label, supported: choices[index] === 0, feedback: choices[index] === 0 ? strong : revise,
  }));
  const count = criteria.filter(item => item.supported).length;
  return {
    rubricVersion: challenge.rubric.version,
    criteria,
    confidence: count === criteria.length ? 'Well supported' : count > 0 ? 'Partially supported' : 'Insufficient',
  };
}

export function recommend({read, evidence}) {
  for (const module of modules) {
    const lesson = module.lessons.find(item => !read.includes(module.id + '/' + item.id));
    if (lesson) return { url: '#/learn/' + module.id + '/' + lesson.id, title: lesson.title, reason: 'First unread lesson in the suggested sequence.' };
    const challenge = module.challenges.find(item => !evidence.some(record => record.challengeId === item.id));
    if (challenge) return { url: '#/challenge/' + challenge.id, title: challenge.title, reason: 'First challenge without saved practice evidence in this module.' };
  }
  return { url: '#/portfolio', title: 'Review portfolio', reason: 'You have reading and practice records for every module.' };
}
