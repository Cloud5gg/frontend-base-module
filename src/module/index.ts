/**
 * @author Sebastian Waldbauer <OskarSniper>
 * @since 1.0.0
 * @version 1.0.0
 */
export class Module {
    private _events: Map<string, Array<Function>>;
    constructor() {
        this._events = new Map<string, Array<Function>>();
    }

    on(event: string, cb: any): void {
        if(this._events.has(event)) {
            this._events.get(event)?.push(cb);
        } else {
            this._events.set(event, [cb]);
        }
    }

    emit(event: string, ...data: any): void {
        if(this._events.has(event)) {
            this._events.get(event)?.forEach((func) => {
                func(...data);
            });
        }
    }
}