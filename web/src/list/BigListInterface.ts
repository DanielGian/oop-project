import { ArtistList } from "./ArtistList";

export interface BigListInterface {
    state: {
        size: number;
        data: ArtistList[];
    };
    add(artist: ArtistList): void;
    remove(index: number): void;
    cancel(): void;
    save(): void;
}
