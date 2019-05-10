import Dates from '@/common/lib/dates'

const dates = Dates()

describe('common:dates', () => {
  test('parse', () => {
    const date1 = dates.parse('2019-03-13T15:30:13.758Z')
    const date2 = dates.parse('2019-03-10T02:30:13Z')
    const date3 = dates.parse('2019-03-11T13:06:03.407Z')
    const date4 = dates.parse(new Date('2019-03-11T13:06:03.407Z'))
    const date5 = dates.parse(new Date('05 October 2011 14:48 UTC'))

    expect(date1.isValid()).toBeTruthy()
    expect(date1.utcOffset()).toBe(0)

    expect(date2.isValid()).toBeTruthy()
    expect(date2.utcOffset()).toBe(0)

    expect(date3.isValid()).toBeTruthy()
    expect(date3.utcOffset()).toBe(0)

    expect(date4.isValid()).toBeTruthy()
    expect(date4.utcOffset()).toBe(0)

    expect(date5.isValid()).toBeTruthy()
    expect(date5.utcOffset()).toBe(0)
  })

  test('format', () => {
    const date1 = dates.parse('2019-03-13T15:30:13.758Z')
    const date2 = dates.parse('2019-03-10T02:30:13Z')
    const date3 = dates.parse('2019-03-11T13:06:03.407Z')
    const date4 = dates.parse(new Date('2019-03-11T13:06:03.407Z'))
    const date5 = dates.parse(new Date('05 October 2011 14:48 UTC'))

    expect(dates.format(date1)).toBe('2019-03-13T15:30:13Z')
    expect(date1.toISOString()).toBe('2019-03-13T15:30:13.758Z')
    expect(date1.toString()).toBe('Wed, 13 Mar 2019 15:30:13 GMT')

    expect(dates.format(date2)).toBe('2019-03-10T02:30:13Z')
    expect(date2.toISOString()).toBe('2019-03-10T02:30:13.000Z')
    expect(date2.toString()).toBe('Sun, 10 Mar 2019 02:30:13 GMT')

    expect(dates.format(date3)).toBe('2019-03-11T13:06:03Z')
    expect(date3.toISOString()).toBe('2019-03-11T13:06:03.407Z')
    expect(date3.toString()).toBe('Mon, 11 Mar 2019 13:06:03 GMT')

    expect(dates.format(date4)).toBe('2019-03-11T13:06:03Z')
    expect(date4.toISOString()).toBe('2019-03-11T13:06:03.407Z')
    expect(date4.toString()).toBe('Mon, 11 Mar 2019 13:06:03 GMT')

    expect(dates.format(date5)).toBe('2011-10-05T14:48:00Z')
    expect(date5.toISOString()).toBe('2011-10-05T14:48:00.000Z')
    expect(date5.toString()).toBe('Wed, 05 Oct 2011 14:48:00 GMT')
  })

  test('range', () => {
    const date1 = dates.parse('2019-03-13T15:30:13.758Z')
    const date2 = dates.parse('2019-03-06T02:30:13Z')
    const date3 = dates.parse('2019-01-11T13:06:03.407Z')
    const date4 = dates.parse('2018-11-11T13:06:03.407Z')

    const date2date1DayRange = dates.range(date2, date1)
    const date3date1DayRange = dates.range(date3, date1)

    const date3date1MonthRange = dates.range(date3, date1, 'month')
    const date4date1MonthRange = dates.range(date4, date1, 'month')

    // diff day
    expect(date2date1DayRange.diff.day).toBe(7)
    expect(date2date1DayRange.dates).toMatchSnapshot();
    expect(date2date1DayRange.dates[0]).toEqual(date2.startOf('day'))
    expect(date2date1DayRange.dates[date2date1DayRange.dates.length - 1]).toEqual(date1.startOf('day'))

    expect(date3date1DayRange.diff.day).toBe(61)
    expect(date3date1DayRange.dates).toMatchSnapshot();
    expect(date3date1DayRange.dates[0]).toEqual(date3.startOf('day'))
    expect(date3date1DayRange.dates[date3date1DayRange.dates.length - 1]).toEqual(date1.startOf('day'))

    // diff month
    expect(date3date1MonthRange.diff.month).toBe(2)
    expect(date3date1MonthRange.dates).toMatchSnapshot();
    expect(date3date1MonthRange.dates[0]).toEqual(date3.startOf('month'))
    expect(date3date1MonthRange.dates[date3date1MonthRange.dates.length - 1]).toEqual(date1.startOf('month'))

    expect(date4date1MonthRange.diff.month).toBe(4)
    expect(date4date1MonthRange.dates).toMatchSnapshot();
    expect(date4date1MonthRange.dates[0]).toEqual(date4.startOf('month'))
    expect(date4date1MonthRange.dates[date4date1MonthRange.dates.length - 1]).toEqual(date1.startOf('month'))
  })
})
