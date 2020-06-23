import { on, log, emit } from "alt-client";
import { Module } from "./module";

export * from './module';
export function InitModule(mod: Module, deps?: Array<string>) {
    on('connectionComplete', () => {
        emit('rp:mod:init', [mod.constructor.name, deps]);
        on(`rp:mod:${mod.constructor.name}:load`, () => {
            mod.emit(`m:load`);
        });
        on(`rp:mod:${mod.constructor.name}:unload`, () => {
            mod.emit(`m:unload`);
        });
    });
}