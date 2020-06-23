import { on, log, emit } from "alt-client";
import { Module } from "./module";

export function InitModule(name: string, mod: Module) {
    on('connectionComplete', () => {
        emit('rp:module:init', [name]);
        on(`rp:module:${name}:load`, (ok) => {
            if(ok) {
                mod.emit(`m:load`);
            }
        });
    });
}