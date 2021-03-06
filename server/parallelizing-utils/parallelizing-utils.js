const FileInputMethod = require('../parallelizing-options/file-input-method');
const ParallelizerController = require('../parallelizer/parallelizer-controller').ParallelizerController;
const FilesystemUtils = require('../parallelizer/filesystem-utils').FilesystemUtils;

exports.ParallelizingUtils = class ParallelizingUtils {

    static getConvertedFiles(connection, req, resStream) {
        switch (parseInt(req.fields.inputMethodId, 10)) {
            case FileInputMethod.LOAD_FROM_FILE_SYSTEM:
                FilesystemUtils.prepareFilesDir(Object.keys(req.files).map(key => {
                    return {
                        path: req.files[key].path,
                        filename: req.files[key].name
                    };
                })).then(dirAndFilenames => {
                    ParallelizerController.parallelize(
                        connection,
                        dirAndFilenames.filenames,
                        dirAndFilenames.destFolder,
                        req.fields.optionTypeId,
                        resStream
                    );
                })

                break;
            case FileInputMethod.GET_FROM_TEXT_EDITOR:
                FilesystemUtils.makeFileFromCodeString(connection, req, req.fields.sourceCode, resStream)
                    .then((filenames) => {
                        ParallelizerController.parallelize(
                            connection,
                            [filenames],
                            null,
                            req.fields.optionTypeId,
                            resStream
                        );
                    })
                    .catch(err => {
                        console.log(err);
                    });
                break;
            case FileInputMethod.LOAD_FROM_LIBRARY:
                FilesystemUtils.makeFilesFromLibraryExamples(connection, req.fields.libraryExampleId, resStream)
                    .then(dirAndFilenames => {
                        ParallelizerController.parallelize(
                            connection,
                            dirAndFilenames.filenames,
                            dirAndFilenames.destFolder,
                            req.fields.optionTypeId,
                            resStream
                        );
                    });
                break;
            default:
                console.log('No match for given option id!');
        }
    }

}