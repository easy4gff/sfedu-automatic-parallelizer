const FileInputMethod = require('../parallelizing-options/file-input-method');
const ParallelizerController = require('../parallelizer/parallelizer-controller').ParallelizerController;
const FilesystemUtils = require('../parallelizer/filesystem-utils').FilesystemUtils;

exports.ParallelizingUtils = class ParallelizingUtils {

    static getConvertedFiles(connection, req, resStream) {
        switch (parseInt(req.fields.inputMethodId, 10)) {
            case FileInputMethod.LOAD_FROM_FILE_SYSTEM:
                ParallelizerController.parallelize(
                    connection,
                    Object.keys(req.files).map(key => {
                        return {
                            path: req.files[key].path,
                            filename: req.files[key].name
                        };
                    }),
                    req.fields.optionTypeId,
                    resStream
                );
                break;
            case FileInputMethod.GET_FROM_TEXT_EDITOR:
                FilesystemUtils.makeFileFromCodeString(connection, req, req.fields.sourceCode, resStream)
                    .then((filenames) => {
                        ParallelizerController.parallelize(
                            connection,
                            [filenames],
                            req.fields.optionTypeId,
                            resStream
                        );
                    })
                    .catch(err => {
                        console.log(err);
                    });
                break;
            default:
                console.log('No match for given option id!');
        }
    }

}