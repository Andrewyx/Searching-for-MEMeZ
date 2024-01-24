/**
 * throttle
 * @param fn function
 * @param delay max interval between each call
 * @return {(function(): void)|*}
 */
export const throttle = (fn, delay) => {
    let timer = null;
    return function() {
        const context = this, args = arguments;
        if (!timer) {
            timer = setTimeout(() => {
                fn.call(context, args);
                timer = null;
            }, delay || 0)
        }
    }
}

/**
 * debounce
 * @param fn function
 * @param delay max interval between each call
 * @return {(function(): void)|*}
 */
export const debounce = (fn, delay = 1000) => {
    let timer = null;
    return function () {
        const args = arguments;
        const context = this;
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            fn.call(context, args)
        }, delay)
    }
}
