import "jasmine"
import {initLevel, Level, noReward, startLevel} from '../src/Level'
import {initDefaultPlayer, PlayerState} from '../src/Player'

let player: PlayerState
let level: Level
let opponent: PlayerState
describe('Level', function () {
    beforeEach(() => {
        player = initDefaultPlayer()
        opponent = initDefaultPlayer()
        level = initLevel(player, opponent, noReward())
    })
    describe('initLevel', function () {
        it('should create', function () {
            expect(level).toBeTruthy()
        })

        it('should have proper reward', function () {
            expect(level.reward.loot).toBe(noReward().loot)
            expect(level.reward.experience).toBe(noReward().experience)
            expect(level.reward.cash).toBe(noReward().cash)
        })
    })
    describe('startLevel', function () {
        it('player should win when opponent is weaker', function () {
            opponent.health = 50
            level = initLevel(player, opponent, noReward())
            const levelRes = startLevel(level)
            console.dir(levelRes, {depth: null})
            expect(levelRes.playerWon).toBeTruthy()
        })
    })
})