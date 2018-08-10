import {initDefaultPlayer, PlayerState} from './Player'

export class GlobalPlayerState {
    private static instance: GlobalPlayerState
    private player: PlayerState = initDefaultPlayer()
    private constructor() {}
    public static getInstance() {
        if(!GlobalPlayerState.instance) {
            GlobalPlayerState.instance = new GlobalPlayerState()
        }
        return GlobalPlayerState.instance
    }

    get() {
        return this.player
    }

    set(player: PlayerState) {
        this.player = player
    }
}