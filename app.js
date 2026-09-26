const main = document.getElementById('main');
const toast = document.getElementById('toast');
const soundButton = document.getElementById('soundToggle');
const musicButton = document.getElementById('musicToggle');

const objectAsset = file => `assets%20images%20objects/${file}`;
const foxAsset = file => `assets%20images%20fox/${file}`;
const learningAsset = file => `assets/images/objects/object-${file}.png`;
const shuffle = items => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const WORDS = [
  { id: 'pen', image: 'pen.png', audio: 'assets/audio/words/pen.mp3' },
  { id: 'pencil', image: 'pencil.png', audio: 'assets/audio/words/pencil.mp3' },
  { id: 'book', image: 'book.png', audio: 'assets/audio/words/book.mp3' },
  { id: 'bag', image: 'bag.png', audio: 'assets/audio/words/bag.mp3' },
  { id: 'ruler', image: 'ruler.png', audio: 'assets/audio/words/ruler.mp3' },
  { id: 'rubber', image: 'rubber.png', audio: 'assets/audio/words/rubber.mp3' },
  { id: 'notebook', image: 'notebook.png', audio: 'assets/audio/words/notebook.mp3' },
  { id: 'crayon', image: 'crayon.png', audio: null },
  { id: 'scissors', image: 'scissors.png', audio: null },
  { id: 'sharpener', image: 'sharpener.png', audio: 'assets/audio/words/sharpener.mp3' }
];

const SCREENS = {
  listen: { title: 'Listen & Tap', picture: 'pencil.png', homeArt: 'fox-pencil.png.png', icon: '👂', colour: 'blue' },
  colour: { title: 'Colour Mission', picture: 'crayon.png', homeArt: 'fox-colours-brush.png.png', icon: '🎨', colour: 'coral' },
  match: { title: 'Match Pictures', picture: 'book.png', homeArt: 'fox-book.png.png', icon: '🃏', colour: 'green' },
  count: { title: 'Count & Tap', picture: 'pen.png', homeArt: 'fox-math-board.png.png', icon: '⭐', colour: 'yellow' },
  math: { title: 'Math Mission', picture: 'object-star.png', homeArt: 'fox-math-board.png.png', icon: '➕', colour: 'purple', learningPicture: 'star' },
  missing: { title: 'What’s Missing?', picture: 'sharpener.png', homeArt: 'fox-whats-missing.png.png', icon: '❓', colour: 'sky' }
};

const feedbackFiles = {
  great: 'assets/audio/feedback/great-job.mp3',
  well: 'assets/audio/feedback/well-done.mp3',
  didIt: 'assets/audio/feedback/you-did-it.mp3',
  retry: 'assets/audio/feedback/try-again.mp3',
  complete: 'assets/audio/feedback/mission-complete.mp3'
};

const colourRounds = [
  { id: 'pencil', colour: 'red', audio: 'paint-the-pencil-red.mp3' },
  { id: 'pen', colour: 'blue', audio: 'paint-the-pen-blue.mp3' },
  { id: 'book', colour: 'green', audio: 'paint-the-book-green.mp3' },
  { id: 'ruler', colour: 'yellow', audio: 'paint-the-ruler-yellow.mp3' },
  { id: 'rubber', colour: 'red', audio: 'paint-the-rubber-red.mp3' },
  { id: 'crayon', colour: 'blue', audio: 'paint-the-crayon-blue.mp3' },
  { id: 'bag', colour: 'green', audio: 'paint-the-bag-green.mp3' },
  { id: 'notebook', colour: 'yellow', audio: 'paint-the-notebook-yellow.mp3' },
  { id: 'scissors', colour: 'red', audio: 'paint-the-scissors-red.mp3' },
  { id: 'sharpener', colour: 'blue', audio: 'paint-the-sharpener-blue.mp3' }
];

const matchSets = [
  ['book', 'bag', 'pencil'],
  ['ruler', 'rubber', 'crayon'],
  ['pen', 'notebook', 'scissors', 'sharpener']
];

const learningObjects = [
  { id: 'pencil', audio: 'assets/audio/words/pencil.mp3' },
  { id: 'star', audio: null },
  { id: 'fox', audio: null },
  { id: 'book', audio: 'assets/audio/words/book.mp3' },
  { id: 'apple', audio: null }
];

const countRounds = [
  { number: 1, object: 'apple' }, { number: 2, object: 'star' },
  { number: 3, object: 'pencil' }, { number: 4, object: 'book' },
  { number: 5, object: 'fox' }, { number: 2, object: 'apple' },
  { number: 4, object: 'star' }, { number: 3, object: 'book' }
];

const mathRoundPools = {
  easy: [
    { a: 1, b: 1, object: 'star' }, { a: 1, b: 2, object: 'book' },
    { a: 2, b: 2, object: 'pencil' }, { a: 2, b: 3, object: 'apple' },
    { a: 4, b: 1, object: 'fox' }
  ],
  medium: [
    { a: 2, b: 3, object: 'book' }, { a: 3, b: 3, object: 'star' },
    { a: 2, b: 5, object: 'apple' }, { a: 4, b: 3, object: 'pencil' },
    { a: 5, b: 3, object: 'fox' }, { a: 4, b: 4, object: 'book' }
  ],
  hard: [
    { a: 4, b: 3, object: 'pencil' }, { a: 5, b: 3, object: 'fox' },
    { a: 3, b: 6, object: 'star' }, { a: 5, b: 4, object: 'apple' },
    { a: 7, b: 2, object: 'book' }, { a: 8, b: 1, object: 'pencil' },
    { a: 6, b: 4, object: 'fox' }, { a: 5, b: 5, object: 'apple' }
  ]
};

const missingRounds = [
  ['apple', 'book', 'pencil'], ['star', 'fox', 'book'], ['pencil', 'apple', 'star'],
  ['fox', 'book', 'apple'], ['book', 'pencil', 'star'], ['apple', 'fox', 'pencil']
];

let completed = (() => {
  try { return JSON.parse(localStorage.getItem('foxJunior_progress') || '{}'); }
  catch { return {}; }
})();
if (Object.prototype.hasOwnProperty.call(completed, 'same')) {
  const { same: oldFindSame, ...currentProgress } = completed;
  completed = currentProgress;
  localStorage.setItem('foxJunior_progress', JSON.stringify(completed));
  localStorage.removeItem('foxJunior_bestTime_same');
}
let soundEnabled = localStorage.getItem('foxJunior_soundEnabled') !== 'false';
let musicEnabled = localStorage.getItem('foxJunior_musicEnabled') !== 'false';
let challengeEnabled = localStorage.getItem('foxJunior_timeChallenge') === 'true';
let currentScreen = 'home';
let game = null;
let screenTimer = null;
let sequenceTimers = [];
let elapsedTimer = null;
let gameStartedAt = 0;
let spokenAudio = null;
let speechToken = 0;
let pendingSpeechResolve = null;

const MUSIC_VOLUME = .22;
const DUCKED_MUSIC_VOLUME = .07;
const music = new Audio('assets/audio/background-music.mp3');
const musicOwnerId = crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;
const musicChannel = 'BroadcastChannel' in window ? new BroadcastChannel('foxJunior_music') : null;
music.loop = true;
music.volume = MUSIC_VOLUME;

const pauseBackgroundMusic = () => {
  if (!music.paused) music.pause();
};

const claimBackgroundMusic = () => {
  localStorage.setItem('foxJunior_musicOwner', musicOwnerId);
  musicChannel?.postMessage({ type: 'claim', owner: musicOwnerId });
};

const playBackgroundMusic = () => {
  if (!musicEnabled || !music.paused) return;
  claimBackgroundMusic();
  music.play().catch(() => {});
};

musicChannel?.addEventListener('message', event => {
  if (event.data?.type === 'claim' && event.data.owner !== musicOwnerId) pauseBackgroundMusic();
});

window.addEventListener('storage', event => {
  if (event.key === 'foxJunior_musicOwner' && event.newValue !== musicOwnerId) pauseBackgroundMusic();
  if (event.key === 'foxJunior_musicEnabled' && event.newValue !== null) {
    musicEnabled = event.newValue !== 'false';
    if (!musicEnabled) pauseBackgroundMusic();
    updateAudioButtons();
  }
});

const updateAudioButtons = () => {
  soundButton.setAttribute('aria-pressed', String(soundEnabled));
  soundButton.querySelector('span').textContent = soundEnabled ? '🔊' : '🔇';
  musicButton.setAttribute('aria-pressed', String(musicEnabled));
  musicButton.querySelector('span').textContent = musicEnabled ? '♫' : '♩';
};

const duckMusic = duck => {
  music.volume = duck ? DUCKED_MUSIC_VOLUME : MUSIC_VOLUME;
};

const stopSpeech = () => {
  speechToken += 1;
  if (pendingSpeechResolve) {
    const resolvePending = pendingSpeechResolve;
    pendingSpeechResolve = null;
    resolvePending();
  }
  if (spokenAudio) {
    spokenAudio.pause();
    spokenAudio.onended = null;
    spokenAudio.onerror = null;
    spokenAudio = null;
  }
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  duckMusic(false);
};

const speakFallback = (text, token) => {
  if (!soundEnabled || token !== speechToken || !('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-GB';
  utterance.rate = .78;
  utterance.pitch = 1.08;
  utterance.onend = () => { if (token === speechToken) duckMusic(false); };
  utterance.onerror = () => { if (token === speechToken) duckMusic(false); };
  speechSynthesis.speak(utterance);
};

const speak = (text, file = null) => {
  stopSpeech();
  if (!soundEnabled) return;
  const token = speechToken;
  duckMusic(true);
  if (!file) {
    speakFallback(text, token);
    return;
  }
  spokenAudio = new Audio(file);
  spokenAudio.volume = 1;
  spokenAudio.onended = () => { if (token === speechToken) duckMusic(false); };
  spokenAudio.onerror = () => speakFallback(text, token);
  spokenAudio.play().catch(() => speakFallback(text, token));
};

const speakAsync = (text, file = null) => {
  stopSpeech();
  if (!soundEnabled) return Promise.resolve();
  const token = speechToken;
  duckMusic(true);
  return new Promise(resolve => {
    let settled = false;
    let fallbackStarted = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      if (pendingSpeechResolve === finish) pendingSpeechResolve = null;
      if (token === speechToken) duckMusic(false);
      resolve();
    };
    const useEnglishSpeech = () => {
      if (fallbackStarted || settled) return;
      fallbackStarted = true;
      if (token !== speechToken || !('speechSynthesis' in window)) return finish();
      spokenAudio = null;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      utterance.rate = .78;
      utterance.pitch = 1.08;
      utterance.onend = finish;
      utterance.onerror = finish;
      speechSynthesis.speak(utterance);
    };
    pendingSpeechResolve = finish;
    if (!file) return useEnglishSpeech();
    spokenAudio = new Audio(file);
    spokenAudio.volume = 1;
    spokenAudio.onended = finish;
    spokenAudio.onerror = useEnglishSpeech;
    spokenAudio.play().catch(useEnglishSpeech);
  });
};

const playFeedback = kind => {
  const labels = { great: 'Great job!', well: 'Well done!', didIt: 'You did it!', retry: 'Try again.', complete: 'Mission complete!' };
  speak(labels[kind], feedbackFiles[kind]);
};

const sayWord = id => {
  const word = learningObjects.find(item => item.id === id) || WORDS.find(item => item.id === id);
  speak(id, word?.audio || null);
};

const showToast = message => {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 1200);
};

const clearScreenTimers = () => {
  window.clearTimeout(screenTimer);
  sequenceTimers.forEach(timer => window.clearTimeout(timer));
  sequenceTimers = [];
  window.clearInterval(elapsedTimer);
  screenTimer = null;
  elapsedTimer = null;
};

const scheduleSequence = (callback, delay) => {
  const timer = window.setTimeout(callback, delay);
  sequenceTimers.push(timer);
  return timer;
};

const startGameClock = () => {
  gameStartedAt = Date.now();
  if (!challengeEnabled) return;
  elapsedTimer = window.setInterval(() => {
    const value = document.getElementById('timerValue');
    if (value) value.textContent = formatTime((Date.now() - gameStartedAt) / 1000);
  }, 250);
};

const formatTime = seconds => {
  const whole = Math.floor(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`;
};

const recordCompletion = screen => {
  completed = { ...completed, [screen]: true };
  localStorage.setItem('foxJunior_progress', JSON.stringify(completed));
  const seconds = (Date.now() - gameStartedAt) / 1000;
  if (challengeEnabled) {
    const key = `foxJunior_bestTime_${screen}`;
    const previous = Number(localStorage.getItem(key) || 0);
    if (!previous || seconds < previous) localStorage.setItem(key, String(seconds));
  }
  return seconds;
};

const header = (title, icon, current, total) => `
  <div class="game-topline">
    <button class="round-home" data-screen="home" aria-label="Home">⌂</button>
    <div class="game-title"><span aria-hidden="true">${icon}</span><h1>${title}</h1></div>
    ${challengeEnabled ? '<div class="timer-pill"><small>BEAT YOUR BEST!</small><b id="timerValue">0:00</b></div>' : '<div class="timer-spacer"></div>'}
  </div>
  <div class="progress-dots" aria-label="Mission progress">${Array.from({ length: total }, (_, i) => `<i class="${i < current ? 'done' : i === current ? 'now' : ''}"></i>`).join('')}</div>`;

const listenButton = text => `<button class="listen-button" data-action="replay" aria-label="Play the instruction again"><span aria-hidden="true">🔊</span><b>${text}</b></button>`;
const nextButton = () => `<button class="next-button" data-action="next">NEXT <span aria-hidden="true">▶</span></button>`;

const renderHome = () => {
  main.innerHTML = `
    <section class="home-screen" aria-labelledby="homeTitle">
      <h1 id="homeTitle" class="sr-only">Fox School Quest Junior missions</h1>
      <div class="home-video-hero">
        <video autoplay muted loop playsinline preload="metadata" poster="asset%20images%20scenes/home-scene.jpg" aria-label="Fox School Quest welcome video">
          <source src="assets/video/home-hero.mp4" type="video/mp4">
        </video>
      </div>
      <div class="mission-grid">
        ${Object.entries(SCREENS).map(([key, item]) => `
          <button class="mission-card theme-${item.colour}" data-screen="${key}" aria-label="Play ${item.title}"><span class="mission-picture"><img src="${foxAsset(item.homeArt)}" alt=""></span><span class="mission-copy"><span class="mission-title">${item.title}</span><span class="play-button">PLAY <span aria-hidden="true">▶</span></span></span></button>`).join('')}
      </div>
      <div class="home-footer-card"><button class="backpack-wide" data-screen="backpack"><span aria-hidden="true">🎒</span><span><small>YOUR REWARDS</small><b>My Backpack</b></span><strong>OPEN</strong></button><label class="challenge-switch"><input id="challengeToggle" type="checkbox" ${challengeEnabled ? 'checked' : ''}><span aria-hidden="true"></span><b>Time Challenge</b><small>Optional</small></label></div>
    </section>`;
};

const beginListen = () => {
  const order = shuffle(WORDS.map(word => word.id));
  game = { type: 'listen', order, round: 0, solved: false, options: [] };
  prepareListenRound();
  startGameClock();
};

const prepareListenRound = () => {
  const target = game.order[game.round];
  const distractors = shuffle(WORDS.filter(word => word.id !== target)).slice(0, 2).map(word => word.id);
  game.options = shuffle([target, ...distractors]);
  game.solved = false;
  renderListen();
  screenTimer = window.setTimeout(() => sayWord(target), 350);
};

const renderListen = () => {
  const target = game.order[game.round];
  main.innerHTML = `<section class="game-screen">${header('Listen & Tap', '👂', game.round, game.order.length)}<div class="instruction-row">${listenButton('LISTEN')}</div><div class="choice-grid">${game.options.map(id => `<button class="picture-choice ${game.solved && id === target ? 'correct' : ''}" data-answer="${id}" ${game.solved ? 'disabled' : ''}><img src="${objectAsset(`${id}.png`)}" alt="${id}"></button>`).join('')}</div><div class="game-actions">${game.solved ? '<div class="success-message"><img src="' + foxAsset('Fox-happy.jpg') + '" alt="Happy Foxy"><b>Great job!</b></div>' + nextButton() : '<span class="gentle-hint">Tap the picture you hear.</span>'}</div></section>`;
};

const beginColour = () => {
  game = { type: 'colour', order: shuffle(colourRounds), round: 0, solved: false };
  renderColour(); startGameClock(); announceColour();
};

const announceColour = () => {
  const item = game.order[game.round];
  screenTimer = window.setTimeout(() => speak(`Paint the ${item.id} ${item.colour}.`, `assets/audio/colour-mission/${item.audio}`), 350);
};

const renderColour = () => {
  const item = game.order[game.round];
  const image = ['pencil', 'book'].includes(item.id) ? learningAsset(item.id) : objectAsset(`${item.id}.png`);
  main.innerHTML = `<section class="game-screen">${header('Colour Mission', '🎨', game.round, game.order.length)}<div class="instruction-row">${listenButton('LISTEN')}</div><div class="colour-board"><div class="paint-object ${game.solved ? `painted paint-${item.colour}` : ''}"><img src="${image}" alt="${item.id}"></div><div class="swatches" aria-label="Choose a colour">${['red','blue','yellow','green'].map(colour => `<button class="swatch swatch-${colour} ${game.solved && colour === item.colour ? 'correct' : ''}" data-colour="${colour}" aria-label="${colour}" ${game.solved ? 'disabled' : ''}></button>`).join('')}</div></div><div class="game-actions">${game.solved ? '<div class="success-message"><img src="' + foxAsset('Fox-happy.jpg') + '" alt="Happy Foxy"><b>Well done!</b></div>' + nextButton() : '<span class="gentle-hint">Choose a paint colour.</span>'}</div></section>`;
};

const beginMatch = () => {
  game = { type: 'match', round: 0, cards: [], first: null, locked: false, matches: 0 };
  prepareMatchRound(); startGameClock();
};

const prepareMatchRound = () => {
  const ids = matchSets[game.round];
  game.cards = shuffle(ids.flatMap((id, index) => [{ key: `${id}-a-${index}`, id, open: false, matched: false }, { key: `${id}-b-${index}`, id, open: false, matched: false }]));
  game.first = null; game.locked = false; game.matches = 0;
  renderMatch();
  screenTimer = window.setTimeout(() => speak('Find two pictures that are the same.'), 350);
};

const renderMatch = () => {
  main.innerHTML = `<section class="game-screen">${header('Match Pictures', '🃏', game.round, matchSets.length)}<div class="instruction-row">${listenButton('FIND A PAIR')}</div><div class="match-grid cards-${game.cards.length}">${game.cards.map((card, index) => `<button class="match-card ${card.open || card.matched ? 'open' : ''} ${card.matched ? 'matched' : ''}" data-card="${index}" aria-label="${card.open || card.matched ? card.id : 'Hidden card'}" ${game.locked || card.matched ? 'disabled' : ''}><span class="card-back">?</span><span class="card-face"><img src="${objectAsset(`${card.id}.png`)}" alt="${card.id}"></span></button>`).join('')}</div><div class="game-actions"><span class="gentle-hint">Find the picture twins.</span></div></section>`;
};

const beginCount = () => {
  game = { type: 'count', order: shuffle(countRounds), round: 0, options: [], solved: false };
  prepareCountRound(); startGameClock();
};

const prepareCountRound = () => {
  const target = game.order[game.round].number;
  const options = new Set([target]);
  while (options.size < 3) options.add(Math.max(1, Math.min(10, target + Math.floor(Math.random() * 7) - 3)));
  game.options = shuffle([...options]); game.solved = false;
  renderCount(); screenTimer = window.setTimeout(() => speak(numberWord(target)), 350);
};

const numberWord = number => ['zero','one','two','three','four','five','six','seven','eight','nine','ten'][number];
const spokenNumber = number => numberWord(number) || String(number);
const renderCount = () => {
  const item = game.order[game.round];
  main.innerHTML = `<section class="game-screen">${header('Count & Tap', '⭐', game.round, game.order.length)}<div class="instruction-row">${listenButton('LISTEN')}</div><div class="count-grid">${game.options.map(number => `<button class="count-choice ${game.solved && number === item.number ? 'correct' : ''}" data-number="${number}" ${game.solved ? 'disabled' : ''}><span class="symbol-cloud">${Array.from({ length: number }, () => `<img src="${learningAsset(item.object)}" alt="">`).join('')}</span>${game.solved && number === item.number ? `<b class="digit-reveal">${number}</b>` : ''}</button>`).join('')}</div><div class="game-actions">${game.solved ? '<div class="success-message"><img src="' + foxAsset('Fox-happy.jpg') + '" alt="Happy Foxy"><b>You did it!</b></div>' + nextButton() : '<span class="gentle-hint">Tap the group you hear.</span>'}</div></section>`;
};

const beginMath = () => {
  const easy = shuffle(mathRoundPools.easy).slice(0, 2);
  const medium = shuffle(mathRoundPools.medium).slice(0, 3);
  const hard = shuffle(mathRoundPools.hard).slice(0, 3);
  const order = [easy[0], easy[1], medium[0], medium[1], medium[2], hard[0], hard[1], hard[2]];
  game = { type: 'math', order, round: 0, solved: false, feedbackReady: false, answerPositions: [], lastAnswerPosition: null };
  prepareMathRound(); startGameClock();
};

const nextMathAnswerPosition = () => {
  if (!game.answerPositions.length) {
    game.answerPositions = shuffle([0, 1, 2]);
    if (game.answerPositions[0] === game.lastAnswerPosition) {
      const swapIndex = 1 + Math.floor(Math.random() * 2);
      [game.answerPositions[0], game.answerPositions[swapIndex]] = [game.answerPositions[swapIndex], game.answerPositions[0]];
    }
  }
  const position = game.answerPositions.shift();
  game.lastAnswerPosition = position;
  return position;
};

const prepareMathRound = () => {
  const item = game.order[game.round];
  const answer = item.a + item.b;
  const distractors = shuffle([answer - 2, answer - 1, answer + 1, answer + 2])
    .filter(value => value >= 1 && value <= 10)
    .slice(0, 2);
  const answers = shuffle([answer, ...distractors]);
  const answerPosition = nextMathAnswerPosition();
  const currentPosition = answers.indexOf(answer);
  [answers[currentPosition], answers[answerPosition]] = [answers[answerPosition], answers[currentPosition]];
  item.answers = answers;
  game.solved = false;
  game.feedbackReady = false;
  renderMath();
  announceMath();
};

const announceMath = () => {
  const item = game.order[game.round];
  screenTimer = window.setTimeout(() => speak(`${numberWord(item.a)} plus ${numberWord(item.b)} equals.`), 350);
};

const renderMath = () => {
  const item = game.order[game.round];
  const answer = item.a + item.b;
  const visualGroup = amount => `<span class="${amount > 5 ? 'many' : ''}">${Array.from({ length: amount }, () => `<img src="${learningAsset(item.object)}" alt="">`).join('')}</span>`;
  main.innerHTML = `<section class="game-screen math-screen">${header('Math Mission', '➕', game.round, game.order.length)}<div class="instruction-row">${listenButton('LISTEN')}</div><div class="math-panel"><div class="math-visual" aria-hidden="true">${visualGroup(item.a)}<b>+</b>${visualGroup(item.b)}</div><div class="math-equation" aria-label="${item.a} plus ${item.b}">${item.a} + ${item.b} = ?</div><div class="math-answers">${item.answers.map(value => `<button class="math-answer ${game.solved && value === answer ? 'correct' : ''}" data-math="${value}" ${game.solved ? 'disabled' : ''}>${value}</button>`).join('')}</div></div><div class="game-actions">${game.feedbackReady ? '<div class="success-message"><img src="' + foxAsset('Fox-happy.jpg') + '" alt="Happy Foxy"><b>Great job!</b></div>' + nextButton() : '<span class="gentle-hint">' + (game.solved ? '' : 'Tap the answer.') + '</span>'}</div></section>`;
};

const beginMissing = () => {
  game = { type: 'missing', order: shuffle(missingRounds), round: 0, phase: 'look', missing: null, options: [], solved: false, answerPositions: [], lastAnswerPosition: null };
  prepareMissingRound(); startGameClock();
};

const nextMissingAnswerPosition = () => {
  if (!game.answerPositions.length) {
    game.answerPositions = shuffle([0, 1, 2]);
    if (game.answerPositions[0] === game.lastAnswerPosition) {
      const swapIndex = 1 + Math.floor(Math.random() * 2);
      [game.answerPositions[0], game.answerPositions[swapIndex]] = [game.answerPositions[swapIndex], game.answerPositions[0]];
    }
  }
  const position = game.answerPositions.shift();
  game.lastAnswerPosition = position;
  return position;
};

const prepareMissingRound = () => {
  const set = game.order[game.round];
  sequenceTimers.forEach(timer => window.clearTimeout(timer)); sequenceTimers = [];
  game.phase = 'present'; game.highlight = -1; game.solved = false; game.missing = set[Math.floor(Math.random() * set.length)];
  const distractors = shuffle(learningObjects.map(word => word.id).filter(id => !set.includes(id))).slice(0, 2);
  const choices = shuffle([game.missing, ...distractors]);
  const answerPosition = nextMissingAnswerPosition();
  const currentPosition = choices.indexOf(game.missing);
  [choices[currentPosition], choices[answerPosition]] = [choices[answerPosition], choices[currentPosition]];
  game.options = choices;
  renderMissing();
  set.forEach((id, index) => scheduleSequence(() => {
    game.highlight = index; renderMissing(); sayWord(id);
  }, 600 + index * 2000));
  scheduleSequence(() => { game.highlight = -1; game.phase = 'pause'; renderMissing(); }, 6600);
  scheduleSequence(() => { game.phase = 'choose'; renderMissing(); speak('What’s missing?'); }, 8200);
};

const renderMissing = () => {
  const set = game.order[game.round];
  const choosing = game.phase === 'choose';
  const slots = set.map((id, index) => choosing && id === game.missing
    ? '<div class="memory-object empty"><span>?</span></div>'
    : `<div class="memory-object ${game.highlight === index ? 'highlighted' : ''}"><img src="${learningAsset(id)}" alt="${id}"></div>`).join('');
  main.innerHTML = `<section class="game-screen">${header('What’s Missing?', '❓', game.round, game.order.length)}<div class="instruction-row">${listenButton(choosing ? 'LISTEN' : 'LOOK')}</div><div class="memory-stage ${game.phase}">${slots}</div>${choosing ? `<div class="missing-grid">${game.options.map(id => `<button class="missing-choice" data-missing="${id}" ${game.solved ? 'disabled' : ''}><img src="${learningAsset(id)}" alt="${id}"></button>`).join('')}</div>` : '<div class="look-message">Look carefully…</div>'}<div class="game-actions">${game.solved ? '<div class="success-message"><img src="' + foxAsset('Fox-happy.jpg') + '" alt="Happy Foxy"><b>Well done!</b></div>' + nextButton() : '<span class="gentle-hint">' + (choosing ? 'Which picture went away?' : 'Remember the pictures.') + '</span>'}</div></section>`;
};

const renderComplete = screen => {
  const seconds = recordCompletion(screen);
  const best = Number(localStorage.getItem(`foxJunior_bestTime_${screen}`) || seconds);
  game = { type: 'complete', completedScreen: screen };
  main.innerHTML = `<section class="complete-screen"><div class="complete-card"><div class="confetti" aria-hidden="true">★ ✦ ★</div><img src="${foxAsset('Fox-happy.jpg')}" alt="Happy Foxy"><small>MISSION COMPLETE</small><h1>You did it!</h1>${challengeEnabled ? `<div class="time-result"><span>Your time <b>${formatTime(seconds)}</b></span><span>Best <b>${formatTime(best)}</b></span></div>` : ''}<div class="complete-actions"><button class="home-button" data-screen="home">⌂ HOME</button><button class="next-button" data-replay-game="${screen}">PLAY AGAIN ↻</button></div></div></section>`;
  playFeedback('complete');
};

const renderBackpack = () => {
  game = null;
  main.innerHTML = `<section class="backpack-screen">${header('My Backpack', '🎒', 0, 0)}<div class="backpack-intro"><img src="${foxAsset('Fox-happy.jpg')}" alt="Happy Foxy"><div><span>YOUR REWARDS</span><h2>Keep exploring!</h2></div></div><div class="reward-grid">${Object.entries(SCREENS).map(([key, item]) => `<article class="reward-card ${completed[key] ? 'earned' : 'locked'}"><div class="reward-picture"><img src="${item.learningPicture ? learningAsset(item.learningPicture) : objectAsset(item.picture)}" alt=""><span aria-hidden="true">${completed[key] ? '★' : '?'}</span></div><h3>${item.title}</h3><b>${completed[key] ? '✓ COMPLETED!' : 'NOT COMPLETED'}</b></article>`).join('')}</div></section>`;
};

const renderScreen = screen => {
  clearScreenTimers(); stopSpeech(); currentScreen = screen;
  document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.screen === screen));
  if (screen === 'home') { game = null; renderHome(); }
  else if (screen === 'listen') beginListen();
  else if (screen === 'colour') beginColour();
  else if (screen === 'match') beginMatch();
  else if (screen === 'count') beginCount();
  else if (screen === 'math') beginMath();
  else if (screen === 'missing') beginMissing();
  else if (screen === 'backpack') renderBackpack();
  main.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const wrongAnswer = button => {
  button.classList.remove('shake');
  void button.offsetWidth;
  button.classList.add('shake');
  playFeedback('retry');
};

const answerListen = button => {
  if (game.solved) return;
  const target = game.order[game.round];
  if (button.dataset.answer !== target) return wrongAnswer(button);
  game.solved = true; renderListen(); sayWord(target);
  scheduleSequence(() => playFeedback(['great','well','didIt'][game.round % 3]), 900);
};

const answerColour = button => {
  if (game.solved) return;
  if (button.dataset.colour !== game.order[game.round].colour) return wrongAnswer(button);
  game.solved = true; renderColour(); playFeedback(['well','great','didIt'][game.round % 3]);
};

const answerCount = button => {
  if (game.solved) return;
  const target = game.order[game.round].number;
  if (Number(button.dataset.number) !== target) return wrongAnswer(button);
  game.solved = true; renderCount(); speak(`${numberWord(target)}. Great job!`);
};

const answerMath = async button => {
  if (game.solved) return;
  const item = game.order[game.round];
  const answer = item.a + item.b;
  if (Number(button.dataset.math) !== answer) return wrongAnswer(button);
  const activeGame = game;
  const activeRound = game.round;
  game.solved = true; game.feedbackReady = false; renderMath();
  await speakAsync(`${spokenNumber(answer)}.`);
  if (game !== activeGame || currentScreen !== 'math' || game.round !== activeRound) return;
  await new Promise(resolve => window.setTimeout(resolve, 180));
  await speakAsync('Great job!', feedbackFiles.great);
  if (game !== activeGame || currentScreen !== 'math' || game.round !== activeRound) return;
  game.feedbackReady = true; renderMath();
};

const answerMissing = button => {
  if (game.solved || game.phase !== 'choose') return;
  if (button.dataset.missing !== game.missing) return wrongAnswer(button);
  game.solved = true; game.phase = 'restored'; renderMissing(); sayWord(game.missing);
  scheduleSequence(() => playFeedback('well'), 1000);
};

const flipMatch = button => {
  if (game.locked) return;
  const index = Number(button.dataset.card);
  const card = game.cards[index];
  if (card.open || card.matched) return;
  card.open = true;
  if (game.first === null) { game.first = index; renderMatch(); return; }
  const first = game.cards[game.first];
  if (first.id === card.id) {
    first.matched = true; card.matched = true; first.open = false; card.open = false;
    game.first = null; game.matches += 1; renderMatch(); sayWord(card.id);
    if (game.matches === matchSets[game.round].length) screenTimer = window.setTimeout(() => {
      if (game.round === matchSets.length - 1) renderComplete('match');
      else { game.round += 1; prepareMatchRound(); }
    }, 900);
    return;
  }
  game.locked = true; renderMatch(); playFeedback('retry');
  screenTimer = window.setTimeout(() => { first.open = false; card.open = false; game.first = null; game.locked = false; renderMatch(); }, 850);
};

const nextRound = () => {
  sequenceTimers.forEach(timer => window.clearTimeout(timer));
  sequenceTimers = [];
  stopSpeech();
  const type = game.type;
  const lengths = { listen: game.order.length, colour: game.order.length, count: game.order.length, math: game.order.length, missing: game.order.length };
  if (game.round >= lengths[type] - 1) { renderComplete(type); return; }
  game.round += 1;
  if (type === 'listen') prepareListenRound();
  if (type === 'colour') { game.solved = false; renderColour(); announceColour(); }
  if (type === 'count') prepareCountRound();
  if (type === 'math') prepareMathRound();
  if (type === 'missing') prepareMissingRound();
};

const replayInstruction = () => {
  if (!game) return;
  if (game.type === 'listen') sayWord(game.order[game.round]);
  else if (game.type === 'colour') { const item = game.order[game.round]; speak(`Paint the ${item.id} ${item.colour}.`, `assets/audio/colour-mission/${item.audio}`); }
  else if (game.type === 'match') speak('Find two pictures that are the same.');
  else if (game.type === 'count') speak(numberWord(game.order[game.round].number));
  else if (game.type === 'math') { const item = game.order[game.round]; speak(`${numberWord(item.a)} plus ${numberWord(item.b)} equals.`); }
  else if (game.type === 'missing') {
    if (game.phase === 'choose') speak('What’s missing?');
    else if (game.highlight >= 0) sayWord(game.order[game.round][game.highlight]);
    else speak('Look carefully.');
  }
};

document.addEventListener('click', event => {
  playBackgroundMusic();
  const screenButton = event.target.closest('[data-screen]');
  if (screenButton) return renderScreen(screenButton.dataset.screen);
  const replay = event.target.closest('[data-action="replay"]'); if (replay) return replayInstruction();
  const next = event.target.closest('[data-action="next"]'); if (next) return nextRound();
  const answer = event.target.closest('[data-answer]'); if (answer) return answerListen(answer);
  const colour = event.target.closest('[data-colour]'); if (colour) return answerColour(colour);
  const card = event.target.closest('[data-card]'); if (card) return flipMatch(card);
  const number = event.target.closest('[data-number]'); if (number) return answerCount(number);
  const math = event.target.closest('[data-math]'); if (math) return answerMath(math);
  const missing = event.target.closest('[data-missing]'); if (missing) return answerMissing(missing);
  const replayGame = event.target.closest('[data-replay-game]'); if (replayGame) return renderScreen(replayGame.dataset.replayGame);
});

document.addEventListener('change', event => {
  if (event.target.id === 'challengeToggle') {
    challengeEnabled = event.target.checked;
    localStorage.setItem('foxJunior_timeChallenge', String(challengeEnabled));
    showToast(challengeEnabled ? 'Time Challenge on' : 'Normal play');
  }
});

soundButton.addEventListener('click', () => {
  soundEnabled = !soundEnabled; localStorage.setItem('foxJunior_soundEnabled', String(soundEnabled));
  if (!soundEnabled) stopSpeech(); updateAudioButtons();
});

musicButton.addEventListener('click', () => {
  musicEnabled = !musicEnabled; localStorage.setItem('foxJunior_musicEnabled', String(musicEnabled));
  if (musicEnabled) playBackgroundMusic(); else pauseBackgroundMusic(); updateAudioButtons();
});

updateAudioButtons();
renderScreen('home');
