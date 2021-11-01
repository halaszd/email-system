import React, { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client';
import { AUTH_TOKEN } from '../../../constants';
import { FetchedMails } from '../types/FetchedMail';

export const MAIL_QUERY = gql `
    query MailQuery(
        $typeOfBox: String!
        $skip: Int 
        $take: Int
        $orderBy: MailOrderByInut
        ) {
        emails(
            typeOfBox: $typeOfBox, 
            skip: $skip, 
            take:$take, 
            orderBy: $orderBy
            ) {
            userMails {
                id
                email {
                    subject
                    message
                }
                possessedBy{
                  id
                }
                fromUser {
                  id
                  email
                  name
                }
                toUser {
                  id
                  email
                  name
                }
            }
            allInBoxtypeCount,
            typeOfBox
        }
    }
`;

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
            typeOfBox: "inbox",
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
