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

/**
 * TODO: Make the Handlers More abstract so they dont actually call console.log directly but just pass the data to functions that do
 * TODO: That way we can swap the implementation of our view easier later on
 */
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const performCommand = (playerState: PlayerState, command: string, value: any): PlayerState => {
    switch (command) {
        case cliData.help.command:
            helpHandler()
            return playerState
            break;
        case cliData.pickUp.command:
            return pickUpHandler(playerState, value)
            break;
        case cliData.goTo.command:
            return goToHandler(playerState, value)
            break;
        case cliData.observe.command:
            return observeHandler(playerState)
            break;
        case cliData.inventory.command:
            return inventoryHandler(playerState)
            break;
        case cliData.character.command:
            return characterHandler(playerState)
            break;
        case cliData.battle.command:
            return battleHandler(playerState, parseInt(value))
            break;
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
    let playerInstance = GlobalPlayerState.getInstance()
    let player = playerInstance.get()
    playerInstance.set(performCommand(player, command, value))
    createQuestion('')
}

export var createQuestion = (q: string) => {
    r1.question(`${q} \n`, inputHandler)
}

