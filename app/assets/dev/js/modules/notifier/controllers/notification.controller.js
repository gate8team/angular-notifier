import { Inject } from '../decorators/main.decorator.js';
import { BaseController } from './base.controller.js';

@Inject('$scope', '$log')
class NotificationController extends BaseController {
    constructor($scope, $log) {
        super();
        this.injections = {
            $scope: $scope,
            $log: $log
        };
        this._initializeInjections();

        this.$scope.state = {
            message: 'ssss'
        };
    }
}

export default NotificationController;
export { NotificationController };