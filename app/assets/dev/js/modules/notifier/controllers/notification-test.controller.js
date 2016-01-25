import { Inject } from '../decorators/main.decorator.js';
import { BaseController } from './base.controller.js';
import { Notification } from '../models/notification.class.js';

@Inject('$scope', '$log', 'NotificationService')
class NotificationTestController extends BaseController {
    constructor($scope, $log, NotificationService) {
        super();
        this.injections = {
            $scope: $scope,
            $log: $log,
            NotificationService: NotificationService
        };
        this.state = {
            notification: {
                from: null,
                category: Notification.CATEGORIES.INFO,
                header: null,
                content: null,
                type: Notification.TYPES.NOTE
            },
            types: Notification.TYPES,
            categories: Notification.CATEGORIES
        };
        this._initializeInjections();
        this.$scope.notificationQueue = NotificationService.getQueue();
    }

    /**
     * Form submit action.
     * @param {object} params - contains notification that should be added.
     * @param {object} params.notification - notification to be added to queue.
     */
    addNotificationToQueue(params = { notification: {} }) {
        this.injections.NotificationService.addNotification({ notification: params.notification });
    }
}

export default NotificationTestController;
export { NotificationTestController };
