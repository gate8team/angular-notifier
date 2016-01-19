import { Inject } from '../decorators/main.decorator.js';

class NotificationService {
    constructor($http) {
        this.injections = {
            $http: $http
        };
    }

    @Inject('$http')
    static instanceFactory($http) {
        return new NotificationService($http);
    }
}

export default NotificationService;
export { NotificationService };