const Events = require('../potluck/event-model')

const validateBody = (req, res, next) => {
    const { potluck_name, date, time, location } = req.body
    if(potluck_name === undefined || typeof potluck_name !== 'string' ||
    !potluck_name.trim() || date === undefined || !date.trim() ||
    time === undefined || !time.trim() ||
    location === undefined || typeof location !== 'string' ||
    !location.trim()){
        next({
            status: 400,
            message: "name, date, time, & location are required"
        })
    } else {
        next()
    }
}

const validateItem = (req, res, next) => {
    const { item } = req.body
    if(item === undefined || typeof item !== 'string' || !item.trim()) {
        next({
            status: 400,
            message: "name of item is required"
        })
    } else {
        next()
    }
}

const validateId = async (req, res, next) => {
    const { potluck_id } = req.params
    try {
        const potluck = await Events.getById(potluck_id)
        if(potluck) {
            req.potluck = potluck
            next()
        } else {
            next({
                status: 404,
                message: "potluck not found"
            })  
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    validateBody,
    validateItem,
    validateId
}
