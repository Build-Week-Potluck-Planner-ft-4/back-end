const router = require('express').Router()
const Events = require('./event-model')
const {
    validateBody,
    validateItem,
    validateId
} = require('../middleware/potluck')

router.post('/create/:user_id', validateBody, async (req, res, next) => {
    const { potluck_name, date, time, location } = req.body
    const { user_id } = req.params
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

router.post('/items/:potluck_id', validateId, validateItem, async (req, res, next) => {
    const { item } = req.body
    const { id } = req.potluck
    try {
        const newItem = await Events.addItem(id, item)
        res.status(200).json(newItem)
    } catch (error) {
        next(error)
    }
})

module.exports = router


//[PUT] edit event

//[PUT] add food items

//[PUT] assign food items to user

//[GET] fetch potlucks user is assigned to

//[GET] fetch potluck by filter potluck name to see potluck details

//[DELETE] delete event