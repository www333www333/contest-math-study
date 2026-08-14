(() => {
  const topics=window.knowledgeTopics||{}, years=window.yearKnowledge||[];
  const key='math-contest-knowledge-v1';
  let mastered=[];
  try{mastered=JSON.parse(localStorage.getItem(key)||'[]');if(!Array.isArray(mastered))mastered=[];}catch{mastered=[];}
  const $=id=>document.getElementById(id);
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const math=root=>{if(window.renderMathInElement)renderMathInElement(root,{delimiters:[{left:'$$',right:'$$',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false,strict:false});};
  const categories=[...new Set(Object.values(topics).map(t=>t.category))];
  years.forEach(y=>$('knowledgeYear').insertAdjacentHTML('beforeend',`<option value="${y.edition}">第 ${y.edition} 届 · ${y.year}</option>`));
  categories.forEach(c=>$('knowledgeCategory').insertAdjacentHTML('beforeend',`<option value="${esc(c)}">${esc(c)}</option>`));

  function save(){localStorage.setItem(key,JSON.stringify(mastered));}
  function topicText(t){return [t.name,t.category,t.formula,t.conclusion,t.inference,t.pitfall].join(' ').toLowerCase();}
  function renderFrequency(){
    const counts={};years.forEach(y=>y.keys.forEach(k=>counts[k]=(counts[k]||0)+1));
    const top=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,9);
    $('knowledgeFrequency').innerHTML=top.map(([k,n],i)=>`<button data-find="${k}" style="--rank:${Math.max(28,100-i*8)}%"><span>${esc(topics[k].name)}</span><i><b></b></i><em>${n} 届</em></button>`).join('');
  }
  function render(){
    const year=$('knowledgeYear').value, category=$('knowledgeCategory').value, query=$('knowledgeSearch').value.trim().toLowerCase();
    const visible=[];
    years.forEach(y=>{
      if(year!=='all'&&String(y.edition)!==year)return;
      const keys=y.keys.filter(k=>(category==='all'||topics[k].category===category)&&(!query||topicText(topics[k]).includes(query)));
      if(keys.length)visible.push({...y,visibleKeys:keys});
    });
    $('knowledgeGrid').innerHTML=visible.map((y,yi)=>`<details class="year-knowledge-card" ${year!=='all'||yi===0?'open':''}>
      <summary><div><span class="year-index">第 ${y.edition} 届</span><strong>${y.year}</strong></div><p>${esc(y.focus)}</p><span class="year-topic-count">${y.visibleKeys.length} 个考点 ＋</span></summary>
      <div class="year-knowledge-body"><div class="year-topic-nav">${y.visibleKeys.map(k=>`<span>${esc(topics[k].name)}</span>`).join('')}<a href="${y.paper}" target="_blank">查看原卷 ↗</a></div>
      <div class="conclusion-grid">${y.visibleKeys.map(k=>topicCard(k,topics[k])).join('')}</div></div>
    </details>`).join('');
    $('knowledgeEmpty').hidden=visible.length>0;
    $('knowledgeMastered').textContent=`${mastered.length} / ${Object.keys(topics).length}`;
    $('knowledgePointCount').textContent=Object.keys(topics).length;
    $('knowledgeYearCount').textContent=years.length;
    math($('knowledgeGrid'));
  }
  function topicCard(k,t){
    const done=mastered.includes(k);
    return `<article class="conclusion-card ${done?'mastered':''}" data-topic-key="${k}">
      <div class="conclusion-head"><span>${esc(t.category)}</span><button class="master-topic" data-master="${k}">${done?'✓ 已掌握':'○ 标记掌握'}</button></div>
      <h4>${esc(t.name)}</h4><div class="theorem-formula">${t.formula}</div>
      <div class="conclusion-line core"><strong>核心结论</strong><p>${t.conclusion}</p></div>
      <div class="conclusion-line infer"><strong>常用推论</strong><p>${t.inference}</p></div>
      <div class="conclusion-line warning"><strong>易错提醒</strong><p>${t.pitfall}</p></div>
      <button class="train-topic" data-train="${esc(t.quizTopic||'')}">练习相关真题 →</button>
    </article>`;
  }
  $('knowledgeYear').addEventListener('change',render);$('knowledgeCategory').addEventListener('change',render);$('knowledgeSearch').addEventListener('input',render);
  $('knowledgeFrequency').addEventListener('click',e=>{const b=e.target.closest('[data-find]');if(!b)return;const t=topics[b.dataset.find];$('knowledgeSearch').value=t.name;$('knowledgeCategory').value='all';render();$('knowledgeGrid').scrollIntoView({behavior:'smooth',block:'start'});});
  $('knowledgeGrid').addEventListener('click',e=>{
    const master=e.target.closest('[data-master]');if(master){const k=master.dataset.master,i=mastered.indexOf(k);i<0?mastered.push(k):mastered.splice(i,1);save();render();return;}
    const train=e.target.closest('[data-train]');if(!train)return;
    const select=$('quizTopic'),option=[...select.options].find(o=>o.value===train.dataset.train);
    if(option){select.value=option.value;select.dispatchEvent(new Event('change'));$('drill').scrollIntoView({behavior:'smooth'});window.mathContestQuiz?.toast(`已切换到「${option.value}」专题`);}else{window.mathContestQuiz?.startSession('daily',3);}
  });
  renderFrequency();render();
})();
