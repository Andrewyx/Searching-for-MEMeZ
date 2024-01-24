import {GameObject} from "../engine/GameObject.js";
import {AssetManager} from "../engine/AssetManager.js";
import '../engine/utils/matter.js';
import {getRectRigidBody} from "../engine/utils/RigidBodyUtils.js";

export class TestGameObject extends GameObject {

    // is the object on ground
    onGround = true;

    constructor() {
        const rigidBody = getRectRigidBody(250, 0, 50, 50, {
            friction: 0,
            frictionStatic: 0,
            frictionAir: 0,
            staticFriction:0,
            inertia: Infinity
        });
        super("test", 250, 0, 50, 50, rigidBody);
    }

    render(ctx) {
        // ctx.fillStyle = "yellow";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(AssetManager.assets.get("tests/testObj.png"), this.x, this.y, this.width, this.height);
    }

    update() {
        super.update();
    }
}