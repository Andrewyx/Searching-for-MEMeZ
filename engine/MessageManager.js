/**
 * Manage the message sent between windows
 */

export class MessageManager {
    static MAIN_CHANNEL = new BroadcastChannel('main-channel');

    /**
     * broadcast the
     * @param channelName name of the channel
     * @param msg message
     */
    static broadcast(msg, channelName='main-channel') {
        if (channelName === 'main-channel') {
            this.MAIN_CHANNEL.postMessage(msg);
        }
    }

    /**
     * set the event listen when received a message
     * @param channelName channel name
     * @param callback callback function
     */
    static setEventListener(callback, channelName='main-channel') {
        if (channelName === 'main-channel') {
            this.MAIN_CHANNEL.onmessage = (msgEvt) => {
                callback(msgEvt.data);
            }
        }
    }
}