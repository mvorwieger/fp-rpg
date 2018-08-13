import {PlayerState} from '../Player'

export const pickUpHandler = (player: PlayerState, itemName: string): PlayerState => {
    console.log(`your are trying to pick up ${itemName}`)
    return player
}