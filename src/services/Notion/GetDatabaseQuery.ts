import { Client, isNotionClientError } from '@notionhq/client';
import {
  FilterParams,
  FilterParamsItem,
  MergedFilterParams,
  PropertyName, SortsParams,
} from './types';

export default class GetDatabaseQuery {
  _notionClient: Client;

  _filter = null as FilterParams | null;

  _sorts = null as SortsParams | null;

  _databaseId: string;

  constructor(client: Client, databaseId: string) {
    this._notionClient = client;
    this._databaseId = databaseId;
  }

  /**
   * Изменяет переданный фильтр добавляя новые условия
   */
  _mergeFilters<
    T extends MergedFilterParams,
    K extends keyof T & 'and' | 'or'
  >(
    newFilterParams: T[K],
    operator = 'and' as K,
  ) {
    const newFilter = { [operator]: [], ...this._filter ?? {} } as T;

    newFilter[operator] = newFilter[operator]!
      .concat(newFilterParams as unknown as []);

    this._filter = newFilter as FilterParams;
  }

  async query() {
    try {
      return this._notionClient.databases.query({
        database_id: this._databaseId,
        ...(this._filter ? { filter: this._filter } : {}),
        ...(this._sorts ? { sorts: this._sorts } : {}),
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

  sortBy(propertyName: string, direction: 'descending' | 'ascending') {
    this._sorts = [
      ...(this._sorts ? this._sorts : []),
      { property: propertyName, direction },
    ];

    return this;
  }
}
