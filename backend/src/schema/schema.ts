import { gql } from 'apollo-server';

export default gql`
    type Query {
        # userInfo: User!
        emails(typeOfBox: String! skip: Int, orderBy: MailOrderByInut): ResultMails!
        searchEmails(typeOfBox: String, filter: String): [UserMail!]!
    }

    type Mutation {
        signup(email: String!, password: String!, name: String): AuthPayload
        login(email: String!, password: String!): AuthPayload
        send(from: String!, to: String!, subject: String, message: String): UserMail!
        deleteUserMail(userMailIds: [ID!]!): [UserMail!]
        updateMailsPerPage(mailsPerPage: Int!): User!
    }

    type User {
        id: ID!
        email: String!
        name: String
        mailsPerPage: Int
    }

    type Email {
        id: ID!
        subject: String
        message: String
    }

    type UserMail {
        id: ID!
        email: Email
        possessedBy: User
        fromUser: User
        toUser: User
        typeOfBox: String
    }

    type AuthPayload {
        token: String
        user: User
    }

    type ResultMails {
        userMails: [UserMail!]!
        typeOfBox: String!
        allInBoxtypeCount: Int!
        mailsPerPage: Int!
    }

    input MailOrderByInut {
        createdAt: Sort
    }

    enum Sort {
        asc
        desc
    }
`
