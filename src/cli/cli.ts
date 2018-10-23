import * as readline from "readline"
import {initDefaultPlayer, PlayerState} from '../Player'
import {cliData} from '../data/cli'
import {helpHandler} from './helpHandler'
import {pickUpHandler} from './pickUpHandler'
import {goToHandler} from './goToHandler'
import {observeHandler} from './observeHandler'
import {inventoryHandler} from './inventoryHandler'
import {characterHandler} from './characterHandler'
import {battleHandler} from './battleHandler'
import {throwAwayHandler} from './throwAwayHandler'

/**
 * TODO: Make the Handlers More abstract so they dont actually call console.log directly but just pass the data to functions that do
 * TODO: That way we can swap the implementation of our view easier later on
 */

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
        case cliData.throwAway.command:
            return throwAwayHandler(playerState, value)
        case 'r':
            return initDefaultPlayer()
        default:
            return playerState
    }
}


const inputHandler = (input: string, player: PlayerState) => {
    let cmd = input.split(' ')
    let command = cmd[0].toLowerCase()
    let value = cmd[1]
    
    player = performCommand(player, command, value)
    console.log("action performed")
    setPlayerState(player)
}

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})

let gPlayer: PlayerState;

export var setPlayerState = (player: PlayerState) => {
    gPlayer = player
}

export var createQuestion = (q: string, player: PlayerState) => {
    console.log(q + "\n")
    gPlayer = player
    r1.on("line", (line) => {
        inputHandler(line, gPlayer)
    })
}

