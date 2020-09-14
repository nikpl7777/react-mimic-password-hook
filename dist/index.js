"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMimicPassword = void 0;
const react_1 = __importDefault(require("react"));
const utils_1 = require("./utils");
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
    const [futurePresentation, setFuturePresentation] = react_1.default.useState('');
    const onChange = react_1.default.useCallback((e) => {
        inputRef.current = e.target;
        cursorPos.current = inputRef.current.selectionEnd || 0;
        const inputValue = inputRef.current.value;
        // This is going to be the new original value (unmasked)
        const newValue = inputValue.replace(utils_1.makeSearchMaskRegExp(cursorPos.current, mask), (match, _, offset) => {
            if (!offset && cursorPos.current) {
                return value.substr(0, match.length);
            }
            return value.substr(-match.length);
        });
        let newPresentantion = '';
        // Mask the value leaving the last character entered intact
        if (mode === 'persymbol') {
            newPresentantion = inputValue.split('').map((c, index) => (index === cursorPos.current - 1 ? c : mask)).join('');
        }
        else {
            // Keep entered value as is until timer hides everything
            newPresentantion = inputValue;
        }
        setValue(newValue);
        setPresentation(newPresentantion);
        setFuturePresentation(new Array(inputValue.length + 1).join(mask));
        if (typeof handleChange === 'function') {
            handleChange(newValue, e);
        }
        return newValue;
    }, [timer, delay, mask, presentation, value, cursorPos]);
    // Restore cursor position once presentation has changed
    react_1.default.useEffect(() => {
        var _a;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.setSelectionRange(cursorPos.current, cursorPos.current);
    }, [presentation, inputRef, cursorPos]);
    // Set futurePresentation as presentation after the timeout
    react_1.default.useEffect(() => {
        if (presentation !== futurePresentation && futurePresentation) {
            clearTimeout(timer.current);
            timer.current = setTimeout(() => setPresentation(futurePresentation), delay);
        }
        return () => clearTimeout(timer.current);
    }, [timer, presentation, futurePresentation, delay]);
    return [value, presentation, onChange];
};
//# sourceMappingURL=index.js.map