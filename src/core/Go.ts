export enum Piece {
    WHITE = "WHITE",
    BLACK = "BLACK",
    NULL = "NULL",
}

export interface GameInfo {
    size: number;
}

export class Go {
    info: GameInfo;
    board: Piece[][];
    history: Piece[][][];
    currentStep: number;
    currentPlayer: Piece.BLACK | Piece.WHITE;

    constructor() {
        this.info = {
            size: 19,
        };
        this.board = this.createBoard();
        this.history = [this.board];
        this.currentStep = 0;
        this.currentPlayer = Piece.BLACK;
    }

    play(x: number, y: number) {
        if (!this.validateMove(x, y)) {
            console.info("move is not valid...");
            return;
        }

        this.placeStone(x, y, this.currentPlayer);

        const opponentGroups = this.getOpponentGroups(x, y);

        console.info(opponentGroups);

        this.removeOpponentDeadStones(opponentGroups);

        if (this.isSuicide(x, y)) {
            console.info("You Cannot Suicide");
            this.removeStone(x, y);
            return;
        }

        this.pushHistory();
        this.toNextPlayer();
    }

    private validateMove(x: number, y: number): boolean {
        if (this.isOccupied(x, y)) {
            return false;
        }

        if (this.checkIsKo(x, y)) {
            return false;
        }

        return true;
    }

    private removeOpponentDeadStones(groups: [number, number][][]) {
        groups.forEach((group) => {
            if (this.getLiberties(group).length === 0) {
                group.forEach((_) => this.removeStone(..._));
            }
        });
    }

    private getOpponentGroups(x: number, y: number) {
        const opponent = this.getOpponent();
        const groups: [number, number][][] = [];
        const neighbors = this.getNeighbors(x, y);

        neighbors.forEach(({ x, y, piece }) => {
            if (piece === opponent) {
                const group = this.getGroup(x, y);
                const filtered = group.filter((_) => _[0] === x && _[1] === y);
                groups.push(filtered);
            }
        });

        return groups;
    }

    private isSuicide(x: number, y: number) {
        const group = this.getGroup(x, y);
        const liberties = this.getLiberties(group);

        return liberties.length === 0;
    }

    private isOccupied(x: number, y: number) {
        return this.board[x][y] !== Piece.NULL;
    }

    private getGroup(x: number, y: number): [number, number][] {
        const visited: Set<string> = new Set();
        const pending: [number, number][] = [[x, y]];
        const color = this.currentPlayer;

        while (pending.length > 0) {
            const cord = pending.pop();
            if (!cord) {
                break;
            }
            const stringifiedCord = `[${cord}]`;
            if (visited.has(stringifiedCord)) {
                continue;
            }
            visited.add(stringifiedCord);
            const neighbors = this.getNeighbors(...cord);

            neighbors.forEach(({ x, y, piece }) => {
                if (piece === color) {
                    console.info("match", color);
                    pending.push([x, y]);
                }
            });
        }

        return Array.from(visited).map((key) => JSON.parse(key));
    }

    private getLiberties(stones: [number, number][]) {
        const liberties: [number, number][] = [];
        const _stones = [...stones];

        while (_stones.length > 0) {
            const stone = _stones.pop()!;
            const neighbors = this.getNeighbors(...stone);
            neighbors.forEach(({ x, y, piece }) => {
                if (piece === Piece.NULL) {
                    liberties.push([x, y]);
                }
            });
        }

        return liberties;
    }

    private getNeighbors(x: number, y: number) {
        const coord = [
            [0, -1],
            [-1, 0],
            [1, 0],
            [0, 1],
        ];

        return coord.map(([deltaX, deltaY]) => {
            const _x = x + deltaX;
            const _y = y + deltaY;
            const piece = this.board[_x]?.[_y];
            return {
                x: _x,
                y: _y,
                piece,
            };
        });
    }

    // TODO/Jamyth KO Logic
    private checkIsKo(x: number, y: number): boolean {
        return false;
    }

    private pushHistory() {
        this.history.push(this.board);
        this.currentStep++;
    }

    private placeStone(x: number, y: number, color: Piece.BLACK | Piece.WHITE) {
        let board = JSON.parse(JSON.stringify(this.board));
        board[x][y] = color;
        this.board = board;
    }

    private removeStone(x: number, y: number) {
        let board = JSON.parse(JSON.stringify(this.board));
        board[x][y] = Piece.NULL;
        this.board = board;
    }

    private toNextPlayer() {
        if (this.currentPlayer === Piece.BLACK) {
            this.currentPlayer = Piece.WHITE;
        } else {
            this.currentPlayer = Piece.BLACK;
        }
    }

    private createBoard() {
        const board: Piece[][] = [];
        for (let i = 0; i < this.info.size; i++) {
            const row: Piece[] = [];
            for (let j = 0; j < this.info.size; j++) {
                row.push(Piece.NULL);
            }
            board.push(row);
        }
        return board;
    }

    private getOpponent() {
        return this.currentPlayer === Piece.BLACK ? Piece.WHITE : Piece.BLACK;
    }
}
