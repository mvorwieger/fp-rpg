import { AttackItem } from './Item'
import { sub } from './util'
import { PlayerState } from './Player'
import { Unit } from './Unit'

export interface Battle {
    player: PlayerState,
    opponent: Unit
}

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
