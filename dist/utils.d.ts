/**
 * Create a regexp which selects new input content (distinguished from masking symbols)
 * @param cursorPos current cursor position
 * @param mask Masking symbol
 */
export declare const makeSearchMaskRegExp: (cursorPos: number, mask: string) => RegExp;
