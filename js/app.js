// 🎁 開啟簡化版兌換彈窗
    openRedeemModal() {
        document.getElementById("modal-score").innerText = this.score;
        document.getElementById("redeem-input").value = "";
        document.getElementById("redeem-modal").classList.add("active");
    }

    // 關閉彈窗
    closeRedeemModal() {
        document.getElementById("redeem-modal").classList.remove("active");
    }

    // 確認扣除指定積分
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
