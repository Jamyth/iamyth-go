import type { Go } from "core/Go";

export type Path = never;

export interface State {
    game: Go | null;
}
