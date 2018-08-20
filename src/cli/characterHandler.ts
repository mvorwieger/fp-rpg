import {PlayerState} from '../Player'

export const characterHandler = (player: PlayerState): PlayerState => {
    console.log(`${player.name}
    Health: ${player.health}
    Cash: ${player.cash}
    Level: ${player.level.level}
    Progress: ${player.level.progress}
    weapon: ${player.weapon.name}
    shield: ${player.shield.name}
    Inventory: type "inventory"`)
    return player
}