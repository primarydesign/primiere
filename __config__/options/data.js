import dreq from 'require-dir';
import fm from 'front-matter';
import merge from 'merge';
import path from 'path';
import proot from 'proot';

module.exports = function(Primiere) {
	const sourceData = path.resolve(proot(), Primiere.paths.data.src);
	return function(file) {
		const locals = Primiere.extend.locals;
		const data = dreq(path.relative(__dirname, sourceData));
		const envars = Primiere.envars;
		const matter = fm(String(file.contents));
		const page = {page: matter.attributes };
		page.page.basename = path.parse(file.path).name;
		file.contents = new Buffer(matter.body);
		return merge(Primiere.extend.locals, data, envars, page);
	}
}