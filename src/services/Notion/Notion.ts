import { Client } from '@notionhq/client';
import GetDatabaseQuery from './GetDatabaseQuery';
import { GdrWithDefaultProperties } from './types';

export default class Notion {
  _notionClient: InstanceType<typeof Client>;

  constructor(token: string) {
    this._notionClient = new Client({
      auth: token,
    });
  }

  getDatabase(databaseId: string) {
    return new GetDatabaseQuery(this._notionClient, databaseId);
  }

  async getTagsOfDatabase(databaseId: string) {
    const db = await this._notionClient.databases.retrieve({
      database_id: databaseId,
    }) as GdrWithDefaultProperties;

    return db.properties.Tags.multi_select.options.map((tag) => tag.name);
  }
}
