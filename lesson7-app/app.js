const $=s=>document.querySelector(s);
const R=(k,r)=>`<ruby>${k}<rt>${r}</rt></ruby>`;
const shuffle=a=>{const c=[...a];for(let i=c.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[c[i],c[j]]=[c[j],c[i]]}return c};
const pick=(a,n)=>shuffle(a).slice(0,n);
const toHiragana=s=>s.replace(/[ァ-ヶ]/g,ch=>String.fromCharCode(ch.charCodeAt(0)-0x60));
const norm=s=>toHiragana(s.normalize('NFKC')).replace(/[\s　。、,.!！?？・]/g,'').replace(/円/g,'えん');
const strip=s=>{const d=document.createElement('div');d.innerHTML=s;return d.textContent};
const V=(key,jp,reading,ko,note='')=>({key,jp:R(jp,reading),reading,ko,note});

const vocab=[
  V('famous','有名な','ゆうめいな','유명한'),V('snack','お菓子','おかし','과자'),V('howmuch','いくら','いくら','얼마'),
  {key:'ja',jp:'じゃ ＝ では',reading:'じゃ＝では',ko:'그럼·그러면',note:'화제를 이어 다음 말이나 행동으로 넘어갈 때 쓰는 표현'},
  V('most','一番','いちばん','가장·제일'),V('popular','人気','にんき','인기'),V('product','商品','しょうひん','상품'),
  V('total','全部で','ぜんぶで','전부 합해서'),V('order','注文','ちゅうもん','주문'),V('sum','合計','ごうけい','합계'),
  V('okay','大丈夫だ','だいじょうぶだ','괜찮다'),V('clock','時計','とけい','시계'),V('gyudon','牛丼','ぎゅうどん','규동'),
  V('adult','大人','おとな','어른'),V('child','子供','こども','아이'),{key:'please',jp:'ください',reading:'ください',ko:'주세요'}
];

const underMan=n=>{
  const digit=['','いち','に','さん','よん','ご','ろく','なな','はち','きゅう'];
  let s='',x=n;
  const sen=Math.floor(x/1000);if(sen){s+=sen===1?'せん':sen===3?'さんぜん':sen===8?'はっせん':digit[sen]+'せん';x%=1000}
  const hyaku=Math.floor(x/100);if(hyaku){s+=hyaku===1?'ひゃく':hyaku===3?'さんびゃく':hyaku===6?'ろっぴゃく':hyaku===8?'はっぴゃく':digit[hyaku]+'ひゃく';x%=100}
  const juu=Math.floor(x/10);if(juu){s+=(juu===1?'':digit[juu])+'じゅう';x%=10}
  if(x)s+=digit[x];return s;
};
const moneyRead=n=>{if(n===0)return'ぜろえん';const man=Math.floor(n/10000),rest=n%10000;return(man?underMan(man)+'まん':'')+underMan(rest)+'えん'};
const money=[160,400,650,850,900,1200,1280,2000,3600,7390,9610,15000,74000,180000].map(n=>({n,read:moneyRead(n)}));

const counterData={
  'つ':{label:'사물 ~개',q:'いくつ',forms:['','ひとつ','ふたつ','みっつ','よっつ','いつつ','むっつ','ななつ','やっつ','ここのつ','とお']},
  '人':{label:'사람 ~명',q:'なんにん',forms:['','ひとり','ふたり','さんにん','よにん','ごにん','ろくにん','ななにん','はちにん','きゅうにん','じゅうにん']},
  '階':{label:'~층',q:'なんかい',forms:['','いっかい','にかい','さんがい','よんかい','ごかい','ろっかい','ななかい','はっかい','きゅうかい','じゅっかい']},
  '杯':{label:'~잔',q:'なんばい',forms:['','いっぱい','にはい','さんばい','よんはい','ごはい','ろっぱい','ななはい','はっぱい','きゅうはい','じゅっぱい']},
  '枚':{label:'~장',q:'なんまい',forms:['','いちまい','にまい','さんまい','よんまい','ごまい','ろくまい','ななまい','はちまい','きゅうまい','じゅうまい']}
};
const counterPool=Object.entries(counterData).flatMap(([unit,d])=>Array.from({length:10},(_,i)=>({n:i+1,unit,label:d.label,read:d.forms[i+1]})));

const items=[['コーヒー','커피','いっぱい'],['ミルクティー','밀크티','いっぱい'],['チーズケーキ','치즈케이크','ひとつ'],[R('牛丼','ぎゅうどん'),'규동','ひとつ'],['うどん','우동','ひとつ'],[R('切符','きっぷ'),'표','いちまい'],[R('時計','とけい'),'시계','ひとつ'],[R('菓子','かし'),'과자','ひとつ']];
const orderPool=[
  {ko:'커피와 밀크티 주세요.',blocks:['コーヒー','と','ミルクティー','ください'],a:'コーヒーとミルクティーください'},
  {ko:'규동 두 개와 우동 한 개 주세요.',blocks:[R('牛丼','ぎゅうどん'),'ふたつ','と','うどん','ひとつ','ください'],a:'ぎゅうどんふたつとうどんひとつください'},
  {ko:'어른 표 한 장과 어린이 표 두 장 주세요.',blocks:[R('大人','おとな'),'いちまい','と',R('子供','こども'),'にまい','ください'],a:'おとなichimai'},
  {ko:'커피 한 잔과 치즈케이크 두 개 주세요.',blocks:['コーヒー','いっぱい','と','チーズケーキ','ふたつ','ください'],a:'coffee'},
  {ko:'시계와 과자 주세요.',blocks:[R('時計','とけい'),'と',R('お菓子','おかし'),'ください'],a:'とけいとおかしください'}
];
const dialogues=[
 {ko:'이 과자는 얼마입니까?',jp:`この ${R('お菓子','おかし')}は <span class="blank">＿＿</span>。`,answers:['いくらですか'],done:'いくらですか'},
 {ko:'전부 합해서 3,600엔입니다.',jp:`${R('全部','ぜんぶ')}で <span class="blank">＿＿</span>。`,answers:['さんぜんろっぴゃくえんです'],done:'さんぜんろっぴゃくえんです'},
 {ko:'가장 인기 있는 상품입니다.',jp:`${R('一番','いちばん')} ${R('人気','にんき')}の <span class="blank">＿＿</span>。`,answers:['しょうひんです'],done:`${R('商品','しょうひん')}です`},
 {ko:'합계 900엔입니다.',jp:`では、${R('合計','ごうけい')} <span class="blank">＿＿</span>。`,answers:['きゅうひゃくえんです'],done:'きゅうひゃくえんです'},
 {ko:'신용카드도 괜찮습니까?',jp:`クレジットカードでも <span class="blank">＿＿</span>。`,answers:['だいじょうぶですか'],done:`${R('大丈夫','だいじょうぶ')}ですか`},
 {ko:'케이크는 몇 개 있습니까?',jp:`ケーキは <span class="blank">＿＿</span> ありますか。`,answers:['いくつ'],done:'いくつ'},
 {ko:'여자는 몇 명 있습니까?',jp:`${R('女','おんな')}の ${R('人','ひと')}は <span class="blank">＿＿</span> いますか。`,answers:['なんにん'],done:`${R('何人','なんにん')}`},
 {ko:'10층입니다.',jp:`<span class="blank">＿＿</span> です。`,answers:['じゅっかい'],done:'じゅっかい'}
];
const fullPool=[
 {ko:'이 유명한 과자는 얼마입니까?',answers:['このゆうめいなおかしはいくらですか'],done:`この ${R('有名','ゆうめい')}な ${R('お菓子','おかし')}は いくらですか。`},
 {ko:'커피 한 잔과 치즈케이크 두 개 주세요.',answers:['コーヒーいっぱいとチーズケーキふたつください','こーひーいっぱいとちーずけーきふたつください'],done:'コーヒー いっぱいと チーズケーキ ふたつ ください。'},
 {ko:'전부 합해서 3,600엔입니다.',answers:['ぜんぶでさんぜんろっぴゃくえんです'],done:`${R('全部','ぜんぶ')}で さんぜんろっぴゃくえんです。`},
 {ko:'어른 한 명과 어린이 두 명입니다.',answers:['おとなひとりとこどもふたりです'],done:`${R('大人','おとな')} ひとりと ${R('子供','こども')} ふたりです。`},
 {ko:'신용카드도 괜찮습니까?',answers:['クレジットカードでもだいじょうぶですか','くれじっとかーどでもだいじょうぶですか'],done:`クレジットカードでも ${R('大丈夫','だいじょうぶ')}ですか。`}
];

const stages=['단어 익히기','뜻 고르기','가격 읽기','수량 표현','주문 조립','대화 빈칸','문장 입력'];
let phase=0,index=0,selected=[],session={};
function prepare(){session={meaning:pick(vocab,7),money:pick(money,5),counter:pick(counterPool,6),order:pick(orderPool,4),dialogue:pick(dialogues,5),full:pick(fullPool,2)}}
function screen(id){document.querySelectorAll('.screen').forEach(x=>x.classList.toggle('active',x.id===id));scrollTo(0,0)}
$('#startBtn').onclick=()=>{phase=0;index=0;prepare();screen('lesson');tabs();render()};
$('#homeBtn').onclick=$('#backBtn').onclick=()=>screen('home');
function tabs(){$('#tabs').innerHTML=stages.map((s,i)=>`<button class="${i===phase?'active':''}" data-step="${i}">${i+1}. ${s}</button>`).join('');document.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>{phase=+b.dataset.step;index=0;tabs();render()})}
function panel(title,body,count=''){return `<section class="panel"><div class="panel-head"><h3>${title}</h3>${count?`<span class="count">${count}</span>`:''}</div>${body}</section>`}
function render(){selected=[];if(phase===0)return vocabStage();if(phase===1)return meaningStage();if(phase===2)return moneyStage();if(phase===3)return counterStage();if(phase===4)return orderStage();if(phase===5)return dialogueStage();fullStage()}
function vocabStage(){const rows=Array.from({length:10},(_,i)=>`<tr><th>${i+1}</th>${Object.entries(counterData).map(([u,d])=>`<td class="${/[っがばぱ]/.test(d.forms[i+1])?'special':''}">${d.forms[i+1]}</td>`).join('')}</tr>`).join('');$('#content').innerHTML=panel('먼저 단어와 핵심 표현을 익혀요.',`<div class="vocab-grid">${vocab.map(v=>`<button class="vocab"><span class="jp">${v.jp}</span><span class="ko">${v.ko}${v.note?` · ${v.note}`:''}</span></button>`).join('')}</div><div class="grammar"><div><strong>～はいくらですか</strong>　“~은/는 얼마입니까?”</div><div><strong>～と～ください</strong>　“~와/과 ~ 주세요”</div><div><strong>じゃ ＝ では</strong>　“그럼·그러면”. 다음 말이나 행동으로 넘어갈 때 쓰며, じゃ가 더 회화적인 표현입니다.</div></div><details class="counter-table"><summary><b>조수사 1~10 전체표 보기</b></summary><table><thead><tr><th>숫자</th>${Object.values(counterData).map(d=>`<th>${d.label}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table><p class="note">10층은 <b>じゅっかい</b>로 연습합니다.</p></details><div class="actions"><button class="primary" onclick="nextPhase()">뜻 고르기 →</button></div>`)}
function meaningStage(){const data=session.meaning,q=data[index],opts=shuffle([q,...pick(vocab.filter(v=>v.key!==q.key),3)]);$('#content').innerHTML=panel('한국어 뜻에 맞는 표현을 고르세요.',`<div class="prompt"><p>‘${q.ko}’에 해당하는 표현은?</p></div><div class="choices">${opts.map(v=>`<button class="choice" data-good="${v.key===q.key}">${v.jp}</button>`).join('')}</div><p id="feedback" class="feedback"></p>`,`${index+1} / ${data.length}`);wireChoices(data,q.jp)}
function moneyStage(){const data=session.money,q=data[index],opts=shuffle([q.read,...pick(money.filter(x=>x.n!==q.n),3).map(x=>x.read)]);$('#content').innerHTML=panel('금액을 히라가나로 읽은 것을 고르세요.',`<div class="prompt"><span class="big">${q.n.toLocaleString()}${R('円','えん')}</span><p>これは いくらですか。</p></div><div class="choices">${opts.map(x=>`<button class="choice" data-good="${x===q.read}">${x}</button>`).join('')}</div><p id="feedback" class="feedback"></p>`,`${index+1} / ${data.length}`);wireChoices(data,q.read)}
function counterStage(){const data=session.counter,q=data[index],opts=shuffle([q.read,...pick(counterPool.filter(x=>x.read!==q.read),3).map(x=>x.read)]),unit=q.unit==='人'?R('人','にん'):q.unit==='階'?R('階','かい'):q.unit==='杯'?R('杯','はい'):q.unit==='枚'?R('枚','まい'):q.unit;$('#content').innerHTML=panel('숫자와 세는 단위에 맞는 표현을 고르세요.',`<div class="prompt"><span class="big">${q.n}${unit}</span><p>${q.label}</p></div><div class="choices">${opts.map(x=>`<button class="choice" data-good="${x===q.read}">${x}</button>`).join('')}</div><p id="feedback" class="feedback"></p>`,`${index+1} / ${data.length}`);wireChoices(data,q.read)}
function wireChoices(data,answer){document.querySelectorAll('.choice').forEach(b=>b.onclick=()=>{const good=b.dataset.good==='true';document.querySelectorAll('.choice').forEach(x=>x.disabled=true);if(good){b.classList.add('correct');feedback('정답입니다. 소리 내어 읽어보세요.',true)}else{b.classList.add('wrong');document.querySelector('[data-good="true"]')?.classList.add('correct');feedback(`정답은 ${strip(answer)}입니다.`,false)}showNext(data)})}
function orderStage(){const data=session.order,q=data[index],answer=q.blocks,extras=['は','が','に','です'].filter(x=>!answer.includes(x)).slice(0,2),bank=shuffle([...answer,...extras]);$('#content').innerHTML=panel('한국어 주문에 맞게 블록을 조립하세요.',`<p class="translation">${q.ko}</p><div id="answer" class="answer-zone">블록을 차례로 선택하세요</div><div class="bank">${bank.map((x,i)=>`<button class="block" data-i="${i}">${x}</button>`).join('')}</div><p id="feedback" class="feedback"></p><div class="actions"><button id="undo" class="secondary">하나 되돌리기</button><button id="check" class="primary">정답 확인</button></div>`,`${index+1} / ${data.length}`);document.querySelectorAll('.block').forEach(b=>b.onclick=()=>{if(b.classList.contains('used'))return;b.classList.add('used');selected.push(b);showBlocks()});$('#undo').onclick=()=>{const b=selected.pop();if(b)b.classList.remove('used');showBlocks()};$('#check').onclick=()=>{const got=selected.map(b=>norm(strip(b.innerHTML))).join(''),expected=answer.map(x=>norm(strip(x))).join('');if(got===expected){feedback('정답입니다. 주문 문장을 천천히 읽어보세요.',true);showNext(data)}else feedback('블록의 순서와 수량 표현을 다시 확인하세요.',false)}}
function showBlocks(){$('#answer').innerHTML=selected.length?selected.map(b=>`<span class="block">${b.innerHTML}</span>`).join(''):'블록을 차례로 선택하세요'}
function dialogueStage(){const data=session.dialogue,q=data[index];$('#content').innerHTML=panel('한국어 뜻을 보고 대화의 빈칸을 입력하세요.',`<p class="translation">${q.ko}</p><div class="sentence">${q.jp}</div>${inputHtml('히라가나로 입력하세요')}`,`${index+1} / ${data.length}`);wireInput(q.answers,data,q.done)}
function fullStage(){const data=session.full,q=data[index];$('#content').innerHTML=panel('한국어 문장을 일본어로 입력하세요.',`<p class="translation">${q.ko}</p>${inputHtml('문장 전체를 입력하세요')}<div id="done" class="sentence" hidden></div>`,`${index+1} / ${data.length}`);wireInput(q.answers,data,q.done)}
function inputHtml(ph){return `<input id="typing" class="input" lang="ja" autocomplete="off" placeholder="${ph}"><p id="feedback" class="feedback"></p><div class="actions"><button id="checkInput" class="primary">입력 확인</button></div>`}
function wireInput(answers,data,done){const valid=answers.map(norm),check=()=>{if(valid.includes(norm($('#typing').value))){feedback('정답입니다. 완성된 문장을 소리 내어 읽어보세요.',true);$('#typing').disabled=true;if($('#done')){$('#done').innerHTML=done;$('#done').hidden=false}showNext(data)}else feedback('표현과 히라가나를 다시 확인하세요.',false)};$('#checkInput').onclick=check;$('#typing').onkeydown=e=>{if(e.key==='Enter')check()};$('#typing').focus()}
function feedback(t,g){$('#feedback').textContent=t;$('#feedback').className=`feedback ${g?'good':'bad'}`}
function showNext(data){if($('#nextBtn'))return;const label=index<data.length-1?'다음 문제 →':phase<6?'다음 단계 →':'학습 마치기';$('#feedback').insertAdjacentHTML('afterend',`<div class="actions"><button id="nextBtn" class="primary">${label}</button></div>`);$('#nextBtn').onclick=()=>advance(data)}
function advance(data){if(index<data.length-1){index++;render()}else nextPhase()}
function nextPhase(){if(phase<6){phase++;index=0;tabs();render();scrollTo(0,0)}else{$('#content').innerHTML=panel('7과 학습 완료!',`<div class="complete"><b>🎉</b><h3>가격·수량·주문 표현을 모두 연습했습니다.</h3><p class="note">다시 시작하면 문제은행에서 다른 문제가 출제됩니다.</p></div><div class="actions"><button class="secondary" onclick="screen('home')">처음으로</button><button class="primary" onclick="document.querySelector('#startBtn').click()">새 문제로 다시 학습</button></div>`);}}
