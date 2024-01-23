import {GameObjectManager} from './GameObjectManager.js';
import {GameObject} from './GameObject.js';
import {TestGameObject} from "../gameObjects/TestGameObject.js";


/**
 * Top Level Manager of the game
 */
export class GameManager {

    /**
     * start game
     * @param ctx canvas context
     */
    static startGame(ctx) {
        const testObj = new TestGameObject();
        GameObjectManager.registerGameObject(testObj);
        window.requestAnimationFrame(() => GameObjectManager.renderGameObjectsByFrame(ctx));
    }
}
