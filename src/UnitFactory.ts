import {Unit} from './Player'
import {AttackItem, DefenceItem, initAttackItem, initDefenceItem} from './Item'

const initUnit = (health: number, name: string, weapon: AttackItem, shield: DefenceItem): Unit => ({
    health,
    name,
    weapon,
    shield
})
const getRandomUnitName = (): string => 'Orc'

const getWeaponForDifficulty = (difficutlty: number): AttackItem =>
    initAttackItem('WeaponDummy', 10, difficutlty * 2)

const getShieldForDifficulty = (difficulty: number): DefenceItem =>
    initDefenceItem('ShieldDummy', 10, difficulty * 0.5)

export const createUnitForPlayerLevel = (difficulty: number) =>
    initUnit(
        100 * difficulty,
        getRandomUnitName(),
        getWeaponForDifficulty(difficulty),
        getShieldForDifficulty(difficulty)
    )
