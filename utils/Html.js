/**
 * Утилита для оборачивания строк в html тэги
 */
class Html {
  static toTagString = (text, tag) => `<${tag}>${text}</${tag}>`
  static toStrongString = (text) => Html.toTagString(text, 'strong');
  static toItalicString = (text) => Html.toTagString(text, 'i');
  static toStrikeString = (text) => Html.toTagString(text, 's');
  static toCodeString = (text) => Html.toTagString(text, 'code');
  static toLinkText = (text, href) => `<a href="${href}">${text}</a>`;
}

module.exports = Html;