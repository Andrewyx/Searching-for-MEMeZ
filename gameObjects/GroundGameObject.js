import {GameObject} from "../engine/GameObject.js";
import {getRectRigidBody} from "../engine/utils/RigidBodyUtils.js";

/**
 * Ground
 */
export class GroundGameObject extends GameObject {
    constructor(name, x, y, width, height) {
        const rigidBody = getRectRigidBody(x, y, width, height, {
            isStatic: true,
            frictionAir: 0,
            friction:0,
            staticFriction:0
        })
        super(name, x, y, width, height, rigidBody);
    }

    render(ctx) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}