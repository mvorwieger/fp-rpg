import {PlayerState} from '../Player'
import {Room} from '../Room'
import {Level} from '../Level'
import {Item} from '../Item'

export const observeHandler = (player: PlayerState): PlayerState => {
    player.inRoom.roomsNearby.forEach(({name}: Room) => {
        console.log(`${name} is nearby \n`)
    })

    if(player.inRoom.levels) {
        console.log('---Levels---')
        player.inRoom.levels.forEach((level: Level, index) => {
            console.log(`   ${index}: 
        Opponent: ${level.opponent.name},
            health: ${level.opponent.health}, 
            attack Damage: ${level.opponent.weapon.attackDamage}, 
            block percentage: ${level.opponent.shield.blockPercentage}, 
        Reward: ${level.reward.experience} exp, ${level.reward.cash} gold ${level.reward.loot ? 'and a Item' : ''}`)
        })
    } else {console.log('there are no enemies around')}

    if(player.inRoom.items) {
        console.log('\n---Items---')
        player.inRoom.items.forEach((item: Item, index: number) => {
            console.log(`
            name: ${item.name}
            value: ${item.value}
            `)
        })


    }
    console.log('To Battle a opponent type "battle opponentIndex"')
    console.log('Pick up a Item to see its stats')
    return player
}