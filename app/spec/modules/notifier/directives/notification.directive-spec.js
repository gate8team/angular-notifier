import { Notification } from '../../../../assets/dev/js/modules/notifier/models/notification.class.js';

describe('The NotificationDirective', () => {
    let element = null;
    let scope = null;

    beforeEach(angular.mock.module('g8.Notifier'));

    beforeEach(inject((_$rootScope_, _$compile_, _$httpBackend_) => {
        let $rootScope = _$rootScope_;
        let $compile = _$compile_;
        let $httpBackend = _$httpBackend_;
        $httpBackend.whenPATCH('/xxx.json').respond('Mocked stuff...');
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

    it('should display the correct info type', () => {
        scope.$digest();
        expect(angular.element(element[0].querySelector('.message')).hasClass('info')).toBeTruthy();
    });

    it('should display the correct warning type', () => {
        scope.notification.rebuild({ state: { category: Notification.CATEGORIES.WARNING }});
        scope.$digest();
        expect(angular.element(element[0].querySelector('.message')).hasClass('warning')).toBeTruthy();
    });

    it('should display the correct error type', () => {
        scope.notification.rebuild({ state: { category: Notification.CATEGORIES.ERROR }});
        scope.$digest();
        expect(angular.element(element[0].querySelector('.message')).hasClass('negative')).toBeTruthy();
    });

    it('should have ability to close the notification', () => {
        scope.$digest();
        angular.element(element[0].querySelector('.close.icon')).triggerHandler('click');
        expect(scope.notification.state.closed === true).toBeTruthy();
    });
});
