const { toUser } = require("./UserMail");

const typeOfBoxes = [
    "inbox",
    "sent",
    "trash"
]

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

    const where = { possessedById: userId };

    if(args.typeOfBox !== 'all') {
        where["typeOfBox"] = args.typeOfBox;
    }

    const userMails = context.prisma.userMail.findMany({
        where 
    })

    return userMails
}

module.exports = {
    userInfo,
    emails,
}
