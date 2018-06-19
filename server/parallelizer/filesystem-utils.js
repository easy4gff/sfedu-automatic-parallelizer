const fs = require('fs');
const AppFilesystemConstants = require('./filesystem-constants').AppFilesystemConstants;
const dao = require('../dao/dao');
const shelljs = require('shelljs');

module.exports.FilesystemUtils = class FilesystemUtils {

    static prepareFilesDir(filenames) {
        return new Promise((resolve, reject) => {
            const dirname = AppFilesystemConstants.UPLOAD_DIR + require('randomstring').generate({ charset: 'alphanumeric'});
            shelljs.mkdir(dirname);
            for (let i = 0; i < filenames.length; ++i) {
                const newPath = dirname + '/' + filenames[i].filename;
                shelljs.mv(filenames[i].path, newPath);
                filenames[i].path = newPath;
            }

            resolve({
                destFolder: dirname,
                filenames: filenames
            });
        });
    }

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
                    filename: 'main_' + new Date() + '.c',
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

                   const dirname = AppFilesystemConstants.UPLOAD_DIR + require('randomstring').generate({ charset: 'alphanumeric'});
                   shelljs.mkdir(dirname); 
                   let filenames = [];
                   let countSuccessfullWrittenFiles = 0;
                   for (let i = 0; i < example.codefiles.length; ++i) {
                       const filename = dirname + '/' + example.codefiles[i].filename;
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
                                    resolve({
                                        filenames: filenames,
                                        destFolder: dirname
                                    });
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

    static cleanFiles(files, outPutFiles, producingExtensions, filesDir) {
        console.log('Cleaning directory');
        // Remove files which were produced as output files
        outPutFiles.forEach(file => {
            if (fs.existsSync(file)) {
                fs.unlink(file, (err) => {
                    if (err) console.error(err);
                });
            }
        })

        // Remove files which were produced, but not required in response
        files.forEach(file => {
            producingExtensions.forEach((val, index, arr) => {
                const produced = file.path + val;
                if (fs.existsSync(produced)) {
                    fs.unlink(produced, (err) => {
                        if (err) console.error(err);
                    });
                }
            }) 
        });

        console.log(filesDir);
        // Remove directory with original files
        shelljs.rm('-rf', filesDir);
    }
}