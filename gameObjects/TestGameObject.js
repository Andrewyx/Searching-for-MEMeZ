import {GameObject} from "../engine/GameObject.js";

export class TestGameObject extends GameObject {

    constructor() {
        super("test", 10, 10, 100, 100);
    }

    render(ctx) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}