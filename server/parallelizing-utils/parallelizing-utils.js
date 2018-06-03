const FileInputMethod = require('../parallelizing-options/file-input-method');
const ParallelizerController = require('../parallelizer/parallelizer-controller').ParallelizerController;

exports.ParallelizingUtils = class ParallelizingUtils {

    static getConvertedFiles(connection, req, resStream) {
        switch (parseInt(req.fields.inputMethodId, 10)) {
            case FileInputMethod.LOAD_FROM_FILE_SYSTEM:
                ParallelizerController.parallelize(
                    connection,
                    Object.keys(req.files).map(key => {
                        return req.files[key].path
                    }),
                    req.fields.optionTypeId,
                    resStream
                );
                break;
            default:
                console.log('No match for given option id!');
        }
    }

    static callParallelizerExe(filenames, method) {
        
    }
}