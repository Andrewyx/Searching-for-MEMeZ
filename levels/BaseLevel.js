/**
 * Abstract class for levels
 * All level classes will be a child of this class.
 * Do NOT initialize this class directly
 */
export class BaseLevel {
    /**
     * start level
     * this function is called when level is started
     * E.g: add event listener
     * @param ctx canvas context
     */
    static startLevel(ctx) {

    }

    /**
     * update level
     * this function is called per windows frame
     * E.g: perform rigid body calculation
     */
    static updateLevel() {

    }

    /**
     * Preload assets
     * @return {Promise<void>} promise of assets
     */
    static async preload() {

    }
}