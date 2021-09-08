module.exports = email => {
    if(email.includes("@")) return `${
        email.replace(/\@/g, " @ ")
    } <${
        email.replace(
         /\s/g, 
         ""
        )
    }>`
    return email ? `${
        email
    } <noneed@noneed.com>` 
            : 
    "anonymous <anonymous@anonymouse"
}