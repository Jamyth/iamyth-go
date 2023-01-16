import React from "react";
import { Board } from "./Board";
import { InteractableBoard } from "./InteractableBoard";
import type { Piece } from "core/Go";
import "./index.less";

export interface Props {
    board: Piece[][];
    gameSize: number;
    onPlay: (x: number, y: number) => void;
    size?: number;
}

const PADDING = 30;
const BOARD_INNER_PADDING = 15;

export const GoBoard = React.memo(({ board, onPlay, size, gameSize }: Props) => {
    const boardSize = React.useMemo(() => size ?? window.innerWidth - PADDING, [size]);
    const pieceSize = React.useMemo(
        () => Math.floor((boardSize - BOARD_INNER_PADDING) / gameSize),
        [boardSize, gameSize],
    );

    const containerStyle: React.CSSProperties = {
        width: `${boardSize}px`,
        height: `${boardSize}px`,
    };

    return (
        <div className="board-container" style={containerStyle}>
            <Board size={boardSize} gameSize={gameSize} innerPadding={BOARD_INNER_PADDING} pieceSize={pieceSize} />
            <InteractableBoard
                board={board}
                size={boardSize}
                pieceSize={pieceSize}
                onPlay={onPlay}
                innerPadding={BOARD_INNER_PADDING}
            />
        </div>
    );
});
