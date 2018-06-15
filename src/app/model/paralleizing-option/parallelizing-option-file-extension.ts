export enum FileExtensionType {
    RESULT = 'RESULT',
    OUTPUT = 'OUTPUT'
}

export class FileExtension {
    constructor(
        public extensionString: string,
        public extensionType: FileExtensionType
    ) {} 
}