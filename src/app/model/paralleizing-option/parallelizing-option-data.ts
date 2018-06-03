export class ParallelizingOptionData {}

export class ParallelizingOptionDataSourceCode extends ParallelizingOptionData {
    constructor(public code: string) {
        super();
    }
}

export class ParallelizingOptionDataUserFiles extends ParallelizingOptionData {
    constructor(public files: File[]) {
        super();
    }
}

export class ParallelizingOptionDataLibraryExampleId extends ParallelizingOptionData {
    constructor(public libraryExampleId: number) {
        super();
    }
}
