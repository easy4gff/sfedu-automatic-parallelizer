// require('shelljs/global');
const shelljs = require('shelljs')
const AppFilesystemConstants = require('./filesystem-constants').AppFilesystemConstants;
const FilesystemUtils = require('./filesystem-utils').FilesystemUtils;
const dao = require('../dao/dao');
const fs = require('fs');
const randomstring = require("randomstring");
const zip = require('node-native-zip');

module.exports.ParallelizerController = class ParallelizerController {
    
    static get fcConstants() {
        return AppFilesystemConstants;
    }

    static base64_encode(file) {
        // read binary data
        var bitmap = fs.readFileSync(file);
        // convert binary data to base64 encoded string
        return new Buffer(bitmap).toString('base64');
    }

    static parallelize(connection, files, destFolder, optionId, return return outStream) {

        const executionConfiguration = {
            cmdLine: null,
            extensions: null
        }
        let filenamesBeforeModification = [];
        let filenamesToSend = [];
        let filenamesResulting = [];

        try {

            const physicalFilenames = files.map(file => file.path);
            // dao call for a command line
            dao.getCommandLineForMethod(connection, optionId)
            .then(resultRow => {
                    executionConfiguration.cmdLine = `${this.fcConstants.OPS_TOOLS_DIR}${resultRow.CMD_LINE} ${physicalFilenames.join(' ')}`;
                    return dao.getExtensionsForMethod(connection, optionId);
            })
            .then((extensions) => {
                    executionConfiguration.extensions = extensions;
            })
            .then(() => {
                    console.log(executionConfiguration);
        
                    // Exec logic
                    try {
                        console.log('Call exec');
                        require('child_process').exec(executionConfiguration.cmdLine, function puts(error, stdout, stderr) {                    
                        // shelljs.exec(executionConfiguration.cmdLine, function(status, output) {
                            console.log('Got results');

                            if (error && error.code != 0) {
                                console.log('Error after exec');
                                return outStream.send({
                                    status: 'ERR',
                                    type: 'error message',
                                    message: `signal: ${error.signal}
                                    error code: ${error.code}
                                    stdout: ${stdout}
                                    stderr: ${stderr}
                                    `
                                });
                            } else {                      

                                filenamesToSend = [];
                                files.forEach(file => {
                                    let found = false;
                                    for (let i = 0; i < executionConfiguration.extensions.resulting.length; ++i) {
                                        const outputPath = ParallelizerController.fcConstants.RESULTS_WORKING_DIR + file.filename + executionConfiguration.extensions.resulting[i];
                                        if (fs.existsSync(outputPath)) {
                                            if (!found) {
                                                found = true;
                                                filenamesBeforeModification.push(file.path);
                                            }
                                            console.log('Found: ' + outputPath);
                                            filenamesToSend.push(outputPath);
                                            filenamesResulting.push(outputPath);
                                        } else {
                                            console.log('Not found: ' + outputPath);                                    
                                        }
                                    }
                                    if (!found) {
                                        filenamesToSend.push(file.path);
                                        
                                    }
                                });

                                console.log(filenamesToSend);

                                if (filenamesToSend.length > 1) {
                                    // zip logic
                                    // what should I do to rename multiple files?
                                    // maybe create temporary dir, move files there and then send and remove dir with -rf flag?
                                    // SOUNDS VERY GOOD!!!


                                    let archive = new zip();
                                    archive.addFiles(files.map((file, index, array) => {
                                        return {
                                            name: file.filename,
                                            path: filenamesToSend[index]
                                        };
                                    }), (err) => {
                                        if (err) {
                                            return outStream.send({
                                                status: 'ERR',
                                                type: 'error message',
                                                message: `signal: ${error.signal}
                                                error code: ${error.code}
                                                stdout: ${stdout}
                                                stderr: ${stderr}
                                                `
                                            });
                                        } else {
                                            var buff = archive.toBuffer();
                                            return outStream.send({
                                                status: 'OK',
                                                type: 'result',
                                                filename: 'results.zip',
                                                file: buff.toString('base64')
                                            });
                                            console.log('Success!\n\n\n\n\n\n');
                                        }
                                        FilesystemUtils.cleanFiles(
                                            files,
                                            filenamesResulting,
                                            executionConfiguration.extensions.producing,
                                            destFolder
                                        );
                                        // fs.writeFile("./test2.zip", buff, function () {
                                        //     console.log("Finished");
                                        // });
                                    });
                                    // mk random dir
                                    // const newdirName = randomstring.generate();
                                    // exec('mkdir ' + newdirName, (st, out) => {
                                    //     if (st == 0) {
                                    //         for (let i = 0; i < filenamesToSend.length; ++i) {
                                    //             exec(`mv ${filenamesToSend[i]} ${newdirName}/${files[i].filename}}`);
                                    //         }
                                    //     } else {
                                    //         throw out;
                                    //     }
                                        
                                        
                                    // });
                                } else {
                                    // send as is
                                    return outStream.send({
                                        status: 'OK',
                                        type: 'result',
                                        filename: files[0].filename,
                                        file: ParallelizerController.base64_encode(filenamesToSend[0])
                                    });
                                    FilesystemUtils.cleanFiles(
                                        files,
                                        filenamesResulting,
                                        executionConfiguration.extensions.producing,
                                        destFolder
                                    );
                                }
                            }
                        });
                    } catch (e) {
                        console.error(e);
                    }

            });
        }
        catch (e) {
            console.log('Unexpected error');
            return outStream.send({
                status: 'ERR',
                type: 'error message',
                message: 'error while running executional file'
            });
            FilesystemUtils.cleanFiles(
                files,
                filenamesResulting,
                executionConfiguration.extensions.producing,
                destFolder
            );
        }
    }


}