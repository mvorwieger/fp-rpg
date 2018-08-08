import "jasmine"
import {battle, Battle, initDefaultPlayer, initPLayer, PlayerState} from '../src/Player'
import {initAttackItem, initDefenceItem} from '../src/Item'
import {initInventory} from '../src/Inventory'

let p: PlayerState
let o: PlayerState
describe('Player', function () {
    beforeEach(() => {
        p = initDefaultPlayer()
        o = initDefaultPlayer()
    })

    it('should create Players', function () {
        expect(p).toBeTruthy()
        expect(o).toBeTruthy()
    })

    it('should create Custom Player', function () {
        const cPlayer = initPLayer(
            100,
            initAttackItem('test', 2, 2),
            initDefenceItem('test', 2, 2),
            initInventory()
        )
    })

    it('should create a battle', function () {
        p.health = 50
        o.health = 50
        p.weapon.attackDamage = 5
        o.weapon.attackDamage = 5
        const expectedHealth = 45
        const battleState: Battle = {
            player: p,
            opponent: o
        }

        const afterOneTurnBattleState = {
            player: {
                ...battleState.player,
                health: expectedHealth
            },
            opponent: {
                ...battleState.opponent,
                health: expectedHealth
            }
        }
        expect(battle(battleState)).toContain(afterOneTurnBattleState)
    })
})