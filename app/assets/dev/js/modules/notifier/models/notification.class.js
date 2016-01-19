import { Base } from './base.class.js';

class Notification extends Base {
    constructor(params = { state: {} }) {
        super();
        this.state = params.state;
        this._initializeState();
    }

    static get TYPES() {
        return {
            NOTE: 'note',
            OK_CONFIRM: 'ok_confirm',
            OK_CANCEL_CONFIRM: 'ok_cancel_confirm'
        };
    }

    static instanceFactory() {
        return new Notification();
    }

    // private
    _initializeState() {
        this.state = _.merge({
            id: null,
            from: null,
            category: null,
            type: null,
            header: null,
            content: null,
            showed: false
        }, this.state || {});
    }
}

export default Notification;
export { Notification };