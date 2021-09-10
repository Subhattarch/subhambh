const express = require("express")
const fs = require("fs")
const app = express()

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/visitorsNumbers", async (req, res) => {
    let VisitorNo = parseInt( await fs.readFileSync(
        "./public/visitors.numbers"
    ))
    res.send((++VisitorNo).toString())
    fs.writeFileSync(
        "./public/visitors.numbers", VisitorNo.toString()
    )
})

app.get("/tribute-page", (req, res) => {
    res.render("tribute-page")
})

app.post("/", (req, res) => {
    console.log(req.body)
    let mail = {message: req.body.message}
    mail.from = require(
        "./sub_modules/mail-formater"
    )(req.body.from)
    if(req.body.subject) mail.subject = req.body.subject
    require("./sub_modules/mail")({...mail})
})

app.listen(1234, console.log("server on ", 1234));
