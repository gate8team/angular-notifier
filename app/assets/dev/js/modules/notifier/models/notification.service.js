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

    getQueue(params = { active: true }) {
        return this.state.queue;
    }

    _addFakeNotifications() {
        for (let i = 0; i < 7; i++) {
            this.state.queue.push(new Notification({ state: {
                from: 'userManagement',
                category: Notification.CATEGORIES.INFO,
                header: 'Password expiration',
                content: 'Your password expires in the next 2 days, please change it using the user management interface.',
                type: Notification.TYPES.NOTE
            }}));
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