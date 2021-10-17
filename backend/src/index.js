const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const { getUserId } = require('./utils');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const UserMail = require('./resolvers/UserMail');
// const User = require('./resolvers/User');
// const Email = require('./resolvers/Email');

// TODO:
// search through mails
// trash box
// updateMail(Mutation) --> to move a mail to trash folder
// pagination of mails

const prisma = new PrismaClient();

const resolvers = {
    Query,
    Mutation,
    UserMail,
    // Email
    // User,
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
    context: ({ req }) => {
        return {
            ...req,
            prisma,
            userId:
            req && req.headers.authorization
                ? getUserId(req)
                : null
        };
    }
})

server
    .listen()
    .then(({ url }) => 
    console.log(`Server is running on ${url}`) 
    );
