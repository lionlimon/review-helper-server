require('dotenv').config();
const Notion = require("../services/Notion");
const notion = new Notion(process.env.SECRET_TOKEN);

/**
 * @typedef Problem
 * @property {string} title
 * @property {string} id
 * @property {string[]} tags
 * @property {string} text
 */

class Problem {
	/**
	 * Список проблем студентов
	 *
	 * @param {string[]} tags
	 * @param {string | null} title
	 * @return {Promise<Problem[]>}
	 */
	static async list({ tags = [], title= null } = {}) {
		const { results } = await notion.getDatabase({
			tags,
			title,
			databaseId: process.env.PROBLEMS_DATABASE_ID,
		});



		return this._formatListResult(results);
	}

	/**
	 * @param {[]} data
	 * @return {Problem[]}
	 */
	static _formatListResult(data) {
		return data.map((problem) => ({
			title: problem.properties.title.title[0].text.content,
			id: problem.id,
			tags: problem.properties.Tags.multi_select.map((tag) => tag.name),
			text: Notion.contentToHtml(problem.properties.text
				.rich_text),
		}));
	}
}

module.exports = Problem;
