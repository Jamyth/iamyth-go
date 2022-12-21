export enum Piece {
    WHITE = "WHITE",
    BLACK = "BLACK",
    NULL = "NULL",
}

export class Go {
    board: Piece[][];

    constructor() {
        this.board = this.createBoard();
    }

    placeStone(x: number, y: number, color: Piece.BLACK | Piece.WHITE) {
        this.board[x][y] = color;
    }

    private createBoard() {
        const board: Piece[][] = [];
        for (let i = 0; i < 19; i++) {
            const row: Piece[] = [];
            for (let j = 0; j < 19; j++) {
                row.push(Piece.NULL);
            }
            board.push(row);
        }
        return board;
    }
}
