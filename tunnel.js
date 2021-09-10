;(async function getGlobalUrl() {
    try {
        const tunnel = await require("localtunnel")({
            port: 1234,
            subdomain: "subhambh",
            host: "http://serverless.social"
        })
        tunnel.on("error", err => {
            console.log(err)
            console.log(`logged error from url ${tunnel.url}`)
            console.log("restarting tunnel")
            getGlobalUrl()
        })
        tunnel.on("close", () => {
            console.log(`url ${tunnel.url} closed`)
            getGlobalUrl()
        })
        if(!tunnel.url.startsWith("https://subhambh")) {
            tunnel.close()
            getGlobalUrl()
        }
        console.log("server visible at", tunnel.url)
    }
    catch {
        getGlobalUrl()
    }
})()