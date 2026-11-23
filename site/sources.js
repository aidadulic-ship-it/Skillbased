const oecd = {
  title: 'Empowering the Workforce in the Context of a Skills-First Approach',
  publisher: 'OECD',
  publicationDate: '2025-06-24',
  url: 'https://www.oecd.org/en/publications/empowering-the-workforce-in-the-context-of-a-skills-first-approach_345b6528-en/full-report.html',
  evidenceType: 'Policy report',
};

const esco = {
  title: 'The ESCO Classification',
  publisher: 'European Commission',
  publicationDate: null,
  url: 'https://esco.ec.europa.eu/en/classification',
  evidenceType: 'Official classification documentation',
};

export const sourcesByLesson = {
  '00/1': [{ ...oecd, id: 'sbo-definition', location: 'Chapter 1',
    claim: 'The OECD describes a skills-first approach as prioritising what people can do over traditional credentials in relevant labour-market decisions.',
    limitation: 'The Academy applies this idea to selected decisions about work. The report does not establish that every organization benefits from the same operating model.',
  }],
  '00/2': [{ ...esco, id: 'sbo-distinctions', location: 'Occupations and skills pillars',
    claim: 'ESCO represents occupations and skills as distinct concepts and links them in a common classification.',
    limitation: 'The Academy’s four-way distinction between job, role, task and skill is a teaching model. ESCO does not establish that exact definition set.',
  }, {
    id: 'sbo-work-activities', title: 'O*NET Database 30.0 Data Dictionary', publisher: 'National Center for O*NET Development',
    publicationDate: '2025-08', url: 'https://www.onetcenter.org/dl_files/database/db_30_0_dictionary.pdf',
    evidenceType: 'Official database documentation', location: 'Skills to Work Activities, p. 66',
    claim: 'O*NET stores links between skill concepts and relevant work activities.',
    limitation: 'A link describes an occupational relationship. It provides no individual proficiency assessment.',
  }],
  '00/3': [{
    id: 'sbo-implementation', title: 'Skills-Based Hiring: The Long Road from Pronouncements to Practice',
    publisher: 'Harvard Business School Project on Managing the Future of Work and Burning Glass Institute',
    publicationDate: '2024-02', url: 'https://pw.hks.harvard.edu/post/skills-based-hiring-the-long-road-from-pronouncements-to-practice',
    evidenceType: 'Joint research report, findings summarised by an author', location: 'Summary of hiring outcomes',
    claim: 'The authors found that actual hiring changes were uneven among employers that removed degree requirements.',
    limitation: 'The study concerns hiring practices. It cannot estimate the effect of technician training on downtime at NOVA.',
  }],
  '00/4': [{ ...oecd, id: 'sbo-risks', location: 'Chapter 3, section 3.2',
    claim: 'The report identifies possible gains in access to opportunities alongside risks such as new biases, weaker worker protections and lower professional standards.',
    limitation: 'These are context-dependent risks and opportunities. The report does not measure their frequency in a NOVA-style pilot.',
  }],
  '00/5': [{ ...oecd, id: 'sbo-model-choice', location: 'Chapter 3, sections 3.2–3.3',
    claim: 'The report describes skills-first practices as varying across industries and organizations and identifies the need to protect professional standards.',
    limitation: 'The three operating options in the lesson are Academy recommendations. The report does not rank them for a particular organization.',
  }],
};

for (const notes of Object.values(sourcesByLesson)) {
  for (const note of notes) {
    note.reviewStatus = 'Source checked';
    note.reviewedAt = '2026-11-23';
  }
}
