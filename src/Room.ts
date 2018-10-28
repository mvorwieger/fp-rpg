import {initItem, Item} from './Item'
import {initLevel, Level, Reward} from './Level'
import {createUnitForPlayerLevel} from './UnitFactory'
import {PlayerState} from './Player'

export interface Room {
    levels?: Level[],
    items?: Item[],
    name: string,
    roomsNearby?: Room[]
}

export const initRoom = (name: string, roomsNearby: Room[], levels?: Level[], items?: Item[]): Room => ({
    levels,
    items,
    roomsNearby,
    name
})

export const initDefaultRoom = (): Room => {
    let roomOne: Room = {
        levels: [initLevel(createUnitForPlayerLevel(1), <Reward>{experience: 50, cash: 50})],
        name: 'Room_1',
        items: [initItem("Perl", 5000)]
    }

    let roomTwo: Room = {
        name: 'Room_2'
    }

    roomTwo.roomsNearby = [roomOne]
    roomOne.roomsNearby = [roomTwo]

    return roomOne
}

export const removeItemFromRoom = (item: Item, room: Room): Room => ({
    ...room,
    items: room.items.filter((roomItem: Item) => roomItem.name != item.name) 
})

let roomCounter = 0

export const spawnRandomRoom = (playerLevel: number, currentRoom: Room): Room => {
    let currRoom = {...currentRoom}
    let newRoom: Room = {
        levels: [initLevel(createUnitForPlayerLevel(playerLevel), <Reward>{experience: 50, cash: 50})],
        name: 'r' + roomCounter
    }
    roomCounter++

    newRoom.roomsNearby = [currRoom]
    currRoom.roomsNearby = [...currRoom.roomsNearby, newRoom]
    return currRoom
}
