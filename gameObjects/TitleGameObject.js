import {GameObject} from "/engine/GameObject.js";
import '../engine/utils/matter.js';

/**
 * Title Text Game Object
 */
export class TitleGameObject extends GameObject {

    color;
    text;
    fontSize;
    font;
    fadeIn;
    fadeOut;
    fadeValue;
    increasingOpacity = true;

    /**
     * Create a title game object
     * @param name name of the game object
     * @param x x coordinate
     * @param y y coordinate
     * @param color text color
     * @param text content
     * @param fontSize font size
     * @param font type of font
     * @param fadeIn whether use the fadeIn animation
     * @param fadeOut whether use the fadeOut animation
     */
    constructor(name, x, y, color, text, fontSize, font, fadeIn = false, fadeOut = false) {
        super(name, x, y, -1, -1, undefined);
        this.color = color;
        this.text = text;
        this.fontSize = fontSize;
        this.font = font;
        this.fadeIn = fadeIn;
        this.fadeOut = fadeOut;
        this.fadeValue = 0;
    }

    render(ctx) {
        if (this.hidden) return;
        if (this.fadeIn && this.increasingOpacity) {
            ctx.globalAlpha = this.fadeValue;
            if (this.fadeValue + 0.01 < 0.9) {
                this.fadeValue += 0.01;
            }else {
                this.increasingOpacity = false;
            }
        }

        if (this.fadeOut && !this.increasingOpacity) {
            ctx.globalAlpha = this.fadeValue;
            if (this.fadeValue - 0.01 > 0) {
                this.fadeValue -= 0.01;
            }else {
                this.increasingOpacity = true;
            }
        }
        ctx.fillStyle = this.color;
        ctx.font = this.fontSize + "px " + this.font;
        ctx.fillText(this.text, this.x, this.y);
        ctx.globalAlpha = 1;
    }

    update() {
        super.update();
    }

    /**
     * return the width of the text
     * @param ctx
     * @return {number} width in pixels
     */
    getTextWidth(ctx) {
        ctx.font = this.fontSize + "px " + this.font;
        return ctx.measureText(this.text).width;
    }
}