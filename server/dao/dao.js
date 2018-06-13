"use strict";

const ParallelizingOption = require('../parallelizing-options/option-model');
const ParallelizingOptionFull = require('../parallelizing-options/option-full-model');
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
                result.STATUS === 'ENABLED'
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

function parseCodeExamples(results, resultStream) {
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

        parseCodeExamples(results, resultStream);
    })
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

function addLibraryExample(connection, req) {
    return new Promise((resolve, reject) => {
        const optionId = req.fields.methodId;
        const exampleLabelRussian = req.fields.exampleLabelRussian;
        const exampleLabelEnglish = req.fields.exampleLabelEnglish;
        connection.query(
            'SELECT ADD_SOURCE_CODE_EXAMPLE(?, ?, ?, ?) AS EXAMPLE_ID',
            [exampleLabelRussian, exampleLabelEnglish, optionId, 'ACTIVE'],
            function(error, results, fields) {
                if (error) {
                    throw error;
                }

                console.log(results);
                // hot idea!!! define a counter (not the one inside loop and send result when it is equal to files count)
                let successfulFileInserts = 0;
                const exampleId = results[0].EXAMPLE_ID;
                for (let i = 0; i < req.fields.countFiles; ++i) {
                    // TODO: read files then query
                    const file = req.files['file' + i];
                    fs.readFile(file.path, (err, code) => {
                        if (err) {
                            throw err;
                        }
                        
                        const filename = file.name;
                        connection.query(
                            'CALL ADD_CODE_FILE_FOR_EXAMPLE(?, ?, ?)',
                            [filename, code, exampleId],
                            (err, results, fields) => {
                                successfulFileInserts++;
                                if (successfulFileInserts === req.fields.countFiles) {
                                    res.send({
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

module.exports = {
    getAvailableOptions: getAvilableOptions,
    getAllOptions: getAllOptions,
    getCodeExamples: getCodeExamples,
    findUserInDB: findUserInDB,
    getCommandLineForMethod: getCommandLineForMethod,
    addLibraryExample: addLibraryExample
};