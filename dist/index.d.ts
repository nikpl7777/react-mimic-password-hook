import React from 'react';
declare type HTMLTextInputElement = HTMLInputElement | HTMLTextAreaElement;
export declare type UseMimicPasswordProps<T extends HTMLTextInputElement> = {
    readonly mask?: string;
    readonly delay?: number;
    readonly handleChange?: (e: React.ChangeEvent<T>) => void;
    readonly mode?: 'persymbol' | 'delayed';
};
export declare type UseMimicReturn<T extends HTMLTextInputElement> = [
    string,
    string,
    (e: React.ChangeEvent<T>) => void
];
export declare const useMimicPassword: <T extends HTMLTextInputElement>(props?: UseMimicPasswordProps<T> | undefined) => UseMimicReturn<T>;
export {};