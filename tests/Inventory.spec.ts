import "jasmine"
import {
    addItemToInventory, createInventoryAdder, createInventoryRemover,
    initInventory,
    Inventory,
    removeItemFromInventoryByName,
    resetInventory
} from '../src/Inventory'
import {initItem, Item} from '../src/Item'

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
            expect(newInvetory.items).not.toContain(item)
        })
    })

    describe('resetInventory', function () {
        it('should reset the inventory', function () {
            inventory.items = [initItem("foo", 0), initItem("bar", 0)]
            expect(resetInventory(inventory).items.length).toBe(0)
        })
    })

    describe('createInventoryAdder', function () {
        it('should add an Item', function () {
            const newItem = initItem("test", 0)
            const addItem = createInventoryAdder(inventory)
            const newInventory = addItem(newItem)

            expect(newInventory.items).toContain(newItem)
        })
    })

    describe('createInventoryRemover', function () {
        it('should remove an Item', function () {
            const itemName = "test"
            const newItem = initItem(itemName, 0)
            inventory.items = [newItem]
            const removeItemByName = createInventoryRemover(inventory)
            const newInventory = removeItemByName(itemName)

            expect(newInventory.items).not.toContain(newItem)
        })
    })
})