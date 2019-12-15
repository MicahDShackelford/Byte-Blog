import marked from 'marked';
import emoji from 'node-emoji';
import DOMPurify from 'dompurify';

let ParseMarkdown = (markdown) => {
  return new Promise((resolve,reject) => {
    const parseEmoji = (match) => emoji.emojify(match);

    let formattedBody =
      DOMPurify.sanitize(markdown)
      .replace(/&gt;+/g, '>')
      .replace(/(:.*:)/g, parseEmoji);
    formattedBody = marked(formattedBody, { breaks: true });

    resolve(formattedBody);
  })
}

export default ParseMarkdown;