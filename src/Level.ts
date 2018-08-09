import {Battle, battle, initDefaultPlayer, pickUpItem, PlayerState} from './Player'
import {initAttackItem, Item} from './Item'

export interface Level {
    player: PlayerState,
    opponent: PlayerState,
    reward: Reward
}

export interface LevelResult {
    playerWon: boolean,
    reward?: Reward
}

export interface Reward {
    experience: number,
    cash: number
    loot?: Item,
}

export const initLevel = (player: PlayerState, opponent: PlayerState, reward: Reward): Level => ({
    player,
    opponent,
    reward
})

const noReward = (): Reward => ({experience: 0, cash: 0})
export const startLevel = (level: Level): LevelResult => {
    const battleLogs = battle({player: level.player, opponent: level.opponent})
    const didPlayerWin = playerWon(battleLogs)

    return {
        playerWon: didPlayerWin,
        reward: didPlayerWin ? level.reward : noReward()
    }
}

const playerWon = (battleState: Battle[]) => tail(battleState).player.health > 0

const tail = (arr: any[]) => arr[arr.length - 1]

const player = initDefaultPlayer()
const level = {
    player: player,
    opponent: initDefaultPlayer(),
    reward: {
        experience: 50,
        loot: initAttackItem("TestItem", 50, 10)
    }
}