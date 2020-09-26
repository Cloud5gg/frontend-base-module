import { on, log, emit } from "alt-client";
import { Module } from "./module";

export * from './module';
export function InitModule(mod: Module, deps?: Array<string>) {
    const name: string = mod.constructor.name.toLowerCase();
    on('connectionComplete', () => {
        emit('mod:init', [name, 'abc123', deps]);

        on(`mod:${name}:load`, () => {
            mod.emit('load');
            mod.on('loaded', () => {
                emit(`mod:${name}:loaded`);
            });
        });

        on(`mod:${name}:unload`, () => {
            mod.emit('unload');

            mod.on('unloaded', () => {
                emit(`mod:${name}:unloaded`);
            });
        });

        on(`mod:${name}:data`, (callback_event, obj) => {
            mod.emit('receive', [callback_event, obj]);
        });

        mod.on('send', (dest: string, obj: any) => {
            // structure is   src   dest  data
            emit(`mod:data`, [name, dest, obj]);
        });
    });
}