const db = require('../../data/db-config')

async function insertEvent(event) {
    const [newEventObject] = await db('potluck')
        .insert(event, [
            'potluck_id', 'user_id', 'potluck_name', 'location', 'date', 'time'
        ])
    return newEventObject 
}

function getById(id) {
    return db('potluck')
        .where('potluck_id', id)
        .first()
}

async function insertItem(newItem) {
    const [newItemObject] = await db('potluckItem')
        .insert(newItem, [
            'item_id', 'potluck_id', 'item'
        ])
        return newItemObject
}

module.exports = {
    insertEvent,
    getById,
    insertItem
}
