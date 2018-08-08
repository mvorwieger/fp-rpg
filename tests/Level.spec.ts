import "jasmine"
import {initLevel, Level} from '../src/Level'
import {initDefaultPlayer, PlayerState} from '../src/Player'

let player: PlayerState
let level: Level
let opponent: PlayerState
describe('Level', function () {
    beforeEach(() => {
        player = initDefaultPlayer()
        opponent = initDefaultPlayer()
        level = initLevel(player, opponent, 10)
    })
    describe('initLevel', function () {
        it('should create', function () {
            expect(level).toBeTruthy()
        })

        it('should have proper properties', function () {
            expect(level.player).toBe(player)
            expect(level.opponent).toBe(opponent)
            expect(level.reward).toBe(10)
        })
    })
})