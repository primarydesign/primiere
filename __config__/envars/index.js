import chalk from 'chalk';

module.exports = function(env) {
	try {
		return require(`./${env}`);
	} catch (error) {
		let message = `Could not find envars file for environment '${env}'`;
		console.log(`Primiere Error: ${chalk.red(message)}`);
		return {};
	}
}