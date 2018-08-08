import {initInventory, Inventory} from './Inventory'
import {AttackItem, DefenceItem, initAttackItem, initDefenceItem} from './Item'

export interface PlayerState {
    health: number,
    weapon: AttackItem,
    shield: DefenceItem
    inventory: Inventory
}

export interface Battle {
    player: PlayerState,
    opponent: PlayerState
}

export const initPLayer = (health: number, weapon: AttackItem, shield: DefenceItem, inventory: Inventory): PlayerState => ({
    health,
    weapon,
    shield,
    inventory
})

export const initDefaultPlayer = (): PlayerState => ({
    health: 100,
    weapon: initAttackItem("Bare Hand", 0, 5),
    shield: initDefenceItem("Bare Hand", 0, 5),
    inventory: initInventory()
})

const sub = (num: number, subtract: number): number => num - subtract

export const countZero = (num: number): number[] => num > 0 ? [num, ...countZero(num - 1)] : [num]

export const battle = (battleState: Battle): Battle[] =>
    areBothAlive(battleState) ?
        generateState(battleState) : [battleState]

const areBothAlive = (battleState: Battle): boolean =>
    battleState.player.health > 0 && battleState.opponent.health > 0

const performAttack = (receiver: PlayerState, attacker: PlayerState): PlayerState => ({
    ...receiver,
    health: sub(receiver.health, attacker.weapon.attackDamage)
})

const generateState = (battleState: Battle) => {
    const state = {
        player: performAttack(battleState.player, battleState.opponent),
        opponent: performAttack(battleState.opponent, battleState.player)
    }
    return [state, ...battle(state)]
}



