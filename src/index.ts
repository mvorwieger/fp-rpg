import {initPLayer, PlayerState} from './Player'
import {initAttackItem, initDefenceItem, initItem, Item} from './Item'

import {DbPlayer, PlayerModel} from './Database/Player'
import {DbItem} from './Database/Item'
import {connect} from 'mongoose'

(async () => {

    try {
        await connect('mongodb://mongodb:27017/rpg', {useNewUrlParser: true})
    } catch (e) {
        console.log(e)
    }
    const perl = initItem("Blue Perl", 2000)
    const sword = initAttackItem("Basic Sword", 10, 5)
    const shield = initDefenceItem("Basic Shield", 10, 5)

    const playerDbData: any = {
        health: 100,
        level: {
            level: 0,
            progress: 0
        },
        name: 'Test User',
        weapon: sword,
        shield: shield,
        inventory: {
            items: [perl, perl]
        },
        cash: 500
    }
    const findIdForItem = async (item: Item) =>
        new Promise((resolve, reject) => {
            const query = item,
                update = { expire: new Date() },
                options = { upsert: true, new: true, setDefaultsOnInsert: true };
            DbItem.findOneAndUpdate(query, update, options, function(error, result) {
                if (error) reject(error)
                resolve(result._id)
            });
        })

    const findPlayerByName = (name: string) =>
        DbPlayer.findOne({name})


    const convertPlayerToDb = async (player: PlayerState): Promise<PlayerModel> =>
        new DbPlayer({
            ...player,
            weapon: await findIdForItem(player.weapon),
            shield: await findIdForItem(player.shield),
            inventory: {
                items: await Promise.all(player.inventory.items.map((item: Item) => findIdForItem(item)))
            }
        })

    const pModel = await convertPlayerToDb(playerDbData)

    try {
        await pModel.save()
    } catch (e) {
        console.log(e)
    }
})()


