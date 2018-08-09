import {addItemToInventory, initInventory, Inventory, removeItemFromInventoryByName} from './Inventory'
import {AttackItem, DefenceItem, initAttackItem, initDefenceItem, Item} from './Item'
import {Reward} from './Level'

export interface PlayerState {
    health: number,
    name: string,
    level: PlayerLevel,
    weapon: AttackItem,
    shield: DefenceItem,
    inventory: Inventory,
    cash: number
}

export interface PlayerLevel {
    level: number,
    progress: number
}

export interface Battle {
    player: PlayerState,
    opponent: PlayerState
}

export const initPLayer = (health: number, level: PlayerLevel, name: string, weapon: AttackItem, shield: DefenceItem, inventory: Inventory, cash: number): PlayerState => ({
    health,
    name,
    level,
    weapon,
    shield,
    inventory,
    cash
})

export const initDefaultPlayer = (): PlayerState => ({
    health: 100,
    name: 'Default Player',
    level: {
        level: 0,
        progress: 0
    },
    weapon: initAttackItem("Bare Hand", 0, 5),
    shield: initDefenceItem("Bare Hand", 0, 5),
    inventory: initInventory(),
    cash: 0
})

const sub = (num: number, subtract: number): number => num - subtract

export const pickUpItem = (player: PlayerState, item: Item): PlayerState => ({
    ...player,
    inventory: addItemToInventory(player.inventory, item)
})

export const throwAwayItem = (player: PlayerState, name: string): PlayerState => ({
    ...player,
    inventory: removeItemFromInventoryByName(player.inventory, name)
})

export const collectLevelRewards = (player: PlayerState, levelReward: Reward): PlayerState => ({
    ...player,
    level: calcPlayerLevel(player.level, levelReward),
    inventory: {
        items: [...player.inventory.items, levelReward.loot]
    },
    cash: player.cash + levelReward.cash
})

const calcPlayerLevel = (playerLevel: PlayerLevel, levelReward: Reward): PlayerLevel => {
    let newLevelVal: number
    let newExperienceVal: number
    const combinedExp = levelReward.experience + playerLevel.progress

    if (combinedExp >= 100) {
        const levelGain = Math.trunc(combinedExp / 100)
        newLevelVal = levelGain + playerLevel.level
        newExperienceVal = combinedExp - levelGain * 100
    }

    return {
        ...playerLevel,
        level: newLevelVal,
        progress: newExperienceVal
    }
}

/**
 *
 * @param battleState
 * @return battle logs
 */
export const battle = (battleState: Battle): Battle[] =>
    areBothAlive(battleState) ?
        generateBattleState(battleState) : [battleState]

const areBothAlive = (battleState: Battle): boolean =>
    battleState.player.health > 0 && battleState.opponent.health > 0

const performAttack = (receiver: PlayerState, attacker: PlayerState): PlayerState => ({
    ...receiver,
    health: sub(receiver.health, attacker.weapon.attackDamage)
})

const generateBattleState = (battleState: Battle) => {
    const state = {
        player: performAttack(battleState.player, battleState.opponent),
        opponent: performAttack(battleState.opponent, battleState.player)
    }
    return [state, ...battle(state)]
}