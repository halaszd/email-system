async function email(parent, args, context) {
    return await context.prisma.userMail.findUnique({
        where: {
            id: parent.id
        }
    })
    .email()
}

async function possessedBy(parent, args, context) {
    return await context.prisma.userMail.findUnique({
        where: {
            id: parent.id
        }
    })
    .possessedBy()
}

async function fromUser(parent, args, context) {
    return await context.prisma.userMail.findUnique({
        where: {
            id: parent.id
        }
    })
    .fromUser()
}

async function toUser(parent, args, context) {
    return await context.prisma.userMail.findUnique({
        where: {
            id: parent.id
        }
    })
    .toUser()
}


module.exports = {
    email,
    fromUser,
    toUser,
}