;(async function getGlobalUrl() {
    const tunnel = await require("localtunnel")({
        port: 1234,
        subdomain: "subhambh",
        host: "http://serverless.social"
    })
    tunnel.on("close", (err) => {
        console.log(err)
        console.log(`url ${tunnel.url} closed`)
    })
    if(!tunnel.url.startsWith("https://subhambh")) {
        tunnel.close()
        getGlobalUrl()
    }
    console.log("server visible at", tunnel.url)
})()