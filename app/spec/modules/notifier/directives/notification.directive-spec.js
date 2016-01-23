import { Notification } from '../../../../assets/dev/js/modules/notifier/models/notification.class.js';

describe('The NotificationDirective', () => {
    let element = null;
    let scope = null;

    beforeEach(angular.mock.module('g8.Notifier'));

    beforeEach(inject(function(_$rootScope_, _$compile_) {
        let $rootScope = _$rootScope_;
        let $compile = _$compile_;
        scope = $rootScope.$new();
        scope.notification = new Notification({ state: {
            from: 'userManagement',
            category: Notification.CATEGORIES.INFO,
            header: 'Password expiration',
            content: 'Your password expires in the next 2 days, please change it using the user management interface.',
            type: Notification.TYPES.NOTE
        }});
        element = angular.element('<div notification="notification"></div>');
        $compile(element)(scope);
    }));

    it('should display the correct content', () => {
        scope.$digest();
        expect(angular.element(element[0].querySelector('.notification-content')).text().trim()).toEqual(scope.notification.state.content);
    });

    it('should display the correct header', () => {
        scope.$digest();
        expect(angular.element(element[0].querySelector('.notification-header')).text().trim()).toEqual(scope.notification.state.header);
    });
});
