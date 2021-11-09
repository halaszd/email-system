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
    });

    const token = jwt.sign({
        userId: user.id,
        },
        APP_SECRET
    );

    return {
        token,
        user,
    };
}

async function login(parent, args, context, info) {
    const user = await context.prisma.user.findUnique({
        where: {
            email: args.email
        }
    });

    if(!user) {
        throw new Error('No such user found')
    };

    const valid = await bcrypt.compare(args.password, user.password);

    if(!valid) {
        throw new Error('Invalid password')
    };

    const token = jwt.sign({
        userId: user.id,
        },
        APP_SECRET
    );

    return {
        token,
        user,
    };
}

async function send(parent, args, context, info) {
    const { userId } = context;
    
    if(!userId) {
        throw new Error('User cannot be null');
    };

    const toUser = await context.prisma.user.findUnique({
        where: {
            email: args.to
        }
    });

    if(!toUser) {
        throw new Error('No such user to send the mail to');
    };

    const newEmail = await context.prisma.email.create({
        data: {
            subject: args.subject,
            message: args.message
        }
    });

    const newFromUserMail = await context.prisma.userMail.create({
        data: {
            email: { connect: { id: newEmail.id } },
            possessedBy: { connect: { id: userId } },
            fromUser: { connect: { id: userId } },
            toUser: { connect: { id: toUser.id } },
            typeOfBox: 'sent'
        }
    });

    const newToUserMail = await context.prisma.userMail.create({
        data: {
            email: { connect: { id: newEmail.id } },
            possessedBy: { connect: { id: toUser.id } },
            fromUser: { connect: { id: userId } },
            toUser: { connect: { id: toUser.id } },
            typeOfBox: 'inbox'
        }
    });


    return newToUserMail;
}

async function updateMailsPerPage(parent, args, context) {
    const { userId } = context;

    await context.prisma.user.update({
        where: {
            id: userId
        },
        data: {
            mailsPerPage: args.mailsPerPage
        }
    })

    const user = await context.prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    return user;
}

async function deleteUserMail(parent, args, context) {
    const { userId } = context;

    const deletedUserMails = [];

    for(const userMailId of args.userMailIds) {

        const userMailTodelete = await context.prisma.userMail.findUnique({
            where: {
                id_possessedById: {
                    id: Number(userMailId),
                    possessedById: userId
                }
            }
        });
        console.log("id: ", userMailId, "userId: ", userId, userMailTodelete)

        if(!userMailTodelete) {
            continue;
        };

        if(userMailTodelete.typeOfBox === 'trash'){
            await context.prisma.userMail.delete({
                where: {
                    id_possessedById: {
                        id: Number(userMailId),
                        possessedById: userId
                    }
                }
            });
        } else {
            await context.prisma.userMail.update({
                where: {
                    id_possessedById: {
                        id: Number(userMailId),
                        possessedById: userId
                    }
                },
                data: {
                    typeOfBox: 'trash'
                }
            });
        };

        deletedUserMails.push(userMailTodelete);

    }

    return deletedUserMails;
}

module.exports = {
    signup,
    login,
    send,
    deleteUserMail,
    updateMailsPerPage,
}