const $=s=>document.querySelector(s),R=(k,r)=>`<ruby>${k}<rt>${r}</rt></ruby>`;
const shuffle=a=>{const c=[...a];for(let i=c.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[c[i],c[j]]=[c[j],c[i]]}return c},pick=(a,n)=>shuffle(a).slice(0,n);
const hira=s=>s.replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60)),norm=s=>hira(s.normalize('NFKC')).replace(/[\s　。、,.!！?？]/g,'');
const V=(key,display,reading,ko,icon,alive=false)=>({key,display,reading,ko,icon,alive});
const vocab=[
 V('dict',R('辞書','じしょ'),'じしょ','사전','📘'),V('card',R('名刺','めいし'),'めいし','명함','💳'),V('coins',R('細','こま')+'かいお'+R('金','かね'),'こまかいおかね','잔돈','🪙'),
 V('exam',R('試験','しけん'),'しけん','시험','📝'),V('errand',R('用事','ようじ'),'ようじ','볼일','📌'),V('job','アルバイト','アルバイト','아르바이트','🧑‍💼'),
 V('post','ポスト','ポスト','우체통','📮'),V('vending',R('自販機','じはんき')+'（'+R('自動販売機','じどうはんばいき')+'）','じはんき','자동판매기','🥤'),
 V('cafeteria',R('食堂','しょくどう'),'しょくどう','식당','🍱'),V('bench','ベンチ','ベンチ','벤치','🪑'),V('reception',R('受付','うけつけ'),'うけつけ','접수처','🛎️'),
 V('switch','スイッチ','スイッチ','스위치','🔘'),V('shop',R('店','みせ'),'みせ','가게','🏪'),V('tree',R('木','き'),'き','나무','🌳'),V('fridge',R('冷蔵庫','れいぞうこ'),'れいぞうこ','냉장고','🧊'),
 V('things',R('色々','いろいろ')+'な'+R('物','もの'),'いろいろなもの','여러 가지 물건','📦'),V('garden',R('庭','にわ'),'にわ','정원','🌿'),V('scissors','はさみ','はさみ','가위','✂️'),
 V('bike',R('自転車','じてんしゃ'),'じてんしゃ','자전거','🚲'),V('photo',R('写真','しゃしん'),'しゃしん','사진','🖼️'),V('panda','パンダ','パンダ','판다','🐼',true),
 V('elephant',R('象','ぞう'),'ぞう','코끼리','🐘',true),V('souvenir',R('お土産屋','おみやげや'),'おみやげや','기념품점','🎁')
];
const positions=[
 {key:'top',jp:R('上','うえ'),read:'うえ',ko:'위',css:'pos-top'}, {key:'bottom',jp:R('下','した'),read:'した',ko:'아래',css:'pos-bottom'},
 {key:'left',jp:R('左','ひだり'),read:'ひだり',ko:'왼쪽',css:'pos-left'}, {key:'right',jp:R('右','みぎ'),read:'みぎ',ko:'오른쪽',css:'pos-right'},
 {key:'front',jp:R('前','まえ'),read:'まえ',ko:'앞',css:'pos-front'}, {key:'back',jp:R('後','うし')+'ろ',read:'うしろ',ko:'뒤',css:'pos-back'},
 {key:'inside',jp:R('中','なか'),read:'なか',ko:'안',css:'pos-inside'}, {key:'near',jp:R('近','ちか')+'く',read:'ちかく',ko:'근처',css:'pos-near'},
 {key:'next',jp:'となり',read:'となり',ko:'옆',css:'pos-right'}, {key:'beside',jp:R('横','よこ'),read:'よこ',ko:'바로 옆',css:'pos-left'}
];
const item=k=>vocab.find(v=>v.key===k),pos=k=>positions.find(p=>p.key===k);
const scenePool=[
 {theme:'room',base:'desk',baseJp:'つくえ',baseKo:'책상',object:'dict',position:'top'}, {theme:'room',base:'bag',baseJp:'かばん',baseKo:'가방',object:'card',position:'inside'},
 {theme:'room',base:'wallet',baseJp:'さいふ',baseKo:'지갑',object:'coins',position:'inside'}, {theme:'street',base:'cafeteria',baseJp:R('食堂','しょくどう'),baseKo:'식당',object:'vending',position:'front'},
 {theme:'street',base:'reception',baseJp:R('受付','うけつけ'),baseKo:'접수처',object:'bench',position:'next'}, {theme:'room',base:'fridge',baseJp:R('冷蔵庫','れいぞうこ'),baseKo:'냉장고',object:'switch',position:'beside'},
 {theme:'street',base:'shop',baseJp:R('店','みせ'),baseKo:'가게',object:'tree',position:'front'}, {theme:'garden',base:'garden',baseJp:R('庭','にわ'),baseKo:'정원',object:'things',position:'inside'},
 {theme:'room',base:'desk',baseJp:'つくえ',baseKo:'책상',object:'scissors',position:'top'}, {theme:'street',base:'shop',baseJp:R('店','みせ'),baseKo:'가게',object:'bike',position:'front'},
 {theme:'room',base:'fridge',baseJp:R('冷蔵庫','れいぞうこ'),baseKo:'냉장고',object:'photo',position:'top'}, {theme:'street',base:'station',baseJp:R('駅','えき'),baseKo:'역',object:'post',position:'near'},
 {theme:'street',base:'station',baseJp:R('駅','えき'),baseKo:'역',object:'souvenir',position:'near'},
 {theme:'room',base:'desk',baseJp:'つくえ',baseKo:'책상',object:'photo',position:'top'},
 {theme:'room',base:'desk',baseJp:'つくえ',baseKo:'책상',object:'dict',position:'bottom'},
 {theme:'room',base:'fridge',baseJp:R('冷蔵庫','れいぞうこ'),baseKo:'냉장고',object:'scissors',position:'top'},
 {theme:'room',base:'reception',baseJp:R('受付','うけつけ'),baseKo:'접수처',object:'card',position:'top'},
 {theme:'street',base:'cafeteria',baseJp:R('食堂','しょくどう'),baseKo:'식당',object:'bench',position:'front'},
 {theme:'street',base:'cafeteria',baseJp:R('食堂','しょくどう'),baseKo:'식당',object:'tree',position:'beside'},
 {theme:'street',base:'shop',baseJp:R('店','みせ'),baseKo:'가게',object:'post',position:'next'},
 {theme:'street',base:'shop',baseJp:R('店','みせ'),baseKo:'가게',object:'vending',position:'beside'},
 {theme:'street',base:'station',baseJp:R('駅','えき'),baseKo:'역',object:'bike',position:'front'},
 {theme:'street',base:'station',baseJp:R('駅','えき'),baseKo:'역',object:'bench',position:'next'},
 {theme:'garden',base:'garden',baseJp:R('庭','にわ'),baseKo:'정원',object:'tree',position:'inside'},
 {theme:'garden',base:'garden',baseJp:R('庭','にわ'),baseKo:'정원',object:'bike',position:'inside'},
 {theme:'garden',base:'tree',baseJp:R('木','き'),baseKo:'나무',object:'bench',position:'bottom'},
 {theme:'garden',base:'tree',baseJp:R('木','き'),baseKo:'나무',object:'bike',position:'beside'}
];
const existencePool=[
 {subject:'dict',place:'つくえの'+R('上','うえ'),placeRead:'つくえのうえ'}, {subject:'card',place:'かばんの'+R('中','なか'),placeRead:'かばんのなか'},
 {subject:'coins',place:'さいふの'+R('中','なか'),placeRead:'さいふのなか'}, {subject:'exam',place:R('明日','あした'),placeRead:'あした'},
 {subject:'errand',place:R('今日','きょう'),placeRead:'きょう'}, {subject:'job',place:R('明日','あした'),placeRead:'あした'},
 {subject:'panda',place:R('動物園','どうぶつえん'),placeRead:'どうぶつえん'}, {subject:'elephant',place:R('動物園','どうぶつえん'),placeRead:'どうぶつえん'},
 {subject:'tree',place:R('庭','にわ'),placeRead:'にわ'}, {subject:'bike',place:R('店','みせ')+'の'+R('前','まえ'),placeRead:'みせのまえ'},
 {subject:'post',place:R('駅','えき')+'の'+R('近','ちか')+'く',placeRead:'えきのちかく'}, {subject:'vending',place:R('食堂','しょくどう')+'の'+R('前','まえ'),placeRead:'しょくどうのまえ'},
 {subject:'bench',place:R('受付','うけつけ')+'のとなり',placeRead:'うけつけのとなり'}, {subject:'switch',place:R('冷蔵庫','れいぞうこ')+'の'+R('横','よこ'),placeRead:'れいぞうこのよこ'},
 {subject:'photo',place:'つくえの'+R('上','うえ'),placeRead:'つくえのうえ'}, {subject:'scissors',place:'かばんの'+R('中','なか'),placeRead:'かばんのなか'},
 {subject:'souvenir',place:R('駅','えき')+'の'+R('近','ちか')+'く',placeRead:'えきのちかく'}, {subject:'things',place:R('冷蔵庫','れいぞうこ')+'の'+R('中','なか'),placeRead:'れいぞうこのなか'},
 {subject:'panda',place:R('木','き')+'の'+R('下','した'),placeRead:'きのした'}, {subject:'elephant',place:R('木','き')+'の'+R('近','ちか')+'く',placeRead:'きのちかく'}
];
const blankPool=[
 {ko:'책상 위에 사전이 있습니다.',jp:`つくえの${R('上','うえ')}に${R('辞書','じしょ')}が <span class="blank">＿＿</span>。`,a:['あります'],done:'あります'},
 {ko:'동물원에 판다가 있습니다.',jp:`${R('動物園','どうぶつえん')}にパンダが <span class="blank">＿＿</span>。`,a:['います'],done:'います'},
 {ko:'자동판매기는 식당 앞에 있습니다.',jp:`${R('自販機','じはんき')}は${R('食堂','しょくどう')}の <span class="blank">＿＿</span> にあります。`,a:['まえ'],done:R('前','まえ')},
 {ko:'접수처 옆에 벤치가 있습니다.',jp:`${R('受付','うけつけ')}の <span class="blank">＿＿</span> にベンチがあります。`,a:['となり','よこ'],done:'となり／'+R('横','よこ')},
 {ko:'정원에 무엇이 있습니까?',jp:`${R('庭','にわ')}に <span class="blank">＿＿</span> ありますか。`,a:['なにが'],done:R('何','なに')+'が'},
 {ko:'판다는 어디에 있습니까?',jp:`パンダは <span class="blank">＿＿</span> いますか。`,a:['どこに'],done:'どこに'},
 {ko:'가방 안에 명함이 있습니다.',jp:`かばんの${R('中','なか')}に <span class="blank">＿＿</span> があります。`,a:['めいし'],done:R('名刺','めいし')},
 {ko:'냉장고 위에 사진이 있습니다.',jp:`${R('冷蔵庫','れいぞうこ')}の${R('上','うえ')}に <span class="blank">＿＿</span> があります。`,a:['しゃしん'],done:R('写真','しゃしん')}
 ,{ko:'지갑 안에 잔돈이 있습니다.',jp:`さいふの${R('中','なか')}に <span class="blank">＿＿</span> があります。`,a:['こまかいおかね'],done:R('細','こま')+'かいお'+R('金','かね')}
 ,{ko:'냉장고 옆에 스위치가 있습니다.',jp:`${R('冷蔵庫','れいぞうこ')}の <span class="blank">＿＿</span> にスイッチがあります。`,a:['よこ','となり'],done:R('横','よこ')+'／となり'}
 ,{ko:'역 근처에 기념품점이 있습니다.',jp:`${R('駅','えき')}の <span class="blank">＿＿</span> に${R('お土産屋','おみやげや')}があります。`,a:['ちかく'],done:R('近','ちか')+'く'}
 ,{ko:'나무 아래에 판다가 있습니다.',jp:`${R('木','き')}の${R('下','した')}にパンダが <span class="blank">＿＿</span>。`,a:['います'],done:'います'}
 ,{ko:'오늘 볼일이 있습니다.',jp:`${R('今日','きょう')} <span class="blank">＿＿</span> ${R('用事','ようじ')}があります。`,a:['は'],done:'は'}
 ,{ko:'내일 시험이 있습니다.',jp:`${R('明日','あした')}は <span class="blank">＿＿</span> があります。`,a:['しけん'],done:R('試験','しけん')}
 ,{ko:'식당 앞에 자동판매기가 있습니다.',jp:`${R('食堂','しょくどう')}の${R('前','まえ')}に <span class="blank">＿＿</span> があります。`,a:['じはんき','じどうはんばいき'],done:R('自販機','じはんき')}
];
const fullPool=[
 {ko:'역 근처에 우체통이 있습니다.',a:['えきのちかくにポストがあります','えきのちかくにぽすとがあります'],done:`${R('駅','えき')}の${R('近','ちか')}くにポストがあります。`},
 {ko:'식당 앞에 자동판매기가 있습니다.',a:['しょくどうのまえにじはんきがあります','しょくどうのまえにじどうはんばいきがあります'],done:`${R('食堂','しょくどう')}の${R('前','まえ')}に${R('自販機','じはんき')}があります。`},
 {ko:'동물원에 판다와 코끼리가 있습니다.',a:['どうぶつえんにパンダとぞうがいます','どうぶつえんにぱんだとぞうがいます'],done:`${R('動物園','どうぶつえん')}にパンダと${R('象','ぞう')}がいます。`},
 {ko:'가게 앞에 자전거가 있습니다.',a:['みせのまえにじてんしゃがあります'],done:`${R('店','みせ')}の${R('前','まえ')}に${R('自転車','じてんしゃ')}があります。`},
 {ko:'정원에 여러 가지 물건이 있습니다.',a:['にわにいろいろなものがあります'],done:`${R('庭','にわ')}に${R('色々','いろいろ')}な${R('物','もの')}があります。`},
 {ko:'역 근처에 기념품점이 있습니다.',a:['えきのちかくにおみやげやがあります'],done:`${R('駅','えき')}の${R('近','ちか')}くに${R('お土産屋','おみやげや')}があります。`}
 ,{ko:'접수처 옆에 벤치가 있습니다.',a:['うけつけのとなりにべんちがあります','うけつけのよこにべんちがあります'],done:`${R('受付','うけつけ')}のとなりにベンチがあります。`}
 ,{ko:'냉장고 옆에 스위치가 있습니다.',a:['れいぞうこのよこにすいっちがあります','れいぞうこのとなりにすいっちがあります'],done:`${R('冷蔵庫','れいぞうこ')}の${R('横','よこ')}にスイッチがあります。`}
 ,{ko:'책상 위에 사전과 가위가 있습니다.',a:['つくえのうえにじしょとはさみがあります'],done:`つくえの${R('上','うえ')}に${R('辞書','じしょ')}とはさみがあります。`}
 ,{ko:'정원에 나무와 자전거가 있습니다.',a:['にわにきとじてんしゃがあります'],done:`${R('庭','にわ')}に${R('木','き')}と${R('自転車','じてんしゃ')}があります。`}
 ,{ko:'나무 아래에 판다가 있습니다.',a:['きのしたにぱんだがいます'],done:`${R('木','き')}の${R('下','した')}にパンダがいます。`}
 ,{ko:'내일 아르바이트가 있습니다.',a:['あしたはあるばいとがあります'],done:`${R('明日','あした')}はアルバイトがあります。`}
 ,{ko:'동물원에 코끼리가 있습니다.',a:['どうぶつえんにぞうがいます'],done:`${R('動物園','どうぶつえん')}に${R('象','ぞう')}がいます。`}
];
const stages=['단어 익히기','뜻 고르기','あります・います','위치 관계','장면 읽기','문장 조립','빈칸 입력','문장 입력'];
let phase=0,index=0,selected=[],session={};
const recentKey='existence-review-recent-v2';
function signature(x){return x.key||[x.subject,x.placeRead,x.base,x.object,x.position,x.ko].filter(Boolean).join('|')}
function pickFresh(pool,n,group,recent){const old=new Set(recent[group]||[]),fresh=shuffle(pool.filter(x=>!old.has(signature(x)))),chosen=[...fresh,...shuffle(pool.filter(x=>old.has(signature(x))))].slice(0,n);recent[group]=chosen.map(signature);return chosen}
function prepare(){let recent={};try{recent=JSON.parse(localStorage.getItem(recentKey)||'{}')}catch{}session={meaning:pickFresh(vocab,8,'meaning',recent),exist:pickFresh(existencePool,6,'exist',recent),position:pickFresh(positions,6,'position',recent),scene:pickFresh(scenePool,6,'scene',recent),blocks:pickFresh(scenePool,5,'blocks',recent),blank:pickFresh(blankPool,5,'blank',recent),full:pickFresh(fullPool,2,'full',recent)};localStorage.setItem(recentKey,JSON.stringify(recent))}
function screen(id){document.querySelectorAll('.screen').forEach(x=>x.classList.toggle('active',x.id===id));scrollTo(0,0)}
$('#startBtn').onclick=()=>{phase=0;index=0;prepare();screen('lesson');tabs();render()};$('#homeBtn').onclick=$('#backBtn').onclick=()=>screen('home');
function tabs(){$('#tabs').innerHTML=stages.map((s,i)=>`<button class="${i===phase?'active':''}" data-step="${i}">${i+1}. ${s}</button>`).join('');document.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>{phase=+b.dataset.step;index=0;tabs();render()})}
function panel(title,body,count=''){return `<section class="panel"><div class="panel-head"><h3>${title}</h3>${count?`<span class="count">${count}</span>`:''}</div>${body}</section>`}
function render(){selected=[];if(phase===0)return vocabStage();if(phase===1)return meaningStage();if(phase===2)return existenceStage();if(phase===3)return positionStage();if(phase===4)return sceneStage();if(phase===5)return blockStage();if(phase===6)return blankStage();fullStage()}
function vocabStage(){$('#content').innerHTML=panel('단어와 한국어 뜻을 확인하세요.',`<div class="vocab-grid">${vocab.map(v=>`<button class="vocab"><span class="jp">${v.icon} ${v.display}</span><span class="ko">${v.ko}</span></button>`).join('')}</div><div class="rule-list"><div class="rule"><strong>あります</strong>　사물·장소·식물 등이 존재할 때 사용합니다.</div><div class="rule"><strong>います</strong>　사람·동물처럼 스스로 움직이는 대상이 존재할 때 사용합니다.</div></div><div class="actions"><button class="primary" onclick="nextPhase()">뜻 고르기 →</button></div>`)}
function meaningStage(){const data=session.meaning,q=data[index],opts=shuffle([q,...pick(vocab.filter(x=>x.key!==q.key),3)]);$('#content').innerHTML=panel('한국어 뜻에 맞는 단어를 고르세요.',`<div class="prompt"><p>‘${q.ko}’에 해당하는 단어는?</p></div><div class="choices">${opts.map(x=>`<button class="choice" data-good="${x.key===q.key}">${x.display}</button>`).join('')}</div><p id="feedback" class="feedback"></p>`,`${index+1} / ${data.length}`);wireChoices(data,q.display)}
function existenceStage(){const data=session.exist,q=data[index],v=item(q.subject),answer=v.alive?'います':'あります',opts=['あります','います'];$('#content').innerHTML=panel('대상에 맞는 존재 표현을 고르세요.',`<div class="prompt"><span class="scene-icon">${v.icon}</span><p>${q.place}に${v.display}が（　　　）。</p></div><div class="choices">${opts.map(x=>`<button class="choice" data-good="${x===answer}">${x}</button>`).join('')}</div><p id="feedback" class="feedback"></p>`,`${index+1} / ${data.length}`);wireChoices(data,answer)}
function positionStage(){const data=session.position,q=data[index],opts=shuffle([q,...pick(positions.filter(x=>x.key!==q.key),3)]);$('#content').innerHTML=panel('한국어 위치에 맞는 일본어를 고르세요.',`<div class="prompt"><p>‘${q.ko}’에 해당하는 위치 표현은?</p></div><div class="choices">${opts.map(x=>`<button class="choice" data-good="${x.key===q.key}">${x.jp}</button>`).join('')}</div><p id="feedback" class="feedback"></p>`,`${index+1} / ${data.length}`);wireChoices(data,q.jp)}
function sceneHtml(q){const v=item(q.object),p=pos(q.position),theme=q.theme==='room'?' room':q.theme==='garden'?' garden':'';return `<div class="scene${theme}"><div class="place ${q.theme==='room'?'furniture':'building'}"><span>${q.baseJp}</span></div><div class="place object ${p.css}"><span>${v.icon}<small>${v.display}</small></span></div></div>`}
function sentenceFor(q){const v=item(q.object),p=pos(q.position);return `${q.baseJp}の${p.jp}に${v.display}があります。`}
const inversePosition={top:'bottom',bottom:'top',left:'right',right:'left',front:'back',back:'front',near:'near',next:'next',beside:'beside'};
function reverseSentenceFor(q){const reverse=inversePosition[q.position];if(!reverse)return null;const v=item(q.object),p=pos(reverse);return `${v.display}の${p.jp}に${q.baseJp}があります。`}
function sceneStage(){const data=session.scene,q=data[index],correct=[sentenceFor(q),reverseSentenceFor(q)].filter(Boolean),wrong=pick(scenePool.filter(x=>x!==q).flatMap(x=>[sentenceFor(x),reverseSentenceFor(x)].filter(Boolean)).filter(x=>!correct.includes(x)),4-correct.length),opts=shuffle([...correct,...wrong]);$('#content').innerHTML=panel('그림과 맞는 문장을 고르세요.',`${sceneHtml(q)}<p class="relation-note">기준을 바꿔 표현한 문장도 정답입니다.</p><div class="choices">${opts.map(x=>`<button class="choice" data-good="${correct.includes(x)}">${x}</button>`).join('')}</div><p id="feedback" class="feedback"></p>`,`${index+1} / ${data.length}`);wireChoices(data,correct.join(' / '))}
function blockStage(){const data=session.blocks,q=data[index],v=item(q.object),p=pos(q.position),primary=[q.baseJp+'の',p.jp+'に',v.display+'が','あります'],reverseKey=inversePosition[q.position],reverse=reverseKey?[v.display+'の',pos(reverseKey).jp+'に',q.baseJp+'が','あります']:null,answers=[primary,...(reverse?[reverse]:[])],extras=['は','います'],unique=new Map(),all=[...primary,...(reverse||[]),...extras];all.forEach(x=>{const key=norm(strip(x));if(!unique.has(key))unique.set(key,x)});const bank=shuffle([...unique.values()]);selected=[];$('#content').innerHTML=panel('그림을 보고 문장 블록을 조립하세요.',`${sceneHtml(q)}<p class="relation-note">어느 쪽을 기준으로 조립해도 됩니다. 기준을 바꾸면 반대 위치어를 사용하세요.</p><div id="answer" class="answer-zone">블록을 차례로 선택하세요</div><div class="bank">${bank.map((x,i)=>`<button class="block" data-i="${i}">${x}</button>`).join('')}</div><p id="feedback" class="feedback"></p><div class="actions"><button id="undo" class="secondary">하나 되돌리기</button><button id="check" class="primary">정답 확인</button></div>`,`${index+1} / ${data.length}`);document.querySelectorAll('.block').forEach(b=>b.onclick=()=>{if(b.classList.contains('used'))return;b.classList.add('used');selected.push(b);showBlocks()});$('#undo').onclick=()=>{const b=selected.pop();if(b)b.classList.remove('used');showBlocks()};$('#check').onclick=()=>{const got=selected.map(b=>norm(strip(b.innerHTML))).join(''),corrects=answers.map(a=>a.map(x=>norm(strip(x))).join(''));if(corrects.includes(got)){feedback('정답입니다. 기준을 바꾼 문장도 함께 말해보세요.',true);showNext(data)}else feedback('기준 대상과 그에 맞는 위치 표현을 다시 확인하세요.',false)}}
function showBlocks(){$('#answer').innerHTML=selected.length?selected.map(b=>`<span class="block">${b.innerHTML}</span>`).join(''):'블록을 차례로 선택하세요'}
function blankStage(){inputStage(session.blank,'한국어 뜻을 보고 빈칸을 입력하세요.')}
function fullStage(){const data=session.full,q=data[index];$('#content').innerHTML=panel('한국어 문장을 일본어로 입력하세요.',`<p class="translation">${q.ko}</p>${inputHtml('문장 전체를 입력하세요')}<div id="done" class="sentence" hidden></div>`,`${index+1} / ${data.length}`);wireInput(q.a,data,q.done)}
function inputStage(data,title){const q=data[index];$('#content').innerHTML=panel(title,`<p class="translation">${q.ko}</p><div class="sentence">${q.jp}</div>${inputHtml('일본어로 입력하세요')}<div id="done" class="sentence" hidden></div>`,`${index+1} / ${data.length}`);wireInput(q.a,data,q.done)}
function inputHtml(ph){return `<input id="typing" class="input" lang="ja" autocomplete="off" placeholder="${ph}"><p id="feedback" class="feedback"></p><div class="actions"><button id="checkInput" class="primary">입력 확인</button></div>`}
function wireInput(answers,data,done){const valid=(Array.isArray(answers)?answers:[answers]).map(norm),check=()=>{if(valid.includes(norm($('#typing').value))){feedback('정답입니다. 문장 전체를 소리 내어 읽어보세요.',true);$('#typing').disabled=true;if($('#done')){$('#done').innerHTML=done;$('#done').hidden=false}showNext(data)}else feedback('위치 표현과 あります・います를 다시 확인하세요.',false)};$('#checkInput').onclick=check;$('#typing').onkeydown=e=>{if(e.key==='Enter')check()};$('#typing').focus()}
function wireChoices(data,answer){document.querySelectorAll('.choice').forEach(b=>b.onclick=()=>{const good=b.dataset.good==='true';document.querySelectorAll('.choice').forEach(x=>x.disabled=true);if(good){b.classList.add('correct');feedback('정답입니다. 표현을 소리 내어 읽어보세요.',true)}else{b.classList.add('wrong');document.querySelector('[data-good="true"]')?.classList.add('correct');feedback(`정답은 ${strip(answer)}입니다.`,false)}showNext(data)})}
function strip(s){const d=document.createElement('div');d.innerHTML=s;d.querySelectorAll('rt').forEach(x=>x.remove());return d.textContent}function feedback(t,g){$('#feedback').textContent=t;$('#feedback').className=`feedback ${g?'good':'bad'}`}
function showNext(data){if($('#nextBtn'))return;const label=index<data.length-1?'다음 문제 →':phase<stages.length-1?'다음 단계 →':'복습 마치기';$('#feedback').insertAdjacentHTML('afterend',`<div class="actions"><button id="nextBtn" class="primary">${label}</button></div>`);$('#nextBtn').onclick=()=>advance(data)}
function advance(data){if(index<data.length-1){index++;render()}else nextPhase()}function nextPhase(){if(phase<stages.length-1){phase++;index=0;tabs();render();scrollTo(0,0)}else $('#content').innerHTML=panel('복습 완료!',`<div class="complete"><b>🎉</b><h3>존재와 위치 관계 복습을 마쳤습니다.</h3><p class="note">다시 시작하면 다른 단어와 장면이 출제됩니다.</p></div><div class="actions"><button class="primary" onclick="document.querySelector('#backBtn').click()">처음으로</button></div>`)}
