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

async function emails(parent: any, args: { typeOfBox: string; userEmail: any; skip: any; orderBy: any; }, context: { prisma?: any; userId?: any; }, info: any) {
    console.log(args.typeOfBox, args.userEmail)
    if(!typeOfBoxes.includes(args.typeOfBox)) {
        throw new Error('Invalid box type')
    }

    const { userId } = context;
    if(!userId) {
        throw new Error("Non existent user")
    }
    
    const user = await context.prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    const typeOfBox = args.typeOfBox;
    const mailsPerPage = user.mailsPerPage;

    console.log("userId in query: ", userId)
    console.log("mailsPerPage", mailsPerPage)

    type WhereType = {
        possessedById: string;
        typeOfBox?: string;
    }
    const where: WhereType = { 
        possessedById: userId
     };

    if(typeOfBox !== 'all') {
        where["typeOfBox"] = typeOfBox;
    }

    const userMails = await context.prisma.userMail.findMany({
        where,
        skip: args.skip,
        take: mailsPerPage,
        orderBy: args.orderBy
    })

    const allInBoxtypeCount = await context.prisma.userMail.count({
        where
    });

    return {
        userMails,
        typeOfBox,
        allInBoxtypeCount,
        mailsPerPage,
    }
}

async function searchEmails(parent: any, args: { typeOfBox: any; filter: string; }, context: { prisma?: any; userId?: any; }) {
    console.log(args.typeOfBox, args.filter)
    if(args.filter === ""){
        return [];
    }
    // fromUser, toUser, message, subject
    const { userId } = context;
    type WhereType = {
        possessedById: string;
        OR?: object;
        typeOfBox?: string;
    }
    const where: WhereType = {
        possessedById: userId
    }
    console.log(where)
    if(args.filter) {
        console.log(args.filter)
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

                }
            },
            {
                email: {
                    message: {
                        contains: args.filter
                    }
                }
            }
        ]
    }
    console.log(where)
    if(args.typeOfBox){
        where["typeOfBox"] = args.typeOfBox;
    }
    console.log(where)
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
