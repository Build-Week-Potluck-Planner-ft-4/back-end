Backend Project for ft-potluck-planner-4
Deployed Link is https://potluckplanner-bw-10-2021.herokuapp.com/

- [Auth](#auth)
	- [Logs a User In](#logs-a-user-in)
	- [Registers a New User](#registers-a-new-user)

- [Potluck](#potluck)
  - [Logged in User can create a new potluck](#creates-a-potluck)
  - [Organizer of potluck can add a item](#create-item)
  - [Organizer of potluck can invite a registered user as a guest](#create-guest)
  - [Organizer of potluck can edit the details of the event](#update-event)
  - [Invited guests can rsvp to the potluck](#update-rsvp)
  - [Invited guests can view potluck items & select item(s)](#update-item)
  - [Guests can view all potlucks they've created/invited to](#read-potlucks)

# Auth

## Logs a User In

<p>Logs a User In</p>

	POST /api/auth/login


### Parameters

| Name      | Type      | Description                         |
|-----------|-----------|-------------------------------------|
| username	| String		|  <p>Username of the User</p>				|
| password	| String		|  <p>Password of the User</p>				|

### Success Response

Success-Response:

```
{
    "message": "welcome, pop",
    "status": 200,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBvcCIsImlhdCI6MTYzNDU5MjIzOSwiZXhwIjoxNjM0Njc4NjM5fQ.RyKXp7JDBXS-fUNboBRH9lVje76Nnj43haMA7MJmbCI"
}

```
### Error Response

Username-Or-Password-Incorrect-Response

```
{
  "status": 401,
  "message": "invalid credentials."
}
```

## Registers a New User

<p>Registers a New User</p>

	POST /api/auth/register


### Parameters

| Name      | Type      | Description                                               |
|-----------|-----------|-----------------------------------------------------------|
| username	| String		|  <p>The New Users username *Required **Must be unique</p>	|
| password	| String		|  <p>The New Users password *Required</p>							    |
| email			| String		|  <p>The New Users email, *Required **Must be unique</p>		|


### Success Response

Success-Response:

```
{
    "email": "pop@gmail.com",
    "password": "$2a$08$p26QggJQ5csnD8qPCYKMxeY/DQlKHAIPB9xO7sgBs8mjFTwQyBWCu",
    "user_id": 20,
    "username": "pop"
}
```
### Error Response

Username-Already-Taken

```
{
  "status": 422,
  "message": "username taken"
}
```

Required Field(s) empty

```
{
    "status": 400,
    "message": "username, email, and password required"
}
```

# Potluck

## Creates a Potluck

<p>Logged in User can create a new potluck</p>

  POST /api/potluck/create/:user_id

### Parameters

| Name          | Type      | Description                           |
|---------------|-----------|---------------------------------------|
| potluck_name	| String		|  <p>Name of the event</p>						  |
| date			    | String		|  <p>date of event {mm-dd-yyy}</p>     |
| location      | String    |  <p>location of event</p>             |
| time          | String    |  <p>time of event {hh:mm:ss}</p>      |
| user_id       | Integer   |  <p>logged in user id {params}</p>    |

### Success Response

Success-Response:

```
{
    "potluck_id": 3,
    "user_id": 4,
    "potluck_name": "birthday",
    "location": "our house",
    "date": "2021-12-20T06:00:00.000Z",
    "time": "12:30:00"
}

```
### Error Response

User not logged in

```
{
    "status":401
    "message": "token invalid"
}
```

invalid user id 

```
{
  "status": 404,
  "message": "User not found"
}
```
Required Field(s) empty

```
{
    "status": 400,
    "message": "name, date, time, & location are required"
}
```
## Create item(s)

<p>Allows organizer of potluck to add an array of item objects</p>

POST /api/potluck/items/:user_id/:potluck_id

### Parameters

| Name        | Type      | Description                           |
|-------------|-----------|---------------------------------------|
| item    	  | String		|  <p>Item needed for event</p>				  |
| user_id 	  | Integer		|  <p>logged in user id {params}</p>		|
| potluck_id 	| Integer		|  <p>potluck id {params}</p>				    |

## Success Response

Success-Response:
```
[{
    "item_id": 6,
    "potluck_id": 3,
    "item": "cake"
}]
```

### Error Response

User not logged in

```
{
    "status":401
    "message": "token invalid"
}
```

invalid user id 

```
{
  "status": 404,
  "message": "User not found"
}
```

invalid potluck id 

```
{
  "status": 404,
  "message": "Potluck not found"
}
```

User does not have correct role

```
{
  "status": 401,
  "message": "user is not organizer of event"
}
```

Required Field(s) empty

```
{
    "status": 400,
    "message": "name of item is required"
}
```

## Create guest

<p>Allows organizer of potluck to invite guest(s)</p>

POST /api/potluck/guests/:user_id/:potluck_id

### Parameters

| Name        | Type      | Description                           |
|-------------|-----------|---------------------------------------|
| username    | String		|  <p>registered username of guest</p>	|
| user_id 	  | Integer		|  <p>logged in user id {params}</p>		|
| potluck_id 	| Integer		|  <p>potluck id {params}</p>				    |

## Success Response

Success-Response:
```
{
    "user_id": 2,
    "potluck_id": 3,
    "role": "guest",
    "attending": false
}
```

### Error Response

User not logged in

```
{
    "status":401
    "message": "token invalid"
}
```

invalid user id 

```
{
  "status": 404,
  "message": "User not found"
}
```

invalid potluck id 

```
{
  "status": 404,
  "message": "Potluck not found"
}
```

User does not have correct role

```
{
  "status": 401,
  "message": "user is not organizer of event"
}
```

Required Field(s) empty

```
{
    "status": 400,
    "message": "name of item is required"
}
```

Guest is not a registered user

```
{
  "status": 404,
  "message": "username is not registered"
}
```
## Updates event

<p>Allows organizer of potluck to edit details</p>

PUT /api/potluck/edit/:user_id/:potluck_id

### Parameters

| Name          | Type      | Description                           |
|---------------|-----------|---------------------------------------|
| potluck_id    | String    |  <p>potluck selected {params}</p>
| potluck_name	| String		|  <p>Name of the event</p>						  |
| date			    | String		|  <p>date of event {mm-dd-yyy}</p>     |
| location      | String    |  <p>location of event</p>             |
| time          | String    |  <p>time of event {hh:mm:ss}</p>      |
| user_id       | Integer   |  <p>logged in user id {params}</p>    |

## Success Response

Success-Response:
```
{
    "potluck_id": 3,
    "user_id": 4,
    "potluck_name": "birthday",
    "location": "the park",
    "date": "2021-12-20T06:00:00.000Z",
    "time": "2:30:00"
}

```

### Error Response



## Updates RSVP

<p>Allows invited guest of potluck to change rsvp</p>

PUT /api/potluck/guests/:user_id/:potluck_id

### Parameters

| Name        | Type      | Description                           |
|-------------|-----------|---------------------------------------|
| Attending   | Boolean		|  <p>value of rsvp status</p>	        |
| user_id 	  | Integer		|  <p>logged in user id {params}</p>		|
| potluck_id 	| Integer		|  <p>potluck id {params}</p>				    |

## Success Response

Success-Response:
```
{
    "user_id": 2,
    "potluck_id": 3,
    "role": "guest",
    "attending": true
}

```

### Error Response

## Updates Items

<p>Allows invited guest of potluck to select items</p>

PUT /api/potluck/items/:user_id/:potluck_id

### Parameters

| Name        | Type      | Description                           |
|-------------|-----------|---------------------------------------|
| item_id     | Integer		|  <p>selected value's id</p> 	        |
| user_id 	  | Integer		|  <p>logged in user id {params}</p>		|
| potluck_id 	| Integer		|  <p>potluck id {params}</p>				    |
| item        | String       <p>name of requested item</p>        |

## Success Response

Success-Response:
```
[{
    "item_id": 2,
    "item": "cake"
}]

```

### Error Response

## Reads Potlucks

<p>Allows users to view all potlucks they are invited to</p>

GET /api/potluck/:user_id/

### Parameters

| Name        | Type      | Description                           |
|-------------|-----------|---------------------------------------|
| user_id 	  | Integer		|  <p>logged in user id {params}</p>		|

## Success Response

Success-Response:
```
[{
        "potluck_name": "Birthday",
        "date": "2021-01-01T06:00:00.000Z",
        "time": "10:30:00",
        "location": "Beach",
        "attending": false,
        "role": "guest"
    }]

```

### Error Response





## Hot Tips

- Figure out the connection to the database and deployment before writing any code.

- If you need to make changes to a migration file that has already been released to Heroku, follow this sequence:

  1. Roll back migrations in the Heroku database
  2. Deploy the latest code to Heroku
  3. Migrate the Heroku database to the latest

- If your frontend devs are clear on the shape of the data they need, you can quickly build provisional endpoints that return mock data. They shouldn't have to wait for you to build the entire backend.

- Keep your endpoints super lean: the bulk of the code belongs inside models and other middlewares.

- Validating and sanitizing client data using a library is much less work than doing it manually.

- Revealing crash messages to clients is a security risk, but during development it's helpful if your frontend devs are able to tell you what crashed.

- PostgreSQL comes with [fantastic built-in functions](https://hashrocket.com/blog/posts/faster-json-generation-with-postgresql) for hammering rows into whatever JSON shape.

- If you want to edit a migration that has already been released but don't want to lose all the data, make a new migration instead. This is a more realistic flow for production apps: prod databases are never migrated down. We can migrate Heroku down freely only because there's no valuable data from customers in it. In this sense, Heroku is acting more like a staging environment than production.

- If your fronted devs are interested in running the API locally, help them set up PostgreSQL & pgAdmin in their machines, and teach them how to run migrations in their local. This empowers them to (1) help you troubleshoot bugs, (2) obtain the latest code by simply doing `git pull` and (3) work with their own data, without it being wiped every time you roll back the Heroku db. Collaboration is more fun and direct, and you don't need to deploy as often.
