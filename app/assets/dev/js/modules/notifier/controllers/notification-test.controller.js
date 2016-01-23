import { Inject } from '../decorators/main.decorator.js';
import { BaseController } from './base.controller.js';

@Inject('$scope', '$log', 'NotificationService')
class NotificationTestController extends BaseController {
    constructor($scope, $log, NotificationService) {
        super();
        this.injections = {
            $scope: $scope,
            $log: $log,
            NotificationService: NotificationService
        };
        this._initializeInjections();
        this.$scope.notificationQueue = NotificationService.getQueue();
    }
}

export default NotificationTestController;
export { NotificationTestController };