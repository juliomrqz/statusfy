"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gray_matter_1 = __importDefault(require("gray-matter"));
const toml_1 = __importDefault(require("toml"));
// @ts-ignore
const tomlify_j0_4_1 = __importDefault(require("tomlify-j0.4"));
const parse = (input) => {
    return gray_matter_1.default(input, {
        excerpt: false,
        engines: {
            toml: toml_1.default.parse.bind(toml_1.default)
        }
    });
};
const stringify = (content, data, format) => {
    return gray_matter_1.default.stringify(content, data, {
        excerpt: false,
        language: format,
        engines: {
            toml: {
                parse: toml_1.default.parse.bind(toml_1.default),
                stringify: tomlify_j0_4_1.default.toToml.bind(tomlify_j0_4_1.default)
            }
        }
    });
};
exports.grayMatter = {
    parse,
    stringify
};
//# sourceMappingURL=gray-matter.js.map