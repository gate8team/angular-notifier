import 'babel-polyfill';
import { NotificationController } from './controllers/notification.controller.js';
import { NotificationService } from './models/notification.service.js';

let notifierModule = angular.module('g8.Notifier', []);

notifierModule.controller('NotificationController', NotificationController);
notifierModule.factory('NotificationService', NotificationService.instanceFactory);

export default notifierModule;
export { notifierModule };