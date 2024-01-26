import {GameObject} from "../../engine/GameObject.js";
import {getCircleRigidBody, getRectRigidBody} from "../../engine/utils/RigidBodyUtils.js";
import {angleBetween, calcMagnitude} from "../../engine/utils/MathUtils.js";
import {GameObjectManager} from "../../engine/GameObjectManager.js";

/**
 * Planet object on test screen
 */

// Gravitational constant
const G = 10;

export class TestScreenPlanetObject extends GameObject {

    color;
    radius;
    boundary = {x: 1000, y: 1000};
    mass;
    // list of other planets
    attractor = [];
    force;

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
     * @param force velocity of the planet
     */
    constructor(name, x, y, radius, color, boundary, mass = 1000, force = {x: 100, y: 0}) {
        const rigidBody = getCircleRigidBody(x, y, radius, {
            mass: mass,
            inertia: 0
        });

        const center = {x: boundary.x / 2, y: boundary.y / 2};
        const constraint = Matter.Constraint.create({
            pointA: center,
            bodyB: rigidBody,
            stiffness: 0.001
        });

        super(name, x, y, 2 * radius, 2 * radius, rigidBody);

        // Matter.Composite.add(GameObjectManager.PHYSICS_ENGINE, constraint);

        this.radius = radius;
        this.color = color;
        this.boundary = boundary;
        this.mass = mass;
        this.force = force
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
            const distance = Math.min(Math.sqrt((otherPlanet.x - this.x) ** 2 + (otherPlanet.y - this.y) ** 2), 100);
            const force = G * this.mass * otherPlanet.mass / (distance ** 2) * Math.random() * 0.5;
            const angle = Matter.Vector.angle(this.rBody.position, otherPlanet.rBody.position);
            Matter.Body.applyForce(this.rBody, {x: this.x, y: this.y}, {
                x: force * Math.sin(angle) * Math.random(),
                y: force * Math.cos(angle) * Math.random()
            });
        }

        this.x = this.rBody.position.x;
        this.y = this.rBody.position.y;
    }

    /**
     * add a new attractor
     * @param planetObj another planet object to add
     */
    addAttractor(planetObj) {
        this.attractor.push(planetObj);
    }
}