const AppFilesystemConstants = require('./filesystem-constants').AppFilesystemConstants;
const dao = require('../dao/dao');
const fs = require('fs');

module.exports.ParallelizerController = class ParallelizerController {
    
    static get fcConstants() {
        return AppFilesystemConstants;
    }

    static parallelize(connection, filenames, optionId, outStream) {
        const executionConfiguration = {
            cmdLine: null,
            extensions: null
        }
        // dao call for a command line
        dao.getCommandLineForMethod(connection, optionId)
           .then(resultRow => {
                executionConfiguration.cmdLine = `.${this.fcConstants.OPS_TOOLS_DIR}${resultRow.CMD_LINE} ${filenames.join(' ')}`;
                console.log(executionConfiguration.cmdLine);
                return dao.getExtensionsForMethod(connection, optionId);
           })
           .then((extensions) => {
                executionConfiguration.extensions = extensions;
           })
           .then(() => {
                console.log(executionConfiguration);
                // let files = [];
                if (false)
                    for (let i = 0; i < filenames.length; ++i) {
                        // files.push(fs.readFileSync(filenames[i], 'binary'));
                        let file = fs.readFileSync(filenames[i], 'binary');

                        // outStream.setHeader('Content-Length', fs.statSync(filenames[i]));
                        // outStream.setHeader('Content-Type', 'text');
                        // outStream.setHeader('Content-Disposition', 'attachment; filename=' + filenames[i]);
                        // outStream.sendFile(filenames[i]);                    
                        // outStream.write(file, 'binary');
                        // outStream.send(new Buffer(file, 'binary'));
                        outStream.download(filenames[i], 'file', function(err){
                            if (err) {
                                console.log("ERROR!");
                            } else {
                                console.log("OK");
                            }
                        });
                    }

           });
    }
}