import {TestLevel} from './levels/TestLevel.js';
import {resizeCanvas} from './engine/utils/CanvasUtils.js';

const canvas = document.getElementById("mainCanvas")

const ctx = canvas.getContext('2d');

// resize canvas to get better image quality
resizeCanvas(canvas, ctx);
window.addEventListener('resize', () => resizeCanvas(canvas, ctx));

TestLevel.preload(() => console.log("All assets are loaded")).then(() => TestLevel.startLevel(ctx))