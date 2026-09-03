const R=(k,r)=>`<ruby>${k}<rt>${r}</rt></ruby>`;
const units=[
 {id:1,title:'사람 소개',sub:'국적·직업·나이로 사람을 소개해요',icon:'👤',
  vocab:[['日本人','にほんじん','일본인'],['会社員','かいしゃいん','회사원'],['銀行員','ぎんこういん','은행원'],['先生','せんせい','선생님'],['学生','がくせい','학생'],['研究者','けんきゅうしゃ','연구원'],['医者','いしゃ','의사'],['何歳','なんさい','몇 살']],
  choice:[
   {scene:'🏦',q:'‘은행원’에 해당하는 단어는?',a:'銀行員',o:['会社員','先生','学生']},
   {scene:'🎓',q:'‘학생’에 해당하는 단어는?',a:'学生',o:['先生','医者','研究者']},
   {scene:'🎂❓',q:'나이를 물을 때 사용하는 말은?',a:'何歳',o:['何人','何時','何']},
   {scene:'🇯🇵',q:'‘일본인’에 해당하는 단어는?',a:'日本人',o:['銀行員','会社員','研究者']},
   {scene:'🔬',q:'‘연구원’에 해당하는 단어는?',a:'研究者',o:['医者','先生','学生']},
   {scene:'🩺',q:'‘의사’에 해당하는 단어는?',a:'医者',o:['会社員','銀行員','研究者']}
  ],
  blocks:[
   ['야마다 씨는 일본인입니다.',['山田さん','は','日本人','です'],['も','じゃありません']],
   ['와트 씨는 선생님이 아닙니다.',['ワットさん','は','先生','じゃありません'],['です','学生']],
   ['타와폰 씨는 학생입니까?',['タワポンさん','は','学生','です','か'],['会社員','も']],
   ['이 씨도 연구원입니다.',['イーさん','も','研究者','です'],['は','医者']],
   ['슈미트 씨는 회사원입니다.',['シュミットさん','は','会社員','です'],['日本人','じゃありません']],
   ['카리나 씨는 학생입니까?',['カリナさん','は','学生','です','か'],['先生','も']],
   ['구프타 씨도 회사원입니다.',['グプタさん','も','会社員','です'],['は','銀行員']],
   ['미라 씨는 의사가 아닙니다.',['ミラさん','は','医者','じゃありません'],['です','研究者']]
  ],
  typing:[
   ['야마다 씨는 은행원입니다.',`${R('山田','やまだ')}さんは <span class="blank">＿＿</span> です。`,'ぎんこういん',`${R('銀行員','ぎんこういん')}`],
   ['미라 씨는 의사가 아닙니다.','ミラさんは <span class="blank">＿＿</span> じゃありません。','いしゃ',`${R('医者','いしゃ')}`],
   ['와트 씨는 몇 살입니까?','ワットさんは <span class="blank">＿＿</span> ですか。','なんさい',`${R('何歳','なんさい')}`],
   ['타와폰 씨는 학생입니다.','タワポンさんは <span class="blank">＿＿</span> です。','がくせい',`${R('学生','がくせい')}`],
   ['이 씨는 연구원입니까?','イーさんは <span class="blank">＿＿</span> ですか。','けんきゅうしゃ',`${R('研究者','けんきゅうしゃ')}`],
   ['슈미트 씨는 회사원이 아닙니다.','シュミットさんは <span class="blank">＿＿</span> じゃありません。','かいしゃいん',`${R('会社員','かいしゃいん')}`]
  ],
  full:[
   {ko:'저는 회사원입니다.',a:['わたしはかいしゃいんです','私は会社員です'],done:`わたしは ${R('会社員','かいしゃいん')}です。`},
   {ko:'야마다 씨는 학생이 아닙니다.',a:['やまださんはがくせいじゃありません','山田さんは学生じゃありません'],done:`${R('山田','やまだ')}さんは ${R('学生','がくせい')}じゃありません。`},
   {ko:'카리나 씨는 연구원입니까?',a:['カリナさんはけんきゅうしゃですか','カリナさんは研究者ですか'],done:`カリナさんは ${R('研究者','けんきゅうしゃ')}ですか。`},
   {ko:'구프타 씨도 회사원입니다.',a:['グプタさんもかいしゃいんです','グプタさんも会社員です'],done:`グプタさんも ${R('会社員','かいしゃいん')}です。`}
  ]},
 {id:2,title:'사물 확인',sub:'이것·그것·저것을 묻고 확인해요',icon:'🎒',
  vocab:[['本','ほん','책'],['雑誌','ざっし','잡지'],['辞書','じしょ','사전'],['手帳','てちょう','수첩'],['時計','とけい','시계'],['鉛筆','えんぴつ','연필'],['傘','かさ','우산'],['何','なん','무엇'],['誰','だれ','누구']],
  choice:[
   {scene:'📕',q:'‘책’에 해당하는 단어는?',a:'本',o:['雑誌','辞書','手帳']},
   {scene:'⌚',q:'‘시계’에 해당하는 단어는?',a:'時計',o:['鉛筆','傘','本']},
   {scene:'❓📦',q:'“이것은 무엇입니까?”의 ‘무엇’은?',a:'何',o:['誰','どこ','どちら']},
   {scene:'👤❓',q:'“누구의 가방입니까?”의 ‘누구’는?',a:'誰',o:['何','どこ','何歳']},
   {scene:'📰',q:'‘잡지’에 해당하는 단어는?',a:'雑誌',o:['本','辞書','手帳']},
   {scene:'☂️',q:'‘우산’에 해당하는 단어는?',a:'傘',o:['鉛筆','時計','雑誌']}
  ],
  blocks:[
   ['이것은 잡지입니다.',['これ','は','雑誌','です'],['それ','本']],
   ['그것은 수첩입니까?',['それ','は','手帳','です','か'],['これ','時計']],
   ['저것은 무엇입니까?',['あれ','は','何','です','か'],['誰','これ']],
   ['이것은 누구의 우산입니까?',['これ','は','誰','の','傘','です','か'],['何','本']],
   ['그것은 사전입니다.',['それ','は','辞書','です'],['これ','雑誌']],
   ['저것은 시계가 아닙니다.',['あれ','は','時計','じゃありません'],['です','手帳']],
   ['이것은 연필입니까?',['これ','は','鉛筆','です','か'],['傘','それ']],
   ['그것은 누구의 책입니까?',['それ','は','誰','の','本','です','か'],['何','辞書']]
  ],
  typing:[
   ['이것은 사전입니다.','これは <span class="blank">＿＿</span> です。','じしょ',`${R('辞書','じしょ')}`],
   ['그것은 연필입니까?','それは <span class="blank">＿＿</span> ですか。','えんぴつ',`${R('鉛筆','えんぴつ')}`],
   ['이것은 무엇입니까?','これは <span class="blank">＿＿</span> ですか。','なん',`${R('何','なん')}`],
   ['저것은 잡지입니다.','あれは <span class="blank">＿＿</span> です。','ざっし',`${R('雑誌','ざっし')}`],
   ['이것은 누구의 수첩입니까?','これは <span class="blank">＿＿</span> の手帳ですか。','だれ',`${R('誰','だれ')}`],
   ['그것은 우산이 아닙니다.','それは <span class="blank">＿＿</span> じゃありません。','かさ',`${R('傘','かさ')}`]
  ],
  full:[
   {ko:'이것은 잡지입니까?',a:['これはざっしですか','これは雑誌ですか'],done:`これは ${R('雑誌','ざっし')}ですか。`},
   {ko:'저것은 누구의 가방입니까?',a:['あれはだれのかばんですか','あれは誰のかばんですか'],done:`あれは ${R('誰','だれ')}のかばんですか。`},
   {ko:'그것은 사전입니다.',a:['それはじしょです','それは辞書です'],done:`それは ${R('辞書','じしょ')}です。`},
   {ko:'이것은 연필이 아닙니다.',a:['これはえんぴつじゃありません','これは鉛筆じゃありません'],done:`これは ${R('鉛筆','えんぴつ')}じゃありません。`}
  ]},
 {id:3,title:'장소와 소속',sub:'장소·나라·회사·대학교를 확인해요',icon:'🗺️',
  vocab:[['食堂','しょくどう','식당'],['事務室','じむしつ','사무실'],['会議室','かいぎしつ','회의실'],['自動販売機','じどうはんばいき','자동판매기'],['会社','かいしゃ','회사'],['大学','だいがく','대학교'],['国','くに','나라'],['韓国','かんこく','한국'],['日本','にほん','일본']],
  choice:[
   {scene:'🍽️',q:'‘식당’에 해당하는 단어는?',a:'食堂',o:['会議室','事務室','大学']},
   {scene:'🥤',q:'‘자동판매기’에 해당하는 단어는?',a:'自動販売機',o:['会社','会議室','食堂']},
   {scene:'🏢',q:'‘회사’에 해당하는 단어는?',a:'会社',o:['大学','国','事務室']},
   {scene:'🎓🏫',q:'‘대학교’에 해당하는 단어는?',a:'大学',o:['会社','会議室','日本']},
   {scene:'👥🏢',q:'‘회의실’에 해당하는 단어는?',a:'会議室',o:['事務室','食堂','会社']},
   {scene:'🌏',q:'‘나라’에 해당하는 단어는?',a:'国',o:['日本','大学','会社']}
  ],
  blocks:[
   ['여기는 식당입니다.',['ここ','は','食堂','です'],['そこ','会議室']],
   ['회의실은 어디입니까?',['会議室','は','どこ','です','か'],['ここ','会社']],
   ['자동판매기는 저기입니다.',['自動販売機','は','あそこ','です'],['どこ','こちら']],
   ['산토스 씨의 나라는 브라질입니다.',['サントスさん','の','国','は','ブラジル','です'],['会社','日本']],
   ['사무실은 여기입니다.',['事務室','は','ここ','です'],['どこ','食堂']],
   ['대학교는 어디입니까?',['大学','は','どこ','です','か'],['会社','あそこ']],
   ['저기는 회의실이 아닙니다.',['あそこ','は','会議室','じゃありません'],['です','食堂']],
   ['이것은 한국의 가방입니다.',['これ','は','韓国','の','かばん','です'],['日本','どこ']]
  ],
  typing:[
   ['여기는 사무실입니다.','ここは <span class="blank">＿＿</span> です。','じむしつ',`${R('事務室','じむしつ')}`],
   ['회의실은 어디입니까?','<span class="blank">＿＿</span> は どこですか。','かいぎしつ',`${R('会議室','かいぎしつ')}`],
   ['이것은 어느 나라의 가방입니까?','これは どこの <span class="blank">＿＿</span> ですか。','かばん','かばん'],
   ['저기는 식당입니다.','あそこは <span class="blank">＿＿</span> です。','しょくどう',`${R('食堂','しょくどう')}`],
   ['대학교는 어디입니까?','<span class="blank">＿＿</span> は どこですか。','だいがく',`${R('大学','だいがく')}`],
   ['자동판매기는 여기입니다.','<span class="blank">＿＿</span> は ここです。','じどうはんばいき',`${R('自動販売機','じどうはんばいき')}`]
  ],
  full:[
   {ko:'여기는 회의실입니다.',a:['ここはかいぎしつです','ここは会議室です'],done:`ここは ${R('会議室','かいぎしつ')}です。`},
   {ko:'자동판매기는 어디입니까?',a:['じどうはんばいきはどこですか','自動販売機はどこですか'],done:`${R('自動販売機','じどうはんばいき')}は どこですか。`},
   {ko:'저기는 식당입니다.',a:['あそこはしょくどうです','あそこは食堂です'],done:`あそこは ${R('食堂','しょくどう')}です。`},
   {ko:'대학교는 어디입니까?',a:['だいがくはどこですか','大学はどこですか'],done:`${R('大学','だいがく')}は どこですか。`}
  ]},
 {id:4,title:'문형복습하기',sub:'1~3단원의 문형을 섞어서 종합 복습해요',icon:'✍️',reviewOnly:true,
  vocab:[
   ['これ','','이것(말하는 사람 가까이)'],['それ','','그것(듣는 사람 가까이)'],['あれ','','저것(두 사람에게서 멀리)'],
   ['ここ','','여기'],['そこ','','거기'],['あそこ','','저기'],['こちら','','이쪽·이분(정중한 표현)'],['どちら','','어느 쪽·어느 분'],
   ['誰','だれ','누구'],['方','かた','분·사람(정중한 말)'],['どなた','','어느 분·누구(だれ의 정중한 표현)'],
   ['も','','조사: ～도'],['の','','조사: ～의, 소유·소속을 연결']
  ],
  blocks:[
   ['저는 회사원입니다.',['わたし','は','会社員','です'],['学生','じゃありません']],
   ['와트 씨는 선생님이 아닙니다.',['ワットさん','は','先生','じゃありません'],['です','会社員']],
   ['타와폰 씨도 학생입니까?',['タワポンさん','も','学生','です','か'],['は','先生']],
   ['저분은 어느 분입니까?',['あの','方','は','どなた','です','か'],['誰','何']],
   ['이것은 무엇입니까?',['これ','は','何','です','か'],['誰','あれ']],
   ['저것은 누구의 우산입니까?',['あれ','は','誰','の','傘','です','か'],['何','これ']],
   ['회의실은 어디입니까?',['会議室','は','どこ','です','か'],['ここ','食堂']],
   [`これは ${R('本','ほん')}ですか。<br><small>긍정: 네, 책입니다.</small>`,['はい','本','です'],['いいえ','雑誌']],
   [`これは ${R('手帳','てちょう')}ですか。<br><small>부정: 아니요, 잡지입니다.</small>`,['いいえ','雑誌','です'],['はい','手帳']],
   [`これは ${R('時計','とけい')}ですか。<br><small>긍정: 네, 시계입니다.</small>`,['はい','時計','です'],['いいえ','本']],
   ['ワットさんも イギリス人ですか。<br><small>부정: 아니요, 미국인입니다.</small>',['いいえ','アメリカ人','です'],['はい','イギリス人']],
   ['이 씨는 연구원입니다.',['イーさん','は','研究者','です'],['医者','じゃありません']],
   ['그분도 의사입니까?',['その','方','も','医者','です','か'],['は','研究者']],
   ['이것은 사전이 아닙니다.',['これ','は','辞書','じゃありません'],['です','雑誌']],
   ['저것은 시계입니까?',['あれ','は','時計','です','か'],['これ','手帳']],
   ['여기는 회의실이 아닙니다.',['ここ','は','会議室','じゃありません'],['です','事務室']],
   ['대학교는 어디입니까?',['大学','は','どこ','です','か'],['会社','あそこ']]
  ],
  typing:[
   ['이것은 잡지입니다.',`<span class="blank">＿＿</span> は ${R('雑誌','ざっし')}です。`,'これ','これ'],
   ['여기는 사무실입니다.',`<span class="blank">＿＿</span> は ${R('事務室','じむしつ')}です。`,'ここ','ここ'],
   ['저분은 어느 분입니까?',`あの${R('方','かた')}は <span class="blank">＿＿</span> ですか。`,'どなた','どなた'],
   ['산토스 씨도 회사원입니다.',`サントスさん <span class="blank">＿＿</span> ${R('会社員','かいしゃいん')}です。`,'も','も'],
   ['자동판매기는 저기입니다.',`${R('自動販売機','じどうはんばいき')}は <span class="blank">＿＿</span> です。`,'あそこ','あそこ'],
   ['출구는 어느 쪽입니까?',`${R('出口','でぐち')}は <span class="blank">＿＿</span> ですか。`,'どちら','どちら'],
   ['야마다 씨는 은행원입니다.',`${R('山田','やまだ')}さんは <span class="blank">＿＿</span> です。`,'ぎんこういん',`${R('銀行員','ぎんこういん')}`],
   ['그것은 수첩입니다.',`<span class="blank">＿＿</span> は ${R('手帳','てちょう')}です。`,'それ','それ'],
   ['저기는 식당입니다.',`<span class="blank">＿＿</span> は ${R('食堂','しょくどう')}です。`,'あそこ','あそこ'],
   ['이쪽은 회사입니다.',`<span class="blank">＿＿</span> は ${R('会社','かいしゃ')}です。`,'こちら','こちら'],
   ['대학교는 어느 쪽입니까?',`${R('大学','だいがく')}は <span class="blank">＿＿</span> ですか。`,'どちら','どちら'],
   ['이것도 사전입니다.',`これ <span class="blank">＿＿</span> ${R('辞書','じしょ')}です。`,'も','も'],
   ['이것은 누구의 책입니까?',`これは <span class="blank">＿＿</span> の${R('本','ほん')}ですか。`,'だれ',`${R('誰','だれ')}`]
  ],
  full:[
   {ko:'타와폰 씨는 학생이 아닙니다.',a:['タワポンさんはがくせいじゃありません','タワポンさんは学生じゃありません'],done:`タワポンさんは ${R('学生','がくせい')}じゃありません。`},
   {ko:'자동판매기는 저기입니다.',a:['じどうはんばいきはあそこです','自動販売機はあそこです'],done:`${R('自動販売機','じどうはんばいき')}は あそこです。`},
   {ko:'이것은 사전입니다.',a:['これはじしょです','これは辞書です'],done:`これは ${R('辞書','じしょ')}です。`},
   {ko:'저기는 식당입니다.',a:['あそこはしょくどうです','あそこは食堂です'],done:`あそこは ${R('食堂','しょくどう')}です。`},
   {ko:'산토스 씨도 회사원입니다.',a:['サントスさんもかいしゃいんです','サントスさんも会社員です'],done:`サントスさんも ${R('会社員','かいしゃいん')}です。`},
   {ko:'저분은 어느 분입니까?',a:['あのかたはどなたですか','あの方はどなたですか'],done:`あの${R('方','かた')}は どなたですか。`}
  ]}
];
const readings={日本人:'にほんじん',会社員:'かいしゃいん',銀行員:'ぎんこういん',先生:'せんせい',学生:'がくせい',研究者:'けんきゅうしゃ',医者:'いしゃ',何歳:'なんさい',何人:'なんにん',何時:'なんじ',本:'ほん',雑誌:'ざっし',辞書:'じしょ',手帳:'てちょう',時計:'とけい',鉛筆:'えんぴつ',傘:'かさ',何:'なん',誰:'だれ',方:'かた',食堂:'しょくどう',事務室:'じむしつ',会議室:'かいぎしつ',自動販売機:'じどうはんばいき',会社:'かいしゃ',大学:'だいがく',国:'くに',韓国:'かんこく',日本:'にほん',アメリカ人:'アメリカじん',イギリス人:'イギリスじん','山田さん':'やまだ'};
let unit=units[0],phase=0,index=0,selected=[];
const $=s=>document.querySelector(s),shuffle=a=>[...a].sort(()=>Math.random()-.5),norm=s=>s.normalize('NFKC').replace(/[\s。.!！?？]/g,'');
function prepareSession(){units.forEach(u=>{if(u.choice)u.choice=shuffle(u.choice);if(u.blocks)u.blocks=shuffle(u.blocks);if(u.typing)u.typing=shuffle(u.typing);if(u.full)u.full=shuffle(u.full);if(!u.reviewOnly){u.choice=u.choice.slice(0,4);u.blocks=u.blocks.slice(0,4);u.typing=u.typing.slice(0,3);u.full=u.full.slice(0,2)}});const review=units.find(u=>u.reviewOnly);review.blocks=review.blocks.slice(0,11);review.typing=review.typing.slice(0,7);review.full=review.full.slice(0,2)}
prepareSession();
function shown(x){if(x==='山田さん')return `${R('山田','やまだ')}さん`;return readings[x]?R(x,readings[x]):x}
function blockClass(x){return ['は','も','の','か'].includes(x)?'particle':['です','じゃありません'].includes(x)?'ending':''}
function screen(s){document.querySelectorAll('.screen').forEach(x=>x.classList.toggle('active',x.id===s));scrollTo(0,0)}
$('#unitList').innerHTML=units.map(u=>`<button class="unit" data-id="${u.id}"><span class="num">0${u.id}</span><span class="copy"><strong>${u.icon} ${u.title}</strong><small>${u.sub}</small></span><i>›</i></button>`).join('');
document.querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>openUnit(+b.dataset.id));$('#homeBtn').onclick=$('#backBtn').onclick=()=>screen('home');
function openUnit(id){unit=units.find(u=>u.id===id);phase=0;index=0;$('#badge').textContent=`0${id}`;$('#title').textContent=unit.title;$('#subtitle').textContent=unit.sub;screen('lesson');tabs();render()}
function stageList(){return unit.reviewOnly?[[0,'어휘 익히기'],[2,'블록 조립하기'],[3,'빈칸 채우기'],[4,'문장 입력하기']]:[[0,'단어 익히기'],[1,'뜻 고르기'],[2,'블록 조립하기'],[3,'빈칸 채우기'],[4,'문장 입력하기']]}
function tabs(){const stages=stageList();$('#tabs').innerHTML=stages.map(([value,name],i)=>`<button class="${value===phase?'active':''}" data-step="${value}">${i+1}. ${name}</button>`).join('');document.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>{phase=+b.dataset.step;index=0;tabs();render()})}
function panel(title,body,count=''){return `<section class="panel"><div class="panel-head"><h3>${title}</h3>${count?`<span class="count">${count}</span>`:''}</div>${body}</section>`}
function render(){selected=[];if(phase===0)return vocab();if(phase===1)return choice();if(phase===2)return blocks();if(phase===3)return typing();fullSentence()}
function vocab(){const note=unit.reviewOnly?'<b>方（かた）</b>는 사람을 정중하게 나타내며, <b>どなた</b>는 だれ보다 정중합니다. 조사 <b>も</b>는 ‘～도’, <b>の</b>는 ‘～의’로 소유나 소속을 연결합니다.':'카드를 하나씩 소리 내어 읽어보세요. 다음 단계에서 같은 단어의 뜻을 고르게 됩니다.';const next=unit.reviewOnly?'블록 조립하기 →':'뜻 고르기 →';$('#content').innerHTML=panel('먼저 단어와 한국어 뜻을 확인하세요.',`<div class="vocab-grid">${unit.vocab.map(([k,r,ko])=>`<button class="vocab"><span class="jp">${r?R(k,r):k}</span><span class="ko">${ko}</span></button>`).join('')}</div><p class="note">${note}</p><div class="actions"><button class="primary" onclick="nextPhase()">${next}</button></div>`)}
function choice(){const q=unit.choice[index],opts=shuffle([q.a,...q.o]);$('#content').innerHTML=panel('한국어 뜻에 맞는 단어를 고르세요.',`<div class="prompt"><span>${q.scene}</span><p>${q.q}</p></div><div class="choices">${opts.map(x=>`<button class="choice" data-value="${x}">${shown(x)}</button>`).join('')}</div><p id="feedback" class="feedback"></p>`,`${index+1} / ${unit.choice.length}`);document.querySelectorAll('.choice').forEach(b=>b.onclick=()=>checkChoice(b,q))}
function checkChoice(b,q){document.querySelectorAll('.choice').forEach(x=>x.disabled=true);if(b.dataset.value===q.a){b.classList.add('correct');feedback('정답입니다! 일본어도 소리 내어 읽어보세요.',true);setTimeout(advance,700)}else{b.classList.add('wrong');document.querySelector(`[data-value="${q.a}"]`)?.classList.add('correct');feedback(`정답은 ${q.a}입니다.`,false);setTimeout(advance,1100)}}
function blocks(){const [ko,answer,wrong]=unit.blocks[index],bank=shuffle([...answer,...wrong]);selected=[];$('#content').innerHTML=panel('한국어에 맞게 문장을 조립하세요.',`<div class="prompt"><p>${ko}</p></div><div id="answer" class="answer-zone">블록을 차례로 선택하세요</div><div class="bank">${bank.map((x,i)=>`<button class="block ${blockClass(x)}" data-bank="${i}" data-value="${x}">${shown(x)}</button>`).join('')}</div><p id="feedback" class="feedback"></p><div class="actions"><button class="secondary" onclick="undo()">하나 되돌리기</button><button class="primary" onclick="checkBlocks()">정답 확인</button></div>`,`${index+1} / ${unit.blocks.length}`);document.querySelectorAll('[data-bank]').forEach(b=>b.onclick=()=>{if(b.classList.contains('used'))return;b.classList.add('used');selected.push({id:b.dataset.bank,v:b.dataset.value});showAnswer()})}
function showAnswer(){$('#answer').innerHTML=selected.length?selected.map(x=>`<span class="block ${blockClass(x.v)}">${shown(x.v)}</span>`).join(''):'블록을 차례로 선택하세요'}function undo(){const x=selected.pop();if(x)document.querySelector(`[data-bank="${x.id}"]`)?.classList.remove('used');showAnswer()}
function checkBlocks(){const answer=unit.blocks[index][1];if(selected.map(x=>x.v).join('|')===answer.join('|')){feedback('정답입니다! 완성된 문장을 읽어보세요.',true);setTimeout(advance,700)}else feedback('조사와 문장 끝 표현의 순서를 다시 확인하세요.',false)}
function typing(){const [ko,jp,a,word]=unit.typing[index];$('#content').innerHTML=panel('한국어 뜻을 보고 빈칸을 입력하세요.',`<p class="translation">${ko}</p><div class="sentence">${jp}</div><input id="typing" class="input" lang="ja" autocomplete="off" placeholder="히라가나로 입력하세요"><p id="feedback" class="feedback"></p><div class="actions"><button class="primary" onclick="checkTyping()">입력 확인</button></div>`,`${index+1} / ${unit.typing.length}`);$('#typing').onkeydown=e=>{if(e.key==='Enter')checkTyping()};$('#typing').focus()}
function checkTyping(){const [ko,jp,a,word]=unit.typing[index];if(norm($('#typing').value)===norm(a)){feedback(`정답입니다! ${word}`,true,true);setTimeout(advance,800)}else feedback('처음에 본 단어의 읽기를 떠올려 보세요.',false)}
function fullSentence(){const q=unit.full[index];$('#content').innerHTML=panel('한국어 문장을 일본어 문장 전체로 입력하세요.',`<p class="translation">${q.ko}</p><input id="typing" class="input" lang="ja" autocomplete="off" placeholder="일본어 문장 전체를 입력하세요"><p class="note">띄어쓰기와 문장부호는 채점에 영향을 주지 않습니다. 한자 또는 히라가나로 입력할 수 있습니다.</p><p id="feedback" class="feedback"></p><div id="fullAnswer" class="sentence" hidden></div><div class="actions"><button class="primary" onclick="checkFull()">문장 확인</button></div>`,`${index+1} / ${unit.full.length}`);$('#typing').onkeydown=e=>{if(e.key==='Enter')checkFull()};$('#typing').focus()}
function checkFull(){const q=unit.full[index],valid=q.a.map(norm);if(valid.includes(norm($('#typing').value))){feedback('정답입니다! 문장 전체를 소리 내어 읽어보세요.',true);$('#fullAnswer').innerHTML=q.done;$('#fullAnswer').hidden=false;setTimeout(advance,1000)}else feedback('주제 + 조사 + 설명 + 문장 끝 표현의 순서를 다시 확인하세요.',false)}
function feedback(t,good,html=false){const f=$('#feedback');if(html)f.innerHTML=t;else f.textContent=t;f.className=`feedback ${good?'good':'bad'}`}
function advance(){const data=phase===1?unit.choice:phase===2?unit.blocks:phase===3?unit.typing:unit.full;if(index<data.length-1){index++;render()}else nextPhase()}
function nextPhase(){const stages=stageList().map(x=>x[0]),position=stages.indexOf(phase);if(position<stages.length-1){phase=stages[position+1];index=0;tabs();render();scrollTo(0,0)}else $('#content').innerHTML=panel('단원 복습 완료!',`<p class="note">잘했습니다. 다른 단원으로 이동하거나 이 단원을 다시 풀어보세요.</p><div class="actions"><button class="primary" onclick="document.querySelector('#backBtn').click()">단원 선택으로</button></div>`)}
