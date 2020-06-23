export interface IModule {
    constructor(): void;
    load(): void;
    unload(): void;
}