import {collectLevelRewards, PlayerState} from '../Player'
import {startLevel} from '../Level'
import {Battle} from '../Battle'

export const battleHandler = (player: PlayerState, indexOfLevel: number): PlayerState => {
    let p = player
    const level = p.inRoom.levels[indexOfLevel]
    if(!level) {
        console.log('No Level found with that index')
        return player
    }
    const battleLogs = startLevel(p, level)
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
        /**
         * Filter out level so you can only complete a level once
         */
        p.inRoom.levels = p.inRoom.levels.filter((v, i) =>  i != indexOfLevel)
        return collectLevelRewards(p, battleLogs.reward)
    } else {
        console.log('You Lost this fight')
    }
}