const server = require('./functions')

// Modules required
const path = require('path');

// Constants
const screenshotsApkLimpia = "./screens/apk-limpia"
const screenshotsApkModificada = "./screens/apk-modificada"
const screenshotsResults = "./screens/resultados-comparaciones"

var fileList = server.listFiles(screenshotsApkLimpia);
for (i = 0; i < fileList.length; i++){
	console.log("================== SCREENSHOT " + (i+1) +"===============");
	imageApkLimpia = path.join(screenshotsApkLimpia, fileList[i]);
    imageApkModificada = path.join(screenshotsApkModificada, fileList[i]);
    resultPath = path.join(screenshotsResults, fileList[i]);
	var result = server.compareImages(imageApkLimpia, imageApkModificada, resultPath);
	console.log(result);
}