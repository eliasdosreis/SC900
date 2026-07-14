/* SC-900 · Módulo 3 — progresso e revisão */
const MODULE_KEY = 'sc900_module3_progress_v1';
const lessons = ['aula-1','aula-2','aula-3','aula-4','aula-5','aula-6'];
let lessonState = loadModuleState();

function loadModuleState() { try { return JSON.parse(localStorage.getItem(MODULE_KEY) || '{}'); } catch { return {}; } }
function saveModuleState() { try { localStorage.setItem(MODULE_KEY, JSON.stringify(lessonState)); } catch {} }
function showToast(message) { const el=document.getElementById('toast'); el.textContent=message; el.classList.add('show'); setTimeout(()=>el.classList.remove('show'),2200); }
function updatePathDots() { document.querySelectorAll('.path-dot').forEach(dot=>dot.classList.toggle('completed',!!lessonState[`aula-${dot.dataset.lesson}`])); }
function updateModuleProgress() {
  const done=lessons.filter(id=>lessonState[id]).length, pct=Math.round(done/lessons.length*100);
  document.getElementById('moduleProgress').textContent=`${pct}%`; document.getElementById('moduleFill').style.width=`${pct}%`;
  document.getElementById('moduleHint').textContent=pct===0?'Leia cada aula e marque como concluída 👇':pct<100?`${done} de ${lessons.length} aulas concluídas — continue! 💪`:'🎉 Módulo completo! Bora pro quiz?';
  updatePathDots();
}
document.querySelectorAll('.lesson__done').forEach(btn=>{
  const id=btn.dataset.complete;
  const paint=()=>{ btn.classList.toggle('completed',!!lessonState[id]); btn.innerHTML=lessonState[id]?'<span class="lesson__done-check">✓</span> Aula concluída! ✓':'<span class="lesson__done-check">✓</span> Marcar aula como concluída'; };
  paint(); btn.addEventListener('click',()=>{ lessonState[id]=!lessonState[id]; if(!lessonState[id]) delete lessonState[id]; saveModuleState(); paint(); updateModuleProgress(); showToast(lessonState[id]?'✅ Aula concluída!':'Aula reaberta.'); });
});
updateModuleProgress();

const QUESTIONS=[
 {q:'Qual serviço protege aplicações web contra ataques como SQL injection?',o:['NSG','Web Application Firewall (WAF)','Azure Bastion','Key Vault'],c:1,e:'O <strong>WAF</strong> inspeciona tráfego HTTP(S) e protege aplicações web.'},
 {q:'No Defender for Cloud, qual capacidade avalia configurações e postura de segurança?',o:['CSPM','SOAR','DLP','SSPR'],c:0,e:'<strong>CSPM</strong> identifica configurações incorretas e recomenda melhorias de postura.'},
 {q:'Qual combinação descreve o Microsoft Sentinel?',o:['IAM + PAM','SIEM + SOAR','EDR + WAF','CSPM + DLP'],c:1,e:'Sentinel combina análise centralizada de eventos (<strong>SIEM</strong>) e automação de resposta (<strong>SOAR</strong>).' },
 {q:'Qual produto protege email e colaboração contra phishing?',o:['Defender for Identity','Defender for Office 365','Defender for Cloud Apps','Defender for Cloud'],c:1,e:'<strong>Defender for Office 365</strong> protege email e ferramentas de colaboração.'},
 {q:'Qual serviço permite acesso RDP/SSH a VMs sem expor IP público?',o:['Azure Bastion','Azure DDoS Protection','Microsoft Sentinel','WAF'],c:0,e:'<strong>Azure Bastion</strong> fornece conexão RDP/SSH segura pelo portal.'},
 {q:'O que o Defender XDR faz principalmente?',o:['Armazena chaves','Correlaciona sinais e incidentes entre domínios de segurança','Cria redes virtuais','Substitui todas as políticas'],c:1,e:'<strong>Defender XDR</strong> correlaciona sinais de endpoints, identidades, email e apps para investigação coordenada.'}
];
const quizContainer=document.getElementById('quizContainer'), quizResult=document.getElementById('quizResult'); let answers=[];
function renderQuiz(){answers=[];quizResult.hidden=true;quizContainer.innerHTML=QUESTIONS.map((x,q)=>`<div class="quiz-q"><div class="quiz-q__num">Pergunta ${q+1} de ${QUESTIONS.length}</div><div class="quiz-q__text">${x.q}</div><div class="quiz-options">${x.o.map((o,i)=>`<button class="quiz-opt" data-q="${q}" data-o="${i}"><span class="quiz-opt__letter">${String.fromCharCode(65+i)}</span><span>${o}</span></button>`).join('')}</div></div>`).join(''); quizContainer.querySelectorAll('.quiz-opt').forEach(b=>b.addEventListener('click',handleQuizAnswer));}
function handleQuizAnswer(e){const b=e.currentTarget,q=+b.dataset.q,o=+b.dataset.o;if(answers[q]!==undefined)return;answers[q]=o===QUESTIONS[q].c;const block=b.closest('.quiz-q');block.querySelectorAll('.quiz-opt').forEach(x=>{x.classList.add('disabled');if(+x.dataset.o===QUESTIONS[q].c)x.classList.add('correct');if(x===b&&o!==QUESTIONS[q].c)x.classList.add('wrong');});block.insertAdjacentHTML('beforeend',`<div class="quiz-q__explain"><strong>${answers[q]?'✅ Correto!':'❌ Quase!'}</strong> ${QUESTIONS[q].e}</div>`);if(answers.filter(x=>x!==undefined).length===QUESTIONS.length)setTimeout(showResult,400);}
function showResult(){const score=answers.filter(Boolean).length;document.getElementById('quizScore').textContent=`${score}/${QUESTIONS.length}`;document.getElementById('quizMsg').textContent=score>=5?'🎉 Ótimo! Agora encare o English Exam Mode.':'📖 Reveja as associações entre serviços e tente novamente.';quizResult.hidden=false;quizResult.scrollIntoView({behavior:'smooth',block:'center'});}
document.getElementById('quizRetry').addEventListener('click',renderQuiz); renderQuiz();
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
