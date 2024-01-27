/**
 * Resize canvas to get the best quality
 * @param canvas canvas obj
 * @param ctx canvas context
 */
export const resizeCanvas = (canvas, ctx) => {
    // set up canvas
    const dpr = window.devicePixelRatio

    const logicalWidth = window.innerWidth;
    const logicalHeight = window.innerHeight;

    canvas.width = logicalWidth * dpr
    canvas.height = logicalHeight * dpr
    canvas.style.width = logicalWidth + 'px'
    canvas.style.height = logicalHeight + 'px'

    ctx.scale(dpr, dpr)
}

/**
 * Create a new cache canvas context (off-screen)
 * @param width width of canvas
 * @param height height of canvas
 * @return {CanvasRenderingContext2D} canvas context
 */
export const createCacheCanvasCtx = (width, height) => {
    let canvas = new OffscreenCanvas(width, height);
    return canvas.getContext('2d');
}

/**
 * get center point of the canvas
 * @param ctx canvas context
 * @return point with x y coordinates
 */
export const getCenterPoint = (ctx) => {
    return {x: ctx.canvas.width / window.devicePixelRatio / 2, y: ctx.canvas.height / window.devicePixelRatio / 2};
}

/**
 * Map canvas coordinate to global
 * @param canvasX canvas coordinate x
 * @param canvasY canvas coordinate y
 * @return {{x: *, y: *}} global coordinate (with respect to the whole screen)
 */
export const canvasCoordinateToGlobal = (canvasX, canvasY) =>{
    const bodyRect = document.body.getBoundingClientRect();
    const x = window.screenLeft + bodyRect.x + canvasX;
    const y = window.screenTop + bodyRect.y + canvasY;

    return {x: x, y:y};
}

/**
 * Map global coordinate to canvas
 * @param x global coordinate x
 * @param y global coordinate y
 * @return {{x: *, y: *}} canvas coordinate (with respect to the whole screen)
 */
export const globalCoordinateToCanvas = (x, y) =>{
    const bodyRect = document.body.getBoundingClientRect();
    const canvasX = x - window.screenLeft - bodyRect.x;
    const canvasY = y - window.screenTop - bodyRect.y;

    return {x: canvasX, y:canvasY};
}
