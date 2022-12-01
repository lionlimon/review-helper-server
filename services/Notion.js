const { Client } = require("@notionhq/client");
const Html = require("../utils/Html");

/**
 * @type {
 *   Omit<WithAuth<QueryDatabaseParameters>, 'database_id'>
 * }
 */

/**
 * @typedef NotionPropertyAnnotations
 * @property {boolean} bold
 * @property {boolean} italic
 * @property {boolean} strikethrough
 * @property {boolean} underline
 * @property {boolean} code 
 * @property {string} color
 * 
 * @typedef NotionProperty
 * @property {string} type
 * @property {NotionPropertyAnnotations} annotations
 * @property {string} href
 * @property {string} href
 */

const DEFAULT_QUERY_FILTER = {
	and: [
		{
			property: "title",
			title: {
				is_not_empty: true,
			}
		},

		{
			property: "text",
			rich_text: {
				is_not_empty: true
			}
		}
	]
}

class Notion {
	/**
	 * @param {string} token
	 */
	constructor(token) {
		this._notionClient = new Client({
			auth: token,
		});
	}

	_mergeFilters(defaultFilter, newFilterParams, operator = 'and') {
		const newFilter = {...defaultFilter};

		newFilter[operator] = [
			...newFilter[operator], ...newFilterParams
		];

		return newFilter;
	};

	/**
	 * @param {string[]} tags
	 * @param {string} title
	 * @param {string} databaseId
	 * @return {Promise<QueryDatabaseResponse>}
	 */
	async getDatabase({ tags, title, databaseId } = {}) {
		try {
			let filter = DEFAULT_QUERY_FILTER;

			// Фильтрация по тэгам
			if (!!tags?.length) {
				const filterByTags = tags.map(tag => ({
					property: "Tags",
					multi_select: {
						contains: tag
					}
				}));

				filter = this._mergeFilters(filter, filterByTags);
			}

			// Фильтрация по заголовку
			if (!!title) {
				filter = this._mergeFilters(filter, [{
					property: "title",
					title: {
						contains: title
					}
				}]);
			}

			return this._notionClient.databases.query({
				database_id: process.env.PROBLEMS_DATABASE_ID,
				filter,
			});
		} catch (e) {
			console.error(e.body);
		}
	}

	/**
	 * Формирует из notion свойства html разметку
	 * 
	 * @param {NotionProperty[]} content
	 * @return {string} - html
	 */
	static contentToHtml(content) {
		return content.reduce((result, item) => {
			let text = item.text.content;

			const { bold, code, italic, strikethrough } = item.annotations;
	
			if (bold) text = Html.toStrongString(text);
			if (code) text = Html.toCodeString(text);
			if (italic) text = Html.toItalicString(text); 
			if (strikethrough) text = Html.toStrikeString(text);
			if (item.href) text = Html.toLinkText(text, item.href);
			
			return result + text;
		}, '');
	}
}

module.exports = Notion;
