const db = require('../../data/db-config')
//const { findByUser } = require('../auth/auth-model')

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
    await db('userPotluck')
        .where('potluck_id', Number(pId))
        .andWhere('user_id', Number(uId))
        .first()
        .update(rsvp)
    return findBy({potluck_id: Number(pId)}, 'userPotluck')
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

async function insertItems(id, newItems) {
    const newItemsToInsert = newItems.map(item =>
        ({ 'potluck_id': id, 'item': item.item, 'fulfilled': false }))
    const addedItems = await db('potluckItem')
        .insert(newItemsToInsert, [
            'item_id', 'item', 'fulfilled', 'potluck_id'
        ])
    return addedItems
}

async function updateItems(pId, uId, items) {
    const newItemsToAssign = items.map(item => 
       ({ 'user_id': uId, 'potluck_id': pId, 'item_id': item.item_id }))
     const assignedItems = await db('userItem')
        .insert(newItemsToAssign, [
            'id', 'item_id', 'user_id', 'potluck_id'
        ])
        console.log(assignedItems);
    return assignedItems
}

function findBy(filter, database) {
    return db(database)
      .select('attending')
      .where(filter)
}

async function updateFullfilled(item) {
    console.log(item);
        const fullfilled = await db('potluckItem')
            .where('item_id', Number(item.item_id))
            .first()
            .update({ 'fulfilled': true })
        return fullfilled
}

const findPotlucks = (id) => {
    return db('potluck as p')
        .join('userPotluck as u', 'p.potluck_id', 'u.potluck_id')
        .select('u.role', 'u.attending', 'p.potluck_name','p.date', 
            'p.time', 'p.location')
        .where('u.user_id', id)
}

// const findPotluckDetails = (id) => {
//     return db('potluck as p')
//         .join('potluckItem as i', 'p.potluck_id', 'i.potluck_id')
//         .join('userPotluck as u', 'p.potluck_id', 'u.potluck_id')
//         .join('users', 'users.user_id', 'u.user_id')
//         .select('p.potluck_name','p.date', 
//         'p.time', 'p.location', 'users.username', 'u.attending',
//         'u.role', 'i.item', 'i.fulfilled')
//         .where('p.potluck_id', id)
//         //.first()
// }

const findPotluckGuests = (id) => {
    return db('potluck as p')
        .join('userPotluck as u', 'p.potluck_id', 'u.potluck_id')
        .join('users', 'users.user_id', 'u.user_id')
        .select('users.username', 'u.attending','u.role')
        .where('p.potluck_id', id)
}

const findPotluckItems = (id) => {
    return db('potluck as p')
        .join('potluckItem as i', 'p.potluck_id', 'i.potluck_id')
        .select('i.item', 'i.fulfilled')
        .where('p.potluck_id', id)
}

module.exports = {
    insertEvent,
    getById,
    insertItems,
    insertGuest,
    updateEvent,
    updateRsvp,
    updateItems,
    updateFullfilled,
    findPotlucks,
    findPotluckGuests,
    findPotluckItems
}
