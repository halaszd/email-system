
async function userInfo(parent, args, context, info) {
    console.log("in the emails")
    const { userId } = context;
    console.log(userId)

    const user = await context.prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(!user) {
        throw new Error('User cannot be null')
    }

    return user;
}

module.exports = {
    userInfo,
}