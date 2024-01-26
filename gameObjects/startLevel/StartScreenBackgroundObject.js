import {GameObject} from "../../engine/GameObject.js";
import {createCacheCanvasCtx} from "../../engine/utils/CanvasUtils.js";
import {throttle} from "../../engine/utils/FunctionUtils.js";

/**
 * Background Character Matrix Effect
 */
export class StartScreenBackgroundObject extends GameObject {

    CLEAR_COLOR = "rgba(0, 0, 0, .1)";
    wordColor = "#33ff33";
    CHARS = "10";
    CHARS_ARR = this.CHARS.split('');
    fontSize = 16;
    // number of columns
    nCol = 100;
    drops = [];
    cacheCtx;

    /**
     * Create a background object
     * @param x x coordinate
     * @param y y coordinate
     * @param width width
     * @param height height
     * @param fontSize fontSize
     * @param wordColor color of word
     * @param nCol number of columns
     */
    constructor(x, y, width, height, fontSize = 16, wordColor = "#33ff33", nCol = undefined) {
        super("start_screen_background", x, y, width, height, undefined);
        if (nCol === undefined || nCol === null) this.nCol = width / fontSize;
        this.fontSize = fontSize;
        this.wordColor = wordColor;

        // initialize all drops
        for (let i = 0; i < this.nCol; i++) {
            this.drops[i] = 1;
        }
        this.cacheCtx = createCacheCanvasCtx(width, height);
    }

    render(ctx) {
        if (!this.hidden) {
            this.cacheCtx.fillStyle = this.CLEAR_COLOR;
            this.cacheCtx.fillRect(this.x, this.y, this.width, this.height);

            this.cacheCtx.save();
            this.cacheCtx.fillStyle = this.wordColor;
            this.cacheCtx.font = this.fontSize + "px arial";
            for (let i = 0; i < this.drops.length; i++) {
                let text = this.CHARS_ARR[Math.floor(Math.random() * this.CHARS_ARR.length)];
                this.cacheCtx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
                if (this.drops[i] * this.fontSize > this.height && Math.random() > 0.98) {
                    this.drops[i] = 0;
                }
                this.drops[i] += 1;
            }
            this.cacheCtx.restore();
            ctx.drawImage(this.cacheCtx.canvas, this.x, this.y, this.width, this.height);
        }
    }

    update() {
    }
}