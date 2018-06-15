module.exports.ParallelizingOptionFullDB = class ParallelizingOptionFullDB {

    constructor(optionFromClient) {
        this.id = optionFromClient.id;
        this.title = optionFromClient.title;
        this.status = optionFromClient.status;
        this.fileInputsMethodsIds = optionFromClient.fileInputsMethodsIds;
        this.extensions = optionFromClient.extensions;
        this.commandLine = optionFromClient.commandLine;
    }
}
