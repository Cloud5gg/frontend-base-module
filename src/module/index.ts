import { IModule } from './imodule';
import { log } from 'alt-client';

/**
 * @author Sebastian Waldbauer <OskarSniper>
 * @since 1.0.0
 * @version 1.0.0
 */
export * from './imodule';

export class Module implements IModule {
    private _events: Map<string, Array<Function>>;
    constructor() {
        this._events = new Map<string, Array<Function>>();

        this.on('m:load', () => {
            this.load();
        });

        this.on('m:unload', () => {
            this.unload();
        });
    }

    on(event: string, cb: Function): void {
        if(this._events.has(event)) {
            (<Function[]>this._events.get(event)).push(cb);
        } else {
            this._events.set(event, [cb]);
        }
    }

    emit(event: string, ...data: any): void {
        if(this._events.has(event)) {
            (<Function[]>this._events.get(event)).forEach((f) => {
                f(...data);
            });
        }
    }

    load(): void {
        log('basic loading algorythm');
    }

    unload(): void {
        log('basic unloading algorythm');
    }
}