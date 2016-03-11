import dreq from 'require-dir';
import {argv} from 'yargs';
import paths from '../.primiere';

const env = (argv.env||argv.e) || 'development';
const envars = require('./envars')(env);
const extend = dreq('./extend');
const library = dreq('./library');
const options = dreq('./options');
const configs = library.configure(paths);
const envar = library.envar.bind(env);

export { configs, env, envar, envars, extend, library, options};