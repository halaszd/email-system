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

// just to the server able to send back appropriate amount of emails at once
function getMails(pageNum, mailsPerPage, mails) {
	// azt is le kell kezelni ha 0 jön be pageNum-ként
    // const maxPageNum = Math.ceil(mails.length / mailsPerPage)
    const mailsToSend = {"totalNumOfMails": mails.length, "mailsPerPage": mailsPerPage, "mails": []};
    const fromIndex = (pageNum - 1) * mailsPerPage;
    let toIndex = (pageNum * mailsPerPage);
	console.log("toindex: ", toIndex, "mails.lenght: ", mails.length)
    if(toIndex > mails.length){
		console.log("benne")
        toIndex = mails.length
    }

    for(let i = fromIndex; i < toIndex; i++) {
        mailsToSend["mails"].push(mails[i]);
    }

	return mailsToSend;
}

// server.get('/api/mails/inbox:pageNum', (req, res) => {
server.get('/api/mails/inbox', (req, res) => {
	console.log(req.query.params)
	// const inboxPageToSend = getMails(parseInt(req.query.pageNum), req.query.mailsPerPage, inbox);
	console.log("inbox mails per page: ", mails.mails.settings.mailsPerPage)
	const inboxPageToSend = getMails(parseInt(req.query.pageNum), mails.mails.settings.mailsPerPage, inbox);
	res.send(JSON.stringify(inboxPageToSend));
})

server.get('/api/mails/sent', (req, res) => {
	// const sentPageToSend = getMails(parseInt(req.query.pageNum), req.query.mailsPerPage, sent);
	const sentPageToSend = getMails(parseInt(req.query.pageNum), mails.mails.settings.mailsPerPage, sent);
	res.send(JSON.stringify(sentPageToSend));
})

server.get('/api/mails/trash', (req, res) => {
	// const trashPageToSend = getMails(parseInt(req.query.pageNum), query.mailsPerPage, inbox);
	const trashPageToSend = getMails(parseInt(req.query.pageNum), mails.mails.settings.mailsPerPage, inbox);
	res.send(JSON.stringify(trashPageToSend));
})

server.post('/api/mails/mail-settings', (req, res) => {
	const newMailsPerPage = parseInt(req.query.mailsPerPage);
	console.log("newmailsPerPage: ", newMailsPerPage)
	mails.mails.settings.mailsPerPage = newMailsPerPage;
	res.sendStatus(200);
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
