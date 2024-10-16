"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStyleModulesType = generateStyleModulesType;
const index_1 = require("./index");
const template_1 = require("./template");
const common_1 = require("../common");
function* generateStyleModulesType(options, ctx) {
    const styles = options.sfc.styles.filter(style => style.module);
    if (!styles.length) {
        return;
    }
    yield `type __VLS_StyleModules = {${common_1.newLine}`;
    for (let i = 0; i < styles.length; i++) {
        const style = styles[i];
        const { name, offset } = style.module;
        if (offset) {
            yield [
                name,
                'main',
                offset + 1,
                index_1.codeFeatures.all
            ];
        }
        else {
            yield name;
        }
        yield `: Record<string, string> & ${ctx.localTypes.PrettifyLocal}<{}`;
        for (const className of style.classNames) {
            yield* (0, template_1.generateCssClassProperty)(i, className.text, className.offset, 'string', false);
        }
        yield `>${common_1.endOfLine}`;
    }
    yield `}`;
    yield common_1.endOfLine;
}
//# sourceMappingURL=styleModulesType.js.map