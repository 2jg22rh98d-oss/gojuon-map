const kana = [
  { row: 'あ단', col: 'あ행', r: 0, c: 0, h: 'あ', k: 'ア', romaji: 'a' },
  { row: 'い단', col: 'あ행', r: 1, c: 0, h: 'い', k: 'イ', romaji: 'i' },
  { row: 'う단', col: 'あ행', r: 2, c: 0, h: 'う', k: 'ウ', romaji: 'u' },
  { row: 'え단', col: 'あ행', r: 3, c: 0, h: 'え', k: 'エ', romaji: 'e' },
  { row: 'お단', col: 'あ행', r: 4, c: 0, h: 'お', k: 'オ', romaji: 'o' },
  ...makeColumn(1, 'か행', ['か','き','く','け','こ'], ['カ','キ','ク','ケ','コ'], ['ka','ki','ku','ke','ko']),
  ...makeColumn(2, 'さ행', ['さ','し','す','せ','そ'], ['サ','シ','ス','セ','ソ'], ['sa','shi','su','se','so']),
  ...makeColumn(3, 'た행', ['た','ち','つ','て','と'], ['タ','チ','ツ','テ','ト'], ['ta','chi','tsu','te','to']),
  ...makeColumn(4, 'な행', ['な','に','ぬ','ね','の'], ['ナ','ニ','ヌ','ネ','ノ'], ['na','ni','nu','ne','no']),
  ...makeColumn(5, 'は행', ['は','ひ','ふ','へ','ほ'], ['ハ','ヒ','フ','ヘ','ホ'], ['ha','hi','fu','he','ho']),
  ...makeColumn(6, 'ま행', ['ま','み','む','め','も'], ['マ','ミ','ム','メ','モ'], ['ma','mi','mu','me','mo']),
  ...makeColumn(7, 'や행', ['や',null,'ゆ',null,'よ'], ['ヤ',null,'ユ',null,'ヨ'], ['ya',null,'yu',null,'yo']),
  ...makeColumn(8, 'ら행', ['ら','り','る','れ','ろ'], ['ラ','リ','ル','レ','ロ'], ['ra','ri','ru','re','ro']),
  ...makeColumn(9, 'わ행', ['わ',null,null,null,'を'], ['ワ',null,null,null,'ヲ'], ['wa',null,null,null,'wo']),
  { row: 'ん', col: 'わ행', r: 5, c: 9, h: 'ん', k: 'ン', romaji: 'n' }
];

function makeColumn(c, col, h, k, romaji) {
  const rows = ['あ단','い단','う단','え단','お단'];
  return h.map((char, r) => char ? ({ row: rows[r], col, r, c, h: char, k: k[r], romaji: romaji[r] }) : null).filter(Boolean);
}

const lessons = [
  { id: 1, title: '자리와 소리 익히기', desc: '문자가 빛나는 위치를 보며 발음을 들어요', icon: '👀' },
  { id: 2, title: '소리로 자리 찾기', desc: '발음을 듣고 자리를 찾은 뒤 필순대로 직접 써요', icon: '👂' },
  { id: 3, title: '문자 카드 놓기', desc: '문자 카드를 기억한 위치에 놓아요', icon: '✋' },
  { id: 4, title: '소리와 문자 연결하기', desc: '소리나 히라가나를 단서로 문자와 자리를 찾아요', icon: '🧩' }
];

let script = localStorage.getItem('gojuon-script') || 'hiragana';
let lessonId = 1;
let questionSet = [];
let questionIndex = 0;
let score = 0;
let attempts = 0;
let current = null;
let selectedCard = null;
let soundOn = localStorage.getItem('gojuon-sound') !== 'off';
let sequenceTimer = null;
let japaneseVoice = null;
let audioPlayer = null;

const $ = id => document.getElementById(id);
const screens = ['homeScreen', 'lessonScreen', 'resultScreen'];
const charOf = item => script === 'hiragana' ? item.h : item.k;

function showScreen(id) {
  if (id !== 'lessonScreen') hideStrokePractice();
  screens.forEach(name => $(name).classList.toggle('active', name === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderHome() {
  document.querySelectorAll('.script-card').forEach(button => button.classList.toggle('selected', button.dataset.script === script));
  $('lessonList').innerHTML = lessons.map(item => `
    <button class="lesson-card" data-lesson="${item.id}">
      <span class="lesson-number">${item.icon}</span>
      <span><strong>${item.id}단계 · ${item.title}</strong><small>${script === 'katakana' && item.id === 4 ? '히라가나를 보고 대응하는 가타카나를 놓아요' : item.desc}</small></span>
      <span class="lesson-arrow">›</span>
    </button>`).join('');
  document.querySelectorAll('.lesson-card').forEach(button => button.addEventListener('click', () => startLesson(Number(button.dataset.lesson))));
  updateProgress();
}

function renderBoard(mode = 'full') {
  const colNames = ['あ행','か행','さ행','た행','な행','は행','ま행','や행','ら행','わ행'];
  const rowNames = ['あ단','い단','う단','え단','お단'];
  const board = $('gojuonBoard');
  board.innerHTML = '<div class="cell header"></div>' + colNames.map(x => `<div class="cell header">${x}</div>`).join('');
  rowNames.forEach((row, r) => {
    board.insertAdjacentHTML('beforeend', `<div class="cell header">${row}</div>`);
    colNames.forEach((_, c) => {
      const item = kana.find(x => x.r === r && x.c === c);
      const className = !item ? 'cell empty-slot' : `cell kana-cell ${mode === 'quiz' ? 'playable target-empty' : ''} ${mode === 'drop' ? 'drop-target target-empty' : ''}`;
      const text = item && mode === 'full' ? charOf(item) : '';
      board.insertAdjacentHTML('beforeend', `<button class="${className}" ${item ? `data-romaji="${item.romaji}"` : 'disabled'}>${text}</button>`);
    });
  });
  const n = kana.find(x => x.romaji === 'n');
  board.insertAdjacentHTML('beforeend', `<div class="cell header">ん</div>${'<div class="cell empty-slot"></div>'.repeat(9)}<button class="cell kana-cell ${mode === 'quiz' ? 'playable target-empty' : ''} ${mode === 'drop' ? 'drop-target target-empty' : ''}" data-romaji="n">${mode === 'full' ? charOf(n) : ''}</button>`);
  board.querySelectorAll('.kana-cell').forEach(cell => cell.addEventListener('click', () => handleCell(cell)));
}

function loadJapaneseVoice() {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  japaneseVoice = voices.find(voice => /^ja[-_]/i.test(voice.lang))
    || voices.find(voice => /Japanese|日本/i.test(voice.name))
    || null;
  return japaneseVoice;
}

function speakWithBrowserVoice(item) {
  if (!('speechSynthesis' in window)) return false;
  const synth = window.speechSynthesis;
  synth.cancel();
  synth.resume();
  const utterance = new SpeechSynthesisUtterance(item.h);
  utterance.lang = 'ja-JP';
  utterance.rate = .72;
  utterance.pitch = 1;
  const voice = japaneseVoice || loadJapaneseVoice();
  if (voice) utterance.voice = voice;
  synth.speak(utterance);
  return true;
}

function speak(item) {
  if (!soundOn || !item) return false;
  if (audioPlayer) {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  }
  audioPlayer = new Audio(`assets/audio/${item.romaji}.wav`);
  audioPlayer.preload = 'auto';
  const playAttempt = audioPlayer.play();
  if (playAttempt?.catch) playAttempt.catch(() => speakWithBrowserVoice(item));
  return true;
}

function startLesson(id) {
  clearTimeout(sequenceTimer);
  hideStrokePractice();
  lessonId = id;
  score = 0;
  attempts = 0;
  questionIndex = 0;
  selectedCard = null;
  $('lessonBadge').textContent = `${script === 'hiragana' ? '히라가나' : '가타카나'} · ${id}단계`;
  $('lessonTitle').textContent = lessons[id - 1].title;
  $('scoreText').textContent = '정답 0';
  $('feedback').textContent = '';
  $('feedback').className = 'feedback';
  $('nextButton').hidden = true;
  $('playSequenceButton').hidden = id !== 1;
  $('promptCard').hidden = id === 1 || id === 3;
  $('cardArea').hidden = id < 3;
  showScreen('lessonScreen');

  if (id === 1) {
    $('questionProgress').textContent = '전체 46글자';
    $('instruction').textContent = '학습 시작을 누르면 문자가 차례로 빛나며 발음됩니다. 문자 모양과 표 안의 위치를 함께 바라보세요.';
    renderBoard('full');
  } else {
    questionSet = shuffled(kana).slice(0, 10);
    setupQuestion();
  }
}

function setupQuestion() {
  current = questionSet[questionIndex];
  selectedCard = null;
  $('rowHint').hidden = true;
  $('rowHint').textContent = '';
  $('questionProgress').textContent = `${questionIndex + 1} / ${questionSet.length}`;
  $('nextButton').hidden = true;
  $('feedback').textContent = '';
  $('feedback').className = 'feedback';

  if (lessonId === 2) {
    $('instruction').textContent = '발음을 듣고 자리를 찾으세요. 정답을 맞히면 필순을 보고 종이에 직접 써봅니다.';
    $('promptLabel').textContent = '들리는 문자의 자리를 찾아보세요';
    $('promptCharacter').textContent = '♪';
    if (current.romaji === 'o' || current.romaji === 'wo') {
      $('rowHint').textContent = `${current.col}의 소리입니다`;
      $('rowHint').hidden = false;
    }
    renderBoard('quiz');
    // Safari에서는 사용자 동작과 떨어진 지연 재생이 차단될 수 있어 즉시 실행합니다.
    speak(current);
  } else if (lessonId === 3) {
    $('instruction').textContent = '문자 카드를 선택하고, 비어 있는 표에서 알맞은 위치를 누르세요.';
    renderBoard('drop');
    renderCards(current, false);
  } else {
    renderBoard('drop');
    if (script === 'hiragana') {
      $('instruction').textContent = '발음을 듣고 알맞은 문자 카드를 골라 정확한 위치에 놓으세요.';
      $('promptLabel').textContent = '어떤 문자일까요?';
      $('promptCharacter').textContent = '♪';
      speak(current);
    } else {
      $('instruction').textContent = '보이는 히라가나에 대응하는 가타카나를 골라 정확한 위치에 놓으세요.';
      $('promptLabel').textContent = '이 히라가나와 같은 소리의 가타카나는?';
      $('promptCharacter').textContent = current.h;
    }
    renderCards(current, true);
  }
}

function renderCards(answer, distractors) {
  let items = distractors ? [answer, ...shuffled(kana.filter(x => x !== answer)).slice(0, 7)] : [answer];
  items = shuffled(items);
  $('cardTray').innerHTML = items.map(item => `<button class="letter-card" data-romaji="${item.romaji}">${charOf(item)}</button>`).join('');
  $('cardTray').querySelectorAll('.letter-card').forEach(card => card.addEventListener('click', () => {
    $('cardTray').querySelectorAll('.letter-card').forEach(x => x.classList.remove('selected'));
    card.classList.add('selected');
    selectedCard = kana.find(x => x.romaji === card.dataset.romaji);
    if (lessonId === 3) speak(selectedCard);
  }));
}

function handleCell(cell) {
  const picked = kana.find(x => x.romaji === cell.dataset.romaji);
  if (lessonId === 1) {
    speak(picked);
    flashCell(cell);
    return;
  }
  if (cell.classList.contains('correct') || !$('nextButton').hidden) return;
  attempts++;
  const cardCorrect = lessonId === 2 || (selectedCard && selectedCard.romaji === current.romaji);
  const placeCorrect = picked.romaji === current.romaji;
  if (lessonId > 2 && !selectedCard) {
    $('feedback').textContent = '먼저 문자 카드를 선택해 주세요.';
    $('feedback').className = 'feedback bad';
    return;
  }
  if (cardCorrect && placeCorrect) {
    cell.textContent = charOf(current);
    cell.classList.remove('target-empty');
    cell.classList.add('correct');
    $('feedback').textContent = `정답! ${charOf(current)} (${current.romaji}) · ${current.col} ${current.row}`;
    $('feedback').className = 'feedback good';
    score++;
    $('scoreText').textContent = `정답 ${score}`;
    speak(current);
    document.querySelector('.letter-card.selected')?.classList.add('used');
    if (lessonId === 2) {
      setTimeout(() => showStrokePractice(current), 450);
    } else {
      $('nextButton').hidden = false;
    }
  } else {
    cell.classList.add('wrong');
    setTimeout(() => cell.classList.remove('wrong'), 400);
    $('feedback').textContent = !cardCorrect ? '문자 카드를 다시 살펴보세요.' : '그 문자의 자리를 다시 생각해 보세요.';
    $('feedback').className = 'feedback bad';
    speak(current);
  }
}

function flashCell(cell) {
  cell.classList.add('flash');
  setTimeout(() => cell.classList.remove('flash'), 650);
}

function strokeImagePath(item) {
  return `assets/stroke-order/${script}/${item.romaji}.svg`;
}

function restartStrokeAnimation() {
  if (!current) return;
  $('strokeImage').src = `${strokeImagePath(current)}?play=${Date.now()}`;
}

function showStrokePractice(item) {
  $('strokeCharacter').textContent = charOf(item);
  $('strokeTitle').setAttribute('aria-label', `${charOf(item)}를 따라 써보세요`);
  $('strokeImage').alt = `${charOf(item)} 획순 애니메이션`;
  $('strokePractice').hidden = false;
  document.body.classList.add('modal-open');
  restartStrokeAnimation();
  $('replayStrokeButton').focus();
}

function hideStrokePractice() {
  const practice = $('strokePractice');
  if (!practice) return;
  practice.hidden = true;
  document.body.classList.remove('modal-open');
}

function playSequence() {
  $('playSequenceButton').disabled = true;
  $('playSequenceButton').textContent = '학습 중…';
  let index = 0;
  const ordered = [...kana].sort((a, b) => a.c - b.c || a.r - b.r);
  const playNext = () => {
    if (index >= ordered.length) {
      $('playSequenceButton').disabled = false;
      $('playSequenceButton').textContent = '↻ 다시 듣기';
      $('feedback').textContent = '전체 문자를 모두 살펴봤어요. 원하는 문자를 눌러 다시 들을 수도 있어요.';
      $('feedback').className = 'feedback good';
      return;
    }
    const item = ordered[index++];
    const cell = document.querySelector(`[data-romaji="${item.romaji}"]`);
    speak(item);
    flashCell(cell);
    sequenceTimer = setTimeout(playNext, 900);
  };
  playNext();
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex >= questionSet.length) finishLesson(); else setupQuestion();
}

function finishLesson() {
  const key = 'gojuon-progress';
  const progress = JSON.parse(localStorage.getItem(key) || '{}');
  const resultKey = `${script}-${lessonId}`;
  progress[resultKey] = Math.max(progress[resultKey] || 0, score);
  progress.totalCorrect = (progress.totalCorrect || 0) + score;
  localStorage.setItem(key, JSON.stringify(progress));
  const accuracy = attempts ? Math.round(score / attempts * 100) : 100;
  $('resultTitle').textContent = score >= 8 ? '참 잘했어요!' : score >= 5 ? '조금씩 자리가 보이네요!' : '한 번 더 지도를 걸어볼까요?';
  $('resultSummary').textContent = `${script === 'hiragana' ? '히라가나' : '가타카나'} ${lessonId}단계 학습을 마쳤습니다.`;
  $('resultScore').textContent = `${score} / ${questionSet.length}`;
  $('resultAccuracy').textContent = `${accuracy}%`;
  showScreen('resultScreen');
}

function updateProgress() {
  const progress = JSON.parse(localStorage.getItem('gojuon-progress') || '{}');
  const total = progress.totalCorrect || 0;
  $('totalCorrect').textContent = `${total}문제 정답`;
  $('progressFill').style.width = `${Math.min(100, total)}%`;
}

function shuffled(array) { return [...array].sort(() => Math.random() - .5); }

document.querySelectorAll('.script-card').forEach(button => button.addEventListener('click', () => {
  script = button.dataset.script;
  localStorage.setItem('gojuon-script', script);
  renderHome();
}));
$('homeButton').addEventListener('click', () => { clearTimeout(sequenceTimer); showScreen('homeScreen'); renderHome(); });
$('backButton').addEventListener('click', () => {
  clearTimeout(sequenceTimer);
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  showScreen('homeScreen');
  renderHome();
});
$('playSequenceButton').addEventListener('click', playSequence);
$('nextButton').addEventListener('click', nextQuestion);
$('replayButton').addEventListener('click', () => speak(current));
$('replayStrokeButton').addEventListener('click', restartStrokeAnimation);
$('writingDoneButton').addEventListener('click', () => {
  hideStrokePractice();
  $('nextButton').hidden = false;
  $('nextButton').focus();
});
$('retryButton').addEventListener('click', () => startLesson(lessonId));
$('resultHomeButton').addEventListener('click', () => { showScreen('homeScreen'); renderHome(); });
$('soundButton').addEventListener('click', () => {
  soundOn = !soundOn;
  localStorage.setItem('gojuon-sound', soundOn ? 'on' : 'off');
  $('soundButton').textContent = soundOn ? '🔊' : '🔇';
});
$('resetProgress').addEventListener('click', () => {
  if (confirm('이 기기에 저장된 학습 기록을 초기화할까요?')) {
    localStorage.removeItem('gojuon-progress');
    updateProgress();
  }
});

$('soundButton').textContent = soundOn ? '🔊' : '🔇';
if ('speechSynthesis' in window) {
  loadJapaneseVoice();
  window.speechSynthesis.addEventListener?.('voiceschanged', loadJapaneseVoice);
}
renderHome();
