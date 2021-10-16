const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10);

    const user = await context.prisma.user.create({
        data: {
            ...args,
            password
        }
    })

    const token = jwt.sign({
        userId: user.id,
        },
        APP_SECRET
    )

    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {
    const user = await context.prisma.user.findUnique({
        where: {
            email: args.email
        }
    })

    if(!user) {
        throw new Error('No such user found')
    }

    const valid = await bcrypt.compare(args.password, user.password)

    if(!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({
        userId: user.id,
        },
        APP_SECRET
    )

    return {
        token,
        user,
    }
}

async function send(parent, args, context, info) {
    const { userId } = context;
    
    if(!userId) {
        throw new Error('User cannot be null')
    }

    const toUser = await context.prisma.user.findUnique({
        where: {
            email: args.to
        }
    })

    if(!toUser) {
        throw new Error('No such user to send the mail to')
    }

    const newEmail = await context.prisma.email.create({
        data: {
            from: { connect: { id: userId } },
            to: { connect: { id: toUser.id } },
            message: args.message
        }
    })

    return newEmail
}

module.exports = {
    signup,
    login,
    send,
}