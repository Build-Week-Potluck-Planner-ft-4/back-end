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
        .where({ id })
        .first()
}

function addItem(id, item)

module.exports = {
    insertEvent,
    getById
}
