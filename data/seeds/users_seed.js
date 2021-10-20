const users = [{
    user_id: 1,
    username: "Tony",
    email: "tonyBevilacqua@gmail.com",
    password: "$2a$08$C.L4m9.mkowglpI2y8UIkeJfOSLeLt12QkaCuTsrzHGp4/.BVl0yy"
},
{
    user_id: 2,
    username: "Ryan",
    email: "ryansinn@gmail.com",
    password: "$2a$08$C.L4m9.mkowglpI2y8UIkeJfOSLeLt12QkaCuTsrzHGp4/.BVl0yy"
},
{
    user_id: 3,
    username: "andy",
    email: "andygranelli@gmail.com",
    password: "$2a$08$C.L4m9.mkowglpI2y8UIkeJfOSLeLt12QkaCuTsrzHGp4/.BVl0yy"
},
{
    user_id: 4,
    username: "Brody",
    email: "brodydalle@gmail.com",
    password: "$2a$08$C.L4m9.mkowglpI2y8UIkeJfOSLeLt12QkaCuTsrzHGp4/.BVl0yy"
},
{
    user_id: 5,
    username: "rose",
    email: "rosemazzola@gmail.com",
    password: "$2a$08$C.L4m9.mkowglpI2y8UIkeJfOSLeLt12QkaCuTsrzHGp4/.BVl0yy"
}]

exports.seed = function(knex) {
    return knex('users').insert(users)
}

