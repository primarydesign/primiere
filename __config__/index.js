import dreq from 'require-dir';
import configs from '../.primiere';
import {envar, envars} from './environ';

const extend = dreq('./extend');
const library = dreq('./library');
const options = dreq('./options');
const paths = library.configure(configs.paths);

export { configs, envar, envars, extend, library, options, paths };