import React from "react";

export interface Props {
    size: number;
    gameSize: number;
    innerPadding: number;
    pieceSize: number;
}

function drawBackground(context: CanvasRenderingContext2D) {
    context.fillStyle = "#F1C688";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

function drawLines(context: CanvasRenderingContext2D, lines: number, pieceSize: number, innerPadding: number) {
    context.fillStyle = "#000000";
    context.beginPath();
    const startPosition = Math.floor(innerPadding + pieceSize / 2);
    const endPosition = startPosition + pieceSize * (lines - 1);

    let variant = startPosition;
    for (let i = 0; i < lines; i++) {
        context.moveTo(startPosition, variant);
        context.lineTo(endPosition, variant);
        context.moveTo(variant, startPosition);
        context.lineTo(variant, endPosition);
        variant += pieceSize;
    }
    context.stroke();
}

function drawStars(context: CanvasRenderingContext2D, boardSize: number, pieceSize: number, innerPadding: number) {
    context.fillStyle = "#000000";
    context.beginPath();
    const starRadius = 4;
    const startPosition = Math.floor(innerPadding + pieceSize / 2);
    const endPosition = startPosition;

    const left = pieceSize * 3;
    const middle = (pieceSize * (boardSize - 1)) / 2;
    const right = pieceSize * (boardSize - 4);
    const starsPoints = [left, middle, right];

    starsPoints.forEach((_) => {
        context.moveTo(startPosition + starsPoints[0], endPosition + _);
        context.arc(startPosition + starsPoints[0], endPosition + _, starRadius, 0, Math.PI * 2, true);
        context.arc(startPosition + starsPoints[1], endPosition + _, starRadius, 0, Math.PI * 2, true);
        context.arc(startPosition + starsPoints[2], endPosition + _, starRadius, 0, Math.PI * 2, true);
    });

    context.fill();
}

export const Board = React.memo(({ size, gameSize, innerPadding, pieceSize }: Props) => {
    const ref = React.useRef<HTMLCanvasElement | null>(null);
    const draw = React.useCallback((context: CanvasRenderingContext2D) => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        drawBackground(context);
        drawLines(context, gameSize, pieceSize, innerPadding);
        drawStars(context, gameSize, pieceSize, innerPadding);
    }, []);

    React.useEffect(() => {
        const canvas = ref.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            ctx && draw(ctx);
        }
    }, []);

    return <canvas ref={ref} width={size} height={size} />;
});
