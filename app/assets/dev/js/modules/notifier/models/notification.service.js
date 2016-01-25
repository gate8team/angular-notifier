import { Inject } from '../decorators/main.decorator.js';
import { Notification } from './notification.class.js';

class NotificationService {
    constructor($http, $q, $timeout) {
        this.injections = {
            $http: $http,
            $q: $q,
            $timeout: $timeout
        };

        this._initializeState();
    }

    getQueue(params = { active: true }) {
        return this.state.queue;
    }

    loadAll(testMode = true) {
        return testMode ? this._getFakeNotifications() : this.injections.$http({
            url: '/api/notification/list',
            method: 'GET'
        });
    }

    close(params = { notification: null }) {
        return this.injections.$http({
            url: '/api/notification/confirm',
            method: 'PUT',
            data: this._toParams(params)
        });
    }

    respondWith(params = { notification: null, action: null }) {
        return this.injections.$http({
            url: '/api/notification/confirm',
            method: 'PUT',
            data: this._toParams(params)
        });
    }

    addNotification(params = { notification: null }) {
        let notification = params.notification;

        if (!(params.notification instanceof Notification)) {
            notification = new Notification({ state: notification });
        }

        this.state.queue.unshift(notification);
    }

    _toParams(params = { notification: null, action: null }) {
        return {
            id: params.notification.state.id,
            from: params.notification.state.from,
            result: params.action
        };
    }

    _getFakeNotifications() {
        let defer = this.injections.$q.defer();

        this.injections.$timeout(() => {
            let fakeQueue = [];

            for (let i = 0; i < 3; i++) {
                fakeQueue.unshift(new Notification({ state: {
                    id: (i + 1),
                    from: 'userManagement',
                    category: Notification.getRandomProperty(Notification.CATEGORIES),
                    header: 'Password expiration',
                    content: 'Your password expires in the next 2 days, please change it using the user management interface.',
                    type: Notification.getRandomProperty(Notification.TYPES)
                }}));
            }

            defer.resolve({ data: fakeQueue });
        }, 0);

        return defer.promise;
    }

    _initializeState() {
        this.state = _.merge({
            queue: []
        }, this.state || {});
    }

    @Inject('$http', '$q', '$timeout')
    static instanceFactory($http, $q, $timeout) {
        return new NotificationService($http, $q, $timeout);
    }
}

export default NotificationService;
export { NotificationService };