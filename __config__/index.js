import dreq from 'require-dir';
import {argv} from 'yargs';
import configs from '../.primiere';

const extend = dreq('./extend');
const library = dreq('./library');
const options = dreq('./options');
const paths = library.configure(configs.paths);

const env = (argv.env||argv.e) || 'development';
const envar = library.envar.bind(env);
const envars = (configs.enableEnvars) ? require('./envars')(env) : {};

export { configs, env, envar, envars, extend, library, options, paths };