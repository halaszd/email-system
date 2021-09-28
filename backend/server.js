const express = require('express');
const server = express();
const port = 3001;
const cors = require('cors');

server.use(cors());
server.use(express.json());
// arra készíti fel a szervert, hogy JSON fálj jön: ha nested json jönne
server.use(express.urlencoded({ extended:true }))

let inbox = {"mails": [
	{"typeOfMail": "inbox", "from": "Peter", "fromEmailAddress": "peter@gmail.com", "to": "David", "toEmailAddress": "david@gmail.com", "subject": "howdy how id how are you hello hello here's the doomsday hello hello", "message": "hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 1},
	{"typeOfMail": "inbox", "from": "Henry", "fromEmailAddress": "henry@gmail.com", "to": "David", "toEmailAddress": "david@gmail.com", "subject": "how id how are you hello hello here's the doomsday hello hello", "message": "how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 2},
	{"typeOfMail": "inbox", "from": "Jacob", "fromEmailAddress": "jacob@gmail.com", "to": "David", "toEmailAddress": "david@gmail.com", "subject": "id how are you hello hello here's the doomsday hello hello", "message": "are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 3},
	{"typeOfMail": "inbox", "from": "Janett", "fromEmailAddress": "janett@gmail.com", "to": "David", "toEmailAddress": "david@gmail.com", "subject": "how are you hello hello here's the doomsday hello hello", "message": "you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 4},
	{"typeOfMail": "inbox", "from": "Global Team", "fromEmailAddress": "global.team@gmail.com", "to": "David", "toEmailAddress": "david@gmail.com", "subject": "hello here's the doomsday hello hello howdy how id how are you hello", "message": "AAA hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 5},
	{"typeOfMail": "inbox", "from": "ZZZ", "fromEmailAddress": "zzz@gmail.com", "to": "David", "toEmailAddress": "david@gmail.com", "subject": "here's the doomsday hello hello howdy how id how are you hello", "message": "BBB hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 6},
	{"typeOfMail": "inbox", "from": "McDonalds", "fromEmailAddress": "mcdonalds@gmail.com", "to": "David", "toEmailAddress": "david@gmail.com", "subject": "the doomsday hello hello howdy how id how are you hello", "message": "CCC hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 7},
	{"typeOfMail": "inbox", "from": "Barbara", "fromEmailAddress": "barbara@gmail.com", "to": "David", "toEmailAddress": "david@gmail.com", "subject": "A", "message": "DDD hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 8},
	{"typeOfMail": "inbox", "from": "Peter", "fromEmailAddress": "peter@gmail.com", "to": "David", "toEmailAddress": "david@gmail.com", "subject": "B", "message": "EEE hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 9},
	{"typeOfMail": "inbox", "from": "Peter", "fromEmailAddress": "peter@gmail.com", "to": "David", "toEmailAddress": "david@gmail.com", "subject": "C", "message": "FFF hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 10},
	{"typeOfMail": "inbox", "from": "Peter", "fromEmailAddress": "peter@gmail.com", "to": "David", "toEmailAddress": "david@gmail.com", "subject": "D", "message": "GGG hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 11},
]};
let sent = {"mails": [
	{"typeOfMail": "sent", "from": "ZZZ", "fromEmailAddress": "zzz@gmail.com", "to": "David", "toEmailAddress": "david@gmail.com", "subject": "here's the doomsday hello hello howdy how id how are you hello", "message": "BBB hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 6},
	{"typeOfMail": "sent", "from": "McDonalds", "fromEmailAddress": "mcdonalds@gmail.com", "to": "David", "toEmailAddress": "david@gmail.com", "subject": "the doomsday hello hello howdy how id how are you hello", "message": "CCC hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 7},
	{"typeOfMail": "sent", "from": "Barbara", "fromEmailAddress": "barbara@gmail.com", "to": "David", "toEmailAddress": "david@gmail.com", "subject": "A", "message": "DDD hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 8},
	{"typeOfMail": "sent", "from": "Peter", "fromEmailAddress": "peter@gmail.com", "to": "David", "toEmailAddress": "david@gmail.com", "subject": "B", "message": "EEE hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 9},
	{"typeOfMail": "sent", "from": "Peter", "fromEmailAddress": "peter@gmail.com", "to": "David", "toEmailAddress": "david@gmail.com", "subject": "C", "message": "FFF hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 10},
	{"typeOfMail": "sent", "from": "Peter", "fromEmailAddress": "peter@gmail.com", "to": "David", "toEmailAddress": "david@gmail.com", "subject": "D", "message": "GGG hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 11},
]};

let users = {"users": []}

// let mails = {"mails": []}; 

server.get('/api/mails/inbox', (req, res) => {
	res.send(JSON.stringify(inbox));
})

server.get('/api/mails/sent', (req, res) => {
	res.send(JSON.stringify(sent));
})

server.get('/api/mails/trash', (req, res) => {
	res.send(JSON.stringify(inbox));
})

server.post('/api/registration', (req, res) => {
	console.log('registration: ', req.body)
	let isExistingUser = false;
	for(const user of users['users']) {
        console.log('USER: ', user)
		if(req.body.username === user.username) {
            isExistingUser = true;
			res.sendStatus(400)
		}
	}
	if(!isExistingUser) {
        users['users'].push(req.body)
	    res.sendStatus(200)
        console.log(users)
	}
})

server.post('/api/is-existing-user', (req, res) => {
	console.log('is-existing-user: ', req.body)
	let isExistingUser = false;
	for(const user of users['users']) {
        console.log('USER: ', user)
		if(req.body.username === user.username) {
            isExistingUser = true;
			res.sendStatus(400)
		}
	}
	if(!isExistingUser) {
	    res.sendStatus(200)
	}
})

server.post('/api/login', (req, res) => {
	console.log('login: ', req.body)
	let isExistingUser = false;
	for(const user of users['users']) {
        console.log('USER: ', user)
		if(req.body.username === user.username && req.body.password === user.password) {
            isExistingUser = true;
			res.sendStatus(200);
		}
	}
	if(!isExistingUser) {
	    res.sendStatus(400);
        console.log("User is not existent!")
	}
})

// server.post('/api/mails', (req, res) => {
// 	let isIDExist = false;
// 	for(const mail of mails["mails"]) {
// 		console.log(mail)
// 		if(req.body.id === mail.id) {
// 			res.status(400);
// 			res.send('Existing ID');
// 			isIDExist = true;
// 			break;
// 		}
// 	}
// 	if(!isIDExist) {
// 		mails["mails"].push(req.body)
// 		res.send('OK')
// 	}
// })

server.listen(port, () => {
	console.log(`Example app listening at
	http://localhost:${port}`)
})
