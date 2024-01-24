/**
 * get default rectangle rigid body by game object
 * @param x x coordinate of game object
 * @param y y coordinate of game object
 * @param width width of game object
 * @param height height of game object
 * @param options additional options for the rigid body
 *
 * @return rigid body
 */
export const getRectRigidBody = (x, y, width, height, options={}) => {
    return Matter.Bodies.rectangle(x + width / 2, y + height / 2, width, height, options);
}