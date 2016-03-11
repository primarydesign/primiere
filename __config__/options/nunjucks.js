import dreq from 'require-dir';

const extend = dreq('../extend/',  {recurse:true});

function configureNunjucks(env) {
	if (extend.tags && Object.keys(extend.tags).length > 0)
		addCustom('Extension', extend.tags, env);
	if (extend.filters && Object.keys(extend.filters).length > 0)
		addCustom('Filter', extend.filters, env);
}

function addCustom(type, extensions, env) {
	Object.keys(extensions).map(function(key) {
		env[`add${type}`](key, extensions[key]);
	});
}

module.exports = function($) {
	return {
		path: $.pages.paths,
		manageEnv: configureNunjucks,
		envOptions: {
			noCache: true
		}
	}
}