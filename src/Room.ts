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

const isRoomThere = ({roomsNearby}: Room): Room[] => {
    if(roomsNearby) {
        return roomsNearby
    }
    return []
}

const linkRooms = (room: Room, secondRoom: Room): Room => ({
    ...room,
    roomsNearby: [...isRoomThere(room), secondRoom]
})

export const initDefaultRoom = (): Room => {
    const roomOne: Room = {
        levels: [initLevel(createUnitForPlayerLevel(1), <Reward>{experience: 50, cash: 50})],
        name: 'Room_1'
    }

    const roomTwo: Room = {
        name: 'Room_2'
    }

    let newRoomTwo = linkRooms(roomTwo, roomOne)
    let newRoomOne = linkRooms(roomOne, newRoomTwo)

    return newRoomOne
}


