const express = require('express');
const server = express();
const port = 3000;
const cors = require('cors');

server.use(cors());

let mails = {"mails": [{"from": "Peter", "to": "David", "message": "hello, how are you today", "id": 1}]};
// let mails = {"mails": []}; 

// /api/mails get request-re visszaadja az emailek listáját egy JSON-ban
server.get('/api/mails', (req, res) => {
	res.send(JSON.stringify(mails));
})

// arra készíti fel a szervert, hogy JSON fálj jön
server.use(express.json());
// ha nested json jönne
server.use(express.urlencoded({ extended:true }))

// server.post('/api/mails', (req, res) => {
// 	let isRefExist = false;
// 	for(const mail of mails["mails"]) {
// 		console.log(mail)
// 		if(req.body.reference === mail.reference) {
// 			res.status(400);
// 			res.send('Existing Reference');
// 			isRefExist = true;
// 			break;
// 		}
// 	}
// 	if(!isRefExist) {
// 		mails["mails"].push(req.body)
// 		res.send('OK')
// 		createRefPages();
// 	}
// })

server.listen(port, () => {
	console.log(`Example app listening at
	http://localhost:${port}`)
})
