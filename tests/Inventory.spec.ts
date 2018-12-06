import "jasmine"
import {
    addItemToInventory,
    initInventory,
    Inventory,
    removeItemFromInventoryByName,
    resetInventory
} from '../src/Inventory'
import { initItem, Item } from '../src/Item'

let inventory: Inventory
describe('Inventory', function () {
    beforeEach(() => {
        inventory = initInventory()
    })

    describe('init', function () {
        it('should init correctly', function () {
            expect(inventory).toBeTruthy()
        })
    })

    describe('addItemToInventory', function () {
        it('should add an Item to the Inventory', function () {
            const item: Item = initItem("name", 0)
            const newInventory: Inventory = addItemToInventory(inventory, item)
            expect(newInventory.items).toContain(item)
        })
    })

    describe('removeItemFromInventory', function () {
        it('should remove an item from the Inventory', function () {
            const itemName = "test"
            const item: Item = initItem(itemName, 0)
            inventory.items = [item]
            const newInvetory = removeItemFromInventoryByName(inventory, itemName)
            newInvetory.items.forEach((item) => {
                expect(item.name).toEqual(itemName)
            })
        })
    })

    describe('resetInventory', function () {
        it('should reset the inventory', function () {
            inventory.items = [initItem("foo", 0), initItem("bar", 0)]
            expect(resetInventory(inventory).items.length).toBe(0)
        })
    })
})
