export default class IceCreamShopIndustry {
  constructor() {
    this.gameManager = null;
    this.container = null;
    this.currentQuestionIndex = 0;
  }

  init(gameManager, containerElement) {
    this.gameManager = gameManager;
    this.container = containerElement;
    this.render();
  }

  render() {
    const currentUnit = this.gameManager.currentUnit;
    const dialogues = currentUnit ? currentUnit.dialogues : [];
    const question = dialogues[this.currentQuestionIndex];

    if (!question) {
      this.container.innerHTML = `
        <div class="shop-card">
          <h2>🍦 森林冰品店</h2>
          <p style="font-size: 1.1rem; margin: 16px 0; color: #555;">🎉 太棒了！這個單元的顧客點餐練習已經全部完成囉！</p>
          <button id="reset-btn" class="primary-btn">🔄 重新練習此單元</button>
        </div>
      `;
      document.getElementById('reset-btn').addEventListener('click', () => {
        this.currentQuestionIndex = 0;
        this.render();
      });
      return;
    }

    this.container.innerHTML = `
      <div class="shop-card">
        <h2>🍦 森林冰品店</h2>
        <div class="animal-customer">
          <span class="avatar">🐻</span>
          <div class="speech-bubble">
            <p>${question.prompt}</p>
            <button id="speak-btn" class="speak-btn">🔊 聽語音點餐</button>
          </div>
        </div>

        <div class="options-group">
          <h3>請根據英文選擇正確出餐：</h3>
          ${question.options.map(opt => `<button class="option-btn" data-val="${opt}">${opt}</button>`).join('')}
        </div>
      </div>
    `;

    const speakBtn = document.getElementById('speak-btn');
    speakBtn.addEventListener('click', () => {
      this.gameManager.speak(question.audioText);
    });

    this.gameManager.speak(question.audioText);

    this.container.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selected = e.target.getAttribute('data-val');
        this.checkAnswer(selected, question.correct);
      });
    });
  }

  checkAnswer(selected, correct) {
    if (selected === correct) {
      alert('🎉 答對了！小熊顧客非常滿意！');
      this.gameManager.addReward(20, 10);
      this.currentQuestionIndex++;
      this.render();
    } else {
      alert(`❌ 哦不！顧客要的是 ${correct}，你給了 ${selected}。再試一次吧！`);
      this.gameManager.speak(`No, thank you. I want ${correct}.`);
    }
  }

  destroy() {
    this.container.innerHTML = '';
  }
}
