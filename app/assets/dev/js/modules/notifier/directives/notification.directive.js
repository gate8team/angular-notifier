import { Inject } from '../decorators/main.decorator.js';
import { BaseController } from '../controllers/base.controller.js';
import { Notification } from '../models/notification.class.js';

class NotificationDirective {
    constructor($templateCache) {
        //this.templateUrl = '/assets/dev/js/modules/notifier/templates/single-notification.html';
        this.template = $templateCache.get('/assets/dev/js/modules/notifier/templates/single-notification.html');
        this.restrict = 'AE';
        this.controller = 'NotificationController';
        this.controllerAs = 'singleNotification';
        this.scope = {
            notification: '=',
            notificationMode: '='
        };
    }

    @Inject('$templateCache')
    static directiveInstance($templateCache) {
        NotificationDirective.instance = new NotificationDirective($templateCache);
        return NotificationDirective.instance;
    }
}

@Inject('$scope', '$log', '$parse', '$timeout', 'NotificationService')
class NotificationController extends BaseController {
    constructor($scope, $log, $parse, $timeout, NotificationService) {
        super();

        this.injections = {
            $scope: $scope,
            $log: $log,
            $parse: $parse,
            $timeout: $timeout,
            NotificationService: NotificationService
        };

        this.state = { notification: {}, timeout: null };

        this.watchers = [
            { watchFor: () => { return this.injections.$scope.notification; }, watchWith: '_notificationWatcher', watchDeep: true }
        ];

        this._initializeState();
        this._initializeWatchers();
    }

    /**
     * Action triggered on notification cross icon click. Set notification state status to "closed".
     * @param {object} params - object that describes notification.
     * @param {object} params.notification - notification that should be closed.
     * @param {string} params.by - closed by flag.
     */
    close(params = { notification: null, by: 'user' }) {
        params.notification.state.closed = true;
        this.injections.NotificationService.close({
            notification: params.notification,
            by: params.by || Notification.RESPOND_BY.USER,
            triggerEvent: true
        });
    }

    /**
     * Action triggered on notification buttons click (okay, cancel, confirm).
     * @param {object} params - respond "message".
     * @param {string} params.action - action type (close, okay, etc).
     * @param {string} params.by - respond by parameter. If nothing given, takes "respond by user".
     */
    respondWith(params = { action: null, notification: null, by: null }) {
        params.notification.state.closed = true;
        this.injections.NotificationService.respondWith({
            notification: params.notification,
            action: params.action,
            by: params.by || Notification.RESPOND_BY.USER,
            triggerEvent: true
        });
    }

    /**
     * Simply resolves the class name of the notification.
     * @param {object} params - parameters object.
     * @param {object} params.notification - notification to resolve the class name for.
     * @returns {string} - notification element class.
     */
    resolveNotificationStyle(params = { notification: null }) {
        let style = 'floating';
        let notificationCategory = (params.notification.state || {}).category;

        if (notificationCategory == Notification.CATEGORIES.INFO) {
            style = 'info';
        } else if (notificationCategory == Notification.CATEGORIES.WARNING) {
            style = 'warning';
        } else if (notificationCategory == Notification.CATEGORIES.ERROR) {
            style = 'negative';
        }

        return style;
    }

    /**
     * Uses for self-killing mode by timeout with 60 seconds.
     * @private
     */
    _killMyself() {
        this.state.timeout = null;
        this.close({ notification: this.state.notification, by: 'timeout' });
    }

    /**
     * State initializer method. Initializes the state with given notification.
     * If notification mode is set to "self-killer", adds interval for notification kill.
     * @param {object} params - parameters object.
     * @param {object} params.notification - main notification needed for initialization.
     * @private
     */
    _initializeState(params = { notification: {} }) {
        this.state.notification = params.notification;

        // uncomment it if we want to kill notification when some time interval passed
        if (_.isObject(this.injections.$scope.notificationMode) && this.injections.$scope.notificationMode.selfKiller && this.state.timeout == null) {
            this.state.timeout = this.injections.$timeout(() => {
                this._killMyself();
            }, 60000);
        }
    }

    /**
     * Returns watcher for scope.notification changes.
     * @param context - "this" context for directive controller.
     * @returns {Function} - main watcher.
     * @private
     */
    _notificationWatcher(context) {
        return (newValue) => {
            if (newValue != null) {
                context._initializeState({ notification: newValue });
            }
        };
    }
}

export default NotificationDirective;
export { NotificationDirective, NotificationController };
