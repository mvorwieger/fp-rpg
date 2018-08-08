import {initPLayer, pickUpItem, PlayerState, throwAwayItem} from './src/Player'
import {initAttackItem, initDefenceItem} from './src/Item'
const playerDbData: PlayerState = {
    health: 100,
    weapon: {
        name: "weapon XYZ",
        value: 0,
        attackDamage: 5
    },
    shield: {
        name: "Shield XYZ",
        value: 0,
        blockPercentage: 5
    },
    inventory: {
        items: [
            initAttackItem("test", 0, 2),
            {name: "test", value: 0, attackDamage: 2},
            initDefenceItem("test", 0, 2),
        ]
    }
}

const convertPlayer = (p: PlayerState) =>
    initPLayer(p.health, p.weapon, p.shield, p.inventory)

let p = convertPlayer(playerDbData)

p = throwAwayItem(p,"test")
p = pickUpItem(p, initAttackItem("TEST", 2, 2))
console.log(p)