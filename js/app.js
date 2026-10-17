import { GAME_DATABASE } from './data.js';

class GameEngine {
    constructor() {
        this.score = 0;
        this.currentTheme = "restaurant";
        this.currentCustomer = null;
        this.selectedItem = null;
        this.targetSentenceText = "";
        this.recognition = null;
        this.isListening = false; // 紀錄目前是否正在錄音
        this.speechTimeout = null; // 6秒強制切斷計時器
        
        this.maxAttempts = 3;
        this.currentAttempt = 0;
        this.menuSelectionAttempts = 0;

        this.initSpeechRecognition();
        this.init();
    }

    init() {
        this.loadTheme(this.currentTheme);
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
                micBtn.innerText = "🛑 Tap to Stop & Check"; // 提示使用者可以再按一次手動停止
                document.getElementById("recognized-text").innerText = "Listening to your voice...";

                // 🛡️ 防護機制：6 秒後如果還沒自動停止，強制停止並結算
                clearTimeout(this.speechTimeout);
                this.speechTimeout = setTimeout(() => {
                    if (this.isListening) {
                        console.log("Speech recognition timed out. Stopping automatically.");
                        this.stopListening();
                    }
                }, 6000);
            };

            this.recognition.onresult = (event) => {
                clearTimeout(this.speechTimeout);
                const speechResult = event.results[0][0].transcript.toLowerCase();
                document.getElementById("recognized-text").innerText = `You said: "${speechResult}"`;
                this.verifySpeech(speechResult);
            };

            this.recognition.onerror = (event) => {
                clearTimeout(this.speechTimeout);
                console.error("Speech recognition error:", event.error);
                if (event.error !== 'no-speech') {
                    document.getElementById("recognized-text").innerText = "Could not hear clearly, please try again!";
                }
                this.resetMicBtn();
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

    loadTheme(themeKey) {
        const theme = GAME_DATABASE[themeKey];
        this.renderMenu(theme.menu);
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
        const theme = GAME_DATABASE[this.currentTheme];
        const randomIndex = Math.floor(Math.random() * theme.customers.length);
        this.currentCustomer = theme.customers[randomIndex];
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
                this.score -= 1;
                document.getElementById("score").innerText = this.score;

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
            const templates = GAME_DATABASE.restaurant.sentenceTemplates;
            const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
            const itemWithArticle = `${item.article} ${item.name}`;
            
            this.targetSentenceText = randomTemplate.replace("{item}", itemWithArticle);
            
            document.getElementById("target-sentence").innerText = `"${this.targetSentenceText}"`;
            document.getElementById("step-speaking").style.display = "block";
            document.getElementById("attempts-left").innerText = `Attempts left: ${this.maxAttempts}`;
            
            document.getElementById("retry-btn").classList.remove("visible");
            document.getElementById("mic-btn").style.display = "inline-flex";
            document.getElementById("next-btn").classList.remove("visible");

            this.speakTargetSentence();
        }
    }

    startListening() {
        if (!this.recognition) {
            alert("Speech Recognition is not supported or blocked in this browser.");
            return;
        }

        // 💡 如果目前正在錄音，再點一次代表手動停止並結算！
        if (this.isListening) {
            this.stopListening();
            return;
        }

        window.speechSynthesis.cancel();
        try {
            this.recognition.start();
        } catch (e) {
            console.warn("Recognition already started, restarting...", e);
            this.recognition.stop();
            setTimeout(() => this.recognition.start(), 200);
        }
    }

    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            document.getElementById("recognized-text").innerText = "Processing your speech...";
        }
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
            this.score += 1;
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
                this.score -= 1;
                feedbackEl.innerText = `❌ Out of tries! The correct phrase is "${this.selectedItem.name}". (-1)`;
                feedbackEl.className = "feedback error";
                this.finishRound();
            }
        }

        document.getElementById("score").innerText = this.score;
    }

    finishRound() {
        document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true);
        document.getElementById("mic-btn").style.display = "none";
        document.getElementById("retry-btn").classList.remove("visible");
        document.getElementById("attempts-left").innerText = "";
        document.getElementById("next-btn").classList.add("visible");
    }

    openRedeemModal() {
        document.getElementById("modal-score").innerText = this.score;
        document.getElementById("redeem-input").value = "";
        document.getElementById("redeem-modal").classList.add("active");
    }

    closeRedeemModal() {
        document.getElementById("redeem-modal").classList.remove("active");
    }

    confirmRedeem() {
        const inputVal = parseInt(document.getElementById("redeem-input").value);
        
        if (isNaN(inputVal) || inputVal <= 0) {
            alert("Please enter a valid number!");
            return;
        }

        if (inputVal > this.score) {
            alert("You don't have enough points to redeem!");
            return;
        }

        this.score -= inputVal;
        document.getElementById("score").innerText = this.score;
        this.closeRedeemModal();
        alert(`🎉 Successfully redeemed ${inputVal} points! Remaining score: ${this.score}`);
    }
}

// 宣告全域 game 物件供 HTML 按鈕呼叫
window.game = new GameEngine();
