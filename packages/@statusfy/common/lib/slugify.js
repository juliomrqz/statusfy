"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slugify_1 = __importDefault(require("slugify"));
const lodash_isstring_1 = __importDefault(require("lodash.isstring"));
exports.slugify = (text, replacement = '_') => {
    if (lodash_isstring_1.default(text)) {
        return slugify_1.default(text, { replacement, lower: true });
    }
    else {
        return '';
    }
};
//# sourceMappingURL=slugify.js.map