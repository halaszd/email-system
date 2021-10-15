function inbox(parent, args, context) {
    return context.prisma.user.findUnique({
        where: {
            id: parent.id
        }
    })
    .to()
}

function sent(parent, args, context) {
    return context.prisma.user.findUnique({
        where: {
            id: parent.id
        }
    })
    .from()
}

module.exports = {
    inbox,
    sent,
}