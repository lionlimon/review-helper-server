import {
  GetDatabaseResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints';
import { AddMissingProps } from '../../types/utils';

export type PropertyName = 'title' |
  'rich_text' |
  'number' |
  'checkbox' |
  'select' |
  'multi_select' |
  'status' |
  'date' |
  'people' |
  'files' |
  'url' |
  'email' |
  'phone_number' |
  'relation' |
  'created_by' |
  'created_time' |
  'last_edited_by' |
  'last_edited_time' |
  'formula' |
  'rollup';

export type FilterParams = QueryDatabaseParameters['filter'];
export type SortsParams = QueryDatabaseParameters['sorts'];

/**
 * Извлечённый тип значений свойств фильтра
 */
export type MergedFilterParams = Partial<
  Pick<AddMissingProps<FilterParams>, 'and' | 'or'>
>

/**
 * Извлечённый тип элементов свойств фильтра and | or
 */
export type FilterParamsItem = Exclude<
  MergedFilterParams['and' | 'or'],
  undefined
>[number]

/**
 * Стандартные тэги будут присутствовать на всех наших таблицах
 */
export type GdrWithDefaultProperties = GetDatabaseResponse & {
  properties: {
    Tags: {
      multi_select: {
        options: {name: string}[]
      }
    },
  }
}
