/**
 * Утилита для оборачивания строк в html тэги
 */
export default class Html {
  static toTagString = (text: string, tag: string) => `<${tag}>${text}</${tag}>`;

  static toStrongString = (text: string) => Html.toTagString(text, 'strong');

  static toItalicString = (text: string) => Html.toTagString(text, 'i');

  static toStrikeString = (text: string) => Html.toTagString(text, 's');

  static toCodeString = (text: string) => Html.toTagString(text, 'code');

  static toLinkText = (text: string, href: string) => `<a target="_blank" href="${href}">${text}</a>`;
}
