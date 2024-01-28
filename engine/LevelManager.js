/**
 * Manages the loading of new levels (popups)
 *
 * Performs: preloading of new scene (level) within new generated window size/locks size
 */
export class LevelManager {

    /**
     * Open a new window
     * @param html html file name
     * @param x x coordinate
     * @param y
     * @param width
     * @param height
     * @return {WindowProxy}
     */
    static openNewWindow(html, x, y, width, height) {
        return open(html, '_blank', `width=${width},height=${height},menubar=no,toolbar=no,status=no,scrollbars=yes,screenX=${x}, screenY=${y}`);
    }

    /**
     * Use windows to cover all the screen.
     * @param html target html to open
     * @param width width of each window
     * @param height height of each window
     */
    static changeToNewScene(html, width, height) {
        const winArray = [];
        for (let x = 0; x < window.outerWidth; x += width) {
            for (let y = 0; y < window.outerHeight; y+= height) {
                winArray.push(this.openNewWindow(html, x, y, width, height));
            }
        }

        setTimeout(() => {
            for (let i = winArray.length - 1; i >= 0; i--) {
                winArray[i].close();
                winArray.pop();
            }
        }, 1000);
    }
}