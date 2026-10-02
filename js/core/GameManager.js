export default class GameManager {
  constructor() {
    this.coins = 100;
    this.starPoints = 0;
    this.currentCurriculum = null;
    this.currentUnit = null;
    this.unlockedIndustries = [];
    this.onStateChangeCallbacks = [];
  }

  subscribe(callback) {
    this.onStateChangeCallbacks.push(callback);
  }

  notify() {
    this.onStateChangeCallbacks.forEach(cb => cb(this));
  }

  setCurriculum(curriculumData) {
    this.currentCurriculum = curriculumData;
    if (curriculumData.units.length > 0) {
      this.selectUnit(curriculumData.units[0].unitId);
    }
  }

  selectUnit(unitId) {
    const unit = this.currentCurriculum.units.find(u => u.unitId === unitId);
    if (unit) {
      this.currentUnit = unit;
      if (!this.unlockedIndustries.includes(unit.targetIndustry)) {
        this.unlockedIndustries.push(unit.targetIndustry);
      }
      this.notify();
    }
  }

  addReward(coins, points) {
    this.coins += coins;
    this.starPoints += points;
    this.notify();
  }

  speak(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  }
}
