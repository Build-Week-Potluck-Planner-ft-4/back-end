const db = require('../../data/db-config')

async function insertEvent(event) {
    const [newEventObject] = await db('potluck')
        .insert(event, [
            'potluck_id', 'user_id', 'potluck_name', 'location', 'date', 'time'
        ])
    return newEventObject 
}

async function insertGuest(guest) {
    const [newGuestObject] = await db('userPotluck')
        .insert(guest, [
            'user_id', 'potluck_id', 'role', 'attending'
        ])
        return newGuestObject
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
    insertItem,
    insertGuest
}
