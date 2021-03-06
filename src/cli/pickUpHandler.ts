import {pickUpItem, PlayerState, updateRoomReferences} from '../Player'
import {Item} from '../Item'

export const pickUpHandler = (player: PlayerState, itemName: string): PlayerState => {
    let desiredItem: Item | undefined

    if(player.inRoom.items) {
        desiredItem = player.inRoom.items.find(item => item.name.toLowerCase() === itemName.toLowerCase())
    }

    if(!desiredItem) {
        console.log(`Item with name ${itemName} doesnt exist in this Room(${player.inRoom.name})`)
        return player
    }

    console.log(`You've picked up ${desiredItem.name}`)
    return updateRoomReferences(pickUpItem(player, desiredItem))
}
