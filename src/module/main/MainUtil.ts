import type { Go } from "core/Go";
import type { Game } from "./type";

function getInfo(controller: Go): Omit<Game, "controller"> {
    return {
        board: controller.board,
        gameSize: controller.info.size,
        currentPlayer: controller.currentPlayer,
    };
}

export const MainUtil = Object.freeze({
    getInfo,
});
