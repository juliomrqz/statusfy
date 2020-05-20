import matter from 'gray-matter'
import toml from 'toml'
// @ts-ignore
import tomlify from 'tomlify-j0.4'

const parse = (input: string | Buffer): matter.GrayMatterFile<string | Buffer> => {
  return matter(input, {
    excerpt: false,
    engines: {
      toml: toml.parse.bind(toml)
    }
  })
}

const stringify = (content: string, data: { [key: string]: string | string[] | boolean }, format: string): string => {
  return matter.stringify(
    content,
    data, {
    excerpt: false,
    language: format,
    engines: {
      toml: {
        parse: toml.parse.bind(toml),
        stringify: tomlify.toToml.bind(tomlify)
      }
    }
  })
}

export const grayMatter = {
  parse,
  stringify
}
