const GroupDocs = require('groupdocs-conversion-cloud');
const fs = require('fs');
require('dotenv').config();

//Convert API
const convertApi = GroupDocs.ConvertApi.fromKeys(process.env.APPID, process.env.APPKEY);

fs.readdir('./PDF', (err, files) => {
	for (const file of files) {
		console.log(file);
		const currentFile = fs.readFileSync(`./PDF/${file}`);
		const request = new GroupDocs.ConvertDocumentDirectRequest("docx", currentFile);
		convertApi.convertDocumentDirect(request)
			.then((result) => {
				fs.writeFile(`./DOC/${file}.docx`, result, "binary", err => { console.log(err ? err.message : 'Success') });
				console.log(`Document ${file} converted: ` + result.length);
			})
			.catch(err => console.log("Error: " + err.message)
			);
	};
});

/*
// Construct Api
const api = GroupDocs.InfoApi.fromKeys(process.env.APPID, process.env.APPKEY);
const request = new GroupDocs.GetSupportedConversionTypesRequest();
// retrieve supported conversion types
api.getSupportedConversionTypes(request)
	.then(function (response) {
		console.log("Supported file-formats:")
		response.forEach(function (format) {
			console.log(format.sourceFormat + ": [" + format.targetFormats.join(", ") + "]");
		});
	})
	.catch(function (error) {
		console.log("Error: " + error.message)
	});
*/