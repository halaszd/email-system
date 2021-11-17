async function email(parent: { id: any }, args: any, context: { prisma: { userMail: { findUnique: (arg0: { where: { id: any } }) => { (): any; new(): any; email: { (): any; new(): any } } } } }) {
    return await context.prisma.userMail.findUnique({
        where: {
            id: parent.id
        }
    })
    .email()
}

async function possessedBy(parent: { id: any }, args: any, context: { prisma: { userMail: { findUnique: (arg0: { where: { id: any } }) => { (): any; new(): any; possessedBy: { (): any; new(): any } } } } }) {
    return await context.prisma.userMail.findUnique({
        where: {
            id: parent.id
        }
    })
    .possessedBy()
}

async function fromUser(parent: { id: any }, args: any, context: { prisma: { userMail: { findUnique: (arg0: { where: { id: any } }) => { (): any; new(): any; fromUser: { (): any; new(): any } } } } }) {
    return await context.prisma.userMail.findUnique({
        where: {
            id: parent.id
        }
    })
    .fromUser()
}

async function toUser(parent: { id: any }, args: any, context: { prisma: { userMail: { findUnique: (arg0: { where: { id: any } }) => { (): any; new(): any; toUser: { (): any; new(): any } } } } }) {
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
