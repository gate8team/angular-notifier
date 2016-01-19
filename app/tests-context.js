import 'lodash';
import 'angular';
import 'angular-mocks';

let context = require.context('./spec', true, /-spec\.js$/);
context.keys().forEach(context);
