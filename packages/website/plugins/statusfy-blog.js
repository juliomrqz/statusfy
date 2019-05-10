import isAlphanumeric from 'validator/lib/isAlphanumeric'

import BlogIndex from '../content/blog'
import BlogUtils from '../helpers/blog'

export default (_, inject) => {
  const blog = {
    async getArticles(lang) {
      const articles = await BlogUtils.buildArticles(lang)
      return articles
    },
    async getArticle(slug, lang) {
      const article = await BlogUtils.buildArticle(slug, lang)
      return article
    },
    validate(key, data) {
      const _isAlphanumeric = data => isAlphanumeric(data.replace(/-/g, ''))
      let isValid = false

      if (key === 'articleSlug') {
        isValid = BlogIndex.articles.includes(data) && _isAlphanumeric(data)
      }

      return isValid
    }
  }

  inject('blog', blog)
}
