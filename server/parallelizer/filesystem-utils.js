const fs = require('fs');
const AppFilesystemConstants = require('./filesystem-constants').AppFilesystemConstants;

module.exports.FilesystemUtils = class FilesystemUtils {

    static makeFileFromCodeString(connection, req, code, resStream) {
        return new Promise((resolve, reject) => {
            const filename = (AppFilesystemConstants.OPS_TOOLS_DIR + req.sessionID + new Date()).replace(/\s+/g, '') + '.c';
            console.log(filename);
            console.log(code);
            fs.writeFile(filename, code, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(filename);
            });
        });
    }

    static cleanFiles(files, filenamesToSend, filenameBeforeModifications, producingExtensions) {
        filenamesToSend.forEach(filename => {
            fs.unlink(filename, (err) => {
                if (err) console.error(err);
            });
        })

        filenameBeforeModifications.forEach(filename => {
            fs.unlink(filename, (err) => {
                if (err) console.error(err);
            });
        })

        files.forEach(file => {
            producingExtensions.forEach((val, index, arr) => {
                const produced = file.path + val;
                if (fs.existsSync(produced)) {
                    fs.unlink(produced, (err) => {
                        if (err) console.error(err);
                    });
                }
            }) 
        })
    }
}