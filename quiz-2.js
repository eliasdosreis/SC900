/* ============================================================
   SC-900 · MODULE 2 QUIZ (English Mode)
   10 questions · Most-tested Entra ID topics · Vocabulary training
   ============================================================
   NOTE: These are original practice questions written to cover
   the official SC-900 Module 2 objectives (study guide).
   They are inspired by the most-tested topics, NOT exam dumps.
   ============================================================ */

/* ---------- Questions Data ---------- */
const QUESTIONS = [
  {
    topic: 'Identity Types',
    question: 'An application needs to access an Azure resource automatically, without any user signing in. Which type of identity should you use?',
    pt: 'Um aplicativo precisa acessar um recurso do Azure automaticamente, sem nenhum usuário entrando. Qual tipo de identidade você deve usar?',
    options: [
      { en: 'A user account with a strong password', pt: 'Uma conta de usuário com senha forte' },
      { en: 'A Managed Identity (service account)', pt: 'Uma Managed Identity (conta de serviço)' },
      { en: 'A guest user account', pt: 'Uma conta de usuário convidado' },
      { en: 'A mail contact', pt: 'Um contato de email' },
    ],
    correct: 1,
    explain:
      'For non-human access (apps, scripts, services), use a <strong>Managed Identity</strong>. It eliminates the need to store passwords — Azure manages the credentials automatically. This is the modern, recommended approach over traditional service accounts.',
    ptNote:
      'Para apps/scripts (sem humano), use <strong>Managed Identity</strong> — sem senha estática. As outras opções são identidades humanas (usuário/convidado) ou não fazem login (contato).',
  },
  {
    topic: 'Entra ID vs AD DS',
    question: 'Which statement correctly compares Microsoft Entra ID with on-premises Active Directory Domain Services (AD DS)?',
    pt: 'Qual declaração compara corretamente o Microsoft Entra ID com o Active Directory Domain Services (AD DS) local?',
    options: [
      { en: 'They are the same product, just with different names.', pt: 'São o mesmo produto, apenas com nomes diferentes.' },
      { en: 'Entra ID is designed for internet-based identity using modern protocols (SAML, OAuth, OIDC).', pt: 'O Entra ID é projetado para identidade baseada na internet com protocolos modernos (SAML, OAuth, OIDC).' },
      { en: 'Entra ID fully replaces AD DS and supports GPOs and LDAP natively.', pt: 'O Entra ID substitui totalmente o AD DS e suporta GPOs e LDAP nativamente.' },
      { en: 'AD DS works in the cloud; Entra ID works only on-premises.', pt: 'O AD DS funciona na nuvem; o Entra ID funciona apenas localmente.' },
    ],
    correct: 1,
    explain:
      'Entra ID and AD DS are <strong>different products</strong>. Entra ID is internet-based, using modern protocols (SAML, OAuth 2.0, OIDC). AD DS is on-premises, using Kerberos, LDAP, NTLM, and GPOs. Entra ID does NOT support GPOs.',
    ptNote:
      'São produtos <strong>diferentes</strong>! Entra ID = nuvem (SAML/OAuth). AD DS = local (Kerberos/LDAP/GPO). O Entra ID NÃO suporta GPOs — pegadinha clássica.',
  },
  {
    topic: 'MFA',
    question: 'What does Multi-Factor Authentication (MFA) require?',
    pt: 'O que a Autenticação Multifator (MFA) exige?',
    options: [
      { en: 'Two or more different types of authentication factors (e.g., password + phone)', pt: 'Dois ou mais tipos diferentes de fatores de autenticação (ex.: senha + telefone)' },
      { en: 'Two different passwords', pt: 'Duas senhas diferentes' },
      { en: 'A password longer than 12 characters', pt: 'Uma senha maior que 12 caracteres' },
      { en: 'Biometrics only', pt: 'Apenas biometria' },
    ],
    correct: 0,
    explain:
      'MFA requires <strong>two or more DIFFERENT types of factors</strong>: something you <em>know</em> (password), something you <em>have</em> (phone, token), or something you <em>are</em> (biometrics). Two passwords do NOT count as MFA — they are the same factor type.',
    ptNote:
      'MFA = 2+ fatores de <strong>tipos diferentes</strong>: saber (senha), ter (celular), ser (biometria). Duas senhas NÃO são MFA — é o mesmo tipo de fator!',
  },
  {
    topic: 'Conditional Access',
    question: 'A Conditional Access policy is best described as an if-then rule. Which combination represents the correct structure?',
    pt: 'Uma política de Acesso Condicional é melhor descrita como uma regra se-então. Qual combinação representa a estrutura correta?',
    options: [
      { en: 'If signals (user, location, device) → then access decision (allow/block/grant with controls)', pt: 'Se sinais (usuário, local, dispositivo) → então decisão de acesso (permitir/bloquear/conceder com controles)' },
      { en: 'If password → then encryption', pt: 'Se senha → então criptografia' },
      { en: 'If user → then admin role', pt: 'Se usuário → então papel de administrador' },
      { en: 'If authentication → then authorization', pt: 'Se autenticação → então autorização' },
    ],
    correct: 0,
    explain:
      'Conditional Access follows the <strong>Signals → Decisions → Controls</strong> logic. Example: <em>If</em> (user is in Finance) AND (location is unknown), <em>then</em> require MFA. This is the practical implementation of Zero Trust in Entra ID.',
    ptNote:
      'Acesso Condicional = <strong>SE sinais → ENTÃO decisão</strong>. Ex.: SE (Finanças + local desconhecido) → ENTÃO (exigir MFA). É o Zero Trust na prática.',
  },
  {
    topic: 'Conditional Access',
    question: 'Your company wants to block access to corporate apps from certain countries. Which Entra ID feature should you use?',
    pt: 'Sua empresa quer bloquear o acesso a apps corporativos de certos países. Qual recurso do Entra ID você deve usar?',
    options: [
      { en: 'Self-Service Password Reset (SSPR)', pt: 'SSPR (redefinição de senha por autoatendimento)' },
      { en: 'Conditional Access', pt: 'Acesso Condicional' },
      { en: 'Privileged Identity Management (PIM)', pt: 'PIM (Privileged Identity Management)' },
      { en: 'Access Reviews', pt: 'Revisões de Acesso' },
    ],
    correct: 1,
    explain:
      '<strong>Conditional Access</strong> is the right tool — you can create a policy that blocks access from specific locations/countries (using named locations). SSPR resets passwords; PIM manages privileged roles; Access Reviews validate existing access.',
    ptNote:
      'Para bloquear por país/local, use <strong>Acesso Condicional</strong> (política baseada em localização). Os outros recursos têm propósitos diferentes.',
  },
  {
    topic: 'PIM',
    question: 'What is the primary purpose of Privileged Identity Management (PIM)?',
    pt: 'Qual é o propósito principal do Privileged Identity Management (PIM)?',
    options: [
      { en: 'To permanently assign administrator roles to all users', pt: 'Atribuir permanentemente papéis de administrador a todos os usuários' },
      { en: 'To provide just-in-time activation of privileged roles, with time limits and approval', pt: 'Fornecer ativação just-in-time de papéis privilegiados, com limites de tempo e aprovação' },
      { en: 'To reset forgotten passwords', pt: 'Redefinir senhas esquecidas' },
      { en: 'To detect compromised credentials', pt: 'Detectar credenciais comprometidas' },
    ],
    correct: 1,
    explain:
      '<strong>PIM</strong> provides <em>just-in-time</em> access to privileged roles. Instead of having Global Admin rights permanently, eligible users <em>activate</em> the role when needed, for a limited time, with justification/approval. This drastically reduces the attack surface.',
    ptNote:
      'PIM = acesso <strong>just-in-time</strong>. O usuário "ativa" o papel privilegiado na hora, por tempo limitado, com justificativa. Ninguém fica admin 24/7. Detectar credenciais vazadas = Identity Protection.',
  },
  {
    topic: 'Identity Protection',
    question: 'Microsoft Entra Identity Protection detects risk based on signals. Which two types of risk does it evaluate?',
    pt: 'O Microsoft Entra Identity Protection detecta risco baseado em sinais. Quais dois tipos de risco ele avalia?',
    options: [
      { en: 'Network risk and storage risk', pt: 'Risco de rede e risco de armazenamento' },
      { en: 'User risk (e.g., leaked credentials) and sign-in risk (e.g., anomalous location)', pt: 'Risco de usuário (ex.: credenciais vazadas) e risco de login (ex.: local anômalo)' },
      { en: 'Password risk and encryption risk', pt: 'Risco de senha e risco de criptografia' },
      { en: 'Hardware risk and firmware risk', pt: 'Risco de hardware e risco de firmware' },
    ],
    correct: 1,
    explain:
      'Identity Protection evaluates two main risk types: <strong>User risk</strong> (is the account itself compromised? e.g., credentials found in a leak) and <strong>Sign-in risk</strong> (is this particular sign-in suspicious? e.g., from a new country or impossible travel). It can trigger Conditional Access automatically.',
    ptNote:
      'Dois tipos: <strong>user risk</strong> (a conta está comprometida?) e <strong>sign-in risk</strong> (este login é suspeito?). Pode acionar Acesso Condicional automaticamente.',
  },
  {
    topic: 'SSPR',
    question: 'What is the main benefit of Self-Service Password Reset (SSPR)?',
    pt: 'Qual é o principal benefício do SSPR (Self-Service Password Reset)?',
    options: [
      { en: 'It allows admins to block all passwords', pt: 'Permite que administradores bloqueiem todas as senhas' },
      { en: 'It lets users reset their own passwords without calling the help desk', pt: 'Permite que usuários redefinam suas próprias senhas sem chamar o suporte' },
      { en: 'It enforces MFA for every login', pt: 'Impõe MFA para todo login' },
      { en: 'It eliminates the need for passwords entirely', pt: 'Elimina totalmente a necessidade de senhas' },
    ],
    correct: 1,
    explain:
      '<strong>SSPR</strong> lets users reset their own forgotten passwords after verifying their identity with alternative methods (phone, email, security questions). This reduces help-desk tickets and costs. Note: in Entra ID, SSPR and MFA share the same registration (Unified Registration).',
    ptNote:
      'SSPR = usuário redefine a própria senha, sem TI. Reduz tickets. Importante: SSPR e MFA <strong>compartilham os mesmos métodos</strong> de autenticação (registro unificado).',
  },
  {
    topic: 'B2B vs B2C',
    question: 'A company wants to let its customers (consumers) sign in to a public-facing app using their Google or Facebook accounts. Which Entra ID solution should they use?',
    pt: 'Uma empresa quer permitir que seus clientes (consumidores) entrem em um app público usando contas Google ou Facebook. Qual solução do Entra ID eles devem usar?',
    options: [
      { en: 'Entra ID B2B collaboration', pt: 'Colaboração Entra ID B2B' },
      { en: 'Entra ID B2C', pt: 'Entra ID B2C' },
      { en: 'Entra Connect (sync)', pt: 'Entra Connect (sincronização)' },
      { en: 'Privileged Identity Management', pt: 'Privileged Identity Management' },
    ],
    correct: 1,
    explain:
      '<strong>Entra B2C</strong> is designed for consumer-facing apps with millions of customers. It supports social identity providers (Google, Facebook) and local accounts. B2B, by contrast, is for collaboration with users from <em>other organizations</em> (who use their own corporate Entra ID).',
    ptNote:
      'App público para <strong>consumidores</strong> com login social (Google/Facebook) = <strong>B2C</strong>. B2B é para colaboração entre <strong>empresas</strong> (parceiros trazem a própria identidade corporativa).',
  },
  {
    topic: 'Governance',
    question: 'Which feature helps prevent "privilege creep" by periodically asking managers to confirm if a user still needs their access?',
    pt: 'Qual recurso ajuda a evitar o "acúmulo de privilégios" pedindo periodicamente que gestores confirmem se um usuário ainda precisa do seu acesso?',
    options: [
      { en: 'Access Reviews', pt: 'Revisões de Acesso (Access Reviews)' },
      { en: 'Self-Service Password Reset', pt: 'SSPR' },
      { en: 'Conditional Access', pt: 'Acesso Condicional' },
      { en: 'Entra Connect', pt: 'Entra Connect' },
    ],
    correct: 0,
    explain:
      '<strong>Access Reviews</strong> are periodic validations where managers/users confirm whether access is still needed. Stale access is removed automatically, preventing <em>privilege creep</em> (the gradual accumulation of unnecessary permissions over time).',
    ptNote:
      'Access Reviews = revisões periódicas que removem acessos obsoletos e evitam o "privilege creep" (acúmulo de privilégios). Combina com PIM e Identity Protection para governança completa.',
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
  if (pct === 1) msg = 'Perfect score! You have mastered Entra ID concepts. You are ready to move on!';
  else if (pct >= 0.7) msg = 'Great job! You passed. Review the questions you missed to reach 100%.';
  else if (pct >= 0.5) msg = 'Good progress! Re-read the lessons and try again — you are close to passing.';
  else msg = 'Do not give up! Review the vocabulary and lessons, then retake the quiz. Practice makes perfect!';

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
        observer.unobserve(entry.target);
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
