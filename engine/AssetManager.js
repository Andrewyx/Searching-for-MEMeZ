/**
 * Manage All Assets
 */

const IMAGE_ASSETS_BASE = "../assets/"

export class AssetManager {

    static assets = new Map();

    static assetUrls = [];


    /**
     * register asset url
     * @param url asset url
     */
    static registerAssetUrl(url) {
        this.assetUrls.push(url);
    }

    /**
     * Preload all assets async
     * @param callback callback function when loading is finished.
     * @returns {Promise<void>}
     */
    static async preloadAllAssets(callback) {
        const promises = this.assetUrls.map((url) => {
            return this.loadImage(url, url, callback);
        });
        return Promise.all(promises).then((loadedAssets) => {
            for (const {key, asset} of loadedAssets) {
                this.assets.set(key, asset);
                console.log("[AssetManager] Loaded Asset: " + key);
            }
        });
    }


    /**
     * load image assets
     * @param key key of the asset stored in runtime cache
     * @param url url of image inside IMAGE_ASSETS_BASE
     * @param onComplete callback when the loading is completed
     * @returns {Promise<unknown>} image load promise
     */
    static loadImage = (key, url, onComplete) => new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', () => {
            resolve({key: url, asset: img});
            if (typeof onComplete === 'function') onComplete({url, img});
        }, {once: true});
        img.addEventListener('error', (err) => reject(err));
        img.src = IMAGE_ASSETS_BASE + url;
    });
}