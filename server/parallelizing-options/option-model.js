'use strict';

class ParallelizingOption {
    constructor(id, title, fileInputsMethods, libraryExamples) {
        this.id = id;
        this.title = title;
        this.fileInputsMethods = fileInputsMethods;
        this.libraryExamples = libraryExamples;
    }
}

module.exports = ParallelizingOption;