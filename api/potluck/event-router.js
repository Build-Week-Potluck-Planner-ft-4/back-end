const router = require('express').Router()
const Events = require('./event-model')
const {
    validateBody,
    validateItem,
    validatePlId,
    validateUserId,
    validateGuest
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

router.post('/items/:user_id/:potluck_id', validatePlId, validateItem, async (req, res, next) => {
    const { item } = req.body
    const { potluck_id } = req.potluck
    const newItem = {
        potluck_id,
        item,
    }
    try {
        const createdItem = await Events.insertItem(newItem)
        res.status(201).json(createdItem)
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

module.exports = router


//[PUT] edit event

//[PUT] assign food items to user

//[GET] fetch potlucks user is assigned to

//[GET] fetch potluck by filter potluck name to see potluck details

//[DELETE] delete event