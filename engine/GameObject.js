/**
 * GameObject class, every object in game should extend this class
 * This is intended to be an ABSTRACT class, do not initiate directly
 */
export class GameObject {

    x;
    y;
    name;
    width;
    height;
    rBody;

    /**
     * construct a game object
     * PS: you need to register the game object to GameObjectManager
     * @param name name of the object (assumed to be unique)
     * @param x x coordinate of the center of the game object
     * @param y y coordinate of the center of the game object
     * @param width width of the entire game object
     * @param height height of the entire game object
     * @param rBody rigid body bind to the object
     */
    constructor(name, x, y, width, height, rBody) {
        this.name = name;
        this.width = width;
        this.height = height
        this.x = x;
        this.y = y;
        this.rBody = rBody;
    }

    /**
     * Function for rendering the object on the screen.
     * @param ctx canvas context
     */
    render(ctx) {

    }

    /**
     * Update the object according to its physical properties
     */
    update() {
        // sync the obj position with rBody
        if (this.isRigidBody()) {
            const {x, y} = this.rBody.position;
            this.x = x;
            this.y = y;
        }
    }

    /**
     * return true if the current obj is a rigid body and participates in physical simulation
     * @returns {boolean}
     */
    isRigidBody() {
        return this.rBody !== null && this.rBody !== undefined;
    }
}