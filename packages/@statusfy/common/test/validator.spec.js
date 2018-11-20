import { path } from '@statusfy/common'

import { isURL } from '@/common/lib/validator'

describe('common:validator', () => {
  test('isURL', () => {
    expect(isURL('/')).toBeTruthy()
    expect(isURL('http://statusfy.co')).toBeTruthy()
    expect(isURL('https://statusfy.co')).toBeTruthy()
    expect(isURL('https://statusfy.co/prefix')).toBeTruthy()
    expect(isURL('/prefix')).toBeTruthy()

    expect(isURL('//statusfy.co/prefix')).toBeFalsy()
    expect(isURL('ftp://statusfy.co')).toBeFalsy()
    expect(isURL('ftps://statusfy.co')).toBeFalsy()
  })
})
