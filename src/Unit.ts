import { AttackItem, DefenceItem } from "./Item";

export interface Unit {
    health: number
    name: string,
    weapon: AttackItem,
    shield: DefenceItem
}

