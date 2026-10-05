export default class IceCreamShopIndustry {
  constructor() {
    this.gameManager = null;
    this.container = null;
    this.currentQuestionIndex = 0;
    this.showSubtitles = true;
    this.orderTicket = [];

    // 完整的菜單資料庫 (防止盲猜)
    this.menu = [
      { id: 'ice_cream', name: '🍦 香草冰淇淋 (Ice Cream)', price: 50, category: '冰品類' },
      { id: 'chocolate_ice', name: '🍨 巧克力冰 (Chocolate Ice)', price: 50, category: '冰品類' },
      { id: 'hot_chocolate', name: '☕ 熱可可 (Hot Chocolate)', price: 60, category: '熱飲類' },
      { id: 'hot_tea', name: '🍵 熱紅茶 (Hot Tea)', price: 40, category: '熱飲類' },
      { id: 'iced_juice', name: '🧃 冷果汁 (Iced Juice)', price: 45, category: '冷飲類' },
      { id: 'iced_coffee', name: '🥤 冰咖啡 (Iced Coffee)', price: 60, category: '冷飲類' },
      { id: 'soup', name: '🥣 熱湯 (Soup)', price: 55, category: '熱食類' },
      { id: 'cake', name: '🍰 蛋糕 (Cake)', price: 70, category: '點心類' }
    ];
  }

  init(gameManager, containerElement) {
    this.gameManager = gameManager;
    this.container = containerElement;
    this.render();
  }

  render() {
    const unit = this.gameManager.currentUnit;
    const dialogues = unit ? unit.dialogues : [];
    const question = dialogues[this.currentQuestionIndex];

    if (!question) {
      this.renderVictoryStage(unit);
      return;
    }

    this.container.innerHTML = `
      <div class="restaurant-stage">
        <div class="shop-header">
          <span>🏪 森林冰品飲料店 (櫃檯)</span>
          <span class="target-badge">🎯 目標營業額: $${unit.targetRevenue || 200}</span>
        </div>

        <div class="customer-area">
          <div class="animal-avatar">${question.animal || '🐻'}</div>
          <div style="font-weight:bold; margin-top: 4px;">${question.animalName || '顧客'}</div>
          
          <div class="speech-bubble">
            <div class="speech-text" id="subtitle-box">
              ${this.showSubtitles ? question.promptText : '<span class="subtitle-toggle-text">🙈 字幕已隱藏 (聽力挑戰中)</span>'}
            </div>
            <div class="audio-controls">
              <button id="speak-btn" class="action-btn">🔊 重聽語音</button>
              <button id="toggle-sub-btn" class="action-btn">👁️ ${this.showSubtitles ? '隱藏字幕' : '顯示字幕'}</button>
            </div>
          </div>
        </div>

        <div class="counter-desk">
          <button id="open-pos-btn" class="open-pos-btn">📱 打開 POS 點餐機點餐</button>
        </div>
      </div>
      <div id="modal-container"></div>
    `;

    document.getElementById('speak-btn').addEventListener('click', () => {
      this.gameManager.speak(question.audioText);
    });

    document.getElementById('toggle-sub-btn').addEventListener('click', () => {
      this.showSubtitles = !this.showSubtitles;
      this.render();
    });

    document.getElementById('open-pos-btn').addEventListener('click', () => {
      this.openPosModal(question);
    });

    this.gameManager.speak(question.audioText);
  }

  openPosModal(question) {
    const modalContainer = document.getElementById('modal-container');
    this.orderTicket = [];

    const categories = ['冰品類', '熱飲類', '冷飲類', '熱食類', '點心類'];

    modalContainer.innerHTML = `
      <div class="modal-overlay">
        <div class="pos-modal">
          <div class="pos-header">
            <span>📱 POS 點餐系統</span>
            <button id="close-pos-btn" class="close-btn">✕</button>
          </div>
          <div class="pos-body">
            <div class="menu-section">
              ${categories.map(cat => `
                <div class="menu-category">
                  <h4>${cat}</h4>
                  <div class="menu-grid">
                    ${this.menu.filter(m => m.category === cat).map(item => `
                      <div class="item-card" data-id="${item.id}">
                        <div class="item-name">${item.name}</div>
                        <div class="item-price">$${item.price}</div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="ticket-section">
              <h4>🛒 點餐清單</h4>
              <ul id="ticket-list" class="ticket-list"></ul>
              <div class="ticket-actions">
                <button id="clear-ticket-btn" class="btn-clear">清空</button>
                <button id="submit-ticket-btn" class="btn-submit">📥 送單結帳</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('close-pos-btn').addEventListener('click', () => {
      modalContainer.innerHTML = '';
    });

    modalContainer.querySelectorAll('.item-card').forEach(card => {
      card.addEventListener('click', () => {
        const itemId = card.getAttribute('data-id');
        const item = this.menu.find(m => m.id === itemId);
        if (item) {
          this.orderTicket.push(item);
          this.updateTicketUI();
        }
      });
    });

    document.getElementById('clear-ticket-btn').addEventListener('click', () => {
      this.orderTicket = [];
      this.updateTicketUI();
    });

    document.getElementById('submit-ticket-btn').addEventListener('click', () => {
      this.checkOrder(question);
    });
  }

  updateTicketUI() {
    const ticketList = document.getElementById('ticket-list');
    if (!ticketList) return;
    ticketList.innerHTML = this.orderTicket.map((item, index) => `
      <li class="ticket-item">
        <span>${item.name}</span>
        <span>$${item.price}</span>
      </li>
    `).join('');
  }

  checkOrder(question) {
    if (this.orderTicket.length === 0) {
      alert('⚠️ 點餐單是空的，請選擇餐點！');
      return;
    }

    const isCorrect = this.orderTicket.length === 1 && this.orderTicket[0].id === question.correctItemId;

    if (isCorrect) {
      const soldItem = this.orderTicket[0];
      alert(`🎉 答對了！${question.animalName}非常滿意！收到 $${soldItem.price}`);
      this.gameManager.addSale(soldItem.price, soldItem.id);
      document.getElementById('modal-container').innerHTML = '';
      this.currentQuestionIndex++;
      this.render();
    } else {
      alert(`❌ 點餐錯誤！${question.animalName}說：「这不是我點的，請重新幫我點一遍！」`);
      this.gameManager.speak(`No, thank you. That is not what I ordered.`);
      this.orderTicket = [];
      this.updateTicketUI();
    }
  }

  renderVictoryStage(unit) {
    this.container.innerHTML = `
      <div class="restaurant-stage victory-card">
        <h2>🎉 本店營運成功！目標營業額達標！</h2>
        <p style="font-size: 1.1rem; margin: 16px 0; color: #555;">
          恭喜你完成「${unit.title}」的所有顧客點餐！你已經賺取足夠的資金！
        </p>
        <div style="font-size: 60px; margin: 20px 0;">🎡 🦁 🌴</div>
        <p style="font-size: 1.1rem; font-weight: bold; color: #2a9d8f;">
          🔓 已成功解鎖下一個產業地點：【02_奇幻動物園】與【03_觀光景點】！
        </p>
        <button id="reset-btn" class="action-btn" style="margin-top:20px; padding: 12px 24px; font-size: 1rem;">🔄 重新經營此單元</button>
      </div>
    `;
    document.getElementById('reset-btn').addEventListener('click', () => {
      this.currentQuestionIndex = 0;
      this.render();
    });
  }

  destroy() {
    this.container.innerHTML = '';
  }
}
