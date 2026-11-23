import { cases, domains, draft, modules, skills } from './content.js';
import { challenges, evaluate, pages, recommend, resolve, restoreProgress } from './learning.js';

const key = 'sbo-academy-v1';
const empty = () => ({ read: [], evidence: [] });
const main = document.querySelector('main');
const nav = document.querySelector('nav');
let storageMessage = '';
let state = empty();
try {
  state = restoreProgress(JSON.parse(localStorage.getItem(key)));
} catch {
  storageMessage = 'Saved progress could not be loaded. This session can still be used.';
}

function persist() {
  try {
    localStorage.setItem(key, JSON.stringify(state));
    return true;
  } catch {
    storageMessage = 'Browser storage is unavailable. Changes are held for this session only.';
    return false;
  }
}

function escape(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

const lessonUrl = (module, lesson) => '#/learn/' + module.id + '/' + lesson.id;
const challengeUrl = challenge => '#/challenge/' + challenge.id;
const status = '<p class="status">' + draft + '</p>';
const link = (url, label) => '<a href="' + url + '">' + escape(label) + '</a>';
const action = (url, label) => '<a class="button" href="' + url + '">' + escape(label) + '</a>';
const section = (title, content) => '<h2>' + title + '</h2>' + content;
const list = items => '<ul>' + items.map(item => '<li>' + item + '</li>').join('') + '</ul>';

function dashboard() {
  const next = recommend(state);
  const lessonCount = modules.reduce((total, module) => total + module.lessons.length, 0);
  return `<div class="hero"><p class="eyebrow">Professional learning academy</p>
    <h1>Make better decisions about skills and work</h1>
    <p>Work through fictional organizational cases, make a decision, and build a portfolio of practice evidence.</p>
    ${action(next.url, 'Continue learning')}</div>
    <h2>Your learning</h2><div class="grid">
    <section class="card"><h3>Suggested next step</h3><p>${link(next.url, next.title)}</p><p class="muted">${next.reason}</p></section>
    <section class="card"><h3>Reading progress</h3><p id="progress-label">${state.read.length} of ${lessonCount} lessons complete</p><progress aria-labelledby="progress-label" value="${state.read.length}" max="${lessonCount}"></progress></section>
    <section class="card"><h3>Practice evidence</h3><p>${state.evidence.length} saved records</p>${link('#/portfolio', 'Open portfolio')}</section></div>`;
}

function catalog() {
  return `<h1>Learn</h1><p>Start with foundations or choose a domain to suit your work.</p>${status}
    <div class="filters"><label class="control">Search modules<input id="search" type="search"></label>
    <label class="control">Domain<select id="domain"><option value="">All domains</option>${['Foundations', ...domains].map(domain => '<option>' + escape(domain) + '</option>').join('')}</select></label></div>
    <p role="status" id="results"></p><div class="grid" id="catalog"></div>`;
}

function updateCatalog() {
  const search = document.querySelector('#search').value.trim().toLowerCase();
  const domain = document.querySelector('#domain').value;
  const shown = modules.filter(item => (!domain || item.domain === domain)
    && [item.title, item.outcome, item.domain, ...item.lessons.map(lesson => lesson.title)].join(' ').toLowerCase().includes(search));
  document.querySelector('#results').textContent = shown.length ? shown.length + (shown.length === 1 ? ' module' : ' modules') : 'No modules match your filters.';
  document.querySelector('#catalog').innerHTML = shown.map(item => `<article class="card">
    <p class="eyebrow">Module ${item.id} · ${escape(item.domain)}</p>
    <h2>${link('#/learn/' + item.id, item.title)}</h2><p>${escape(item.outcome)}</p>
    <p class="meta">${item.lessons.length} lessons · 3 challenges · ${item.minutes} min</p></article>`).join('');
}

function modulePage(module) {
  return `<article>${link('#/learn', 'All modules')}<p class="eyebrow">Module ${module.id} · ${escape(module.domain)}</p>
    <h1>${escape(module.title)}</h1><p>${escape(module.outcome)}</p>${status}
    ${module.id !== '00' ? '<p>Suggested preparation ' + link('#/learn/00', 'SBO Foundations') + '</p>' : ''}
    ${section('Lessons', list(module.lessons.map(lesson => link(lessonUrl(module, lesson), lesson.title) + ' · 5 min' +
      (state.read.includes(module.id + '/' + lesson.id) ? ' · Complete' : ''))))}
    ${section('Challenges', list(module.challenges.map(challenge => link(challengeUrl(challenge), challenge.title) + ' · 12 min')))}</article>`;
}

function lessonSources(notes) {
  if (!notes.length) return '';
  return section('Evidence and interpretation', list(notes.map(note => `
    <p>${escape(note.claim)}</p><p>${escape(note.limitation)}</p>
    <p>${link(escape(note.url), note.title)} · ${escape(note.publisher)} · ${escape(note.location)}</p>
    <p class="meta">${escape(note.evidenceType)} · ${escape(note.reviewStatus)} ${escape(note.reviewedAt)}${note.publicationDate ? ' · Published ' + escape(note.publicationDate) : ''}</p>`)));
}

function lessonPage(module, lesson) {
  const next = module.lessons[Number(lesson.id)];
  const done = state.read.includes(module.id + '/' + lesson.id);
  return `<article>${link('#/learn/' + module.id, module.title)}<p class="eyebrow">Lesson ${lesson.id} · 5 min</p>
    <h1>${escape(lesson.title)}</h1>${status}<p>${escape(lesson.body)}</p>
    ${section('Example', '<p>' + escape(lesson.example) + '</p>')}
    ${section('Limitation', '<p>' + escape(lesson.limit) + '</p>')}
    ${lessonSources(lesson.sourceClaims)}
    ${section('Knowledge check', '<p>' + escape(lesson.check) + '</p><details><summary>Show suggested answer</summary><p>' + escape(lesson.answer) + '</p></details>')}
    <div class="actions"><button type="button" id="complete" aria-pressed="${done}">${done ? 'Lesson complete' : 'Mark lesson complete'}</button>
    ${next ? link(lessonUrl(module, next), 'Next lesson') : link(challengeUrl(module.challenges[0]), 'Start module practice')}</div>
    <p id="notice" role="status"></p></article>`;
}

function challengePage(challenge) {
  const module = modules.find(item => item.id === challenge.moduleId);
  const previous = state.evidence.find(item => item.challengeId === challenge.id);
  const earlier = state.evidence.find(item => {
    const saved = challenges.find(candidate => candidate.id === item.challengeId);
    return saved?.scenarioId === challenge.scenarioId && saved.id < challenge.id;
  });
  const earlierTitle = challenges.find(item => item.id === earlier?.challengeId)?.title;
  return `<article>${link('#/learn/' + module.id, module.title)}<p class="eyebrow">Practice challenge · 12 min · 0 credits</p>
    <h1>${escape(challenge.title)}</h1>${status}<p class="muted">${escape(cases[challenge.scenarioId])}</p>
    <p>${escape(challenge.prompt)}</p><p><strong>Work product</strong> ${escape(challenge.deliverable)}</p>
    <details><summary>Show a hint</summary><p>${escape(challenge.hint)}</p></details>
    ${earlier ? `<details><summary>Review earlier practice for this case</summary>
      <p>${link('#/challenge/' + earlier.challengeId, earlierTitle)}</p><p class="work">${escape(earlier.work)}</p></details>` : ''}
    <form id="practice">
      <label class="control">Your response (use fictional data only)<textarea name="work" rows="7" maxlength="12000" required>${escape(previous?.work)}</textarea></label>
      <h2>Check your reasoning</h2><p>The rubric checks the choices below. Review the written response yourself using the feedback.</p>
      ${challenge.rubric.criteria.map((criterion, index) => {
        const order = (Number(challenge.id.slice(-1)) + index) % 2 ? [1, 0] : [0, 1];
        return `<fieldset><legend>${escape(criterion.label)}</legend><p>${escape(criterion.question)}</p>
        ${order.map(option => `<label class="option"><input type="radio" name="c${index}" value="${option}" required>${escape(criterion.options[option])}</label>`).join('')}</fieldset>`;
      }).join('')}
      <button>Get formative feedback</button>
    </form>
    <section id="feedback" tabindex="-1" aria-label="Formative feedback"></section><p id="notice" role="status"></p></article>`;
}

function feedbackBody(feedback) {
  return `<p><strong>Learning evidence confidence</strong> ${escape(feedback.confidence)}</p>
    ${list(feedback.criteria.map(item => '<strong>' + escape(item.label) + '</strong> ' + escape(item.feedback)))}
    <p class="muted">Rubric v${escape(feedback.rubricVersion)} · The result covers this practice exercise. Workplace competence and certification require separate assessment.</p>`;
}

function portfolio() {
  return `<h1>Portfolio</h1><p>Practice records are stored in this browser. Each record preserves the rubric version used.</p>
    ${state.evidence.length ? state.evidence.map(record => {
      const challenge = challenges.find(item => item.id === record.challengeId);
      if (!challenge) return '';
      return `<article class="card record"><h2>${link(challengeUrl(challenge), challenge.title)}</h2>
        <p class="meta">${escape(new Date(record.at).toLocaleDateString())} · ${escape(record.feedback.confidence)}</p>
        <details><summary>View response and feedback</summary><p class="work">${escape(record.work)}</p>${feedbackBody(record.feedback)}</details>
        <p>${link(challengeUrl(challenge), 'Revisit and reassess for 0 credits')}</p></article>`;
    }).join('') : '<p>No saved evidence yet.</p>' + action('#/challenge/00-1', 'Try the first challenge')}
    <p class="muted">This local preview supports repeat practice. Formal appeals and human review require an approved service and review owner.</p>`;
}

function skillPage() {
  return `<h1>Skills</h1><p>Explore ten skill definitions and the evidence each module helps you practise.</p>${status}
    ${domains.map(domain => section(escape(domain), '<div class="grid">' + skills.filter(skill => skill.domain === domain).map(skill =>
    `<article class="card"><h3>${link('#/learn/' + skill.moduleId, skill.name)}</h3><p>${escape(skill.definition)}</p>
    <p><strong>Scope boundary</strong> ${escape(skill.boundary)}</p><p><strong>Practice evidence</strong> ${escape(skill.evidenceTypes.join(', '))}</p>
    <details><summary>Provisional educational levels</summary>${list(skill.levels.map(([name, body]) => '<strong>' + name + '</strong> ' + body))}</details></article>`).join('') + '</div>')).join('')}`;
}

function lab() {
  return `<h1>Skills Lab</h1><p>Choose a scenario and practise with fixed formative feedback. AI mentoring is disabled in this local release.</p>
    ${status}${modules.map(module => section(escape(module.title), list(module.challenges.map(challenge => link(challengeUrl(challenge), challenge.title))))).join('')}`;
}

function sources() {
  return `<article><h1>Sources</h1>${status}<p>Lessons are editorial drafts. Some include checked source notes with a direct link, the claim it supports and the limits of that evidence.</p>
    ${section('Lessons with checked sources', list(modules.flatMap(module => module.lessons
      .filter(lesson => lesson.sourceClaims.length)
      .map(lesson => link(lessonUrl(module, lesson), lesson.title)))))}
    ${section('Fictional cases', list(Object.values(cases).map(escape)))}
    ${section('Review process', '<p>A proposed source must be checked, editorially reviewed and approved before publication. Register the claim, publisher, URL, publication and review dates, evidence type, limitations and approval owner.</p>')}</article>`;
}

function profile() {
  return `<article><h1>Profile</h1><p>This preview uses browser storage for reading progress and practice evidence. It creates no account and sends no learning data to a service. Use fictional inputs only.</p>
  <div class="actions"><button id="export" type="button">Export local data</button><button id="clear" class="secondary" type="button">Delete local data</button></div>
  <dialog id="confirm" aria-labelledby="delete-title"><h2 id="delete-title">Delete local data?</h2>
    <p>This removes reading progress and evidence saved in this browser.</p><form method="dialog" class="actions">
    <button class="secondary" value="cancel" autofocus>Cancel</button><button value="delete">Delete data</button></form></dialog>
  <p id="notice" role="status"></p></article>`;
}

function bindPractice(challenge) {
  const form = document.querySelector('#practice');
  const output = document.querySelector('#feedback');
  const notice = document.querySelector('#notice');
  let pending;
  form.oninput = () => {
    if (pending) {
      pending = undefined;
      output.innerHTML = '';
      notice.textContent = 'Response changed. Request feedback again before saving.';
    }
  };
  form.onsubmit = event => {
    event.preventDefault();
    const data = new FormData(form);
    const work = String(data.get('work')).trim();
    if (!work) {
      notice.textContent = 'Enter a response before requesting feedback.';
      form.elements.work.focus();
      return;
    }
    pending = {
      challengeId: challenge.id,
      skillIds: challenge.skillIds,
      at: new Date().toISOString(),
      work,
      feedback: evaluate(challenge, challenge.rubric.criteria.map((_, index) => Number(data.get('c' + index)))),
    };
    output.innerHTML = '<h2>Formative feedback</h2>' + feedbackBody(pending.feedback) +
      '<div class="actions"><button id="save" type="button">Save evidence</button>' + link('#/portfolio', 'View portfolio') + '</div>';
    notice.textContent = '';
    output.focus();
    document.querySelector('#save').onclick = () => {
      if (!pending) return;
      state.evidence.unshift(pending);
      pending = undefined;
      notice.textContent = persist() ? 'Evidence saved to your portfolio.' : storageMessage;
      document.querySelector('#save').disabled = true;
      output.focus();
    };
  };
}

function bindProfile() {
  document.querySelector('#export').onclick = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'academy-learning-data.json';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const dialog = document.querySelector('#confirm');
  document.querySelector('#clear').onclick = () => {
    dialog.returnValue = 'cancel';
    dialog.showModal();
  };
  dialog.onclose = () => {
    if (dialog.returnValue !== 'delete') return;
    const notice = document.querySelector('#notice');
    try {
      localStorage.removeItem(key);
      state = empty();
      notice.textContent = 'Local learning data deleted.';
    } catch {
      notice.textContent = 'Could not delete browser storage. Clear this site’s data in your browser settings.';
    }
  };
}

function render(moveFocus = false) {
  const route = resolve(location.hash);
  const {page, module, lesson, challenge} = route;
  const current = ({ module: 'learn', lesson: 'learn', challenge: 'lab' })[page] ?? page;
  nav.innerHTML = Object.entries(pages).map(([id, label]) =>
    `<a href="#/${id}"${current === id ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  const views = {
    dashboard, learn: catalog, skills: skillPage, lab, sources, portfolio, profile,
    module: () => modulePage(module), lesson: () => lessonPage(module, lesson),
    challenge: () => challengePage(challenge),
    missing: () => '<h1>Page unavailable</h1><p>Choose an available module from the catalog.</p>' + action('#/learn', 'View modules'),
  };
  main.innerHTML = (storageMessage ? '<p role="status">' + escape(storageMessage) + '</p>' : '') + views[page]();
  document.title = (lesson?.title ?? challenge?.title ?? module?.title ?? pages[page] ?? 'Page unavailable') + ' · Skills-Based Organization Academy';
  if (page === 'learn') {
    document.querySelector('#search').oninput = updateCatalog;
    document.querySelector('#domain').onchange = updateCatalog;
    updateCatalog();
  }
  if (page === 'lesson') {
    const id = module.id + '/' + lesson.id;
    const button = document.querySelector('#complete');
    button.onclick = () => {
      const complete = !state.read.includes(id);
      state.read = complete ? [...state.read, id] : state.read.filter(item => item !== id);
      button.textContent = complete ? 'Lesson complete' : 'Mark lesson complete';
      button.setAttribute('aria-pressed', complete);
      document.querySelector('#notice').textContent = persist() ? 'Reading progress updated.' : storageMessage;
    };
  }
  if (page === 'challenge') bindPractice(challenge);
  if (page === 'profile') bindProfile();
  if (moveFocus) {
    const heading = main.querySelector('h1');
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
}

document.querySelector('.skip').addEventListener('click', event => {
  event.preventDefault();
  main.focus();
  main.scrollIntoView();
});
window.addEventListener('hashchange', () => render(true));
render();
