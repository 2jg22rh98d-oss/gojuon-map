const $=s=>document.querySelector(s),R=(k,r)=>`<ruby>${k}<rt>${r}</rt></ruby>`;
const shuffle=a=>{const c=[...a];for(let i=c.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[c[i],c[j]]=[c[j],c[i]]}return c},pick=(a,n)=>shuffle(a).slice(0,n);
const hira=s=>s.replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60)),norm=s=>hira(s.normalize('NFKC')).replace(/[\s　。、,.!！?？]/g,'');
const V=(key,display,reading,ko,note='')=>({key,display,reading,ko,note});

const newWords=[
 V('more','もう'+R('少','すこ')+'し','もうすこし','조금 더'),V('ikaga','いかがですか','いかがですか','어떠십니까?', '`どうですか`보다 정중한 표현'),V('dou','どうですか','どうですか','어떻습니까?'),
 V('price',R('値段','ねだん'),'ねだん','가격'),V('suitcase','スーツケース','スーツケース','여행 가방'),V('near',R('近','ちか')+'くに','ちかくに','가까이에'),
 V('restaurant',R('料理屋','りょうりや'),'りょうりや','음식점'),V('amari','あまり～ない','あまり～ない','별로 ~하지 않다','반드시 부정 표현과 함께 사용'),
 V('soreni','それに','それに','게다가'),V('very','とても','とても','매우'),V('about','ぐらい','ぐらい','정도·쯤'),
 V('spring',R('春','はる'),'はる','봄'),V('summer',R('夏','なつ'),'なつ','여름'),V('autumn',R('秋','あき'),'あき','가을'),V('winter',R('冬','ふゆ'),'ふゆ','겨울'),V('clock',R('時計','とけい'),'とけい','시계')
];

const A=(key,kanji,reading,ko,emoji,opposite='')=>({key,kanji,reading,display:kanji?R(kanji,reading):reading,ko,emoji,opposite});
const adjectives=[
 A('big','大きい','おおきい','크다','🧳','small'),A('small','小さい','ちいさい','작다','⌚','big'),A('expensive','高い','たかい','비싸다·높다','💎','cheap'),A('cheap','安い','やすい','싸다','🏷️','expensive'),
 A('hot','暑い','あつい','덥다','☀️','cold'),A('cold','寒い','さむい','춥다','❄️','hot'),A('busy','忙しい','いそがしい','바쁘다','💼'),A('fun','楽しい','たのしい','즐겁다','🎉'),
 A('happy','','うれしい','기쁘다','😊'),A('interesting','','おもしろい','재미있다','🎬','boring'),A('boring','','つまらない','재미없다','🥱','interesting'),A('delicious','','おいしい','맛있다','🍣','badTaste'),
 A('badTaste','','まずい','맛없다','😣','delicious'),A('cute','','かわいい','귀엽다','🐱'),A('good','','いい','좋다','👍','bad'),A('spicy','辛い','からい','맵다','🌶️'),A('bitter','','にがい','쓰다','☕'),
 A('far','遠い','とおい','멀다','🗺️','nearA'),A('nearA','近い','ちかい','가깝다','📍','far'),A('fast','速い','はやい','빠르다','🚕','slow'),A('slow','遅い','おそい','늦다·느리다','🐢','fast'),
 A('difficult','','むずかしい','어렵다','🧩','easy'),A('many','多い','おおい','많다','👥','few'),A('few','少ない','すくない','적다','👤','many'),A('easy','','やさしい','쉽다','📘','difficult'),
 A('bad','悪い','わるい','나쁘다','👎','good'),A('amazing','','すごい','대단하다','🌟'),A('wide','広い','ひろい','넓다','🏠','narrow'),A('narrow','狭い','せまい','좁다','🚪','wide')
];
const plain=a=>a.reading;
const forms=a=>{if(a.key==='good')return{present:'いいです',neg:['よくないです','よくありません'],past:'よかったです',pastNeg:['よくなかったです','よくありませんでした'],noun:'いい'};const stem=a.reading.slice(0,-1);return{present:a.reading+'です',neg:[stem+'くないです',stem+'くありません'],past:stem+'かったです',pastNeg:[stem+'くなかったです',stem+'くありませんでした'],noun:a.reading}};
const objects=[
 {jp:R('部屋','へや'),read:'へや',ko:'방',adj:'wide'}, {jp:R('今日','きょう'),read:'きょう',ko:'오늘',adj:'hot'}, {jp:'ぼうし',read:'ぼうし',ko:'모자',adj:'small'},
 {jp:'タクシー',read:'タクシー',ko:'택시',adj:'fast'}, {jp:'Tシャツ',read:'Tシャツ',ko:'티셔츠',adj:'big'}, {jp:'すし',read:'すし',ko:'초밥',adj:'delicious'},
 {jp:'かばん',read:'かばん',ko:'가방',adj:'expensive'}, {jp:'ホテル',read:'ホテル',ko:'호텔',adj:'cheap'}, {jp:R('映画','えいが'),read:'えいが',ko:'영화',adj:'interesting'},
 {jp:R('問題','もんだい'),read:'もんだい',ko:'문제',adj:'difficult'}, {jp:R('冬','ふゆ'),read:'ふゆ',ko:'겨울',adj:'cold'}, {jp:R('旅行','りょこう'),read:'りょこう',ko:'여행',adj:'fun'}
];
const topicKo={へや:'방은',きょう:'오늘은',ぼうし:'모자는',タクシー:'택시는','Tシャツ':'티셔츠는',すし:'초밥은',かばん:'가방은',ホテル:'호텔은',えいが:'영화는',もんだい:'문제는',ふゆ:'겨울은',りょこう:'여행은'};
const predicateKo={wide:'넓습니다',hot:'덥습니다',small:'작습니다',fast:'빠릅니다',big:'큽니다',delicious:'맛있습니다',expensive:'비쌉니다',cheap:'쌉니다',interesting:'재미있습니다',difficult:'어렵습니다',cold:'춥습니다',fun:'즐겁습니다'};
const adnominalKo={wide:'넓은',hot:'더운',small:'작은',fast:'빠른',big:'큰',delicious:'맛있는',expensive:'비싼',cheap:'싼',interesting:'재미있는',difficult:'어려운',cold:'추운',fun:'즐거운'};
const pastKo={big:'컸습니다',small:'작았습니다',expensive:'비쌌습니다',cheap:'쌌습니다',hot:'더웠습니다',cold:'추웠습니다',busy:'바빴습니다',fun:'즐거웠습니다',happy:'기뻤습니다',interesting:'재미있었습니다',boring:'재미없었습니다',delicious:'맛있었습니다',badTaste:'맛없었습니다',cute:'귀여웠습니다',spicy:'매웠습니다',bitter:'썼습니다',far:'멀었습니다',nearA:'가까웠습니다',fast:'빨랐습니다',slow:'늦었습니다',difficult:'어려웠습니다',many:'많았습니다',few:'적었습니다',easy:'쉬웠습니다',bad:'나빴습니다',amazing:'대단했습니다',wide:'넓었습니다',narrow:'좁았습니다'};
const newContext=[
 {ko:'조금 더 작은 것이 좋습니다.',jp:`<span class="blank">＿＿</span>${R('小','ちい')}さいものがいいです。`,a:['もうすこし'],done:'もう少し'},
 {ko:'이 여행 가방은 어떻습니까?',jp:`この スーツケースは <span class="blank">＿＿</span>。`,a:['どうですか','いかがですか'],done:'どうですか／いかがですか'},
 {ko:'호텔 가까이에 음식점이 있습니다.',jp:`ホテルの <span class="blank">＿＿</span> ${R('料理屋','りょうりや')}があります。`,a:['ちかくに'],done:R('近','ちか')+'くに'},
 {ko:'별로 비싸지 않습니다.',jp:`<span class="blank">＿＿</span> ${R('高','たか')}くないです。`,a:['あまり'],done:'あまり'},
 {ko:'매우 맛있습니다.',jp:`<span class="blank">＿＿</span> おいしいです。`,a:['とても'],done:'とても'},
 {ko:'게다가 매우 쌉니다.',jp:`<span class="blank">＿＿</span>、とても ${R('安','やす')}いです。`,a:['それに'],done:'それに'},
 {ko:'1분 정도입니다.',jp:`1${R('分','ぷん')} <span class="blank">＿＿</span>です。`,a:['ぐらい'],done:'ぐらい'},
 {ko:'가격은 얼마입니까?',jp:`<span class="blank">＿＿</span>は いくらですか。`,a:['ねだん'],done:R('値段','ねだん')}
];

const transformPool=adjectives.map(a=>({a,f:forms(a)}));
const conversation=[
 {ko:'그 가게는 비쌉니까? — 아니요, 별로 비싸지 않습니다.',jp:`その ${R('店','みせ')}は ${R('高','たか')}いですか。<br>いいえ、あまり <span class="blank">＿＿</span>。`,a:['たかくないです','たかくありません'],done:`${R('高','たか')}くないです／${R('高','たか')}くありません`},
 {ko:'올해 여름은 더웠습니다.',jp:`${R('今年','ことし')}の ${R('夏','なつ')}は <span class="blank">＿＿</span>。`,a:['あつかったです'],done:R('暑','あつ')+'かったです'},
 {ko:'그 호텔은 좋지 않았습니다.',jp:`あの ホテルは <span class="blank">＿＿</span>。`,a:['よくなかったです','よくありませんでした'],done:'よくなかったです／よくありませんでした'},
 {ko:'어제는 바쁘지 않았습니다.',jp:`${R('昨日','きのう')}は <span class="blank">＿＿</span>。`,a:['いそがしくなかったです','いそがしくありませんでした'],done:R('忙','いそが')+'しくなかったです／'+R('忙','いそが')+'しくありませんでした'},
 {ko:'조금 더 작은 것이 좋습니다.',jp:`もう${R('少','すこ')}し <span class="blank">＿＿</span> ものがいいです。`,a:['ちいさい'],done:R('小','ちい')+'さい'},
 {ko:'가깝고, 게다가 매우 맛있습니다.',jp:`${R('近','ちか')}いです。それに、とても <span class="blank">＿＿</span>。`,a:['おいしいです'],done:'おいしいです'}
];
const fullPool=[
 {ko:'이 여행 가방은 크지 않습니다.',a:['このスーツケースはおおきくないです','このスーツケースはおおきくありません'],done:`この スーツケースは ${R('大','おお')}きくないです／${R('大','おお')}きくありません。`},
 {ko:'올해 여름은 덥지 않았습니다.',a:['ことしのなつはあつくなかったです','ことしのなつはあつくありませんでした'],done:`${R('今年','ことし')}の${R('夏','なつ')}は${R('暑','あつ')}くなかったです／${R('暑','あつ')}くありませんでした。`},
 {ko:'그 시계는 비싸지 않습니다.',a:['そのとけいはたかくないです','そのとけいはたかくありません'],done:`その${R('時計','とけい')}は${R('高','たか')}くないです／${R('高','たか')}くありません。`},
 {ko:'어제의 여행은 즐거웠습니다.',a:['きのうのりょこうはたのしかったです'],done:`${R('昨日','きのう')}の${R('旅行','りょこう')}は${R('楽','たの')}しかったです。`},
 {ko:'호텔 가까이에 맛있는 음식점이 있습니다.',a:[
  'ホテルのちかくにおいしいりょうりやがあります','ほてるのちかくにおいしいりょうりやがあります',
  'ホテルのちかくにおいしいたべものやさんがあります','ほてるのちかくにおいしいたべものやさんがあります',
  'ホテルのちかくにおいしいいんしょくてんがあります','ほてるのちかくにおいしいいんしょくてんがあります'
 ],done:`ホテルの${R('近','ちか')}くに おいしい${R('料理屋','りょうりや')}があります。<br><small>「${R('食べ物屋','たべものや')}さん」「${R('飲食店','いんしょくてん')}」도 정답으로 인정합니다.</small>`}
];

const units=[
 {id:1,icon:'🧭',title:'새로운 단어 익히기',sub:'상황 표현과 계절 어휘',stages:['단어 익히기','뜻 고르기','문맥 빈칸']},
 {id:2,icon:'🧠',title:'형용사 외우기',sub:'뜻·반대말·장면으로 기억하기',stages:['형용사 보기','뜻 고르기','반대말','장면 고르기']},
 {id:3,icon:'🔄',title:'형용사의 활용 학습하기',sub:'현재·과거·긍정·부정·대화',stages:['활용 규칙','기본문장','현재 부정','과거형','いい 활용','대화 빈칸','문장 입력']}
];
let unit=units[0],phase=0,index=0,selected=[],session={};
function prepare(){session={newMeaning:pick(newWords,7),newContext:pick(newContext,5),adjMeaning:pick(adjectives,8),opposites:pick(adjectives.filter(a=>a.opposite),6),scenes:pick(objects,6),basic:pick(objects,5),negative:pick(transformPool.filter(x=>x.a.key!=='good'),6),past:pick(transformPool.filter(x=>x.a.key!=='good'),6),conversation:pick(conversation,5),full:pick(fullPool,2)}}
function screen(id){document.querySelectorAll('.screen').forEach(x=>x.classList.toggle('active',x.id===id));scrollTo(0,0)}
$('#unitList').innerHTML=units.map(u=>`<button class="unit" data-id="${u.id}"><span class="num">0${u.id}</span><span class="copy"><strong>${u.icon} ${u.title}</strong><small>${u.sub}</small></span><i>›</i></button>`).join('');
document.querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>openUnit(+b.dataset.id));$('#homeBtn').onclick=$('#backBtn').onclick=()=>screen('home');
function openUnit(id){unit=units.find(u=>u.id===id);phase=0;index=0;prepare();$('#badge').textContent=`0${id}`;$('#title').textContent=unit.title;$('#subtitle').textContent=unit.sub;screen('lesson');tabs();render()}
function tabs(){$('#tabs').innerHTML=unit.stages.map((s,i)=>`<button class="${i===phase?'active':''}" data-step="${i}">${i+1}. ${s}</button>`).join('');document.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>{phase=+b.dataset.step;index=0;tabs();render()})}
function panel(title,body,count=''){return `<section class="panel"><div class="panel-head"><h3>${title}</h3>${count?`<span class="count">${count}</span>`:''}</div>${body}</section>`}
function render(){selected=[];if(unit.id===1)return phase===0?vocabNew():phase===1?meaningNew():contextNew();if(unit.id===2)return phase===0?vocabAdj():phase===1?meaningAdj():phase===2?oppositeStage():sceneStage();return phase===0?rules():phase===1?basicStage():phase===2?negativeStage():phase===3?pastStage():phase===4?goodStage():phase===5?conversationStage():fullStage()}
function cards(data){return `<div class="vocab-grid">${data.map(v=>`<button class="vocab"><span class="jp">${v.display}</span><span class="ko">${v.ko}${v.note?` · ${v.note}`:''}</span></button>`).join('')}</div>`}
function vocabNew(){$('#content').innerHTML=panel('새로운 표현과 뜻을 확인하세요.',cards(newWords)+`<div class="rule-list"><div class="rule"><strong>いかがですか / どうですか</strong><br>둘 다 “어떻습니까?”이며, <b>いかがですか</b>가 더 정중합니다.</div><div class="rule"><strong>あまり～ない</strong><br>“별로 ～하지 않다”라는 뜻으로 반드시 부정 표현과 함께 사용합니다.</div></div><div class="actions"><button class="primary" onclick="nextPhase()">뜻 고르기 →</button></div>`)}
function meaningNew(){choiceMeaning(session.newMeaning,newWords)}
function contextNew(){inputQuestion(session.newContext,'문맥에 맞는 표현을 히라가나로 입력하세요.')}
function vocabAdj(){const pairs=[['big','small'],['expensive','cheap'],['hot','cold'],['delicious','badTaste'],['far','nearA'],['fast','slow'],['many','few'],['wide','narrow'],['good','bad']].map(([a,b])=>[adjectives.find(x=>x.key===a),adjectives.find(x=>x.key===b)]);$('#content').innerHTML=panel('형용사를 반대말과 함께 익히세요.',cards(adjectives)+`<h3 style="margin:25px 0 12px">반대말 연결</h3><div class="pair-grid">${pairs.map(([a,b])=>`<div class="pair">${a.display}<span class="arrow">↔</span>${b.display}</div>`).join('')}</div><div class="actions"><button class="primary" onclick="nextPhase()">뜻 고르기 →</button></div>`)}
function meaningAdj(){choiceMeaning(session.adjMeaning,adjectives)}
function choiceMeaning(data,bank){const q=data[index],opts=shuffle([q,...pick(bank.filter(v=>v.key!==q.key),3)]);$('#content').innerHTML=panel('한국어 뜻에 맞는 표현을 고르세요.',`<div class="prompt"><p>‘${q.ko}’에 해당하는 표현은?</p></div><div class="choices">${opts.map(v=>`<button class="choice" data-good="${v.key===q.key}">${v.display}</button>`).join('')}</div><p id="feedback" class="feedback"></p>`,`${index+1} / ${data.length}`);wireChoices(data,q.display)}
function oppositeStage(){const data=session.opposites,q=data[index],a=adjectives.find(x=>x.key===q.opposite),opts=shuffle([a,...pick(adjectives.filter(x=>x.key!==a.key&&x.key!==q.key),3)]);$('#content').innerHTML=panel('반대되는 뜻의 형용사를 고르세요.',`<div class="prompt"><span class="scene">${q.emoji}</span><p>${q.display}</p></div><div class="choices">${opts.map(v=>`<button class="choice" data-good="${v.key===a.key}">${v.display}</button>`).join('')}</div><p id="feedback" class="feedback"></p>`,`${index+1} / ${data.length}`);wireChoices(data,a.display)}
function sceneStage(){const data=session.scenes,q=data[index],a=adjectives.find(x=>x.key===q.adj),opts=shuffle([a,...pick(adjectives.filter(x=>x.key!==a.key),3)]);$('#content').innerHTML=panel('장면과 한국어 설명에 맞는 형용사를 고르세요.',`<div class="prompt"><span class="scene">${a.emoji}</span><p>${q.ko} — ${a.ko}</p></div><div class="choices">${opts.map(v=>`<button class="choice" data-good="${v.key===a.key}">${v.display}</button>`).join('')}</div><p id="feedback" class="feedback"></p>`,`${index+1} / ${data.length}`);wireChoices(data,a.display)}
function rules(){$('#content').innerHTML=panel('い형용사의 네 가지 활용을 비교하세요.',`<div class="rule-list"><div class="rule"><strong>정중한 현재 긍정</strong><div class="formula">${R('大','おお')}きい → ${R('大','おお')}きいです</div></div><div class="rule"><strong>정중한 현재 부정 · 두 표현 모두 가능</strong><div class="formula">${R('大','おお')}きい → ${R('大','おお')}きくないです ／ ${R('大','おお')}きくありません</div></div><div class="rule"><strong>정중한 과거 긍정</strong><div class="formula">${R('大','おお')}きい → ${R('大','おお')}きかったです</div></div><div class="rule"><strong>정중한 과거 부정 · 두 표현 모두 가능</strong><div class="formula">${R('大','おお')}きい → ${R('大','おお')}きくなかったです ／ ${R('大','おお')}きくありませんでした</div></div></div><table class="compare"><tr><th>명사 수식</th><td>${R('大','おお')}きい かばん</td></tr><tr><th>주의</th><td>い형용사와 명사 사이에 <b>の</b>를 넣지 않습니다.</td></tr></table><div class="actions"><button class="primary" onclick="nextPhase()">기본문장 →</button></div>`)}
function basicStage(){const data=session.basic,q=data[index],a=adjectives.find(x=>x.key===q.adj),type=index%2?'noun':'present',answer=type==='noun'?[a.display,q.jp]:[q.jp,'は',a.display,'です'],extras=type==='noun'?['の','です']:['の','でした'],bank=shuffle([...answer,...extras]),ko=type==='noun'?`${adnominalKo[a.key]} ${q.ko}`:`${topicKo[q.read]} ${predicateKo[a.key]}.`;blockQuestion(data,ko,answer,bank)}
function negativeStage(){const data=session.negative,q=data[index],f=q.f,formal=index%2===1,stem=q.a.kanji?R(q.a.kanji.slice(0,-1),q.a.reading.slice(0,-1)):q.a.reading.slice(0,-1),answer=[stem,formal?'くありません':'くないです'];blockQuestion(data,q.a.ko.replace(/다$/,'지 않습니다'),answer,shuffle([...answer,formal?'くないです':'くありません','かったです']),formal?f.neg[1]:f.neg[0])}
function pastStage(){const data=session.past,q=data[index],negative=index%2===1;let valid,ko,opts;if(!negative){valid=[q.f.past];ko=pastKo[q.a.key];const distractors=[q.f.present,...q.f.neg,...q.f.pastNeg].filter((x,i,a)=>!valid.includes(x)&&a.indexOf(x)===i);opts=shuffle([...valid,...pick(distractors,3)])}else{valid=[...q.f.pastNeg];ko=q.a.ko.replace(/다$/,'지 않았습니다');const distractors=[q.f.present,...q.f.neg].filter((x,i,a)=>!valid.includes(x)&&a.indexOf(x)===i);opts=shuffle([...valid,...pick(distractors,2)])}const answer=valid.join(' ／ ');$('#content').innerHTML=panel('목표 의미에 맞는 활용형을 고르세요.',`<div class="prompt"><p>${q.a.display}<br>목표: “${ko}”</p>${negative?'<small>두 가지 정중 표현을 모두 정답으로 인정합니다.</small>':''}</div><div class="choices">${opts.map(x=>`<button class="choice" data-good="${valid.includes(x)}">${x}</button>`).join('')}</div><p id="feedback" class="feedback"></p>`,`${index+1} / ${data.length}`);wireChoices(data,answer)}
function goodStage(){const rows=[['현재 긍정','いいです'],['현재 부정','よくないです／よくありません'],['과거 긍정','よかったです'],['과거 부정','よくなかったです／よくありませんでした']];$('#content').innerHTML=panel('いい는 よ-로 바뀌는 특별한 형용사입니다.',`<table class="compare">${rows.map(r=>`<tr><th>${r[0]}</th><td class="special">${r[1]}</td></tr>`).join('')}</table><div class="rule-list" style="margin-top:16px"><div class="rule">❌ いくないです　→　⭕ よくないです</div><div class="rule">❌ いかったです　→　⭕ よかったです</div></div><div class="actions"><button class="primary" onclick="nextPhase()">대화 연습 →</button></div>`)}
function conversationStage(){inputQuestion(session.conversation,'상황에 맞는 형용사 활용을 입력하세요.')}
function fullStage(){const data=session.full,q=data[index];$('#content').innerHTML=panel('한국어 문장을 일본어로 입력하세요.',`<p class="translation">${q.ko}</p>${inputHtml('문장 전체를 입력하세요')}<div id="done" class="sentence" hidden></div>`,`${index+1} / ${data.length}`);wireInput(q.a,data,q.done)}
function inputQuestion(data,title){const q=data[index];$('#content').innerHTML=panel(title,`<p class="translation">${q.ko}</p><div class="sentence">${q.jp}</div>${inputHtml('일본어로 입력하세요')}<div id="done" class="sentence" hidden></div>`,`${index+1} / ${data.length}`);wireInput(q.a,data,q.done)}
function blockQuestion(data,ko,answer,bank,expected=''){selected=[];$('#content').innerHTML=panel('한국어 뜻에 맞게 블록을 조립하세요.',`<p class="translation">${ko}</p><div id="answer" class="answer-zone">블록을 차례로 선택하세요</div><div class="bank">${bank.map((x,i)=>`<button class="block" data-i="${i}">${x}</button>`).join('')}</div><p id="feedback" class="feedback"></p><div class="actions"><button id="undo" class="secondary">하나 되돌리기</button><button id="check" class="primary">정답 확인</button></div>`,`${index+1} / ${data.length}`);document.querySelectorAll('.block').forEach(b=>b.onclick=()=>{if(b.classList.contains('used'))return;b.classList.add('used');selected.push(b);showBlocks()});$('#undo').onclick=()=>{const b=selected.pop();if(b)b.classList.remove('used');showBlocks()};$('#check').onclick=()=>{const got=selected.map(b=>norm(strip(b.innerHTML))).join(''),correct=answer.map(x=>norm(strip(x))).join('');if(got===correct){feedback(`정답입니다.${expected?' '+expected:''}`,true);showNext(data)}else feedback('형용사의 형태와 블록 순서를 다시 확인하세요.',false)}}
function showBlocks(){$('#answer').innerHTML=selected.length?selected.map(b=>`<span class="block">${b.innerHTML}</span>`).join(''):'블록을 차례로 선택하세요'}
function wireChoices(data,answer){document.querySelectorAll('.choice').forEach(b=>b.onclick=()=>{const good=b.dataset.good==='true';document.querySelectorAll('.choice').forEach(x=>x.disabled=true);if(good){b.classList.add('correct');feedback('정답입니다. 표현을 소리 내어 읽어보세요.',true)}else{b.classList.add('wrong');document.querySelector('[data-good="true"]')?.classList.add('correct');feedback(`정답은 ${strip(answer)}입니다.`,false)}showNext(data)})}
function inputHtml(ph){return `<input id="typing" class="input" lang="ja" autocomplete="off" placeholder="${ph}"><p id="feedback" class="feedback"></p><div class="actions"><button id="checkInput" class="primary">입력 확인</button></div>`}
function wireInput(answers,data,done){const valid=(Array.isArray(answers)?answers:[answers]).map(norm),check=()=>{if(valid.includes(norm($('#typing').value))){feedback('정답입니다. 완성된 표현을 소리 내어 읽어보세요.',true);$('#typing').disabled=true;if($('#done')){$('#done').innerHTML=done;$('#done').hidden=false}showNext(data)}else feedback('형용사 형태와 문장 끝을 다시 확인하세요.',false)};$('#checkInput').onclick=check;$('#typing').onkeydown=e=>{if(e.key==='Enter')check()};$('#typing').focus()}
function strip(s){const d=document.createElement('div');d.innerHTML=s;d.querySelectorAll('rt').forEach(x=>x.remove());return d.textContent}function feedback(t,g){$('#feedback').textContent=t;$('#feedback').className=`feedback ${g?'good':'bad'}`}
function showNext(data){if($('#nextBtn'))return;const label=index<data.length-1?'다음 문제 →':phase<unit.stages.length-1?'다음 단계 →':'학습 마치기';$('#feedback').insertAdjacentHTML('afterend',`<div class="actions"><button id="nextBtn" class="primary">${label}</button></div>`);$('#nextBtn').onclick=()=>advance(data)}
function advance(data){if(index<data.length-1){index++;render()}else nextPhase()}function nextPhase(){if(phase<unit.stages.length-1){phase++;index=0;tabs();render();scrollTo(0,0)}else $('#content').innerHTML=panel('학습 완료!',`<div class="complete"><b>🎉</b><h3>${unit.title}를 마쳤습니다.</h3><p class="note">다시 들어오면 문제은행에서 다른 문제가 출제됩니다.</p></div><div class="actions"><button class="primary" onclick="document.querySelector('#backBtn').click()">학습 선택으로</button></div>`)}
