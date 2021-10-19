const typeOfBoxes = [
    "inbox",
    "sent",
    "trash",
    "all",
]

// const advancedSearchNames = {
//     from: "fromUser",
//     to: "toUser"
// }

// async function userInfo(parent, args, context, info) {
//     console.log("in the emails")
//     const { userId } = context;
//     console.log(userId)

//     const user = await context.prisma.user.findUnique({
//         where: {
//             id: userId
//         }
//     })

//     if(!user) {
//         throw new Error('User cannot be null')
//     }

//     return user;
// }

async function emails(parent, args, context, info) {
    if(!typeOfBoxes.includes(args.typeOfBox)) {
        throw new Error('Invalid box type')
    }

    const { userId } = context;

    const where = { possessedById: userId };

    if(args.typeOfBox !== 'all') {
        where["typeOfBox"] = args.typeOfBox;
    }

    const resultMails = await context.prisma.userMail.findMany({
        where,
        skip: args.skip,
        take:args.take,
        orderBy: args.orderBy
    })

    const allInBoxtypeCount = await context.prisma.userMail.count({
        where
    });


    return {
        resultMails,
        allInBoxtypeCount,
    }
}

async function searchEmails(parent, args, context) {
    // fromUser, toUser, message, subject
    const { userId } = context;
    const where = {possessedById: userId}
    if(args.filter) {
        where["OR"] = [
            {
                fromUser: {
                    email: {
                        contains: args.filter
                    }
                }
            },
            {
                toUser: {
                    email: {
                        contains: args.filter
                    }
                }
            },
            {   
                email: {
                    subject: {
                        contains: args.filter
                    },
                    message: {
                        contains: args.filter
                    }
                }
            },
        ]
    }

    if(args.typeOfBox){
        where["typeOfBox"] = args.typeOfBox;
    }

    const resultMails = await context.prisma.userMail.findMany({
        where
    })
    return resultMails
}

module.exports = {
    // userInfo,
    emails,
    searchEmails,
}
