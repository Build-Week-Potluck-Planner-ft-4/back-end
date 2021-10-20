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

async function updateRsvp(pId, uId, rsvp) {
    console.log(rsvp);
    await db('userPotluck')
        .where('potluck_id', Number(pId))
        .andWhere('user_id', Number(uId))
        .first()
        .update(rsvp)
    return findRsvp({potluck_id: Number(pId)})
}

async function updateEvent(id, event) {
    
    await db('potluck')
        .where('potluck_id', Number(id))
        .first()
        .update(event)
    return getById(id)
}

function getById(id) {
    return db('potluck')
        .where('potluck_id', id)
        .first()
}

async function insertItem(id, newItems) {
    const newItemsToInsert = newItems.map(item =>
        ({ 'potluck_id': id, 'item': item }))
    await db('potluckItem')
        .insert(newItemsToInsert)
    return newItemsToInsert
}

function findRsvp(filter) {
    return db('userPotluck')
      .select('attending')
      .where(filter)
}

module.exports = {
    insertEvent,
    getById,
    insertItem,
    insertGuest,
    updateEvent,
    updateRsvp
}
