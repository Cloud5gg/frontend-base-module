export interface IModule {
    load?(): void;
    unload?(): void;
}