import { Inject } from '../decorators/main.decorator.js';
import { BaseController } from '../controllers/base.controller.js';

class NotifierDirective {
    constructor($templateCache) {
        //this.templateUrl = '/assets/dev/js/modules/notifier/templates/notifier.html';
        this.template = $templateCache.get('/assets/dev/js/modules/notifier/templates/notifier.html');
        this.restrict = 'AE';
        this.controller = 'NotifierController';
        this.controllerAs = 'notifier';
        this.scope = {
            notifierQueue: '=',
            notifierMode: '='
        };
    }

    @Inject('$templateCache')
    static directiveInstance($templateCache) {
        NotifierDirective.instance = new NotifierDirective($templateCache);
        return NotifierDirective.instance;
    }
}

@Inject('$scope', '$log', '$parse', 'NotificationService')
class NotifierController extends BaseController {
    constructor($scope, $log, $parse, NotificationService) {
        super();

        this.injections = {
            $scope: $scope,
            $log: $log,
            $parse: $parse,
            NotificationService: NotificationService
        };

        this.state = { queue: [] };

        this._resolveMode();
        this._initializeState();
        this._initializeWatchers();
    }

    _initializeState(params = { queue: [] }) {
        this.state.queue = params.queue;
    }

    _resolveMode() {
        if (this.injections.$scope.notifierMode != null && this.injections.$scope.notifierMode.auto) {
            this.injections.NotificationService.loadAll().then((response) => {
                this._initializeState({ queue: response.data });
            }, (response) => {
                this.injections.$log.warn(response);
            });
        } else {
            this.watchers = [
                { watchFor: () => { return this.injections.$scope.notifierQueue; }, watchWith: '_notifierQueueWatcher', watchDeep: true }
            ];
        }
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
