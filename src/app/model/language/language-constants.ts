export class LanguageConstant {
    english: string;
    russian: string;
}

export class LanguageConstants {
    public static readonly SITE_TITLE: LanguageConstant = {
        english: 'Automatic parallelizer',
        russian: 'Автоматический распараллеливатель'
    };

    public static readonly SELECT_LANGUAGE: LanguageConstant = {
        english: 'Select language',
        russian: 'Выберите язык'
    };

    public static readonly HOME_PAGE: LanguageConstant = {
        english: 'Home page',
        russian: 'Главная страница'
    };

    public static readonly DOCUMENTATION: LanguageConstant = {
        english: 'Documentation',
        russian: 'Документация'
    };

    public static readonly CHOOSE_TRANSFORMATION_MODE: LanguageConstant = {
        english: 'Choose transformation mode',
        russian: 'Выберите режим преобразования'
    };

    public static readonly NEXT: LanguageConstant = {
        english: 'Next',
        russian: 'Далее'
    };

    public static readonly BACK: LanguageConstant = {
        english: 'Back',
        russian: 'Назад'
    };

    public static readonly CHOOSE_SOURCE_OF_PROGRAM: LanguageConstant = {
        english: 'Choose the source of a program',
        russian: 'Выберите источник программы'
    };

    // tslint:disable:max-line-length
    public static readonly TEXT_EDITOR_MENU_HINT_FOR_USER: LanguageConstant = {
        english: `The input program should be written in C and confirm to C99 standard. The program should consist of a single file. If your program includes non-standard header files then you should include the source code in the text of the program by the preprocessor before you upload it.`,
        russian: `На вход принимаются программы на языке C, соответствующие стандарту C99. Программа должна состоять из одного файла. Если Ваша программа включает нестандартные заголовочные файлы, то перед загрузкой Вы должны включить их исходный код в текст программы с помощью препроцессора.`
    };

    public static readonly LOAD_FILE_FROM_FILESYSTEM: LanguageConstant = {
        english: 'Load file from filesystem',
        russian: 'Загрузка пользовательского файла'
    };

    public static readonly CHOOSE_FILE_TO_LOAD: LanguageConstant = {
        english: 'Choose a file to load',
        russian: 'Выберите файл для загрузки'
    };

    public static readonly CHOOSE: LanguageConstant = {
        english: 'Choose',
        russian: 'Выбрать'
    };

    public static readonly UPLOAD: LanguageConstant = {
        english: 'Upload',
        russian: 'Загрузить'
    };

    public static readonly UPLOAD_CONFIRMATION: LanguageConstant = {
        english: 'Upload confiramtion',
        russian: 'Подтверждение загрузки'
    };

    public static readonly CHOOSE_FILE_FROM_LIBRARY: LanguageConstant = {
        english: 'Choose a sample from library',
        russian: 'Выберите пример из библиотеки'
    };

    public static readonly LOG_IN: LanguageConstant = {
        english: 'Log In',
        russian: 'Авторизация'
    };

    public static readonly LOG_OUT: LanguageConstant = {
        english: 'Log Out',
        russian: 'Выйти'
    };

    public static readonly GUEST: LanguageConstant = {
        english: 'Guest',
        russian: 'Гость'
    };

    public static readonly LOG_IN_VERB: LanguageConstant = {
        english: 'Log In',
        russian: 'Авторизоваться'
    };

    public static readonly USERNAME: LanguageConstant = {
        english: 'Username',
        russian: 'Имя пользователя'
    };

    public static readonly PASSWORD: LanguageConstant = {
        english: 'Password',
        russian: 'Пароль'
    };

    public static readonly ERROR_INVALID_LOGIN_PASSWORD: LanguageConstant = {
        english: 'Invalid login or password!',
        russian: 'Неправильное имя пользователя или пароль!'
    };

    public static readonly YOU_ARE_AUTHORIZED_AS: LanguageConstant = {
        english: 'You are authorized as',
        russian: 'Вы авторизованы как'
    };

    public static readonly ADMINISTRATION_MENU: LanguageConstant = {
        english: 'Administration menu',
        russian: 'Меню администрирования'
    };

    public static readonly MANAGE_OPTIONS: LanguageConstant = {
        english: 'Manage options',
        russian: 'Управление опциями'
    };

    public static readonly TYPE_OPTION_NAME_IN_ENGLISH: LanguageConstant = {
        english: 'Type option name in english',
        russian: 'Введите название опции на английском'
    };

    public static readonly TYPE_OPTION_NAME_IN_RUSSIAN: LanguageConstant = {
        english: 'Type option name in russian',
        russian: 'Введите название опции на русском'
    };

    public static readonly CHOOSE_OPTION_NAME: LanguageConstant = {
        english: 'Choose option name',
        russian: 'Выберите название для опции'
    };

    public static readonly STATUS: LanguageConstant = {
        english: 'Status',
        russian: 'Статус'
    };

    public static readonly SHOW_SOURCE_CODE: LanguageConstant = {
        english: 'Show source code',
        russian: 'Показать код'
    };

    public static readonly PROGRAM_INPUT_METHODS: LanguageConstant = {
        english: 'Program input methods',
        russian: 'Методы ввода программы'
    };

    public static readonly PARALLELIZING_OPTION_STATUS_ACTIVE: LanguageConstant = {
        english: 'Active',
        russian: 'Активизирована'
    };

    public static readonly PARALLELIZING_OPTION_STATUS_DISABLED: LanguageConstant = {
        english: 'Disabled',
        russian: 'Скрыта'
    };

    public static readonly CODE_EXAMPLES: LanguageConstant = {
        english: 'Code examples',
        russian: 'Примеры кода'
    };

    public static readonly BACK_TO_MENU: LanguageConstant = {
        english: 'To menu',
        russian: 'К меню'
    };

    public static readonly ADD: LanguageConstant = {
        english: 'Add',
        russian: 'Добавить'
    };

    public static readonly ENTER_EXAMPLE_NAME_ENGLISH: LanguageConstant = {
        english: 'Enter example title in english',
        russian: 'Введите название примера на английском'
    };

    public static readonly ENTER_EXAMPLE_NAME_RUSSIAN: LanguageConstant = {
        english: 'Enter example title in russian',
        russian: 'Введите название примера на русском'
    };
}
