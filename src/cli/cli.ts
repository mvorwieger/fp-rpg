import * as readline from "readline"
import {initDefaultPlayer, PlayerState} from '../Player'
import {cliData} from '../data/cli'
import {GlobalPlayerState} from '../GlobalPlayerState'
import {helpHandler} from './helpHandler'
import {pickUpHandler} from './pickUpHandler'
import {goToHandler} from './goToHandler'
import {observeHandler} from './observeHandler'
import {inventoryHandler} from './inventoryHandler'
import {characterHandler} from './characterHandler'
import {battleHandler} from './battleHandler'
import {spawnRandomRoom} from '../Room'

/**
 * TODO: Make the Handlers More abstract so they dont actually call console.log directly but just pass the data to functions that do
 * TODO: That way we can swap the implementation of our view easier later on
 */
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let player: PlayerState = initDefaultPlayer()

const performCommand = (playerState: PlayerState, command: string, value: any): PlayerState => {
    switch (command) {
        case cliData.help.command:
            helpHandler()
            return playerState
        case cliData.pickUp.command:
            return pickUpHandler(playerState, value)
        case cliData.goTo.command:
            return goToHandler(playerState, value)
        case cliData.observe.command:
            return observeHandler(playerState)
        case cliData.inventory.command:
            return inventoryHandler(playerState)
        case cliData.character.command:
            return characterHandler(playerState)
        case cliData.battle.command:
            return battleHandler(playerState, parseInt(value))
        case 'r':
            return initDefaultPlayer()
        default:
            return playerState
    }
}


const inputHandler = (input: string) => {
    let cmd = input.split(' ')
    let command = cmd[0].toLowerCase()
    let b ='b'
    let value = cmd[1]

    // Very scary global assignment
    player = performCommand(player, command, value)
    player.inRoom = spawnRandomRoom(player.level.level, player.inRoom)
    createQuestion('')
}

export var createQuestion = (q: string) => {
    r1.question(`${q} \n`, inputHandler)
}

