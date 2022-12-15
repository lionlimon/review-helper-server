import { Client, isNotionClientError } from '@notionhq/client';
import {
  FilterParams,
  FilterParamsItem,
  MergeFilterParams,
  PropertyName,
} from './types';

export default class GetDatabaseQuery {
  _notionClient: Client;

  _filter = {} as FilterParams;

  _databaseId: string;

  constructor(client: Client, databaseId: string) {
    this._notionClient = client;
    this._databaseId = databaseId;
  }

  /**
   * Изменяет переданный фильтр добавляя новые условия
   */
  _mergeFilters<
    T extends MergeFilterParams,
    K extends keyof T & 'and' | 'or'
  >(
    newFilterParams: T[K],
    operator = 'and' as K,
  ) {
    console.log('mergim');
    const newFilter = { [operator]: [], ...this._filter } as T;

    newFilter[operator] = newFilter[operator]!
      .concat(newFilterParams as unknown as []);

    this._filter = newFilter as FilterParams;
  }

  async query() {
    try {
      return this._notionClient.databases.query({
        database_id: this._databaseId,
        filter: this._filter,
      });
    } catch (e: unknown) {
      if (isNotionClientError(e)) {
        console.error(e);
      }

      throw e;
    }
  }

  /**
   * Добавляют фильтрацию по не пустому полю
   */
  wherePropertyIsNotEmpty(propertyName: string, propertyType: PropertyName) {
    const newParam = {
      property: propertyName,
      [propertyType]: { is_not_empty: true },
    } as FilterParamsItem;

    this._mergeFilters([newParam]);

    return this;
  }

  /**
   * Фильтрация по значениям свойства
   */
  wherePropertyContain(propertyName: string, propertyType: PropertyName, value: string | string[]) {
    const makeContainParam = (containsValue: string) => ({
      property: propertyName,
      [propertyType]: { contains: containsValue },
    } as unknown as FilterParamsItem);

    this._mergeFilters(
      Array.isArray(value)
        ? value.map(makeContainParam)
        : [makeContainParam(value)],
    );

    return this;
  }
}
