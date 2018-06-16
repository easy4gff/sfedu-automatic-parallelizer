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

    static parallelize(connection, files, optionId, outStream) {

        const executionConfiguration = {
            cmdLine: null,
            extensions: null
        }
        let filenamesBeforeModification = [];
        let filenamesToSend = [];

        try {

            const physicalFilenames = files.map(file => file.path);
            // dao call for a command line
            dao.getCommandLineForMethod(connection, optionId)
            .then(resultRow => {
                    executionConfiguration.cmdLine = `${this.fcConstants.OPS_TOOLS_DIR}${resultRow.CMD_LINE} ${physicalFilenames.join(' ')}`;
                    console.log(executionConfiguration.cmdLine);
                    return dao.getExtensionsForMethod(connection, optionId);
            })
            .then((extensions) => {
                    executionConfiguration.extensions = extensions;
            })
            .then(() => {
                    console.log(executionConfiguration);

                    
                    console.log(fs.existsSync(this.fcConstants.OPS_TOOLS_DIR));
                    console.log(fs.existsSync(this.fcConstants.OPS_TOOLS_DIR + 'WebOPSTool'));
                    // Exec logic
                    shelljs.exec(executionConfiguration.cmdLine, function(status, output) {
                        console.log('Exit status:', status);
                        console.log('Program output:', output);
                        // status = exec(executionConfiguration, { maxBuffer: 1024*1024 }).status;
                        // console.log('Exit status:', status);

                        filenamesToSend = [];
                        files.forEach(file => {
                            let found = false;
                            for (let i = 0; i < executionConfiguration.extensions.resulting.length; ++i) {
                                const outputPath = file.path + executionConfiguration.extensions.resulting[i];
                                if (fs.exists(outputPath)) {
                                    if (!found) {
                                        found = true;
                                        filenamesBeforeModification.push(file.path);
                                    }
                                    
                                    filenamesToSend.push(outputPath);
                                }
                            }
                            if (!found) {
                                filenamesToSend.push(file.path);
                            }
                        });

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
                                if (err) throw err;
                                var buff = archive.toBuffer();
                                outStream.send({
                                    status: 'OK',
                                    type: 'result',
                                    filename: 'results.zip',
                                    file: buff.toString('base64')
                                });
                                FilesystemUtils.cleanFiles(
                                    files,
                                    filenamesToSend,
                                    filenamesBeforeModification,
                                    executionConfiguration.extensions.producing
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
                            outStream.send({
                                status: 'OK',
                                type: 'result',
                                filename: files[0].filename,
                                file: ParallelizerController.base64_encode(physicalFilenames[0])
                            });
                            FilesystemUtils.cleanFiles(
                                files,
                                filenamesToSend,
                                filenamesBeforeModification,
                                executionConfiguration.extensions.producing
                            );
                        }
                    });

            });
        }
        catch (e) {
            FilesystemUtils.cleanFiles(
                files,
                filenamesToSend,
                filenamesBeforeModification,
                executionConfiguration.extensions.producing
            );
        }
    }


}