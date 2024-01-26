import {BaseLevel} from "./BaseLevel.js";
import {GameObjectManager} from "../engine/GameObjectManager.js";
import {StartScreenBackgroundObject} from "../gameObjects/startLevel/StartScreenBackgroundObject.js";
import { FirstLevel } from "./FirstLevel.js";
/**
 * Start scene
 */
export class StartLevel extends BaseLevel {

    static backgroundObj;

    static startLevel(ctx) {
        console.log("Start Level Init");
        StartLevel.backgroundObj = new StartScreenBackgroundObject(0, 0, ctx.canvas.width, ctx.canvas.height);
        GameObjectManager.registerGameObject(StartLevel.backgroundObj);

        // start to render the level
        
        StartLevel.updateLevel(ctx);
    }

    static updateLevel(ctx) {
        GameObjectManager.renderGameObjectsByFrame(ctx);
        window.requestAnimationFrame(() => this.updateLevel(ctx));
    }
}