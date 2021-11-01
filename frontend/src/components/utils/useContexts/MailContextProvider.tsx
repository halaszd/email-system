import React, { createContext, useContext, useState } from 'react';
import { queryUserMails } from '../../..';
import { useQueryMails } from '../customHooks/useQueryMails';
import { useSetOpenedMail } from '../customHooks/useSetOpenedMail';
import { FetchedMail, FetchedMails } from '../types/FetchedMail';
import { MailContextType } from '../types/MailContextType';

const emptyMail: FetchedMail = 
{
	fromUser: {
		id: "",
		email: "",
		name: null
	}, 
	toUser: {
		id: "",
		email: "",
		name: null
	}, 
	email: {
		subject: "", 
		message: "", 
	},
	id: ""
}

const fetchedMails: FetchedMail[] = [];

const MailContext = createContext<MailContextType>(
    {
        isSideBarClicked: false,
        setIsSideBarClicked: () => { },
        mails: { allInBoxtypeCount: 0, mailsPerPage: 20, typeOfBox: "inbox", userMails: fetchedMails },
        setMails: () => { },
        openedMail: emptyMail,
        isOpenedMail: false,
        setIsOpenedMail: () => { },
        openedMailID: null,
        setOpenedMailID: () => { },
        checkedMailIDs: [],
        setCheckedMailIDs: () => { }
    }
);

type Props = {
    children: React.ReactNode;
}

export function MailProvider({ children }: Props) {
    const [isSideBarClicked, setIsSideBarClicked] = useState(false);
    // To store fetched mails
    const [mails, setMails] = useState<FetchedMails>(
        {
            allInBoxtypeCount: 0,
            mailsPerPage: 20,
            typeOfBox: "nobox",
            userMails: fetchedMails
        });
    // To show only one mail which was clicked. It's needed here to close the opened mail if one clicks on a sidebar button
    const [isOpenedMail, setIsOpenedMail] = useState<boolean>(false);
    const [openedMailID, setOpenedMailID] = useState<string | null>(null);
    const [checkedMailIDs, setCheckedMailIDs] = useState<string[]>([]);
    // Custom hook for getting the parameters of clicked (opened mail)
    const [openedMail] = useSetOpenedMail(
        mails,
        isOpenedMail,
        openedMailID
    );

    return (
        <MailContext.Provider value={
            {
                isSideBarClicked,
                setIsSideBarClicked,
                mails,
                setMails,
                openedMail,
                isOpenedMail,
                setIsOpenedMail,
                openedMailID,
                setOpenedMailID,
                checkedMailIDs,
                setCheckedMailIDs
            }}>

            {children}

        </MailContext.Provider>
    );
}

export function useMail() {
    return useContext(MailContext)
}
