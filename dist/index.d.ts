import React from 'react';
declare type HTMLTextInputElement = HTMLInputElement | HTMLTextAreaElement;
declare type NextValueString = string & {
    kind: 'nextValue';
};
declare type Props<T extends HTMLTextInputElement> = {
    readonly mask?: string;
    readonly delay?: number;
    readonly handleChange?: (e: React.ChangeEvent<T>) => void;
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
