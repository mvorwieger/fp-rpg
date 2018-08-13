import {Item} from './Item'
import {initLevel, Level, Reward} from './Level'
import {createUnitForPlayerLevel} from './UnitFactory'

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
        name: 'Room_1'
    }

    let roomTwo: Room = {
        name: 'Room_2'
    }

    roomTwo.roomsNearby = [roomOne]
    roomOne.roomsNearby = [roomTwo]

    return roomOne
}


