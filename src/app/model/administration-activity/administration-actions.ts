import { LanguageConstant } from '../language/language-constants';
import { AdministrationActionType } from './administration-action-enum';

export class AdministrationAction {
    public static getActionsList(): AdministrationAction[] {
        return [
            new AdministrationAction(
                AdministrationActionType.CREATE_NEW_OPTION,
                {
                    english: 'Add new parallelizing method',
                    russian: 'Добавить новый метод распараллеливания'
                }
            ),
            new AdministrationAction(
                AdministrationActionType.EDIT_EXISTING_OPTION,
                {
                    english: 'Modify existing parallelizing method',
                    russian: 'Изменить уже существующий метод распараллеливания'
                }
            )
        ];
    }

    constructor(
        public id: AdministrationActionType,
        public label: LanguageConstant
    ) {}
}
