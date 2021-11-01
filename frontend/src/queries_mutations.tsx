import { gql } from '@apollo/client';

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
