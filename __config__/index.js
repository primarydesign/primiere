const dreq = require('require-dir');
const extend = dreq('extend');
const library = dreq('library');
const options = dreq('options');

const paths = library.configure(require('../.primiere'));

export { paths, extend, library, options };