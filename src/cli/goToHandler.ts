import {goToRoom, PlayerState} from '../Player'

export const goToHandler = (player: PlayerState, roomName: string): PlayerState => {
    const foundRoom = player.inRoom.roomsNearby.find(({name}) => name === roomName)

    if(foundRoom) {
        console.log('entered the Room ' + foundRoom.name)
        return goToRoom(
            player,
            foundRoom
        )
    }

    console.log('there is no such room/s')
    return player
}