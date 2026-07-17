const AB_DOMAINS = [
  { name: 'Microsoft 365 e segurança', weight: '30–35%', topics: [
    'Licenças, usuários, grupos e configurações da organização',
    'Exchange: caixas de correio e grupos de distribuição',
    'SharePoint: sites, bibliotecas, pastas, funções e permissões',
    'Teams: equipes, canais e políticas',
    'Zero Trust, autenticação, autorização e SSO',
    'Entra ID, Acesso Condicional e solução de problemas de entrada',
    'Identity Secure Score, logs de auditoria e PIM',
    'App registrations, Enterprise apps e Defender XDR'
  ]},
  { name: 'Dados, Purview e Copilot', weight: '35–40%', topics: [
    'Information Protection, classificação e sensitivity labels',
    'DLP, retenção e Data Lifecycle Management',
    'Insider Risk e Communication Compliance',
    'DSPM for AI e atividade de IA',
    'Como Copilot usa permissões e Microsoft Graph',
    'Controles de Purview e Defender para riscos de IA',
    'Princípios de IA responsável e Compliance Manager',
    'Activity Explorer, Data Explorer e eDiscovery',
    'Oversharing e governança de acesso no SharePoint'
  ]},
  { name: 'Copilot e agentes', weight: '25–30%', topics: [
    'Copilot integrado versus agentes',
    'Licença mensal versus pagamento conforme o uso',
    'Researcher, Analyst e agentes personalizados',
    'Atribuição de licenças e políticas de cobrança',
    'Uso, adoção e Copilot Analytics',
    'Salvar, compartilhar, agendar e excluir prompts',
    'Acesso, criação e aprovação de agentes',
    'Monitoramento e ciclo de vida de agentes'
  ]}
];
const AB_KEY = 'ab900_blueprint_progress_v1';
let abState = (() => { try { return JSON.parse(localStorage.getItem(AB_KEY) || '{}'); } catch { return {}; } })();
const checklist = document.getElementById('abChecklist');

function renderABChecklist() {
  checklist.innerHTML = AB_DOMAINS.map((domain, di) => `
    <article class="ab-check-group reveal">
      <h3>${di + 1}. ${domain.name}</h3><small>${domain.weight} · ${domain.topics.length} objetivos</small>
      ${domain.topics.map((topic, ti) => {
        const id = `d${di}-t${ti}`;
        return `<label class="ab-check"><input type="checkbox" data-id="${id}" ${abState[id] ? 'checked' : ''}><span>${topic}</span></label>`;
      }).join('')}
    </article>`).join('');
  checklist.querySelectorAll('input').forEach(input => input.addEventListener('change', () => {
    abState[input.dataset.id] = input.checked;
    try { localStorage.setItem(AB_KEY, JSON.stringify(abState)); } catch {}
    updateABProgress();
  }));
  updateABProgress();
}

function updateABProgress() {
  const inputs = [...checklist.querySelectorAll('input')];
  const done = inputs.filter(input => input.checked).length;
  const pct = inputs.length ? Math.round(done / inputs.length * 100) : 0;
  document.getElementById('abProgress').textContent = `${pct}%`;
  document.getElementById('abProgressText').textContent = `${done} de ${inputs.length} objetivos dominados`;
  document.getElementById('abProgressFill').style.width = `${pct}%`;
}

document.getElementById('abReset').addEventListener('click', () => {
  abState = {};
  try { localStorage.removeItem(AB_KEY); } catch {}
  renderABChecklist();
});
renderABChecklist();
