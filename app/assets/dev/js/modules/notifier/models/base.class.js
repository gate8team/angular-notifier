class Base {
    constructor() {}

    /**
     * Helps us to build the properties for object.
     * @param {Object} config - properties that should be set up.
     * @param {boolean} selfOnly - if we need to iterate only for current instance properties or for config passed.
     * @returns {Base} self.
     */
    rebuild(config, selfOnly = false) {
        let propertiesSet = selfOnly ? this : config;

        for (let property in propertiesSet) {
            if (config.hasOwnProperty(property)) {
                this[property] = config[property];
            }
        }

        return this;
    }

    static getRandomProperty(obj) {
        let keys = _.keys(obj);
        return obj[keys[ keys.length * Math.random() << 0]];
    }

    static instanceFactory() {
        return new Base();
    }
}

export default Base;
export { Base };
