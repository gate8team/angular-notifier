describe('The HelloWorldDirective', () => {
    let element = null;
    let scope = null;

    beforeEach(angular.mock.module('g8.Notifier'));

    beforeEach(inject(function(_$rootScope_, _$compile_) {
        let $rootScope = _$rootScope_;
        let $compile = _$compile_;

        scope = $rootScope.$new();

        element = angular.element('<div>Hello {{ ::name }}></div>');

        $compile(element)(scope);

    }));

    it('should display the defined name', () => {
        let name = 'Some rendered text';
        scope.name = name;
        scope.$digest();
        expect(element.text()).toContain(`Hello ${name}`);
    });
});
