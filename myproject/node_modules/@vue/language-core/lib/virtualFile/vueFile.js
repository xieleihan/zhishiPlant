"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VueVirtualCode = void 0;
const computeds_1 = require("computeds");
const computedEmbeddedCodes_1 = require("./computedEmbeddedCodes");
const computedSfc_1 = require("./computedSfc");
const computedVueSfc_1 = require("./computedVueSfc");
const plugins_1 = require("../plugins");
class VueVirtualCode {
    // others
    get embeddedCodes() {
        return this.getEmbeddedCodes();
    }
    get snapshot() {
        return this.getSnapshot();
    }
    get mappings() {
        return this.getMappings();
    }
    constructor(fileName, languageId, initSnapshot, vueCompilerOptions, plugins, ts) {
        this.fileName = fileName;
        this.languageId = languageId;
        this.initSnapshot = initSnapshot;
        this.vueCompilerOptions = vueCompilerOptions;
        this.plugins = plugins;
        this.ts = ts;
        // sources
        this.id = 'main';
        // computeds
        this.getVueSfc = (0, computedVueSfc_1.computedVueSfc)(this.plugins, this.fileName, this.languageId, () => this.getSnapshot());
        this.sfc = (0, computedSfc_1.computedSfc)(this.ts, this.plugins, this.fileName, () => this.getSnapshot(), this.getVueSfc);
        this.getMappings = (0, computeds_1.computed)(() => {
            const snapshot = this.getSnapshot();
            return [{
                    sourceOffsets: [0],
                    generatedOffsets: [0],
                    lengths: [snapshot.getLength()],
                    data: plugins_1.allCodeFeatures,
                }];
        });
        this.getEmbeddedCodes = (0, computedEmbeddedCodes_1.computedEmbeddedCodes)(this.plugins, this.fileName, this.sfc);
        this.getSnapshot = (0, computeds_1.signal)(initSnapshot);
    }
    update(newSnapshot) {
        this.getSnapshot.set(newSnapshot);
    }
}
exports.VueVirtualCode = VueVirtualCode;
//# sourceMappingURL=vueFile.js.map