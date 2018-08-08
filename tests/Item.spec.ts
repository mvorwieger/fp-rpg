import "jasmine"
import {AttackItem, DefenceItem, initAttackItem, initDefenceItem, initItem, Item} from '../src/Item'

let item: Item
let attackItem: AttackItem
let defenceItem: DefenceItem
describe('Item', function () {
    beforeEach(() => {
        item = initItem("test", 100)
        attackItem = initAttackItem("test", 100, 2)
        defenceItem = initDefenceItem("test", 100, 3)
    })

    it('should init', function () {
        expect(item).toBeTruthy()
        expect(attackItem).toBeTruthy()
        expect(defenceItem).toBeTruthy()
    })
})