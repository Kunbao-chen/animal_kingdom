/**
 * Ice Cream Shop Industry Module
 * Cleaned POS Modal: English UI, SVG Icons, Coins-only tracking, and Half-Price Penalty logic.
 */

(function () {
  // Define Industry Module object
  const IceCreamShop = {
    id: "01_ice_cream_shop",
    name: "Ice Cream Shop",
    coins: 0,
    currentCustomerOrder: null,
    selectedItem: null,

    menu: [
      {
        id: "vanilla_ice_cream",
        name: "Vanilla Ice Cream",
        category: "Ice Cream",
        price: 50,
        svg: `<svg viewBox="0 0 100 100" class="pos-svg-icon"><polygon points="35,55 65,55 50,95" fill="#e3a054"/><path d="M35,55 Q50,60 65,55" fill="#c48037"/><circle cx="50" cy="40" r="22" fill="#fff8dc"/><circle cx="40" cy="45" r="12" fill="#fff8dc"/><circle cx="60" cy="45" r="12" fill="#fff8dc"/><circle cx="43" cy="38" r="2.5" fill="#333"/><circle cx="57" cy="38" r="2.5" fill="#333"/><path d="M47,43 Q50,46 53,43" stroke="#333" stroke-width="2" fill="none"/><circle cx="39" cy="42" r="3" fill="#ffb6c1"/><circle cx="61" cy="42" r="3" fill="#ffb6c1"/></svg>`
      },
      {
        id: "chocolate_ice_cream",
        name: "Chocolate Ice Cream",
        category: "Ice Cream",
        price: 50,
        svg: `<svg viewBox="0 0 100 100" class="pos-svg-icon"><polygon points="35,55 65,55 50,95" fill="#e3a054"/><circle cx="50" cy="40" r="22" fill="#6b3e2e"/><circle cx="40" cy="45" r="12" fill="#6b3e2e"/><circle cx="60" cy="45" r="12" fill="#6b3e2e"/><circle cx="50" cy="16" r="6" fill="#e71d36"/><circle cx="43" cy="38" r="2.5" fill="#fff"/><circle cx="57" cy="38" r="2.5" fill="#fff"/><path d="M47,43 Q50,47 53,43" stroke="#fff" stroke-width="2" fill="none"/></svg>`
      },
      {
        id: "hot_chocolate",
        name: "Hot Chocolate",
        category: "Hot Drinks",
        price: 60,
        svg: `<svg viewBox="0 0 100 100" class="pos-svg-icon"><rect x="25" y="35" width="45" height="50" rx="8" fill="#ff8b8b"/><path d="M70,45 C82,45 82,65 70,65" stroke="#ff8b8b" stroke-width="6" fill="none"/><rect x="27" y="37" width="41" height="10" rx="4" fill="#583101"/><path d="M38,25 Q43,18 38,12" stroke="#ddd" stroke-width="3" fill="none"/><path d="M57,25 Q62,18 57,12" stroke="#ddd" stroke-width="3" fill="none"/><circle cx="38" cy="58" r="3" fill="#fff"/><circle cx="58" cy="58" r="3" fill="#fff"/><path d="M45,64 Q48,68 51,64" stroke="#fff" stroke-width="2" fill="none"/></svg>`
      },
      {
        id: "hot_tea",
        name: "Hot Tea",
        category: "Hot Drinks",
        price: 40,
        svg: `<svg viewBox="0 0 100 100" class="pos-svg-icon"><path d="M25,35 L30,80 Q50,85 70,80 L75,35 Z" fill="#a8dadc"/><path d="M73,45 C83,45 83,63 72,63" stroke="#a8dadc" stroke-width="5" fill="none"/><path d="M50,35 L50,50 L42,58 L58,58 Z" fill="#ffb703"/><path d="M45,25 Q50,18 45,10" stroke="#ddd" stroke-width="3" fill="none"/><line x1="38" y1="52" x2="44" y2="52" stroke="#1d3557" stroke-width="2.5"/><line x1="56" y1="52" x2="62" y2="52" stroke="#1d3557" stroke-width="2.5"/><path d="M47,57 Q50,60 53,57" stroke="#1d3557" stroke-width="2" fill="none"/></svg>`
      },
      {
        id: "iced_juice",
        name: "Iced Juice",
        category: "Cold Drinks",
        price: 45,
        svg: `<svg viewBox="0 0 100 100" class="pos-svg-icon"><polygon points="30,25 70,25 62,85 38,85" fill="#ffb703"/><rect x="58" y="8" width="5" height="40" transform="rotate(15 58 8)" fill="#ff4d6d"/><rect x="38" y="40" width="12" height="12" rx="2" fill="#fff" opacity="0.6"/><circle cx="43" cy="60" r="3" fill="#333"/><circle cx="57" cy="60" r="3" fill="#333"/><path d="M47,66 Q50,70 53,66" stroke="#333" stroke-width="2.5" fill="none"/></svg>`
      },
      {
        id: "iced_coffee",
        name: "Iced Coffee",
        category: "Cold Drinks",
        price: 60,
        svg: `<svg viewBox="0 0 100 100" class="pos-svg-icon"><polygon points="30,25 70,25 62,85 38,85" fill="#7f5539"/><rect x="42" y="8" width="5" height="40" transform="rotate(-10 42 8)" fill="#dda15e"/><ellipse cx="50" cy="25" rx="20" ry="6" fill="#fff"/><circle cx="43" cy="55" r="3" fill="#fff"/><circle cx="57" cy="55" r="3" fill="#fff"/><path d="M47,61 Q50,65 53,61" stroke="#fff" stroke-width="2" fill="none"/></svg>`
      }
    ],

    init: function (container) {
      this.container = container || document.getElementById("game-container") || document.body;
      this.injectStyles();
      this.renderMainScene();
      this.renderPosModal();
      this.nextCustomer();
    },

    injectStyles: function () {
      if (document.getElementById("pos-custom-styles")) return;
      const style = document.createElement("style");
      style.id = "pos-custom-styles";
      style.innerHTML = `
        .industry-scene {
          width: 100%;
          height: 100%;
          min-height: 500px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #fceade;
          position: relative;
        }
        .dialogue-box {
          background: #ffffff;
          border: 3px solid #4a3429;
          border-radius: 16px;
          padding: 20px 30px;
          font-size: 1.2rem;
          font-weight: bold;
          color: #4a3429;
          margin-bottom: 20px;
          box-shadow: 0 6px 0 #4a3429;
          text-align: center;
          max-width: 80%;
        }
        .open-pos-btn {
          background-color: #ff9f1c;
          color: white;
          border: none;
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 1.2rem;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 4px 0 #c77700;
          transition: transform 0.1s;
        }
        .open-pos-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 #c77700; }
        .pos-modal-overlay {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          display: none;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .pos-modal-overlay.active { display: flex; }
        .pos-container {
          width: 820px;
          max-width: 95vw;
          height: 520px;
          background-color: #fffbf7;
          border-radius: 20px;
          border: 4px solid #4a3429;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
          font-family: 'Fredoka', Arial, sans-serif;
        }
        .pos-header {
          background-color: #4a3429;
          color: #fff;
          padding: 12px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .pos-coins-badge {
          background-color: #ff9f1c;
          color: #fff;
          padding: 6px 16px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 1.1rem;
          box-shadow: 0 3px 0 #c77700;
        }
        .pos-body { display: flex; flex: 1; padding: 16px; gap: 16px; overflow: hidden; }
        .pos-items-area { flex: 2; overflow-y: auto; padding-right: 8px; }
        .pos-category-title {
          font-size: 1.1rem; font-weight: bold; color: #8d5b4c;
          margin: 10px 0 8px 0; border-bottom: 2px dashed #e6c5b8;
        }
        .pos-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .pos-card {
          background: #ffffff; border: 2px solid #e6c5b8; border-radius: 14px;
          padding: 10px; display: flex; flex-direction: column; align-items: center;
          cursor: pointer; transition: all 0.15s ease; box-shadow: 0 4px 0 #e6c5b8;
        }
        .pos-card:hover { transform: translateY(-2px); border-color: #ff9f1c; box-shadow: 0 6px 0 #ff9f1c; }
        .pos-card.selected { border-color: #ff8b8b; background-color: #fff0f3; box-shadow: 0 4px 0 #ff8b8b; }
        .pos-svg-icon { width: 75px; height: 75px; margin-bottom: 4px; }
        .pos-card-name { font-weight: bold; font-size: 0.95rem; color: #4a3429; text-align: center; }
        .pos-card-price { color: #e71d36; font-weight: bold; font-size: 0.95rem; }
        .pos-order-sidebar {
          flex: 1; background: #ffffff; border: 2px solid #e6c5b8;
          border-radius: 14px; padding: 14px; display: flex; flex-direction: column;
        }
        .pos-order-title { font-size: 1.1rem; font-weight: bold; color: #4a3429; margin-bottom: 8px; }
        .pos-order-list { flex: 1; border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 8px 0; overflow-y: auto; }
        .pos-cart-item {
          display: flex; justify-content: space-between; background: #fff0f3;
          padding: 8px 12px; border-radius: 8px; font-weight: bold; color: #4a3429;
        }
        .pos-actions { display: flex; gap: 10px; margin-top: 12px; }
        .pos-btn {
          flex: 1; padding: 10px; border: none; border-radius: 10px;
          font-weight: bold; color: white; cursor: pointer; font-size: 0.95rem;
          box-shadow: 0 3px 0 rgba(0,0,0,0.15);
        }
        .pos-btn-clear { background-color: #ff8b8b; }
        .pos-btn-submit { background-color: #2ec4b6; }
        .pos-btn:active { transform: translateY(2px); box-shadow: none; }
        .pos-feedback {
          position: fixed; font-size: 2.2rem; font-weight: bold; pointer-events: none;
          animation: posFloatUp 1s forwards; z-index: 10000;
        }
        @keyframes posFloatUp {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-40px) scale(1.2); }
        }
      `;
      document.head.appendChild(style);
    },

    renderMainScene: function () {
      let scene = document.getElementById("industry-scene");
      if (!scene) {
        scene = document.createElement("div");
        scene.id = "industry-scene";
        scene.className = "industry-scene";
        this.container.appendChild(scene);
      }
      scene.innerHTML = `
        <div class="dialogue-box" id="customer-dialogue-text">Welcome! Loading order...</div>
        <button class="open-pos-btn" onclick="window.IceCreamShopInstance.openPos()">🛒 Open POS</button>
      `;
    },

    renderPosModal: function () {
      let overlay = document.getElementById("pos-modal-overlay");
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "pos-modal-overlay";
        overlay.className = "pos-modal-overlay";
        document.body.appendChild(overlay);
      }

      const categories = ["Ice Cream", "Hot Drinks", "Cold Drinks"];
      let categoriesHTML = categories.map(cat => {
        const items = this.menu.filter(item => item.category === cat);
        const itemsHTML = items.map(item => `
          <div class="pos-card" id="pos-item-${item.id}" onclick="window.IceCreamShopInstance.selectPosItem('${item.id}')">
            ${item.svg}
            <div class="pos-card-name">${item.name}</div>
            <div class="pos-card-price">$${item.price}</div>
          </div>
        `).join("");

        return `
          <div class="pos-category-title">${cat}</div>
          <div class="pos-grid">${itemsHTML}</div>
        `;
      }).join("");

      overlay.innerHTML = `
        <div class="pos-container">
          <div class="pos-header">
            <div style="font-size: 1.2rem; font-weight: bold;">🛒 POS System</div>
            <div class="pos-coins-badge">🪙 Coins: $<span id="pos-coins-display">${this.coins}</span></div>
            <button style="background:none; border:none; color:white; font-size:1.5rem; cursor:pointer;" onclick="window.IceCreamShopInstance.closePos()">×</button>
          </div>
          <div class="pos-body">
            <div class="pos-items-area">${categoriesHTML}</div>
            <div class="pos-order-sidebar">
              <div class="pos-order-title">🛒 Order List</div>
              <div id="pos-order-list" class="pos-order-list"></div>
              <div class="pos-actions">
                <button class="pos-btn pos-btn-clear" onclick="window.IceCreamShopInstance.clearCart()">Clear</button>
                <button class="pos-btn pos-btn-submit" onclick="window.IceCreamShopInstance.submitOrder(event)">Submit</button>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    openPos: function () {
      this.clearCart();
      document.getElementById("pos-modal-overlay").classList.add("active");
    },

    closePos: function () {
      document.getElementById("pos-modal-overlay").classList.remove("active");
    },

    selectPosItem: function (itemId) {
      const item = this.menu.find(i => i.id === itemId);
      if (!item) return;

      this.selectedItem = item;
      document.querySelectorAll(".pos-card").forEach(card => card.classList.remove("selected"));
      const cardEl = document.getElementById(`pos-item-${itemId}`);
      if (cardEl) cardEl.classList.add("selected");

      const listEl = document.getElementById("pos-order-list");
      listEl.innerHTML = `
        <div class="pos-cart-item">
          <span>${item.name}</span>
          <span>$${item.price}</span>
        </div>
      `;
    },

    clearCart: function () {
      this.selectedItem = null;
      document.querySelectorAll(".pos-card").forEach(card => card.classList.remove("selected"));
      const listEl = document.getElementById("pos-order-list");
      if (listEl) listEl.innerHTML = "";
    },

    submitOrder: function (event) {
      if (!this.selectedItem) return;

      const clickedItem = this.selectedItem;
      const isCorrect = this.currentCustomerOrder && (clickedItem.id === this.currentCustomerOrder.id);

      if (isCorrect) {
        const reward = clickedItem.price;
        this.coins += reward;
        this.showFeedback(`+$${reward}`, "#2ec4b6", event.clientX, event.clientY);
      } else {
        const penalty = Math.floor(clickedItem.price / 2);
        this.coins -= penalty;
        if (this.coins < 0) this.coins = 0;
        this.showFeedback(`-$${penalty}`, "#e71d36", event.clientX, event.clientY);
      }

      document.getElementById("pos-coins-display").innerText = this.coins;
      this.clearCart();
      this.closePos();
      this.handleDialogueResponse(isCorrect);
    },

    showFeedback: function (text, color, x, y) {
      const el = document.createElement("div");
      el.className = "pos-feedback";
      el.innerText = text;
      el.style.color = color;
      el.style.left = `${x || window.innerWidth / 2}px`;
      el.style.top = `${y || window.innerHeight / 2}px`;
      document.body.appendChild(el);

      setTimeout(() => { el.remove(); }, 1000);
    },

    nextCustomer: function () {
      const randomIdx = Math.floor(Math.random() * this.menu.length);
      this.currentCustomerOrder = this.menu[randomIdx];

      const dialogueBox = document.getElementById("customer-dialogue-text");
      if (dialogueBox) {
        dialogueBox.innerText = `Hello! I would like to order one ${this.currentCustomerOrder.name}, please.`;
      }
    },

    handleDialogueResponse: function (isCorrect) {
      const dialogueBox = document.getElementById("customer-dialogue-text");
      if (!dialogueBox) return;

      if (isCorrect) {
        dialogueBox.innerText = "Thank you! This is exactly what I wanted! 😄";
      } else {
        dialogueBox.innerText = `Oh no! I wanted ${this.currentCustomerOrder.name}, but you gave me this... 😢`;
      }

      setTimeout(() => {
        this.nextCustomer();
      }, 2000);
    }
  };

  // Bind instance globally and register into system
  window.IceCreamShopInstance = IceCreamShop;

  if (window.GameManager && typeof window.GameManager.registerModule === "function") {
    window.GameManager.registerModule("01_ice_cream_shop", IceCreamShop);
  } else {
    window["01_ice_cream_shop"] = IceCreamShop;
    window["IceCreamShopModule"] = IceCreamShop;
  }
})();
