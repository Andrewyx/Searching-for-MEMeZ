import './utils/matter.js';

/**
 * Manager all the game objects and render them
 */

export class GameObjectManager {
    // physics engine
    static PHYSICS_ENGINE = Matter.Engine.create();

    // list of game objects registered
    static gameObjList = [];

    /**
     * Register a game object in the game
     * @param gameObj gameObject
     */
    static registerGameObject(gameObj) {
        // if the obj is rigid body, then add it to the engine
        if (gameObj.isRigidBody()) {
            Matter.Composite.add(
                GameObjectManager.PHYSICS_ENGINE.world, [gameObj.rBody]
            );
        }
        this.gameObjList.push(gameObj);
    }

    /**
     * Render all registered game objects
     * @param ctx canvas context
     */
    static renderGameObjectsByFrame(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();
        ctx.restore();

        this.gameObjList.forEach((obj) => {
            obj.update();
            obj.render(ctx);
        })
        Matter.Engine.update(GameObjectManager.PHYSICS_ENGINE);
        // requestAnimationFrame(() => this.renderGameObjectsByFrame(ctx))
    }

    /**
     * Look up game object in game by their name
     * @param targetName name
     * @returns {undefined|GameObject}
     */
    static findGameObjectByName(targetName) {
        for (const obj of this.gameObjList) {
            if (obj.name === targetName) {
                return obj;
            }
        }
        return undefined;
    }

    /**
     * Clear all register game objects
     */
    static clearAllGameObjects() {
        this.gameObjList = [];
    }
}