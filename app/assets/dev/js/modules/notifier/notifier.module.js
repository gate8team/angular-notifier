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

export default notifierModule;
export { notifierModule };