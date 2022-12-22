import { config } from 'dotenv';
import Notion from '../services/Notion';

config();

const notion = new Notion(process.env.SECRET_TOKEN);

export type CheckListListParams = { tag?: string };

export default class CheckList {
  static async list({ tag = '' }: CheckListListParams = {}) {
    const checkList = notion.getDatabase(process.env.CHECK_LIST_DATABASE_ID)
      .wherePropertyIsNotEmpty('Name', 'title');

    if (tag) {
      checkList.wherePropertyContain('Tags', 'multi_select', tag);
    }

    const { results } = await checkList.query();

    return results;
  }

  static tags() {
    return notion.getTagsOfDatabase(process.env.CHECK_LIST_DATABASE_ID);
  }
}
