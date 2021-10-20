import React, { createContext, useContext, useState } from 'react';
import { useSetOpenedMail } from '../customHooks/useSetOpenedMail';
import { fetchMails } from '../functions/fetchMails';

import { FetchedMail, FetchedMails } from '../types/FetchedMail';
import { MailContextType } from '../types/MailContextType';

const emptyMail: FetchedMail =
{
    from: "",
    fromEmailAddress: "",
    to: "",
    toEmailAddress: "",
    subject: "",
    message: "",
    id: 0
}

const fetchedMails: FetchedMail[] = [];

const MailContext = createContext<MailContextType>(
    {
        isSideBarClicked: false,
        setIsSideBarClicked: () => { },
        mails: { totalNumOfMails: 0, mailsPerPage: 20, typeOfMail: "inbox", mails: fetchedMails },
        setMails: () => { },
        // typeOfMail: "inbox",
        openedMail: emptyMail,
        isOpenedMail: false,
        setIsOpenedMail: () => { },
        openedMailID: null,
        setOpenedMailID: () => { },
        checkedMailIDs: [],
        setCheckedMailIDs: () => { }
    }
);

const fetchedMailArray: FetchedMail[] = [];

type Props = {
    children: React.ReactNode;
}

export function MailProvider({ children }: Props) {

    const [isSideBarClicked, setIsSideBarClicked] = useState(false);
    // To store fetched mails
    const [mails, setMails] = useState<FetchedMails>(
        {
            totalNumOfMails: 1,
            mailsPerPage: 20,
            typeOfMail: "inbox",
            mails: fetchedMailArray
        });
    // To show only one mail which was clicked. It's needed here to close the opened mail if one clicks on a sidebar button
    const [isOpenedMail, setIsOpenedMail] = useState<boolean>(false);
    const [openedMailID, setOpenedMailID] = useState<number | null>(null);
    const [checkedMailIDs, setCheckedMailIDs] = useState<number[]>([]);
    // Custom hook for getting the parameters of clicked (opened mail)
    const [openedMail] = useSetOpenedMail(
        mails,
        isOpenedMail,
        openedMailID
    );

    return (
        <div>
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
        </div>
    );
}

export function useMail() {
    return useContext(MailContext)
}
