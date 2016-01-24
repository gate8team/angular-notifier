import 'babel-polyfill';
import { NotificationTestController } from './controllers/notification-test.controller.js';
import { NotificationService } from './models/notification.service.js';
import { NotifierDirective, NotifierController } from './directives/notifier.directive.js';
import { NotificationDirective, NotificationController } from './directives/notification.directive.js';

let notifierModule = angular.module('g8.Notifier', []);

notifierModule.controller('NotificationTestController', NotificationTestController);
notifierModule.factory('NotificationService', NotificationService.instanceFactory);
notifierModule.controller('NotifierController', NotifierController);
notifierModule.directive('notifier', NotifierDirective.directiveInstance);
notifierModule.controller('NotificationController', NotificationController);
notifierModule.directive('notification', NotificationDirective.directiveInstance);

//notifierModule.run(['$http', '$templateCache', ($http, $templateCache) => {
//    let templatesToCache = [
//        '/assets/dev/js/modules/notifier/templates/single-notification.html',
//        '/assets/dev/js/modules/notifier/templates/notifier.html'
//    ];
//    _.each(templatesToCache, (templateUrl) => {
//        $http.get(templateUrl).then((response) => {
//            let template = response.data;
//            $templateCache.put(templateUrl, template);
//        });
//    });
//}]);

notifierModule.run(['$templateCache', ($templateCache) => {
    let templatesToCache = [
        {
            name: '/assets/dev/js/modules/notifier/templates/single-notification.html',
            template: `<div class="ui message" ng-class="[singleNotification.resolveNotificationStyle({ notification: singleNotification.state.notification })]">
                            <i class="close icon" ng-click="singleNotification.close({ notification: singleNotification.state.notification })"></i>
                            <div class="header notification-header">
                                {{ singleNotification.state.notification.state.header }}
                            </div>
                            <p class="notification-content">{{ singleNotification.state.notification.state.content }}</p>
                            <div ng-if="singleNotification.state.notification.state.type != 'note'">
                                <button class="mini ui green button">Okay</button>
                                <button class="mini ui red button"
                                        ng-if="singleNotification.state.notification.state.type == 'ok_cancel_confirm'">Cancel</button>
                                <button class="mini ui blue button">Confirm</button>
                            </div>
                        </div>`
        },
        {
            name: '/assets/dev/js/modules/notifier/templates/notifier.html',
            template: `<div ng-cloak="" class="notifier -fixed">
                            <div ng-repeat="notification in notifier.state.queue" ng-if="!notification.state.closed">
                                <div class="notification -single" notification="notification"></div>
                            </div>
                       </div>`
        }
    ];
    _.each(templatesToCache, (cache) => {
        $templateCache.put(cache.name, cache.template);
    });
}]);

export default notifierModule;
export { notifierModule };