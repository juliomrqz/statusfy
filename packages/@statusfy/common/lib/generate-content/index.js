"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hash_sum_1 = __importDefault(require("hash-sum"));
const lodash_template_1 = __importDefault(require("lodash.template"));
const lodash_foreach_1 = __importDefault(require("lodash.foreach"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const upath_1 = __importDefault(require("upath"));
const dates_1 = require("../dates");
const data_json_1 = __importDefault(require("./data.json"));
const severities = [
    'under-maintenance',
    'degraded-performance',
    'partial-outage',
    'major-outage'
];
const dates = dates_1.Dates();
const getDaySubtraction = (index) => {
    // Two incidents per day
    // a_n = 1/4 (2 n + (-1)^(n + 1) - 3)
    // n >= 1
    return (1 / 4) * ((2 * index) + Math.pow(-1, 1 + index) - 3);
};
const getId = (n, length) => n % length;
const incidentTemplate = lodash_template_1.default(`---
id: <%= data.id %>
title: <%= data.title[lang] %>
description: <%= data.content[lang] %>
date: <%= data.date %>
modified: <%= data.modified %><% if (typeof(data.scheduled) !== 'undefined') { %>
scheduled: <%= data.scheduled %>
duration: 30<% } %>
severity: <%= data.severity %>
resolved: <%= data.resolved %>
affectedsystems:
  - <%= data.affectedsystems.join('\\n  - ') %>
---

<%= data.content[lang] %>

<% forEach(data.updates, function(update) { %>
::: update <%= update.title[lang] %> | <%= update.date %>
<%= update.content[lang] %>
:::
<% }); %>
`);
exports.generateDemoContent = function generateDemoContent(dest, finalDate, amount = 20) {
    // Empty Destination
    fs_extra_1.default.emptyDirSync(dest);
    fs_extra_1.default.outputFileSync(upath_1.default.resolve(dest, '.keep'), '');
    let monthSubtraction = 0;
    for (let i = 1; i <= amount; i++) {
        // 6 incidents per month
        if ((i % 6) === 0) {
            monthSubtraction += 1;
        }
        const titleIndex = i === 1 ? (data_json_1.default.title.en.length - 1) : getId(i, data_json_1.default.title.en.length - 1);
        const contentIndex = i === 1 ? (data_json_1.default.content.en.length - 1) : getId(i, data_json_1.default.content.en.length - 1);
        const updatesContentIds = [
            getId(i, data_json_1.default.updates.content.en.length),
            getId(i + 1, data_json_1.default.updates.content.en.length),
            getId(i + 2, data_json_1.default.updates.content.en.length)
        ];
        const date = dates.parse(finalDate)
            .subtract(getDaySubtraction(i), 'day')
            .subtract(monthSubtraction, 'month');
        const incident = {
            id: hash_sum_1.default(i),
            date: date.toISOString(),
            modified: date.add(2, 'hour').toISOString(),
            scheduled: i === 1 ? dates.parse(finalDate).add(7, 'day').toISOString() : undefined,
            resolved: i > 2,
            severity: i === 1 ? severities[0] : severities[getId(i, 4)],
            affectedsystems: data_json_1.default.affectedsystems.slice(0, getId(i, 4) + 1),
            title: {
                en: data_json_1.default.title.en[titleIndex],
                es: data_json_1.default.title.es[titleIndex]
            },
            content: {
                en: data_json_1.default.content.en[contentIndex],
                es: data_json_1.default.content.es[contentIndex]
            },
            updates: i === 1 ? [] : [
                {
                    date: date.add(2, 'hour').toISOString(),
                    title: {
                        en: data_json_1.default.updates.title.resolved.en,
                        es: data_json_1.default.updates.title.resolved.es
                    },
                    content: {
                        en: data_json_1.default.updates.content.en[updatesContentIds[0]],
                        es: data_json_1.default.updates.content.es[updatesContentIds[0]]
                    }
                },
                {
                    date: date.add(1, 'hour').toISOString(),
                    title: {
                        en: data_json_1.default.updates.title.monitoring.en,
                        es: data_json_1.default.updates.title.monitoring.es
                    },
                    content: {
                        en: data_json_1.default.updates.content.en[updatesContentIds[1]],
                        es: data_json_1.default.updates.content.es[updatesContentIds[1]]
                    }
                },
                {
                    date: date.add(30, 'minute').toISOString(),
                    title: {
                        en: data_json_1.default.updates.title.resolved.en,
                        es: data_json_1.default.updates.title.resolved.es
                    },
                    content: {
                        en: data_json_1.default.updates.content.en[updatesContentIds[2]],
                        es: data_json_1.default.updates.content.es[updatesContentIds[2]]
                    }
                }
            ]
        };
        // Write File
        const fileName = `${incident.date.split('T')[0]}_${incident.id}.md`;
        const incidentContentEn = incidentTemplate({
            lang: 'en',
            data: incident,
            forEach: lodash_foreach_1.default
        });
        const incidentContentEs = incidentTemplate({
            lang: 'es',
            data: incident,
            forEach: lodash_foreach_1.default
        });
        fs_extra_1.default.outputFileSync(upath_1.default.resolve(dest, fileName), incidentContentEn);
        fs_extra_1.default.outputFileSync(upath_1.default.resolve(dest, 'es', fileName), incidentContentEs);
    }
};
//# sourceMappingURL=index.js.map