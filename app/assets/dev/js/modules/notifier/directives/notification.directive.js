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
            notification: '='
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

    close(params = { notification: null, by: 'user' }) {
        params.notification.state.closed = true;
        this.injections.NotificationService.close({
            notification: params.notification,
            by: params.by || Notification.RESPOND_BY.USER,
            triggerEvent: true
        });
    }

    respondWith(params = { action: null, notification: null, by: null }) {
        params.notification.state.closed = true;
        this.injections.NotificationService.respondWith({
            notification: params.notification,
            action: params.action,
            by: params.by || Notification.RESPOND_BY.USER,
            triggerEvent: true
        });
    }

    resolveNotificationStyle(params = { notification : null}) {
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

    _killMyself() {
        this.state.timeout = null;
        this.close({ notification: this.state.notification, by: 'timeout' });
    }

    _initializeState(params = { notification: {} }) {
        this.state.notification = params.notification;

        // uncomment it if we want to kill notification when some time interval passed
        //if (this.state.timeout == null) {
        //    this.state.timeout = this.injections.$timeout(() => {
        //        this._killMyself();
        //    }, 10000);
        //}
    }

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
