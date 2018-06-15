import { LanguageConstant } from '../../../../model/language/language-constants';

export enum ExampleManagementActionType {
    ADD,
    EDIT,
    DELETE
}

export class ActionListItems {
    static get items(): { type: ExampleManagementActionType, label: LanguageConstant }[] {
        return [
            {
                type: ExampleManagementActionType.ADD,
                label: {
                    english: 'Add new example',
                    russian: 'Добавить новый пример'
                }
            },
            {
                type: ExampleManagementActionType.EDIT,
                label: {
                    english: 'Edit existing example',
                    russian: 'Редактировать существующий пример'
                }
            },
            {
                type: ExampleManagementActionType.DELETE,
                label: {
                    english: 'Delete existing example',
                    russian: 'Удалить существующий пример'
                }
            }
        ];
    }
}
