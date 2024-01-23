/**
 * Manager all the game objects and render them
 */

export class GameObjectManager {
    // list of game objects registered
    static gameObjList = [];

    /**
     * Register a game object in the game
     * @param gameObj gameObject
     */
    static registerGameObject(gameObj) {
        this.gameObjList.push(gameObj);
    }

    /**
     * Render all registered game objects
     * @param ctx canvas context
     */
    static renderGameObjectsByFrame(ctx) {
        this.gameObjList.forEach((obj) => {
            obj.render(ctx);
        })
        // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();
        ctx.restore();
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
}