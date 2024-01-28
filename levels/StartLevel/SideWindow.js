import {BaseLevel} from "../BaseLevel.js";
import {GameObjectManager} from "../../engine/GameObjectManager.js";
import {TestScreenPlanetObject} from "../../gameObjects/startLevel/TestScreenPlanetObject.js";
import {canvasCoordinateToGlobal, getCenterPoint, globalCoordinateToCanvas} from "../../engine/utils/CanvasUtils.js";
import {MessageManager} from "../../engine/MessageManager.js";


/**
 * Start scene
 */
export class SideWindow extends BaseLevel {

    static testBall1;
    static testBall2;
    static testBall3;
    static blackHole;

    static startLevel(ctx) {
        GameObjectManager.setPhysicsEngine(Matter.Engine.create({gravity: {scale: 0}}));
        GameObjectManager.PHYSICS_ENGINE.timing.timeScale = 0.2;

        const center = getCenterPoint(ctx);

        this.testBall1 = new TestScreenPlanetObject("ball_1", 0, 0, 30, "red",
            {
                x: ctx.canvas.width / window.devicePixelRatio,
                y: ctx.canvas.height / window.devicePixelRatio
            }, 50, false);
        this.testBall2 = new TestScreenPlanetObject("ball_2", 1000, 1000, 30, "yellow",
            {
                x: ctx.canvas.width / window.devicePixelRatio,
                y: ctx.canvas.height / window.devicePixelRatio
            }, 50, false);
        this.testBall3 = new TestScreenPlanetObject("ball_3", 600, 352, 30, "blue",
            {
                x: ctx.canvas.width / window.devicePixelRatio,
                y: ctx.canvas.height / window.devicePixelRatio
            }, 200, false);

        this.blackHole = new TestScreenPlanetObject("blackhole", center.x, center.y, 50, "black",
            {
                x: ctx.canvas.width / window.devicePixelRatio,
                y: ctx.canvas.height / window.devicePixelRatio
            }, 2000000, true);

        this.testBall1.addAttractor(this.testBall2);
        this.testBall1.addAttractor(this.testBall3);
        this.testBall1.addAttractor(this.blackHole);


        this.testBall2.addAttractor(this.testBall1);
        this.testBall2.addAttractor(this.testBall3);
        this.testBall1.addAttractor(this.blackHole);

        this.testBall3.addAttractor(this.testBall1);
        this.testBall3.addAttractor(this.testBall2);
        this.testBall1.addAttractor(this.blackHole);

        GameObjectManager.registerGameObject(this.testBall1);
        GameObjectManager.registerGameObject(this.testBall2);
        GameObjectManager.registerGameObject(this.testBall3);
        GameObjectManager.registerGameObject(this.blackHole);

        // start to render the level
        this.updateLevel(ctx);
    }

    static updateLevel(ctx) {
        MessageManager.setEventListener((data) => {
            Matter.Body.setPosition(this.testBall1.rBody, globalCoordinateToCanvas(data['ball1'].x, data['ball1'].y));
            Matter.Body.setPosition(this.testBall2.rBody, globalCoordinateToCanvas(data['ball2'].x, data['ball2'].y));
            Matter.Body.setPosition(this.testBall3.rBody, globalCoordinateToCanvas(data['ball3'].x, data['ball3'].y));
        });
        // broadcast the position of black hole
        MessageManager.broadcast(canvasCoordinateToGlobal(this.blackHole.x, this.blackHole.y));

        GameObjectManager.renderGameObjectsByFrame(ctx);
        window.requestAnimationFrame(() => this.updateLevel(ctx));
    }
}