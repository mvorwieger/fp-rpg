import {Item} from './Item'

export interface Inventory {
    items: Item[]
}

export const createInventoryAdder = (inventory: Inventory) => (item: Item) => addItemToInventory(inventory, item)

export const createInventoryRemover = (inventory: Inventory) => (name: string) => removeItemFromInventoryByName(inventory, name)

export const initInventory = (items?: Item[]): Inventory => ({items: items ? items : []})

export const addItemToInventory = (inventory: Inventory, item: Item): Inventory => ({...inventory, items: [...inventory.items, item]})

export const removeItemFromInventoryByName = (inventory: Inventory, name: string): Inventory => ({
        ...inventory,
        items: [...inventory.items.filter((item: Item) => item.name !== name)]
    })

export const resetInventory = (inventory: Inventory): Inventory => ({
    ...inventory,
    items: []
})