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