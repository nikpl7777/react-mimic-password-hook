/**
 * Create a regexp which selects new input content (distinguished from masking symbols)
 * @param cursorPos current cursor position
 * @param mask Masking symbol
 */
export const makeSearchMaskRegExp = (cursorPos: number, mask: string): RegExp => {
  if (cursorPos) {
    return new RegExp(`(^\\${mask}{1,${cursorPos}})|(\\${mask}+)`, 'g')
  }

  return new RegExp(`(\\${mask}+)`, 'g')
}
