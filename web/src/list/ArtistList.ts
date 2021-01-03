import { ListInterface } from "./ListInterface";
import { Artist } from "./Artist";
export class ArtistList implements ListInterface {
  state: {
    size: number;
    data: Artist[];
    title: string;
  };
  constructor() {
    this.state = {
      size: 0,
      data: [],
      title: ""
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
  setTitle(name) {
    this.state.title = name;
  }
  getTitle() {
    return this.state.title;
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
