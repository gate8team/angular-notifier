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
            }
        };
        this._initializeInjections();
        this.$scope.notificationQueue = NotificationService.getQueue();
    }

    addNotificationToQueue(params = { notification: {} }) {
        this.injections.NotificationService.addNotification({ notification: params.notification });
    }
}

export default NotificationTestController;
export { NotificationTestController };