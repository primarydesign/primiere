import typename from 'type-name';
module.exports = function(configuration) {
	Object.keys(configuration).map(function(key) {
		configuration[key] = constructNode(configuration[key], key);
	});
	return configuration;
}

function constructNode(node, history) {
	if (node.src) enforceSlash(node, 'src');
	if (node.dest) enforceSlash(node, 'dest');
	Object.keys(node).map(function(key) {
		node[key] = resolveSrc(node[key], node.src, crawlKeys(key, history));
	});
	if (node.files && node.ignore) {
		mergeIgnore(node, 'files');
	}
	if (!node.watch) {
		node.watch = node.files;
	}
	return node;
}

function resolveSrc(input, src, keyname) {
	switch(typename(input)) {
		case ('Object'):
			Object.keys(input).map(function(key) {
				input[key] = resolveSrc(input[key], src, crawlKeys(key, keyname));
			});
			break;
		case ('Array'):
			input = input.map(function(item) {
				return resolveSrc(item, src, keyname);
			});
			break;
		case ('String'):
		case ('string'):
			input = input.replace('~/', src);
			if (keyname.search('ignore') > -1) {
				input = negateGlob(input);
			}
			break;
	}
	return input;
}

function enforceSlash(node, key) {
	if (!node[key].endsWith('/')) node[key] = `${node[key]}/`;
}

function crawlKeys(key, history) {
	return `${history}.${key}`;
}

function mergeIgnore(node, key) {
	node[key] = node[key].concat(node.ignore);
}

function negateGlob(input) {
	if (!input.startsWith('!')) {
		input = `!${input}`;
	}
	return input;
}