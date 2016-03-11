const cssnano = require('cssnano');
const precss = require('precss');
const reporter = require('postcss-reporter');
const rucksack = require('rucksack-css');
const stylelint = require('stylelint');
const imports = require('postcss-import');
const flexibility = require('postcss-flexibility');

module.exports = [
	imports(),
	stylelint(),
	reporter({
		clearMessages: true
	}),
	precss(),
	rucksack(),
	flexibility(),
	cssnano()
];