// ─── State ───
let currentQuestion = 0;
let answered = false;
let selectedChoiceIndex = null;
const scores = { mebae: 0, hana: 0, minori: 0 };

// ─── DOM Elements ───
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const progressFill = document.getElementById('progress-fill');
const progressCount = document.getElementById('progress-count');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const choicesList = document.getElementById('choices-list');
const nextBtn = document.getElementById('next-btn');

const resultEmoji = document.getElementById('result-emoji');
const resultTitle = document.getElementById('result-title');
const resultCourse = document.getElementById('result-course');
const resultReason = document.getElementById('result-reason');
const allCoursesEl = document.getElementById('all-courses');
const retryBtn = document.getElementById('retry-btn');

// ─── Screen Management ───
function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── Start Quiz ───
function startQuiz() {
  currentQuestion = 0;
  answered = false;
  selectedChoiceIndex = null;
  scores.mebae = 0;
  scores.hana = 0;
  scores.minori = 0;
  showScreen(quizScreen);
  renderQuestion();
}

// ─── Render Question ───
function renderQuestion() {
  answered = false;
  selectedChoiceIndex = null;
  const q = quizData[currentQuestion];
  const total = quizData.length;

  // Progress
  progressFill.style.width = `${((currentQuestion) / total) * 100}%`;
  progressCount.textContent = `${currentQuestion + 1} / ${total}`;

  // Question
  questionNumber.textContent = `Q${currentQuestion + 1}`;
  questionText.textContent = q.question;

  // Choices
  choicesList.innerHTML = '';
  const labels = ['A', 'B', 'C', 'D'];
  q.choices.forEach((choice, index) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.innerHTML = `<span class="choice-label">${labels[index]}</span><span>${choice.text}</span>`;
    btn.addEventListener('click', () => handleAnswer(index));
    choicesList.appendChild(btn);
  });

  // Hide next button
  nextBtn.className = 'btn-primary btn-next';

  // Re-trigger animation
  const card = quizScreen.querySelector('.glass-card');
  card.style.animation = 'none';
  card.offsetHeight; // force reflow
  card.style.animation = 'fadeSlideUp 0.5s ease-out';
}

// ─── Handle Answer ───
function handleAnswer(selectedIndex) {
  const q = quizData[currentQuestion];

  // If already answered, subtract previous scores first
  if (answered && selectedChoiceIndex !== null) {
    const prevScores = q.choices[selectedChoiceIndex].score;
    scores.mebae -= prevScores.mebae;
    scores.hana -= prevScores.hana;
    scores.minori -= prevScores.minori;
  }

  answered = true;
  selectedChoiceIndex = selectedIndex;

  const choiceScores = q.choices[selectedIndex].score;

  // Add scores
  scores.mebae += choiceScores.mebae;
  scores.hana += choiceScores.hana;
  scores.minori += choiceScores.minori;

  // Highlight selected choice
  const buttons = choicesList.querySelectorAll('.choice-btn');
  buttons.forEach((btn, index) => {
    btn.classList.remove('selected', 'dimmed');
    if (index === selectedIndex) {
      btn.classList.add('selected');
    }
  });

  // Show next button
  const isLast = currentQuestion === quizData.length - 1;
  nextBtn.textContent = isLast ? '診断結果を見る 🎯' : '次の質問へ →';
  nextBtn.className = 'btn-primary btn-next visible';
}

// ─── Next Question ───
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= quizData.length) {
    showResult();
  } else {
    renderQuestion();
  }
}

// ─── Determine Result ───
function getRecommendedCourse() {
  const { mebae, hana, minori } = scores;

  if (minori >= hana && minori >= mebae) return 'minori';
  if (hana >= mebae) return 'hana';
  return 'mebae';
}

// ─── Show Result ───
function showResult() {
  showScreen(resultScreen);

  const recommended = getRecommendedCourse();
  recommendedResult = recommended;
  const course = courseInfo[recommended];

  // Hero
  resultEmoji.textContent = course.emoji;
  resultTitle.textContent = 'あなたにおすすめのコース';

  // Recommended course card
  resultCourse.innerHTML = `
    <div class="course-card recommended ${course.color}">
      ${course.badge ? `<span class="course-badge">${course.badge}</span>` : ''}
      <div class="course-card-header">
        <span class="course-emoji">${course.emoji}</span>
        <div>
          <h3 class="course-name">${course.name}</h3>
          <p class="course-tagline">${course.tagline}</p>
        </div>
      </div>
      <div class="course-price">
        <span class="price-amount">${course.price}</span>
        <span class="price-unit">/ ${course.priceUnit}</span>
      </div>
      <ul class="course-features">
        ${course.features.map(f => `<li><span class="check">✓</span>${f}</li>`).join('')}
      </ul>
      <p class="course-desc">${course.description}</p>
    </div>
  `;

  // Reason
  const reasons = {
    mebae: '診断結果から、あなたは「まずは仲間と一緒に第一歩を踏み出したい」という段階です。芽コースなら低リスクでコミュニティの雰囲気を体感でき、自分のペースで在宅ワークへの一歩を始められます。',
    hana: '診断結果から、あなたは「具体的なスキルを身につけて収益化を目指したい」段階にいます。華コースなら全カリキュラムを学びながら、アフィリエイト権利で受講料を回収することも可能です。',
    minori: '診断結果から、あなたは「自分のビジネスを本格的に構築したい」という高い意欲をお持ちです。実コースなら個別サポートを受けながら、商品設計から自動化まで最速でプロのスキルを習得できます。'
  };
  resultReason.innerHTML = `
    <div class="reason-box">
      <p class="reason-title">💡 あなたへのメッセージ</p>
      <p class="reason-text">${reasons[recommended]}</p>
    </div>
  `;

  // All courses
  const courseKeys = ['mebae', 'hana', 'minori'];
  allCoursesEl.innerHTML = courseKeys.map(key => {
    const c = courseInfo[key];
    const isRecommended = key === recommended;
    return `
      <div class="course-card-mini ${c.color} ${isRecommended ? 'is-recommended' : ''}">
        ${isRecommended ? '<span class="rec-tag">おすすめ</span>' : ''}
        ${c.badge && !isRecommended ? `<span class="pop-tag">${c.badge}</span>` : ''}
        <span class="mini-emoji">${c.emoji}</span>
        <h4 class="mini-name">${c.name}</h4>
        <p class="mini-price">${c.price}<span>/${c.priceUnit}</span></p>
        <ul class="mini-features">
          ${c.features.slice(0, 2).map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>
    `;
  }).join('');
}

// ─── Store recommended result ───
let recommendedResult = null;

// ─── Event Listeners ───
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
retryBtn.addEventListener('click', () => {
  showScreen(startScreen);
});

// ─── CTA Button: 芽コースのみ警告表示 ───
const ctaBtn = document.getElementById('cta-btn');
const warningOverlay = document.getElementById('warning-overlay');
const CTA_URL = 'https://utage-system.com/p/hoD17C6M8cVz';

ctaBtn.addEventListener('click', () => {
  if (recommendedResult === 'mebae') {
    // Show warning overlay
    warningOverlay.classList.add('active');
    // After 6 seconds, hide warning and redirect
    setTimeout(() => {
      warningOverlay.classList.remove('active');
      window.location.href = CTA_URL;
    }, 7000);
  } else {
    // Non-mebae: go directly
    window.location.href = CTA_URL;
  }
});
