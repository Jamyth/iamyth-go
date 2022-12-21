import { Module, register } from "react-shiba";
import { Main } from "./Main";
import { Go } from "core/Go";
import type { State, Path } from "./type";

const initialState: State = {
    game: null,
};

class MainModule extends Module<Path, State> {
    override onEnter() {
        // TODO
        this.setState({
            game: new Go(),
        });
    }
}

const mainModule = register(new MainModule(null, initialState));
export const useState = mainModule.getState();
export const actions = mainModule.getActions();
export const MainComponent = mainModule.attachLifecycle(Main);
