const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const { getUserId } = require('./utils');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const UserMail = require('./resolvers/UserMail');

// TODO:
// when all ppl delete an email from their box it should be seen on an email entity

const prisma = new PrismaClient();

const resolvers = {
    Query,
    Mutation,
    UserMail,
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
