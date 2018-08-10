import {addItemToInventory, initInventory, Inventory, removeItemFromInventoryByName} from './Inventory'
import {AttackItem, DefenceItem, initAttackItem, initDefenceItem, Item} from './Item'
import {Reward} from './Level'
import {sub} from './util'
import {initDefaultRoom, Room} from './Room'

export interface Unit {
    health: number
    name: string,
    weapon: AttackItem,
    shield: DefenceItem
}
export interface PlayerState extends Unit {
    level: PlayerLevel,
    inventory: Inventory,
    cash: number,
    inRoom?: Room
}

export interface PlayerLevel {
    level: number,
    progress: number
}

export interface Battle {
    player: PlayerState,
    opponent: Unit
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
    cash: 0,
    inRoom:  initDefaultRoom()
})


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
export const goToRoom = (player: PlayerState, room: Room) => ({
    ...player,
    inRoom: room
})

export const startBattle = (battleState: Battle): Battle[] =>
    areBothAlive(battleState) ?
        generateBattleState(battleState) : [battleState]

const areBothAlive = (battleState: Battle): boolean =>
    battleState.player.health > 0 && battleState.opponent.health > 0

const performAttack = (weapon: AttackItem, health: number) =>
    sub(health, weapon.attackDamage)


const generateBattleState = (battleState: Battle) => {
    const state = {
        player: {
            ...battleState.player,
            health: performAttack(battleState.opponent.weapon, battleState.player.health)
        },
        opponent: {
            ...battleState.opponent,
            health: performAttack(battleState.player.weapon, battleState.opponent.health)
        },
    }
    return [state, ...startBattle(state)]
}
