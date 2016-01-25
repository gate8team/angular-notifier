class BaseController {
    constructor() {
        this.watchers = [];
    }

    /**
     * Helps to initialize watchers on current scope passed into injections.
     * @private
     */
    _initializeWatchers() {
        _.each(this.watchers, (instance) => {
            if (_.isFunction(instance.watchFor)) {
                this.watchers.push(
                    (!!instance.watchDeep) ?
                        this.injections.$scope.$watch(instance.watchFor, this[instance.watchWith](this), true) :
                        this.injections.$scope.$watch(instance.watchFor, this[instance.watchWith](this))
                );
            } else {
                this.watchers.push(
                    (!!instance.watchDeep) ?
                        this.injections.$scope.$watch(() => this.injections.$parse(instance.watchFor)(this), this[instance.watchWith](this), true) :
                        this.injections.$scope.$watch(() => this.injections.$parse(instance.watchFor)(this), this[instance.watchWith](this))
                );
            }
        });
    }

    /**
     * Simply makes links to injections inside the injection variable of the instance.
     * @private
     */
    _initializeInjections() {
        for (let injection in this.injections) {
            if (this.injections.hasOwnProperty(injection)) {
                this[injection] = this.injections[injection];
            }
        }
    }
}

export default BaseController;
export { BaseController };
