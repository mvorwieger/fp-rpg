import {addItemToInventory, initInventory, Inventory, removeItemFromInventoryByName} from './Inventory'
import {AttackItem, DefenceItem, initAttackItem, initDefenceItem, initItem, Item} from './Item'
import {Reward} from './Level'
import {initDefaultRoom, Room, removeItemFromRoom} from './Room'
import {Unit} from './UnitFactory'

export interface PlayerState extends Unit {
    level: PlayerLevel,
    inventory: Inventory,
    cash: number,
    inRoom: Room
}

export interface PlayerLevel {
    level: number,
    progress: number
}

export const initPLayer = (health: number, 
                           level: PlayerLevel, 
                           name: string,
                           weapon: AttackItem,
                           shield: DefenceItem,
                           inventory: Inventory,
                           cash: number,
                           inRoom: Room = initDefaultRoom()): PlayerState => ({
    health,
    name,
    level,
    weapon,
    shield,
    inventory,
    cash,
    inRoom
})

export const initDefaultPlayer = (): PlayerState => ({
    health: 100,
    name: 'Default Player',
    level: {
        level: 1,
        progress: 0
    },
    weapon: initAttackItem('Wooden Sword', 0, 5),
    shield: initDefenceItem('Wooden Shield', 0, 5),
    inventory: initInventory([initItem('Perl', 5000), initItem('oPerl', 5000)]),
    cash: 0,
    inRoom: initDefaultRoom()
})


export const pickUpItem = (player: PlayerState, item: Item): PlayerState => ({
    ...player,
    inventory: addItemToInventory(player.inventory, item),
    inRoom: removeItemFromRoom(item, player.inRoom)
})

export const throwAwayItem = (player: PlayerState, name: string): PlayerState => ({
    ...player,
    inventory: removeItemFromInventoryByName(player.inventory, name)
})

export const collectLevelRewards = (player: PlayerState, levelReward: Reward): PlayerState => ({
    ...player,
    level: calcPlayerLevel(player.level, levelReward),
    inventory: {
        items: levelReward.loot ? [...player.inventory.items, ...levelReward.loot] : player.inventory.items
    },
    cash: player.cash + levelReward.cash
})

export const goToRoom = (player: PlayerState, room: Room): PlayerState => ({
    ...player,
    inRoom: room
})

export const updateRoomReferences = (player: PlayerState): PlayerState => ({
    ...player,
    inRoom: {
        ...player.inRoom,
        roomsNearby: player.inRoom.roomsNearby.map((refRoom: Room) => ({
            ...refRoom,
            roomsNearby: refRoom.roomsNearby.map((innerRefRoom: Room) =>
                innerRefRoom.name === player.inRoom.name ? player.inRoom : innerRefRoom
            )
        }))
    }
})

const calcPlayerLevel = (playerLevel: PlayerLevel, levelReward: Reward): PlayerLevel => {
    let newLevelVal: number = playerLevel.level
    const combinedExp = levelReward.experience + playerLevel.progress
    let newExperienceVal: number = combinedExp

    if (combinedExp >= 100) {
        const levelGain = Math.trunc(combinedExp / 100)
        newLevelVal += levelGain
        newExperienceVal -= levelGain * 100
    }

    return {
        ...playerLevel,
        level: newLevelVal,
        progress: newExperienceVal
    }
}
