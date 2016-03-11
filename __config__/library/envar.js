module.exports = function(environment, expression, fallback = null) {
	return (this === String(environment))
		? execute(expression)
		: execute(fallback);
}

function execute(input) {
	return (typeof input === 'function')
		? input()
		: input;
}