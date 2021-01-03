import { Artist } from "./Artist";

export interface ListInterface {
  state: {
    size: number;
    data: Artist[];
  };
  add(artist: Artist): void;
  remove(index: number): void;
  cancel(): void;
  save(): void;
}
