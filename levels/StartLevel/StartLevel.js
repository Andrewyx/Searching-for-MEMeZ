import {BaseLevel} from "../BaseLevel.js";
import {GameObjectManager} from "../../engine/GameObjectManager.js";
import {StartScreenBackgroundObject} from "../../gameObjects/startLevel/StartScreenBackgroundObject.js";
import {TestScreenPlanetObject} from "../../gameObjects/startLevel/TestScreenPlanetObject.js";
import {TitleGameObject} from "../../gameObjects/TitleGameObject.js";
import {canvasCoordinateToGlobal, getCenterPoint, globalCoordinateToCanvas} from "../../engine/utils/CanvasUtils.js";
import {LevelManager} from "../../engine/LevelManager.js";
import {MessageManager} from "../../engine/MessageManager.js";


/**
 * Start scene
 */
export class StartLevel extends BaseLevel {

    static backgroundObj;
    static title;
    static textClickToStart;

    static textTestTips;

    static testBall1;
    static testBall2;
    static testBall3;
    // game state;
    // 0 -> the title page is not clicked
    // 1 -> when the title page is clicked, but did not enter test page
    // 2 -> in the test page
    static state = 0;
    static win = null;

    static startLevel(ctx) {
        console.log("Side Window of Start Level Init");

        GameObjectManager.setPhysicsEngine(Matter.Engine.create({gravity: {scale: 0}}));
        GameObjectManager.PHYSICS_ENGINE.timing.timeScale = 0.2;

        StartLevel.backgroundObj = new StartScreenBackgroundObject(0, 0, ctx.canvas.width, ctx.canvas.height);

        // calc the title position
        const center = getCenterPoint(ctx);

        this.title = new TitleGameObject("game_title",
            center.x, center.y - 150, "#058605", "Searching for MEMeZ", 50,
            "Arial", true, true);
        this.textClickToStart = new TitleGameObject("text_click_to_start",
            center.x, center.y + 100, "#058605", "Click to start", 25,
            "Arial", true, true);
        // center the title and text
        this.title.x = center.x - this.title.getTextWidth(ctx) / 2;
        this.textClickToStart.x = center.x - this.textClickToStart.getTextWidth(ctx) / 2;

        this.textTestTips = new TitleGameObject("text_test_tips",
            10, 20, "black", "LEFT Click to skip test / RIGHT Click to open a new window", 15,
            "Arial", false, false);
        this.textTestTips.setHidden(true);

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
        GameObjectManager.registerGameObject(StartLevel.title);
        GameObjectManager.registerGameObject(StartLevel.textClickToStart);
        GameObjectManager.registerGameObject(StartLevel.textTestTips);

        // start to render the level
        StartLevel.updateLevel(ctx);
        // event listener for click
        window.addEventListener('click', () => this.nextState());

        ctx.canvas.addEventListener('contextmenu', (ev) => {
            if (this.win === null) {
                ev.preventDefault();
                this.win = LevelManager.openNewWindow("levels/StartLevel/StartLevel.html",
                    ctx.canvas.width / window.devicePixelRatio, 0, 200, 200);
            }
        }, false);
    }

    static updateLevel(ctx) {
        if (StartLevel.state === 0) {

        } else if (StartLevel.state === 1) {
            // post coordinate message to channel
            MessageManager.broadcast(
                {
                    'ball1': canvasCoordinateToGlobal(this.testBall1.x, this.testBall1.y),
                    'ball2': canvasCoordinateToGlobal(this.testBall2.x, this.testBall2.y),
                    'ball3': canvasCoordinateToGlobal(this.testBall3.x, this.testBall3.y),
                }
            );
            if (this.win !== null) {
                MessageManager.setEventListener((data) => {
                    this.testBall1.setAttractCenter(globalCoordinateToCanvas(data.x, data.y));
                    this.testBall2.setAttractCenter(globalCoordinateToCanvas(data.x, data.y));
                    this.testBall3.setAttractCenter(globalCoordinateToCanvas(data.x, data.y));
                });
                // set this.win to null if it is closed
                if (this.win.closed) {
                    this.win = null;
                    const center = {
                        x: ctx.canvas.width / window.devicePixelRatio / 2,
                        y: ctx.canvas.height / window.devicePixelRatio / 2
                    };
                    this.testBall1.setAttractCenter(center);
                    this.testBall2.setAttractCenter(center);
                    this.testBall3.setAttractCenter(center);
                }
            }

        } else {

        }

        GameObjectManager.renderGameObjectsByFrame(ctx);
        window.requestAnimationFrame(() => this.updateLevel(ctx));
    }

    static nextState() {
        if (this.state === 0) {
            LevelManager.changeToNewScene('empty.html', 300, 300);
            GameObjectManager.clearAllGameObjects();

            GameObjectManager.registerGameObject(this.testBall1);
            GameObjectManager.registerGameObject(this.testBall2);
            GameObjectManager.registerGameObject(this.testBall3);
            GameObjectManager.registerGameObject(this.textTestTips);

            this.testBall1.setHidden(false);
            this.testBall2.setHidden(false);
            this.testBall3.setHidden(false);
            this.textTestTips.setHidden(false);
        } else if (this.state === 1) {
            GameObjectManager.clearAllGameObjects();
        }
        this.state++;
    }
}