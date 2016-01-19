import { Base } from './base.class.js';

class Notification extends Base {
    constructor(params = { state: {} }) {
        super();
        this.state = params.state;
        this._initializeState();
    }

    _initializeState() {
        this.state = _.merge({
            id: null,
            from: null,
            category: null,
            type: null,
            header: null,
            content: null
        }, this.state || {});
    }

    static instanceFactory() {
        return new Notification();
    }
}