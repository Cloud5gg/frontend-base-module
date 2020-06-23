import { on, log, emit } from "alt-client";
import { Module } from "./module";

export * from './module';
export function InitModule(mod: Module) {
    on('connectionComplete', () => {
        emit('rp:mod:init', [mod.constructor.name]);
        on(`rp:mod:${mod.constructor.name}:load`, (ok: boolean) => {
            if(ok) {
                mod.emit(`m:load`);
            }
        });
        on(`rp:mod:${mod.constructor.name}:unload`, () => {
            mod.emit(`m:unload`);
        });
    });
}