import {GameObjectManager} from '../engine/GameObjectManager.js';
import {TestGameObject} from "../gameObjects/TestGameObject.js";
import {GroundGameObject} from "../gameObjects/GroundGameObject.js";
import {AssetManager} from "../engine/AssetManager.js";



// TestGameObj
const TEST_OBJ = new TestGameObject();
const GROUND_BOTTOM = new GroundGameObject("bottom_ground", 0, 500, 500, 20);

const SPEED = 5;


/**
 * Test Level 1
 */
export class TestLevel {

    /**
     * start game
     * @param ctx canvas context
     */
    static startLevel(ctx) {
        console.log("Test Level Init");
        // register game object
        GameObjectManager.registerGameObject(TEST_OBJ);
        GameObjectManager.registerGameObject(GROUND_BOTTOM);

        // start to render the level
        TestLevel.updateLevel(ctx);

        // event listeners should be added here
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case "a":
                    Matter.Body.set(TEST_OBJ.rBody, {x: TEST_OBJ.x += SPEED, y: TEST_OBJ.y})
                    TEST_OBJ.update()
                    break;
                case "w":
                    TEST_OBJ.y -= SPEED;
                    break;
                case "s":
                    TEST_OBJ.rBody.x += SPEED;
                    break;
                case "d":
                    TEST_OBJ.x += SPEED;
                    break;
            }
        })
    }

    /**
     * Update Level
     * PS: ALL Calculations should be performed here.
     */
    static updateLevel(ctx) {
        // Game object behavior must be written here

        // These two lines are used to update the canvas
        GameObjectManager.renderGameObjectsByFrame(ctx)
        window.requestAnimationFrame(() => this.updateLevel(ctx));
    }

    static async preload(callback) {
        // Here is where you need to register all assets
        AssetManager.registerAssetUrl("tests/testObj.png");

        // call preload to load all assets
        await AssetManager.preloadAllAssets(callback);
    }
}
