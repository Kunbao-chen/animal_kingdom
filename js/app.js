import { restaurantData } from './data/restaurant.js';
import { topic1ComprehensiveData } from './data/topic1_comprehensive.js';

// 關卡註冊表：未來只要在這裡註冊新的資料檔即可自動擴充
const LEVELS = {
    restaurant: restaurantData,
    topic1_comprehensive: topic1ComprehensiveData
};

class GameEngine {
    constructor() {
        this.currentLevelId = "restaurant";
        this.currentData = LEVELS[this.currentLevelId];
        this.scores = {}; // 紀錄各關卡獨立分數
        
        this.currentCustomer = null;
        this.selectedItem = null;
        this.targetSentenceText = "";
        this.recognition = null;
        this.isListening = false;
        this.speechTimeout = null;
        
        this.maxAttempts = 3;
        this.currentAttempt = 0;
        this.menuSelectionAttempts = 0;

        // 1. 初始化所有關卡的獨立計分
        this.loadScoresFromStorage();
        this.initSpeechRecognition();
        this.init();
    }

    // 從 LocalStorage 載入各關卡獨立分數
    loadScoresFromStorage() {
        Object.keys(LEVELS).forEach(levelId => {
            const savedScore = localStorage.getItem(`english_game_score_${levelId}`);
            this.scores[levelId] = savedScore !== null ? parseInt(savedScore) : 0;
        });
    }

    // 儲存當前關卡分數並更新介面
    saveCurrentScore() {
        localStorage.setItem(`english_game_score_${this.currentLevelId}`, this.scores[this.currentLevelId]);
        this.updateScoreUI();
    }

    // 更新畫面上的分數顯示
    updateScoreUI() {
        const scoreElement = document.getElementById("score");
        if (scoreElement) {
            scoreElement.innerText = this.scores[this.currentLevelId];
        }
    }

    // 切換關卡選單（確保分數、標題與主題同步切換）
    switchLevel(levelId) {
        if (!LEVELS[levelId]) return;
        this.currentLevelId = levelId;
        this.currentData = LEVELS[levelId];
        
        // 切換時立即更新該關卡的獨立分數與畫面
        this.updateScoreUI();
        this.loadTheme();
    }

    init() {
        this.updateScoreUI();
        this.loadTheme();
    }

    initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.lang = 'en-US';
            this.recognition.interimResults = false;
            this.recognition.maxAlternatives = 1;

            this.recognition.onstart = () => {
                this.isListening = true;
                const micBtn = document.getElementById("mic-btn");
                if (micBtn) {
                    micBtn.classList.add("listening");
                    micBtn.innerText = "🛑 Tap to Stop";
                }
                const recognizedEl = document.getElementById("recognized-text");
                if (recognizedEl) recognizedEl.innerText = "Listening to your voice...";

                clearTimeout(this.speechTimeout);
                this.speechTimeout = setTimeout(() => {
                    if (this.isListening) {
                        this.forceManualSuccess();
                    }
                }, 4000);
            };

            this.recognition.onresult = (event) => {
                clearTimeout(this.speechTimeout);
                const speechResult = event.results[0][0].transcript.toLowerCase();
                const recognizedEl = document.getElementById("recognized-text");
                if (recognizedEl) recognizedEl.innerText = `You said: "${speechResult}"`;
                this.verifySpeech(speechResult);
            };

            this.recognition.onerror = (event) => {
                clearTimeout(this.speechTimeout);
                console.warn("Speech recognition error:", event.error);
                this.forceManualSuccess();
            };

            this.recognition.onend = () => {
                clearTimeout(this.speechTimeout);
                this.resetMicBtn();
            };
        }
    }

    resetMicBtn() {
        this.isListening = false;
        const micBtn = document.getElementById("mic-btn");
        if (micBtn) {
            micBtn.classList.remove("listening");
            micBtn.innerText = "🎙️ Tap & Speak Now";
        }
    }

    loadTheme() {
        this.renderMenu(this.currentData.menu);
        this.nextCustomer();
    }

    renderMenu(menuItems) {
        const grid = document.getElementById("options-grid");
        if (!grid) return;
        grid.innerHTML = "";
        menuItems.forEach(item => {
            const btn = document.createElement("button");
            btn.className = "option-btn";
            btn.id = `menu-btn-${item.id}`;
            btn.innerText = item.name;
            btn.onclick = () => this.selectMenuItem(item, btn);
            grid.appendChild(btn);
        });
    }

    nextCustomer() {
        const customers = this.currentData.customers;
        const randomIndex = Math.floor(Math.random() * customers.length);
        this.currentCustomer = customers[randomIndex];
        this.currentAttempt = 0;
        this.menuSelectionAttempts = 0;
        
        const avatarEl = document.getElementById("npc-avatar");
        const speechTextEl = document.getElementById("speech-text");
        if (avatarEl) avatarEl.innerText = this.currentCustomer.avatar;
        if (speechTextEl) speechTextEl.innerText = `"${this.currentCustomer.text}"`;

        const feedbackEl = document.getElementById("feedback");
        const recognizedEl = document.getElementById("recognized-text");
        const attemptsEl = document.getElementById("attempts-left");
        if (feedbackEl) feedbackEl.innerText = "";
        if (recognizedEl) recognizedEl.innerText = "";
        if (attemptsEl) attemptsEl.innerText = "";
        
        const stepSpeaking = document.getElementById("step-speaking");
        const retryBtn = document.getElementById("retry-btn");
        const nextBtn = document.getElementById("next-btn");
        const micBtn = document.getElementById("mic-btn");

        if (stepSpeaking) stepSpeaking.style.display = "none";
        if (retryBtn) retryBtn.classList.remove("visible");
        if (nextBtn) nextBtn.classList.remove("visible");
        if (micBtn) micBtn.style.display = "inline-flex";

        const manualBtn = document.getElementById("manual-pass-btn");
        if (manualBtn) manualBtn.remove();

        document.querySelectorAll(".option-btn").forEach(btn => {
            btn.classList.remove("selected", "wrong-disabled");
            btn.disabled = false;
        });

        setTimeout(() => this.speakCustomerText(), 500);
    }

    speakCustomerText() {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(this.currentCustomer.text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    speakTargetSentence() {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(this.targetSentenceText);
        utterance.lang = 'en-US';
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
    }

    selectMenuItem(item, btnElement) {
        this.selectedItem = item;
        this.currentAttempt = 0;
        
        document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
        btnElement.classList.add("selected");

        const isMenuMatch = this.currentCustomer.requiredTags.every(tag => item.tags.includes(tag));
        const feedbackEl = document.getElementById("feedback");

        if (!isMenuMatch) {
            this.menuSelectionAttempts++;

            if (this.menuSelectionAttempts === 1) {
                btnElement.classList.add("wrong-disabled");
                btnElement.disabled = true;

                const hint = this.currentCustomer.hintText || "Try another choice!";
                if (feedbackEl) {
                    feedbackEl.innerText = `⚠️ Incorrect! Hint: "${hint}" Try picking another item!`;
                    feedbackEl.className = "feedback warning";
                }

                const hintSpeech = new SpeechSynthesisUtterance("Not quite! " + hint);
                hintSpeech.lang = 'en-US';
                window.speechSynthesis.speak(hintSpeech);

            } else {
                // 錯誤達兩次，扣除當前關卡分數
                this.scores[this.currentLevelId] = Math.max(0, this.scores[this.currentLevelId] - 1);
                this.saveCurrentScore();

                if (feedbackEl) {
                    feedbackEl.innerText = "❌ Wrong item again! " + this.currentCustomer.failText;
                    feedbackEl.className = "feedback error";
                }

                const sadUtterance = new SpeechSynthesisUtterance(this.currentCustomer.failText);
                sadUtterance.lang = 'en-US';
                window.speechSynthesis.speak(sadUtterance);

                document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true);
                const stepSpeaking = document.getElementById("step-speaking");
                const nextBtn = document.getElementById("next-btn");
                if (stepSpeaking) stepSpeaking.style.display = "none";
                if (nextBtn) nextBtn.classList.add("visible");
            }

        } else {
            if (feedbackEl) feedbackEl.innerText = "";
            const templates = this.currentData.sentenceTemplates;
            const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
            const itemWithArticle = item.article ? `${item.article} ${item.name}` : item.name;
            
            this.targetSentenceText = randomTemplate.replace("{item}", itemWithArticle);
            
            const targetSentenceEl = document.getElementById("target-sentence");
            const stepSpeaking = document.getElementById("step-speaking");
            const attemptsEl = document.getElementById("attempts-left");
            const retryBtn = document.getElementById("retry-btn");
            const micBtn = document.getElementById("mic-btn");
            const nextBtn = document.getElementById("next-btn");

            if (targetSentenceEl) targetSentenceEl.innerText = `"${this.targetSentenceText}"`;
            if (stepSpeaking) stepSpeaking.style.display = "block";
            if (attemptsEl) attemptsEl.innerText = `Attempts left: ${this.maxAttempts}`;
            
            if (retryBtn) retryBtn.classList.remove("visible");
            if (micBtn) micBtn.style.display = "inline-flex";
            if (nextBtn) nextBtn.classList.remove("visible");

            let manualBtn = document.getElementById("manual-pass-btn");
            if (!manualBtn) {
                manualBtn = document.createElement("button");
                manualBtn.id = "manual-pass-btn";
                manualBtn.innerText = "✅ I'm done speaking (Manual Pass)";
                manualBtn.style.cssText = "display: block; margin: 10px auto 0 auto; background: #10b981; color: white; border: none; padding: 8px 16px; border-radius: 20px; font-weight: bold; cursor: pointer; font-size: 0.9rem;";
                manualBtn.onclick = () => this.forceManualSuccess();
                const btnGroup = document.querySelector(".btn-group");
                if (btnGroup) btnGroup.after(manualBtn);
            }

            this.speakTargetSentence();
        }
    }

    startListening() {
        if (!this.recognition) {
            this.forceManualSuccess();
            return;
        }

        if (this.isListening) {
            this.forceManualSuccess();
            return;
        }

        window.speechSynthesis.cancel();
        try {
            this.recognition.start();
        } catch (e) {
            this.forceManualSuccess();
        }
    }

    forceManualSuccess() {
        if (this.recognition) {
            try { this.recognition.stop(); } catch(e) {}
        }
        this.resetMicBtn();
        
        const simulatedText = this.selectedItem.keywords.join(" ");
        const recognizedEl = document.getElementById("recognized-text");
        if (recognizedEl) recognizedEl.innerText = `(Manual Mode) Verified: "${this.selectedItem.name}"`;
        this.verifySpeech(simulatedText);
    }

    retrySpeaking() {
        const feedbackEl = document.getElementById("feedback");
        const retryBtn = document.getElementById("retry-btn");
        const micBtn = document.getElementById("mic-btn");

        if (feedbackEl) feedbackEl.innerText = "";
        if (retryBtn) retryBtn.classList.remove("visible");
        if (micBtn) micBtn.style.display = "inline-flex";
        this.speakTargetSentence();
    }

    verifySpeech(spokenText) {
        this.currentAttempt++;
        const allKeywordsPresent = this.selectedItem.keywords.every(keyword => spokenText.includes(keyword));

        const feedbackEl = document.getElementById("feedback");
        const remainingAttempts = this.maxAttempts - this.currentAttempt;

        if (allKeywordsPresent) {
            // 答對加分（針對當前關卡獨立加分）
            this.scores[this.currentLevelId] += 1;
            this.saveCurrentScore();

            if (feedbackEl) {
                feedbackEl.innerText = "✨ Excellent! " + this.currentCustomer.successText;
                feedbackEl.className = "feedback success";
            }
            
            const happyUtterance = new SpeechSynthesisUtterance("Yummy! Thank you!");
            happyUtterance.lang = 'en-US';
            window.speechSynthesis.speak(happyUtterance);

            this.finishRound();

        } else {
            if (remainingAttempts > 0) {
                if (feedbackEl) {
                    feedbackEl.innerText = `⚠️ Almost there! Try saying "${this.selectedItem.name}" clearly.`;
                    feedbackEl.className = "feedback error";
                }
                const attemptsEl = document.getElementById("attempts-left");
                if (attemptsEl) attemptsEl.innerText = `Attempts left: ${remainingAttempts}`;
                
                const micBtn = document.getElementById("mic-btn");
                const retryBtn = document.getElementById("retry-btn");
                if (micBtn) micBtn.style.display = "none";
                if (retryBtn) retryBtn.classList.add("visible");
            } else {
                // 嘗試次數用完，扣除當前關卡分數
                this.scores[this.currentLevelId] = Math.max(0, this.scores[this.currentLevelId] - 1);
                this.saveCurrentScore();

                if (feedbackEl) {
                    feedbackEl.innerText = `❌ Out of tries! The correct phrase is "${this.selectedItem.name}". (-1)`;
                    feedbackEl.className = "feedback error";
                }
                this.finishRound();
            }
        }
    }

    finishRound() {
        document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true);
        const micBtn = document.getElementById("mic-btn");
        const retryBtn = document.getElementById("retry-btn");
        const attemptsEl = document.getElementById("attempts-left");
        const nextBtn = document.getElementById("next-btn");

        if (micBtn) micBtn.style.display = "none";
        if (retryBtn) retryBtn.classList.remove("visible");
        const manualBtn = document.getElementById("manual-pass-btn");
        if (manualBtn) manualBtn.remove();
        if (attemptsEl) attemptsEl.innerText = "";
        if (nextBtn) nextBtn.classList.add("visible");
    }

    openRedeemModal() {
        const modalLevelName = document.getElementById("modal-level-name");
        const modalScore = document.getElementById("modal-score");
        const redeemInput = document.getElementById("redeem-input");
        const redeemModal = document.getElementById("redeem-modal");

        if (modalLevelName) modalLevelName.innerText = this.currentData.title;
        if (modalScore) modalScore.innerText = this.scores[this.currentLevelId];
        if (redeemInput) redeemInput.value = "";
        if (redeemModal) redeemModal.classList.add("active");
    }

    closeRedeemModal() {
        const redeemModal = document.getElementById("redeem-modal");
        if (redeemModal) redeemModal.classList.remove("active");
    }

    confirmRedeem() {
        const inputVal = parseInt(document.getElementById("redeem-input").value);
        const currentScore = this.scores[this.currentLevelId];

        if (isNaN(inputVal) || inputVal <= 0) {
            alert("Please enter a valid number!");
            return;
        }

        if (inputVal > currentScore) {
            alert("You don't have enough points in this level to redeem!");
            return;
        }

        // 扣除當前關卡的分數
        this.scores[this.currentLevelId] -= inputVal;
        this.saveCurrentScore();
        this.closeRedeemModal();
        alert(`🎉 Successfully redeemed ${inputVal} points from ${this.currentData.title}! Remaining score: ${this.scores[this.currentLevelId]}`);
    }
}

// 宣告全域綁定
window.game = new GameEngine();
