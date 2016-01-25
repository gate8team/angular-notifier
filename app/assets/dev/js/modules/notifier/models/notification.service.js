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

    /**
     * Returns inner state queue.
     * @returns {object} - queue.
     */
    getQueue() {
        return this.state.queue;
    }

    /**
     * Sets inner state queue.
     * @param {array} queue - queue to set to current inner state.
     */
    setQueue(queue) {
        this.state.queue = queue;
    }

    /**
     * Loads notifications. If testMode is activated - builds some random notifications, otherwise loads it from outer api.
     * @param {boolean} testMode - flag to use test fake mode or live mode for notifications loading.
     * @returns {object} - promise.
     */
    loadAll(testMode = true) {
        return testMode ? this._getFakeNotifications() : this.injections.$http({
            url: '/api/notification/list',
            method: 'GET'
        });
    }

    /**
     * Used for "closing" notifications. If triggerEvent is set to true, it broadcasts "notifier:closed" event.
     * @param {object} params - main parameters object.
     * @param {object} params.notification - notification that is going to be closed.
     * @param {boolean} params.triggerEvent - flag that specifies if we need to broadcast event or not.
     * @returns {object} - promise.
     */
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

    /**
     * Used for "replying" back to server that notification was reacted with user actions. If triggerEvent is set to true,
     * it broadcasts "notifier:responded" event.
     * @param {object} params - main parameters object.
     * @param {object} params.notification - notification that is going to be responded with some action.
     * @param {boolean} params.triggerEvent - flag that specifies if we need to broadcast event or not.
     * @param {string} params.action - action to be responded with.
     * @returns {object} - promise.
     */
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

    /**
     * Adds notification to queue. If object was passed (not Notification instance), it tries to retrieve new Notification
     * instance to be put to the queue.
     * @param {object} params - main parameters object.
     * @param {object} params.notification - notification that is going to be added.
     */
    addNotification(params = { notification: null }) {
        let notification = params.notification;

        if (!(params.notification instanceof Notification)) {
            notification = new Notification({ state: _.merge(notification, { id: +new Date() }) });
        }

        this.state.queue.unshift(notification);
    }

    /**
     * Simple method returns fields that server requests for.
     * @param {object} params - main parameters object.
     * @param {object} params.notification - notification that is going to be "serialized" to params.
     * @param {string} params.action - action that user triggered.
     * @returns {{id: *, from: *, result: *}} - "api-ready" params.
     * @private
     */
    _toParams(params = { notification: null, action: null }) {
        return {
            id: params.notification.state.id,
            from: params.notification.state.from,
            result: params.action
        };
    }

    /**
     * Simply generation of fake data.
     * @returns {object} - promise.
     * @private
     */
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

    /**
     * State initialization method.
     * @private
     */
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
