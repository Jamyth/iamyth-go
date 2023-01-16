import { Go } from "../../src/core/Go";
import * as assert from "assert/strict";

describe("Go Game can play", () => {
    const game = new Go();
    game.play(0, 0);

    assert.strictEqual(game.board[0][0], "BLACK");
});
