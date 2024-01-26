

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
        this.level = level;
        let newWin = open(html, '_blank', `width=${width},height=${height},menubar=no,toolbar=no,status=no,scrollbars=yes,screenX= 
                          + ${x} + ,screenY= + ${y}`)
        newWin.onload = function() {
            let preloadHTML =
            `<script type="module">
                import {TestLevel} from './levels/TestLevel.js';
                import {StartLevel} from './levels/StartLevel.js';
                import {resizeCanvas} from './engine/utils/CanvasUtils.js';
                import { FirstLevel } from './levels/FirstLevel.js';
                import { LevelManager } from './engine/LevelManager.js';
                const canvas = document.getElementById("mainCanvas")

                const ctx = canvas.getContext('2d');

                // resize canvas to get better image quality
                resizeCanvas(canvas, ctx);

                window.addEventListener('resize', () => resizeCanvas(canvas, ctx));

                // TestLevel.preload(() => console.log("All assets are loaded")).then(() => TestLevel.startLevel(ctx))
                FirstLevel.preload(() => console.log("All assets are loaded")).then(() => FirstLevel.startLevel(ctx))
            </script>`;
            newWin.document.body.insertAdjacentHTML('afterend', preloadHTML);
                   
            };
    }


}