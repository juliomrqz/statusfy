import BlogIndex from '~/content/blog'

const getContent = async (slug, lang) =>
  /* eslint-disable no-return-await */
  await import(/* webpackChunkName: "blog-[request]" */ `../content/blog/${lang}/${slug}.md`)

const buildArticle = async (slug, lang = 'en') => {
  const content = await getContent(slug, lang)

  if (typeof content.attributes.author === 'string') {
    const author = BlogIndex.authors[content.attributes.author]
    author.username = content.attributes.author
    content.attributes.author = author
  }

  return content
}

const buildArticles = async (lang = 'en') => {
  const articles = []

  for (let i = 0; i < BlogIndex.articles.length; i++) {
    const slug = BlogIndex.articles[i]
    const article = await buildArticle(slug, lang)
    articles.push(article)
  }

  return articles
}

export default {
  buildArticle,
  buildArticles
}
