"use strict";
// https://github.com/vuejs/core/blob/main/packages/compiler-sfc/src/cssVars.ts#L47-L61
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCssVars = parseCssVars;
exports.clearComments = clearComments;
const vBindCssVarReg = /\bv-bind\(\s*(?:'([^']+)'|"([^"]+)"|([a-z_]\w*))\s*\)/gi;
const commentReg1 = /\/\*([\s\S]*?)\*\//g;
const commentReg2 = /\/\/([\s\S]*?)\n/g;
function* parseCssVars(styleContent) {
    styleContent = clearComments(styleContent);
    const matchs = styleContent.matchAll(vBindCssVarReg);
    for (const match of matchs) {
        const matchText = match.slice(1).find(t => t);
        if (matchText) {
            const offset = match.index + styleContent.slice(match.index).indexOf(matchText);
            yield { offset, text: matchText };
        }
    }
}
function clearComments(css) {
    return css
        .replace(commentReg1, match => `/*${' '.repeat(match.length - 4)}*/`)
        .replace(commentReg2, match => `//${' '.repeat(match.length - 3)}\n`);
}
//# sourceMappingURL=parseCssVars.js.map