export async function fetchMails(
	typeOfMail: "inbox" | "sent" | "trash" | "", 
  pageNum: number,
  mailsPerPage: number,
	setMails: Function
) {
	  setMails([])
    const response = await fetch(`http://localhost:3001/api/mails/${typeOfMail}?pageNum=${pageNum}&mailsPerPage=${mailsPerPage}`);
    const respJSON = await response.json();
    console.log("json: ", respJSON);
    setMails(respJSON);
  }