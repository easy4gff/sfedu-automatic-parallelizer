const FileInputMethodType = require('./file-input-method');

const availableOptions = [
    {
      id: 1,
      title: {
        english: 'Automatic generation of MPI-code with data placement',
        russian: 'Автоматическая генерация MPI-кода с размещением данных'
      },
      fileInputsMethods: [
        FileInputMethodType.LOAD_FROM_LIBRARY,
        FileInputMethodType.LOAD_FROM_FILE_SYSTEM,
        FileInputMethodType.GET_FROM_TEXT_EDITOR
      ],
      libraryExamples: [
        {
          id: 1,
          label: {
            english: 'Iterative multiplication of band matrix by a vector',
            russian: 'Итерационное умножение ленточной матрицы на вектор'
          },
          code: ''
        },
        {
          id: 2,
          label: {
            english: 'The solution of the Dirichlet problem',
            russian: 'Решение задачи Дирихле'
          },
          code: ''
        },
        {
          id: 3,
          label: {
            english: 'The solution of the heat equation',
            russian: 'Решение уравнения теплопроводности'
          },
          code: ''
        },
        {
          id: 4,
          label: {
            english: 'Matrix multiplication',
            russian: 'Умножение матриц'
          },
          code: ''
        }
      ]
    },
    {
      id: 2,
      title: {
        english: 'Automatic data distribution for cache memory',
        russian: 'Автоматическое распределение данных под кэш-память'
      },
      fileInputsMethods: [
        FileInputMethodType.LOAD_FROM_LIBRARY,
        FileInputMethodType.LOAD_FROM_FILE_SYSTEM
      ],
      libraryExamples: [
        {
          id: 1,
          label: {
            english: 'The solution of the Dirichlet problem',
            russian: 'Решение задачи Дирихле'
          },
          code: ''
        },
        {
          id: 2,
          label: {
            english: 'Matrix multiplication',
            russian: 'Умножение матриц'
          },
          code: ''
        }
      ]
    },
    {
      id: 3,
      title: {
        english: 'Automatic generation of OpenMP-code',
        russian: 'Автоматическая генерация OpenMP-кода'
      },
      fileInputsMethods: [
        FileInputMethodType.LOAD_FROM_LIBRARY,
        FileInputMethodType.LOAD_FROM_FILE_SYSTEM
      ],
      libraryExamples: [
        {
          id: 1,
          label: {
            english: 'The sum of the vectors',
            russian: 'Сумма векторов'
          },
          code: ''
        },
        {
          id: 2,
          label: {
            english: 'Iterative process',
            russian: 'Итерационный процесс'
          },
          code: ''
        },
        {
          id: 3,
          label: {
            english: 'Matrix multiplication',
            russian: 'Умножение матриц'
          },
          code: ''
        }
      ]
    },
    {
      id: 4,
      title: {
        english: 'GPU-code generator (CUDA)',
        russian: 'Генератор GPU-кода (CUDA)'
      },
      fileInputsMethods: [
        FileInputMethodType.LOAD_FROM_LIBRARY,
        FileInputMethodType.GET_FROM_TEXT_EDITOR
      ],
      libraryExamples: [
        {
          id: 1,
          label: {
            english: 'Covariance',
            russian: 'Covariance'
          },
          code: ''
        }
      ]
    }
  ];

  module.exports = availableOptions;