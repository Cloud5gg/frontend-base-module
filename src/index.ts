import { on, log } from "alt-client";

on('connectionComplete', () => {
    log('New Module loaded!');
});