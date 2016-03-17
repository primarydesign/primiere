import {envar} from '../library/environ';

module.exports = {
	collapseWhitespace: envar('development', false, true)
}