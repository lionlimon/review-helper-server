import {
  PageObjectResponse, PartialPageObjectResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints';
import { AddMissingProps } from '../../types/utils';

export type GetDatabaseParams = {
  tags?: string[],
  title?: string,
  databaseId: string,
}

export type FilterParams = QueryDatabaseParameters['filter'];
export type Content = (PageObjectResponse | PartialPageObjectResponse)[];
export type MergeFilterParams = Partial<
  Pick<AddMissingProps<FilterParams>, 'and' | 'or'>
>;
