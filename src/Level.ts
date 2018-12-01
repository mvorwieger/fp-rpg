import {Item} from './Item'
import {Unit} from './UnitFactory'
import {Battle, startBattle} from './Battle'
import {PlayerState} from './Player'

export interface Level {
    opponent: Unit,
    reward: Reward
}

export interface LevelResult {
    playerWon: boolean,
    logs: Battle[],
    reward?: Reward
}

export interface Reward {
    experience: number,
    cash: number
    loot: Item[],
}

export const initLevel = (opponent: Unit, reward: Reward): Level => ({
    opponent,
    reward
})

export const noReward = (): Reward => ({experience: 0, cash: 0, loot: []})

export const startLevel = (player: PlayerState, level: Level): LevelResult => {
    const battleLogs = startBattle({player: player, opponent: level.opponent})
    const didPlayerWin = playerWon(battleLogs)

    return {
        playerWon: didPlayerWin,
        logs: battleLogs,
        reward: didPlayerWin ? level.reward : noReward()
    }
} 
const playerWon = (battleState: Battle[]) => tail(battleState).player.health > 0

const tail = (arr: any[]) => arr[arr.length - 1]
