import {PlayerState} from '../Player'
import {Item} from '../Item'

export const throwAwayHandler = (player: PlayerState, itemNameOrIndex: string): PlayerState => {
    let itemsAfterThrowAway: Item[]
    const desiredItemToThrowAwayByName = player.inventory.items.find(item => item.name.toLowerCase() == itemNameOrIndex.toLowerCase())
    const desiredItemToThrowAwayByIndex = player.inventory.items.find((item: Item, index: number) => index === parseInt(itemNameOrIndex))

    if (desiredItemToThrowAwayByName) {
        itemsAfterThrowAway = player.inventory.items.filter(item => item.name.toLowerCase() != desiredItemToThrowAwayByName.name.toLowerCase())
        console.log(`You threw away ${desiredItemToThrowAwayByName.name}`)
    }

    if (desiredItemToThrowAwayByIndex) {
        const desiredIndex = parseInt(itemNameOrIndex)
        itemsAfterThrowAway = player.inventory.items.filter((item: Item, index: number) => index !== desiredIndex)
        console.log('You threw away Item at Index: ' + desiredIndex)
    }

    return {
        ...player,
        inventory: {
            items: itemsAfterThrowAway
        }
    }
}