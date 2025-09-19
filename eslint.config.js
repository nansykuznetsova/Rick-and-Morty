import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      react,
      import: importPlugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Встроенные модули (node:fs, node:path и т.д.)
            'external', // Внешние зависимости (react, lodash)
            'internal', // Внутренние пути (могут быть настроены через aliases)
            'parent', // Импорты из родительских директорий ('../')
            'sibling', // Импорты из той же директории ('./')
            'index', // Индексные файлы ('./index')
            'object', // Object imports (редко)
            'type' // Типы TypeScript (import type { ... })
          ],
          pathGroups: [
            // Частый кейс: чтобы React всегда был первым
            {
              pattern: 'react',
              group: 'external',
              position: 'before'
            }
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always', // Пустая строка между группами
          alphabetize: {
            order: 'asc', // Сортировка по алфавиту внутри групп
            caseInsensitive: true // Без учета регистра
          }
        }
      ]
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json'
        }
      }
    }
  },
  prettier
);
