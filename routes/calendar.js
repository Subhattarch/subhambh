const express = require("express")
const Cryptr = require("cryptr")
const fs = require("fs")

const cryptr = new Cryptr(require("./../.getKey.js"))

const router = express.Router()

router.get("/", (req, res) => {
    res.render("calendar")
})

router.get("/sign-in-up", (req, res) => {
    const users = JSON.parse(fs.readFileSync("./users.json", "utf8"))
    if(req.query.haveAcount === 'true' ) {
        const User = users.find((user) => user?.name === req.query.name)
        if (!User) {
            res.send({
            isValid: false
            })
            return
        }
        if(
            cryptr.decrypt(User.password) !== req.query.password
        ) {
            res.send({
            isValid: true,
            isValidPassword: false
            })
            return
        }
        res.send({
            isValid: true,
            isValidPassword: true,
            name: User.name
        })
        return
    }
    const User = users.find((user) => user?.name === req.query.name) 
    if(User) {
        res.send({isValid: false})
        return
    }
    fs.writeFile("./users.json", JSON.stringify([
        ...users,
        {
            name: req.query.name,
            password: cryptr.encrypt(req.query.password)
        }
    ], null, 4), err => {
        if(err) {
            console.log(err)
            res.status(404).send({})
            return
        }
        res.send({
            isValid: true,
            isValidPassword: true,
            name: req.query.name
        })
    })
})

router.post("/users/qsave", (req, res) => {
    const {user, ...entries} = req.body
    let error = false
    for(const key in entries) {
        try {
            fs.writeFileSync(
                    `./public/calendar/${user}-${key}.json`,
                    JSON.stringify(entries[key], null, 4)
            )
        }
        catch (err) {
            console.log(err)
            error = true
        }
        if(error) break
    }
    if(error) return res.status(404).send()
    res.send("saved")
})

router.post("/users/save", (req, res) => {
    console.log(req.body?.["27-8-2021"]?.[0])
    const {user, ...entries} = req.body
    let error = false
    console.log(entries, Object.keys(entries))
    for(const key in entries) {
        const rawEntry = (() => {
            try {
                return fs.readFileSync(
                    `./public/calendar/${user}-${key}.json`,
                    "utf8"
                )
            }
            catch {
                return null
            }
        })()
        const lastEntry = rawEntry ? JSON.parse(rawEntry) : [[]]
        console.log(key, entries[key])
        const Entry = entries[key].map((entry, index) => {
            const lastEntryBase = lastEntry.find(
                (entriB) => entriB[0].startTime === entry[0].startTime
            ) ?? []
            const filteredEntry = entry.filter(
                (entriB) => !lastEntryBase.find(
                    entrib => entrib.title === entriB.title && entrib.description === entriB.description
                )
            )
            return [...(lastEntry[index]), entry]
        })
        if(!Entry) continue
        try {
            fs.writeFileSync(
                    `./public/calendar/${user}-${key}.json`,
                    JSON.stringify(Entry, null, 4)
            )
        }
        catch (err) {
            console.log(err)
            error = true
        }
        if(error) break
    }
    if(error) return res.status(404).send("error")
    res.send("saved")
})

module.exports = router