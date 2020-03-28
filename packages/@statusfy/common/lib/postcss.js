"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postcss = (tailwindJS) => {
    return Object.assign(Object.assign({ 'postcss-import': {} }, tailwindJS ? { 'tailwindcss': tailwindJS } : {}), { 'postcss-nested': {}, 'postcss-preset-env': {}, 'postcss-combine-duplicated-selectors': {}, 'autoprefixer': {} });
};
//# sourceMappingURL=postcss.js.map