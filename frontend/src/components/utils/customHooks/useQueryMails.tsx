import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { MAIL_QUERY } from '../../../queries_mutations';
import { AUTH_TOKEN } from '../../../constants';
import { FetchedMails } from '../types/FetchedMail';

// emails(typeOfBox: String!, skip: Int, take: Int, orderBy: MailOrderByInut): ResultMails!

// type UserMail {
//     id: ID!
//     email: Email
//     possessedBy: User
//     fromUser: User
//     toUser: User
//     typeOfBox: String!
// }

// type ResultMails {
//     resultMails: [UserMail!]!
//     allInBoxtypeCount: Int!
// }

export function useQueryMails(
    typeOfMail: "inbox" | "sent" | "trash" | "all",
    pageNum: number,
    mailsPerPage: number,
    setMails?: Function
): FetchedMails {

    const { data } = useQuery(MAIL_QUERY, {
        variables: {
            typeOfBox: typeOfMail,
        }
    })

    useEffect(() => {
        const auth = localStorage.getItem(AUTH_TOKEN)
        if(!auth) {
            return
        }

        setMails && data && setMails(data["emails"])
        data && console.log(data["emails"])
    })
    return  data ? data["emails"] : data
}
