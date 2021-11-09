import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation RegisterMutation($email: String!, $password: String!, $name: String) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
      }
    }
  }
`

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

export const DELETE_MAILS_MUTATION = gql`
  mutation DeleteMailsMutation(
    $userMailIds: [ID!]!
    ) {
    deleteUserMail(
      userMailIds: $userMailIds
      ) {
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