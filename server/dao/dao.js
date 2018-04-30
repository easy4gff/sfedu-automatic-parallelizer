"use strict";

const ParallelizingOption = require('../parallelizing-options/option-model');

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

        if (!curOption.libraryExamples.find(example => example.id === result.EXAMPLE_ID)) {
            curOption.libraryExamples.push({
                id: result.EXAMPLE_ID,
                label: {
                    russian: result.EXAMPLE_TITLE_RUS,
                    english: result.EXAMPLE_TITLE_ENG
                },
                code: result.EXAMPLE_CODE
            });
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

    console.log('Parsed options:', options);
    resultStream.send(options);
}

function getAvilableOptions(connection, resultStream) {
    connection.query('SELECT * FROM AVAILABLE_OPTIONS', function(error, results, fields) {
        if (error) throw error;
        // console.log('Results: ', results);
        parseOptions(results, resultStream);
    });
}

module.exports = getAvilableOptions;