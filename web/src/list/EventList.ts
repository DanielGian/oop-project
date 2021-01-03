import { EventInterface } from "./EventListInterface";
import { Event } from "./Event";
export class EventList implements EventInterface {

    state: {
        size: number;
        data: Event[];
    };
    constructor() {
        this.state = {
            size: 0,
            data: [],
        };
    }
    add(event) {
        this.state.size++;
        this.state.data.push(event);
    }
    changeDay(index, date) {
        this.state.data[index].day == date;
    }
    remove(index) {
        this.state.size--;
        this.state.data.splice(index, 1);
    }
    get() {
        return this.state.data;
    }
    view(index) {
        return this.state.data[index];
    }
    cancel() {
        this.state.size = 0;
        this.state.data = [];
    }

}
