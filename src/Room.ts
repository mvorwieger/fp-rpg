import {initItem, Item} from './Item'
import {initLevel, Level, Reward} from './Level'
import {createUnitForPlayerLevel} from './UnitFactory'

export interface Room {
    levels: Level[],
    items: Item[],
    name: string,
    roomsNearby: Room[]
}

export const initRoom = (name: string, roomsNearby: Room[] = [], levels: Level[] = [], items: Item[] = []): Room => ({
    name,
    roomsNearby,
    levels,
    items
})

export const initDefaultRoom = (): Room => {
    let roomOne: Room = initRoom(
        'Room_1',
        [],
        [initLevel(createUnitForPlayerLevel(1), <Reward>{experience: 50, cash: 50})],
        [initItem("Perl", 5000)]
    )

    let roomTwo: Room = initRoom("roomTwo") ;

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
    let currRoom: Room = {...currentRoom}
    let newRoom: Room = initRoom(
        'r' + roomCounter,
        [],
        [initLevel(createUnitForPlayerLevel(playerLevel), <Reward>{experience: 50, cash: 50})]
    );
    roomCounter++

    newRoom.roomsNearby = [currRoom]
    currRoom.roomsNearby = [...currRoom.roomsNearby, newRoom]
    return currRoom
}
