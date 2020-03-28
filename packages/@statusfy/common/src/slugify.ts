import _slugify from 'slugify'
import isString from 'lodash.isstring'

export const slugify = (text?: string, replacement = '_'): string => {
  if (isString(text)) {
    return _slugify(text, { replacement, lower: true });
  } else {
    return ''
  }
}
