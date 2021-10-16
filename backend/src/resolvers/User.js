async function inbox(parent, args, context) {
    return await context.prisma.user.findUnique({
        where: {
            id: parent.id
        }
    })
    .inbox()
}

function sent(parent, args, context) {
    return context.prisma.user.findUnique({
        where: {
            id: parent.id
        }
    })
    .sent()
}

module.exports = {
    inbox,
    sent,
}