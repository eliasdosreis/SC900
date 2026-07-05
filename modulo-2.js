/* ============================================================
   SC-900 · MÓDULO 2 — Interatividade
   Capacidades do Microsoft Entra ID
   ============================================================ */

/* ============================================================
   PARTE 1 — PROGRESSO DAS AULAS
   ============================================================ */
const MODULE_KEY = 'sc900_module2_progress_v1';
const lessons = ['aula-1', 'aula-2', 'aula-3', 'aula-4', 'aula-5', 'aula-6'];
let lessonState = loadModuleState();

function loadModuleState() {
  try {
    const raw = localStorage.getItem(MODULE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function saveModuleState() {
  try {
    localStorage.setItem(MODULE_KEY, JSON.stringify(lessonState));
  } catch {}
}

// Botões "concluir aula"
document.querySelectorAll('.lesson__done').forEach((btn) => {
  const lessonId = btn.dataset.complete;
  if (lessonState[lessonId]) {
    btn.classList.add('completed');
    btn.innerHTML = '<span class="lesson__done-check">✓</span> Aula concluída! ✓';
  }
  btn.addEventListener('click', () => {
    const wasDone = lessonState[lessonId];
    lessonState[lessonId] = !wasDone;
    if (!lessonState[lessonId]) delete lessonState[lessonId];
    saveModuleState();

    if (lessonState[lessonId]) {
      btn.classList.add('completed');
      btn.innerHTML = '<span class="lesson__done-check">✓</span> Aula concluída! ✓';
      showToast(`✅ Aula concluída!`);
    } else {
      btn.classList.remove('completed');
      btn.innerHTML = '<span class="lesson__done-check">✓</span> Marcar aula como concluída';
    }
    updateModuleProgress();
  });
});

// Atualiza trilha visual no topo
function updatePathDots() {
  const dots = document.querySelectorAll('.path-dot');
  dots.forEach((dot) => {
    const num = dot.dataset.lesson;
    const id = `aula-${num}`;
    dot.classList.toggle('completed', !!lessonState[id]);
  });
}

// Barra de progresso
function updateModuleProgress() {
  const done = lessons.filter((l) => lessonState[l]).length;
  const pct = Math.round((done / lessons.length) * 100);
  document.getElementById('moduleProgress').textContent = `${pct}%`;
  document.getElementById('moduleFill').style.width = `${pct}%`;

  const hint = document.getElementById('moduleHint');
  if (pct === 0) hint.textContent = 'Leia cada aula e marque como concluída 👇';
  else if (pct < 100) hint.textContent = `${done} de ${lessons.length} aulas concluídas — continue! 💪`;
  else hint.textContent = '🎉 Módulo completo! Bora pro quiz?';

  updatePathDots();
}
updateModuleProgress();

/* ============================================================
   PARTE 2 — QUIZ EM PORTUGUÊS (6 questões)
   ============================================================ */
const QUESTIONS = [
  {
    q: 'Qual tipo de identidade é usado por aplicativos ou scripts para acessar recursos de forma autônoma, sem intervenção humana?',
    options: [
      'Usuário membro',
      'Conta de serviço / Managed Identity',
      'Dispositivo Entra Joined',
      'Contato de email',
    ],
    correct: 1,
    explain:
      '<strong>Contas de serviço</strong> (e hoje preferencialmente <strong>Managed Identities</strong>) são identidades não-humanas usadas por apps/scripts. Elas evitam senhas estáticas — a identidade é gerenciada pelo Azure automaticamente.',
  },
  {
    q: 'Qual é a principal diferença entre o Active Directory (AD DS) tradicional e o Microsoft Entra ID?',
    options: [
      'O AD DS funciona na nuvem; o Entra ID funciona apenas localmente',
      'O Entra ID é focado em identidade baseada em internet, com SSO e protocolos modernos (SAML, OAuth)',
      'São exatamente o mesmo produto, apenas com nomes diferentes',
      'O Entra ID suporta GPOs e LDAP puro, mas o AD DS não',
    ],
    correct: 1,
    explain:
      'O <strong>Entra ID</strong> é focado em identidade baseada em internet, usando protocolos modernos (SAML, OAuth 2.0, OIDC). O AD DS é on-premises, com Kerberos/LDAP/GPOs. São produtos <strong>diferentes</strong> — não confunda!',
  },
  {
    q: 'Uma empresa quer que os usuários redefinam a própria senha sem chamar o TI. Qual recurso do Entra ID atende essa necessidade?',
    options: [
      'Acesso Condicional (Conditional Access)',
      'Privileged Identity Management (PIM)',
      'SSPR (Self-Service Password Reset)',
      'Entitlement Management',
    ],
    correct: 2,
    explain:
      'O <strong>SSPR</strong> permite que o próprio usuário redefina sua senha após provar sua identidade com métodos alternativos. Reduz tickets no TI. Importante: SSPR e MFA compartilham os mesmos métodos de autenticação (Unified Registration).',
  },
  {
    q: 'No Acesso Condicional, qual é a estrutura lógica de uma política? (Pense no "fiscal do trem")',
    options: [
      'Usuário → Grupo → Senha',
      'Sinais (Signals) → Decisão (Decision) → Controles (Controls)',
      'Identidade → Criptografia → Disponibilidade',
      'AuthN → AuthZ → Auditoria',
    ],
    correct: 1,
    explain:
      'A lógica do Acesso Condicional é: <strong>SE sinais X → ENTÃO decisão Y com controles Z</strong>. Exemplo: SE (grupo Finanças + local desconhecido) → ENTÃO (exigir MFA). É a implementação prática do Zero Trust.',
  },
  {
    q: 'Qual recurso permite que um administrador "ative" o papel de Global Admin apenas quando precisa, por tempo limitado, com justificativa?',
    options: [
      'Access Reviews',
      'Identity Protection',
      'Privileged Identity Management (PIM)',
      'Entitlement Management',
    ],
    correct: 2,
    explain:
      'O <strong>PIM (Privileged Identity Management)</strong> implementa acesso <em>just-in-time</em>: o usuário elegível "ativa" o papel privilegiado na hora que precisa, por tempo limitado, com justificativa e aprovação. Reduz a janela de exposição ao ataque.',
  },
  {
    q: 'Uma empresa quer permitir que consultores de outra organização acessem seu SharePoint usando a própria conta da empresa deles (ex: @accenture.com). Qual solução usar?',
    options: [
      'Entra ID B2C',
      'Entra ID B2B',
      'Active Directory DS local',
      'Entra Connect',
    ],
    correct: 1,
    explain:
      '<strong>Entra B2B</strong> é para colaboração entre empresas. O consultor é convidado e aparece como <em>Guest</em>, mas autentica no <strong>próprio Entra ID da empresa dele</strong>. Sem nova senha. B2C seria para consumidores finais (milhares/milhões de clientes).',
  },
];

const quizContainer = document.getElementById('quizContainer');
const quizResult = document.getElementById('quizResult');
let quizAnswered = [];

function renderQuiz() {
  quizContainer.innerHTML = '';
  quizAnswered = [];
  quizResult.hidden = true;

  QUESTIONS.forEach((item, qi) => {
    const block = document.createElement('div');
    block.className = 'quiz-q';
    block.innerHTML = `
      <div class="quiz-q__num">Pergunta ${qi + 1} de ${QUESTIONS.length}</div>
      <div class="quiz-q__text">${item.q}</div>
      <div class="quiz-options">
        ${item.options
          .map(
            (opt, oi) => `
            <button class="quiz-opt" data-q="${qi}" data-o="${oi}">
              <span class="quiz-opt__letter">${String.fromCharCode(65 + oi)}</span>
              <span>${opt}</span>
            </button>`
          )
          .join('')}
      </div>
    `;
    quizContainer.appendChild(block);
  });

  document.querySelectorAll('.quiz-opt').forEach((btn) => {
    btn.addEventListener('click', handleQuizAnswer);
  });
}

function handleQuizAnswer(e) {
  const btn = e.currentTarget;
  const q = +btn.dataset.q;
  const o = +btn.dataset.o;

  if (quizAnswered[q] !== undefined) return;

  const correct = QUESTIONS[q].correct;
  quizAnswered[q] = o === correct;

  const allOpts = document.querySelectorAll(`.quiz-opt[data-q="${q}"]`);
  allOpts.forEach((opt) => {
    opt.classList.add('disabled');
    const oi = +opt.dataset.o;
    if (oi === correct) opt.classList.add('correct');
    if (oi === o && o !== correct) opt.classList.add('wrong');
  });

  const qBlock = btn.closest('.quiz-q');
  const explain = document.createElement('div');
  explain.className = 'quiz-q__explain';
  explain.innerHTML = `<strong>${o === correct ? '✅ Correto!' : '❌ Quase!'}</strong> ${QUESTIONS[q].explain}`;
  qBlock.appendChild(explain);

  if (quizAnswered.filter((a) => a !== undefined).length === QUESTIONS.length) {
    setTimeout(showResult, 600);
  }
}

function showResult() {
  const correctCount = quizAnswered.filter(Boolean).length;
  const total = QUESTIONS.length;
  document.getElementById('quizScore').textContent = `${correctCount}/${total}`;

  let msg = '';
  const pct = (correctCount / total) * 100;
  if (pct === 100) msg = '🏆 Perfeito! Você dominou os conceitos do Entra ID!';
  else if (pct >= 70) msg = '🎉 Muito bem! Reveja os pontos que errou pra fixar.';
  else if (pct >= 50) msg = '💪 Bom começo! Relê as aulas com atenção e tente de novo.';
  else msg = '📖 Sem desanimar! Releia as analogias e tente de novo — você consegue.';

  document.getElementById('quizMsg').textContent = msg;
  quizResult.hidden = false;
  quizResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

document.getElementById('quizRetry').addEventListener('click', () => {
  renderQuiz();
  quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

renderQuiz();

/* ============================================================
   PARTE 3 — REVEAL ANIMATIONS
   ============================================================ */
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

/* ============================================================
   PARTE 4 — TOAST
   ============================================================ */
const toast = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  toast.innerHTML = `<span class="toast__dot"></span>${msg}`;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}
