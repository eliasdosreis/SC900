# 🛡️ SC-900 Blueprint — Projeto Completo de Estudos

> **Microsoft Security, Compliance & Identity Fundamentals**
> Um projeto de estudos interativo que ensina os conceitos da certificação SC-900
> usando a metodologia **"Criança → Sênior"**: cada conceito é explicado com uma
> analogia simples (intuição) e depois aprofundado em nível técnico sênior.

---

## 📜 Índice

1. [Visão Geral do Projeto](#-visão-geral-do-projeto)
2. [Estrutura Atual dos Módulos](#-estrutura-atual-dos-módulos)
3. [A Metodologia "Criança → Sênior"](#-a-metodologia-criança--sênior)
4. [Padrão de Arquivos (Nomenclatura)](#-padrão-de-arquivos-nomenclatura)
5. [🎨 PLAYBOOK — Como Criar um Novo Módulo](#-playbook--como-criar-um-novo-módulo) ⭐
6. [Design System (Regras Visuais)](#-design-system-regras-visuais)
7. [Regras Pedagógicas](#-regras-pedagógicas)
8. [Regras para o Quiz (English Mode)](#-regras-para-o-quiz-english-mode)
9. [Checklist Final de Qualidade](#-checklist-final-de-qualidade)
10. [Roadmap dos Próximos Módulos](#-roadmap-dos-próximos-módulos)

---

## 🎯 Visão Geral do Projeto

Este projeto é uma página web estática (HTML + CSS + JavaScript puro, **sem dependências, sem build**) para estudar certificações Fundamentals da Microsoft. A trilha original cobre a **SC-900** e a nova seção cobre a **AB-900**.

### Características principais

- ✅ **Sem servidor, sem build, sem npm** — basta abrir o `index.html` no navegador
- ✅ **Progresso salvo no navegador** (localStorage) — não se perde ao fechar
- ✅ **100% responsivo** — funciona em desktop e mobile
- ✅ **Design "Blueprint" moderno** — tema escuro, grid técnico, glows coloridos
- ✅ **Bilíngue** — conteúdo em português, quiz em inglês (como a prova real)
- ✅ **Acessível** — respeita `prefers-reduced-motion`, usa semântica HTML

### Como rodar

```bash
# Opção 1: Abrir diretamente
Duplo-clique em index.html

# Opção 2: Servir localmente (recomendado para testar)
python -m http.server 8000
# Abra http://localhost:8000
```

---

## 📁 Estrutura Atual dos Módulos

```
SC900/
├── index.html              # Página principal (Blueprint + checklist de tópicos)
├── styles.css              # Design system global (compartilhado)
├── script.js               # Lógica da página principal (checklist + progresso)
├── effects.css             # ⭐ Efeitos visuais globais (tilt, glow, particles, animations)
├── effects.js              # ⭐ Interação visual (partículas, tilt 3D, confetti, ripple)
├── assets/modules/         # Ilustrações otimizadas dos heroes de cada módulo
│
├── modulo-1.html           # Módulo 1 — Aulas interativas (PT)
├── modulo-1.css            # Estilos específicos do Módulo 1
├── modulo-1.js             # Interatividade do Módulo 1 (camadas, quiz PT, progresso)
│
├── quiz-1.html             # Quiz do Módulo 1 (EN — English Mode)
├── quiz-1.css              # Estilos específicos do quiz
├── quiz-1.js               # 10 questões + vocabulário + feedback
│
├── modulo-2.html           # Módulo 2 — Aulas interativas (PT)
├── modulo-2.css            # Estilos específicos do Módulo 2
├── modulo-2.js             # Interatividade do Módulo 2 (progresso, quiz PT)
│
├── quiz-2.html             # Quiz do Módulo 2 (EN — English Mode)
├── quiz-2.css              # Estilos específicos do quiz
├── quiz-2.js               # 10 questões + vocabulário + feedback
│
├── modulo-3.html/.css/.js  # Módulo 3 — Segurança Microsoft + quiz PT
├── quiz-3.html/.css/.js    # Quiz do Módulo 3 (EN — English Mode)
│
├── modulo-4.html/.css/.js  # Módulo 4 — Conformidade Microsoft + quiz PT
├── quiz-4.html/.css/.js    # Quiz do Módulo 4 (EN — English Mode)
│
└── README.md               # Este playbook 👈
```

### Status dos módulos

| Módulo | Título | Peso | Aulas | Quiz EN | Status |
|--------|--------|------|-------|---------|--------|
| **1** | Conceitos de Segurança, Conformidade e Identidade | 10–15% | 7 ✅ | 10 questões ✅ | **CONCLUÍDO** |
| **2** | Capacidades do Microsoft Entra ID | 25–30% | 6 ✅ | 10 questões ✅ | **CONCLUÍDO** |
| **3** | Soluções de Segurança da Microsoft | 35–40% | 6 ✅ | 10 questões ✅ | **CONCLUÍDO** |
| **4** | Soluções de Conformidade da Microsoft | 20–25% | 6 ✅ | 10 questões ✅ | **CONCLUÍDO** |

### Trilha AB-900

A página `ab-900.html` inicia uma área independente para **Microsoft 365 Copilot and Agent Administration Fundamentals**, com progresso salvo na chave `ab900_blueprint_progress_v1`.

| Domínio oficial (blueprint de 22/07/2026) | Peso |
|---|---:|
| Recursos e objetos principais dos serviços Microsoft 365 | 30–35% |
| Proteção e governança de dados para Microsoft 365 e Copilot | 35–40% |
| Administração básica de Copilot e agentes | 25–30% |

Arquivos da seção: `ab-900.html`, `ab-900.css` e `ab-900.js`. O `index.html` mantém a SC-900 como trilha principal e oferece um card para acessar a AB-900.

#### AB-900 · Módulo 01 — Microsoft 365: objetos, serviços e segurança ✅

- Peso oficial: **30–35%**
- Arquivos: `ab-modulo-1.html/.css/.js` e `ab-quiz-1.html/.css/.js`
- 6 aulas, 6 cenários de estudo ativo, quiz PT com 6 questões
- English Exam Mode com 10 questões originais e 16 termos
- Progresso: `ab900_module1_progress_v1`
- Estudo ativo: `ab900_module1_active_study_v1`

**Aulas**: tenant/licenças/admin center; Exchange; SharePoint e Teams; Zero Trust e Defender XDR; Entra ID, diagnóstico e PIM; app registrations e Enterprise applications.

**Analogias novas**: cidade universitária, central postal, estúdio de produção, aeroporto internacional, sala de emergência e projeto/robô instalado.

#### AB-900 · Módulo 02 — Guardiões dos Dados ✅

- Peso oficial: **35–40%**
- Arquivos: `ab-modulo-2.html/.css/.js` e `ab-quiz-2.html/.css/.js`
- 6 missões, 6 cenários na Sala de Comando, quiz PT com 6 questões
- English Exam Mode com 10 questões originais e 16 termos
- Progresso: `ab900_module2_progress_v1`
- Estudo ativo: `ab900_module2_active_study_v1`

**Aulas**: Microsoft Purview; classificação, rótulos, DLP e retenção; Copilot, Microsoft Graph, permissões e IA responsável; conformidade e riscos; DSPM for AI e eDiscovery; oversharing e SharePoint Advanced Management.

**Analogias novas**: observatório dos guardiões, alfândega mágica, oráculo que respeita portas, torre de vigia, cartógrafo/investigador e castelo com portões demais.

#### AB-900 · Módulo 03 — Academia dos Mestres de Agentes ✅

- Peso oficial: **25–30%**
- Arquivos: `ab-modulo-3.html/.css/.js` e `ab-quiz-3.html/.css/.js`
- 6 provas, 6 cenários no Conselho dos Agentes e quiz PT com 6 questões
- English Exam Mode com 10 questões originais e 16 termos
- Progresso: `ab900_module3_progress_v1`
- Estudo ativo: `ab900_module3_active_study_v1`

**Aulas**: Copilot, Researcher, Analyst e agentes personalizados; licença mensal e pay-as-you-go; atribuição de licenças e políticas de cobrança; adoção, Analytics e prompts; criação, acesso e aprovação; monitoramento e ciclo de vida nos centros de administração do Microsoft 365 e Power Platform.

**Analogias novas**: guilda de especialistas, estação de duas tarifas, tesouraria dos emblemas, observatório/biblioteca de prompts, forja com conselho de aprovação e torres de vigia do ciclo de vida.

---

## 🧠 A Metodologia "Criança → Sênior"

Esta é a **alma do projeto**. Cada conceito é ensinado em **duas camadas**:

### 🎨 Camada 1 — Analogia para Criança (caixa laranja)

- Usa uma história, metáfora ou situação do dia a dia
- Objetivo: criar **intuição imediata** e memorável
- Linguagem: simples, com emojis, itálico
- Cor: **laranja** (`var(--c-kid)` / `#ffb86b`)
- Componente visual: `.story` (caixa com fundo laranja translúcido)

### ⚡ Camada 2 — Nível Sênior (tag azul)

- Aprofundamento técnico real, com termos da prova
- Objetivo: entregar a **profundidade exigida** pelo exame
- Linguagem: técnica, com negrito nos termos-chave
- Cor: **azul** (`var(--c-senior)` / `#6bb7ff`)
- Componente visual: `.tag--senior` + texto dentro de `.pillar__senior` / `.layer-detail__senior`

### Exemplo prático (Zero Trust)

```
🏰 CRIANÇA:
"Pense num parque de diversões super seguro. No modelo antigo, você
mostra o ingresso só na entrada. No Zero Trust, o guarda confere seu
ingresso EM CADA BRINQUEDO, toda vez."

⚡ SÊNIOR:
"Verify Explicitly + Least Privilege + Assume Breach. Autenticar
sempre, com base em múltiplos sinais (identidade, local, dispositivo,
risco). Nada de confiança implícita por estar dentro da rede corporativa."
```

### Biblioteca de analogias já usadas (NÃO REPETIR)

Para evitar analogias repetidas entre módulos, aqui está o registro:

| Conceito | Analogia | Módulo |
|----------|----------|--------|
| Tríade CIA | 🏰 Baú do tesouro | 1 |
| Zero Trust | 🎢 Parque de diversões (ingresso a cada brinquedo) | 1 |
| Defesa em Profundidade | 🧅 Castelo com muralhas / Cebola de camadas | 1 |
| AuthN vs AuthZ | 🎶 Balada VIP ("quem é você?" vs "o que pode fazer?") | 1 |
| Modelos de Nuvem | 🏠 IaaS=construção, PaaS=apto mobiliado, SaaS=hotel | 1 |
| Conformidade vs Segurança | 🎮 Regras da escola + trancar armário | 1 |
| Tipos de Identidade | 🏢 Prédio corporativo (tenant=prédio, usuário=morador, grupo=sindicato, serviço=zelador) | 2 |
| Entra ID vs AD DS | 🌐 Matriz local (AD) vs Sede nacional/global (Entra ID) + Correio expresso (Connect) | 2 |
| Evolução da Autenticação | 🚪 Três cadeados na porta (senha → MFA → passwordless) | 2 |
| Acesso Condicional | 🎫 Fiscal do trem bala que analisa sinais antes de liberar | 2 |
| Governança & PIM | 🗝️ Chave-mestra do cofre emprestada só na hora (just-in-time) | 2 |
| B2B vs B2C | 🤝 Clube exclusivo: B2B=visitante VIP de outra empresa, B2C=clientes da rua no app | 2 |
| Infraestrutura Azure | 🏙️ Cidade inteligente com bairros, cancelas, alfândega, túnel e cofre | 3 |
| Defender for Cloud | 🏗️ Inspetor de obras em vários canteiros | 3 |
| Microsoft Sentinel | 🛰️ Torre de controle que correlaciona radares e executa emergências | 3 |
| Microsoft Defender XDR | 🧩 Equipe de detetives compartilhando o mural do caso | 3 |
| Família Defender | 🦸 Hospital com alas especializadas e prontuário unificado | 3 |
| Vulnerabilidades e Threat Intelligence | 🔬 Oficina preventiva e mapa do tempo das ameaças | 3 |
| STP e privacidade | 🍽️ Restaurante com cozinha de vidro e pasta de inspeções | 4 |
| Compliance Manager | ✈️ Painel de manutenção do avião | 4 |
| Classificação e explorers | 📚 Biblioteca investigativa | 4 |
| Sensitivity labels | 🧳 Etiqueta inteligente da mala | 4 |
| DLP e retenção | 🚰 Rede de água e arquivo histórico | 4 |
| Insider Risk, eDiscovery e Audit | ⚖️ Equipe do tribunal digital | 4 |

> **Ao criar novos módulos, invente analogias NOVAS e igualmente memoráveis.**

---

## 📦 Padrão de Arquivos (Nomenclatura)

Cada módulo segue um padrão fixo de **6 arquivos**:

```
modulo-{N}.html       # Aulas interativas em português
modulo-{N}.css        # Estilos específicos do módulo
modulo-{N}.js         # Interatividade do módulo (progresso, componentes)

quiz-{N}.html         # Quiz em INGLÊS (English Mode)
quiz-{N}.css          # Estilos do quiz
quiz-{N}.js           # Questões + vocabulário + feedback
```

Onde `{N}` é o número do módulo (1, 2, 3, 4).

### Arquivos compartilhados (NÃO duplicar)

- `styles.css` — design system global (importado por TODAS as páginas)
- `script.js` — só da página principal `index.html`

### Conexão entre módulos (links)

Cada `modulo-{N}.html` deve ter no rodapé:
```html
<a href="index.html" class="btn btn--ghost">← Back to Blueprint</a>
```

E cada `quiz-{N}.html` deve ter:
```html
<a href="modulo-{N}.html">← Lessons</a>  <!-- no nav -->
<a href="index.html">← Back to Blueprint</a>  <!-- no footer -->
```

---

## ⭐ 🎨 PLAYBOOK — Como Criar um Novo Módulo

> **LEIA ESTA SEÇÃO ANTES DE COMEÇAR QUALQUER MÓDULO NOVO.**
> Siga os passos **exatamente nesta ordem** para manter a consistência.

### Passo 0 — Preparação

1. **Identifique o módulo** pelo número e título oficial:
   - Verifique o peso na prova (10–15%, 25–30%, etc.)
   - Consulte o [Study Guide oficial da SC-900](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-900)
2. **Crie os 6 arquivos** com a nomenclatura correta (`modulo-{N}.*` e `quiz-{N}.*`)
3. **Defina as 5–7 aulas** baseadas nas sub-áreas do study guide oficial

### Passo 1 — Criar `modulo-{N}.html` (Aulas)

Use `modulo-1.html` como template. Cada página de módulo deve conter:

#### Estrutura HTML obrigatória

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Módulo {N} · {Título} — SC-900</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter...&family=JetBrains+Mono...&family=Fredoka..." rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />        <!-- GLOBAL (sempre) -->
  <link rel="stylesheet" href="modulo-{N}.css" />     <!-- ESPECÍFICO -->
  <link rel="stylesheet" href="effects.css" />       <!-- EFEITOS (sempre) -->
</head>
<body>
  <!-- 1. Decoração fixa (copiar do modulo-1.html) -->
  <div class="grid-overlay" aria-hidden="true"></div>
  <div class="glow glow--1" aria-hidden="true"></div>
  <div class="glow glow--2" aria-hidden="true"></div>

  <!-- 2. NAVBAR (com nav__links apontando para #aula-1, #aula-2, ...) -->
  <header class="nav">...</header>

  <!-- 3. HERO do módulo (título + subtitle + trilha visual .m-hero__path) -->
  <section class="m-hero">...</section>

  <!-- 4. PROGRESSO (.progress-card com id únicos: moduleProgress, moduleFill, moduleHint) -->
  <div class="m-progress-wrap">...</div>

  <!-- 5. AULAS — repetir o bloco <section class="lesson" id="aula-X"> para cada aula -->
  <section class="lesson" id="aula-1">
    <div class="lesson__head reveal">
      <span class="lesson__num">Aula 01</span>
      <h2>Emoji + Título</h2>
      <p class="lesson__intro">Introdução</p>
    </div>
    <div class="lesson__body">
      <!-- Analogia (caixa laranja) -->
      <div class="story reveal">...</div>
      <!-- Conteúdo (cards, comparações, etc.) -->
      <!-- Callout (.callout--tip / --key / --warning) -->
    </div>
    <button class="lesson__done reveal" data-complete="aula-1">...</button>
  </section>

  <!-- 6. QUIZ em português (breve, ~6 questões) + Banner para o quiz em inglês -->
  <section class="lesson" id="quiz">
    <a href="quiz-{N}.html" class="en-quiz-banner reveal">...</a>
    <div class="quiz reveal" id="quizContainer"></div>
  </section>

  <!-- 7. FOOTER -->
  <footer class="footer">
    <a href="index.html" class="btn btn--ghost">← Back to Blueprint</a>
  </footer>

  <div class="toast" id="toast"></div>
  <script src="modulo-{N}.js"></script>
  <script src="effects.js"></script>              <!-- EFEITOS (sempre por último) -->
</body>
</html>
```

> **⚠️ NOTA SOBRE `script.js`**: A página principal `index.html` usa `script.js` para o checklist de tópicos. As páginas de módulo (`modulo-{N}.html`) **NÃO precisam importar `script.js`** — elas têm sua própria lógica em `modulo-{N}.js`. Confirme o que cada página importa antes de duplicar.

### Passo 2 — Criar `modulo-{N}.css` (Estilos)

**Comece sempre com este cabeçalho**:
```css
/* ============================================================
   SC-900 · MÓDULO {N} — Estilos específicos
   ============================================================ */
:root {
  --c-kid: #ffb86b;     /* laranja — analogia para criança */
  --c-senior: #6bb7ff;  /* azul — nível sênior */
}
```

**Reutilize classes do `styles.css` (global)**: `.nav`, `.badge`, `.btn`, `.progress-card`, `.callout`, `.toast`, `.reveal`, `.footer`. Só crie classes novas para componentes específicos do módulo (ex.: `.cia-triad`, `.layers`, `.house-grid`).

### Passo 3 — Criar `modulo-{N}.js` (Interatividade)

**Funções obrigatórias em todo módulo**:

```javascript
// 1. Chave de localStorage ÚNICA por módulo
const MODULE_KEY = 'sc900_module{N}_progress_v1';

// 2. Estado das aulas (array com IDs das L aulas; L não é o número do módulo)
const lessons = ['aula-1', 'aula-2', ..., 'aula-{L}'];
let lessonState = loadModuleState();

// 3. Funções: loadModuleState(), saveModuleState()
// 4. Botões ".lesson__done" com data-complete="aula-X"
// 5. Funções: updatePathDots(), updateModuleProgress()
// 6. Quiz em português (~6 questões) com QUESTIONS[], renderQuiz(),
//    handleQuizAnswer(), showResult()
// 7. IntersectionObserver para animações .reveal
// 8. showToast() function
```

#### Estudo ativo (recomendado para módulos densos)

Além da leitura e do quiz, prefira pelo menos uma interação que obrigue o aluno a **recuperar, decidir ou explicar** o conteúdo. Boas opções:

- Missões baseadas em cenários, com decisão e feedback explicativo.
- Flashcards que mostram primeiro a pergunta e só depois a resposta.
- Técnica Feynman/teach-back: explicar o conceito antes de ver os pontos essenciais.
- Associação ou classificação de conceitos fáceis de confundir.

Se houver gamificação, salve-a em uma chave separada do progresso das aulas, por exemplo `sc900_module{N}_active_study_v1`. XP nunca deve marcar uma aula como concluída automaticamente. O estado precisa tolerar `localStorage` vazio ou inválido, e cada controle deve funcionar por teclado, ter texto visível e feedback com `aria-live` quando necessário.

### Passo 4 — Criar `quiz-{N}.html` (Quiz em Inglês)

Use `quiz-1.html` como template. Estrutura:

1. **HERO** — badge "English Exam Mode", título com `.en-flag`, metadados (10 questions, ~10 min, 70% to pass, EN)
2. **Seção de VOCABULÁRIO** (16 termos em cards `.vocab-card`)
3. **QUIZ** — 10 questões com toolbar sticky (progress dots + score ao vivo)
4. **RESULTADO** — score, grade (PASSED/KEEP STUDYING), mensagem, botões de retry/review

#### Componente-chave: a pergunta bilíngue

```html
<div class="quiz-q">
  <div class="quiz-q__top">
    <div class="quiz-q__num">Question {X} of 10</div>
    <span class="quiz-q__topic">{Tópico}</span>
  </div>
  <div class="quiz-q__text">{Pergunta em inglês}</div>
  <button class="quiz-q__translate-btn" data-q="{X}">🇧🇷 Ver tradução</button>
  <div class="quiz-q__translate" id="tr-{X}">{Tradução em português}</div>
  <div class="quiz-options">
    <!-- Cada opção tem texto em EN + hint em PT -->
    <button class="quiz-opt" data-q="{X}" data-o="0">
      <span class="quiz-opt__letter">A</span>
      <span class="quiz-opt__text">{Texto EN}<span class="quiz-opt__hint">{Tradução PT}</span></span>
    </button>
    ...
  </div>
  <!-- Explicação aparece após responder: EN + nota PT -->
</div>
```

### Passo 5 — Criar `quiz-{N}.js` (Questões)

**Estrutura de dados obrigatória para cada questão**:

```javascript
const QUESTIONS = [
  {
    topic: 'Nome do tópico',           // ex: "Zero Trust"
    question: 'Pergunta em inglês',     // SEMPRE em inglês
    pt: 'Tradução da pergunta em PT',   // para o botão de tradução
    options: [
      { en: 'Opção em inglês', pt: 'Tradução da opção' },
      // ... 4 opções no total
    ],
    correct: 0,                         // índice da correta (0-3)
    explain: 'Explicação em <strong>EN</strong> com termos em <em>PT</em>',
    ptNote: 'Dica em português para fixar',  // nota 🇧🇷 no final
  },
  // ... 10 questões no total
];
```

**Funções obrigatórias**: `renderDots()`, `renderQuiz()`, `toggleTranslation()`, `handleAnswer()`, `showResult()`, listener do botão retry, `IntersectionObserver` para reveal, `showToast()`.

### Passo 6 — Atualizar `index.html` (conexões)

Após criar um módulo, **sempre adicione/atualize** em `index.html`:

1. **Badge do hero** — atualize para `NOVO · Módulo {N} disponível`.
2. **Card de acesso** — crie um `.module-access__card` com número, peso vigente, título, resumo, cor do módulo e link para `modulo-{N}.html`.
3. **Módulos anteriores** — preserve todos os cards já publicados; nunca substitua um acesso antigo pelo novo.
4. **Roadmap e checklist** — confirme que peso e descrição coincidem com o Study Guide e com `DOMAINS[]` em `script.js`.

### Passo 7 — Importar `effects.css` e `effects.js` em todas as páginas

⚠️ **PASSO FREQUENTEMENTE ESQUECIDO!**

Em **CADA** `.html` criado:

```html
<!-- No <head>, DEPOIS de styles.css e modulo-{N}.css: -->
<link rel="stylesheet" href="effects.css" />

<!-- Antes de </body>, DEPOIS de todos os outros scripts: -->
<script src="effects.js"></script>
```

Páginas existentes que devem ser conferidas:
- `index.html`
- `modulo-1.html`
- `modulo-2.html`
- `quiz-1.html`
- `quiz-2.html`

> **Verificação rápida**: abra o HTML e busque por `effects.css` e `effects.js`. Se não encontrar, adicione.

> **Importante**: `script.js` pertence somente ao `index.html`. Cada página de módulo carrega apenas `modulo-{N}.js`; cada quiz carrega apenas `quiz-{N}.js`; `effects.js` fica sempre por último.

### Passo 8 — Atualizar o `README.md`

Na seção [Status dos módulos](#-estrutura-atual-dos-módulos), marque o módulo como ✅ CONCLUÍDO e registre as analogias usadas na tabela.

---

## 🎨 Design System (Regras Visuais)

### Paleta de cores (CSS Variables — em `styles.css`)

| Variável | Cor | Uso |
|----------|-----|-----|
| `--bg` | `#070b14` | Fundo principal (azul escuro quase preto) |
| `--surface` | `rgba(18,26,44,0.72)` | Cards (vidro fosco) |
| `--accent` | `#4f8ef7` | Azul de destaque principal |
| `--c-kid` | `#ffb86b` | **Laranja — analogia criança** |
| `--c-senior` | `#6bb7ff` | **Azul claro — nível sênior** |
| `--ms-blue` | `#00a4ef` | Verde Microsoft |
| `--ms-green` | `#7fba00` | Verde Microsoft (correto/sucesso) |
| `--ms-orange` | `#f25022` | Laranja Microsoft (erro) |
| `--ms-yellow` | `#ffb900` | Amarelo Microsoft (atenção) |

> **Regra de cor fundamental**: Criança = **laranja**, Sênior = **azul**. Sempre.

### Tipografia

- **Texto**: `Inter` (400–900)
- **Títulos de aula/hero**: `Fredoka` (500–700) — dá um tom mais amigável e lúdico
- **Códigos/números/labels**: `JetBrains Mono` (400–600)
- **Idioma**: atributo `lang="pt-BR"` nas páginas de aula, conteúdo em PT

### Componentes reutilizáveis (definidos em `styles.css`)

| Classe | Descrição |
|--------|-----------|
| `.nav` | Navbar sticky com blur |
| `.badge` + `.badge__pulse` | Badge animado no hero |
| `.btn` + `.btn--primary` / `.btn--ghost` | Botões |
| `.progress-card` | Card com barra de progresso |
| `.callout--tip` / `--key` / `--warning` | Caixas de destaque coloridas |
| `.toast` | Notificação temporária (canto inferior) |
| `.reveal` | Animação de entrada ao rolar (requer `IntersectionObserver`) |
| `.footer` | Rodapé com motto + nota |

### Componentes específicos de módulo (definidos em cada `modulo-{N}.css`)

| Classe | Descrição |
|--------|-----------|
| `.m-hero` | Hero do módulo (título + trilha) |
| `.m-hero__path` + `.path-dot` | Trilha visual de aulas (bolinhas numeradas) |
| `.lesson` | Seção de uma aula |
| `.lesson__head` / `.lesson__num` / `.lesson__intro` | Cabeçalho da aula |
| `.story` | **Caixa da analogia (laranja)** |
| `.tag--senior` | **Tag do nível sênior (azul)** |
| `.lesson__done` | Botão "concluir aula" |

### Regras de responsividade

- Breakpoints padrão: **760px** (tablets), **980px** (tablets grandes), **560px** (mobile)
- Grids de 4 colunas → 2 → 1 conforme a tela diminui
- Navbar: esconde os links em telas < 760px
- Sempre testar em mobile (Chrome DevTools → device toolbar)

### Imagens educacionais

- Cada módulo pode ter uma ilustração hero própria em `assets/modules/`, alinhada à cor accent e à analogia principal.
- Use imagens como reforço de contexto, não como decoração aleatória: o aluno deve reconhecer o domínio antes de ler o título.
- Sempre inclua `alt` descritivo, dimensões `width`/`height` para evitar layout shift e formato otimizado para web.
- Prefira composição com poucos elementos, contraste alto e sem texto embutido; traduções e acessibilidade ficam no HTML.
- Combine a imagem com 2–3 chips emocionais ou verbos de ação, como “Detectar → Investigar → Responder”, para orientar a leitura visual.
- Evite adicionar uma imagem grande em cada aula. Um hero forte e diagramas HTML/CSS interativos preservam desempenho e clareza.
- Respeite `prefers-reduced-motion`: zoom e movimentos da imagem devem ser sutis ou desativados pelo sistema global.

---

## 📚 Regras Pedagógicas

### 1. Estrutura de cada aula

Cada `<section class="lesson">` deve seguir esta sequência:

1. **Cabeçalho** (`.lesson__head`): número, título com emoji, introdução de 1-2 frases
2. **Analogia** (`.story`): a história "para criança" — sempre primeiro, para criar intuição
3. **Conteúdo principal**: cards, comparações, tabelas, componentes interativos
4. **Callout** (`.callout--tip` / `--key` / `--warning`): dica de prova ou conceito-chave
5. **Botão "concluir"** (`.lesson__done`): marca a aula como lida

### 2. Os 3 tipos de callout

| Classe | Cor | Quando usar |
|--------|-----|-------------|
| `.callout--tip` | Verde | Dica de prova, macete para memorizar |
| `.callout--key` | Azul | Conceito-chave, "decore isso" |
| `.callout--warning` | Amarelo | Cuidado, pegadinha comum |

### 3. Quantidade de aulas por módulo

- **Módulo 1** (concluído): 7 aulas
- **Próximos módulos**: **5–7 aulas** cada (proporcional ao peso e conteúdo)
- Cada aula deve ter **1 analogia central** + 1 callout no mínimo

### 4. Tom de voz

- **Acolhedor e encorajador** — nunca condescendente
- Usar "você" e "vamos"
- Emojis com moderação (para dar vida, não poluir)
- Frases curtas, escaneáveis
- Termos técnicos sempre em **negrito** na primeira aparição

### 5. Bilíngue (regra de ouro)

- **Aulas** (`modulo-{N}.html`): em **PORTUGUÊS** (conteúdo didático)
- **Quiz** (`quiz-{N}.html`): em **INGLÊS** (simula a prova real)
- No quiz, SEMPRE oferecer tradução (botão + hint em cada opção + nota PT na explicação)

---

## 📝 Regras para o Quiz (English Mode)

### Origem das questões

> ⚠️ **ÉTICA**: As questões são **originais**, escritas para cobrir os objetivos oficiais do exame. **NÃO são "exam dumps"**. São inspiradas nos tópicos mais cobrados, o que é a forma ética e eficaz de se preparar.

### Validação dos tópicos

Antes de escrever as questões, **sempre valide** os tópicos que mais caem:

1. Consulte o [Study Guide oficial](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-900)
2. Pesquise experiências recentes de quem fez a prova (Reddit, Medium)
3. Use practice tests gratuitos como referência de estilo (não para copiar)

### Estrutura de cada questão

```
✅ 10 questões por módulo
✅ Cada questão tem: topic, question (EN), pt (tradução), 4 opções (EN+PT), correct, explain (EN), ptNote (PT)
✅ 4 opções (A, B, C, D) — uma correta
✅ Explicação sempre após responder (não antes!)
✅ Cada questão foca em UM conceito — sem pegadinhas injustas
```

### Tipos de pegadinhas válidas (justas)

- **Termo trocado**: AuthN vs AuthZ, Confidencialidade vs Integridade
- **Responsabilidade**: "dados SEMPRE do cliente" (independente do modelo)
- **Definição exata**: Zero Trust = "never trust, always verify" (não "trust inside")
- **Classificação**: HIPAA = regulamento (não padrão); ISO 27001 = padrão (não lei)

### Vocabulário

- **16 termos por módulo** na seção de vocabulário (`.vocab-card`)
- Termos em EN com tradução PT e exemplo de uso
- Foco em palavras que aparecem no enunciado e confundem: *ensure, prevent, allow, require, enforce*

### Feedback e resultado

- **Toolbar sticky** com progress dots coloridos + score ao vivo
- **Toast feedback** instantâneo após cada resposta (✅/❌)
- **Auto-scroll** suave para a próxima questão
- **Tela de resultado** com:
  - Score final (ex: `8/10`)
  - Grade: `PASSED` (≥70%) ou `KEEP STUDYING` (<70%)
  - Mensagem motivacional adaptativa
  - Botões: Try Again / Review Vocabulary / Review Lessons

---

## ✅ Checklist Final de Qualidade

Antes de marcar um módulo como CONCLUÍDO, verifique:

- [ ] Os 6 arquivos foram criados (`modulo-{N}.html/css/js` + `quiz-{N}.html/css/js`)
- [ ] Cada aula tem analogia (`.story` laranja) + nível sênior (`.tag--senior` azul)
- [ ] Analogias são **novas** (não repetidas de módulos anteriores — consultar tabela)
- [ ] Cada aula tem pelo menos 1 callout (`.callout--tip` / `--key` / `--warning`)
- [ ] Progresso das aulas salva no localStorage (chave única: `sc900_module{N}_progress_v1`)
- [ ] Trilha visual (`.path-dot`) atualiza ao concluir aulas
- [ ] Quiz tem exatamente 10 questões em **inglês**
- [ ] Quiz tem seção de vocabulário (16 termos `.vocab-card`)
- [ ] Cada questão tem tradução (botão + hint + ptNote)
- [ ] Toolbar sticky com progress dots funciona
- [ ] Toast aparece ao responder
- [ ] Tela de resultado calcula PASSED/KEEP STUDYING (threshold 70%)
- [ ] **`effects.css` importado no `<head>`** de TODAS as páginas
- [ ] **`effects.js` importado antes de `</body>`** (por último)
- [ ] `index.html` foi atualizado (badge NOVO + botão para o novo módulo)
- [ ] **README atualizado**: status + tabela de analogias + sub-áreas do roadmap
- [ ] **Sem caracteres estranhos** no código (buscar fora do ASCII, ex: chinês)
- [ ] **Nenhum `display:none`** gambiarra — elementos errados foram deletados
- [ ] Testado em mobile (responsividade)
- [ ] **Cor accent do módulo definida** em `modulo-{N}.css` (e diferente dos anteriores)

### Validação de consistência estrutural

Antes de publicar, trate estes quatro lugares como uma única fonte de verdade para a quantidade de aulas:

1. Links `.nav__links` que apontam para `#aula-X`.
2. Pontos `.path-dot[data-lesson]` no hero.
3. Seções `<section class="lesson" id="aula-X">` e botões `data-complete="aula-X"`.
4. Array `lessons[]` em `modulo-{N}.js`.

As quatro contagens e os IDs devem coincidir. Um link para uma aula inexistente quebra a navegação e impede a trilha de representar o progresso real. O ponto do quiz não deve usar `data-lesson`, pois não faz parte do cálculo de conclusão das aulas.

Também valide, para cada quiz:

- Exatamente 10 objetos em `QUESTIONS[]`, cada um com quatro opções e um índice `correct` entre 0 e 3.
- Exatamente 16 cards de vocabulário.
- Tradução da pergunta, tradução das opções, explicação em inglês e `ptNote` em português.
- Resultado com aprovação em `>= 70%`, retry funcional e links de retorno.
- Nenhum `href="#aula-X"` sem um `id="aula-X"` correspondente.

### Checklist de cobertura contra o Study Guide

- Não use apenas o roadmap antigo do README como fonte. Consulte a versão e a data dos objetivos oficiais antes de criar ou revisar conteúdo.
- Registre no README a data-base do blueprint usado. Revisão atual em **17/07/2026**: objetivos vigentes antes de 28/07/2026, com a próxima versão já publicada pela Microsoft para entrar em vigor nessa data.
- Faça uma matriz simples “objetivo oficial → aula → questão do quiz” durante a revisão. Um objetivo pode compartilhar uma aula, mas não deve ficar apenas implícito.
- Dê atenção especial a pares fáceis de confundir: **Entra roles vs Azure RBAC**, **SIEM vs SOAR**, **Defender XDR vs Sentinel**, **CSPM vs workload protection**, **NSG vs Azure Firewall vs WAF** e **governança vs risco vs conformidade**.

---

## 🗺️ Roadmap dos Próximos Módulos

### Módulo 1 — Conceitos de Segurança, Conformidade e Identidade (10–15%) ✅ CONCLUÍDO

**Aulas criadas (7 aulas)**: tríade CIA, Zero Trust, defesa em profundidade, identidade, responsabilidade compartilhada, conformidade/GRC e privacidade/confiança.

**Treino ativo**:

- 7 missões por cenário com feedback imediato.
- 10 flashcards de recuperação ativa.
- 5 desafios de explicação pela técnica Feynman, com cronômetro.
- XP, nível, precisão, sequência e conceitos dominados salvos em `sc900_module1_active_study_v1`.

**Ilustrações didáticas**:

- Tríade CIA: controle de acesso, detecção de alteração e resiliência ao redor do mesmo dado.
- Zero Trust: verificações sucessivas de identidade, dispositivo e destino.
- Defesa em profundidade: muralhas concêntricas até o dado central.
- Responsabilidade compartilhada: comparação visual entre IaaS, PaaS e SaaS.

As imagens ficam em `assets/modules/module-1/`, usam legendas interpretativas em HTML e carregamento lazy.

**Regra pedagógica aplicada**: a atividade não substitui a conclusão das aulas nem o quiz; ela mede prática deliberada em um estado separado.

---

### Módulo 2 — Capacidades do Microsoft Entra ID (25–30%) ✅ CONCLUÍDO

**Aulas criadas**:
- Aula 1: Tipos de Identidade (tenant, usuário, grupo, dispositivo, conta de serviço)
- Aula 2: Entra ID vs AD DS + Entra Connect (PHS, PTA, Federation)
- Aula 3: Autenticação: Senha, MFA & Passwordless + SSPR
- Aula 4: Acesso Condicional (Signals → Decisions → Controls)
- Aula 5: Governança & PIM + Access Reviews + Identity Protection
- Aula 6: B2B & B2C (External Identities)

**Cor do módulo**: roxo `#5b5fc7` (Entra ID purple)

**Analogias usadas**: prédio corporativo, matriz vs sede, três cadeados, fiscal do trem, chave-mestra do cofre, clube exclusivo

---

### Módulo 3 — Soluções de Segurança da Microsoft (35–40%) ✅ CONCLUÍDO

> **ATENÇÃO**: Este é o módulo de MAIOR peso na prova (35–40%). Objetivos vigentes desde 7 de novembro de 2025.

**Sub-áreas (do study guide oficial — NÃO são as do Módulo 2!)**:

- Descrever as capacidades básicas de segurança do Microsoft (Azure Security)
- Descrever o Microsoft Defender XDR (família de proteção estendida)
  - Defender for Endpoint
  - Defender for Identity
  - Defender for Office 365
  - Defender for Cloud Apps
- Descrever o Microsoft Sentinel (SIEM + SOAR)
- Descrever o Microsoft Defender for Cloud (CSPM + proteção de cargas)
- Descrever a proteção de rede no Azure (Azure Firewall, DDoS Protection, NSGs)
- Descrever o Microsoft Secure Score e recomendações

**Aulas criadas (6 aulas)**:
1. Segurança da infraestrutura Azure (VNet, NSG, Firewall, WAF, DDoS, Bastion e Key Vault)
2. Microsoft Defender for Cloud (CSPM, políticas, recomendações, Secure Score e workloads)
3. Microsoft Sentinel (SIEM, SOAR, hunting e playbooks)
4. Microsoft Defender XDR (correlação, incidentes e portal unificado)
5. Família Defender (Endpoint, Office 365, Identity e Cloud Apps)
6. Vulnerability Management, Defender Threat Intelligence e operação

**Analogias usadas**: cidade inteligente, inspetor de obras, torre de controle, equipe de detetives, hospital especializado, oficina e mapa do tempo.

### Módulo 4 — Soluções de Conformidade da Microsoft (20–25%) ✅ CONCLUÍDO

**Aulas criadas (6 aulas)**:

1. Service Trust Portal, princípios de privacidade e nota de transição sobre Microsoft Priva.
2. Microsoft Purview portal, Compliance Manager e compliance score.
3. Classificação de dados, tipos de informação, Content explorer e Activity explorer.
4. Sensitivity labels, proteção persistente e label policies.
5. DLP, retention policies, retention labels e Records Management.
6. Insider Risk Management, eDiscovery e Audit.

**Cor do módulo**: dourado `#ffb900`.

**Analogias usadas**: cozinha de vidro, painel do avião, biblioteca investigativa, etiqueta de mala, rede de água/arquivo histórico e tribunal digital.

**Blueprint considerado**: objetivos vigentes em 17/07/2026, com aviso sobre a atualização anunciada para 28/07/2026. O novo guia remove Microsoft Priva da lista explícita; os demais grupos de conformidade permanecem.

---

## ✨ Effects System (Efeitos Visuais Globais)

### Arquivos

| Arquivo | Função |
|---------|--------|
| `effects.css` | Animações CSS globais (tilt, glow, particles canvas, reveal variants, ripple, confetti, gradient shift, etc.) |
| `effects.js` | JavaScript (partículas canvas, mouse glow follower, 3D tilt cards, button ripple, confetti launcher, scroll observer) |

### Como importar (OBRIGATÓRIO em toda nova página)

Em **TODOS** os `<head>` de qualquer página `.html`, adicione:
```html
<link rel="stylesheet" href="effects.css" />     <!-- SEMPRE após styles.css / modulo-{N}.css -->
```

E antes do `</body>`:
```html
<script src="effects.js"></script>               <!-- SEMPRE por último -->
```

**Ordem correta de imports no `<head>`**:
```
1. Google Fonts (preconnect + link)
2. styles.css          (global)
3. modulo-{N}.css     (específico do módulo — se aplicável)
4. effects.css        (efeitos globais — SEMPRE presente)
```

**Ordem correta de scripts no `</body>`**:
```
1. script.js          (APENAS no index.html)
2. modulo-{N}.js      (lógica do módulo)
3. effects.js         (efeitos — SEMPRE por último)
```

### O que o effects.js faz automaticamente

| Efeito | Descrição |
|--------|-----------|
| **Partículas canvas** | Pontos flutuantes conectados por linhas (fundo sutil) |
| **Mouse glow** | Luz suave que segue o cursor |
| **3D tilt** | Cards inclinam levemente ao passar o mouse (perspectiva) |
| **Button ripple** | Efeito "onda" ao clicar em qualquer botão/opção |
| **Confetti** | 🎉 Chuva de confetti ao completar 100% ou passar no quiz |
| **Scroll reveal** | Elementos com `.reveal` aparecem ao rolar (IntersectionObserver) |
| **Navbar scroll** | Navbar fica mais escura ao rolar a página |
| **Counter animation** | Números com `data-target` contam de 0 ao valor |

### Variantes de reveal

```html
<div class="reveal">            <!-- padrão: fade up -->
<div class="reveal-left">        <!-- slide da esquerda -->
<div class="reveal-right">       <!-- slide da direita -->
<div class="reveal-scale">       <!-- zoom in -->
<div class="stagger-children">  <!-- filhos aparecem um por um (stagger) -->
```

### Respeito a reduced motion

O `effects.js` respeita `prefers-reduced-motion`. Se o usuário desativou animações, partículas e confetti não são criados. As transições CSS também são desativadas (veja `.reveal` sem motion no styles.css).

---

## 🐛 Lições Aprendidas (Bugs Encontrados)

> Registros de bugs encontrados durante o desenvolvimento. NÃO repita nos próximos módulos.

| Bug | Ocorreu em | Causa | Como evitar |
|-----|-----------|-------|-------------|
| **Caracteres estranhos no JS** | `modulo-1.js` | Digitou `身边wrong: 3` (caractere chinês) no meio do código | Revisar todo arquivo após gerar; usar `find` para caracteres fora ASCII |
| **HTML tag quebrada** | `quiz-2.html` | Escreveu `</div</footer>` sem o `>` | Validar HTML mentalmente; tags com fechamento aninhado |
| **Classes CSS erradas** | `quiz-2.html` | Usou `auth-card__senior` e `cap-card__ex` ao invés de `vocab-card__en` | Copiar o nome exato das classes já existentes |
| **Typo em texto de botão** | `modulo-2.html` | "Marcurar" em vez de "Marcar" | Revisar textos em português |
| **Estrutura de HTML duplicada** | `quiz-2.html` | `<div class="vocab-card__en" style="display:none">` como solução rápida | NUNCA usar `display:none` como solução — deletar o elemento errado |
| **Badge NOVO não atualizado** | `index.html` | Após criar Módulo 2, badge ainda dizia "Módulo 1" | Sempre atualizar o badge no index.html (Passo 6 do Playbook) |
| **Roadmap copiado do módulo errado** | `README.md` | Sub-áreas do Módulo 3 eram as do Módulo 2 (Entra ID) | Sempre verificar as sub-áreas NO [Study Guide oficial](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-900) |
| **Effects não importados** | `modulo-1/2.html`, `quiz-1/2.html` | Criou `effects.css/js` mas não importou nas páginas | Adicionar ao `<head>` e antes de `</body>` (veja seção Effects System) |

### Regras para evitar bugs

1. **Sempre revisar** o código após gerar (busca por caracteres estranhos, tags quebradas)
2. **NUNCA usar `display:none`** como gambiarra — delete o elemento errado
3. **Copiar nomes de classes** de arquivos existentes (não inventar na hora)
4. **Verificar encoding UTF-8** de todo arquivo recém-criado
5. **Sempre atualizar o README** imediatamente após criar um módulo (Passo 7)

---

## 🎨 Cores por Módulo (Identidade Visual)

Cada módulo deve ter uma **cor accent própria** para diferenciar visualmente. Use no `lesson__num`, nos glows decorativos, e nos destaques:

| Módulo | Cor accent | CSS Variable | Onde usar |
|--------|-----------|-------------|-----------|
| **1** (Conceitos SCI) | Azul padrão | `--accent: #4f8ef7` | Padrão global (não precisa definir) |
| **2** (Entra ID) | Roxo | `--entra-purple: #5b5fc7` | `.lesson__num`, glows |
| **3** (Segurança) | 🔴 Sugestão: laranja avermelhado | `--ms-orange: #f25022` ou novo | `.lesson__num`, glows, hero |
| **4** (Conformidade) | 🟡 Sugestão: amarelo/dourado | `--ms-yellow: #ffb900` ou novo | `.lesson__num`, glows, hero |

> Ao criar o Módulo 3, defina uma variável CSS nova em `modulo-3.css` e use nos `.lesson__num` e componentes decorativos.

---

## 📌 Convenções e Notas Finais

### Encoding

- Todos os arquivos em **UTF-8** (importante para acentos PT e emojis)
- Ao finalizar, verificar se não há caracteres corrompidos (ex: `身边` apareceu uma vez num arquivo JS — sempre revisar)

### Performance

- Sem dependências externas além das fontes do Google Fonts
- Imagens são **emojis** (sem arquivos de imagem pesados)
- Animações respeitam `prefers-reduced-motion`

### Acessibilidade

- HTML semântico (`<header>`, `<section>`, `<footer>`, `<nav>`, `<article>`)
- `aria-hidden="true"` em elementos decorativos
- Contraste de cores adequado (texto claro sobre fundo escuro)
- Foco visível em elementos interativos

### Manutenção do checklist de tópicos (`index.html` → `script.js`)

O array `DOMAINS[]` no `script.js` contém todos os tópicos da prova. Ao concluir um módulo, **não é necessário** alterá-lo (ele é o checklist global de estudo, independente dos módulos). Mas o usuário pode marcar os tópicos como concluídos manualmente na página principal.

---

## 📚 Fontes e Referências

- [Microsoft Learn — SC-900 Study Guide (oficial)](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-900)
- [Inside Cloud and Security — SC-900 Practice Quiz](https://insidethemicrosoftcloud.com/sc900quiz/)
- [Reddit — "Passed SC-900" experiências](https://www.reddit.com/r/AzureCertification/)
- [Microsoft Learn — Trilha oficial SC-900](https://learn.microsoft.com/pt-br/credentials/certifications/security-compliance-and-identity-fundamentals/)
- [Microsoft Learn — AB-900 Study Guide (oficial)](https://learn.microsoft.com/pt-br/credentials/certifications/resources/study-guides/ab-900)
- [Microsoft Learn — Certificação AB-900](https://learn.microsoft.com/en-us/credentials/certifications/copilot-and-agent-administration-fundamentals/)

---

<div align="center">

**Feito com 💙 para estudos · SC-900 Blueprint**
*Projeto independente, não afiliado oficialmente à Microsoft.*

</div>
