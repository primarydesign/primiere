var cssnano = require('cssnano');
var precss = require('precss');
var reporter = require('postcss-reporter');
var rucksack = require('rucksack-css');
var stylelint = require('stylelint');
var imports = require('postcss-import');

module.exports = [
	imports(),
	stylelint(),
	reporter({
		clearMessages: true
	}),
	precss(),
	rucksack(),
	cssnano()
];