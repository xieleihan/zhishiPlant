"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCssClassNames = parseCssClassNames;
const parseCssVars_1 = require("./parseCssVars");
const cssClassNameReg = /(?=(\.[a-z_][-\w]*)[\s.,+~>:#[{])/gi;
function* parseCssClassNames(styleContent) {
    styleContent = (0, parseCssVars_1.clearComments)(styleContent);
    const matches = styleContent.matchAll(cssClassNameReg);
    for (const match of matches) {
        const matchText = match[1];
        if (matchText) {
            yield { offset: match.index, text: matchText };
        }
    }
}
//# sourceMappingURL=parseCssClassNames.js.map