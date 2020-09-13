"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMimicPassword = void 0;
const react_1 = __importDefault(require("react"));
const defaults = {
    mask: '•',
    delay: 1000,
    mode: 'delayed',
};
exports.useMimicPassword = (props) => {
    const { mask, delay, mode, handleChange, } = react_1.default.useMemo(() => (Object.assign(Object.assign({}, defaults), props)), [props]);
    const timer = react_1.default.useRef();
    const cursorPos = react_1.default.useRef(0);
    const inputRef = react_1.default.useRef(null);
    const [value, setValue] = react_1.default.useState('');
    const [presentation, setPresentation] = react_1.default.useState('');
    const onChange = react_1.default.useCallback((e) => {
        clearTimeout(timer.current);
        inputRef.current = e.target;
        cursorPos.current = inputRef.current.selectionEnd || 0;
        const inputValue = inputRef.current.value;
        // This is going to be the new original value (unmasked)
        const newValue = inputValue.replace(new RegExp(`${cursorPos.current ? `(^\\${mask}{1,${cursorPos.current}})|` : ''}(\\${mask}+)`, 'g'), (match, _, offset) => {
            if (!offset && cursorPos.current) {
                return value.substr(0, match.length);
            }
            return value.substr(-match.length);
        });
        // Mask the value leaving the last character entered intact
        let maskedValue = '';
        if (mode === 'persymbol') {
            maskedValue = inputValue.split('').map((c, index) => (index === cursorPos.current - 1 ? c : mask)).join('');
        }
        else {
            maskedValue = inputValue;
        }
        setValue(newValue);
        setPresentation(maskedValue);
        timer.current = setTimeout(() => {
            var _a;
            cursorPos.current = ((_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.selectionEnd) || 0;
            setPresentation(new Array(inputValue.length + 1).join(mask));
        }, delay);
        if (typeof handleChange === 'function') {
            handleChange(e);
        }
        return newValue;
    }, [handleChange, setValue, setPresentation, timer, delay, mask, presentation, value, cursorPos]);
    // Restore cursor position once presentation has changed
    react_1.default.useEffect(() => {
        var _a;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.setSelectionRange(cursorPos.current, cursorPos.current);
    }, [presentation, inputRef]);
    return [value, presentation, onChange];
};
//# sourceMappingURL=index.js.map