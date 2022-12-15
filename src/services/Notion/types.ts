import {
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
export type MergeFilterParams = Partial<
  Pick<AddMissingProps<FilterParams>, 'and' | 'or'>
>
export type FilterParamsItem = Exclude<
  MergeFilterParams['and' | 'or'],
  undefined
>[number]
