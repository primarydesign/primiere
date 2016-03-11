import {argv} from 'yargs';

module.exports = function($) {
	return Boolean(argv.fresh)
		? $.root.build
		: undefined;
}