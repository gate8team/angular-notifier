import { Base } from './base.class.js';

class Notification extends Base {
    constructor(params = { state: {} }) {
        super();
        this.state = params.state;
        this._initializeState();
    }

    /**
     * Notification types enum.
     * @returns {{NOTE: string, OK_CONFIRM: string, OK_CANCEL_CONFIRM: string}}
     */
    static get TYPES() {
        return {
            NOTE: 'note',
            OK_CONFIRM: 'ok_confirm',
            OK_CANCEL_CONFIRM: 'ok_cancel_confirm'
        };
    }

    /**
     * Notification categories enum.
     * @returns {{INFO: string, WARNING: string, ERROR: string}}
     */
    static get CATEGORIES() {
        return {
            INFO: 'info',
            WARNING: 'warning',
            ERROR: 'error'
        };
    }

    /**
     * Notification respond_by enum.
     * @returns {{USER: string, NOTIFICATION_ENGINE: string}}
     */
    static get RESPOND_BY() {
        return {
            USER: 'user',
            NOTIFICATION_ENGINE: 'notification_engine'
        };
    }

    static instanceFactory() {
        return new Notification();
    }

    /**
     * State initialization method.
     * @private
     */
    _initializeState() {
        this.state = _.merge({
            id: null,
            from: null,
            category: null,
            type: null,
            header: null,
            content: null,
            showed: false,
            closed: false
        }, this.state || {});
    }
}

export default Notification;
export { Notification };
