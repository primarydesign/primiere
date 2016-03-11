import dreq from 'require-dir';
import fm from 'front-matter';
import merge from 'merge';
import path from 'path';
import proot from 'proot';

module.exports = function(Primiere) {
	const dataPath = path.relative(__dirname, path.resolve(proot(), Primiere.paths.data.src));
	return function(file) {
		const envars = Primiere.envars;
		const data = dreq(dataPath);
		const matter = fm(String(file.contents));
		file.contents = new Buffer(matter.body);
		// console.log(merge(data, envars, matter.attributes));
		return merge(data, envars, matter.attributes);
	}
}