(() => {
  const questions = window.quizQuestions || [];
  const key = 'math-contest-quiz-v1';
  const defaultProgress = {favorites:[],wrong:[],correct:[],drafts:{},attempts:{},history:[]};
  let progress;
  try { progress = {...defaultProgress,...JSON.parse(localStorage.getItem(key) || '{}')}; } catch { progress = {...defaultProgress}; }
  ['favorites','wrong','correct','history'].forEach(k => { if(!Array.isArray(progress[k])) progress[k]=[]; });
  progress.drafts ||= {}; progress.attempts ||= {};
  progress.correct.forEach(id=>{ if(!progress.attempts[id])progress.attempts[id]={total:1,correct:1,wrong:0,streak:1,nextReview:dayStamp(1)}; });
  progress.wrong.forEach(id=>{ if(!progress.attempts[id])progress.attempts[id]={total:1,correct:0,wrong:1,streak:0,nextReview:Date.now()}; });
  let mode='all', index=0, solutionIndex=0, shownSteps=0, filtered=[], sessionIds=null, questionStartedAt=Date.now();
  let timer=null, timerLeft=0, timerPaused=false;
  const $ = id => document.getElementById(id);
  const save = () => { localStorage.setItem(key,JSON.stringify(progress)); window.dispatchEvent(new CustomEvent('quiz-progress-updated',{detail:getStats()})); };
  const math = root => { if(window.renderMathInElement) renderMathInElement(root,{delimiters:[{left:'$$',right:'$$',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false,strict:false}); };
  const escape = text => String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function dayStamp(offset){ const d=new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate()+offset); return d.getTime(); }
  const day = dayStamp;
  const isDue = q => { const a=progress.attempts[q.id]; return progress.wrong.includes(q.id) || (a?.nextReview && a.nextReview<=Date.now()); };
  const editions=[...new Set(questions.map(q=>q.edition))], topics=[...new Set(questions.map(q=>q.topic))];
  editions.forEach(n=>$('quizEdition').insertAdjacentHTML('beforeend',`<option value="${n}">第 ${n} 届</option>`));
  topics.forEach(t=>$('quizTopic').insertAdjacentHTML('beforeend',`<option value="${escape(t)}">${escape(t)}</option>`));

  function candidateQuestions(){
    if(sessionIds) return sessionIds.map(id=>questions.find(q=>q.id===id)).filter(Boolean);
    if(mode==='review') return questions.filter(isDue);
    if(mode==='wrong'||mode==='favorite') return questions.filter(q=>progress[mode].includes(q.id));
    return questions;
  }
  function applyFilter(keepId){
    const edition=$('quizEdition').value, topic=$('quizTopic').value;
    filtered=candidateQuestions().filter(q=>(edition==='all'||String(q.edition)===edition)&&(topic==='all'||q.topic===topic));
    index=Math.max(0,keepId?filtered.findIndex(q=>q.id===keepId):0); if(index<0)index=0;
    render();
  }
  function render(){
    $('favoriteCount').textContent=progress.favorites.length; $('wrongCount').textContent=progress.wrong.length;
    $('reviewCount').textContent=questions.filter(isDue).length;
    const empty=!filtered.length; $('quizCard').hidden=empty; $('quizEmpty').hidden=!empty; document.querySelector('.quiz-progress').hidden=empty; document.querySelector('.quiz-nav').hidden=empty; if(empty)return;
    const q=filtered[index]; solutionIndex=0; shownSteps=0; questionStartedAt=Date.now();
    $('quizPosition').textContent=`${index+1} / ${filtered.length}`; $('quizMeta').textContent=`第 ${q.edition} 届 · ${q.year}`; $('quizProgressBar').style.width=`${(index+1)/filtered.length*100}%`;
    $('quizBadges').innerHTML=`<span>第 ${q.edition} 届</span><span>${escape(q.topic)}</span><span>${escape(q.difficulty)}</span>`;
    $('quizTitle').textContent=q.title; $('quizQuestion').innerHTML=q.question; $('quizAnswer').textContent=q.answer; $('quizKnowledge').textContent=q.knowledge; $('quizMistake').textContent=q.mistake;
    $('quizSource').href=q.source; $('workInput').value=progress.drafts[q.id]||''; $('answerPanel').hidden=true; $('revealAnswer').textContent='展开答案';
    $('favoriteButton').classList.toggle('active',progress.favorites.includes(q.id)); $('favoriteButton').textContent=progress.favorites.includes(q.id)?'★ 已收藏':'☆ 收藏';
    document.querySelectorAll('.self-mark').forEach(b=>b.classList.toggle('active',progress[b.dataset.mark]?.includes(q.id)));
    renderSolutionTabs(q); renderSteps(q); math($('quizCard'));
  }
  function renderSolutionTabs(q){ $('solutionTabs').innerHTML=q.solutions.map((s,i)=>`<button class="${i===solutionIndex?'active':''}" data-solution="${i}">${escape(s.name)}</button>`).join(''); }
  function renderSteps(q){ const steps=q.solutions[solutionIndex].steps; $('solutionSteps').innerHTML=steps.map((s,i)=>`<li class="${i<shownSteps?'shown':''}"><span>${i+1}</span><div>${s}</div></li>`).join(''); $('nextStep').hidden=shownSteps>=steps.length; $('nextStep').textContent=shownSteps?'显示下一步':'从第 1 步开始'; math($('solutionSteps')); }
  function pickSession(count, reviewOnly=false){
    const scored=questions.map(q=>{ const a=progress.attempts[q.id]||{}; let score=0; if(isDue(q))score+=100; if(progress.wrong.includes(q.id))score+=80; if(!a.total)score+=45; score+=(a.wrong||0)*12-(a.correct||0)*3+Math.random()*8; return {q,score}; }).filter(x=>!reviewOnly||isDue(x.q)).sort((a,b)=>b.score-a.score);
    return scored.slice(0,count).map(x=>x.q.id);
  }
  function startSession(kind,count=3,minutes=0){
    sessionIds=pickSession(count,kind==='review');
    if(!sessionIds.length){ sessionIds=pickSession(count,false); toast('当前没有到期错题，已为你安排巩固题'); }
    mode='session'; $('quizEdition').value='all'; $('quizTopic').value='all'; document.querySelectorAll('.quiz-mode').forEach(x=>x.classList.remove('active')); applyFilter();
    document.querySelector('#drill').scrollIntoView({behavior:'smooth'});
    if(minutes) startTimer(minutes); else stopTimer();
    toast(kind==='review'?`已生成 ${sessionIds.length} 题智能复习`:`今日 ${sessionIds.length} 题已生成`);
  }
  function openQuestion(id){
    if(!questions.some(q=>q.id===id))return;
    sessionIds=[id];mode='session';$('quizEdition').value='all';$('quizTopic').value='all';document.querySelectorAll('.quiz-mode').forEach(x=>x.classList.remove('active'));applyFilter();$('drill').scrollIntoView({behavior:'smooth'});
  }
  function recordResult(correct){
    if(!filtered.length)return;
    const q=filtered[index], id=q.id, a=progress.attempts[id]||{total:0,correct:0,wrong:0,streak:0};
    a.total++; a.lastAt=Date.now();
    if(correct){ a.correct++; a.streak=(a.streak||0)+1; const intervals=[1,3,7,14,30]; a.nextReview=day(intervals[Math.min(a.streak-1,intervals.length-1)]); }
    else { a.wrong++; a.streak=0; a.nextReview=Date.now()+4*60*60*1000; }
    progress.attempts[id]=a;
    const target=correct?'correct':'wrong', other=correct?'wrong':'correct';
    if(!progress[target].includes(id))progress[target].push(id); progress[other]=progress[other].filter(x=>x!==id);
    progress.history.push({id,topic:q.topic,correct,ts:Date.now(),seconds:Math.max(1,Math.round((Date.now()-questionStartedAt)/1000))});
    if(progress.history.length>500) progress.history=progress.history.slice(-500);
    save(); toast(correct?`做对了 · ${a.streak} 次连续掌握，${Math.round((a.nextReview-Date.now())/86400000)} 天后复习`:'已加入错题 · 4 小时后自动安排复习');
    render();
  }
  function formatTime(seconds){ return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`; }
  function startTimer(minutes){ stopTimer(); timerLeft=minutes*60; timerPaused=false; $('timerPanel').hidden=false; $('pauseTimer').textContent='暂停'; updateTimer(); timer=setInterval(()=>{ if(timerPaused)return; timerLeft--; updateTimer(); if(timerLeft<=0){ stopInterval(); $('timerMessage').textContent='时间到！先标记本题，再查看解析并记录失分原因。'; $('timerPanel').classList.add('time-up'); toast('训练时间到，开始复盘'); } },1000); }
  function updateTimer(){ $('timerDisplay').textContent=formatTime(Math.max(0,timerLeft)); document.title=timerLeft?`${formatTime(timerLeft)} · 竞赛数学`:'竞赛数学 · 学习空间'; }
  function stopInterval(){ if(timer){clearInterval(timer);timer=null;} }
  function stopTimer(){ stopInterval(); timerLeft=0; timerPaused=false; $('timerPanel').hidden=true; $('timerPanel').classList.remove('time-up'); $('timerMessage').textContent='先独立作答，到时再核对解析。'; document.title='竞赛数学 · 学习空间'; }
  function toast(message){ const el=$('siteToast'); el.textContent=message; el.classList.add('show'); clearTimeout(toast.t); toast.t=setTimeout(()=>el.classList.remove('show'),2600); }
  function getStats(){
    const attempts=Object.values(progress.attempts), history=progress.history;
    return {questionCount:questions.length,attempted:attempts.filter(a=>a.total).length,correct:attempts.reduce((n,a)=>n+(a.correct||0),0),total:attempts.reduce((n,a)=>n+(a.total||0),0),mastered:attempts.filter(a=>a.streak>=2).length,due:questions.filter(isDue).length,progress,questions};
  }

  $('quizEdition').addEventListener('change',()=>{sessionIds=null;mode='all';applyFilter();}); $('quizTopic').addEventListener('change',()=>{sessionIds=null;mode='all';applyFilter();});
  document.querySelectorAll('.quiz-mode').forEach(b=>b.addEventListener('click',()=>{sessionIds=null;mode=b.dataset.mode;document.querySelectorAll('.quiz-mode').forEach(x=>x.classList.toggle('active',x===b));applyFilter();}));
  $('favoriteButton').addEventListener('click',()=>{const id=filtered[index].id,a=progress.favorites,i=a.indexOf(id);i<0?a.push(id):a.splice(i,1);save();if(mode==='favorite')applyFilter();else render();});
  document.querySelectorAll('.self-mark').forEach(b=>b.addEventListener('click',()=>recordResult(b.dataset.mark==='correct')));
  $('workInput').addEventListener('input',e=>{if(!filtered.length)return;progress.drafts[filtered[index].id]=e.target.value;save();});
  $('revealAnswer').addEventListener('click',()=>{const open=$('answerPanel').hidden;$('answerPanel').hidden=!open;$('revealAnswer').textContent=open?'收起答案':'展开答案';if(open&&shownSteps===0){shownSteps=1;renderSteps(filtered[index]);}});
  $('solutionTabs').addEventListener('click',e=>{const b=e.target.closest('[data-solution]');if(!b)return;solutionIndex=Number(b.dataset.solution);shownSteps=1;renderSolutionTabs(filtered[index]);renderSteps(filtered[index]);});
  $('nextStep').addEventListener('click',()=>{shownSteps++;renderSteps(filtered[index]);});
  $('prevQuestion').addEventListener('click',()=>{index=(index-1+filtered.length)%filtered.length;render();}); $('nextQuestion').addEventListener('click',()=>{index=(index+1)%filtered.length;render();}); $('randomQuestion').addEventListener('click',()=>{if(filtered.length>1){let n;do{n=Math.floor(Math.random()*filtered.length)}while(n===index);index=n;render();}});
  $('pauseTimer').addEventListener('click',()=>{timerPaused=!timerPaused;$('pauseTimer').textContent=timerPaused?'继续':'暂停';$('timerMessage').textContent=timerPaused?'计时已暂停，准备好后继续。':'先独立作答，到时再核对解析。';});
  $('endTimer').addEventListener('click',()=>{stopTimer();toast('限时训练已结束');});
  document.addEventListener('keydown',e=>{if(['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName))return;if(e.key==='ArrowLeft')$('prevQuestion').click();if(e.key==='ArrowRight')$('nextQuestion').click();if(e.code==='Space'){e.preventDefault();$('revealAnswer').click();}if(e.key==='1')recordResult(true);if(e.key==='2')recordResult(false);if(e.key.toLowerCase()==='f')$('favoriteButton').click();});
  window.mathContestQuiz={startSession,openQuestion,getStats,toast,startTimer};
  applyFilter(); save();
})();
