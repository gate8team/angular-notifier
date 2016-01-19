import { Inject } from '../decorators/main.decorator.js';
import { Notification } from './notification.class.js';

class NotificationService {
    constructor($http) {
        this.injections = {
            $http: $http
        };

        this._initializeState();
        this._addFakeNotifications();
    }

    getQueue() {
        return this.state.queue;
    }

    _addFakeNotifications() {
        for (let i = 0; i < 7; i++) {
            this.state.queue.push(new Notification());
        }
    }

    _initializeState() {
        this.state = _.merge({
            queue: []
        }, this.state || {});
    }

    @Inject('$http')
    static instanceFactory($http) {
        return new NotificationService($http);
    }
}

export default NotificationService;
export { NotificationService };