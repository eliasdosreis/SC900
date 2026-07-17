const MODULE_KEY='ab900_module1_progress_v1';
const ACTIVE_KEY='ab900_module1_active_study_v1';
const lessons=['aula-1','aula-2','aula-3','aula-4','aula-5','aula-6'];
let lessonState=load(MODULE_KEY,{});
function load(key,fallback){try{return JSON.parse(localStorage.getItem(key)||'null')||fallback}catch{return fallback}}
function save(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch{}}
document.querySelectorAll('.lesson__done').forEach(btn=>btn.addEventListener('click',()=>{const id=btn.dataset.complete;lessonState[id]=!lessonState[id];save(MODULE_KEY,lessonState);updateProgress();showToast(lessonState[id]?'✅ Aula concluída!':'↩️ Aula reaberta.');}));
function updateProgress(){let done=0;lessons.forEach(id=>{const yes=!!lessonState[id];done+=yes?1:0;document.querySelector(`[data-complete="${id}"]`)?.classList.toggle('is-done',yes);document.querySelector(`.path-dot[data-lesson="${id}"]`)?.classList.toggle('done',yes)});const pct=Math.round(done/lessons.length*100);document.getElementById('moduleProgress').textContent=`${pct}%`;document.getElementById('moduleFill').style.width=`${pct}%`;document.getElementById('moduleHint').textContent=pct===100?'🏆 Domínio concluído! Faça o English Exam Mode.':`${done} de ${lessons.length} aulas concluídas.`}
const QUESTIONS=[
 {q:'Qual objeto entrega a mesma mensagem a vários destinatários sem funcionar como caixa compartilhada?',o:['Shared mailbox','Distribution group','SharePoint site'],c:1},
 {q:'Onde você configura sites, bibliotecas e permissões do SharePoint?',o:['Exchange admin center','Teams admin center','SharePoint admin center'],c:2},
 {q:'Qual princípio do Zero Trust reduz permissões ao mínimo necessário?',o:['Least privilege','Assume ownership','Single password'],c:0},
 {q:'Qual log ajuda a investigar por que uma entrada foi bloqueada?',o:['Sign-in log','Retention log','Billing profile'],c:0},
 {q:'O que o PIM fornece?',o:['Função privilegiada permanente','Ativação just-in-time','Nova licença de usuário'],c:1},
 {q:'No tenant, qual objeto representa localmente um aplicativo?',o:['Service principal / Enterprise application','Distribution list','Shared channel'],c:0}
];
let quizAnswers=[];
function renderQuiz(){const c=document.getElementById('quizContainer');quizAnswers=[];document.getElementById('quizResult').hidden=true;c.innerHTML=QUESTIONS.map((x,i)=>`<article class="quiz-q" id="ptq-${i}"><strong>${i+1}. ${x.q}</strong><div class="quiz-options">${x.o.map((o,j)=>`<button class="quiz-opt" data-q="${i}" data-o="${j}">${o}</button>`).join('')}</div></article>`).join('');c.querySelectorAll('.quiz-opt').forEach(b=>b.addEventListener('click',answerQuiz))}
function answerQuiz(e){const b=e.currentTarget,q=+b.dataset.q,o=+b.dataset.o;if(quizAnswers[q]!==undefined)return;quizAnswers[q]=o===QUESTIONS[q].c;document.querySelectorAll(`.quiz-opt[data-q="${q}"]`).forEach(x=>{x.disabled=true;if(+x.dataset.o===QUESTIONS[q].c)x.classList.add('correct');else if(x===b)x.classList.add('wrong')});if(quizAnswers.filter(x=>x!==undefined).length===QUESTIONS.length)showQuizResult()}
function showQuizResult(){const score=quizAnswers.filter(Boolean).length;document.getElementById('quizScore').textContent=`${score}/${QUESTIONS.length}`;document.getElementById('quizMsg').textContent=score>=5?'Excelente! Agora pratique em inglês.':'Revise as aulas e tente novamente.';document.getElementById('quizResult').hidden=false}
document.getElementById('quizRetry').addEventListener('click',renderQuiz);
const MISSIONS=[
 {q:'Uma equipe precisa responder como suporte@contoso.com dentro da mesma caixa.',o:['Distribution group','Shared mailbox','Teams channel'],c:1,f:'Shared mailbox oferece uma caixa comum para a equipe.'},
 {q:'Você precisa alterar política de criação de equipes e canais.',o:['Teams admin center','Exchange admin center','Purview portal'],c:0,f:'Equipes, canais e políticas pertencem ao Teams admin center.'},
 {q:'Um login falhou após uma política baseada em localização.',o:['Billing report','Sign-in logs','Message trace'],c:1,f:'Sign-in logs mostram políticas de Acesso Condicional e detalhes da tentativa.'},
 {q:'Um administrador precisa de Global Admin por apenas uma hora.',o:['Licença permanente','PIM','Distribution group'],c:1,f:'PIM fornece ativação privilegiada just-in-time e limitada.'},
 {q:'Você quer controlar atribuições e SSO de um app dentro do tenant.',o:['Enterprise application','App registration apenas','Shared mailbox'],c:0,f:'Enterprise application é o service principal administrado localmente.'},
 {q:'Uma pessoa está licenciada, mas não consegue editar um site.',o:['Comprar outra licença sempre','Revisar permissão do site','Criar mailbox'],c:1,f:'Licença habilita o serviço; a permissão do site controla a ação.'}
];
let active=load(ACTIVE_KEY,{index:0,score:0});let locked=false;
function renderMission(){const m=MISSIONS[active.index%MISSIONS.length];locked=false;document.getElementById('missionCount').textContent=`Cenário ${active.index%MISSIONS.length+1}/${MISSIONS.length} · Acertos ${active.score||0}`;document.getElementById('missionQuestion').textContent=m.q;document.getElementById('missionFeedback').textContent='';document.getElementById('missionNext').hidden=true;document.getElementById('missionOptions').innerHTML=m.o.map((o,i)=>`<button data-o="${i}">${o}</button>`).join('');document.querySelectorAll('#missionOptions button').forEach(b=>b.addEventListener('click',()=>answerMission(b,m)))}
function answerMission(btn,m){if(locked)return;locked=true;const ok=+btn.dataset.o===m.c;btn.classList.add(ok?'correct':'wrong');document.querySelectorAll('#missionOptions button')[m.c].classList.add('correct');if(ok)active.score=(active.score||0)+1;document.getElementById('missionFeedback').innerHTML=`<strong>${ok?'✅ Boa decisão!':'❌ Revise a escolha.'}</strong> ${m.f}`;document.getElementById('missionNext').hidden=false;save(ACTIVE_KEY,active)}
document.getElementById('missionNext').addEventListener('click',()=>{active.index=(active.index+1)%MISSIONS.length;save(ACTIVE_KEY,active);renderMission()});
const toast=document.getElementById('toast');let toastTimer;function showToast(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2400)}
updateProgress();renderQuiz();renderMission();
