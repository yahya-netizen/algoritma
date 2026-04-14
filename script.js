var answers = { 1: null, 2: null, 3: null };
var correct = { 1: 'B', 2: 'C', 3: 'D' };
var explain = {
  1: { ok: 'Betul! Algoritma adalah langkah-langkah urut dan jelas untuk menyelesaikan suatu masalah.', no: 'Kurang tepat. Algoritma bukan hanya untuk komputer — resep masakan pun adalah algoritma!' },
  2: { ok: 'Tepat sekali! Belah ketupat menyatakan kondisi atau percabangan (Ya/Tidak).', no: 'Belum tepat. Coba ingat lagi: bentuk belah ketupat = pertanyaan = keputusan.' },
  3: { ok: 'Benar! Finiteness berarti algoritma pasti akan berhenti pada suatu titik, tidak berjalan selamanya.', no: 'Belum tepat. Finiteness = terbatas = pasti berakhir.' }
};
var simRunning = false;

function answer(q, opt) {
  if (answers[q] !== null) return;
  answers[q] = opt;
  var btns = document.querySelectorAll('#q' + q + ' .quiz-opt');
  btns.forEach(function(b) {
    var letter = b.textContent.trim().charAt(0);
    if (letter === correct[q]) b.classList.add('correct');
    else if (letter === opt && opt !== correct[q]) b.classList.add('wrong');
    b.disabled = true;
  });
  var fb = document.getElementById('fb' + q);
  var isOk = opt === correct[q];
  fb.textContent = (isOk ? '✅ ' : '❌ ') + explain[q][isOk ? 'ok' : 'no'];
  fb.className = 'feedback show ' + (isOk ? 'ok' : 'no');
  if (answers[1] !== null && answers[2] !== null && answers[3] !== null) {
    setTimeout(showScore, 600);
  }
}

function showScore() {
  var score = [1,2,3].filter(function(q){ return answers[q] === correct[q]; }).length;
  var box = document.getElementById('score-box');
  if (box) {
    document.getElementById('score-text').textContent = 'Skor kamu: ' + score + ' / 3';
    var msgs = ['Jangan menyerah, coba lagi ya! 💪', 'Lumayan! Baca ulang materinya dan coba lagi. 📖', 'Bagus sekali! Kamu sudah paham algoritma dengan baik. 🎉'];
    document.getElementById('score-msg').textContent = msgs[score];
    box.style.display = 'block';
  }
}

function resetQuiz() {
  answers = { 1: null, 2: null, 3: null };
  [1,2,3].forEach(function(q) {
    var btns = document.querySelectorAll('#q' + q + ' .quiz-opt');
    btns.forEach(function(b){ b.className = 'quiz-opt'; b.disabled = false; });
    var fb = document.getElementById('fb' + q);
    if (fb) {
      fb.className = 'feedback';
      fb.textContent = '';
    }
  });
  var scoreBox = document.getElementById('score-box');
  if (scoreBox) scoreBox.style.display = 'none';
}

function runSim() {
  if (simRunning) return;
  simRunning = true;
  var steps = document.querySelectorAll('.sim-step');
  steps.forEach(function(s){ s.className = 'sim-step'; });
  var simBtn = document.getElementById('simBtn');
  var simStatus = document.getElementById('simStatus');
  if (simBtn) simBtn.disabled = true;
  if (simStatus) simStatus.textContent = 'Menjalankan...';
  var i = 0;
  function next() {
    if (i > 0) steps[i-1].classList.remove('current');
    if (i > 0) steps[i-1].classList.add('done');
    if (i >= steps.length) {
      if (simStatus) simStatus.textContent = 'Selesai! ✅';
      if (simBtn) simBtn.disabled = false;
      simRunning = false;
      return;
    }
    steps[i].classList.add('current');
    steps[i].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    i++;
    setTimeout(next, 700);
  }
  next();
}
