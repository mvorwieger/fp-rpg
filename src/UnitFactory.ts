import { AttackItem, DefenceItem, initAttackItem, initDefenceItem } from './Item'
import { Unit } from './Unit';

const initUnit = (health: number, name: string, weapon: AttackItem, shield: DefenceItem): Unit => ({
    health,
    name,
    weapon,
    shield
})
const getRandomUnitName = (): string => 'Orc'

// TODO: Create a "UnitFactory" that generates units for us and we just need to pass the level of that unit
const getWeaponForDifficulty = (difficulty: number): AttackItem =>
    initAttackItem('WeaponDummy', 10, difficulty * 2)

const getShieldForDifficulty = (difficulty: number): DefenceItem =>
    initDefenceItem('ShieldDummy', 10, difficulty * 0.5)

export const createUnitForPlayerLevel = (difficulty: number): Unit =>
    initUnit(
        100 * difficulty,
        getRandomUnitName(),
        getWeaponForDifficulty(difficulty),
        getShieldForDifficulty(difficulty)
    )
