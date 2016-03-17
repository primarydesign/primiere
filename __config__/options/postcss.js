const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const precss = require('precss');
const reporter = require('postcss-reporter');
const rucksack = require('rucksack-css');
const stylelint = require('stylelint');
const imports = require('postcss-easy-import');
const flexibility = require('postcss-flexibility');

module.exports = [
	imports({
		glob: true
	}),
	stylelint(),
	reporter({
		clearMessages: true
	}),
	precss(),
	rucksack(),
	autoprefixer(),
	flexibility(),
	cssnano({
		discardUnused: false,
		normalizeUrl: false
	})
];