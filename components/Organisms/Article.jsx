import React from 'react';

const Article = ({ body }) => {
  return (
    <article
      className="prose dark:prose-invert prose-headings:text-xl prose-headings:pt-1 prose-p:text-base lg:prose-xl prose-code:text-base prose-ol:text-base prose-ul:text-base prose-li:text-base prose-pre:text-base"
      dangerouslySetInnerHTML={{ __html: body }}
    ></article>
  );
};

export default Article;
