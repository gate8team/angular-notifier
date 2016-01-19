import 'lodash';
import 'angular';
import 'angular-mocks';
import './assets/dev/js/modules/notifier/notifier.module.js';

let context = require.context('./spec', true, /-spec\.js$/);
context.keys().forEach(context);
