import { Client, isNotionClientError } from '@notionhq/client';
import { FilterParams, GetDatabaseParams, MergeFilterParams } from './types';

const DEFAULT_QUERY_FILTER: FilterParams = {
  and: [
    {
      property: 'title',
      title: {
        is_not_empty: true,
      },
    },

    {
      property: 'text',
      rich_text: {
        is_not_empty: true,
      },
    },
  ],
};

export default class Notion {
  _notionClient: InstanceType<typeof Client>;

  constructor(token: string) {
    this._notionClient = new Client({
      auth: token,
    });
  }

  /**
   * Изменяет переданный фильтр добавляя новые условия
   */
  static _mergeFilters<
    T extends MergeFilterParams,
    K extends keyof T & 'and' | 'or'
  >(
    defaultFilter: FilterParams,
    newFilterParams: T[K],
    operator = 'and' as K,
  ) {
    const newFilter = { ...defaultFilter } as T;

    if (newFilter?.[operator]) {
      newFilter[operator] = newFilter[operator]?.concat(newFilterParams as unknown as []);
    }

    return newFilter as FilterParams;
  }

  async getDatabase({ tags, title, databaseId }: GetDatabaseParams) {
    try {
      let filter = { ...DEFAULT_QUERY_FILTER } as FilterParams;

      // Фильтрация по тэгам
      if (tags?.length) {
        const filterByTags = tags.map((tag) => ({
          property: 'Tags',
          multi_select: {
            contains: tag,
          },
        }));

        filter = Notion._mergeFilters(filter, filterByTags);
      }

      // Фильтрация по заголовку
      if (title) {
        filter = Notion._mergeFilters(filter, [{
          property: 'title',
          title: {
            contains: title,
          },
        }]);
      }

      return this._notionClient.databases.query({
        database_id: databaseId,
        filter,
      });
    } catch (e: unknown) {
      if (isNotionClientError(e)) {
        console.error(e);
      }

      throw e;
    }
  }
}
