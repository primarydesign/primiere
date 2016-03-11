import {argv} from 'yargs';
import configs from '../.primiere';

const env = (argv.env||argv.e) || 'development';
const envars = (configs.enableEnvars) ? require('./envars')(env) : {}
const envar = function (environment, expression, fallback = null) {
	return (env === String(environment))
		? expression
		: fallback;
}
 export { envar, envars };