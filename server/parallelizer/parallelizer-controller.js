const AppFilesystemConstants = require('./filesystem-constants').AppFilesystemConstants;
const dao = require('../dao/dao');

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
           });
        // exec
        // send file to client output stream
    }
}