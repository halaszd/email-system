const express = require('express');
const server = express();
const port = 3001;
const cors = require('cors');
const fs = require('fs');

server.use(cors());
server.use(express.json());
// arra készíti fel a szervert, hogy JSON fálj jön: ha nested json jönne
server.use(express.urlencoded({ extended:true }))

let mails = fs.readFileSync('mails.json', 'utf8'); 
mails = JSON.parse(mails);
let inbox = mails["mails"]["inbox"];
let sent = mails["mails"]["sent"];

let users = {"users": []}

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
