const users = [{
    user_id: 1,
    username: "Tony",
    email: "tonyBevilacqua@gmail.com",
    password: 1234
},
{
    user_id: 2,
    username: "Ryan",
    email: "ryansinn@gmail.com",
    password: 1234
},
{
    user_id: 3,
    username: "andy",
    email: "andygranelli@gmail.com",
    password: 1234
},
{
    user_id: 4,
    username: "Brody",
    email: "brodydalle@gmail.com",
    password: 1234
},
{
    user_id: 5,
    username: "rose",
    email: "rosemazzola@gmail.com",
    password: 1234
}]

exports.seed = function(knex) {
    return knex('users').insert(users)
}