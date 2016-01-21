import 'babel-polyfill';
import { NotificationController } from './controllers/notification.controller.js';
import { NotificationService } from './models/notification.service.js';
import { NotifierDirective, NotifierController } from './directives/notifier.directive.js';

let notifierModule = angular.module('g8.Notifier', []);

notifierModule.controller('NotificationController', NotificationController);
notifierModule.factory('NotificationService', NotificationService.instanceFactory);
notifierModule.controller('NotifierController', NotifierController);
notifierModule.directive('notifier', NotifierDirective.directiveInstance);

export default notifierModule;
export { notifierModule };