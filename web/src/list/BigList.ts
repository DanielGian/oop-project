import { BigListInterface } from "./BigListInterface";
import { ArtistList } from "./ArtistList";

export class BigList implements BigListInterface {
    state: {
        size: number;
        data: ArtistList[];
    };
    constructor() {
        this.state = {
            size: 0,
            data: []
        };
    }
    add(artist) {
        this.state.size++;
        this.state.data.push(artist);
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

    save() {
        //send post to db
    }
}
