// Static properties for class
// const _OPS_TOOLS_DIR = '/home/gff/Programming/Coursework/WebOPSTool/';
// const _UPLOAD_DIR = _OPS_TOOLS_DIR + 'uploads/'
// const _OPS_TOOLS_DIR = '/home/top/WebOPSTool/';
const _OPS_TOOLS_DIR = '/var/sites/newwebops/WebOPSTool/';
const _UPLOAD_DIR = _OPS_TOOLS_DIR + 'uploads/';
const _RESULTS_WORKING_DIR = _OPS_TOOLS_DIR + 'results/';

class AppFilesystemConstants {
    static get OPS_TOOLS_DIR() {
        return _OPS_TOOLS_DIR;
    }

    static get UPLOAD_DIR() {
        return _UPLOAD_DIR;
    }

    static get RESULTS_WORKING_DIR() {
        return _RESULTS_WORKING_DIR;
    }
}

module.exports = {
    AppFilesystemConstants: AppFilesystemConstants
}