const fs = require('fs');
const resemble = require('resemblejs');
const compare = require("resemblejs").compare;
const path = require('path');

module.exports = {
	/*
	* Compare two images with Resemblejs
	*/
	compareImages: function(imageApkLimpia, imageApkModificada, resultPath) {
		const options = {
			returnEarlyThreshold: 5
		};
		
		var diff = resemble(imageApkLimpia).compareTo(imageApkModificada).ignoreLess().onComplete(function(data){
            fs.writeFileSync(resultPath, data.getBuffer());
			console.log(data);
		});
		
		return diff;
	},
	
	/*
	* List children of folder
	*/
	listFiles: function(folderPath) {
		let files = fs.readdirSync(folderPath);
		return files;
	}
}




