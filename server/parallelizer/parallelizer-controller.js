const AppFilesystemConstants = require('./filesystem-constants').AppFilesystemConstants;
const dao = require('../dao/dao');
const fs = require('fs');

module.exports.ParallelizerController = class ParallelizerController {
    
    static get fcConstants() {
        return AppFilesystemConstants;
    }

    static parallelize(connection, filenames, optionId, outStream) {
        // dao call for a command line
        dao.getCommandLineForMethod(connection, optionId)
           .then(resultRow => {
                console.log('CMD LINE: ' + resultRow.CMD_LINE);
                console.log(`.${this.fcConstants.OPS_TOOLS_DIR}${resultRow.CMD_LINE} ${filenames.join(' ')}`);
           })
           .then(() => {
                console.log("TEST PROMISE!");
                // let files = [];
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
        // exec
        // send file to client output stream
    }
}