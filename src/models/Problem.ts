import {
  PageObjectResponse,
  TextRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { config } from 'dotenv';
import Notion from '../services/Notion';
import { richTextToHtml } from '../services/Notion/utils';

config();

const notion = new Notion(process.env.SECRET_TOKEN);

export type ProblemListParams = { tags?: string[], title?: string };
export type ProblemListResult = (PageObjectResponse & {
  properties: {
    title: {
      title: {text: {content: string}}[]
    },

    Tags: {
      multi_select: {name: string}[]
    },

    text: {
      rich_text: TextRichTextItemResponse[]
    }
  }
})[];

export default class Problem {
  /**
  * Список проблем студентов
  */
  static async list({ tags = [], title = '' }: ProblemListParams = {}) {
    const { results } = await notion.getDatabase({
      tags,
      title,
      databaseId: process.env.PROBLEMS_DATABASE_ID,
    });

    return this._formatListResult(results as ProblemListResult);
  }

  static _formatListResult(data: ProblemListResult) {
    return data.map((problem) => ({
      title: problem.properties.title.title[0].text.content,
      id: problem.id,
      tags: problem.properties.Tags.multi_select.map((tag) => tag.name),
      text: richTextToHtml(problem.properties.text.rich_text),
    }));
  }
}
