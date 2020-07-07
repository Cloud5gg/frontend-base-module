import { IModule } from './imodule';
import { log, clearInterval, clearTimeout, clearEveryTick } from 'alt-client';

export * from './imodule';

/**
 * Module system
 * Module system for handling new modules & clear them correctly
 * @author Sebastian Waldbauer <OskarSniper>
 * @since 1.0.0
 * @version 1.0.0
 */
export class Module implements IModule {
    private _events: Map<string, Array<Function>>;
    private _intervals: Array<number>;
    private _timeouts: Array<number>;
    private _ticks: Array<number>;

    constructor() {
        this._events = new Map<string, Array<Function>>();
        this._intervals = [];
        this._timeouts = [];
        this._ticks = [];

        this.on('m:load', () => {
            this.load();
        });

        this.on('m:unload', () => {
            this.unload();
            this.clearAll();
        });
    }

    on(event: string, cb: Function): void {
        if(this._events.has(event)) {
            (<Function[]>this._events.get(event)).push(cb);
        } else {
            this._events.set(event, [cb]);
        }
    }

    emit(event: string, data?: any[]): void {
        if(this._events.has(event)) {
            (<Function[]>this._events.get(event)).forEach((f) => {
                f(data);
            });
        }
    }

    clearAll(): void{
        this._intervals.forEach((x: number) => {
            clearInterval(x);
        });

        this._timeouts.forEach((x: number) => {
            clearTimeout(x);
        });

        this._ticks.forEach((x: number) => {
            clearEveryTick(x);
        });
    }

    load(): void {
        this._intervals = [];
        this._timeouts = [];
    }

    unload(): void {
    }
}