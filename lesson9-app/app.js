const $=s=>document.querySelector(s),R=(k,r)=>`<ruby>${k}<rt>${r}</rt></ruby>`;
const shuffle=a=>{const c=[...a];for(let i=c.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[c[i],c[j]]=[c[j],c[i]]}return c};
const pick=(a,n)=>shuffle(a).slice(0,n),hira=s=>s.replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60));
const norm=s=>hira(s.normalize('NFKC')).replace(/[\s　。、,.!！?？]/g,'');
const A=(key,kanji,reading,ko,emoji)=>({key,kanji,reading,ko,emoji,display:kanji?R(kanji,reading):reading});
const E=(key,display,reading,ko,note='')=>({key,display,reading,ko,note});

const adjectives=[
 A('quiet','静か','しずか','조용하다','🤫'),A('lively','','にぎやか','번화하다·활기차다','🎊'),A('healthy','元気','げんき','건강하다·활기차다','💪'),
 A('kind','親切','しんせつ','친절하다','🤝'),A('famous','有名','ゆうめい','유명하다','🌟'),A('convenient','便利','べんり','편리하다','🏪'),A('inconvenient','不便','ふべん','불편하다','🚧'),
 A('like','好き','すき','좋아하다','❤️'),A('dislike','嫌い','きらい','싫어하다','🙅'),A('skillful','上手','じょうず','잘하다','👏'),A('unskillful','下手','へた','잘 못하다','🔰'),
 A('easy','簡単','かんたん','간단하다','✅'),A('free','暇','ひま','한가하다','🌿'),A('worried','心配','しんぱい','걱정이다','😟'),A('happy','幸せ','しあわせ','행복하다','😊'),
 A('impossible','無理','むり','무리다','⛔'),A('hard','大変','たいへん','힘들다·큰일이다','💦'),A('strong','得意','とくい','잘하다·자신 있다','🏅'),A('weak','苦手','にがて','잘 못하다·서투르다','😓'),
 A('pretty','','きれい','예쁘다·깨끗하다','✨'),A('nice','','すてき','멋지다','💐')
];
const expressions=[
 E('longTime','お'+R('久','ひさ')+'しぶりです','おひさしぶりです','오랜만입니다','오랜만에 만난 사람에게 하는 정중한 인사'),
 E('guide',R('案内','あんない'),'あんない','안내'),
 E('shoppingStreet',R('商店街','しょうてんがい'),'しょうてんがい','상점가'),
 E('smell','におい','におい','냄새·향기'),
 E('eel','うなぎ','うなぎ','장어'),
 E('looks','～そうです','そうです','~해 보입니다','눈으로 본 인상이나 겉모습을 말하는 추량 표현'),
 E('full','いっぱい','いっぱい','가득·많이','이번 단원에서는 잔의 수가 아니라 가득 찬 상태·많은 양을 뜻함'),
 E('thanksMeal','ごちそうさまでした','ごちそうさまでした','잘 먹었습니다','식사를 마친 뒤 하는 인사'),
 E('food',R('食','た')+'べ'+R('物','もの'),'たべもの','음식·먹을 것')
];
const expressionContexts=[
 {ko:'오랜만입니다.',jp:`<span class="blank">＿＿</span>。`,answers:['おひさしぶりです'],done:'お'+R('久','ひさ')+'しぶりです'},
 {ko:'오늘은 안내를 부탁드립니다.',jp:`${R('今日','きょう')}は <span class="blank">＿＿</span>。`,answers:['あんないをおねがいします'],done:R('案内','あんない')+'を お'+R('願','ねが')+'いします'},
 {ko:'아사쿠사의 상점가는 매우 유명합니다.',jp:`${R('浅草','あさくさ')}の <span class="blank">＿＿</span>は とても${R('有名','ゆうめい')}です。`,answers:['しょうてんがい'],done:R('商店街','しょうてんがい')},
 {ko:'좋은 냄새가 나네요.',jp:`いい <span class="blank">＿＿</span>ですね。`,answers:['におい'],done:'におい'},
 {ko:'저는 장어를 매우 좋아합니다.',jp:`わたしは <span class="blank">＿＿</span>が ${R('大好','だいす')}きです。`,answers:['うなぎ'],done:'うなぎ'},
 {ko:'맛있어 보이네요.',jp:`おいし<span class="blank">＿＿</span>ね。`,answers:['そうです'],done:'そうです'},
 {ko:'맛있는 것이 가득 있습니다.',jp:`おいしいものが <span class="blank">＿＿</span> あります。`,answers:['いっぱい'],done:'いっぱい'},
 {ko:'잘 먹었습니다.',jp:`<span class="blank">＿＿</span>。`,answers:['ごちそうさまでした'],done:'ごちそうさまでした'},
 {ko:'일본은 음식이 맛있네요.',jp:`${R('日本','にほん')}は <span class="blank">＿＿</span>が おいしいですね。`,answers:['たべもの'],done:R('食','た')+'べ'+R('物','もの')}
];
const byKey=k=>adjectives.find(a=>a.key===k);
const positive=a=>({present:a.reading+'です',past:a.reading+'でした'});
const negative=a=>({present:[a.reading+'じゃありません',a.reading+'ではありません'],past:[a.reading+'じゃありませんでした',a.reading+'ではありませんでした']});
const show=a=>a.display;

const nounExamples=[
 {adj:'famous',noun:R('観光地','かんこうち'),ko:'유명한 관광지'},
 {adj:'quiet',noun:'ところ',ko:'조용한 곳'},
 {adj:'kind',noun:R('店員','てんいん'),ko:'친절한 점원'},
 {adj:'convenient',noun:'ホテル',ko:'편리한 호텔'},
 {adj:'pretty',noun:R('部屋','へや'),ko:'깨끗한 방'},
 {adj:'lively',noun:R('町','まち'),ko:'번화한 거리'},
 {adj:'nice',noun:'レストラン',ko:'멋진 레스토랑'},
 {adj:'easy',noun:R('問題','もんだい'),ko:'간단한 문제'},
 {adj:'healthy',noun:R('学生','がくせい'),ko:'건강한 학생'},
 {adj:'free',noun:R('日','ひ'),ko:'한가한 날'},
 {adj:'happy',noun:R('生活','せいかつ'),ko:'행복한 생활'},
 {adj:'hard',noun:R('仕事','しごと'),ko:'힘든 일'},
 {adj:'inconvenient',noun:R('場所','ばしょ'),ko:'불편한 장소'},
 {adj:'strong',noun:R('科目','かもく'),ko:'잘하는 과목'},
 {adj:'weak',noun:R('料理','りょうり'),ko:'서투른 요리'},
 {adj:'worried',noun:R('問題','もんだい'),ko:'걱정되는 문제'}
];
const particleExamples=[
 {adj:'like',subject:R('本','ほん'),read:'ほん',ko:'책을 좋아합니다'},
 {adj:'dislike',subject:R('辛','から')+'いもの',read:'からいもの',ko:'매운 것을 싫어합니다'},
 {adj:'skillful',subject:R('日本語','にほんご'),read:'にほんご',ko:'일본어를 잘합니다'},
 {adj:'unskillful',subject:R('料理','りょうり'),read:'りょうり',ko:'요리를 잘 못합니다'},
 {adj:'strong',subject:'スポーツ',read:'すぽーつ',ko:'운동을 잘합니다'},
 {adj:'weak',subject:R('歌','うた'),read:'うた',ko:'노래를 잘 못합니다'},
 {adj:'like',subject:'うなぎ',read:'うなぎ',ko:'장어를 좋아합니다'},
 {adj:'dislike',subject:R('納豆','なっとう'),read:'なっとう',ko:'낫토를 싫어합니다'},
 {adj:'skillful',subject:R('絵','え'),read:'え',ko:'그림을 잘 그립니다'},
 {adj:'unskillful',subject:R('運転','うんてん'),read:'うんてん',ko:'운전을 잘 못합니다'},
 {adj:'strong',subject:R('数学','すうがく'),read:'すうがく',ko:'수학에 자신 있습니다'},
 {adj:'weak',subject:R('漢字','かんじ'),read:'かんじ',ko:'한자를 어려워합니다'}
];
const situations=[
 {subject:'このホテル',subjectRead:'このほてる',subjectKo:'이 호텔',adj:'famous'},
 {subject:R('私','わたし')+'の'+R('部屋','へや'),subjectRead:'わたしのへや',subjectKo:'제 방',adj:'pretty'},
 {subject:'あの'+R('店','みせ')+'の'+R('店員','てんいん'),subjectRead:'あのみせのてんいん',subjectKo:'저 가게의 점원',adj:'kind'},
 {subject:R('電車','でんしゃ')+'の'+R('乗','の')+'り'+R('換','か')+'え',subjectRead:'でんしゃののりかえ',subjectKo:'전철 환승',adj:'easy'},
 {subject:R('浅草','あさくさ')+'の'+R('商店街','しょうてんがい'),subjectRead:'あさくさのしょうてんがい',subjectKo:'아사쿠사의 상점가',adj:'famous'},
 {subject:'ここ',subjectRead:'ここ',subjectKo:'여기',adj:'quiet'},
 {subject:R('新宿','しんじゅく'),subjectRead:'しんじゅく',subjectKo:'신주쿠',adj:'lively'},
 {subject:'このコンビニ',subjectRead:'このこんびに',subjectKo:'이 편의점',adj:'convenient'},
 {subject:'この'+R('町','まち'),subjectRead:'このまち',subjectKo:'이 거리',adj:'quiet'},
 {subject:'あのレストラン',subjectRead:'あのれすとらん',subjectKo:'저 레스토랑',adj:'nice'},
 {subject:R('田中','たなか')+'さん',subjectRead:'たなかさん',subjectKo:'다나카 씨',adj:'healthy'},
 {subject:R('今日','きょう')+'の'+R('仕事','しごと'),subjectRead:'きょうのしごと',subjectKo:'오늘의 일',adj:'hard'},
 {subject:'このアプリ',subjectRead:'このあぷり',subjectKo:'이 앱',adj:'convenient'},
 {subject:'あの'+R('駅','えき'),subjectRead:'あのえき',subjectKo:'저 역',adj:'inconvenient'},
 {subject:R('週末','しゅうまつ'),subjectRead:'しゅうまつ',subjectKo:'주말',adj:'free'},
 {subject:R('家族','かぞく'),subjectRead:'かぞく',subjectKo:'가족',adj:'happy'},
 {subject:'この'+R('宿題','しゅくだい'),subjectRead:'このしゅくだい',subjectKo:'이 숙제',adj:'impossible'},
 {subject:R('旅行','りょこう')+'の'+R('計画','けいかく'),subjectRead:'りょこうのけいかく',subjectKo:'여행 계획',adj:'easy'},
 {subject:R('明日','あした')+'の'+R('試験','しけん'),subjectRead:'あしたのしけん',subjectKo:'내일 시험',adj:'worried'},
 {subject:'この'+R('公園','こうえん'),subjectRead:'このこうえん',subjectKo:'이 공원',adj:'pretty'}
];

const units=[
 {id:1,icon:'🧭',title:'새로운 표현 익히기',sub:'인사·거리·음식 표현과 추량의 そうだ',stages:['표현 보기','뜻 고르기','문맥 입력','そうだ 이해']},
 {id:2,icon:'🌱',title:'な형용사 익히기',sub:'후리가나·뜻·히라가나 입력으로 어휘 기억',stages:['단어 보기','뜻 고르기','히라가나 입력']},
 {id:3,icon:'🔄',title:'활용형 익히기',sub:'정중형·체언 연결형·が 조사까지 한 흐름으로',stages:['활용표','형태 고르기','블록 조립','문장 규칙','な 연결','が 연결']},
 {id:4,icon:'✍️',title:'종합 문장 연습',sub:'상황을 보고 완성 문장 입력',stages:['빈칸 입력','문장 입력']}
];
let unit=units[0],phase=0,index=0,selected=[],session={};
const recentKey='na-adjective-studio-recent-v1';
function signature(x){return x.key||[x.adj,x.subjectRead,x.read,x.ko].filter(Boolean).join('|')}
function pickFresh(pool,n,group,recent){const old=new Set(recent[group]||[]),fresh=shuffle(pool.filter(x=>!old.has(signature(x)))),used=shuffle(pool.filter(x=>old.has(signature(x)))),chosen=[...fresh,...used].slice(0,n);recent[group]=chosen.map(signature);return chosen}

function prepare(){
 let recent={};try{recent=JSON.parse(localStorage.getItem(recentKey)||'{}')}catch{}
 session={expressions:pickFresh(expressions,8,'expressions',recent),expressionContexts:pickFresh(expressionContexts,8,'expressionContexts',recent),vocab:pickFresh(adjectives,10,'vocab',recent),scenes:pickFresh(adjectives,8,'scenes',recent),forms:pickFresh(adjectives,8,'forms',recent),blocks:pickFresh(adjectives,8,'blocks',recent),nouns:pickFresh(nounExamples,8,'nouns',recent),particles:pickFresh(particleExamples,8,'particles',recent),situations:pickFresh(situations,12,'situations',recent)};
 localStorage.setItem(recentKey,JSON.stringify(recent));
}
function screen(id){document.querySelectorAll('.screen').forEach(x=>x.classList.toggle('active',x.id===id));scrollTo(0,0)}
$('#unitList').innerHTML=units.map(u=>`<button class="unit" data-id="${u.id}"><span class="num">0${u.id}</span><span class="copy"><strong>${u.icon} ${u.title}</strong><small>${u.sub}</small></span><i>›</i></button>`).join('');
document.querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>openUnit(+b.dataset.id));
$('#homeBtn').onclick=$('#backBtn').onclick=()=>screen('home');
function openUnit(id){unit=units.find(u=>u.id===id);phase=0;index=0;prepare();$('#badge').textContent=`0${id}`;$('#title').textContent=unit.title;$('#subtitle').textContent=unit.sub;screen('lesson');tabs();render()}
function tabs(){$('#tabs').innerHTML=unit.stages.map((s,i)=>`<button class="${i===phase?'active':''}" data-step="${i}">${i+1}. ${s}</button>`).join('');document.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>{phase=+b.dataset.step;index=0;tabs();render()})}
function panel(title,body,count=''){return `<section class="panel"><div class="panel-head"><h3>${title}</h3>${count?`<span class="count">${count}</span>`:''}</div>${body}</section>`}
function render(){selected=[];if(unit.id===1)return phase===0?expressionStage():phase===1?expressionMeaning():phase===2?expressionInput():souStage();if(unit.id===2)return phase===0?vocabStage():phase===1?meaningStage():readingInputStage();if(unit.id===3){if(phase===0)return formsStage();if(phase===1)return formChoice();if(phase===2)return blockStage();if(phase===3)return rulesStage();if(phase===4)return nounStage();return particleStage()}return phase===0?blankStage():fullStage()}

function expressionStage(){$('#content').innerHTML=panel('새로운 표현을 소리 내어 읽고 뜻을 확인하세요.',`<div class="vocab-grid">${expressions.map(e=>`<button class="vocab"><span class="jp">${e.display}</span><span class="ko">${e.ko}${e.note?`<br><small>${e.note}</small>`:''}</span></button>`).join('')}</div><div class="rule-list" style="margin-top:15px"><div class="rule"><strong>いっぱい</strong>는 여러 뜻이 있지만, 여기서는 “가득·많이”를 뜻합니다.<div class="formula">おいしいものが いっぱい あります。</div></div></div><div class="actions"><button class="primary" onclick="nextPhase()">뜻 고르기 →</button></div>`)}
function expressionMeaning(){const data=session.expressions,q=data[index],opts=shuffle([q,...pick(expressions.filter(e=>e.key!==q.key),3)]);choiceQuestion(data,`‘${q.ko}’에 해당하는 표현은?`,opts,q,e=>e.display,q.display)}
function expressionInput(){const data=session.expressionContexts,q=data[index];$('#content').innerHTML=panel('문맥에 맞는 새 표현을 입력하세요.',`<p class="translation">${q.ko}</p><div class="sentence">${q.jp}</div>${inputHtml('히라가나로 입력하세요')}<div id="done" class="sentence" hidden></div>`,`${index+1} / ${data.length}`);wireInput(q.answers,data,q.done)}
function souStage(){$('#content').innerHTML=panel('추량의 そうだ: 눈으로 보고 “~해 보인다”라고 말해요.',`<div class="rule-list"><div class="rule"><strong>뜻</strong><br>말하는 사람이 눈앞의 모습이나 겉으로 드러난 상태를 보고 판단할 때 씁니다.<div class="formula">この うなぎは おいしそうです。<br><small>이 장어는 맛있어 보입니다.</small></div></div><div class="rule"><strong>い형용사 접속</strong><br>마지막 <b>い</b>를 빼고 そうです를 붙입니다.<div class="formula">おいし<b>い</b> → おいしそうです<br>${R('辛','から')}<b>い</b> → ${R('辛','から')}そうです</div></div><div class="rule"><strong>な형용사 접속</strong><br>기본형의 <b>だ</b>를 빼고 そうです를 붙입니다.<div class="formula">${R('元気','げんき')}<b>だ</b> → ${R('元気','げんき')}そうです<br>${R('暇','ひま')}<b>だ</b> → ${R('暇','ひま')}そうです</div></div><div class="rule"><strong>의미 차이</strong><br><b>おいしいです</b>는 실제로 먹어 보고 “맛있습니다”, <b>おいしそうです</b>는 보기만 하고 “맛있어 보입니다”라는 뜻입니다.</div></div><div class="actions"><button class="primary" onclick="nextPhase()">새 표현 학습 마치기 →</button></div>`)}

function vocabStage(){$('#content').innerHTML=panel('기본형을 소리 내어 읽고 뜻을 확인하세요.',`<div class="vocab-grid">${adjectives.map(a=>`<button class="vocab"><span class="jp">${a.emoji} ${show(a)}だ</span><span class="ko">${a.ko}</span></button>`).join('')}</div><div class="actions"><button class="primary" onclick="nextPhase()">뜻 고르기 →</button></div>`)}
function meaningStage(){const data=session.vocab,q=data[index],opts=shuffle([q,...pick(adjectives.filter(a=>a.key!==q.key),3)]);choiceQuestion(data,`‘${q.ko}’에 해당하는 な형용사는?`,opts,q,a=>show(a),show(q))}
function readingInputStage(){const data=session.scenes,q=data[index];$('#content').innerHTML=panel('제시된 기본형을 히라가나로 입력하세요.',`<div class="prompt"><span class="scene">${q.emoji}</span><p>${show(q)}だ<br><small>${q.ko}</small></p></div>${inputHtml('기본형을 히라가나로 입력하세요')}<div id="done" class="sentence" hidden></div>`,`${index+1} / ${data.length}`);wireInput([q.reading+'だ'],data,`${show(q)}だ → ${q.reading}だ`,'읽기를 다시 확인하세요.')}

function formsStage(){const a=byKey('quiet');$('#content').innerHTML=panel('な형용사의 기본형·정중형·체언 연결형을 비교하세요.',`<div class="form-grid"><div class="form-card"><small>기본형</small><strong>${show(a)}だ</strong></div><div class="form-card"><small>정중한 현재 긍정</small><strong>${show(a)}です</strong></div><div class="form-card"><small>정중한 과거 긍정</small><strong>${show(a)}でした</strong></div><div class="form-card negative"><small>정중한 현재 부정 · 두 표현 모두 가능</small><strong class="dual"><span>${show(a)}じゃありません</span><span>${show(a)}ではありません</span></strong></div><div class="form-card negative"><small>정중한 과거 부정 · 두 표현 모두 가능</small><strong class="dual"><span>${show(a)}じゃありませんでした</span><span>${show(a)}ではありませんでした</span></strong></div><div class="form-card"><small>체언 연결형 · 명사 수식</small><strong>${show(a)}な＋${R('教室','きょうしつ')}</strong></div></div><div class="rule-list" style="margin-top:15px"><div class="rule"><strong>じゃ</strong>는 회화에서 자주 쓰이며, <strong>では</strong>는 더 격식을 갖춘 표현입니다. 이 앱에서는 둘 다 정답으로 인정합니다.</div><div class="rule">정중형에서는 기본형 끝 <b>だ</b>를 떼고 필요한 표현을 붙입니다. 체언(명사)을 꾸밀 때에는 <b>だ → な</b>로 바꿉니다.<div class="formula">静かだ → 静かです／静かな教室</div></div></div><div class="actions"><button class="primary" onclick="nextPhase()">형태 고르기 →</button></div>`)}
function formChoice(){const data=session.forms,q=data[index],kind=['present','past','presentNeg','pastNeg'][index%4],p=positive(q),n=negative(q);let valid,label;if(kind==='present'){valid=[p.present];label='정중한 현재 긍정'}else if(kind==='past'){valid=[p.past];label='정중한 과거 긍정'}else if(kind==='presentNeg'){valid=n.present;label='정중한 현재 부정'}else{valid=n.past;label='정중한 과거 부정'}const pool=[p.present,p.past,...n.present,...n.past],opts=shuffle([...valid,...pick(pool.filter(x=>!valid.includes(x)),4-valid.length)]);$('#content').innerHTML=panel('목표에 맞는 활용형을 고르세요.',`<div class="prompt"><span class="scene">${q.emoji}</span><p>${show(q)}だ<br><small>목표: ${label}</small></p></div><div class="choices">${opts.map(x=>`<button class="choice" data-good="${valid.includes(x)}">${x}</button>`).join('')}</div><p id="feedback" class="feedback"></p>`,`${index+1} / ${data.length}`);wireChoices(data,valid.join('／'))}
function blockStage(){const data=session.blocks,q=data[index],past=index%2===1,answers=past?[[show(q),'じゃありませんでした'],[show(q),'ではありませんでした'],[show(q),'じゃありません','でした'],[show(q),'ではありません','でした']]:[[show(q),'じゃありません'],[show(q),'ではありません']],bank=shuffle(past?[show(q),'じゃありません','ではありません','でした','じゃありませんでした','ではありませんでした','です']:[show(q),'じゃありません','ではありません','でした','です']);blockQuestion(data,`${q.ko.replace(/다$/,'지 않')}${past?'았습니다':'습니다'}`,answers,bank)}

function rulesStage(){$('#content').innerHTML=panel('문장 안에서 달라지는 두 규칙을 익히세요.',`<div class="rule-list"><div class="rule"><strong>① 명사를 꾸밀 때 な</strong><div class="formula">${R('有名','ゆうめい')}だ → ${R('有名','ゆうめい')}<span class="particle">な</span>${R('観光地','かんこうち')}</div>문장 끝에서는 な를 쓰지 않습니다: 有名です。</div><div class="rule"><strong>② 好きだ・嫌いだ 앞에는 왜 が가 올까요?</strong><div class="formula">${R('私','わたし')}<span class="topic">は</span> うなぎ<span class="particle">が</span> ${R('好','す')}きです。</div><b>好きだ・嫌いだ</b>는 ‘좋아하다·싫어하다’라는 동사가 아니라, 좋아하거나 싫어하는 상태를 나타내는 <b>な형용사 계열의 서술어</b>입니다. 따라서 초급 문형에서는 동사의 목적어를 나타내는 <b>を</b>가 아니라, 그 감정이 향하는 <b>대상</b>을 <b>が</b>로 표시합니다.<br><small>私は = ‘나는’이라는 화제 · うなぎが = ‘장어가/장어를’이라는 대상 · 好きです = ‘좋습니다/좋아합니다’</small></div><div class="rule"><strong>능력·능숙함도 같은 패턴</strong><div class="formula">${R('日本語','にほんご')}<span class="particle">が</span>${R('上手','じょうず')}です。</div>${R('上手','じょうず')}・${R('下手','へた')}・${R('得意','とくい')}・${R('苦手','にがて')}도 무엇을 잘하거나 어려워하는지 그 대상을 <b>が</b>로 나타냅니다.</div></div><table class="compare" style="margin-top:16px"><tr><th>문장 끝</th><td>ここは静かです。</td></tr><tr><th>명사 수식</th><td>静かなところです。</td></tr><tr><th>감정의 대상</th><td>うなぎが好きです。</td></tr><tr><th>능력의 대상</th><td>日本語が上手です。</td></tr></table><div class="actions"><button class="primary" onclick="nextPhase()">な 연결 →</button></div>`)}
function nounStage(){const data=session.nouns,q=data[index],a=byKey(q.adj),answer=[show(a),'な',q.noun],bank=shuffle([...answer,'の','が']);blockQuestion(data,q.ko,answer,bank)}
function particleStage(){const data=session.particles,q=data[index],a=byKey(q.adj),opts=['は','が','を','に'];$('#content').innerHTML=panel('빈칸에 알맞은 조사를 고르세요.',`<p class="translation">${q.ko}</p><div class="sentence">${q.subject}<span class="blank">＿＿</span>${show(a)}です。</div><div class="choices">${opts.map(x=>`<button class="choice" data-good="${x==='が'}">${x}</button>`).join('')}</div><p id="feedback" class="feedback"></p>`,`${index+1} / ${data.length}`);wireChoices(data,'が')}

function situationForms(q){const a=byKey(q.adj),p=positive(a),n=negative(a),mode=index%4;if(mode===0)return{label:'정중한 현재 긍정',answers:[`${q.subjectRead}は${p.present}`],done:`${q.subject}は${show(a)}です。`};if(mode===1)return{label:'정중한 과거 긍정',answers:[`${q.subjectRead}は${p.past}`],done:`${q.subject}は${show(a)}でした。`};if(mode===2)return{label:'정중한 현재 부정',answers:n.present.map(x=>`${q.subjectRead}は${x}`),done:`${q.subject}は${show(a)}じゃありません。<br><small>${show(a)}ではありません。도 정답입니다.</small>`};return{label:'정중한 과거 부정',answers:n.past.map(x=>`${q.subjectRead}は${x}`),done:`${q.subject}は${show(a)}じゃありませんでした。<br><small>${show(a)}ではありませんでした。도 정답입니다.</small>`}}
function koreanPrompt(q,mode){const labels=['정중한 현재 긍정','정중한 과거 긍정','정중한 현재 부정','정중한 과거 부정'];return`${q.subjectKo} · ${byKey(q.adj).ko} · ${labels[mode]}`}
function blankStage(){const data=session.situations,q=data[index],a=byKey(q.adj),p=positive(a),n=negative(a),mode=index%4,answers=mode===0?[p.present]:mode===1?[p.past]:mode===2?n.present:n.past,done=answers.map(x=>displayReading(a,x)).join('／');$('#content').innerHTML=panel('상황과 목표 형태에 맞게 빈칸을 입력하세요.',`<p class="translation">${koreanPrompt(q,mode)}</p><div class="sentence">${q.subject}は <span class="blank">＿＿</span>。</div>${inputHtml('활용형을 입력하세요')}<div id="done" class="sentence" hidden></div>`,`${index+1} / ${data.length}`);wireInput(answers,data,done)}
function fullStage(){const data=session.situations,q=data[index],f=situationForms(q),mode=index%4;$('#content').innerHTML=panel('한국어와 목표 형태를 보고 문장 전체를 입력하세요.',`<p class="translation">${koreanPrompt(q,mode)}<br><b>${f.label}</b></p>${inputHtml('문장 전체를 입력하세요')}<div id="done" class="sentence" hidden></div>`,`${index+1} / ${data.length}`);wireInput(f.answers,data,f.done)}
function displayReading(a,text){return text.replace(a.reading,show(a))}

function choiceQuestion(data,title,opts,q,render,answer){$('#content').innerHTML=panel('알맞은 단어를 고르세요.',`<div class="prompt"><p>${title}</p></div><div class="choices">${opts.map(x=>`<button class="choice" data-good="${x.key===q.key}">${render(x)}</button>`).join('')}</div><p id="feedback" class="feedback"></p>`,`${index+1} / ${data.length}`);wireChoices(data,answer)}
function blockQuestion(data,ko,answer,bank){selected=[];const hasAlternatives=Array.isArray(answer[0]),alternatives=hasAlternatives?answer:[answer];$('#content').innerHTML=panel('한국어 뜻에 맞게 블록을 조립하세요.',`<p class="translation">${ko}</p><div id="answer" class="answer-zone">블록을 차례로 선택하세요</div><div class="bank">${bank.map((x,i)=>`<button class="block" data-i="${i}">${x}</button>`).join('')}</div><p id="feedback" class="feedback"></p><div class="actions"><button id="undo" class="secondary">하나 되돌리기</button><button id="check" class="primary">정답 확인</button></div>`,`${index+1} / ${data.length}`);document.querySelectorAll('.block').forEach(b=>b.onclick=()=>{if(b.classList.contains('used'))return;b.classList.add('used');selected.push(b);showBlocks()});$('#undo').onclick=()=>{const b=selected.pop();if(b)b.classList.remove('used');showBlocks()};$('#check').onclick=()=>{const got=selected.map(b=>norm(strip(b.innerHTML))).join(''),correct=alternatives.map(parts=>parts.map(x=>norm(strip(x))).join(''));if(correct.includes(got)){feedback(hasAlternatives?'정답입니다. じゃ와 では 두 표현 모두 가능합니다.':'정답입니다. 완성된 표현을 소리 내어 읽어보세요.',true);showNext(data)}else feedback(hasAlternatives?'형태와 블록 순서를 다시 확인하세요. じゃ와 では 두 표현 모두 사용할 수 있습니다.':'형태와 블록 순서를 다시 확인하세요.',false)}}
function showBlocks(){$('#answer').innerHTML=selected.length?selected.map(b=>`<span class="block">${b.innerHTML}</span>`).join(''):'블록을 차례로 선택하세요'}
function wireChoices(data,answer){document.querySelectorAll('.choice').forEach(b=>b.onclick=()=>{const good=b.dataset.good==='true';document.querySelectorAll('.choice').forEach(x=>x.disabled=true);if(good){b.classList.add('correct');feedback('정답입니다. 표현을 소리 내어 읽어보세요.',true)}else{b.classList.add('wrong');document.querySelector('[data-good="true"]')?.classList.add('correct');feedback(`정답은 ${strip(answer)}입니다.`,false)}showNext(data)})}
function inputHtml(ph){return `<input id="typing" class="input" lang="ja" autocomplete="off" placeholder="${ph}"><p id="feedback" class="feedback"></p><div class="actions"><button id="checkInput" class="primary">입력 확인</button></div>`}
function wireInput(answers,data,done,error='な형용사의 형태와 문장 끝을 다시 확인하세요.'){const valid=(Array.isArray(answers)?answers:[answers]).map(norm),check=()=>{if(valid.includes(norm($('#typing').value))){feedback('정답입니다. 완성된 표현을 소리 내어 읽어보세요.',true);$('#typing').disabled=true;if($('#done')){$('#done').innerHTML=done;$('#done').hidden=false}showNext(data)}else feedback(error,false)};$('#checkInput').onclick=check;$('#typing').onkeydown=e=>{if(e.key==='Enter')check()};$('#typing').focus()}
function strip(s){const d=document.createElement('div');d.innerHTML=s;d.querySelectorAll('rt').forEach(x=>x.remove());return d.textContent}
function feedback(t,g){$('#feedback').textContent=t;$('#feedback').className=`feedback ${g?'good':'bad'}`}
function showNext(data){if($('#nextBtn'))return;const label=index<data.length-1?'다음 문제 →':phase<unit.stages.length-1?'다음 단계 →':'학습 마치기';$('#feedback').insertAdjacentHTML('afterend',`<div class="actions"><button id="nextBtn" class="primary">${label}</button></div>`);$('#nextBtn').onclick=()=>advance(data)}
function advance(data){if(index<data.length-1){index++;render()}else nextPhase()}
function nextPhase(){if(phase<unit.stages.length-1){phase++;index=0;tabs();render();scrollTo(0,0)}else $('#content').innerHTML=panel('학습 완료!',`<div class="complete"><b>🎉</b><h3>${unit.title}를 마쳤습니다.</h3><p class="note">다시 시작하면 문제은행에서 다른 문제가 무작위로 출제됩니다.</p></div><div class="actions"><button class="primary" onclick="document.querySelector('#backBtn').click()">학습 선택으로</button></div>`)}
