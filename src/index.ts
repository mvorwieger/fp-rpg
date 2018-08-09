import {collectLevelRewards, initDefaultPlayer, initPLayer, pickUpItem, PlayerState, throwAwayItem} from './Player'
import {initAttackItem, initDefenceItem, initItem} from './Item'
import {initLevel, Level, Reward, startLevel} from './Level'

const playerDbData: PlayerState = {
    health: 100,
    level: {
        level: 0,
        progress: 0
    },
    weapon: {
        name: "weapon XYZ",
        value: 0,
        attackDamage: 100
    },
    shield: {
        name: "Shield XYZ",
        value: 0,
        blockPercentage: 5
    },
    inventory: {
        items: []
    },
    cash: 500
}

let p = playerDbData
let o = initDefaultPlayer()
let reward: Reward = {
    experience: 659,
    loot: initItem("Blue ball", 5000),
    cash: 100
}

let level = initLevel(p, o, reward)
let levelResult = startLevel(level)
if (levelResult.playerWon) {
    let afterLevelPlayer = collectLevelRewards(p, levelResult.reward)
    console.log(afterLevelPlayer)
}


