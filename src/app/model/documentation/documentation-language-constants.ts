import { LanguageConstant } from '../language/language-constants';

// tslint:disable
export class DocumentationLanguageConstants {
    public readonly ABOUT_PROJECT_HEADER: LanguageConstant = {
        english: 'About project',
        russian: 'О проекте'
    };

    public readonly ABOUT_PROJECT_PARAGRAPH: LanguageConstant = {
        english: 'Данная программа предназначена для ускорения блочных алгоритмов за счет эффективного использования кэш памяти или распараллеливания на суперкомпьютер с распределенной памятью. Данный проект основан на ДВОР (Диалоговом высокоуровневом оптимизирующем распараллеливателе программ), который, в свою очередь, является развитием ОРС (Открытой распараллеливающей системы) www.ops.rsu.ru.',
        russian: 'Данная программа предназначена для ускорения блочных алгоритмов за счет эффективного использования кэш памяти или распараллеливания на суперкомпьютер с распределенной памятью. Данный проект основан на ДВОР (Диалоговом высокоуровневом оптимизирующем распараллеливателе программ), который, в свою очередь, является развитием ОРС (Открытой распараллеливающей системы) www.ops.rsu.ru.'
    };

    public readonly INPUT_PROGRAMS_HEADER: LanguageConstant = {
        english: 'Input programs',
        russian: 'Входные программы'
    };

    public readonly INPUT_PROGRAMS_PARAGRAPH: LanguageConstant = {
        english: 'На вход Web-Ускорителя принимаются программы на языке C, соответствующие стандарту C99. Программа должна состоять из одного файла. Если Ваша программа включает нестандартные заголовочные файлы, то перед загрузкой Вы должны включить их исходный код в текст программы с помощью препроцессора.',
        russian: 'На вход Web-Ускорителя принимаются программы на языке C, соответствующие стандарту C99. Программа должна состоять из одного файла. Если Ваша программа включает нестандартные заголовочные файлы, то перед загрузкой Вы должны включить их исходный код в текст программы с помощью препроцессора.'
    };

    public readonly USER_MANUAL_HEADER: LanguageConstant = {
        english: 'User manual',
        russian: 'Инструкция по использованию'
    };

    public readonly USER_MANUAL_PARAGRAPH: LanguageConstant = {
        english: `Вы можете загрузить один файл *.c или группу файлов (*.c , *.h, *.txt) в zip-архиве. Чтобы подготовить группу файлов для загрузки, выделите каждый файл и сожмите полученную группу в архив (не объединяйте файлы, вкладывая их в общий каталог).
\nВы получите ссылку на преобразованный исходный код.`,
        russian: `Вы можете загрузить один файл *.c или группу файлов (*.c , *.h, *.txt) в zip-архиве. Чтобы подготовить группу файлов для загрузки, выделите каждый файл и сожмите полученную группу в архив (не объединяйте файлы, вкладывая их в общий каталог).
\nВы получите ссылку на преобразованный исходный код.`
    };

    public readonly AUTOMATIC_DATA_DISTRIBUTION_FOR_CACHE_MEMORY_HEADER: LanguageConstant = {
        english: 'Automatic data distribution for cache memory',
        russian: 'Автоматическое распределение данных под кэш-память'
    };

    public readonly AUTOMATIC_DATA_DISTRIBUTION_FOR_CACHE_MEMORY_P1: LanguageConstant = {
        english: 'This optimization was implemented for C99 language extended by special directives. These directives are used to increase data locality and program performance accordingly. Also it can be used to minimize overhead of interprocessor communication when automatic data distribution for distributed memory (ref. Автоматическая генерация MPI-кода с размещением данных в ДВОР) is used. Performance speedup is reached for class of numeric block algorithms for the architectures with one processor.\nExtention on the moment is represented one directive, in which distribution parameters (e.g. block size) and count of processors for target achitecture are specified.',
        russian: 'Реализовано расширение языка СИ (C99) операциями работы с памятью. Данное расширение может использоваться при оптимизации работы с кэш-памятью, а также для минимизации пересылок при автоматическом размещении данных (см. Автоматическая генерация MPI-кода с размещением данных в ДВОР) на многопроцессорную архитектуру. При использовании реализованных операций на однопропроцессорном компьютере, достигается увеличение производительности в блочных численных методах.\nРасширение реализовано в виде директивы компилятора, в которой указываются параметры разбиения (размеры блоков) и количество процессоров на целевой архитектуре.'
    };

    public readonly AUTOMATIC_DATA_DISTRIBUTION_FOR_CACHE_MEMORY_CODE_1: LanguageConstant = {
        english: 'Name of distribution array',
        russian: 'Имя размещаемого массива'
    };

    public readonly AUTOMATIC_DATA_DISTRIBUTION_FOR_CACHE_MEMORY_PARAM_DESC_1: LanguageConstant = {
        english: 'list, upper bounds of array',
        russian: 'список, верхние границы массива'
    };

    public readonly AUTOMATIC_DATA_DISTRIBUTION_FOR_CACHE_MEMORY_PARAM_DESC_2: LanguageConstant = {
        english: 'count of processors (e.g. 1, if you want to optimize program for shared memory)',
        russian: 'количество процессоров (равно 1 в случае оптимизации под кэш-память)'
    };

    public readonly AUTOMATIC_DATA_DISTRIBUTION_FOR_CACHE_MEMORY_PARAM_DESC_3: LanguageConstant = {
        english: 'list, block dimension',
        russian: 'список, размеры блока'
    };

    public readonly AUTOMATIC_DATA_DISTRIBUTION_FOR_CACHE_MEMORY_P2: LanguageConstant = {
        english: 'This directive has to be inserted after the initialization statement of distributing array and before all calculations. All parameters have to be constant.',
        russian: 'Директиву нужно вставлять после инициализации размещаемого массива и до начала работы с ним. Все параметры директивы должны быть константами времени компиляции.'
    };

    public readonly AUTOMATIC_DATA_DISTRIBUTION_FOR_CACHE_MEMORY_EXAMPLE: LanguageConstant = {
        english: 'Example',
        russian: 'Пример'
    };

    public readonly AUTOMATIC_DATA_DISTRIBUTION_FOR_CACHE_MEMORY_EXAMPLE_DESC: LanguageConstant = {
        english: 'Implementation of algorhtm block matrix multiplication (A=B*C) with using directive of data distribution. A, B, C - matrices NxN. d - block size.',
        russian: 'Реализация алгоритма ускорения блочного умножения матриц (A=B*C) с использованием директивы распределения данных. A, B, C - матрицы размера N×N. d - размер блока.'
    };
}
