import {argv} from 'yargs';
module.exports = function(Primiere) {
	return {
		server: {
			baseDir: Primiere.paths.root.app
		},
		ghostMode: false,
		notify: false,
		open: (Boolean(argv.u))
			? 'ui-external'
			: (Boolean(argv.o))
				? 'external'
				: false
	}
} 