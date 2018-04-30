export class ParallelizingOptionData {}

export class ParallelizingOptionDataSourceCode extends ParallelizingOptionData {
    constructor(public code: string) {
        super();
    }
}

export class ParallelizingOptionDataUserFile extends ParallelizingOptionData {
    constructor(public encodedFile: string) {
        super();
    }
}

export class ParallelizingOptionDataLibraryExampleId extends ParallelizingOptionData {
    constructor(public libraryExampleId: number) {
        super();
    }
}
