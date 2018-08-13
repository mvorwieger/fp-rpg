import {PlayerState} from '../Player'

export const characterHandler = (player: PlayerState): PlayerState => {
    console.dir(player, {depth: null})
    return player
}