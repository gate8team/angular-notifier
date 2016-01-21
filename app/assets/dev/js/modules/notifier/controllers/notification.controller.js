import { Inject } from '../decorators/main.decorator.js';
import { BaseController } from './base.controller.js';

@Inject('$scope', '$log', 'NotificationService')
class NotificationController extends BaseController {
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

export default NotificationController;
export { NotificationController };