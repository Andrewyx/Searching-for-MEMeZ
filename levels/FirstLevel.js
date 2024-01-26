import {BaseLevel} from "./BaseLevel.js";
import {GameObjectManager} from "../engine/GameObjectManager.js";

/**
 * Start scene
 * 
 * Scene Details:
 * 
 * 3 Part Level Design, using generic platformer content!
 * Consider using Mario style level design and principles, feature windows 10 style design for thematic purposes
 * 
 * 
 */
export class FirstLevel extends BaseLevel {

    static backgroundObj;

    static firstLevel(ctx) {
        console.log("Start Level Init");
        FirstLevel.backgroundObj = new StartScreenBackgroundObject(0, 0, ctx.canvas.width, ctx.canvas.height);
        GameObjectManager.registerGameObject(FirstLevel.backgroundObj);

        // start to render the level
        FirstLevel.updateLevel(ctx);
    }

    static updateLevel(ctx) {
        GameObjectManager.renderGameObjectsByFrame(ctx);
        window.requestAnimationFrame(() => this.updateLevel(ctx));
    }
}