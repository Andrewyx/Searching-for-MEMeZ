

/**
 * Manages the loading of new levels (popups)
 * 
 * Performs: preloading of new scene (level) within new generated window size/locks size
 */
export class LevelManager {
    
    width = 500;
    height = 500;
    x= 0;
    y = 0;
    html = "index.html";
    // newWin = null;
    /**
     * REQUIRES: HTML ref, Level class, window xy, width, height
     * EFFECTS: Loads level in new popup window
     */
    constructor(html, level, x , y, width, height) {
        this.width = width;
        this.height = height;
        this.html = html;
        let newWin = open(html, '_blank', `width=${width},height=${height},menubar=no,toolbar=no,status=no,scrollbars=yes,screenX= 
                          + ${x} +, screenY= + ${y}`);
    }
}