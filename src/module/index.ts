import { IModule } from './imodule';
import { log, clearInterval, clearTimeout, clearEveryTick, setInterval, setTimeout, everyTick } from 'alt-client';

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

        this.on('load', () => {
            this.load();
        });

        this.on('unload', () => {
            this.clearAll();
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

    emit(event: string, data?: any[]): void {
        if(this._events.has(event)) {
            (<Function[]>this._events.get(event)).forEach((f) => {
                f(data);
            });
        }
    }

    clearAll(): void {
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

    setInterval(fn: any, time: number): number {
        let id: number = setInterval(fn, time);
        this._intervals.push(id);
        return id;
    }

    setTimeout(fn: any, time: number): void {
        let id: number = setTimeout(() => {
            fn();
            let i: number = this._timeouts.indexOf(id);
            if(i > -1) {
                this._timeouts.splice(i, 1);
            }
            clearTimeout(id);
        }, time);
        this._timeouts.push(id);
    }

    setEveryTick(fn: any): void {
        let id: number = everyTick(() => {
            fn();
        });
        this._ticks.push(id);
    }

    load(): void {
        this._intervals = [];
        this._timeouts = [];
        this._ticks = [];

        this.emit('loaded');
    }

    unload(): void {
        this.emit('unloaded');
    }
}