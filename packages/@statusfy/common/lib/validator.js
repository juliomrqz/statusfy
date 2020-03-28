"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __importDefault(require("url"));
const isURL_1 = __importDefault(require("validator/lib/isURL"));
const isRFC3339_1 = __importDefault(require("validator/lib/isRFC3339"));
exports.isURL = (value) => {
    const url = url_1.default.parse(value);
    if (url.pathname && url.pathname.startsWith('//')) {
        return false;
    }
    else if (url.pathname && url.pathname.startsWith('/') && !url.hostname) {
        return true;
    }
    else {
        return isURL_1.default(value, {
            protocols: ['http', 'https'],
            require_tld: true,
            require_protocol: true,
            require_host: true,
            require_valid_protocol: true
        });
    }
};
exports.isRFC3339 = isRFC3339_1.default;
//# sourceMappingURL=validator.js.map