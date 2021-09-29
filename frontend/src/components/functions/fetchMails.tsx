export async function fetchMails(
	typeOfMail: "inbox" | "sent" | "trash" | "", 
	setMails: Function
) {
	  setMails([])
    const response = await fetch(`http://localhost:3001/api/mails/${typeOfMail}`);
    const respJSON = await response.json();
    console.log("json: ", respJSON);
    setMails(respJSON);
  }