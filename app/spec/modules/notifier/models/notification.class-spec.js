import { Notification } from '../../../../assets/dev/js/modules/notifier/models/notification.class.js';

describe('Notification', () => {
    let notification = null;

    beforeEach(() => {
        notification = new Notification();
    });

    it('should have properties', () => {
        expect(_.isEmpty(notification)).toBeFalsy();
    });
});