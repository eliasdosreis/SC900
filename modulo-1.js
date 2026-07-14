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
   PARTE 4 — CENTRAL DE TREINO ATIVO
   ============================================================ */
const ACTIVE_STUDY_KEY = 'sc900_module1_active_study_v1';
const MISSIONS = [
  { topic:'CIA · Confidencialidade', title:'A planilha esquecida', story:'Uma planilha com salários foi compartilhada por engano com toda a empresa. Os dados continuam corretos e o arquivo está disponível.', options:['Disponibilidade','Integridade','Confidencialidade'], correct:2, explain:'Pessoas sem autorização puderam ler dados sensíveis. Isso viola confidencialidade; nada indica alteração ou indisponibilidade.' },
  { topic:'Zero Trust', title:'Acesso temporário do consultor', story:'Um consultor precisa administrar um servidor apenas durante uma manutenção de duas horas. Qual decisão segue melhor o Zero Trust?', options:['Dar acesso permanente para evitar atrasos','Conceder privilégio mínimo, com prazo e verificação explícita','Confiar porque ele já entrou na VPN'], correct:1, explain:'Least privilege limita escopo e tempo; verify explicitly evita confiança baseada apenas na localização da rede.' },
  { topic:'Defesa em profundidade', title:'O firewall falhou', story:'Um invasor atravessou o firewall, mas não conseguiu usar a conta sem MFA nem ler o banco criptografado. O que explica a contenção?', options:['Uma única defesa perfeita','Defesa em profundidade','Alta disponibilidade'], correct:1, explain:'Camadas independentes continuam protegendo identidade e dados mesmo quando o perímetro falha.' },
  { topic:'Identidade', title:'Crachá e sala restrita', story:'O sistema confirma a senha de Ana e depois verifica se ela pode abrir a pasta Financeiro. Quais etapas ocorreram?', options:['Autorização e depois autenticação','Autenticação e depois autorização','Federação e depois hashing'], correct:1, explain:'Primeiro AuthN confirma quem é Ana; depois AuthZ decide o que essa identidade pode acessar.' },
  { topic:'Responsabilidade compartilhada', title:'Banco de dados em SaaS', story:'Uma empresa usa um aplicativo SaaS. Quem continua responsável por classificar os dados e gerenciar corretamente os acessos dos usuários?', options:['Somente o provedor de nuvem','O cliente','O fabricante do notebook'], correct:1, explain:'Dados, identidades e decisões de acesso continuam sendo responsabilidades do cliente em qualquer modelo de nuvem.' },
  { topic:'GRC', title:'A auditoria pediu evidências', story:'A empresa tem controles técnicos, mas não consegue provar quem aprovou as políticas nem mostrar relatórios. Qual dimensão está mais evidente?', options:['Governança e conformidade','Somente disponibilidade','Somente autenticação'], correct:0, explain:'Governança define responsabilidades e políticas; conformidade exige evidências de aderência. Controle sem prova não fecha o ciclo de GRC.' },
  { topic:'Criptografia e hashing', title:'Detectar alteração', story:'Você precisa verificar se um arquivo foi modificado durante o envio, sem esconder o conteúdo. Qual mecanismo é o mais adequado?', options:['Hashing','Criptografia simétrica','Alta disponibilidade'], correct:0, explain:'O hash funciona como impressão digital: qualquer alteração muda o resultado. Criptografia é voltada à confidencialidade.' }
];
const FLASHCARDS = [
  { id:'cia', front:'Quais são os três pilares da tríade CIA?', back:'Confidencialidade, Integridade e Disponibilidade.', hook:'Quem lê · quem altera · quem consegue usar.' },
  { id:'zt', front:'Quais são os três princípios do Zero Trust?', back:'Verify explicitly, use least privilege e assume breach.', hook:'Verifique · limite · prepare-se.' },
  { id:'auth', front:'Qual é a diferença entre AuthN e AuthZ?', back:'AuthN confirma quem você é; AuthZ define o que você pode fazer.', hook:'Nome antes da Zona.' },
  { id:'depth', front:'Por que usar defesa em profundidade?', back:'Para que outras camadas continuem protegendo quando uma defesa falha.', hook:'Nenhuma muralha trabalha sozinha.' },
  { id:'cloud', front:'O que sempre permanece responsabilidade do cliente na nuvem?', back:'Seus dados, identidades, contas, acessos e configurações sob seu controle.', hook:'Seu dado, sua decisão.' },
  { id:'grc', front:'O que significa GRC?', back:'Governança, Risco e Conformidade.', hook:'Direção · incerteza · evidência.' },
  { id:'hash', front:'Hashing protege principalmente qual propriedade?', back:'Integridade, pois evidencia alterações no conteúdo.', hook:'Mudou um bit, mudou a impressão.' },
  { id:'encrypt', front:'Criptografia protege dados em quais dois estados principais?', back:'Em repouso e em trânsito.', hook:'Na gaveta e no caminho.' },
  { id:'federation', front:'O que é federação de identidade?', back:'Uma relação de confiança que permite autenticação por outro provedor de identidade.', hook:'Uma identidade reconhecida em outra fronteira.' },
  { id:'compliance', front:'Segurança e conformidade são a mesma coisa?', back:'Não. Segurança protege; conformidade demonstra aderência a requisitos.', hook:'Fazer certo e provar que fez.' }
];
const TEACHBACKS = [
  { prompt:'Explique Zero Trust sem usar a frase “nunca confie”.', answer:'Inclua: verificação baseada em sinais; privilégio mínimo; preparação para violação; ausência de confiança implícita pela rede.' },
  { prompt:'Ensine AuthN versus AuthZ usando uma situação cotidiana.', answer:'Inclua: identificação primeiro e permissão depois. Exemplo: mostrar o ingresso e então verificar a área permitida.' },
  { prompt:'Explique por que hashing não substitui criptografia.', answer:'Inclua: hashing evidencia alteração e normalmente é unidirecional; criptografia torna dados ilegíveis e pode ser revertida com a chave correta.' },
  { prompt:'Resuma o modelo de responsabilidade compartilhada em 30 segundos.', answer:'Inclua: Microsoft protege a nuvem; cliente protege o que coloca e configura na nuvem; a divisão varia entre IaaS, PaaS e SaaS.' },
  { prompt:'Diferencie governança, risco e conformidade.', answer:'Inclua: governança define direção e responsabilidade; risco trata incertezas; conformidade comprova aderência a requisitos.' }
];

let activeStudy = loadActiveStudy();
let missionIndex = activeStudy.missionsAnswered % MISSIONS.length;
let flashIndex = activeStudy.flashIndex % FLASHCARDS.length;
let teachbackIndex = activeStudy.teachbackIndex % TEACHBACKS.length;
let teachbackInterval = null;

function loadActiveStudy() {
  const fallback={xp:0,missionsAnswered:0,missionsCorrect:0,streak:0,mastered:[],flashIndex:0,teachbackIndex:0,taught:[]};
  try { return {...fallback,...JSON.parse(localStorage.getItem(ACTIVE_STUDY_KEY)||'{}')}; } catch { return fallback; }
}
function saveActiveStudy(){ try{localStorage.setItem(ACTIVE_STUDY_KEY,JSON.stringify(activeStudy));}catch{} updateStudyHud(); }
function awardXp(amount,message){activeStudy.xp+=amount;saveActiveStudy();showToast(`⭐ +${amount} XP · ${message}`);}
function updateStudyHud(){
  const level=Math.floor(activeStudy.xp/100)+1,within=activeStudy.xp%100;
  document.getElementById('studyLevel').textContent=level;document.getElementById('studyXp').textContent=activeStudy.xp;document.getElementById('studyXpFill').style.width=`${within}%`;
  document.getElementById('missionAccuracy').textContent=activeStudy.missionsAnswered?`${Math.round(activeStudy.missionsCorrect/activeStudy.missionsAnswered*100)}%`:'0%';
  document.getElementById('masteredCount').textContent=`${activeStudy.mastered.length}/${FLASHCARDS.length}`;document.getElementById('studyStreak').textContent=activeStudy.streak;
}
document.querySelectorAll('[data-study-tab]').forEach(tab=>tab.addEventListener('click',()=>{
  document.querySelectorAll('[data-study-tab]').forEach(t=>{const on=t===tab;t.classList.toggle('active',on);t.setAttribute('aria-selected',on);});
  document.querySelectorAll('.study-panel').forEach(p=>{const on=p.id===`panel-${tab.dataset.studyTab}`;p.classList.toggle('active',on);p.hidden=!on;});
}));

function renderMission(){
  const m=MISSIONS[missionIndex];document.getElementById('missionTopic').textContent=m.topic;document.getElementById('missionTitle').textContent=m.title;document.getElementById('missionStory').textContent=m.story;
  document.getElementById('missionPosition').textContent=`${missionIndex+1}/${MISSIONS.length}`;document.getElementById('missionFill').style.width=`${(missionIndex+1)/MISSIONS.length*100}%`;
  const feedback=document.getElementById('missionFeedback'),next=document.getElementById('missionNext');feedback.hidden=true;next.hidden=true;
  const options=document.getElementById('missionOptions');options.innerHTML=m.options.map((text,i)=>`<button class="mission-option" data-mission-option="${i}"><b>${String.fromCharCode(65+i)}</b><span>${text}</span></button>`).join('');
  options.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',answerMission));
}
function answerMission(e){
  const chosen=+e.currentTarget.dataset.missionOption,m=MISSIONS[missionIndex],correct=chosen===m.correct;activeStudy.missionsAnswered++;if(correct){activeStudy.missionsCorrect++;activeStudy.streak++;}else activeStudy.streak=0;
  document.querySelectorAll('.mission-option').forEach((btn,i)=>{btn.disabled=true;if(i===m.correct)btn.classList.add('correct');if(i===chosen&&!correct)btn.classList.add('wrong');});
  const feedback=document.getElementById('missionFeedback');feedback.innerHTML=`<strong>${correct?'✅ Decisão correta!':'🔎 Boa tentativa — revise o raciocínio.'}</strong><br>${m.explain}`;feedback.hidden=false;document.getElementById('missionNext').hidden=false;
  if(correct)awardXp(15,'Missão resolvida');else saveActiveStudy();
}
document.getElementById('missionNext').addEventListener('click',()=>{missionIndex=(missionIndex+1)%MISSIONS.length;renderMission();});

function renderFlashcard(){const c=FLASHCARDS[flashIndex],card=document.getElementById('flashcard');card.classList.remove('flipped');document.getElementById('flashcardFront').textContent=c.front;document.getElementById('flashcardBack').textContent=c.back;document.getElementById('flashcardHook').textContent=c.hook;document.getElementById('flashcardPosition').textContent=`${flashIndex+1} de ${FLASHCARDS.length}`;}
document.getElementById('flashcard').addEventListener('click',e=>e.currentTarget.classList.toggle('flipped'));
function advanceFlash(mastered){const c=FLASHCARDS[flashIndex];if(mastered&&!activeStudy.mastered.includes(c.id)){activeStudy.mastered.push(c.id);awardXp(10,'Memória consolidada');}flashIndex=(flashIndex+1)%FLASHCARDS.length;activeStudy.flashIndex=flashIndex;saveActiveStudy();renderFlashcard();}
document.getElementById('flashMastered').addEventListener('click',()=>advanceFlash(true));document.getElementById('flashReview').addEventListener('click',()=>advanceFlash(false));

function renderTeachback(){const t=TEACHBACKS[teachbackIndex];document.getElementById('teachbackPrompt').textContent=t.prompt;document.getElementById('teachbackAnswer').textContent=t.answer;document.getElementById('teachbackAnswer').hidden=true;document.getElementById('teachbackTimer').textContent='01:00';}
document.getElementById('teachbackReveal').addEventListener('click',()=>{const answer=document.getElementById('teachbackAnswer');answer.hidden=!answer.hidden;if(!answer.hidden&&!activeStudy.taught.includes(teachbackIndex)){activeStudy.taught.push(teachbackIndex);awardXp(10,'Conceito explicado');}});
document.getElementById('teachbackNext').addEventListener('click',()=>{teachbackIndex=(teachbackIndex+1)%TEACHBACKS.length;activeStudy.teachbackIndex=teachbackIndex;saveActiveStudy();renderTeachback();});
document.getElementById('teachbackStart').addEventListener('click',()=>{clearInterval(teachbackInterval);let seconds=60;const display=document.getElementById('teachbackTimer');display.textContent='01:00';teachbackInterval=setInterval(()=>{seconds--;display.textContent=`00:${String(seconds).padStart(2,'0')}`;if(seconds<=0){clearInterval(teachbackInterval);display.textContent='TEMPO!';showToast('🎙️ Tempo! Agora confira os pontos essenciais.');}},1000);});

updateStudyHud();renderMission();renderFlashcard();renderTeachback();

/* ============================================================
   PARTE 5 — REVEAL ANIMATIONS
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
