<%= localePaths.map(locale => `import ${'locale_' + hash(locale)} from '${locale}'`).join('\n') %>

const messages = {
  <%= localePaths.map(locale => '...locale_' + hash(locale)).join(',\n  ') %>
}

export default messages
