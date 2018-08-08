import {Battle, battle, PlayerState} from './Player'
import {Item} from './Item'

export interface Level {
    player: PlayerState,
    opponent: PlayerState,
    reward: number | Item
}

export interface LevelResult {
    playerWon: boolean,
    reward?: number | Item
}

export const initLevel = (player: PlayerState, opponent: PlayerState, reward: number | Item): Level => ({
    player,
    opponent,
    reward
})

export const startLevel = (level: Level): LevelResult => {
    const battleLogs = battle({player: level.player, opponent: level.opponent})
    const didPlayerWin = playerWon(battleLogs)

    return {
        playerWon: didPlayerWin,
        reward: didPlayerWin ? level.reward : 0
    }
}

const playerWon = (battleState: Battle[]) => tail(battleState).player.health > 0

const tail = (arr: any[]) => arr[arr.length - 1]