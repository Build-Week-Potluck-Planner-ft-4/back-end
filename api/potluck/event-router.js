const router = require('express').Router()
const Events = require('./event-model')
const {
    validateBody,
    validatePlId,
    validateUserId,
    validateGuest,
    assignOrganizer,
    markAsFullfilled
} = require('../middleware/potluck')

router.post('/create/:user_id', validateUserId, validateBody, async (req, res, next) => {
    const { potluck_name, date, time, location } = req.body
    const { user_id } = req.user
    const newEvent = { 
        potluck_name, 
        user_id,
        date, 
        time, 
        location 
    }
    try {
        const createdEvent = await Events.insertEvent(newEvent)
        assignOrganizer(createdEvent)
        res.status(201).json(createdEvent)
    } catch (error) {
        next(error)
    }
})

router.put('/edit/:user_id/:potluck_id', validatePlId, validateBody, async (req, res, next) => {
    const { potluck_id } = req.potluck
    const { potluck_name, date, time, location } = req.body
    const editEvent = {
        potluck_name,
        date,
        time,
        location
    }
    try {
        const updatedEvent = await Events.updateEvent(potluck_id, editEvent)
        res.status(200).json(updatedEvent)
    } catch (error) {
        next(error)
    }
})

router.post('/items/:user_id/:potluck_id', validatePlId, async (req, res, next) => {
    const items = req.body
    const { potluck_id } = req.potluck
    try {
        const createdItems = await Events.insertItems(potluck_id, items)
        res.status(201).json(createdItems)
    } catch (error) {
        next(error)
    }
})

router.put('/items/:user_id/:potluck_id', async (req, res, next) => {
    const items = req.body
    const { potluck_id, user_id } = req.params
    try {
        const assignedItems = await Events.updateItems(potluck_id, user_id, items)
        markAsFullfilled(assignedItems)
        res.status(200).json(assignedItems)
    } catch (error) {
        next(error)
    }
})

router.post('/guests/:user_id/:potluck_id', validatePlId, validateGuest, async (req, res, next) => {
    const { user_id } = req.guest
    const { potluck_id} = req.params
    const newGuest = {
        user_id,
        potluck_id,
        role: "guest",
        attending: false
    }
    try {
        const assignGuest = await Events.insertGuest(newGuest)
        res.status(201).json(assignGuest)
    } catch (error) {
        next(error)
    }
})

router.put('/attending/:user_id/:potluck_id', async (req, res, next) => {
    const { attending } = req.body
    const {potluck_id, user_id} = req.params
    const editRsvp = {
        attending
    }
    try {
        const updateRsvp = await Events.updateRsvp(potluck_id, user_id, editRsvp)
        res.status(200).json(updateRsvp)
    } catch (error) {
        next(error)
    }
})

module.exports = router




//[PUT] assign food items to user

//[GET] fetch potlucks user is assigned to

//[GET] fetch potluck by filter potluck name to see potluck details

//[DELETE] delete event