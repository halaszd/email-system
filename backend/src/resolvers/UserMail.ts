async function email(parent: { id: string }, args: any, context: any) {
    return await context.prisma.userMail.findUnique({
        where: {
            id: parent.id
        }
    })
    .email()
}

async function possessedBy(parent: { id: string }, args: any, context: any) {
    return await context.prisma.userMail.findUnique({
        where: {
            id: parent.id
        }
    })
    .possessedBy()
}

async function fromUser(parent: { id: string }, args: any, context: any) {
    return await context.prisma.userMail.findUnique({
        where: {
            id: parent.id
        }
    })
    .fromUser()
}

async function toUser(parent: { id: string }, args: any, context: any) {
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
    possessedBy,
}
