import assert from 'node:assert/strict';
import { test } from 'node:test';
import { modules, skills, draft } from '../site/content.js';
import { resolve, evaluate, recommend, restoreProgress } from '../site/learning.js';

test('curriculum has 11 modules, 10 skills and 33 unique authored challenges', () => {
  assert.equal(modules.length, 11);
  assert.equal(skills.length, 10);
  assert.equal(new Set(skills.map(skill => skill.id)).size, 10);
  const challenges = modules.flatMap(module => module.challenges);
  assert.equal(challenges.length, 33);
  assert.equal(new Set(challenges.map(challenge => challenge.id)).size, 33);
  for (const module of modules) {
    assert.equal(module.challenges.length, 3);
    assert.equal(module.status, draft);
    assert.ok(module.lessons.length >= 5);
    assert.ok(module.skillIds.every(id => skills.some(skill => skill.id === id)));
    for (const lesson of module.lessons) {
      assert.ok(lesson.body.length > 60);
      for (const field of ['example', 'limit', 'check', 'answer']) assert.ok(lesson[field]);
      assert.equal(lesson.status, draft);
      assert.equal(resolve(`#/learn/${module.id}/${lesson.id}`).lesson, lesson);
    }
    for (const challenge of module.challenges) {
      assert.equal(challenge.status, draft);
      assert.ok(challenge.prompt && challenge.deliverable && challenge.hint);
      assert.equal(resolve(`#/challenge/${challenge.id}`).challenge, challenge);
    }
  }
});

test('navigation resolves valid links and handles missing identifiers', () => {
  for (const page of ['dashboard', 'learn', 'skills', 'lab', 'portfolio', 'sources', 'profile']) {
    assert.equal(resolve('#/' + page).page, page);
  }
  assert.equal(resolve('#/learn/99').page, 'missing');
  assert.equal(resolve('#/challenge/99-1').page, 'missing');
});

test('feedback applies each rubric criterion and remains formative', () => {
  const challenge = modules[0].challenges[0];
  const feedback = evaluate(challenge, [0, 1, 0]);
  assert.equal(feedback.criteria.length, 3);
  assert.deepEqual(feedback.criteria.map(item => item.supported), [true, false, true]);
  assert.equal(feedback.confidence, 'Partially supported');
  assert.throws(() => evaluate(challenge, [0]), /criterion/);
});

test('recommendations consider completed reading and evidence', () => {
  assert.equal(recommend({read: [], evidence: []}).url, '#/learn/00/1');
  const read = modules[0].lessons.map(lesson => '00/' + lesson.id);
  assert.equal(recommend({read, evidence: []}).url, '#/challenge/00-1');
  assert.equal(recommend({read, evidence: [{challengeId:'00-1'}]}).url, '#/challenge/00-2');
});

test('does not resolve malformed or non-route anchors', () => {
  for (const hash of ['#main', 'xxlearn', '#/learn/00/', '#/learn/00/1/more', '#/challenge/00-1/']) {
    assert.equal(resolve(hash).page, 'missing');
  }
});

test('saved feedback remains independent of subsequent reassessment', () => {
  const challenge = modules[8].challenges[0];
  const saved = evaluate(challenge, [0, 0, 0]);
  const reassessed = evaluate(challenge, [1, 1, 1]);
  assert.equal(saved.confidence, 'Well supported');
  assert.equal(reassessed.confidence, 'Insufficient');
  assert.equal(saved.rubricVersion, '1.0');
});

test('saved state retains older records and recovers from malformed entries', () => {
  const challenge = modules[0].challenges[0];
  const record = {
    challengeId: challenge.id,
    at: '2026-11-23T00:00:00.000Z',
    work: 'A fictional response.',
    feedback: evaluate(challenge, [0, 1, 1]),
  };
  const previous = {
    read: ['00/1', '00/1', 'missing/1', null],
    drafts: { '00-1': '', '00-2': 'Draft memo', '00-3': false, '99-1': 'Obsolete' },
    evidence: [null, { ...record, feedback: {} }, record],
  };
  assert.deepEqual(restoreProgress(previous), { read: ['00/1'], evidence: [record], drafts: { '00-1': '', '00-2': 'Draft memo' } });
  assert.deepEqual(restoreProgress({ evidence: [record] }), { read: [], evidence: [record], drafts: {} });
});

test('foundations source notes identify evidence, limits and review status', () => {
  const notes = modules.flatMap(module => module.lessons.flatMap(lesson => lesson.sourceClaims));
  assert.equal(new Set(notes.map(note => note.id)).size, notes.length);
  for (const lesson of modules[0].lessons) {
    assert.ok(lesson.sourceClaims.length, lesson.title);
    for (const note of lesson.sourceClaims) {
      assert.equal(new URL(note.url).protocol, 'https:');
      assert.equal(note.reviewStatus, 'Source checked');
      assert.ok(note.publisher && note.claim && note.limitation && note.reviewedAt);
    }
    assert.equal(lesson.status, draft);
  }
});

test('German catalogue covers the complete curriculum and formative feedback', async () => {
  const { germanContent } = await import('../site/de-content.js');
  const { curriculum } = await import('../site/curriculum.js');
  const { cases, domains } = await import('../site/content.js');
  const check = text => assert.ok(Object.hasOwn(germanContent, text) && germanContent[text].trim(), text);
  curriculum.flat(Infinity).forEach(check);
  Object.values(cases).forEach(check);
  domains.forEach(check);
  for (const module of modules) {
    for (const challenge of module.challenges) {
      for (const criterion of challenge.rubric.criteria) {
        [criterion.label, criterion.question, ...criterion.options, criterion.strong, criterion.revise].forEach(check);
      }
    }
    for (const lesson of module.lessons) {
      for (const source of lesson.sourceClaims) [source.claim, source.limitation, source.location, source.evidenceType].forEach(check);
    }
  }
});
