const basic=[
  ['0','ゼロ／れい'],['1','いち'],['2','に'],['3','さん'],['4','よん／し'],['5','ご'],['6','ろく'],['7','なな／しち'],['8','はち'],['9','きゅう／く'],['10','じゅう'],
  ['20','にじゅう'],['30','さんじゅう'],['40','よんじゅう'],['50','ごじゅう'],['60','ろくじゅう'],['70','ななじゅう'],['80','はちじゅう'],['90','きゅうじゅう'],['100','ひゃく']
];
const transforms={
  1:['いち','いちじ','いっぷん','ひとつ','ひとり','いっかい','いっぱい','いちまい'],
  2:['に','にじ','にふん','ふたつ','ふたり','にかい','にはい','にまい'],
  3:['さん','さんじ','さんぷん','みっつ','さんにん','さんがい','さんばい','さんまい'],
  4:['よん／し','よじ','よんぷん','よっつ','よにん','よんかい','よんはい','よんまい'],
  5:['ご','ごじ','ごふん','いつつ','ごにん','ごかい','ごはい','ごまい'],
  6:['ろく','ろくじ','ろっぷん','むっつ','ろくにん','ろっかい','ろっぱい','ろくまい'],
  7:['なな／しち','しちじ','ななふん','ななつ','ななにん','ななかい','ななはい','ななまい'],
  8:['はち','はちじ','はっぷん','やっつ','はちにん','はっかい','はっぱい','はちまい'],
  9:['きゅう／く','くじ','きゅうふん','ここのつ','きゅうにん','きゅうかい','きゅうはい','きゅうまい'],
  10:['じゅう','じゅうじ','じゅっぷん','とお','じゅうにん','じゅっかい','じゅっぱい','じゅうまい']
};
const unitLabels=['','시','분','개','명','층','잔','장'];
const basicQuiz=[
  {p:'9',a:['きゅう','く'],o:['きゅうじ','くじ']},{p:'4',a:['よん','し'],o:['よじ','よんぷん']},{p:'7',a:['なな','しち'],o:['しちじ','ななふん']},{p:'40',a:'よんじゅう',o:['しじゅう','よんじ','よんぷん']},
  {p:'90',a:'きゅうじゅう',o:['くじゅう','きゅうじ','くじ']},{p:'100',a:'ひゃく',o:['じゅう','ひゃっぷん','びゃく']},
  {p:'0',a:['ゼロ','れい'],o:['いち','じゅう']},{p:'3',a:'さん',o:['みっつ','さんじ','さんぷん']},{p:'6',a:'ろく',o:['むっつ','ろくじ','ろっぷん']},
  {p:'8',a:'はち',o:['やっつ','はちじ','はっぷん']},{p:'20',a:'にじゅう',o:['にじ','じゅうに','にふん']},{p:'50',a:'ごじゅう',o:['ごじ','じゅうご','ごふん']},
  {p:'60',a:'ろくじゅう',o:['ろくじ','じゅうろく','ろっぷん']},{p:'70',a:'ななじゅう',o:['しちじゅう','じゅうなな','ななふん']},{p:'80',a:'はちじゅう',o:['はちじ','じゅうはち','はっぷん']}
];
const buildQuiz=[
  {p:'35',parts:[['さんじゅう','ご'],['さん','じゅう','ご']],bank:['さん','じゅう','さんじゅう','ご','ごじゅう']},
  {p:'48',parts:[['よんじゅう','はち'],['よん','じゅう','はち']],bank:['よん','じゅう','よんじゅう','はち','はちじゅう']},
  {p:'79',parts:[['ななじゅう','きゅう'],['ななじゅう','く'],['なな','じゅう','きゅう'],['なな','じゅう','く']],bank:['なな','じゅう','ななじゅう','きゅう','く','くじ']},
  {p:'24',parts:[['にじゅう','よん'],['に','じゅう','よん'],['にじゅう','し'],['に','じゅう','し']],bank:['に','じゅう','にじゅう','よん','し','よじ']},
  {p:'56',parts:[['ごじゅう','ろく'],['ご','じゅう','ろく']],bank:['ご','じゅう','ごじゅう','ろく','ろくじゅう']},
  {p:'67',parts:[['ろくじゅう','なな'],['ろくじゅう','しち'],['ろく','じゅう','なな'],['ろく','じゅう','しち']],bank:['ろく','じゅう','ろくじゅう','なな','しち','しちじ']},
  {p:'82',parts:[['はちじゅう','に'],['はち','じゅう','に']],bank:['はち','じゅう','はちじゅう','に','にじゅう']},
  {p:'94',parts:[['きゅうじゅう','よん'],['きゅうじゅう','し'],['きゅう','じゅう','よん'],['きゅう','じゅう','し']],bank:['きゅう','じゅう','きゅうじゅう','よん','し','よじ']}
];
const counterQuiz=[
  {p:'4시',a:'よじ',o:['よんじ','しじ','よんぷん']},{p:'8분',a:'はっぷん',o:['はちふん','はちぷん','はっかい']},{p:'4명',a:'よにん',o:['よんにん','しにん','よっつ']},
  {p:'6층',a:'ろっかい',o:['ろくかい','ろっぱい','ろくがい']},{p:'3잔',a:'さんばい',o:['さんはい','さんぱい','みっつ']},{p:'10층',a:'じゅっかい',o:['じゅうかい','じゅっぱい','とお']},{p:'7장',a:'ななまい',o:['しちまい','ななはい','ななつ']},
  {p:'1분',a:'いっぷん',o:['いちふん','いちぷん','いっかい']},{p:'3분',a:'さんぷん',o:['さんふん','さんぶん','さんばい']},{p:'6분',a:'ろっぷん',o:['ろくふん','ろくぷん','ろっかい']},
  {p:'9시',a:'くじ',o:['きゅうじ','きゅうふん','くふん']},{p:'1명',a:'ひとり',o:['いちにん','ひとつ','ひとりん']},{p:'2명',a:'ふたり',o:['ににん','ふたつ','ふたりん']},
  {p:'3층',a:'さんがい',o:['さんかい','みっかい','さんばい']},{p:'8층',a:'はっかい',o:['はちかい','はっぱい','はっぷん']},{p:'1잔',a:'いっぱい',o:['いちはい','いっはい','いっかい']},
  {p:'6잔',a:'ろっぱい',o:['ろくはい','ろっはい','ろっかい']},{p:'8잔',a:'はっぱい',o:['はちはい','はっはい','はっかい']},{p:'3장',a:'さんまい',o:['みまい','さんばい','さんにん']}
];
const counterBuild=[
  {p:'25분',parts:['に','じゅう','ご','ふん'],bank:['に','じゅう','ご','ふん','ぷん','じ']},
  {p:'42장',parts:['よん','じゅう','に','まい'],bank:['よん','じゅう','に','まい','はい','かい']},
  {p:'13명',parts:['じゅう','さん','にん'],bank:['じゅう','さん','にん','ふん','まい']},
  {p:'36분',parts:['さん','じゅう','ろっ','ぷん'],bank:['さん','じゅう','ろく','ろっ','ふん','ぷん']},
  {p:'48분',parts:['よん','じゅう','はっ','ぷん'],bank:['よん','じゅう','はち','はっ','ふん','ぷん']},
  {p:'24명',parts:['に','じゅう','よ','にん'],bank:['に','じゅう','よん','よ','にん','ひとり']},
  {p:'31층',parts:['さん','じゅう','いっ','かい'],bank:['さん','じゅう','いち','いっ','かい','がい']},
  {p:'56잔',parts:['ご','じゅう','ろっ','ぱい'],bank:['ご','じゅう','ろく','ろっ','はい','ぱい']},
  {p:'28장',parts:['に','じゅう','はち','まい'],bank:['に','じゅう','はち','まい','はい','かい']}
];
const sentences=[
  {ko:'출발은 오전 9시입니다.',jp:'<ruby>出発<rt>しゅっぱつ</rt></ruby>は <ruby>午前<rt>ごぜん</rt></ruby> <span class="blank">＿＿</span> です。',a:'くじ',done:'出発は午前9時です。'},
  {ko:'좌석 번호는 35번 B입니다.',jp:'<ruby>座席番号<rt>ざせきばんごう</rt></ruby>は <span class="blank">＿＿</span> のBです。',a:'さんじゅうご',done:'座席番号は35のBです。'},
  {ko:'학생이 3명 있습니다.',jp:'<ruby>学生<rt>がくせい</rt></ruby>が <span class="blank">＿＿</span> います。',a:'さんにん',done:'学生が3人います。'},
  {ko:'커피를 두 잔 주세요.',jp:'コーヒーを <span class="blank">＿＿</span> ください。',a:'にはい',done:'コーヒーを2杯ください。'},
  {ko:'출발까지 8분입니다.',jp:'<ruby>出発<rt>しゅっぱつ</rt></ruby>まで <span class="blank">＿＿</span> です。',a:'はっぷん',done:'出発まで8分です。'},
  {ko:'회의실은 10층입니다.',jp:'<ruby>会議室<rt>かいぎしつ</rt></ruby>は <span class="blank">＿＿</span> です。',a:'じゅっかい',done:'会議室は10階です。'},
  {ko:'지금은 4시입니다.',jp:'<ruby>今<rt>いま</rt></ruby>は <span class="blank">＿＿</span> です。',a:'よじ',done:'今は4時です。'},
  {ko:'표를 두 장 주세요.',jp:'きっぷを <span class="blank">＿＿</span> ください。',a:'にまい',done:'きっぷを2枚ください。'},
  {ko:'가족은 네 명입니다.',jp:'<ruby>家族<rt>かぞく</rt></ruby>は <span class="blank">＿＿</span> です。',a:'よにん',done:'家族は4人です。'},
  {ko:'호텔은 6층입니다.',jp:'ホテルは <span class="blank">＿＿</span> です。',a:'ろっかい',done:'ホテルは6階です。'},
  {ko:'물을 한 잔 주세요.',jp:'<ruby>水<rt>みず</rt></ruby>を <span class="blank">＿＿</span> ください。',a:'いっぱい',done:'水を1杯ください。'},
  {ko:'수업은 50분입니다.',jp:'<ruby>授業<rt>じゅぎょう</rt></ruby>は <span class="blank">＿＿</span> です。',a:'ごじゅっぷん',done:'授業は50分です。'}
];
const basicInput=[{p:'18',a:'じゅうはち'},{p:'24',a:'にじゅうよん'},{p:'32',a:'さんじゅうに'},{p:'47',a:'よんじゅうなな'},{p:'55',a:'ごじゅうご'},{p:'61',a:'ろくじゅういち'},{p:'76',a:'ななじゅうろく'},{p:'83',a:'はちじゅうさん'},{p:'93',a:'きゅうじゅうさん'},{p:'100',a:'ひゃく'}];
const counterInput=[{p:'3시',a:'さんじ'},{p:'4시',a:'よじ'},{p:'9시',a:'くじ'},{p:'1분',a:'いっぷん'},{p:'8분',a:'はっぷん'},{p:'10분',a:'じゅっぷん'},{p:'1명',a:'ひとり'},{p:'2명',a:'ふたり'},{p:'4명',a:'よにん'},{p:'3층',a:'さんがい'},{p:'6층',a:'ろっかい'},{p:'10층',a:'じゅっかい'},{p:'1잔',a:'いっぱい'},{p:'6잔',a:'ろっぱい'},{p:'7장',a:'ななまい'}];
let course='basic',step=0,index=0,selected=[],pendingData=null;
const $=s=>document.querySelector(s), shuffle=a=>{const copy=[...a];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]]}return copy}, pick=(a,n)=>shuffle(a).slice(0,n), norm=s=>s.normalize('NFKC').replace(/[\s。.!！?？]/g,'');
const quizSets={
  basicChoice:pick(basicQuiz,6),
  basicBuild:pick(buildQuiz,3),
  basicInput:pick(basicInput,4),
  counterChoice:pick(counterQuiz,7),
  counterBuild:pick(counterBuild,3),
  counterInput:pick(counterInput,6),
  sentences:pick(sentences,6)
};
function reshuffleCourse(c){
  if(c==='basic'){
    quizSets.basicChoice=pick(basicQuiz,6);quizSets.basicBuild=pick(buildQuiz,3);quizSets.basicInput=pick(basicInput,4);
  }else if(c==='counter'){
    quizSets.counterChoice=pick(counterQuiz,7);quizSets.counterBuild=pick(counterBuild,3);quizSets.counterInput=pick(counterInput,6);
  }else quizSets.sentences=pick(sentences,6);
}
const screens=n=>document.querySelectorAll('.screen').forEach(x=>x.classList.toggle('active',x.id===n));

document.querySelectorAll('[data-course]').forEach(b=>b.onclick=()=>openCourse(b.dataset.course));
$('#homeBtn').onclick=$('#backBtn').onclick=()=>{screens('home');scrollTo(0,0)};
function openCourse(c){course=c;step=0;index=0;reshuffleCourse(c);screens('lesson');$('#badge').textContent=c==='basic'?'01':c==='counter'?'02':'03';$('#lessonTitle').textContent=c==='basic'?'숫자 읽기':c==='counter'?'숫자의 변신':'문장 속 숫자';renderTabs();render();scrollTo(0,0)}
function renderTabs(){const names=course==='basic'?['보고 익히기','읽기 고르기','규칙 조립','직접 입력']:course==='counter'?['변화 비교','단위 고르기','규칙 조립','직접 입력']:['문장 완성'];$('#tabs').innerHTML=names.map((n,i)=>`<button class="${i===step?'active':''}" data-step="${i}">${i+1}. ${n}</button>`).join('');$('#tabs').querySelectorAll('button').forEach(b=>b.onclick=()=>{step=+b.dataset.step;index=0;renderTabs();render()})}
function panel(title,body,extra=''){return `<section class="panel"><div class="panel-head"><h3>${title}</h3>${extra}</div>${body}</section>`}
function render(){selected=[];pendingData=null;if(course==='basic')renderBasic();else if(course==='counter')renderCounter();else renderSentence()}
function renderBasic(){if(step===0){$('#content').innerHTML=panel('숫자와 읽기를 함께 살펴보세요.',`<div class="number-grid">${basic.map(([n,r])=>`<button class="number-card"><strong>${n}</strong><span>${r}</span></button>`).join('')}</div><p class="note">0~10을 먼저 익힌 뒤, 십 단위 숫자가 어떻게 조립되는지 살펴보세요. 4·7·9처럼 읽기가 둘 이상인 숫자는 뒤의 단위에 따라 읽기가 달라집니다.</p><div class="actions"><button class="primary" onclick="nextStep()">읽기 고르기 →</button></div>`);return}if(step===1)return renderChoice(quizSets.basicChoice,'숫자에 맞는 기본 읽기를 고르세요.');if(step===2)return renderBuild(quizSets.basicBuild,'숫자의 읽기를 블록으로 조립하세요.');renderInput(quizSets.basicInput,'숫자를 히라가나로 입력하세요.')}
function renderCounter(){if(step===0)return renderTransform();if(step===1)return renderChoice(quizSets.counterChoice,'단위까지 보고 알맞은 읽기를 고르세요.');if(step===2)return renderBuild(quizSets.counterBuild,'십 단위와 세는 말을 조립하세요.');renderInput(quizSets.counterInput,'숫자와 단위를 히라가나로 입력하세요.')}
function renderTransform(n=4){const row=transforms[n],examples=unitLabels.map(unit=>`${n}${unit}`);$('#content').innerHTML=panel('같은 숫자의 변화를 비교하세요.',`<div class="transform-buttons">${Object.keys(transforms).map(x=>`<button class="${+x===+n?'active':''}" onclick="renderTransform(${x})">${x}</button>`).join('')}</div><div class="transform"><table><thead><tr>${examples.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody><tr>${row.map((x,i)=>`<td class="${isSpecial(n,i,x)?'alert':''}">${x}</td>`).join('')}</tr></tbody></table></div><p class="note">‘개’는 ひとつ〜とお의 고유 수사입니다. 분홍색은 기본 숫자와 발음이 달라지거나, 작은 っ·탁음·반탁음이 나타나는 주의 표현입니다. <b>10층은 じゅっかい</b>로 읽습니다.</p><div class="actions"><button class="primary" onclick="nextStep()">단위 읽기 고르기 →</button></div>`)}
function isSpecial(n,i,x){return i>0&&(n===4||n===10||/[っばぱ]/.test(x)||(i===1&&[7,9].includes(+n))||(i===4&&[1,2].includes(+n)))}
function answers(q){return Array.isArray(q.a)?q.a:[q.a]}
function renderChoice(data,title){const q=data[index],valid=answers(q),opts=shuffle([...valid,...q.o]);$('#content').innerHTML=panel(title,`<div class="prompt"><small>문제</small><strong>${q.p}</strong></div><div class="choices">${opts.map(x=>`<button class="choice" data-value="${x}">${x}</button>`).join('')}</div><p id="feedback" class="feedback"></p>`,`<span class="counter">${index+1} / ${data.length}</span>`);document.querySelectorAll('.choice').forEach(b=>b.onclick=()=>checkChoice(b,q,data))}
function checkChoice(b,q,data){const valid=answers(q);document.querySelectorAll('.choice').forEach(x=>x.disabled=true);if(valid.includes(b.dataset.value)){b.classList.add('correct');feedback(valid.length>1?`정답입니다! ${valid.join('／')} 모두 사용할 수 있습니다.`:'정답입니다! 소리 내어 한 번 읽어보세요.',true)}else{b.classList.add('wrong');valid.forEach(a=>document.querySelector(`[data-value="${a}"]`)?.classList.add('correct'));feedback(`가능한 정답은 ${valid.join('／')}입니다.`,false)}showNext(data)}
function renderBuild(data,title){const q=data[index];selected=[];$('#content').innerHTML=panel(title,`<div class="prompt"><small>문제</small><strong>${q.p}</strong></div><div id="answer" class="blocks">블록을 차례로 선택하세요</div><div id="bank" class="block-bank">${shuffle(q.bank).map((x,i)=>`<button class="block" data-id="${i}" data-value="${x}">${x}</button>`).join('')}</div><p id="feedback" class="feedback"></p><div class="actions"><button class="secondary" onclick="undo()">하나 되돌리기</button><button class="primary" onclick='checkBuild(${JSON.stringify(data)})'>정답 확인</button></div>`,`<span class="counter">${index+1} / ${data.length}</span>`);document.querySelectorAll('.block').forEach(b=>b.onclick=()=>{if(b.classList.contains('used'))return;b.classList.add('used');selected.push({id:b.dataset.id,v:b.dataset.value});showAnswer()})}
function showAnswer(){$('#answer').innerHTML=selected.length?selected.map(x=>`<span class="block">${x.v}</span>`).join(''):'블록을 차례로 선택하세요'}
function undo(){const x=selected.pop();if(x)document.querySelector(`[data-id="${x.id}"]`)?.classList.remove('used');showAnswer()}
function checkBuild(data){const q=data[index],chosen=selected.map(x=>x.v),patterns=Array.isArray(q.parts[0])?q.parts:[q.parts],correct=patterns.some(p=>chosen.join('|')===p.join('|'));if(correct){feedback('정답입니다! 블록을 이어서 읽어보세요.',true);document.querySelectorAll('#bank .block').forEach(x=>x.disabled=true);showNext(data)}else feedback('블록의 순서를 다시 살펴보세요. 긴 블록이나 낱개 블록 어느 쪽으로도 만들 수 있습니다.',false)}
function renderInput(data,title){const q=data[index];$('#content').innerHTML=panel(title,`<div class="prompt"><small>문제</small><strong>${q.p}</strong></div><div class="input-wrap"><label for="answerInput">일본어 입력</label><input id="answerInput" class="jp-input" lang="ja" autocomplete="off" placeholder="히라가나로 입력하세요"><p id="feedback" class="feedback"></p></div><div class="actions"><button class="primary" onclick='checkInput(${JSON.stringify(data)})'>입력 확인</button></div>`,`<span class="counter">${index+1} / ${data.length}</span>`);$('#answerInput').onkeydown=e=>{if(e.key==='Enter')checkInput(data)};$('#answerInput').focus()}
function checkInput(data){const q=data[index];if(norm($('#answerInput').value)===norm(q.a)){feedback(`정답입니다! ${q.a}`,true);$('#answerInput').disabled=true;showNext(data)}else feedback('단위에 따라 달라지는 읽기를 다시 확인해 보세요.',false)}
function renderSentence(){const data=quizSets.sentences,q=data[index];$('#content').innerHTML=panel('빈칸의 숫자 표현을 히라가나로 입력하세요.',`<p class="translation">${q.ko}</p><div class="sentence">${q.jp}</div><div class="input-wrap"><label for="answerInput">숫자 표현 입력</label><input id="answerInput" class="jp-input" lang="ja" autocomplete="off" placeholder="예: くじ"><p id="feedback" class="feedback"></p></div><div class="actions"><button class="primary" onclick="checkSentence()">문장 확인</button></div>`,`<span class="counter">${index+1} / ${data.length}</span>`);$('#answerInput').onkeydown=e=>{if(e.key==='Enter')checkSentence()};$('#answerInput').focus()}
function checkSentence(){const data=quizSets.sentences,q=data[index];if(norm($('#answerInput').value)===norm(q.a)){feedback(`정답입니다! ${q.done}`,true);$('#answerInput').disabled=true;showNext(data)}else feedback('숫자와 단위를 함께 떠올려 보세요.',false)}
function feedback(t,good){const f=$('#feedback');f.textContent=t;f.className=`feedback ${good?'good':'bad'}`}
function showNext(data){pendingData=data;if($('#nextQuestion'))return;const label=index<data.length-1?'다음 문제 →':(course==='sentence'||step===3?'학습 마치기':'다음 단계 →');$('#feedback').insertAdjacentHTML('afterend',`<div class="actions"><button id="nextQuestion" class="primary" onclick="goNext()">${label}</button></div>`)}
function goNext(){if(pendingData)advance(pendingData)}
function advance(data){if(index<data.length-1){index++;render()}else if(step<(course==='sentence'?0:3)){nextStep()}else{$('#content').innerHTML=panel('학습을 마쳤습니다!',`<p class="note">잘했어요. 과정 선택으로 돌아가 다른 숫자 표현도 연습해 보세요.</p><div class="actions"><button class="primary" onclick="document.querySelector('#backBtn').click()">과정 선택으로</button></div>`)}}
function nextStep(){step++;index=0;renderTabs();render();scrollTo(0,0)}
