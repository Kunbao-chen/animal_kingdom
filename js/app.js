import { restaurantData } from './data/restaurant.js';
import { topic1ComprehensiveData } from './data/topic1_comprehensive.js';

const LEVELS = {
    restaurant: restaurantData,
    topic1_comprehensive: topic1ComprehensiveData
};;

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

        this.loadScoresFromStorage();
        this.initSpeechRecognition();
        this.init();
    }

    // 載入與儲存獨立積分 (LocalStorage)
    loadScoresFromStorage() {
        Object.keys(LEVELS).forEach(levelId => {
            const savedScore = localStorage.getItem(`english_game_score_${levelId}`);
            this.scores[levelId] = savedScore !== null ? parseInt(savedScore) : 0;
        });
    }

    saveCurrentScore() {
        localStorage.setItem(`english_game_score_${this.currentLevelId}`, this.scores[this.currentLevelId]);
        this.updateScoreUI();
    }

    updateScoreUI() {
        document.getElementById("score").innerText = this.scores[this.currentLevelId];
    }

    // 切換關卡選單
    switchLevel(levelId) {
        if (!LEVELS[levelId]) return;
        this.currentLevelId = levelId;
        this.currentData = LEVELS[levelId];
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
                micBtn.classList.add("listening");
                micBtn.innerText = "🛑 Tap to Stop";
                document.getElementById("recognized-text").innerText = "Listening to your voice...";

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
                document.getElementById("recognized-text").innerText = `You said: "${speechResult}"`;
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
        micBtn.classList.remove("listening");
        micBtn.innerText = "🎙️ Tap & Speak Now";
    }

    loadTheme() {
        this.renderMenu(this.currentData.menu);
        this.nextCustomer();
    }

    renderMenu(menuItems) {
        const grid = document.getElementById("options-grid");
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
        
        document.getElementById("npc-avatar").innerText = this.currentCustomer.avatar;
        document.getElementById("speech-text").innerText = `"${this.currentCustomer.text}"`;
        document.getElementById("feedback").innerText = "";
        document.getElementById("recognized-text").innerText = "";
        document.getElementById("attempts-left").innerText = "";
        
        document.getElementById("step-speaking").style.display = "none";
        document.getElementById("retry-btn").classList.remove("visible");
        document.getElementById("next-btn").classList.remove("visible");
        document.getElementById("mic-btn").style.display = "inline-flex";

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
                feedbackEl.innerText = `⚠️ Incorrect! Hint: "${hint}" Try picking another item!`;
                feedbackEl.className = "feedback warning";

                const hintSpeech = new SpeechSynthesisUtterance("Not quite! " + hint);
                hintSpeech.lang = 'en-US';
                window.speechSynthesis.speak(hintSpeech);

            } else {
                this.scores[this.currentLevelId] = Math.max(0, this.scores[this.currentLevelId] - 1);
                this.saveCurrentScore();

                feedbackEl.innerText = "❌ Wrong item again! " + this.currentCustomer.failText;
                feedbackEl.className = "feedback error";

                const sadUtterance = new SpeechSynthesisUtterance(this.currentCustomer.failText);
                sadUtterance.lang = 'en-US';
                window.speechSynthesis.speak(sadUtterance);

                document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true);
                document.getElementById("step-speaking").style.display = "none";
                document.getElementById("next-btn").classList.add("visible");
            }

        } else {
            feedbackEl.innerText = "";
            const templates = this.currentData.sentenceTemplates;
            const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
            const itemWithArticle = `${item.article} ${item.name}`;
            
            this.targetSentenceText = randomTemplate.replace("{item}", itemWithArticle);
            
            document.getElementById("target-sentence").innerText = `"${this.targetSentenceText}"`;
            document.getElementById("step-speaking").style.display = "block";
            document.getElementById("attempts-left").innerText = `Attempts left: ${this.maxAttempts}`;
            
            document.getElementById("retry-btn").classList.remove("visible");
            document.getElementById("mic-btn").style.display = "inline-flex";
            document.getElementById("next-btn").classList.remove("visible");

            let manualBtn = document.getElementById("manual-pass-btn");
            if (!manualBtn) {
                manualBtn = document.createElement("button");
                manualBtn.id = "manual-pass-btn";
                manualBtn.innerText = "✅ I'm done speaking (Manual Pass)";
                manualBtn.style.cssText = "display: block; margin: 10px auto 0 auto; background: #10b981; color: white; border: none; padding: 8px 16px; border-radius: 20px; font-weight: bold; cursor: pointer; font-size: 0.9rem;";
                manualBtn.onclick = () => this.forceManualSuccess();
                document.querySelector(".btn-group").after(manualBtn);
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
        document.getElementById("recognized-text").innerText = `(Manual Mode) Verified: "${this.selectedItem.name}"`;
        this.verifySpeech(simulatedText);
    }

    retrySpeaking() {
        document.getElementById("feedback").innerText = "";
        document.getElementById("retry-btn").classList.remove("visible");
        document.getElementById("mic-btn").style.display = "inline-flex";
        this.speakTargetSentence();
    }

    verifySpeech(spokenText) {
        this.currentAttempt++;
        const allKeywordsPresent = this.selectedItem.keywords.every(keyword => spokenText.includes(keyword));

        const feedbackEl = document.getElementById("feedback");
        const remainingAttempts = this.maxAttempts - this.currentAttempt;

        if (allKeywordsPresent) {
            this.scores[this.currentLevelId] += 1;
            this.saveCurrentScore();

            feedbackEl.innerText = "✨ Excellent! " + this.currentCustomer.successText;
            feedbackEl.className = "feedback success";
            
            const happyUtterance = new SpeechSynthesisUtterance("Yummy! Thank you!");
            happyUtterance.lang = 'en-US';
            window.speechSynthesis.speak(happyUtterance);

            this.finishRound();

        } else {
            if (remainingAttempts > 0) {
                feedbackEl.innerText = `⚠️ Almost there! Try saying "${this.selectedItem.name}" clearly.`;
                feedbackEl.className = "feedback error";
                document.getElementById("attempts-left").innerText = `Attempts left: ${remainingAttempts}`;
                
                document.getElementById("mic-btn").style.display = "none";
                document.getElementById("retry-btn").classList.add("visible");
            } else {
                this.scores[this.currentLevelId] = Math.max(0, this.scores[this.currentLevelId] - 1);
                this.saveCurrentScore();

                feedbackEl.innerText = `❌ Out of tries! The correct phrase is "${this.selectedItem.name}". (-1)`;
                feedbackEl.className = "feedback error";
                this.finishRound();
            }
        }
    }

    finishRound() {
        document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true);
        document.getElementById("mic-btn").style.display = "none";
        document.getElementById("retry-btn").classList.remove("visible");
        const manualBtn = document.getElementById("manual-pass-btn");
        if (manualBtn) manualBtn.remove();
        document.getElementById("attempts-left").innerText = "";
        document.getElementById("next-btn").classList.add("visible");
    }

    openRedeemModal() {
        document.getElementById("modal-level-name").innerText = this.currentData.title;
        document.getElementById("modal-score").innerText = this.scores[this.currentLevelId];
        document.getElementById("redeem-input").value = "";
        document.getElementById("redeem-modal").classList.add("active");
    }

    closeRedeemModal() {
        document.getElementById("redeem-modal").classList.remove("active");
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

        this.scores[this.currentLevelId] -= inputVal;
        this.saveCurrentScore();
        this.closeRedeemModal();
        alert(`🎉 Successfully redeemed ${inputVal} points from ${this.currentData.title}! Remaining score: ${this.scores[this.currentLevelId]}`);
    }
}

// 宣告全域綁定
window.game = new GameEngine();
