async function email(parent, args, context) {
    return await context.prisma.userMail.findUnique({
        where: {
            id: parent.id
        }
    })
    .email()
}

async function user(parent, args, context) {
    return await context.prisma.userMail.findUnique({
        where: {
            id: parent.id
        }
    })
    .user()
}

module.exports = {
    email,
    user,
}