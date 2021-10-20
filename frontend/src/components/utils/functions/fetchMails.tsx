export async function fetchMails(
	typeOfMail: "inbox" | "sent" | "trash",
  pageNum: number,
  mailsPerPage: number,
	setMails?: Function,
) {
	  setMails && setMails([])
    await fetch(`http://localhost:3001/api/mails/mail-settings?mailsPerPage=${mailsPerPage}`, {
      method: 'POST'
    });
    const response = await fetch(`http://localhost:3001/api/mails/${typeOfMail}?pageNum=${pageNum}`);
    const respJSON = await response.json();
    console.log("json: ", respJSON);
    setMails && setMails(respJSON);

    return respJSON;
  }