const fs = require('fs');
const AppFilesystemConstants = require('./filesystem-constants').AppFilesystemConstants;
const dao = require('../dao/dao');

module.exports.FilesystemUtils = class FilesystemUtils {

    static makeFileFromCodeString(connection, req, code, resStream) {
        return new Promise((resolve, reject) => {
            // const filename = (AppFilesystemConstants.OPS_TOOLS_DIR + req.sessionID + new Date()).replace(/\s+/g, '') + '.c';
            const filename = AppFilesystemConstants.UPLOAD_DIR + require('randomstring').generate({ charset: 'alphanumeric'});
            console.log(filename);
            console.log(code);
            fs.writeFile(filename, code, (err) => {
                if (err) {
                    reject(err);
                }
                resolve({
                    filename: 'main_' + new Date() + '_',
                    path: filename
                });
            });
        });
    }

    static makeFilesFromLibraryExamples(connection, exampleId, resStream) {
        return new Promise((resolve, reject) => {
            dao.getCodeExample(connection, exampleId, resStream)
               .then(examples => {
                   const example = examples[0];
                   if (example === undefined) {
                       reject({
                           error: 'Example not exists!'
                       });
                   }

                   let filenames = [];
                   let countSuccessfullWrittenFiles = 0;
                   for (let i = 0; i < example.codefiles.length; ++i) {
                       const filename = AppFilesystemConstants.UPLOAD_DIR + require('randomstring').generate({ charset: 'alphanumeric'});
                       const code = example.codefiles[i].code;
                       try {
                            fs.writeFile(filename, code, (err) => {
                                if (err) reject(err);

                                filenames.push({
                                    filename: example.codefiles[i].filename,
                                    path: filename
                                });

                                countSuccessfullWrittenFiles++;
                                if (countSuccessfullWrittenFiles === example.codefiles.length) {
                                    resolve(
                                        filenames
                                    );
                                }
                            }); 
                        }
                        catch (e) {
                            reject({
                                error: e.message
                            });
                        }             
                   }
               })
        })
    }

    static cleanFiles(files, filenamesToSend, filenameBeforeModifications, producingExtensions) {
        // filenamesToSend.forEach(filename => {
        //     fs.unlink(filename, (err) => {
        //         if (err) console.error(err);
        //     });
        // })

        // filenameBeforeModifications.forEach(filename => {
        //     fs.unlink(filename, (err) => {
        //         if (err) console.error(err);
        //     });
        // })

        // files.forEach(file => {
        //     producingExtensions.forEach((val, index, arr) => {
        //         const produced = file.path + val;
        //         if (fs.existsSync(produced)) {
        //             fs.unlink(produced, (err) => {
        //                 if (err) console.error(err);
        //             });
        //         }
        //     }) 
        // })
    }
}