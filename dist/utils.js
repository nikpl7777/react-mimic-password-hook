"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSearchMaskRegExp = void 0;
/**
 * Create a regexp which selects new input content (distinguished from masking symbols)
 * @param cursorPos current cursor position
 * @param mask Masking symbol
 */
exports.makeSearchMaskRegExp = (cursorPos, mask) => {
    if (cursorPos) {
        return new RegExp(`(^\\${mask}{1,${cursorPos}})|(\\${mask}+)`, 'g');
    }
    return new RegExp(`(\\${mask}+)`, 'g');
};
//# sourceMappingURL=utils.js.map