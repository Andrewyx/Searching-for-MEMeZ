import {TestLevel} from './levels/TestLevel.js';
import {StartLevel} from './levels/StartLevel.js';
import {resizeCanvas} from './engine/utils/CanvasUtils.js';
import { FirstLevel } from './levels/FirstLevel.js';
import { LevelManager } from './engine/LevelManager.js';
const canvas = document.getElementById("mainCanvas")

const ctx = canvas.getContext('2d');

// resize canvas to get better image quality
resizeCanvas(canvas, ctx);

window.addEventListener('resize', () => resizeCanvas(canvas, ctx));

// TestLevel.preload(() => console.log("All assets are loaded")).then(() => TestLevel.startLevel(ctx))
StartLevel.preload(() => console.log("All assets are loaded")).then(() => StartLevel.startLevel(ctx))

let lvl1 = new LevelManager("levelone1.html", FirstLevel, 0, 0, 1000, 1000);
