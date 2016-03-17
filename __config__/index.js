import dreq from 'require-dir';
import configs from '../.primiere';

const extend = dreq('./extend', {recurse: true});
const library = dreq('./library');
const options = dreq('./options');
const paths = library.configure(configs.paths);
const envars = library.environ.envars;
const envar = library.environ.envar;

export { configs, envar, envars, extend, library, options, paths };