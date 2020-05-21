import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { logger } from './logger'

type Locale = typeof dayjs.Ls[0]

dayjs.extend(utc)

export const Dates = () => {
  return {
    addLocales(extraLangs: string[] | Locale[]) {
      if (extraLangs && extraLangs.length > 0) {
        extraLangs.forEach((l: string | Locale) => dayjs.locale(l))
      }
    },
    format(date?: string | number | Date | dayjs.Dayjs, template?: string, locale = 'en') {
      return dayjs.utc(date).locale(locale).format(template)
    },
    parse(inputDate?: string | number | Date | dayjs.Dayjs) {
      const date = inputDate ? inputDate : new Date()
      return dayjs.utc(date)
    },
    range(start: string | number | Date | dayjs.Dayjs, end: string | number | Date | dayjs.Dayjs, by = 'day') {
      const startDate = this.parse(start)
      const endDate = this.parse(end)
      let dates = []
      let diff: { day: number; month: number; } = { day: 0, month: 0 };

      if (endDate.diff(startDate) < 0) {
        logger.fatal('End Date must be greater than Start Date')
        process.exit(0)
      }

      if (by === 'day') {
        const startD = startDate.startOf('day');
        const endD = endDate.startOf('day');

        diff.day = endD.diff(startD, 'day', true)
        dates.push(startD)

        for (let i = 1; i <= diff.day; i++) {
          dates.push(startD.add(i, 'day'))
        }
      } else if (by === 'month') {
        const startM = startDate.startOf('month');
        const endM = endDate.startOf('month');

        diff.month = endM.diff(startM, 'month', true)
        dates.push(startM)

        for (let i = 1; i <= diff.month; i++) {
          dates.push(startM.add(i, 'month'))
        }
      }

      return {
        diff,
        dates
      }
    }
  }
}
