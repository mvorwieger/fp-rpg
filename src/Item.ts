export interface Item {
    name: string,
    value: number
}

export interface AttackItem extends Item {
    attackDamage: number
}

export interface DefenceItem extends Item {
    blockPercentage: number
}

export const initItem = (name: string, value: number): Item => ({
    name,
    value
})

export const initAttackItem = (name: string, value: number, attackDamage: number): AttackItem => ({
    name,
    value,
    attackDamage
})

export const initDefenceItem = (name: string, value: number, blockPercentage: number): DefenceItem => ({
    name,
    value,
    blockPercentage
})