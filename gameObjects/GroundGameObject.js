import {GameObject} from "../engine/GameObject.js";
import {AssetManager} from "../engine/AssetManager.js";

/**
 * Ground
 */
export class GroundGameObject extends GameObject{
    constructor(name, x, y, width, height) {
        const rigidBody = Matter.Bodies.rectangle(x, y, width, height, {isStatic: true});
        super(name, x, y, width, height, rigidBody);
    }

    render(ctx) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.fill(AssetManager.assets.get("tests/testObj.png"), this.x, this.y, this.width, this.height);
    }
}