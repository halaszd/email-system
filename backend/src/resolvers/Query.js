
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

async function emails(parent, args, context, info) {
    if(!typeOfBoxes.includes(args.typeOfBox)) {
        throw new Error('Invalid box type')
    }

    const { userId } = context;

    const userMails = context.prisma.userMail.findMany({
        where: {
            id: userId,
            typeOfBox: args.typeOfBox
        }
    })

    return userMails
}

module.exports = {
    userInfo,
    emails,
}