import React from "react";
import { usePrevious } from "@iamyth/util/react";
import { Piece } from "core/Go";

export interface Props {
    board: Piece[][];
    size: number;
    pieceSize: number;
    innerPadding: number;
    onPlay: (x: number, y: number) => void;
}

function drawPiece(
    context: CanvasRenderingContext2D,
    board: Piece[][],
    prevBoard: Piece[][],
    pieceSize: number,
    innerPadding: number,
) {
    context.imageSmoothingEnabled = true;
    const halfSize = pieceSize / 2;
    const startPositionX = innerPadding + halfSize;
    const startPositionY = innerPadding + halfSize;
    board.forEach((row, x) => {
        row.forEach((piece, y) => {
            const positionX = startPositionX + pieceSize * x;
            const positionY = startPositionY + pieceSize * y;
            if (prevBoard?.[x]?.[y] !== piece) {
                context.clearRect(positionX - halfSize, positionY - halfSize, pieceSize, pieceSize);
            }

            switch (piece) {
                case Piece.NULL:
                    return;
                case Piece.BLACK:
                    context.fillStyle = "#000";
                    break;
                case Piece.WHITE:
                    context.fillStyle = "#ffffff";
                    break;
            }

            context.beginPath();
            context.arc(positionX, positionY, halfSize - 1, 0, Math.PI * 2);
            context.closePath();
            context.fill();
        });
    });
}

export const InteractableBoard = React.memo(({ board, size, pieceSize, innerPadding, onPlay }: Props) => {
    const ref = React.useRef<HTMLCanvasElement | null>(null);
    const prevBoard = usePrevious(board);

    const onBoardClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const client = e.currentTarget.getBoundingClientRect();
        const isOnBoard = () => {
            return e.clientX > 15 && e.clientX < client.width - 15 && e.clientY > 15 && e.clientY < client.height - 15;
        };
        if (!isOnBoard()) {
            return;
        }
        const offset = pieceSize / 2;
        const x = Math.floor((e.clientX - offset) / pieceSize);
        const y = Math.floor((e.clientY - offset) / pieceSize);

        onPlay(x, y);
    };

    React.useEffect(() => {
        const context = ref.current?.getContext("2d");
        if (!context) {
            return;
        }
        drawPiece(context, board, prevBoard, pieceSize, innerPadding);
    }, [board]);

    return <canvas ref={ref} width={size} height={size} onClick={onBoardClick} />;
});
