'use strict';

class ParallelizingOptionFull {
    constructor(id, title, fileInputsMethods, libraryExamples, status, producingExtensions, resultExtensions, commandLine) {
        this.id = id;
        this.title = title;
        this.fileInputsMethods = fileInputsMethods;
        this.libraryExamples = libraryExamples;
        this.status = status;
        this.producingExtensions = producingExtensions;
        this.resultExtensions = resultExtensions;
        this.commandLine = commandLine;
    }
}

module.exports = ParallelizingOptionFull;