import { Module, register } from "react-shiba";
import { Main } from "./Main";
import { Go } from "core/Go";
import { MainUtil } from "./MainUtil";
import { ObjectUtil } from "@iamyth/util";
import type { State, Path } from "./type";

const initialState: State = {
    game: null,
};

class MainModule extends Module<Path, State> {
    game: Go | undefined;

    override onEnter() {
        // TODO
        this.createGame();
        this.setState({
            game: {
                ...MainUtil.getInfo(this.game!),
            },
        });
    }

    play(x: number, y: number) {
        this.game?.play(x, y);
        this.setState((state) => {
            ObjectUtil.safeAssign(state.game, { ...MainUtil.getInfo(this.game!) });
        });
    }

    private createGame() {
        this.game = new Go();
    }
}

const mainModule = register(new MainModule(null, initialState));
export const useState = mainModule.getState();
export const actions = mainModule.getActions();
export const MainComponent = mainModule.attachLifecycle(Main);
