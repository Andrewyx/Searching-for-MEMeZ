import {GameObjectManager} from '../engine/GameObjectManager.js';
import {TestGameObject} from "../gameObjects/TestGameObject.js";
import {GroundGameObject} from "../gameObjects/GroundGameObject.js";
import {AssetManager} from "../engine/AssetManager.js";
import {BaseLevel} from "./BaseLevel.js";


// TestGameObj
const TEST_OBJ = new TestGameObject();
const GROUND_BOTTOM = new GroundGameObject("bottom_ground", 0, 500, 500, 20);
const WALL_LEFT = new GroundGameObject("wall_left", 0, 0, 20, 500);


/**
 * Test Level 1
 */
export class TestLevel extends BaseLevel{

    /**
     * start game
     * @param ctx canvas context
     */
    static startLevel(ctx) {
        console.log("Test Level Init");
        // register game object
        GameObjectManager.registerGameObject(TEST_OBJ);
        GameObjectManager.registerGameObject(GROUND_BOTTOM);
        GameObjectManager.registerGameObject(WALL_LEFT);

        // start to render the level
        TestLevel.updateLevel(ctx);

        // FIXME: Test code
        const render = Matter.Render.create({
            element: document.body,
            engine: GameObjectManager.PHYSICS_ENGINE,
            options: {
                width: 800,
                height: 600,
                showVelocity: true
            }
        });

        Matter.Render.run(render);


        // event listeners should be added here
        // move the rigid body when key is pressed
        document.addEventListener('keypress', (event) => {
            switch (event.key) {
                case "a":
                    Matter.Body.setVelocity(TEST_OBJ.rBody, {x: -2, y:TEST_OBJ.rBody.velocity.y});
                    break;
                case "d":
                    Matter.Body.setVelocity(TEST_OBJ.rBody, {x: 2, y:TEST_OBJ.rBody.velocity.y});
                    break;
                case "w":
                    Matter.Body.applyForce(TEST_OBJ.rBody, TEST_OBJ.rBody.position, {x: 0, y: -0.05});
                    break;
            }
        });

        // cancel velocity when the key is no longer pressed
        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case "a":
                    Matter.Body.setVelocity(TEST_OBJ.rBody, {x: 0, y:TEST_OBJ.rBody.velocity.y});
                    break;
                case "d":
                    Matter.Body.setVelocity(TEST_OBJ.rBody, {x: 2, y:TEST_OBJ.rBody.velocity.y});
                    break;
            }
        });
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
        await super.preload(callback);
    }
}
