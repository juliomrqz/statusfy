"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const logger_1 = require("./logger");
dayjs_1.default.extend(utc_1.default);
exports.Dates = () => {
    return {
        addLocales(extraLangs) {
            if (extraLangs && extraLangs.length > 0) {
                extraLangs.forEach((l) => dayjs_1.default.locale(l));
            }
        },
        format(date, template, locale = 'en') {
            return dayjs_1.default.utc(date).locale(locale).format(template);
        },
        parse(inputDate) {
            const date = inputDate ? inputDate : new Date();
            return dayjs_1.default.utc(date);
        },
        range(start, end, by = 'day') {
            const startDate = this.parse(start);
            const endDate = this.parse(end);
            let dates = [];
            let diff = { day: 0, month: 0 };
            if (endDate.diff(startDate) < 0) {
                logger_1.logger.fatal('End Date must be greater than Start Date');
                process.exit(0);
            }
            if (by === 'day') {
                const startD = startDate.startOf('day');
                const endD = endDate.startOf('day');
                diff.day = endD.diff(startD, 'day', true);
                dates.push(startD);
                for (let i = 1; i <= diff.day; i++) {
                    dates.push(startD.add(i, 'day'));
                }
            }
            else if (by === 'month') {
                const startM = startDate.startOf('month');
                const endM = endDate.startOf('month');
                diff.month = endM.diff(startM, 'month', true);
                dates.push(startM);
                for (let i = 1; i <= diff.month; i++) {
                    dates.push(startM.add(i, 'month'));
                }
            }
            return {
                diff,
                dates
            };
        }
    };
};
//# sourceMappingURL=dates.js.map