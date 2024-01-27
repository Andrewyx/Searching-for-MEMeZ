import {BaseLevel} from "./BaseLevel.js";
import {GameObjectManager} from "../engine/GameObjectManager.js";
import {StartScreenBackgroundObject} from "../gameObjects/startLevel/StartScreenBackgroundObject.js";
import {TestScreenPlanetObject} from "../gameObjects/startLevel/TestScreenPlanetObject.js";


/**
 * Start scene
 */
export class StartLevel extends BaseLevel {

    static backgroundObj;
    static testBall1;
    // game state;
    // 0 -> the title page is not clicked
    // 1 -> when the title page is clicked, but did not enter test page
    // 2 -> in the test page
    static state = 0;

    static startLevel(ctx) {
        console.log("Start Level Init");

        GameObjectManager.setPhysicsEngine(Matter.Engine.create({gravity: {scale: 0}}));
        GameObjectManager.PHYSICS_ENGINE.timing.timeScale = 0.2;

        StartLevel.backgroundObj = new StartScreenBackgroundObject(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.testBall1 = new TestScreenPlanetObject("ball_1", 0, 0, 30, "red",
            {
                x: ctx.canvas.width / window.devicePixelRatio,
                y: ctx.canvas.height / window.devicePixelRatio
            }, 100, false);
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

        this.testBall1.setHidden(true);
        this.testBall1.addAttractor(this.testBall2);
        this.testBall1.addAttractor(this.testBall3);

        this.testBall2.setHidden(true);
        this.testBall2.addAttractor(this.testBall1);
        this.testBall2.addAttractor(this.testBall3);

        this.testBall3.setHidden(true);
        this.testBall3.addAttractor(this.testBall1);
        this.testBall3.addAttractor(this.testBall2);

        GameObjectManager.registerGameObject(StartLevel.backgroundObj);
        GameObjectManager.registerGameObject(this.testBall1);
        GameObjectManager.registerGameObject(this.testBall2);
        GameObjectManager.registerGameObject(this.testBall3);

        // start to render the level
        StartLevel.updateLevel(ctx);
        this.nextState();
    }

    static updateLevel(ctx) {
        if (StartLevel.state === 0) {

        } else if (StartLevel.state === 1) {

        } else {

        }

        GameObjectManager.renderGameObjectsByFrame(ctx);
        window.requestAnimationFrame(() => this.updateLevel(ctx));
    }

    static nextState() {
        if (this.state === 0) {
            this.backgroundObj.setHidden(true);
            this.testBall1.setHidden(false);
            this.testBall2.setHidden(false);
            this.testBall3.setHidden(false);
        }
        this.state++;
    }
}