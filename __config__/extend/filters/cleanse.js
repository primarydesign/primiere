module.exports = function(input) {
	return input
		.replace(/[\s\/]+/g, '-')
		.replace(/[^\w\-]/g, '')
		.replace(/[\/]+/g, '-')
		.toLowerCase()
		.trim();
}