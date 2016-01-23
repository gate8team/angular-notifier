import { Inject } from '../decorators/main.decorator.js';
import { BaseController } from '../controllers/base.controller.js';

class NotificationDirective {
    constructor() {
        this.templateUrl = '/assets/dev/js/modules/notifier/templates/single-notification.html';
        this.restrict = 'AE';
        this.controller = 'SingleNotificationController';
        this.controllerAs = 'singleNotification';
        this.scope = {
            notification: '='
        };
    }

    static directiveInstance() {
        NotificationDirective.instance = new NotificationDirective();
        return NotificationDirective.instance;
    }
}

@Inject('$scope', '$log', '$parse')
class SingleNotificationController extends BaseController {
    constructor($scope, $log, $parse) {
        super();

        this.injections = {
            $scope: $scope,
            $log: $log,
            $parse: $parse
        };

        this.state = { notification: {} };

        this.watchers = [
            { watchFor: () => { return this.injections.$scope.notification; }, watchWith: '_notificationWatcher', watchDeep: true }
        ];

        this._initializeState();
        this._initializeWatchers();
    }

    _initializeState(params = { notification: {} }) {
        this.state.notification = params.notification;
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
export { NotificationDirective, SingleNotificationController };
