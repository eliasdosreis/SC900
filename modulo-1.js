/* ============================================================
   SC-900 · MÓDULO 1 — Interatividade
   Aulas: trilha, progresso, camadas interativas, quiz
   ============================================================ */

/* ============================================================
   PARTE 1 — DADOS DAS CAMADAS (Defesa em Profundidade)
   ============================================================ */
const LAYERS = [
  {
    emoji: '🏢',
    name: 'Camada Física',
    child: 'A portaria do prédio, a fechadura da sala dos servidores, as câmeras. Se alguém entrar e levar o computador... 🙈',
    senior:
      'Proteção física dos datacenters da Microsoft: <strong>acesso controlado por biometria</strong>, guardas 24/7, monitoramento por câmeras, redundância de energia e climatização. Nos datacenters do Azure, esta camada é responsabilidade <strong>da Microsoft</strong>.',
  },
  {
    emoji: '🪪',
    name: 'Camada de Identidade & Acesso',
    child: 'É o crachá! Quem é você? Você tem permissão pra entrar? Sem crachá, sem acesso.',
    senior:
      'Controle de <strong>identidades e acessos</strong>: autenticação (MFA, Passwordless), autorização (RBAC), acesso condicional e governança. É a camada mais crítica hoje — <strong>"a identidade é o novo perímetro de segurança"</strong>.',
  },
  {
    emoji: '🧱',
    name: 'Camada de Perímetro',
    child: 'A muralha e o portão do castelo. Protege a fronteira entre a internet e sua rede.',
    senior:
      'Proteção de borda contra a internet: <strong>DDoS Protection</strong>, <strong>Azure Firewall</strong>, Web Application Firewall (WAF), filtros de tráfego e políticas de rede. Primeira linha contra ataques externos em escala.',
  },
  {
    emoji: '🌐',
    name: 'Camada de Rede',
    child: 'As estradas e corredores dentro do castelo. Você controla quem passa por onde.',
    senior:
      'Segmentação e controle de tráfego interno: <strong>Network Security Groups (NSGs)</strong>, <strong>micro-segmentação</strong>, criptografia em trânsito (TLS), peering e topologia hub-spoke. Limita o movimento lateral de invasores.',
  },
  {
    emoji: '💻',
    name: 'Camada de Aplicação',
    child: 'Os programas e apps que você usa. Como garantir que eles não têm "buracos"?',
    senior:
      'Segurança das aplicações: desenvolvimento seguro (DevSecOps), validação de inputs, gestão de segredos (<strong>Key Vault</strong>), proteção contra OWASP Top 10 (SQL Injection, XSS), patch management e varredura de vulnerabilidades.',
  },
  {
    emoji: '💎',
    name: 'Camada de Dados',
    child: 'O tesouro dentro do cofre! Se tudo der errado, essa é a última defesa.',
    senior:
      'Proteção da informação em si — e a camada <strong>mais interna e crítica</strong>: <strong>criptografia em repouso</strong> (AES-256) e <strong>em trânsito</strong> (TLS), classificação de dados, <strong>Microsoft Purview</strong>, controle de chaves (BYOK/HSM). Mesmo que tudo caia, os dados seguem ilegíveis.',
  },
];

const layerDetail = document.getElementById('layerDetail');
const layerButtons = document.querySelectorAll('.layer-btn');

layerButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const idx = +btn.dataset.layer;
    const layer = LAYERS[idx];

    // Atualiza botão ativo
    layerButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    // Atualiza conteúdo
    layerDetail.innerHTML = `
      <div class="layer-detail__emoji">${layer.emoji}</div>
      <h4>${layer.name}</h4>
      <p class="layer-detail__child">${layer.child}</p>
      <div class="layer-detail__senior">
        <span class="tag tag--senior">⚡ Nível Sênior</span>
        <p>${layer.senior}</p>
      </div>
    `;
  });
});

/* ============================================================
   PARTE 2 — PROGRESSO DAS AULAS
   ============================================================ */
const MODULE_KEY = 'sc900_module1_progress_v1';
const lessons = ['aula-1', 'aula-2', 'aula-3', 'aula-4', 'aula-5', 'aula-6', 'aula-7'];
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
   PARTE 3 — QUIZ
   ============================================================ */
const QUESTIONS = [
  {
    q: 'Um funcionário saiu da empresa, mas sua conta continua ativa e acessível por 3 meses. Qual pilar da tríade CIA foi violado?',
    options: [
      'Confidencialidade — dados podem ter sido acessados por pessoa não autorizada',
      'Integridade — os dados podem ter sido alterados',
      'Disponibilidade — o sistema ficou indisponível',
      'Nenhuma das anteriores',
    ],
    correct: 0,
    explain:
      'Acesso indeto = <strong>Confidencialidade</strong> violada. A conta deveria ter sido desativada imediatamente (offboarding). Lembre: Confidencialidade = "só quem deve, acessa".',
  },
  {
    q: 'Qual princípio do Zero Trust significa "dar o mínimo de acesso necessário, pelo menor tempo possível"?',
    options: [
      'Verify Explicitly (Verificar Explicitamente)',
      'Assume Breach (Assumir a Violação)',
      'Least Privilege Access (Menor Acesso Possível)',
      'Defense in Depth (Defesa em Profundidade)',
    ],
    correct: 2,
    explain:
      'Least Privilege = acesso <strong>mínimo necessário</strong>. Implementado com JIT/JEA (Just-In-Time / Just-Enough-Access). É o "só entra onde precisa" da nossa analogia.',
  },
  {
    q: 'Uma empresa usa Microsoft 365 (SaaS). Quem é responsável por configurar a criptografia dos dados armazenados?',
    options: [
      'A Microsoft, pois é SaaS',
      'O cliente, pois os dados SEMPRE são responsabilidade do cliente',
      'O provedor de internet',
      'Depende do regulamento aplicável',
    ],
    correct: 1,
    explain:
      'Mesmo em SaaS, <strong>os dados são SEMPRE responsabilidade do cliente</strong> — incluindo classificar, rotular e garantir quem tem acesso. A Microsoft protege a infraestrutura, mas você cuida dos seus dados.',
  },
  {
    q: 'Na defesa em profundidade, qual é a camada MAIS interna e que protege o "tesouro" final?',
    options: [
      'Camada de Perímetro (firewall de borda)',
      'Camada de Rede (NSGs, segmentação)',
      'Camada de Dados (criptografia, classificação)',
      'Camada de Identidade & Acesso (MFA)',
    ],
    correct: 2,
    explain:
      'A <strong>Camada de Dados</strong> é a mais interna e protege o ativo mais valioso. Mesmo que todas as outras caiam, a criptografia mantém os dados ilegíveis para o invasor. É o "cofre dentro do cofre".',
  },
  {
    q: 'Você digita sua senha no site do banco. Em seguida, recebe um SMS com um código. Esse processo é um exemplo de:',
    options: [
      'Autorização — decidindo o que você pode fazer',
      'Autenticação — confirmando quem você é',
      'Criptografia — embaralhando a senha',
      'Federation — usando identidade externa',
    ],
    correct: 1,
    explain:
      'MFA (Multi-Factor Authentication) é <strong>Autenticação (AuthN)</strong> — prova QUEM é você com 2 fatores (algo que você sabe + algo que você tem). Autorização viria DEPOIS: "esse usuário pode transferir R$1000?".',
  },
  {
    q: 'A LGPD (Lei Geral de Proteção de Dados) é um exemplo de:',
    options: [
      'Um padrão de segurança (standard)',
      'Um regulamento / lei de conformidade',
      'Um tipo de criptografia',
      'Um protocolo de autenticação',
    ],
    correct: 1,
    explain:
      'A <strong>LGPD</strong> (Brasil) e a <strong>GDPR</strong> (Europa) são <strong>regulamentos/leis</strong> — regras obrigatórias impostas pelo governo. Já ISO 27001 e NIST são <strong>padrões/standards</strong> (boas práticas, geralmente opcionais).',
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

  // listeners
  document.querySelectorAll('.quiz-opt').forEach((btn) => {
    btn.addEventListener('click', handleQuizAnswer);
  });
}

function handleQuizAnswer(e) {
  const btn = e.currentTarget;
  const q = +btn.dataset.q;
  const o = +btn.dataset.o;

  // Ignora se já respondeu essa pergunta
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

  // Mostra explicação
  const qBlock = btn.closest('.quiz-q');
  const explain = document.createElement('div');
  explain.className = 'quiz-q__explain';
  explain.innerHTML = `<strong>${o === correct ? '✅ Correto!' : '❌ Quase!'}</strong> ${QUESTIONS[q].explain}`;
  qBlock.appendChild(explain);

  // Verifica fim
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
  if (pct === 100) msg = '🏆 Perfeito! Você dominou o Módulo 1. Está pronto pra avançar!';
  else if (pct >= 70) msg = '🎉 Muito bem! Você pegou a essência. Reveja os pontos que errou pra fixar.';
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
   PARTE 4 — REVEAL ANIMATIONS
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
   PARTE 5 — Toast (reaproveita do script principal)
   ============================================================ */
const toast = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  toast.innerHTML = `<span class="toast__dot"></span>${msg}`;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}
