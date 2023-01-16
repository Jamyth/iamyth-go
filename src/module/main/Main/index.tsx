import React from "react";
import { useMainState } from "../hooks";
import { Piece } from "core/Go";
import { actions } from "../index";
import { GoBoard } from "component/GoBoard";
import "./index.less";

export const Main = React.memo(() => {
    const game = useMainState((state) => state.game);

    return <GoBoard board={game?.board ?? []} gameSize={game?.gameSize ?? 19} onPlay={actions.play} />;
});
