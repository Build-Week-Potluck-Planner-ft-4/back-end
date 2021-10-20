const Events = require('../potluck/event-model')
const Users = require('../auth/auth-model')

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

const validateUserId = async (req, res, next) => {
    const { user_id } = req.params
    try {
        const user = await Users.getById(user_id)
        if(user) {
            req.user = user
            next()
        } else {
            next({
                status: 404,
                message: "User not found"
            })
        }
    } catch (error) {
        next(error)
    }
}

const validatePlId = async (req, res, next) => {
    const { potluck_id, user_id } = req.params 
    try {
        const potluck = await Events.getById(potluck_id)
        if(potluck) {
            req.potluck = potluck
            if(potluck.user_id === parseInt(user_id)) {
                next()
            } else {
                next({
                    status: 401,
                    message: "user is not organizer of event"
                })
            }
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

const validateGuest = async (req, res, next) => {
    const { username } = req.body
    
    try {
        const validUser = await Users.findBy({username: username})
        if(validUser){
            req.guest = validUser[0]
            next()
        } else {
            next({
                status: 404,
                message: "username is not registered"
            })
        }
    } catch (error) {
        next(error)
    }
}

const assignOrganizer = async (req, res, next) => {
    const { potluck_id, user_id } = req
        const newOrganizer = {
            user_id,
            potluck_id,
            role: "organizer",
            attending: true
        }
        Events.insertGuest(newOrganizer)
        .then(assignOrganizer => {
            return assignOrganizer
        }) .catch(next)
}

const markAsFullfilled = (req, res, next) => {
    req.map(item => {
        const itemObject = { item_id: item.item_id }
    Events.updateFullfilled(itemObject)})
}

module.exports = {
    validateBody,
    validatePlId,
    validateUserId,
    validateGuest,
    assignOrganizer,
    markAsFullfilled
}
