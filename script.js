/* ============================================================
   SC-900 BLUEPRINT · Interatividade
   ============================================================ */

/* ---------- Dados do exame (skills medidos) ---------- */
const DOMAINS = [
  {
    id: 'd1',
    icon: '🔐',
    name: 'Conceitos de SCI',
    weight: '10–15%',
    topics: [
      { t: 'Pilares da Segurança', s: 'Confidencialidade, Integridade e Disponibilidade (CIA)' },
      { t: 'Modelo Zero Trust', s: '"Nunca confie, sempre verifique" · verify explicitly' },
      { t: 'Defesa em profundidade', s: 'Camadas: físico, identidade, perímetro, rede, app, dado' },
      { t: 'Conceitos de Identidade', s: 'Autenticação vs. Autorização · SSO · Federação' },
      { t: 'Modelos de nuvem (responsabilidade)', s: 'IaaS, PaaS, SaaS · responsabilidade compartilhada' },
      { t: 'Conformidade', s: 'Conceitos de conformidade e termos regulatórios' },
    ],
  },
  {
    id: 'd2',
    icon: '👤',
    name: 'Microsoft Entra ID',
    weight: '25–30%',
    topics: [
      { t: 'Tipos de identidade', s: 'Tenant, conta de usuário, conta de serviço, dispositivo' },
      { t: 'Entra ID vs. AD DS', s: 'Diferenças entre nuvem, híbrido e on-premises' },
      { t: 'Métodos de autenticação', s: 'Senha, MFA, Passwordless (FIDO2, MS Authenticator)' },
      { t: 'Self-Service Password Reset', s: 'SSPR · redefinição de senha por autoatendimento' },
      { t: 'Acesso Condicional', s: 'If-then signals: usuário, local, dispositivo, risco' },
      { t: 'Microsoft Entra B2B e B2C', s: 'Colaboração externa e identidades de consumidor' },
      { t: 'Proteção de Identidade', s: 'Risco de usuário e login · Identity Protection' },
    ],
  },
  {
    id: 'd3',
    icon: '🛡️',
    name: 'Segurança Microsoft',
    weight: '35–40%',
    topics: [
      { t: 'Microsoft Defender XDR', s: 'Defender for Endpoint, Identity, Office 365, Cloud Apps' },
      { t: 'Microsoft Sentinel', s: 'SIEM + SOAR nativo da nuvem' },
      { t: 'Microsoft Defender for Cloud', s: 'CSPM · proteção de cargas multicloud' },
      { t: 'Azure Firewall & DDoS', s: 'Proteção de rede na camada de borda' },
      { t: 'Key Vault', s: 'Gestão de chaves, segredos e certificados' },
      { t: 'Microsoft Secure Score', s: 'Medição da postura de segurança do tenant' },
      { t: 'Gerenciamento de ameaças', s: 'Detecção, resposta e mitigação de ataques' },
    ],
  },
  {
    id: 'd4',
    icon: '📋',
    name: 'Conformidade Microsoft',
    weight: '20–25%',
    topics: [
      { t: 'Service Trust Portal (STP)', s: 'Documentos de auditoria, relatórios e whitepapers' },
      { t: 'Microsoft Purview Compliance Portal', s: 'Central única de gestão de conformidade' },
      { t: 'Compliance Manager', s: 'Pontuação e ações de melhoria por regulamento' },
      { t: 'Prevenção de Perda de Dados (DLP)', s: 'Proteção de dados sensíveis em trânsito e em repouso' },
      { t: 'Sensibilidade & Rótulos', s: 'Sensitivity labels e Information Protection' },
      { t: 'eDiscovery', s: 'Identificação e exportação de conteúdo relevante' },
      { t: 'Auditoria & Retenção', s: 'Políticas de retenção e logs de auditoria unificada' },
    ],
  },
];

/* ---------- Estado persistente ---------- */
const STORAGE_KEY = 'sc900_blueprint_progress_v1';
const state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

/* ---------- Render dos cards de tópicos ---------- */
const grid = document.getElementById('topicsGrid');
const miniWrap = document.getElementById('domainMini');

DOMAINS.forEach((d) => {
  // Card principal
  const card = document.createElement('article');
  card.className = 'topic-card reveal';

  card.innerHTML = `
    <header class="topic-card__head">
      <div class="topic-card__title">
        <div class="topic-card__icon">${d.icon}</div>
        <div>
          <h3>${d.name}</h3>
          <span>${d.weight}</span>
        </div>
      </div>
      <span class="topic-card__count" data-count="${d.id}">0/${d.topics.length}</span>
    </header>
    <ul class="topic-card__list">
      ${d.topics.map((tp, i) => {
        const key = `${d.id}-${i}`;
        const done = state[key] ? 'done' : '';
        return `
          <li class="topic-item ${done}" data-key="${key}">
            <span class="topic-item__check">
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            <div>
              <div class="topic-item__text">${tp.t}</div>
              <div class="topic-item__sub">${tp.s}</div>
            </div>
          </li>`;
      }).join('')}
    </ul>
  `;
  grid.appendChild(card);

  // Mini progress por domínio
  const mini = document.createElement('div');
  mini.className = 'domain-mini__item';
  mini.innerHTML = `
    <div class="domain-mini__item-top">
      <span>${d.icon} ${d.name}</span>
      <span data-mini-value="${d.id}">0%</span>
    </div>
    <div class="domain-mini__item-bar">
      <div class="domain-mini__item-fill" data-mini-fill="${d.id}" style="background:${miniColor(d.id)}"></div>
    </div>
  `;
  miniWrap.appendChild(mini);
});

function miniColor(id) {
  return ({
    d1: '#4F8EF7', d2: '#7FBA00', d3: '#F25022', d4: '#FFB900',
  })[id];
}

/* ---------- Toggle dos checkboxes ---------- */
document.querySelectorAll('.topic-item').forEach((item) => {
  item.addEventListener('click', () => {
    const key = item.dataset.key;
    state[key] = !state[key];
    if (!state[key]) delete state[key];
    item.classList.toggle('done');
    saveState();
    updateProgress();
  });
});

/* ---------- Cálculo de progresso ---------- */
function updateProgress() {
  let totalDone = 0;
  let totalTopics = 0;

  DOMAINS.forEach((d) => {
    let done = 0;
    d.topics.forEach((_, i) => {
      if (state[`${d.id}-${i}`]) done++;
    });
    totalDone += done;
    totalTopics += d.topics.length;

    const pct = Math.round((done / d.topics.length) * 100);
    const countEl = document.querySelector(`[data-count="${d.id}"]`);
    const miniVal = document.querySelector(`[data-mini-value="${d.id}"]`);
    const miniFill = document.querySelector(`[data-mini-fill="${d.id}"]`);
    if (countEl) countEl.textContent = `${done}/${d.topics.length}`;
    if (miniVal) miniVal.textContent = `${pct}%`;
    if (miniFill) miniFill.style.width = `${pct}%`;
  });

  const overall = totalTopics ? Math.round((totalDone / totalTopics) * 100) : 0;
  document.getElementById('overallValue').textContent = `${overall}%`;
  document.getElementById('overallFill').style.width = `${overall}%`;
  document.getElementById('navProgressText').textContent = `${overall}% concluído`;

  // Conquistas
  if (overall === 100 && !state._celebrated) {
    showToast('🏆 Parabéns! Você dominou todos os tópicos da SC-900!');
    state._celebrated = true;
    saveState();
  }
}

/* ---------- Toast ---------- */
const toast = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  toast.innerHTML = `<span class="toast__dot"></span>${msg}`;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ---------- Reset ---------- */
document.getElementById('resetBtn').addEventListener('click', () => {
  Object.keys(state).forEach((k) => delete state[k]);
  saveState();
  document.querySelectorAll('.topic-item.done').forEach((el) => el.classList.remove('done'));
  updateProgress();
  showToast('Progresso resetado. Bons estudos! 📖');
});

/* ---------- Animação de entrada (reveal on scroll) ---------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

/* ---------- Contadores animados (stats do hero) ---------- */
function animateCounters() {
  document.querySelectorAll('.stat__num').forEach((el) => {
    const target = +el.dataset.target;
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

/* ---------- Inicialização ---------- */
updateProgress();
setTimeout(animateCounters, 400);

// Re-observa cards que foram gerados dinamicamente
document.querySelectorAll('.topic-card.reveal').forEach((el) => observer.observe(el));
