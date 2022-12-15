import { Client } from '@notionhq/client';
import GetDatabaseQuery from './GetDatabaseQuery';

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
}
