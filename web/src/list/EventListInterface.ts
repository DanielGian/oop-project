import { Event } from "./Event";

export interface EventInterface {
    state: {
        size: number;
        data: Event[];
    };
    add(event: Event): void;
    remove(index: number): void;
    cancel(): void;
}
