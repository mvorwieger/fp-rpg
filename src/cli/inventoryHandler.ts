import {PlayerState} from '../Player'

export const inventoryHandler = (player: PlayerState): PlayerState => {
    const inventoryItems = player.inventory.items
    if(!inventoryItems.length) {console.log('nothing')}
    inventoryItems.forEach(console.log)
    return player
}