function from(parent, args, context) {
    return context.prisma.email.findUnique({
        where: {
            id: parent.id
        }
    })
    .fromUser()
}

// function to(parent, args, context) {
//     return context.prisma.email.findUnique({
//         where: {
//             id: parent.id
//         }
//     })
//     .to()
// }

module.exports = {
    from,
    // to,
}