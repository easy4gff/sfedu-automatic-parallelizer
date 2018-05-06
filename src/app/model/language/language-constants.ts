export class LanguageObject {
    english: string;
    russian: string;
}

export class LanguageConstants {
    public static readonly SITE_TITLE: LanguageObject = {
        english: 'Automatic parallelizer',
        russian: 'Автоматический распараллеливатель'
    };

    public static readonly SELECT_LANGUAGE: LanguageObject = {
        english: 'Select language',
        russian: 'Выберите язык'
    };

    public static readonly HOME_PAGE: LanguageObject = {
        english: 'Home page',
        russian: 'Главная страница'
    };

    public static readonly DOCUMENTATION: LanguageObject = {
        english: 'Documentation',
        russian: 'Документация'
    };

    public static readonly CHOOSE_TRANSFORMATION_MODE: LanguageObject = {
        english: 'Choose transformation mode',
        russian: 'Выберите режим преобразования'
    };

    public static readonly NEXT: LanguageObject = {
        english: 'Next',
        russian: 'Далее'
    };

    public static readonly BACK: LanguageObject = {
        english: 'Back',
        russian: 'Назад'
    };

    public static readonly CHOOSE_SOURCE_OF_PROGRAM: LanguageObject = {
        english: 'Choose the source of a program',
        russian: 'Выберите источник программы'
    };

    // tslint:disable:max-line-length
    public static readonly TEXT_EDITOR_MENU_HINT_FOR_USER: LanguageObject = {
        english: `The input program should be written in C and confirm to C99 standard. The program should consist of a single file. If your program includes non-standard header files then you should include the source code in the text of the program by the preprocessor before you upload it.`,
        russian: `На вход принимаются программы на языке C, соответствующие стандарту C99. Программа должна состоять из одного файла. Если Ваша программа включает нестандартные заголовочные файлы, то перед загрузкой Вы должны включить их исходный код в текст программы с помощью препроцессора.`
    };

    public static readonly LOAD_FILE_FROM_FILESYSTEM: LanguageObject = {
        english: 'Load file from filesystem',
        russian: 'Загрузка пользовательского файла'
    };

    public static readonly CHOOSE_FILE_TO_LOAD: LanguageObject = {
        english: 'Choose a file to load',
        russian: 'Выберите файл для загрузки'
    };

    public static readonly CHOOSE: LanguageObject = {
        english: 'Choose',
        russian: 'Выбрать'
    };

    public static readonly UPLOAD: LanguageObject = {
        english: 'Upload',
        russian: 'Загрузить'
    };

    public static readonly UPLOAD_CONFIRMATION: LanguageObject = {
        english: 'Upload confiramtion',
        russian: 'Подтверждение загрузки'
    };

    public static readonly CHOOSE_FILE_FROM_LIBRARY: LanguageObject = {
        english: 'Choose a sample from library',
        russian: 'Выберите пример из библиотеки'
    };

    public static readonly LOG_IN: LanguageObject = {
        english: 'Log In',
        russian: 'Авторизация'
    };

    public static readonly LOG_OUT: LanguageObject = {
        english: 'Log Out',
        russian: 'Выйти'
    };

    public static readonly GUEST: LanguageObject = {
        english: 'Guest',
        russian: 'Гость'
    };

    public static readonly LOG_IN_VERB: LanguageObject = {
        english: 'Log In',
        russian: 'Авторизоваться'
    };

    public static readonly USERNAME: LanguageObject = {
        english: 'Username',
        russian: 'Имя пользователя'
    };

    public static readonly PASSWORD: LanguageObject = {
        english: 'Password',
        russian: 'Пароль'
    };

    public static readonly ERROR_INVALID_LOGIN_PASSWORD: LanguageObject = {
        english: 'Invalid login or password!',
        russian: 'Неправильное имя пользователя или пароль!'
    };

    public static readonly YOU_ARE_AUTHORIZED_AS: LanguageObject = {
        english: 'You are authorized as',
        russian: 'Вы авторизованы как'
    };

    public static readonly ADMINISTRATION_MENU: LanguageObject = {
        english: 'Administration menu',
        russian: 'Меню администрирования'
    };

    public static readonly MANAGE_OPTIONS: LanguageObject = {
        english: 'Manage options',
        russian: 'Управление опциями'
    };
}
