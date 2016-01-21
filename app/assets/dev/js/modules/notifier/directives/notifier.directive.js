import { Inject } from '../decorators/main.decorator.js';
import { BaseController } from '../controllers/base.controller.js';

class NotifierDirective {
    constructor() {
        this.templateUrl = '/assets/dev/js/modules/notifier/templates/notifier.html';
        this.restrict = 'AE';
        this.controller = 'NotifierController';
        this.controllerAs = 'notifier';
        this.scope = {
            notifierQueue: '='
        };
    }

    static directiveInstance() {
        NotifierDirective.instance = new NotifierDirective();
        return NotifierDirective.instance;
    }
}

@Inject('$scope', '$log', '$parse')
class NotifierController extends BaseController {
    constructor($scope, $log, $parse) {
        super();

        this.injections = {
            $scope: $scope,
            $log: $log,
            $parse: $parse
        };

        this.state = { queue: [] };

        this.watchers = [
            { watchFor: () => { return this.injections.$scope.notifierQueue; }, watchWith: '_notifierQueueWatcher', watchDeep: true }
        ];

        this._initializeState();
        this._initializeWatchers();
    }

    _initializeState(params = { queue: [] }) {
        this.state.queue = params.queue;
    }

    _notifierQueueWatcher(context) {
        return (newValue) => {
            if (newValue != null) {
                context._initializeState({ queue: newValue });
            }
        };
    }
}

export default NotifierDirective;
export { NotifierDirective, NotifierController };
