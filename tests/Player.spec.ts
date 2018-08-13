import "jasmine"
import {initDefaultPlayer, initPLayer, PlayerState} from '../src/Player'
import {initAttackItem, initDefenceItem} from '../src/Item'
import {initInventory} from '../src/Inventory'
import {Battle, startBattle} from '../src/Battle'

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
            {
                level: 0,
                progress: 0
            },
            'init player name',
            initAttackItem('test', 2, 2),
            initDefenceItem('test', 2, 2),
            initInventory(),
            0
        )
    })

    it('should create a startBattle', function () {
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
        expect(startBattle(battleState)).toContain(afterOneTurnBattleState)
    })
})