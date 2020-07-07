import { on, log, emit } from "alt-client";
import { Module } from "./module";

export * from './module';
export function InitModule(mod: Module, deps?: Array<string>) {
    on('connectionComplete', () => {
        emit('mod:init', [mod.constructor.name.toLowerCase(), 'abc123', deps]);

        on(`mod:${mod.constructor.name.toLowerCase()}:load`, () => {
            mod.emit(`m:load`);

            emit(`mod:${mod.constructor.name.toLowerCase()}:loaded`);
        });

        on(`mod:${mod.constructor.name.toLowerCase()}:unload`, () => {
            mod.emit(`m:unload`);

            emit(`mod:${mod.constructor.name.toLowerCase()}:unloaded`);
        });
    });
}