import React from "react";
import { useMainState } from "../hooks";
import { useForceUpdate } from "@iamyth/util/react";
import "./index.less";
import { Piece } from "core/Go";

export const Main = React.memo(() => {
    const game = useMainState((state) => state.game);
    const forceUpdate = useForceUpdate();

    const placeStone = () => {
        const x = Math.floor(Math.random() * 19);
        const y = Math.floor(Math.random() * 19);
        game?.placeStone(x, y, Piece.BLACK);
        forceUpdate();
    };

    React.useEffect(() => {
        if (!game) {
            return;
        }
        placeStone();
        console.info(game.board);
    }, [game]);

    return (
        <div onClick={placeStone}>
            {game?.board.map((row, index) => {
                return (
                    <div key={index}>
                        {row.map((_, j) => (
                            <span key={j}>{_ === Piece.NULL ? "0" : Piece.BLACK ? "B" : "W"}</span>
                        ))}
                    </div>
                );
            })}
        </div>
    );
});
