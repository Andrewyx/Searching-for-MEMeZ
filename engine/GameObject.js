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

    /**
     * construct a game object
     * PS: you need to register the game object to GameObjectManager
     * @param name name of the object (assumed to be unique)
     * @param x x coordinate of the center of the game object
     * @param y y coordinate of the center of the game object
     * @param width width of the entire game object
     * @param height height of the entire game object
     */
    constructor(name, x, y, width, height) {
        this.name = name;
        this.width = width;
        this.height = height
        this.x = x;
        this.y = y;
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

    }

    /**
     * Get collision box of the obj
     */
    getCollisionBox() {

    }

}