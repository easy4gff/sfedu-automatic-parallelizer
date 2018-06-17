"use strict";

const ParallelizingOption = require('../parallelizing-options/option-model');
const ParallelizingOptionFull = require('../parallelizing-options/option-full-model');
const ParallelizingOptionFullDB = require('../parallelizing-options/option-full-db').ParallelizingOptionFullDB;
const fs = require('fs');

function parseOptions(dbResults, resultStream) {
    let options = [];
    dbResults.forEach(result => {
        const newOption = !options.find(option => option.id === result.ID);

        if (newOption) {
            options.push(new ParallelizingOption(
                result.ID,
                {
                    english: result.ENGLISH_TITLE,
                    russian: result.RUSSIAN_TITLE
                },
                [],
                []
            ))
        }

        let curOption = options.find(option => option.id === result.ID);
        
        if (!curOption.fileInputsMethods.includes(result.INPUT_METHOD_ID)) {
            curOption.fileInputsMethods.push(result.INPUT_METHOD_ID);
        }

        let curLibraryExample = curOption.libraryExamples.find(example => example.id === result.EXAMPLE_ID);
        if (!curLibraryExample) {
            curOption.libraryExamples.push({
                id: result.EXAMPLE_ID,
                label: {
                    russian: result.EXAMPLE_TITLE_RUS,
                    english: result.EXAMPLE_TITLE_ENG
                },
                codefiles: [{
                    filename: result.EXAMPLE_FILENAME,
                    code: result.EXAMPLE_CODE
                }]
            });
        } else {
            if (curLibraryExample.codefiles.find(codefile => codefile.filename === result.EXAMPLE_FILENAME) == undefined) {
                curLibraryExample.codefiles.push({
                    filename: result.EXAMPLE_FILENAME,
                    code: result.EXAMPLE_CODE
                });
            }
        }
    });

    options.forEach(option => {
        option.fileInputsMethods.sort((val1, val2) => {
            return val1.id - val2.id;
        })

        option.libraryExamples.sort((val1, val2) => {
            return val1.id -val2.id;
        })
    })
    options.sort((val1, val2) => {
        return val1.id - val2.id;
    })

    // console.log('Parsed options:', options);
    resultStream.send(options);
}

function parseFullOptions(dbResults, resultStream) {
    let options = [];
    dbResults.forEach(result => {
        const newOption = !options.find(option => option.id === result.ID);

        if (newOption) {
            options.push(new ParallelizingOptionFull(
                result.ID,
                {
                    english: result.ENGLISH_TITLE,
                    russian: result.RUSSIAN_TITLE
                },
                [],
                [],
                result.STATUS === 'ENABLED',
                [],
                [],
                result.CMD_LINE
            ));
        }

        let curOption = options.find(option => option.id === result.ID);
        
        if (!curOption.fileInputsMethods.includes(result.INPUT_METHOD_ID)) {
            curOption.fileInputsMethods.push(result.INPUT_METHOD_ID);
        }

        let curLibraryExample = curOption.libraryExamples.find(example => example.id === result.EXAMPLE_ID);
        if (!curLibraryExample) {
            curOption.libraryExamples.push({
                id: result.EXAMPLE_ID,
                label: {
                    russian: result.EXAMPLE_TITLE_RUS,
                    english: result.EXAMPLE_TITLE_ENG
                },
                codefiles: [{
                    filename: result.EXAMPLE_FILENAME,
                    code: result.EXAMPLE_CODE
                }]
            });
        } else {
            if (curLibraryExample.codefiles.find(codefile => codefile.filename === result.EXAMPLE_FILENAME) == undefined) {
                curLibraryExample.codefiles.push({
                    filename: result.EXAMPLE_FILENAME,
                    code: result.EXAMPLE_CODE
                });
            }
        }

        if (result.EXT_TYPE !== undefined) {
            if (result.EXT_TYPE === 'RESULT') {
                curOption.resultExtensions.push(result.EXT_STRING);
            } else {
                curOption.producingExtensions.push(result.EXT_STRING);
            }
        }
    });

    options.forEach(option => {
        option.resultExtensions = option.resultExtensions.filter((v, i, a) => a.indexOf(v) === i);
        option.producingExtensions = option.producingExtensions.filter((v, i, a) => a.indexOf(v) === i);

        option.fileInputsMethods.sort((val1, val2) => {
            return val1.id - val2.id;
        })

        option.libraryExamples.sort((val1, val2) => {
            return val1.id -val2.id;
        })
    })
    options.sort((val1, val2) => {
        return val1.id - val2.id;
    })

    // console.log('Parsed options:', options);
    resultStream.send(options);
}

// function parseCodeExamples(results, resultStream) {
//     resultStream.send(
//         results.map(res => {
//             return {
//                 id : res.ID,
//                 label: {
//                     english: res.LABEL_ENG,
//                     russian: res.LABEL_RUS
//                 },
//                 code: res.CODE
//             };
//         })
//     );
// }

function parseCodeExamples(results) {
    let resultExamples = [];
    results.forEach(res => {
        const example = resultExamples.find(ex => ex.id === res.ID);
        if (example == undefined) {
            resultExamples.push(
                {
                    id : res.ID,
                    label: {
                        english: res.LABEL_ENG,
                        russian: res.LABEL_RUS
                    },
                    codefiles: [{
                        filename: res.FILENAME,
                        code: res.CODE
                    }]
                } 
            );
        } else {
            example.codefiles.push({
                filename: res.FILENAME,
                code: res.CODE
            })
        }
    })
    return resultExamples;
}

function parseAndSendCodeExamples(results, resultStream) {
    let resultExamples = [];
    results.forEach(res => {
        const example = resultExamples.find(ex => ex.id === res.id);
        if (example == undefined) {
            resultExamples.push(
                {
                    id : res.ID,
                    label: {
                        english: res.LABEL_ENG,
                        russian: res.LABEL_RUS
                    },
                    codefiles: [{
                        filename: res.FILENAME,
                        code: res.CODE
                    }]
                } 
            );
        } else {
            example.codefiles.push({
                filename: res.FILENAME,
                code: res.CODE
            })
        }
    })
    resultStream.send(resultExamples);
}

function getAvilableOptions(connection, resultStream) {
    connection.query('SELECT * FROM AVAILABLE_OPTIONS', function(error, results, fields) {
        if (error) throw error;
        // console.log('Results: ', results);
        parseOptions(results, resultStream);
    });
}

function getAllOptions(connection, resultStream) {
    connection.query('SELECT * FROM ALL_OPTIONS', function(error, results, fields) {
        if (error) throw error;
        // console.log('Results: ', results);
        parseFullOptions(results, resultStream);
    });
}

function getCodeExamples(connection, resultStream) {
    connection.query('SELECT * FROM CODE_EXAMPLES', function(error, results, fields) {
        if (error) throw error;

        parseAndSendCodeExamples(results, resultStream);
    })
}

function getCodeExample(connection, exampleId, resultStream) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM CODE_EXAMPLES WHERE ID=?', [exampleId], function(error, results, fields) {
            if (error) throw error;
    
            resolve(parseCodeExamples(results));
        })
    });

}

function findUserInDB(connection, username, password) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM USERS_VIEW WHERE USERNAME=?', [username], function(error, results, fields) {
            console.log(results);
            resolve(results[0]);
        });
    });
}

function getCommandLineForMethod(connection, optionId) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT CMD_LINE FROM OPTIONS_CMD_LINE_VIEW WHERE ID=?', [optionId], function(error, results, fields) {
            if (error) {
                throw error;
            }

            resolve(results[0]);
        })
    })
}

function getExtensionsForMethod(connection, optionId) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT EXT_STRING, EXT_TYPE FROM OPTION_EXTENSIONS WHERE OPTION_ID=?', [optionId], function(error, results, fields) {
            if (error) {
                throw error;
            }
            
            const extensions = {
                resulting: [],
                producing: []
            };

            results.forEach(resRow => {
                if (resRow.EXT_TYPE === 'RESULT') {
                    extensions.resulting.push(resRow.EXT_STRING);
                } else {
                    extensions.producing.push(resRow.EXT_STRING);
                }
            });

            resolve(extensions);
        })
    })
}



function addLibraryExample(connection, req) {
    return new Promise((resolve, reject) => {
        const optionId = req.fields.methodId;
        const exampleLabelRussian = req.fields.exampleLabelRussian;
        const exampleLabelEnglish = req.fields.exampleLabelEnglish;
        connection.query(
            'SELECT ADD_SOURCE_CODE_EXAMPLE(?, ?, ?) AS EXAMPLE_ID',
            [exampleLabelRussian, exampleLabelEnglish, optionId],
            function(error, results, fields) {
                if (error) {
                    throw error;
                }

                let successfulFileInserts = 0;
                const exampleId = results[0].EXAMPLE_ID;
                for (let i = 0; i < req.fields.countFiles; ++i) {

                    const file = req.files['file' + i];
                    fs.readFile(file.path, 'utf8', (err, code) => {
                        if (err) {
                            throw err;
                        }
                        
                        const filename = file.name;
                        connection.query(
                            'CALL ADD_CODE_FILE_FOR_EXAMPLE(?, ?, ?)',
                            [filename, code, exampleId],
                            (err, results, fields) => {
                                if (err) {
                                    throw err;
                                }
                                successfulFileInserts++;
                                if (successfulFileInserts == req.fields.countFiles) {
                                    resolve({
                                        status: 'OK'
                                    });
                                }
                            }
                        );
                    });

                } 
            }
        )
    });
}

function editLibraryExample(connection, req) {
    return new Promise((resolve, reject) => {
        connection.query(
            'CALL EDIT_SOURCE_CODE_EXAMPLE(?, ?, ?)',
            [
                req.body.exampleId,
                req.body.exampleLabelRussian,
                req.body.exampleLabelEnglish
            ],
            (err, results, fields) => {
                if (err) {
                    reject({
                        status: 'ERR'
                    });
                } else {
                    resolve({
                        status: 'OK'
                    });
                }
            }
        );
    });
}

function deleteLibraryExample(connection, req) {
    return new Promise((resolve, reject) => {
        connection.query(
            'CALL DELETE_SOURCE_CODE_EXAMPLE(?)',
            [req.body.exampleId],
            (err, results, fields) => {
                if (err) {
                    reject({
                        status: 'ERR'
                    });
                } else {
                    resolve({
                        status: 'OK'
                    });
                }
            }
        );
    });
}

function addParallelizingOption(connection, req) {
    return new Promise((resolve, reject) => {
        connection.beginTransaction(err => {
            if (err) {
                return connection.rollback(function() {
                    throw err;
                });
            }

            const optionModel = new ParallelizingOptionFullDB(req.body.methodModel);
            connection.query(
                'SELECT ADD_PARALLELIZING_OPTION(NULL, ?, ?, ?, ?) AS OPTION_ID',
                [
                    optionModel.title.russian,
                    optionModel.title.english,
                    optionModel.status ? 'ENABLED' : 'DISABLED',
                    optionModel.commandLine
                ],
                (err, results, fields) => {
                    if (err) {
                        return connection.rollback(function() {
                            throw err;
                        });
                    }

                    const optionId = results[0].OPTION_ID;
                    let successfulFileInputsMethodsInserts = 0;
                    let successfulFileExtensionsInserts = 0;
                    let allAsyncOperationsCount = optionModel.fileInputsMethodsIds.length + optionModel.extensions.length;                
                    for (let i = 0; i < optionModel.fileInputsMethodsIds.length; ++i) {
                        connection.query(
                            'CALL BIND_FILE_INPUT_METHOD(?, ?)',
                            [optionId, optionModel.fileInputsMethodsIds[i]],
                            (err, results, fields) => {
                                if (err) {
                                    return connection.rollback(function() {
                                        throw err;
                                    });
                                }

                                successfulFileInputsMethodsInserts++;
                                if (successfulFileInputsMethodsInserts +
                                    successfulFileExtensionsInserts === allAsyncOperationsCount) {
                                    connection.commit(function(err) {
                                        if (err) {
                                            return connection.rollback(function() {
                                            throw err;
                                            });
                                        }

                                        resolve({
                                            status: 'OK'
                                        });
                                    });
                                }
                            }
                        )
                    }

                    for (let i = 0; i < optionModel.extensions.length; ++i) {
                        connection.query(
                            'CALL BIND_FILE_EXTENSIONS(?, ?, ?)',
                            [
                                optionId,
                                optionModel.extensions[i].extensionString,
                                optionModel.extensions[i].extensionType
                            ],
                            (err, results, fields) => {
                                if (err) {
                                    return connection.rollback(function() {
                                        throw err;
                                    });
                                }

                                successfulFileInputsMethodsInserts++;
                                if (successfulFileInputsMethodsInserts + successfulFileExtensionsInserts === allAsyncOperationsCount) {
                                    connection.commit(function(err) {
                                        if (err) {
                                          return connection.rollback(function() {
                                            throw err;
                                          });
                                        }

                                        resolve({
                                            status: 'OK'
                                        });
                                    });
                                    
                                }
                            }
                        )
                    }

                }
            )
        });
    });
        
}

function editParallelizingOption(connection, req) {
    return new Promise((resolve, reject) => {
        connection.beginTransaction(err => {
            if (err) {
                return connection.rollback(function() {
                    throw err;
                });
            }

            const optionModel = new ParallelizingOptionFullDB(req.body.methodModel);
            connection.query(
                'CALL EDIT_PARALLELIZING_OPTION(?, ?, ?, ?, ?)',
                [
                    optionModel.id,
                    optionModel.title.russian,
                    optionModel.title.english,
                    optionModel.status ? 'ENABLED' : 'DISABLED',
                    optionModel.commandLine
                ],
                (err, results, fields) => {
                    if (err) {
                        return connection.rollback(function() {
                            throw err;
                        });
                    }

                    let successfulFileInputsMethodsInserts = 0;
                    let successfulFileExtensionsInserts = 0;
                    let allAsyncOperationsCount = optionModel.fileInputsMethodsIds.length + optionModel.extensions.length;                
                    for (let i = 0; i < optionModel.fileInputsMethodsIds.length; ++i) {
                        connection.query(
                            'CALL BIND_FILE_INPUT_METHOD(?, ?)',
                            [optionModel.id, optionModel.fileInputsMethodsIds[i]],
                            (err, results, fields) => {
                                if (err) {
                                    return connection.rollback(function() {
                                        throw err;
                                    });
                                }

                                successfulFileInputsMethodsInserts++;
                                if (successfulFileInputsMethodsInserts +
                                    successfulFileExtensionsInserts === allAsyncOperationsCount) {
                                    connection.commit(function(err) {
                                        if (err) {
                                            return connection.rollback(function() {
                                            throw err;
                                            });
                                        }

                                        resolve({
                                            status: 'OK'
                                        });
                                    });
                                }
                            }
                        )
                    }

                    for (let i = 0; i < optionModel.extensions.length; ++i) {
                        connection.query(
                            'CALL BIND_FILE_EXTENSIONS(?, ?, ?)',
                            [
                                optionModel.id,
                                optionModel.extensions[i].extensionString,
                                optionModel.extensions[i].extensionType
                            ],
                            (err, results, fields) => {
                                if (err) {
                                    return connection.rollback(function() {
                                        throw err;
                                    });
                                }

                                successfulFileInputsMethodsInserts++;
                                if (successfulFileInputsMethodsInserts + successfulFileExtensionsInserts === allAsyncOperationsCount) {
                                    connection.commit(function(err) {
                                        if (err) {
                                          return connection.rollback(function() {
                                            throw err;
                                          });
                                        }

                                        resolve({
                                            status: 'OK'
                                        });
                                    });
                                    
                                }
                            }
                        )
                    }

                }
            )
        });
    });
        
}

function deleteParallelizingOption(connection, req) {
    return new Promise((resolve, reject) => {
        connection.query(
            'CALL DELETE_PARALLELIZING_OPTION(?)',
            [req.body.methodId],
            function(error, results, fields) {
                if (error) {
                    reject({
                        status: 'ERR'
                    });
                }
                
                resolve({
                    status: 'OK'
                });
            }
        );
    })
}

module.exports = {
    getAvailableOptions: getAvilableOptions,
    getAllOptions: getAllOptions,
    getCodeExamples: getCodeExamples,
    findUserInDB: findUserInDB,
    getCommandLineForMethod: getCommandLineForMethod,
    addLibraryExample: addLibraryExample,
    editLibraryExample: editLibraryExample,
    deleteLibraryExample: deleteLibraryExample,
    addParallelizingOption: addParallelizingOption,
    editParallelizingOption: editParallelizingOption,
    deleteParallelizingOption: deleteParallelizingOption,
    getExtensionsForMethod: getExtensionsForMethod,
    getCodeExample: getCodeExample
};