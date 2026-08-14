const STORAGE_KEY = 'math-contest-study-v1';
const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"tasks":{},"routes":{},"notes":[],"answers":[]}');
const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
const dateKey = () => new Date().toISOString().slice(0,10);

function updateStats(){
  const completed = Object.keys(state.tasks).filter(k => state.tasks[k]).length + Object.keys(state.routes).filter(k => state.routes[k]).length;
  document.querySelector('#completedCount').textContent = completed;
  const quizStats=window.mathContestQuiz?.getStats(), quizDays=(quizStats?.progress.history||[]).map(h=>new Date(h.ts).toISOString().slice(0,10));
  let dailyDays=[];try{dailyDays=JSON.parse(localStorage.getItem('math-contest-daily-v1')||'{}').completed||[];}catch{}
  const days = new Set([...(state.studyDays || []),...quizDays,...dailyDays, ...(completed || state.answers.length ? [dateKey()] : [])]);
  state.studyDays = [...days];
  document.querySelector('#daysStudied').textContent = days.size;
  const correct = state.answers.filter(a => a.correct).length+(quizStats?.correct||0), total=state.answers.length+(quizStats?.total||0);
  document.querySelector('#accuracy').textContent = total ? Math.round(correct / total * 100) + '%' : '—';
  const studied = new Set(state.studyDays || []); let streak=0, cursor=new Date(); cursor.setHours(0,0,0,0);
  while(studied.has(cursor.toISOString().slice(0,10))){ streak++; cursor.setDate(cursor.getDate()-1); }
  document.querySelector('#streak').textContent = streak ? `${streak} 天` : '0';
  save();
}
function renderTasks(){
  document.querySelectorAll('.complete-toggle').forEach(button => {
    const done = !!state.tasks[button.dataset.task];
    button.classList.toggle('is-complete', done);
    button.innerHTML = done ? '✓ 已完成' : (button.dataset.task === 'limit' ? '开始学习 <span>→</span>' : '开始练习 <span>→</span>');
  });
  document.querySelectorAll('.route-toggle').forEach(button => {
    const done = !!state.routes[button.dataset.route];
    button.classList.toggle('is-complete', done);
    button.textContent = done ? '✓ 本阶段已完成' : '标记完成';
    button.closest('.route-card').classList.toggle('done', done);
  });
}
function renderNotes(){
  const list = document.querySelector('#noteList');
  if(!state.notes.length){ list.innerHTML = '<p class="empty-note">这里还没有记录。把每次“差一点懂”的瞬间留下来。</p>'; return; }
  list.innerHTML = state.notes.map((note,index) => `<div class="note-item"><span class="note-date">${note.date}</span><span class="note-text">${note.text.replace(/</g,'&lt;')}</span><button class="delete-note" data-index="${index}" title="删除记录">×</button></div>`).join('');
}
document.querySelector('#todayDate').textContent = new Intl.DateTimeFormat('zh-CN',{month:'long',day:'numeric',weekday:'short'}).format(new Date());
document.querySelectorAll('.complete-toggle').forEach(button => button.addEventListener('click', () => { state.tasks[button.dataset.task] = !state.tasks[button.dataset.task]; renderTasks(); updateStats(); }));
document.querySelectorAll('.route-toggle').forEach(button => button.addEventListener('click', () => { state.routes[button.dataset.route] = !state.routes[button.dataset.route]; renderTasks(); updateStats(); }));
document.querySelector('#saveNote').addEventListener('click', () => { const input = document.querySelector('#noteInput'); const text = input.value.trim(); if(!text) return; state.notes.unshift({date:new Intl.DateTimeFormat('zh-CN',{month:'2-digit',day:'2-digit'}).format(new Date()),text,ts:Date.now()}); input.value=''; save(); renderNotes(); renderCoach(); document.querySelector('#saveStatus').textContent='已保存'; setTimeout(()=>document.querySelector('#saveStatus').textContent='',1500); });
document.querySelector('#noteList').addEventListener('click', e => { if(e.target.matches('.delete-note')){state.notes.splice(e.target.dataset.index,1);save();renderNotes();} });
document.querySelector('#focusButton').addEventListener('click', () => { document.body.classList.toggle('focus-mode'); document.querySelector('#focusButton').textContent = document.body.classList.contains('focus-mode') ? '退出专注模式' : '专注模式'; });
document.querySelector('#copyShare').addEventListener('click', async () => { const button = document.querySelector('#copyShare'); const message = '我在用「竞赛数学学习空间」系统备战大学生数学竞赛：每日一题、知识点精讲、错题复盘和12周学习路线。一起加入，每周完成一个专题，互相打卡！'; try { await navigator.clipboard.writeText(message); button.innerHTML = '已复制，去分享 <span>✓</span>'; } catch { button.textContent = message; } setTimeout(() => button.innerHTML = '复制推广文案 <span>↗</span>', 2200); });
let archiveFilter = 'all';
const filterArchive = () => { const query = document.querySelector('#archiveSearch').value.trim().toLowerCase(); let visible = 0; document.querySelectorAll('.archive-item').forEach(item => { const matchesType = archiveFilter === 'all' || item.dataset.type?.split(' ').includes(archiveFilter); const matchesQuery = !query || item.textContent.toLowerCase().includes(query); const show = matchesType && matchesQuery; item.classList.toggle('is-hidden', !show); if(show) visible++; }); document.querySelector('#archiveEmpty').hidden = visible !== 0; };
document.querySelectorAll('.archive-filter').forEach(button => button.addEventListener('click', () => { archiveFilter = button.dataset.filter; document.querySelectorAll('.archive-filter').forEach(item => item.classList.toggle('active', item === button)); filterArchive(); }));
document.querySelector('#archiveSearch').addEventListener('input', filterArchive);
document.querySelector('#resetButton').addEventListener('click', () => { if(confirm('确定清除本网站的全部学习记录吗？')){localStorage.removeItem(STORAGE_KEY);localStorage.removeItem('math-contest-quiz-v1');localStorage.removeItem('math-contest-knowledge-v1');localStorage.removeItem('math-contest-daily-v1');location.reload();} });

function renderCoach(){
  if(!window.mathContestQuiz)return;
  const stats=window.mathContestQuiz.getStats(), history=stats.progress.history || [], today=new Date(); today.setHours(0,0,0,0);
  const todayHistory=history.filter(h=>h.ts>=today.getTime()), accuracy=stats.total?Math.round(stats.correct/stats.total*100):0, coverage=Math.round(stats.attempted/stats.questionCount*100);
  const readiness=Math.min(100,Math.round(coverage*.38+accuracy*.32+(stats.mastered/stats.questionCount*100)*.22+Math.min(8,new Set(history.map(h=>new Date(h.ts).toDateString())).size)*1));
  document.querySelector('#readinessScore').textContent=readiness;
  document.querySelector('#readinessRing').style.setProperty('--score',`${readiness*3.6}deg`);
  const level=readiness<25?'基础摸底期':readiness<50?'专题强化期':readiness<75?'真题突破期':'冲奖稳定期';
  document.querySelector('#readinessLevel').textContent=level;
  document.querySelector('#readinessAdvice').textContent=stats.total<3?'先完成今日 3 题，让系统开始识别你的薄弱点。':stats.due?`有 ${stats.due} 道题到期，先复习再做新题。`:(accuracy<70?'先降低速度，把每道错题的失分原因写清楚。':'保持限时训练，并把正确解法压缩成考场步骤。');
  document.querySelector('#coachAccuracy').textContent=stats.total?`${accuracy}%`:'—'; document.querySelector('#coachCoverage').textContent=`${coverage}%`; document.querySelector('#coachMastery').textContent=stats.mastered; document.querySelector('#coachReviewCount').textContent=stats.due;

  const topicMap={}; stats.questions.forEach(q=>topicMap[q.topic]={topic:q.topic,total:0,correct:0,attempted:0});
  history.forEach(h=>{const t=topicMap[h.topic];if(t){t.total++;if(h.correct)t.correct++;}});
  Object.entries(stats.progress.attempts).forEach(([id,a])=>{const q=stats.questions.find(x=>x.id===id);if(q&&a.total)topicMap[q.topic].attempted++;});
  const weak=Object.values(topicMap).map(t=>({...t,rate:t.total?Math.round(t.correct/t.total*100):null})).sort((a,b)=>(a.rate??-1)-(b.rate??-1)||b.total-a.total).slice(0,4);
  document.querySelector('#weakTopicList').innerHTML=weak.map(t=>`<button data-topic="${t.topic}"><span><strong>${t.topic}</strong><small>${t.rate===null?'尚未训练':`${t.total} 次作答`}</small></span><i><b style="width:${t.rate??6}%"></b></i><em>${t.rate===null?'待摸底':`${t.rate}%`}</em></button>`).join('');
  const daily=[]; for(let i=6;i>=0;i--){const d=new Date(today);d.setDate(d.getDate()-i);const next=new Date(d);next.setDate(next.getDate()+1);daily.push({label:i===0?'今':`${d.getMonth()+1}/${d.getDate()}`,count:history.filter(h=>h.ts>=d.getTime()&&h.ts<next.getTime()).length});}
  const max=Math.max(3,...daily.map(d=>d.count)); document.querySelector('#weekChart').innerHTML=daily.map(d=>`<div title="${d.count} 题"><i style="height:${Math.max(5,d.count/max*54)}px"></i><span>${d.label}</span></div>`).join('');
  const tasks=[{done:todayHistory.length>=3,text:`完成 3 道针对性训练（${Math.min(todayHistory.length,3)}/3）`},{done:(state.notes||[]).some(n=>n.ts>=today.getTime()),text:'在错题本记录一个失分原因'},{done:stats.due===0,text:stats.due?`清空 ${stats.due} 道到期复习`:'到期复习已清空'}];
  document.querySelector('#missionList').innerHTML=tasks.map(t=>`<div class="mission ${t.done?'done':''}"><span>${t.done?'✓':'○'}</span><p>${t.text}</p></div>`).join('');
}
document.querySelector('#dailyChallenge').addEventListener('click',()=>window.mathContestQuiz.startSession('daily',3));
document.querySelector('#smartReview').addEventListener('click',()=>window.mathContestQuiz.startSession('review',Math.max(1,Math.min(5,window.mathContestQuiz.getStats().due))));
document.querySelector('#timedTraining').addEventListener('click',()=>window.mathContestQuiz.startSession('timed',3,10));
document.querySelector('#weakTopicList').addEventListener('click',e=>{const b=e.target.closest('[data-topic]');if(!b)return;document.querySelector('#quizTopic').value=b.dataset.topic;document.querySelector('#quizTopic').dispatchEvent(new Event('change'));document.querySelector('#drill').scrollIntoView({behavior:'smooth'});});
window.addEventListener('quiz-progress-updated',()=>{renderCoach();updateStats();});
window.addEventListener('daily-progress-updated',updateStats);
renderTasks(); renderNotes(); updateStats();
renderCoach();
if('serviceWorker' in navigator && location.protocol.startsWith('http')) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
