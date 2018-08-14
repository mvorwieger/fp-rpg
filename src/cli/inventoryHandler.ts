import {PlayerState} from '../Player'
import {Item} from '../Item'

export const inventoryHandler = (player: PlayerState): PlayerState => {
    const inventoryItems = player.inventory.items
    if (!inventoryItems.length) {
        console.log('nothing')
    } else {
        console.log('Inventory\n')
        console.log('Index\tName\tValue\tattackDamage\tblockPercentage')
        inventoryItems.forEach((item: Item, index: number) => {
            console.log(`${index}\t${item.name}\t${item.value}\t${ifAttackItemGetAttackDamage(item)}\t${ifDefenceItemGetBlockPercentage(item)}`)
        })
    }
    return player
}

const ifAttackItemGetAttackDamage = (item: any) => item.attackDamage ? item.attackDamage : ' '
const ifDefenceItemGetBlockPercentage = (item: any) => item.blockPercentage ? item.attackDamage : ' '