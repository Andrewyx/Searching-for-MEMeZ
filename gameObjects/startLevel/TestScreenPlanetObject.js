import {GameObject} from "../../engine/GameObject.js";
import {getCircleRigidBody, getRectRigidBody} from "../../engine/utils/RigidBodyUtils.js";
import {angleBetween, calcMagnitude} from "../../engine/utils/MathUtils.js";
import {GameObjectManager} from "../../engine/GameObjectManager.js";

/**
 * Planet object on test screen
 */

// Gravitational constant
const G = 5;

export class TestScreenPlanetObject extends GameObject {

    color;
    radius;
    boundary = {x: NaN, y: NaN};
    mass;
    // list of other planets
    attractor = [];
    center;


    /**
     * Construct a ball object
     * @param name name of the object
     * @param x x coordinate
     * @param y y coordinate
     * @param radius radius
     * @param color color of the ball
     * @param boundary boundary for max x and max y
     * @param mass mass of the planet
     * @param isStatic whether it is static
     */
    constructor(name, x, y, radius, color, boundary, mass = 1000, isStatic = false) {
        const rigidBody = getCircleRigidBody(x, y, radius, {
            mass: mass,
            inertia: 1,
            airFriction: 1000,
            isStatic: isStatic
        });

        // cancel collision
        rigidBody.collisionFilter = {
            'group': -1,
            'category': 2,
            'mask': 0,
        }

        super(name, x, y, 2 * radius, 2 * radius, rigidBody);

        this.radius = radius;
        this.color = color;
        this.center = {x: boundary.x / 2, y: boundary.y / 2};
        this.boundary = boundary;
        this.mass = mass;
    }

    render(ctx) {
        // draw little circle
        if (!this.hidden) {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.stroke();
        }
    }

    /**
     * set the velocity to the original velocity
     * @param velocity of the rigid body
     */
    setVelocity(velocity) {
        this.velocity.x = velocity.x;
        this.velocity.y = velocity.y;
    }

    update() {
        for (const otherPlanet of this.attractor) {
            const distance = Math.max(Math.sqrt((otherPlanet.x - this.x) ** 2 + (otherPlanet.y - this.y) ** 2),
                (this.radius + otherPlanet.radius) * 2);
            const force = (G * this.mass * otherPlanet.mass) / (distance ** 2);
            const angle = Matter.Vector.angle(this.rBody.position, otherPlanet.rBody.position);
            Matter.Body.applyForce(this.rBody, {x: this.x, y: this.y}, {
                x: force * Math.cos(angle) * 0.1,
                y: force * Math.sin(angle) * 0.1
            });

            Matter.Body.applyForce(otherPlanet.rBody, {x: otherPlanet.x, y: otherPlanet.y}, {
                x: -force * Math.cos(angle) * 0.1,
                y: -force * Math.sin(angle) * 0.1
            });
        }

        Matter.Body.applyForce(this.rBody, {x: this.x, y: this.y}, {
            x: (this.center.x - this.x) / this.boundary.x,
            y: (this.center.y - this.y) / this.boundary.y
        });

        this.x = this.rBody.position.x;
        this.y = this.rBody.position.y;
    }

    setAttractCenter(center) {
        this.center = center;
        this.boundary = {x: 400, y:400};
    }

    /**
     * add a new attractor
     * @param planetObj another planet object to add
     */
    addAttractor(planetObj) {
        this.attractor.push(planetObj);
    }
}