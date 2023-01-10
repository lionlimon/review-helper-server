import { config } from 'dotenv';
import {
  PageObjectResponse,
  TextRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';
import Notion from '../services/Notion';
import { richTextToHtml } from '../services/Notion/utils';

config();

const notion = new Notion(process.env.SECRET_TOKEN);

export type CheckListListParams = { tag?: string };
export type CheckListItem = Record<'id' | 'title' | 'explainText', string> & { subTask: number };
export type CheckListResult = (PageObjectResponse & {
  properties: {
    Name: {
      title: {text: {content: string}}[]
    },

    Message: {
      rich_text: TextRichTextItemResponse[]
    },

    subtask: {
      number: number
    }
  }
})[]

export default class CheckList {
  static async list({ tag = '' }: CheckListListParams = {}) {
    const checkList = notion.getDatabase(process.env.CHECK_LIST_DATABASE_ID)
      .wherePropertyIsNotEmpty('Name', 'title')
      .sortBy('subtask', 'ascending');

    if (tag) {
      checkList.wherePropertyContain('Tags', 'multi_select', tag);
    }

    const { results } = await checkList.query();

    return this._formatList(results as CheckListResult);
  }

  static tags() {
    return notion.getTagsOfDatabase(process.env.CHECK_LIST_DATABASE_ID);
  }

  static _formatList(data: CheckListResult) {
    return data.map((item) => ({
      id: item.id,
      title: item.properties.Name.title
        .reduce((text, curItem) => text + curItem.text.content, ''),
      subTask: item.properties.subtask.number,
      explainText: richTextToHtml(item.properties.Message.rich_text),
    })) as CheckListItem[];
  }
}
