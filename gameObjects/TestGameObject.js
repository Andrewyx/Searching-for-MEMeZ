import {GameObject} from "../engine/GameObject.js";
import {AssetManager} from "../engine/AssetManager.js";
import '../engine/utils/matter.js';
import {getRectRigidBody} from "../engine/utils/RigidBodyUtils.js";

export class TestGameObject extends GameObject {

    constructor() {
        const rigidBody = getRectRigidBody(0, 0, 50, 50);
        super("test", 0, 0, 50, 50, rigidBody);
    }

    render(ctx) {
        // ctx.fillStyle = "yellow";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(AssetManager.assets.get("tests/testObj.png"), this.x, this.y, this.width, this.height);
    }
}