import { gql } from '@apollo/client';

export const MAIL_QUERY = gql `
    query MailQuery(
        $typeOfBox: String!
        $userEmail: String
        $skip: Int 
        $take: Int
        $orderBy: MailOrderByInut
        ) {
        emails(
            typeOfBox: $typeOfBox, 
            userEmail: $userEmail,
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
                typeOfBox
            }
            allInBoxtypeCount,
            typeOfBox
        }
    }
`;

export const MAIL_SEARCH_QUERY = gql`
  query MailSearchQuery($typeOfBox: String, $filter: String) {
    searchEmails(typeOfBox: $typeOfBox, filter: $filter) {
      id
      email {
        subject
        message
      }
      possessedBy {
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
      typeOfBox
    }
  }
`;