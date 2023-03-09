import { TextRichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
import Html from '../../utils/Html';

/**
 * Формирует из notion свойства reach_text html разметку
 */
export function richTextToHtml(content: TextRichTextItemResponse[]) {
  return content.reduce((result, item) => {
    let text = item.text.content
      .replace(/>/g, '&gt')
      .replace(/</g, '&lt');

    const {
      bold, code, italic, strikethrough,
    } = item.annotations;

    if (bold) text = Html.toStrongString(text);
    if (code) text = Html.toCodeString(text);
    if (italic) text = Html.toItalicString(text);
    if (strikethrough) text = Html.toStrikeString(text);
    if (item.href) text = Html.toLinkText(text, item.href);

    return result + text;
  }, '');
}
