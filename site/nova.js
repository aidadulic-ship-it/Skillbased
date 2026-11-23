export const novaId = '00-2';

const copy = {
  title: ['The night-shift decision', 'Die Entscheidung für die Nachtschicht'],
  promise: ['Find the bottleneck before you fund the fix.', 'Erst den Engpass finden. Dann investieren.'],
  audience: ['For HR and plant leaders in mid-sized manufacturing. Practise making a go, no-go or pilot recommendation before spending on training or a skills platform.', 'Für HR- und Werksleitungen im produzierenden Mittelstand. Übe, wie du vor einer Investition in Training oder eine Skills-Plattform eine Entscheidung für Umsetzung, Stopp oder Pilotprojekt begründest.'],
  start: ['Start the executive case', 'Executive-Fall starten'],
  brief: ['Decision brief', 'Entscheidungsvorlage'],
  situation: ['NOVA Manufacturing is fictional. The COO can allocate up to €24,000 and 80 staff hours over six weeks to reduce repair delays. One workstation is responsible for most of the difference between shifts. Finance wants a recommendation on Friday.', 'NOVA Manufacturing ist fiktiv. Die Geschäftsführung kann bis zu 24.000 € und 80 Personalstunden über sechs Wochen einsetzen, um Reparaturzeiten zu senken. Auf eine Anlage entfällt der größte Teil des Unterschieds zwischen den Schichten. Am Freitag erwartet Finance eine Empfehlung.'],
  limitation: ['The figures cover four weeks at one plant. Waiting time and total repair time are separate medians and cannot be subtracted to estimate diagnostic time. Fault mix and time to diagnose were not recorded.', 'Die Zahlen beziehen sich auf vier Wochen in einem Werk. Wartezeit und Reparaturdauer sind getrennte Medianwerte. Ihre Differenz ergibt keine Diagnosezeit. Störungsarten und Diagnosezeiten wurden nicht erfasst.'],
  evidence: ['Evidence', 'Datengrundlage'],
  metric: ['Measure', 'Kennzahl'],
  day: ['Day shift', 'Tagschicht'],
  night: ['Night shift', 'Nachtschicht'],
  options: ['Three options for the COO', 'Drei Optionen für die Geschäftsführung'],
  select: ['Choose a recommendation', 'Empfehlung auswählen'],
  memo: ['One-page decision memo', 'Einseitiges Entscheidungsmemo'],
  instruction: ['Compare two measures across the shifts. Explain what they support, give a credible alternative explanation and name one observation that would change your recommendation. Specify the owner, cost, timing and stop rule.', 'Vergleiche zwei Kennzahlen zwischen den Schichten. Erkläre, was sie stützen, nenne eine plausible alternative Erklärung und beschreibe, welcher neue Befund deine Empfehlung ändern würde. Benenne Verantwortung, Kosten, Zeitrahmen und Abbruchkriterium.'],
  draft: ['The draft is saved in this browser.', 'Der Entwurf wird in diesem Browser gespeichert.'],
  review: ['Review my decision', 'Meine Entscheidung prüfen'],
  feedback: ['Compare with the executive review', 'Mit der Management-Review abgleichen'],
  how: ['Read the review alongside your memo. Check whether your evidence supports your choice and revise where necessary. The review is based on your selected option. You assess your written reasoning yourself.', 'Lies die Review neben deinem Memo. Prüfe, ob deine Nachweise die Empfehlung tragen, und überarbeite sie bei Bedarf. Die Review bezieht sich auf deine gewählte Option. Deine schriftliche Begründung prüfst du selbst.'],
  crosscheck: ['Compare the 35-minute difference in median parts waits with the weaker diagnostic coverage on nights. Both deserve investigation. Neither proves what caused the difference in repair times.', 'Vergleiche die um 35 Minuten längere mediane Wartezeit auf Ersatzteile mit der schwächeren diagnostischen Abdeckung nachts. Beides verdient eine Prüfung. Aus keiner der beiden Kennzahlen lässt sich die Ursache für die längeren Reparaturen ableiten.'],
  stop: ['Define the review date and a decision threshold before starting. State who will record fault type, diagnostic timestamps and parts availability by shift.', 'Lege vor dem Start einen Prüftermin und eine Entscheidungsschwelle fest. Kläre, wer Störungsart, Diagnosezeitpunkte und Ersatzteilverfügbarkeit je Schicht erfasst.'],
  save: ['Save reviewed memo to portfolio', 'Geprüftes Memo im Portfolio speichern'],
  saved: ['Memo saved to your portfolio.', 'Memo im Portfolio gespeichert.'],
  selectEmpty: ['Select an option', 'Option auswählen'],
  selfReview: ['Guided self-review', 'Angeleitete Selbstprüfung'],
  recommend: ['Review the NOVA evidence and submit your first decision.', 'Prüfe die NOVA-Daten und halte deine erste Entscheidung fest.'],
  learning: ['Useful preparation', 'Passende Vertiefung'],
  figuresFound: ['The text check recognized figures from at least two rows of the case table. Verify that each figure is correctly attributed to its shift and supports your argument.', 'Im Text wurden Zahlen aus mindestens zwei Zeilen der Falltabelle erkannt. Prüfe, ob jede Zahl der richtigen Schicht zugeordnet ist und dein Argument stützt.'],
  figuresMissing: ['The text check found figures from fewer than two rows. Cite two distinct measures from the case table so the COO can trace your reasoning. Written-out numbers and derived figures may not be detected.', 'Im Text wurden Zahlen aus weniger als zwei Tabellenzeilen erkannt. Zitiere zwei unterschiedliche Kennzahlen aus der Falltabelle, damit die Geschäftsführung deine Begründung nachvollziehen kann. Ausgeschriebene Zahlen und abgeleitete Werte werden möglicherweise nicht erkannt.'],
  figureCheck: ['Figures in your memo', 'Kennzahlen in deinem Memo'],
  invalid: ['Write your recommendation before opening the review.', 'Schreibe deine Empfehlung, bevor du die Review öffnest.'],
};

export const metrics = [
  [['Repair incidents', 'Reparaturfälle'], '48', '36'],
  [['Median repair time', 'Mediane Reparaturdauer'], '46 min', '91 min'],
  [['Median parts wait', 'Mediane Wartezeit auf Ersatzteile'], '12 min', '47 min'],
  [['Technicians with documented diagnostic practice', 'Techniker:innen mit dokumentierter Diagnosepraxis'], '6 / 8', '2 / 7'],
];

export const options = [
  { id: 'training', title: ['Go: targeted diagnostic training', 'Go: gezieltes Diagnosetraining'], cost: '€20,000 · 72 h', review: ['Training is defensible if comparable faults still take longer to diagnose when parts are available. Specify supervised practice and how the plant will measure diagnosis time. If waits explain most of the delay, the training spend has a weak case.', 'Training ist vertretbar, wenn vergleichbare Störungen auch bei verfügbaren Ersatzteilen länger zu diagnostizieren sind. Plane beaufsichtigte Übungen und lege fest, wie das Werk die Diagnosezeit misst. Erklärt die Wartezeit den größten Teil der Verzögerung, ist die Investition in Training schwach begründet.'] },
  { id: 'parts', title: ['No-go on training: change parts access', 'No-Go für Training: Ersatzteilzugang verbessern'], cost: '€14,000 · 48 h', review: ['Improving parts access is defensible if missing stock or access restrictions explain recurring waits. Check whether the repair gap persists after access improves, especially for comparable faults. Coverage may still need attention.', 'Ein besserer Ersatzteilzugang ist vertretbar, wenn fehlender Bestand oder eingeschränkter Zugang die wiederkehrenden Wartezeiten erklären. Prüfe danach bei vergleichbaren Störungen, ob der Unterschied in der Reparaturzeit bleibt. Die Kompetenzabdeckung kann weiterhin Handlungsbedarf zeigen.'] },
  { id: 'pilot', title: ['Pilot: isolate both hypotheses', 'Pilot: beide Hypothesen getrennt prüfen'], cost: '€8,000 · 40 h', review: ['A short pilot buys better information but delays a wider intervention. Log repair stages separately and compare like-for-like faults. Define what evidence would justify training, improve parts access or end the pilot without further spending.', 'Ein kurzer Pilot schafft eine bessere Datengrundlage und verschiebt eine größere Maßnahme. Erfasse die Reparaturphasen getrennt und vergleiche ähnliche Störungen. Lege fest, welche Befunde ein Training, besseren Ersatzteilzugang oder das Ende des Piloten ohne weitere Ausgaben rechtfertigen.'] },
];

export const novaText = (key, language) => copy[key][language === 'de' ? 1 : 0];
export const novaPair = (pair, language) => pair[language === 'de' ? 1 : 0];

export function reviewNova(optionId, memo) {
  const option = options.find(item => item.id === optionId);
  if (!option) return null;
  const figures = new Set(memo.match(/\b[0-9]+\b/g));
  const pairedRows = metrics.slice(0, 3).map(([, day, night]) => [day, night].map(value => value.split(' ')[0]));
  const compared = pairedRows.filter(row => row.every(figure => figures.has(figure))).length
    + Number(/\b6\s*\/\s*8\b|\b2\s*\/\s*7\b/.test(memo));
  return {
    rubricVersion: 'NOVA 2.0',
    confidence: copy.selfReview[0],
    criteria: [
      { label: copy.select[0], feedback: option.review[0] },
      { label: copy.figureCheck[0], feedback: copy[compared >= 2 ? 'figuresFound' : 'figuresMissing'][0] },
      { label: copy.evidence[0], feedback: copy.crosscheck[0] },
      { label: 'Review and stop rule', feedback: copy.stop[0] },
    ],
  };
}

export function translateNova(text) {
  if (text === 'Review and stop rule') return 'Prüftermin und Abbruchkriterium';
  return [...Object.values(copy), ...options.map(option => option.review)].find(pair => pair[0] === text)?.[1];
}
