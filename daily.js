(() => {
  const questions=window.quizQuestions||[], storageKey='math-contest-daily-v1';
  if(!questions.length)return;
  let state;
  try{state={completed:[],drafts:{},...JSON.parse(localStorage.getItem(storageKey)||'{}')};}catch{state={completed:[],drafts:{}};}
  if(!Array.isArray(state.completed))state.completed=[];state.drafts||={};
  const $=id=>document.getElementById(id);
  const pad=n=>String(n).padStart(2,'0');
  const localKey=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  const dayNumber=d=>Math.floor(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/86400000);
  const math=root=>{if(window.renderMathInElement)renderMathInElement(root,{delimiters:[{left:'$$',right:'$$',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false,strict:false});};
  let currentKey='',currentQuestion=null;
  function save(){localStorage.setItem(storageKey,JSON.stringify(state));window.dispatchEvent(new CustomEvent('daily-progress-updated'));}
  function streak(){let n=0,d=new Date();d.setHours(0,0,0,0);while(state.completed.includes(localKey(d))){n++;d.setDate(d.getDate()-1);}return n;}
  function render(){
    const now=new Date();currentKey=localKey(now);currentQuestion=questions[((dayNumber(now)%questions.length)+questions.length)%questions.length];
    $('dailyProblemIndex').textContent=`DAILY / 第 ${currentQuestion.edition} 届`;$('dailyProblemDate').textContent=new Intl.DateTimeFormat('zh-CN',{month:'long',day:'numeric',weekday:'long'}).format(now);
    $('dailyDifficulty').textContent=`${currentQuestion.difficulty} · ${currentQuestion.topic}`;$('dailyProblemTitle').textContent=currentQuestion.title;$('dailyProblem').innerHTML=currentQuestion.question;
    $('dailyWork').value=state.drafts[currentKey]||'';$('dailyAnswer').hidden=true;$('dailyReveal').textContent='核对答案';$('dailyAnswerText').textContent=currentQuestion.answer;$('dailyKnowledge').textContent=currentQuestion.knowledge;$('dailyMistake').textContent=currentQuestion.mistake;
    const done=state.completed.includes(currentKey);$('dailyComplete').classList.toggle('done',done);$('dailyComplete').textContent=done?'✓ 今日已完成':'○ 标记今日完成';$('dailyStreak').textContent=streak();math($('practice'));
  }
  function tick(){
    const now=new Date();if(localKey(now)!==currentKey)render();const next=new Date(now);next.setHours(24,0,0,0);const left=Math.max(0,Math.floor((next-now)/1000));$('dailyCountdown').textContent=`${pad(Math.floor(left/3600))}:${pad(Math.floor(left%3600/60))}:${pad(left%60)}`;
  }
  $('dailyWork').addEventListener('input',e=>{state.drafts[currentKey]=e.target.value;save();});
  $('dailyReveal').addEventListener('click',()=>{const open=$('dailyAnswer').hidden;$('dailyAnswer').hidden=!open;$('dailyReveal').textContent=open?'收起答案':'核对答案';if(open)math($('dailyAnswer'));});
  $('dailyComplete').addEventListener('click',()=>{const i=state.completed.indexOf(currentKey);i<0?state.completed.push(currentKey):state.completed.splice(i,1);save();render();window.mathContestQuiz?.toast(i<0?'今日一题已完成，明天继续':'已取消今日完成标记');});
  $('dailyFullSolution').addEventListener('click',()=>window.mathContestQuiz?.openQuestion(currentQuestion.id));
  render();tick();setInterval(tick,1000);
})();
