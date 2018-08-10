import * as readline from "readline"
import {Battle, collectLevelRewards, goToRoom} from './Player'
import {Room} from './Room'
import {cliData} from './data/cli'
import {GlobalPlayerState} from './GlobalPlayerState'
import {Level, startLevel} from './Level'

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const helpHandler = () => {
    for (let key in cliData) {
        let b: any = cliData
        console.log(`\n ${b[key].description}`)
    }
}

const pickUpHandler = (itemName: string) => {
    console.log(`your are trying to pick up ${itemName}`)
}

const goToHandler = (roomName: string) => {
    const player = GlobalPlayerState.getInstance().get()
    const foundRoom = player.inRoom.roomsNearby.find(({name}) => name === roomName)

    if(foundRoom) {
        GlobalPlayerState.getInstance().set(goToRoom(
            player,
            foundRoom
        ))
        console.log('entered Room ' + foundRoom.name)
    } else {
        console.log('there is no such room')
    }
}

const observeHandler = () => {
    const player = GlobalPlayerState.getInstance().get()
    player.inRoom.roomsNearby.forEach(({name}: Room) => {
        console.log(`${name} is nearby \n`)
    })

    player.inRoom.levels.forEach((level: Level, index) => {
        console.log(`${index}: 
        Opponent: ${level.opponent.name},
            health: ${level.opponent.health}, 
            attack Damage: ${level.opponent.weapon.attackDamage}, 
            block percentage: ${level.opponent.shield.blockPercentage}, 
        Reward: ${level.reward.experience} exp, ${level.reward.cash} gold ${level.reward.loot ? 'and a Item' : ''}`)
    })

}

const inventoryHandler = () => {
    const state = GlobalPlayerState.getInstance().get().inventory.items
    if(!state.length) {console.log('nothing')}
    state.forEach(console.log)
}

const characterHandler = () => {
    console.log(GlobalPlayerState.getInstance().get())
}

const battleHandler = (indexOfLevel: number) => {
    const player = GlobalPlayerState.getInstance().get()
    const level = player.inRoom.levels[indexOfLevel]
    const battleLogs = startLevel(player, level)
    battleLogs.logs.forEach((logEntry: Battle, index: number) => {
        console.log(`
        ---Round ${index}---
            Player: ${logEntry.player.name}
                Health: ${logEntry.player.health}
                Attack Damage: ${logEntry.player.weapon.attackDamage}
                Block Percentage: ${logEntry.player.shield.blockPercentage}
            
            Opponent: ${logEntry.opponent.name}
                Health: ${logEntry.opponent.health}
                Attack Damage: ${logEntry.opponent.weapon.attackDamage}
                Block Percentage: ${logEntry.opponent.shield.blockPercentage}
        `)
    })
    if(battleLogs.playerWon) {
        console.log('You won')
        GlobalPlayerState.getInstance().set(collectLevelRewards(player, battleLogs.reward))
    } else {
        console.log('You Lost this fight')
    }
}


const inputHandler = (input: string) => {
    let cmd = input.split(' ')
    let command = cmd[0]
    let value = cmd[1]

    switch (command) {
        case cliData.help.command:
            helpHandler()
            break;
        case cliData.pickUp.command:
            pickUpHandler(value)
            break;
        case cliData.goTo.command:
            goToHandler(value)
            break;
        case cliData.observe.command:
            observeHandler()
            break;
        case cliData.inventory.command:
            inventoryHandler()
            break;
        case cliData.character.command:
            characterHandler()
            break;
        case cliData.battle.command:
            battleHandler(parseInt(value))
            break;
    }

    createQuestion('')
}

export var createQuestion = (q: string) => {
    r1.question(`${q} \n`, inputHandler)
}

