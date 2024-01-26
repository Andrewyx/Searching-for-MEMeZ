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
    static broadcast(channelName, msg) {
        if (channelName === 'main-channel') {
            this.MAIN_CHANNEL.postMessage(msg);
        }
    }
}