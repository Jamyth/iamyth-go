import type { Go, Piece } from "core/Go";

export type Path = never;

export interface State {
    game: Game | null;
}

export interface Game {
    board: Piece[][];
    gameSize: number;
    currentPlayer: Go["currentPlayer"];
}
