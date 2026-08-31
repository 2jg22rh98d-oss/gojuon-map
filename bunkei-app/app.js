const ruby = (kanji, reading) => `<ruby>${kanji}<rt>${reading}</rt></ruby>`;

const units = [
  {
    id: 1,
    title: '～は～です',
    meaning: '～은/는 ～입니다',
    desc: '사람이나 사물에 관해 소개하고 설명해요',
    icon: '👋',
    learn: {
      notice: `<strong>주의!</strong> 조사로 사용하는 <b>は</b>는 글자로는 ‘は’라고 쓰지만 <b>わ(wa)</b>라고 발음합니다. 단어 속 は는 보통 ha, 조사 は는 wa로 읽어요.`,
      examples: [
        [`わたし<span class="focus">は</span> ${ruby('学生','がくせい')}です。`, '저는 학생입니다.'],
        [`これは ${ruby('本','ほん')}です。`, '이것은 책입니다.'],
        [`${ruby('目的','もくてき')}<span class="focus">は</span> ${ruby('観光','かんこう')}です。`, '목적은 관광입니다.']
      ]
    },
    blocks: [
      q('저는 한국인입니다.', ['わたし','は','韓国人','です'], ['日本人'], 'student'),
      q('여권은 이것입니다.', ['パスポート','は','これ','です'], ['それ'], 'book'),
      q('여기는 택시 승강장입니다.', ['ここ','は','タクシー乗り場','です'], ['あちら'], 'travel'),
      q('화장실은 저쪽입니다.', ['トイレ','は','あちら','です'], ['こちら'], 'travel'),
      q('여행 목적은 유학입니다.', ['旅行の目的','は','留学','です'], ['観光'], 'travel'),
      q('숙박은 신주쿠 호텔입니다.', ['宿泊','は','新宿ホテル','です'], ['パスポート'], 'travel')
    ],
    typing: [
      c('저는 한국인입니다.','かんこくじん','わたしは <span class="cloze-blank">＿＿＿</span> です。',['日本人','韓国人','学生','会社員'],`わたしは ${ruby('韓国人','かんこくじん')}です。`),
      c('여권은 이것입니다.','パスポート','<span class="cloze-blank">＿＿＿</span> は これです。',['パスポート','かばん','荷物','本'],'パスポートは これです。'),
      c('여기는 택시 승강장입니다.','タクシーのりば','ここは <span class="cloze-blank">＿＿＿</span> です。',['出口','バス停','タクシー乗り場','ホテル'],`ここは タクシー${ruby('乗り場','のりば')}です。`),
      c('화장실은 저쪽입니다.','あちら','トイレは <span class="cloze-blank">＿＿＿</span> です。',['こちら','そちら','あちら','どちら'],'トイレは あちらです。'),
      c('여행 목적은 유학입니다.','りゅうがく',`${ruby('旅行','りょこう')}の${ruby('目的','もくてき')}は <span class="cloze-blank">＿＿＿</span> です。`,['観光','留学','仕事','ビジネス'],`${ruby('旅行','りょこう')}の${ruby('目的','もくてき')}は ${ruby('留学','りゅうがく')}です。`)
    ],
    full: f('저는 한국인입니다.','わたしはかんこくじんです',`わたしは ${ruby('韓国人','かんこくじん')}です。`)
  },
  {
    id: 2,
    title: '～は～じゃありません',
    meaning: '～은/는 ～이(가) 아닙니다',
    desc: '잘못된 정보를 부정하고 바로잡아요',
    icon: '🙅',
    learn: {
      notice: `<strong>기억하세요!</strong> <b>じゃ</b>는 <b>では</b>가 줄어든 회화형입니다. ‘じゃありません’은 일상적인 정중 표현이고, ‘ではありません’은 조금 더 격식 있는 표현이에요.`,
      examples: [
        [`わたしは ${ruby('日本人','にほんじん')}<span class="focus">じゃありません</span>。`, '저는 일본인이 아닙니다.'],
        [`ユジンさんは ${ruby('会社員','かいしゃいん')}<span class="focus">じゃありません</span>。`, '유진 씨는 회사원이 아닙니다.'],
        [`これは パスポート<span class="focus">じゃありません</span>。`, '이것은 여권이 아닙니다.']
      ]
    },
    blocks: [
      q('그것은 일본 술이 아닙니다.', ['それ','は','日本のさけ','じゃありません'], ['です'], 'wallet'),
      q('숙박은 호텔이 아닙니다.', ['宿泊','は','ホテル','じゃありません'], ['新宿ホテル'], 'travel'),
      q('다나카 씨는 학생이 아닙니다.', ['田中さん','は','学生','じゃありません'], ['会社員'], 'worker'),
      q('저기는 출구가 아닙니다.', ['あそこ','は','出口','じゃありません'], ['どこ'], 'question'),
      q('그것은 유진 씨의 짐이 아닙니다.', ['それ','は','ユジンさんの荷物','じゃありません'], ['パスポート'], 'travel'),
      q('버스 정류장은 이쪽이 아닙니다.', ['バス停','は','こちら','じゃありません'], ['あちら'], 'far-place')
    ],
    typing: [
      c('숙박은 호텔이 아닙니다.','ホテル',`${ruby('宿泊','しゅくはく')}は <span class="cloze-blank">＿＿＿</span> じゃありません。`,['ホテル','会社','学校','空港'],`${ruby('宿泊','しゅくはく')}は ホテルじゃありません。`),
      c('다나카 씨는 학생이 아닙니다.','がくせい',`${ruby('田中','たなか')}さんは <span class="cloze-blank">＿＿＿</span> じゃありません。`,['学生','会社員','先生','日本人'],`${ruby('田中','たなか')}さんは ${ruby('学生','がくせい')}じゃありません。`),
      c('저기는 출구가 아닙니다.','でぐち','あそこは <span class="cloze-blank">＿＿＿</span> じゃありません。',['入口','出口','バス停','ホテル'],`あそこは ${ruby('出口','でぐち')}じゃありません。`),
      c('그것은 유진 씨의 짐이 아닙니다.','にもつ','それは ユジンさんの <span class="cloze-blank">＿＿＿</span> じゃありません。',['荷物','かばん','パスポート','さいふ'],`それは ユジンさんの${ruby('荷物','にもつ')}じゃありません。`),
      c('버스 정류장은 이쪽이 아닙니다.','こちら',`${ruby('バス停','ばすてい')}は <span class="cloze-blank">＿＿＿</span> じゃありません。`,['こちら','そちら','あちら','どちら'],`${ruby('バス停','ばすてい')}は こちらじゃありません。`)
    ],
    full: f('이것은 책이 아닙니다.','これはほんじゃありません',`これは ${ruby('本','ほん')}じゃありません。`)
  },
  {
    id: 3,
    title: '～は～ですか',
    meaning: '～은/는 ～입니까?',
    desc: '상대에게 정보를 묻고 확인해요',
    icon: '❓',
    learn: {
      notice: `<strong>기억하세요!</strong> 평서문 <b>～です</b>의 끝에 의문을 나타내는 조사 <b>か</b>를 붙이면 질문이 됩니다. 문장 끝을 크게 올리지 않아도 か가 질문임을 알려줘요.`,
      examples: [
        [`あなたは ${ruby('学生','がくせい')}です<span class="focus">か</span>。`, '당신은 학생입니까?'],
        [`${ruby('荷物','にもつ')}は これです<span class="focus">か</span>。`, '짐은 이것입니까?'],
        [`それは さいふです<span class="focus">か</span>。`, '그것은 지갑입니까?'],
        [`はい、そうです。／いいえ、ちがいます。`, '네, 그렇습니다. / 아니요, 그렇지 않습니다.']
      ]
    },
    blocks: [
      q('짐은 이것입니까?', ['荷物','は','これ','です','か'], ['それ'], 'travel'),
      q('이것은 술입니까?', ['これ','は','酒','です','か'], ['お茶'], 'travel'),
      q('다나카 씨는 회사원입니까?', ['田中さん','は','会社員','です','か'], ['学生'], 'worker'),
      q('그것은 한국 화장품입니까?', ['それ','は','韓国の化粧品','です','か'], ['日本のさけ'], 'wallet'),
      q('택시 승강장은 저쪽입니까?', ['タクシー乗り場','は','あちら','です','か'], ['こちら'], 'far-place'),
      q('여행 목적은 비즈니스입니까?', ['旅行の目的','は','ビジネス','です','か'], ['留学'], 'travel')
    ],
    typing: [
      c('짐은 이것입니까?','にもつ','<span class="cloze-blank">＿＿＿</span> は これですか。',['荷物','出口','本','目的'],`${ruby('荷物','にもつ')}は これですか。`),
      c('이것은 술입니까?','さけ','これは <span class="cloze-blank">＿＿＿</span> ですか。',['酒','お茶','化粧品','荷物'],`これは ${ruby('酒','さけ')}ですか。`),
      c('다나카 씨는 회사원입니까?','かいしゃいん',`${ruby('田中','たなか')}さんは <span class="cloze-blank">＿＿＿</span> ですか。`,['先生','学生','会社員','日本人'],`${ruby('田中','たなか')}さんは ${ruby('会社員','かいしゃいん')}ですか。`),
      c('그것은 한국 화장품입니까?','かんこくのけしょうひん','それは <span class="cloze-blank">＿＿＿</span> ですか。',['韓国の化粧品','日本のさけ','お茶','荷物'],`それは ${ruby('韓国','かんこく')}の${ruby('化粧品','けしょうひん')}ですか。`),
      c('택시 승강장은 저쪽입니까?','あちら',`タクシー${ruby('乗り場','のりば')}は <span class="cloze-blank">＿＿＿</span> ですか。`,['こちら','そちら','あちら','どちら'],`タクシー${ruby('乗り場','のりば')}は あちらですか。`),
      c('여행 목적은 비즈니스입니까?','ビジネス',`${ruby('旅行','りょこう')}の${ruby('目的','もくてき')}は <span class="cloze-blank">＿＿＿</span> ですか。`,['観光','留学','ビジネス','仕事'],`${ruby('旅行','りょこう')}の${ruby('目的','もくてき')}は ビジネスですか。`)
    ],
    full: f('당신은 학생입니까?','あなたはがくせいですか',`あなたは ${ruby('学生','がくせい')}ですか。`)
  },
  {
    id: 4,
    title: 'こ・そ・あ・ど',
    meaning: '이・그・저・어느',
    desc: '사물·장소·방향을 거리와 연결해요',
    icon: '🗺️',
    learn: { notice: `<strong>핵심!</strong> こ는 말하는 사람 가까이, そ는 듣는 사람 가까이, あ는 두 사람 모두에게서 멀리, ど는 모르는 대상이나 장소를 물을 때 사용합니다.`, examples: [] },
    blocks: [
      q('여기는 택시 승강장입니다.', ['ここ','は','タクシー乗り場','です'], ['そこ','あそこ'], 'near-me'),
      q('화장실은 저쪽입니다.', ['トイレ','は','あちら','です'], ['こちら','そちら'], 'far-place'),
      q('저기는 출구가 아닙니다.', ['あそこ','は','出口','じゃありません'], ['ここ','そこ'], 'question'),
      q('버스 정류장은 이쪽이 아닙니다.', ['バス停','は','こちら','じゃありません'], ['そちら','あちら'], 'near-me'),
      q('택시 승강장은 저쪽입니까?', ['タクシー乗り場','は','あちら','です','か'], ['こちら','どちら'], 'far-place'),
      q('고객님의 가방은 이것입니까?', ['お客様のかばん','は','これ','です','か'], ['それ','あれ'], 'near-you')
    ],
    typing: [
      c('여기는 택시 승강장입니다.','ここ','<span class="cloze-blank">＿＿＿</span> は タクシー乗り場です。',['ここ','そこ','あそこ','どこ'],`ここは タクシー${ruby('乗り場','のりば')}です。`),
      c('화장실은 저쪽입니다.','あちら','トイレは <span class="cloze-blank">＿＿＿</span> です。',['こちら','そちら','あちら','どちら'],'トイレは あちらです。'),
      c('저기는 출구가 아닙니다.','あそこ','<span class="cloze-blank">＿＿＿</span> は 出口じゃありません。',['ここ','そこ','あそこ','どこ'],`あそこは ${ruby('出口','でぐち')}じゃありません。`),
      c('버스 정류장은 이쪽이 아닙니다.','こちら',`${ruby('バス停','ばすてい')}は <span class="cloze-blank">＿＿＿</span> じゃありません。`,['こちら','そちら','あちら','どちら'],`${ruby('バス停','ばすてい')}は こちらじゃありません。`),
      c('고객님의 가방은 이것입니까?','これ',`${ruby('お客様','おきゃくさま')}のかばんは <span class="cloze-blank">＿＿＿</span> ですか。`,['これ','それ','あれ','どれ'],`${ruby('お客様','おきゃくさま')}のかばんは これですか。`)
    ],
    full: f('출구는 어디입니까?','でぐちはどこですか',`${ruby('出口','でぐち')}は どこですか。`)
  }
];

function q(ko, answer, distractors, scene) { return { ko, answer, distractors, scene }; }
function c(ko, answer, template, candidates, completed) { return { ko, answer, template, candidates, completed }; }
function f(ko, answer, completed) { return { ko, answer, completed }; }

const kanjiReadings = {
  '学生':['学生','がくせい'], '会社員':['会社員','かいしゃいん'], '本':['本','ほん'],
  '目的':['目的','もくてき'], '観光':['観光','かんこう'], '仕事':['仕事','しごと'],
  '先生':['先生','せんせい'],
  '日本人':['日本人','にほんじん'], '韓国人':['韓国人','かんこくじん'],
  '田中さん':['田中','たなか'], '出口':['出口','でぐち'], '入口':['入口','いりぐち'],
  '荷物':['荷物','にもつ'], 'バス停':['バス停','ばすてい'], '宿泊':['宿泊','しゅくはく'],
  '留学':['留学','りゅうがく'], '酒':['酒','さけ'], 'お茶':['お茶','おちゃ'],
  'タクシー乗り場':['タクシー乗り場','タクシーのりば'], '旅行の目的':['旅行の目的','りょこうのもくてき'],
  '新宿ホテル':['新宿ホテル','しんじゅくホテル'], '日本のさけ':['日本のさけ','にほんのさけ'],
  'ユジンさんの荷物':['ユジンさんの荷物','ユジンさんのにもつ'],
  '韓国の化粧品':['韓国の化粧品','かんこくのけしょうひん'],
  '化粧品':['化粧品','けしょうひん'], 'お客様のかばん':['お客様のかばん','おきゃくさまのかばん'],
  '空港':['空港','くうこう'], '学校':['学校','がっこう']
};

let currentUnit = units[0], phase = 'learn', blockIndex = 0, typingIndex = 0;
let selectedBlocks = [];
const $ = id => document.getElementById(id);

function displayToken(token) {
  const data = kanjiReadings[token];
  if (!data) return token;
  if (token === '田中さん') return `${ruby(data[0],data[1])}さん`;
  return ruby(data[0],data[1]);
}
function tokenClass(token) {
  if (token === 'は' || token === 'か') return 'particle';
  if (['です','じゃありません'].includes(token)) return 'ending';
  return '';
}
function shuffle(array) { return [...array].sort(() => Math.random() - .5); }

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(x => x.classList.toggle('active', x.id === name));
  window.scrollTo({top:0,behavior:'smooth'});
}

function renderHome() {
  const done = JSON.parse(localStorage.getItem('bunkei-complete') || '[]');
  $('unitList').innerHTML = units.map(unit => `<button class="unit-card ${done.includes(unit.id) ? 'done' : ''}" data-unit="${unit.id}">
    <span class="unit-num">${done.includes(unit.id) ? '✓' : `0${unit.id}`}</span>
    <span><strong>${unit.title}</strong><small>${unit.meaning} · ${unit.desc}</small></span><span class="arrow">›</span></button>`).join('');
  document.querySelectorAll('[data-unit]').forEach(button => button.onclick = () => openUnit(Number(button.dataset.unit)));
  $('progressText').textContent = `${done.length} / ${units.length} 완료`;
  $('progressFill').style.width = `${done.length / units.length * 100}%`;
}

function openUnit(id) {
  currentUnit = units.find(x => x.id === id);
  blockIndex = 0; typingIndex = 0; selectedBlocks = [];
  $('unitBadge').textContent = `${id}단원`;
  $('unitTitle').textContent = currentUnit.title;
  showScreen('lessonScreen');
  setPhase('learn');
}

function setPhase(next) {
  phase = next;
  document.querySelectorAll('.phase-tabs button').forEach(b => b.classList.toggle('active', b.dataset.phase === next));
  document.querySelectorAll('.phase').forEach(p => p.classList.toggle('active', p.id === `${next}Phase`));
  if (next === 'learn') renderLearn();
  if (next === 'blocks') { blockIndex = 0; renderBlockQuestion(); }
  if (next === 'typing') { typingIndex = 0; renderTypingQuestion(); }
  if (next === 'full') renderFullQuestion();
}

function renderLearn() {
  const u = currentUnit;
  let special = '';
  if (u.id === 4) special = `<div class="spatial-board"><div class="spatial-zone ko-zone"><strong>こ</strong><span>내 가까이</span></div><div class="spatial-zone so-zone"><strong>そ</strong><span>상대 가까이</span></div><div class="spatial-zone a-zone"><strong>あ</strong><span>둘에게서 멀리</span></div><div class="spatial-zone do-zone"><strong>ど</strong><span>모를 때 질문</span></div></div>
  <table class="koso-table"><tr><th>기능</th><th>こ</th><th>そ</th><th>あ</th><th>ど</th></tr><tr><td>사물</td><td>これ</td><td>それ</td><td>あれ</td><td>どれ</td></tr><tr><td>장소</td><td>ここ</td><td>そこ</td><td>あそこ</td><td>どこ</td></tr><tr><td>방향</td><td>こちら</td><td>そちら</td><td>あちら</td><td>どちら</td></tr><tr><td>명사 앞</td><td>この</td><td>その</td><td>あの</td><td>どの</td></tr></table>`;
  const formulaEnding = u.id === 1
    ? '<span class="grammar-block ending">です</span>'
    : u.id === 2
      ? '<span class="grammar-block ending">じゃありません</span>'
      : '<span class="grammar-block ending">です</span><span class="plus">+</span><span class="grammar-block particle">か</span>';
  $('learnPhase').innerHTML = `<div class="learn-wrap"><div class="meaning-card"><h2>${u.title}</h2><p>${u.meaning}</p></div>
    ${u.id < 4 ? `<div class="formula"><span class="grammar-block">A</span><span class="plus">+</span><span class="grammar-block particle">は</span><span class="plus">+</span><span class="grammar-block">B</span><span class="plus">+</span>${formulaEnding}</div>` : special}
    <div class="notice-card">${u.learn.notice}</div>
    <div class="example-list">${u.learn.examples.map(([jp,ko]) => `<div class="example"><div class="jp">${jp}</div><div class="ko">${ko}</div></div>`).join('')}</div>
    <div class="button-row" style="margin-top:22px"><button class="primary-button" onclick="setPhase('blocks')">블록 연습 시작 →</button></div></div>`;
}

function sceneHTML(scene) {
  const scenes = {
    student:'<div class="scene-object">🧑‍🎓<span class="scene-label">나</span></div>', book:'<div class="scene-object">📕<span class="scene-label">이것</span></div>', worker:'<div class="scene-object">🧑‍💼<span class="scene-label">회사원</span></div>', travel:'<div class="scene-object">🧳<span class="scene-label">관광</span></div>',
    korea:'<div class="scene-object">🧑<span class="scene-label">한국인</span></div><div>≠</div><div class="scene-object">🇯🇵<span class="scene-label">일본인</span></div>', wallet:'<div class="scene-object">👛<span class="scene-label">이것</span></div><div>≠</div><div>🛂</div>',
    'near-me':'<div class="scene-object">🧑<span class="scene-label">나</span></div><div class="scene-object">📕<span class="scene-label">가까이</span></div><div>　🧑</div>', 'near-you':'<div>🧑　</div><div class="scene-object">👜<span class="scene-label">상대 가까이</span></div><div class="scene-object">🧑<span class="scene-label">상대</span></div>',
    'far-place':'<div>🧑　🧑</div><div>······</div><div class="scene-object">🚏<span class="scene-label">멀리</span></div>', question:'<div class="scene-object">🚪<span class="scene-label">출구는?</span></div><div>❓</div>'
  };
  return scenes[scene] || '💬';
}

function renderBlockQuestion() {
  selectedBlocks = [];
  const item = currentUnit.blocks[blockIndex];
  $('blockCounter').textContent = `${blockIndex + 1} / ${currentUnit.blocks.length}`;
  $('koreanPrompt').textContent = item.ko;
  $('sceneVisual').innerHTML = sceneHTML(item.scene);
  $('blockFeedback').textContent = ''; $('blockFeedback').className = 'feedback';
  $('checkBlocks').textContent = '정답 확인'; $('checkBlocks').onclick = checkBlockAnswer;
  const bank = shuffle([...item.answer, ...item.distractors]).map((token,i) => ({token,id:i}));
  $('blockBank').innerHTML = bank.map(x => `<button class="sentence-block ${tokenClass(x.token)}" data-bank-id="${x.id}" data-token="${x.token}">${displayToken(x.token)}</button>`).join('');
  $('blockBank').querySelectorAll('button').forEach(b => b.onclick = () => { selectedBlocks.push({token:b.dataset.token,id:b.dataset.bankId}); b.classList.add('used'); renderAnswerZone(); });
  renderAnswerZone();
}

function renderAnswerZone() {
  $('answerZone').innerHTML = selectedBlocks.map(x => `<span class="sentence-block ${tokenClass(x.token)}">${displayToken(x.token)}</span>`).join('');
}
function undoBlock() {
  const last = selectedBlocks.pop(); if (!last) return;
  $('blockBank').querySelector(`[data-bank-id="${last.id}"]`)?.classList.remove('used'); renderAnswerZone();
}
function checkBlockAnswer() {
  const expected = currentUnit.blocks[blockIndex].answer;
  const correct = selectedBlocks.map(x=>x.token).join('|') === expected.join('|');
  if (!correct) { $('blockFeedback').textContent = '블록의 순서와 필요한 표현을 다시 살펴보세요.'; $('blockFeedback').className='feedback bad'; return; }
  $('blockFeedback').textContent = '정답입니다! 문장을 소리 내어 읽어보세요.'; $('blockFeedback').className='feedback good';
  $('checkBlocks').textContent = blockIndex === currentUnit.blocks.length - 1 ? '빈칸 입력으로 →' : '다음 문제 →';
  $('checkBlocks').onclick = () => { if (blockIndex < currentUnit.blocks.length-1) { blockIndex++; renderBlockQuestion(); } else setPhase('typing'); };
}

function renderTypingQuestion() {
  const item=currentUnit.typing[typingIndex];
  $('typingCounter').textContent=`${typingIndex+1} / ${currentUnit.typing.length}`;
  $('clozeKorean').textContent=item.ko;
  $('clozeSentence').innerHTML=item.template;
  $('candidateWords').innerHTML=item.candidates.map(word=>`<span class="candidate-word">${displayToken(word)}</span>`).join('');
  $('clozeInput').value='';
  $('typingFeedback').textContent=''; $('typingFeedback').className='feedback'; $('exampleAfterTyping').hidden=true;
  $('checkTyping').textContent='입력 확인'; $('checkTyping').onclick=checkTypingAnswer;
  setTimeout(()=>$('clozeInput').focus(),0);
}
function checkTypingAnswer() {
  const item=currentUnit.typing[typingIndex];
  if (normalize($('clozeInput').value) !== normalize(item.answer)) { $('typingFeedback').textContent='후보 어휘와 문장의 뜻을 다시 확인해 보세요.'; $('typingFeedback').className='feedback bad'; return; }
  $('typingFeedback').textContent='정답입니다! 완성된 문장도 읽어보세요.'; $('typingFeedback').className='feedback good';
  $('exampleAfterTyping').innerHTML=`<div class="jp">${item.completed}</div><div class="ko">${item.ko}</div>`; $('exampleAfterTyping').hidden=false;
  $('checkTyping').textContent=typingIndex===currentUnit.typing.length-1?'문장 전체 입력으로 →':'다음 문제 →';
  $('checkTyping').onclick=()=>{ if(typingIndex<currentUnit.typing.length-1){typingIndex++;renderTypingQuestion();}else setPhase('full'); };
}

function normalize(value) {
  return value.normalize('NFKC').replace(/[\s。．.!！?？]/g,'').trim();
}

function renderFullQuestion() {
  const item=currentUnit.full;
  $('fullKorean').textContent=item.ko;
  $('fullInput').value='';
  $('fullFeedback').textContent=''; $('fullFeedback').className='feedback';
  $('fullAnswer').hidden=true;
  $('checkFull').textContent='문장 확인'; $('checkFull').onclick=checkFullAnswer;
  setTimeout(()=>$('fullInput').focus(),0);
}

function checkFullAnswer() {
  const item=currentUnit.full;
  if (normalize($('fullInput').value) !== normalize(item.answer)) {
    $('fullFeedback').textContent='문형의 블록 순서를 떠올려 다시 입력해 보세요.';
    $('fullFeedback').className='feedback bad'; return;
  }
  $('fullFeedback').textContent='정답입니다! 처음부터 끝까지 문장을 완성했어요.';
  $('fullFeedback').className='feedback good';
  $('fullAnswer').innerHTML=`<div class="jp">${item.completed}</div><div class="ko">${item.ko}</div>`;
  $('fullAnswer').hidden=false;
  $('checkFull').textContent='단원 완료 ✓'; $('checkFull').onclick=completeUnit;
}
function completeUnit(){ const done=JSON.parse(localStorage.getItem('bunkei-complete')||'[]'); if(!done.includes(currentUnit.id))done.push(currentUnit.id);localStorage.setItem('bunkei-complete',JSON.stringify(done));showScreen('homeScreen');renderHome(); }

document.querySelectorAll('.phase-tabs button').forEach(b=>b.onclick=()=>setPhase(b.dataset.phase));
$('homeButton').onclick=()=>{showScreen('homeScreen');renderHome()}; $('backButton').onclick=()=>{showScreen('homeScreen');renderHome()};
$('undoBlock').onclick=undoBlock;
$('clozeInput').addEventListener('keydown',e=>{if(e.key==='Enter')checkTypingAnswer()});
$('fullInput').addEventListener('keydown',e=>{if(e.key==='Enter')checkFullAnswer()});
renderHome();
