const express = require('express');
const server = express();
const port = 3001;
const cors = require('cors');

server.use(cors());

let mails = {"mails": [
	{"from": "Peter", "to": "David", "subject": "howdy how id how are you hello hello here's the doomsday hello hello", "message": "hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 1},
	{"from": "Peter", "to": "David", "subject": "howdy how id how are you hello hello here's the doomsday hello hello", "message": "hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 2},
	{"from": "Peter", "to": "David", "subject": "howdy how id how are you hello hello here's the doomsday hello hello", "message": "hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 3},
	{"from": "Peter", "to": "David", "subject": "howdy how id how are you hello hello here's the doomsday hello hello", "message": "hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 4},
	{"from": "Peter", "to": "David", "subject": "howdy how id how are you hello hello here's the doomsday hello hello", "message": "hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 5},
	{"from": "Peter", "to": "David", "subject": "howdy how id how are you hello hello here's the doomsday hello hello", "message": "hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 6},
	{"from": "Peter", "to": "David", "subject": "howdy how id how are you hello hello here's the doomsday hello hello", "message": "hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 7},
	{"from": "Peter", "to": "David", "subject": "howdy how id how are you hello hello here's the doomsday hello hello", "message": "hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 8},
	{"from": "Peter", "to": "David", "subject": "howdy how id how are you hello hello here's the doomsday hello hello", "message": "hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 9},
	{"from": "Peter", "to": "David", "subject": "howdy how id how are you hello hello here's the doomsday hello hello", "message": "hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 10},
	{"from": "Peter", "to": "David", "subject": "howdy how id how are you hello hello here's the doomsday hello hello", "message": "hhhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayhello, how are you todayello, how are you todayello, how are you today", "id": 11},
]};
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
