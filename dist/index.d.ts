import React from 'react';
declare type HTMLTextInputElement = HTMLInputElement | HTMLTextAreaElement;
declare type NextValueString = string & {
    kind: 'nextValue';
};
declare type Props<T extends HTMLTextInputElement> = {
    /** Masking symbol. **'•'** by default */
    readonly mask?: string;
    /** Delay while entered symbol is visible in miliseconds. **1000** by default */
    readonly delay?: number;
    /** Custom onChange handler. Accepts two arguments: real input value and the original event. */
    readonly handleChange?: (newValue: string, e: React.ChangeEvent<T>) => void;
    /** Mode. `persymbol`: only last symbol to be visible. `delayed`: input is only hidden after time elapsed. */
    readonly mode?: 'persymbol' | 'delayed';
};
export declare type UseMimicPasswordProps<T extends HTMLTextInputElement> = Props<T>;
export declare type UseMimicReturn<T extends HTMLTextInputElement> = [
    string,
    string,
    (e: React.ChangeEvent<T>) => NextValueString
];
export declare const useMimicPassword: <T extends HTMLTextInputElement>(props?: Props<T> | undefined) => UseMimicReturn<T>;
export {};
