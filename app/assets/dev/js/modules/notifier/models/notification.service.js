import { Inject } from '../decorators/main.decorator.js';
import { Notification } from './notification.class.js';

class NotificationService {
    constructor($http, $q, $timeout, $rootScope) {
        this.injections = {
            $http: $http,
            $q: $q,
            $timeout: $timeout,
            $rootScope: $rootScope
        };

        this._initializeState();
    }

    getQueue(params = { active: true }) {
        return this.state.queue;
    }

    setQueue(queue) {
        this.state.queue = queue;
    }

    loadAll(testMode = true) {
        return testMode ? this._getFakeNotifications() : this.injections.$http({
            url: '/api/notification/list',
            method: 'GET'
        });
    }

    close(params = { notification: null, triggerEvent: true }) {
        if (params.triggerEvent) {
            this.injections.$rootScope.$broadcast('notifier:closed', { notification: params.notification });
        }

        return this.injections.$http({
            url: '/api/notification/confirm',
            method: 'PUT',
            data: this._toParams(params)
        });
    }

    respondWith(params = { notification: null, action: null, triggerEvent: true }) {
        if (params.triggerEvent) {
            this.injections.$rootScope.$broadcast('notifier:responded', { notification: params.notification });
        }

        return this.injections.$http({
            url: '/api/notification/confirm',
            method: 'PUT',
            data: this._toParams(params)
        });
    }

    addNotification(params = { notification: null }) {
        let notification = params.notification;

        if (!(params.notification instanceof Notification)) {
            notification = new Notification({ state: _.merge(notification, { id: +new Date() }) });
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

    @Inject('$http', '$q', '$timeout', '$rootScope')
    static instanceFactory($http, $q, $timeout, $rootScope) {
        return new NotificationService($http, $q, $timeout, $rootScope);
    }
}

export default NotificationService;
export { NotificationService };