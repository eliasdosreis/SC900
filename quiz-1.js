/* ============================================================
   SC-900 · MODULE 1 QUIZ (English Mode)
   10 questions · Most-tested topics · Vocabulary training
   ============================================================
   NOTE: These are original practice questions written to cover
   the official SC-900 Module 1 objectives (study guide).
   They are inspired by the most-tested topics, NOT exam dumps.
   ============================================================ */

/* ---------- Questions Data ---------- */
const QUESTIONS = [
  {
    topic: 'Zero Trust',
    question: 'Which statement best describes the Zero Trust security model?',
    pt: 'Qual declaração melhor descreve o modelo de segurança Zero Trust?',
    options: [
      { en: 'Trust users and devices once they are inside the corporate network.', pt: 'Confiar em usuários e dispositivos quando estão dentro da rede.' },
      { en: 'Never trust, always verify — regardless of location.', pt: 'Nunca confiar, sempre verificar — independentemente da localização.' },
      { en: 'Trust all traffic that passes through the perimeter firewall.', pt: 'Confiar em todo tráfego que passa pelo firewall de perímetro.' },
      { en: 'Only verify users who connect from outside the office.', pt: 'Verificar apenas usuários que se conectam de fora do escritório.' },
    ],
    correct: 1,
    explain:
      '<strong>Zero Trust = "Never trust, always verify."</strong> Location (inside or outside the network) does <em>not</em> grant trust. Every request must be authenticated and authorized explicitly.',
    ptNote:
      'Dica: No Zero Trust não existe "dentro" ou "fora" — toda solicitação deve ser verificada. As outras opções descrevem o modelo antigo (perímetro/castelo).',
  },
  {
    topic: 'Zero Trust · Principles',
    question: 'Giving a user only the minimum access needed to perform their job is called:',
    pt: 'Conceder a um usuário apenas o acesso mínimo necessário para realizar seu trabalho é chamado de:',
    options: [
      { en: 'Assume breach', pt: 'Assumir a violação' },
      { en: 'Verify explicitly', pt: 'Verificar explicitamente' },
      { en: 'Least privilege access', pt: 'Acesso de menor privilégio' },
      { en: 'Defense in depth', pt: 'Defesa em profundidade' },
    ],
    correct: 2,
    explain:
      '<strong>Least privilege access</strong> means granting only the minimum permissions required. It is one of the three Zero Trust principles (alongside Verify Explicitly and Assume Breach).',
    ptNote:
      'Os 3 princípios do Zero Trust: Verify Explicitly (verificar sempre), Least Privilege (mínimo acesso), Assume Breach (assumir violação).',
  },
  {
    topic: 'CIA Triad',
    question: 'A company discovers that an employee has been reading confidential emails that belong to a manager. Which pillar of the CIA triad was violated?',
    pt: 'Uma empresa descobre que um funcionário está lendo e-mails confidenciais pertencentes a um gerente. Qual pilar da tríade CIA foi violado?',
    options: [
      { en: 'Confidentiality', pt: 'Confidencialidade' },
      { en: 'Integrity', pt: 'Integridade' },
      { en: 'Availability', pt: 'Disponibilidade' },
      { en: 'Authentication', pt: 'Autenticação' },
    ],
    correct: 0,
    explain:
      '<strong>Confidentiality</strong> ensures data is accessed only by authorized people. Unauthorized <em>reading</em> of data = confidentiality breach. (Integrity = data altered; Availability = data inaccessible.)',
    ptNote:
      'Palavras-chave: ler/vazar (confidencialidade), alterar (integridade), indisponível (disponibilidade). Authentication não faz parte da tríade CIA.',
  },
  {
    topic: 'CIA Triad',
    question: 'Which control best ensures data INTEGRITY?',
    pt: 'Qual controle garante melhor a INTEGRIDADE dos dados?',
    options: [
      { en: 'Encrypting data at rest with AES-256', pt: 'Criptografar dados em repouso com AES-256' },
      { en: 'Using hashing (e.g., SHA-256) to detect changes', pt: 'Usar hash (ex.: SHA-256) para detectar alterações' },
      { en: 'Setting up a load balancer for high availability', pt: 'Configurar um balanceador de carga para alta disponibilidade' },
      { en: 'Adding a firewall to block external traffic', pt: 'Adicionar um firewall para bloquear tráfego externo' },
    ],
    correct: 1,
    explain:
      '<strong>Integrity</strong> = data has not been altered. <em>Hashing</em> (SHA-256) creates a fingerprint of the data — if even one bit changes, the hash changes, alerting you to tampering.',
    ptNote:
      'Criptografia protege confidencialidade, balanceador protege disponibilidade, firewall é perímetro. Hash é o controle de integridade por excelência.',
  },
  {
    topic: 'Authentication vs Authorization',
    question: 'What is the difference between authentication (AuthN) and authorization (AuthZ)?',
    pt: 'Qual a diferença entre autenticação (AuthN) e autorização (AuthZ)?',
    options: [
      { en: 'AuthN checks permissions; AuthZ verifies identity.', pt: 'AuthN verifica permissões; AuthZ verifica a identidade.' },
      { en: 'AuthN verifies who you are; AuthZ decides what you can do.', pt: 'AuthN verifica quem você é; AuthZ decide o que você pode fazer.' },
      { en: 'Both terms mean the same thing.', pt: 'Ambos os termos significam a mesma coisa.' },
      { en: 'AuthZ happens before AuthN.', pt: 'AuthZ acontece antes de AuthN.' },
    ],
    correct: 1,
    explain:
      '<strong>AuthN (Authentication)</strong> answers "Who are you?" (e.g., password, MFA). <strong>AuthZ (Authorization)</strong> answers "What are you allowed to do?" (e.g., RBAC roles). AuthN ALWAYS happens first.',
    ptNote:
      'Sequência: primeiro AuthN (quem é você?), depois AuthZ (o que pode fazer?). A opção invertida é a pegadinha clássica.',
  },
  {
    topic: 'Shared Responsibility',
    question: 'Under the shared responsibility model, which of the following is ALWAYS the customer\'s responsibility in the cloud (IaaS, PaaS, or SaaS)?',
    pt: 'No modelo de responsabilidade compartilhada, qual dos itens é SEMPRE responsabilidade do cliente na nuvem (IaaS, PaaS ou SaaS)?',
    options: [
      { en: 'Physical security of the datacenter', pt: 'Segurança física do datacenter' },
      { en: 'The hypervisor and host operating system', pt: 'O hipervisor e o sistema operacional do host' },
      { en: 'Data and access control', pt: 'Dados e controle de acesso' },
      { en: 'Network firmware updates', pt: 'Atualizações de firmware da rede' },
    ],
    correct: 2,
    explain:
      '<strong>Data is ALWAYS the customer\'s responsibility</strong> — in any cloud model. You decide who can access your data, classify it, and protect it. Physical security, hypervisors, and firmware are Microsoft\'s job.',
    ptNote:
      'Regra de ouro: dados E controle de acesso = sempre do cliente. Datacenter físico = sempre da Microsoft. O resto (SO, app) depende do modelo.',
  },
  {
    topic: 'Shared Responsibility',
    question: 'A company uses Microsoft 365 (SaaS) for email. Who is responsible for patching the email server operating system?',
    pt: 'Uma empresa usa o Microsoft 365 (SaaS) para e-mail. Quem é responsável por aplicar patches no sistema operacional do servidor de e-mail?',
    options: [
      { en: 'The customer — they own the SaaS subscription', pt: 'O cliente — possui a assinatura SaaS' },
      { en: 'Microsoft — SaaS includes OS, middleware, and app maintenance', pt: 'A Microsoft — SaaS inclui manutenção de SO, middleware e app' },
      { en: 'It depends on the region of the datacenter', pt: 'Depende da região do datacenter' },
      { en: 'A third-party managed service provider', pt: 'Um provedor de serviços terceirizado' },
    ],
    correct: 1,
    explain:
      'In <strong>SaaS</strong>, the provider (Microsoft) manages everything: OS, middleware, application, and infrastructure. The customer only manages data, identities, and access. That\'s the "hotel" model.',
    ptNote:
      'No SaaS ("hotel completo"), a Microsoft cuida de quase tudo — inclusive SO. Você só cuida dos seus dados e quem acessa.',
  },
  {
    topic: 'Defense in Depth',
    question: 'In the defense-in-depth model, which layer is the MOST critical because it protects the actual information?',
    pt: 'No modelo de defesa em profundidade, qual camada é a MAIS crítica porque protege a informação em si?',
    options: [
      { en: 'The physical layer (datacenter doors, locks)', pt: 'Camada física (portas e fechaduras do datacenter)' },
      { en: 'The perimeter layer (edge firewall)', pt: 'Camada de perímetro (firewall de borda)' },
      { en: 'The data layer (encryption, classification)', pt: 'Camada de dados (criptografia, classificação)' },
      { en: 'The network layer (NSGs, segmentation)', pt: 'Camada de rede (NSGs, segmentação)' },
    ],
    correct: 2,
    explain:
      'The <strong>data layer</strong> is the innermost and most critical layer — it protects the actual asset (the information). Even if all outer layers fail, encryption keeps data unreadable to attackers.',
    ptNote:
      'A camada de DADOS é o "cofre dentro do cofre". É a mais interna e protege o tesouro final — a informação.',
  },
  {
    topic: 'Identity Concepts',
    question: 'What is the main purpose of Single Sign-On (SSO)?',
    pt: 'Qual é o principal objetivo do Single Sign-On (SSO)?',
    options: [
      { en: 'To encrypt user passwords before storing them', pt: 'Criptografar senhas de usuário antes de armazená-las' },
      { en: 'To allow one authentication to access multiple applications', pt: 'Permitir que uma autenticação acesse múltiplos aplicativos' },
      { en: 'To force users to change passwords every week', pt: 'Obrigar usuários a trocar senhas toda semana' },
      { en: 'To block access from unmanaged devices', pt: 'Bloquear acesso de dispositivos não gerenciados' },
    ],
    correct: 1,
    explain:
      '<strong>SSO (Single Sign-On)</strong> lets a user authenticate once and then access multiple applications without re-entering credentials. It improves UX and reduces password fatigue (fewer passwords = fewer risks).',
    ptNote:
      'SSO = uma única chave abre várias portas. Reduz o número de senhas que o usuário precisa lembrar. Não confunda com MFA (múltiplos fatores).',
  },
  {
    topic: 'Compliance',
    question: 'A hospital must comply with HIPAA (a U.S. healthcare regulation). HIPAA is an example of a:',
    pt: 'Um hospital deve cumprir o HIPAA (uma regulamentação de saúde dos EUA). O HIPAA é um exemplo de:',
    options: [
      { en: 'Standard (best practice, usually optional)', pt: 'Padrão (boa prática, geralmente opcional)' },
      { en: 'Regulation / law (mandatory, government-imposed)', pt: 'Regulamentação / lei (obrigatória, imposta pelo governo)' },
      { en: 'Type of encryption algorithm', pt: 'Tipo de algoritmo de criptografia' },
      { en: 'Cloud deployment model', pt: 'Modelo de implantação em nuvem' },
    ],
    correct: 1,
    explain:
      '<strong>HIPAA is a regulation</strong> — a mandatory law imposed by government (for healthcare in the US). Compare: ISO 27001 and NIST are <em>standards</em> (best practices, generally optional). LGPD (Brazil) and GDPR (EU) are also regulations.',
    ptNote:
      'Leis/Regulamentos (HIPAA, GDPR, LGPD) = obrigatórios. Padrões (ISO 27001, NIST) = boas práticas, geralmente opcionais. Esta distinção cai muito!',
  },
];

/* ---------- State ---------- */
let answered = [];
const PASS_THRESHOLD = 0.7; // 70%

/* ---------- Elements ---------- */
const container = document.getElementById('quizContainer');
const result = document.getElementById('quizResult');
const dotsWrap = document.getElementById('quizDots');
const liveScore = document.getElementById('liveScore');
const chipText = document.getElementById('quizChipText');

/* ---------- Render progress dots ---------- */
function renderDots() {
  dotsWrap.innerHTML = '';
  QUESTIONS.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'quiz-dot';
    if (answered[i] === true) dot.classList.add('correct');
    else if (answered[i] === false) dot.classList.add('wrong');
    dot.id = `dot-${i}`;
    dotsWrap.appendChild(dot);
  });
}

/* ---------- Render quiz ---------- */
function renderQuiz() {
  container.innerHTML = '';
  answered = [];
  result.hidden = true;
  liveScore.textContent = '0';
  chipText.textContent = 'Ready · 0/10';
  renderDots();

  QUESTIONS.forEach((item, qi) => {
    const block = document.createElement('div');
    block.className = 'quiz-q';
    block.id = `q-${qi}`;
    block.innerHTML = `
      <div class="quiz-q__top">
        <div class="quiz-q__num">Question ${qi + 1} of ${QUESTIONS.length}</div>
        <span class="quiz-q__topic">${item.topic}</span>
      </div>
      <div class="quiz-q__text">${item.question}</div>
      <button class="quiz-q__translate-btn" data-q="${qi}">🇧🇷 Ver tradução / Show translation</button>
      <div class="quiz-q__translate" id="tr-${qi}">${item.pt}</div>
      <div class="quiz-options">
        ${item.options
          .map(
            (opt, oi) => `
            <button class="quiz-opt" data-q="${qi}" data-o="${oi}">
              <span class="quiz-opt__letter">${String.fromCharCode(65 + oi)}</span>
              <span class="quiz-opt__text">${opt.en}<span class="quiz-opt__hint">${opt.pt}</span></span>
            </button>`
          )
          .join('')}
      </div>
    `;
    container.appendChild(block);
  });

  // Listeners
  document.querySelectorAll('.quiz-opt').forEach((b) =>
    b.addEventListener('click', handleAnswer)
  );
  document.querySelectorAll('.quiz-q__translate-btn').forEach((b) =>
    b.addEventListener('click', toggleTranslation)
  );
}

/* ---------- Toggle translation ---------- */
function toggleTranslation(e) {
  const qi = e.currentTarget.dataset.q;
  const tr = document.getElementById(`tr-${qi}`);
  tr.classList.toggle('show');
}

/* ---------- Handle answer ---------- */
function handleAnswer(e) {
  const btn = e.currentTarget;
  const qi = +btn.dataset.q;
  const oi = +btn.dataset.o;

  if (answered[qi] !== undefined) return; // already answered

  const correct = QUESTIONS[qi].correct;
  answered[qi] = oi === correct;

  // Mark options
  const allOpts = document.querySelectorAll(`.quiz-opt[data-q="${qi}"]`);
  allOpts.forEach((opt) => {
    opt.classList.add('disabled');
    const oIdx = +opt.dataset.o;
    if (oIdx === correct) opt.classList.add('correct');
    if (oIdx === oi && oi !== correct) opt.classList.add('wrong');
  });

  // Update progress dots
  const dot = document.getElementById(`dot-${qi}`);
  dot.classList.add(answered[qi] ? 'correct' : 'wrong');

  // Live score
  const score = answered.filter(Boolean).length;
  liveScore.textContent = score;
  chipText.textContent = `${score}/10 answered`;

  // Explanation
  const block = document.getElementById(`q-${qi}`);
  const explain = document.createElement('div');
  explain.className = 'quiz-q__explain';
  const isCorrect = answered[qi];
  explain.innerHTML = `
    <strong>${isCorrect ? '✅ Correct!' : '❌ Not quite.'}</strong>
    ${QUESTIONS[qi].explain}
    <span class="pt-note">🇧🇷 ${QUESTIONS[qi].ptNote}</span>
  `;
  block.appendChild(explain);

  // Toast feedback
  if (isCorrect) showToast('✅ Correct! Well done.');
  else showToast('❌ Review this one. Read the explanation!');

  // Auto-scroll to next question
  if (qi < QUESTIONS.length - 1) {
    setTimeout(() => {
      document.getElementById(`q-${qi + 1}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 900);
  } else {
    // Last question → show result
    setTimeout(showResult, 1100);
  }
}

/* ---------- Show result ---------- */
function showResult() {
  const correctCount = answered.filter(Boolean).length;
  const total = QUESTIONS.length;
  const pct = correctCount / total;

  document.getElementById('quizScore').textContent = `${correctCount}/${total}`;

  const passed = pct >= PASS_THRESHOLD;
  const gradeEl = document.getElementById('quizGrade');
  const iconEl = document.getElementById('resultIcon');

  if (passed) {
    gradeEl.textContent = '🎉 PASSED';
    gradeEl.className = 'quiz-result__grade pass';
    iconEl.textContent = '🎉';
  } else {
    gradeEl.textContent = '📚 KEEP STUDYING';
    gradeEl.className = 'quiz-result__grade fail';
    iconEl.textContent = '💪';
  }

  let msg = '';
  if (pct === 1) msg = 'Perfect score! You have mastered Module 1. You\'re ready to move on to Module 2!';
  else if (pct >= 0.7) msg = 'Great job! You passed. Review the questions you missed to reach 100%.';
  else if (pct >= 0.5) msg = 'Good progress! Re-read the lessons and try again — you\'re close to passing.';
  else msg = 'Don\'t give up! Review the vocabulary and lessons, then retake the quiz. Practice makes perfect!';

  document.getElementById('quizMsg').textContent = msg;
  result.hidden = false;
  result.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ---------- Retry ---------- */
document.getElementById('quizRetry').addEventListener('click', () => {
  renderQuiz();
  document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
  showToast('🔄 Quiz reset. Good luck!');
});

/* ---------- Reveal animations ---------- */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry);
      }
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

/* ---------- Toast ---------- */
const toast = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  toast.innerHTML = `<span class="toast__dot"></span>${msg}`;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ---------- Init ---------- */
renderQuiz();
