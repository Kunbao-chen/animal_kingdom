import GameManager from './core/GameManager.js';
import ModuleLoader from './core/ModuleLoader.js';

const gameManager = new GameManager();
let currentIndustryInstance = null;

async function initApp() {
  gameManager.subscribe(updateTopBar);

  try {
    const resp = await fetch('./data/curriculum_hanlin_p5.json');
    const curriculumData = await resp.json();
    gameManager.setCurriculum(curriculumData);

    const selectEl = document.getElementById('unit-select');
    selectEl.innerHTML = curriculumData.units.map(u => 
      `<option value="${u.unitId}">${u.title}</option>`
    ).join('');

    selectEl.addEventListener('change', (e) => {
      gameManager.selectUnit(e.target.value);
      switchIndustryForCurrentUnit();
    });

    switchIndustryForCurrentUnit();
  } catch (err) {
    console.error("載入課綱資料失敗:", err);
  }
}

async function switchIndustryForCurrentUnit() {
  const stage = document.getElementById('game-stage');
  const unit = gameManager.currentUnit;

  if (!unit) return;

  if (currentIndustryInstance && currentIndustryInstance.destroy) {
    currentIndustryInstance.destroy();
  }

  const IndustryClass = await ModuleLoader.loadIndustryModule(`01_${unit.targetIndustry}`);
  if (IndustryClass) {
    currentIndustryInstance = new IndustryClass();
    currentIndustryInstance.init(gameManager, stage);
  } else {
    stage.innerHTML = `<div class="error">該產業模組 (01_${unit.targetIndustry}) 尚未安裝。</div>`;
  }
}

function updateTopBar(gm) {
  document.getElementById('coin-count').innerText = gm.totalRevenue;
  document.getElementById('point-count').innerText = gm.starPoints;
}

window.addEventListener('DOMContentLoaded', initApp);
