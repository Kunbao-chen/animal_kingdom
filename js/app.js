class GameEngine {
    constructor() {
        this.score = 0;
        this.currentTheme = "restaurant";
        this.currentCustomer = null;
        this.selectedItem = null;
        this.targetSentenceText = "";
        this.recognition = null;
        
        this.maxAttempts = 3;
        this.currentAttempt = 0;
        this.isInitialized = false;

        this.initSpeechRecognition();
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
                const micBtn = document.getElementById("mic-btn");
                micBtn.classList.add("listening");
                micBtn.innerText = "🎙️ Listening...";
                document.getElementById("recognized-text").innerText = "Listening to your voice...";
            };

            this.recognition.onresult = (event) => {
                const speechResult = event.results[0][0].transcript.toLowerCase();
                document.getElementById("recognized-text").innerText = `You said: "${speechResult}"`;
                this.verifySpeech(speechResult);
            };

            this.recognition.onerror = (event) => {
                console.error("Speech recognition error:", event.error);
                document.getElementById("recognized-text").innerText = "Could not hear clearly, please try again!";
                this.resetMicBtn();
            };

            this.recognition.onend = () => {
                this.resetMicBtn();
            };
        }
    }

    resetMicBtn() {
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
            btn.classList.remove("selected");
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

    // 💡 關鍵改動：點選餐點時「即時檢查屬性」
    selectMenuItem(item, btnElement) {
        this.selectedItem = item;
        this.currentAttempt = 0;
        
        document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
        btnElement.classList.add("selected");

        // 檢查餐點是否滿足顧客的 requiredTags
        const isMenuMatch = this.currentCustomer.requiredTags.every(tag => item.tags.includes(tag));

        const feedbackEl = document.getElementById("feedback");

        if (!isMenuMatch) {
            // ❌ 第一時間發現點錯：直接扣 1 分，給予失敗語音，阻擋進入 Step 2 口說！
            this.score -= 1;
            document.getElementById("score").innerText = this.score;

            feedbackEl.innerText = "❌ Wrong item! " + this.currentCustomer.failText;
            feedbackEl.className = "feedback error";

            // 顧客講話回應
            const sadUtterance = new SpeechSynthesisUtterance(this.currentCustomer.failText);
            sadUtterance.lang = 'en-US';
            window.speechSynthesis.speak(sadUtterance);

            // 鎖定選單並顯示「Next Customer」按鈕
            document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true);
            document.getElementById("step-speaking").style.display = "none";
            document.getElementById("next-btn").classList.add("visible");

        } else {
            // ✅ 點對餐點：進入 Step 2 口說階段，朗讀英文推薦句
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
        if (this.recognition) {
            window.speechSynthesis.cancel();
            this.recognition.start();
        } else {
            alert("Speech Recognition is not supported or blocked in this browser.");
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
}

const game = new GameEngine();

function startApp() {
    if (!game.isInitialized) {
        game.init();
        game.isInitialized = true;
    }
}

if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(startApp, 100);
} else {
    document.addEventListener("DOMContentLoaded", startApp);
}
