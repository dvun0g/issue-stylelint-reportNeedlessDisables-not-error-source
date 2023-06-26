const stylelint = require('stylelint');
const path = require('path');
const fs = require('fs');

const rootFolder = path.join(__dirname, '..');

const execute = async function () {
	console.log('Running stylelint...');

	const { results, output, errored } = await stylelint.lint({
		files: 'source/**/*.css',
		configFile: path.join(rootFolder, '.stylelintrc.json'),
		formatter: 'string',
		reportNeedlessDisables: true,
	});

	saveJSON('results.stylelint.json', results);
	console.log(output);

	if (errored) {
		console.log('Stylelint errored :(');
		return;
	}

	console.log('Stylelint done!');
};

const saveJSON = function (name, data) {
	fs.writeFileSync(name, JSON.stringify(data, null, 2));
};

execute();
