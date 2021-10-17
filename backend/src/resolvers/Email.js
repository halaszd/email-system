function from(parent, args, context) {
    return context.prisma.email.findUnique({
        where: {
            id: parent.id
        }
    })
    .fromUser()
}

module.exports = {
    from,
}