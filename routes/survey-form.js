const express = require("express");
const fs = require("fs-extra");
const emailExistence = require("email-existence");
const mail = require("./../sub_modules/mail");

const router = express.Router();

router.get("/validate-email", (req, res) => {
    emailExistence.check(req.query.email, (err, response) => {
        res.send(
            JSON.stringify({
                validated: response,
            })
        );
    });
});

router.get("/", (req, res) => {
    res.render("survey-form");
});
router.post(
    "/",
    (
        {
            body: {
                name,
                email,
                rating,
                darkColourToBeAdded,
                lightColorToBeAdded,
                needToImprove,
                addedComment,
            },
        },
        res
    ) => {
        if (needToImprove != null && !Array.isArray(needToImprove)) needToImprove = [needToImprove];
        console.log({
            name,
            email,
            rating,
            darkColourToBeAdded,
            lightColorToBeAdded,
            needToImprove,
            addedComment,
        });

        let { averageRating, noOfRating } = fs.readJSONSync(
            "./public/rating.json"
        );
        
        const voteToAdd = fs.readJSONSync("./public/vote-to-add.json")
        const voteToImprove = fs.readJSONSync("./public/vote-to-improve.json")
        voteToAdd[darkColourToBeAdded] = voteToAdd[darkColourToBeAdded] != null ? ++voteToAdd[darkColourToBeAdded] : 1
        voteToAdd[lightColorToBeAdded] = voteToAdd[lightColorToBeAdded] != null ? ++voteToAdd[lightColorToBeAdded] : 1

        mail({
            to: email,
            subject: "My design survey",
            message: `${name} thank you for taking my survey.
it will be a very usefull asset to improve my design.
You can message me at subhambhsubhambh@gmail.com if you have any query.

You should visit my site to see how it looks from time to time.

That said, thank you for your time.`,
        });
        mail({
            from: `${name} <${email}>`,
            subject: "rated my app",
            message: `${name} just rated your design.
his email is ${email}, you can contact him there.
he thinks you should add ${lightColorToBeAdded} as a light color, ${darkColourToBeAdded} as dark color
${needToImprove ? `and improve ${needToImprove.reduce((current, next) => {
                console.log(next)
                voteToImprove[next] = voteToImprove[next] == null ? ++voteToImprove[next] : 1
                return `${current}${next}, `
            }, '').replace(/\,\s$/, '')}.
            ` : ``}
${addedComment ? `They also said: "${addedComment}"` : ''}`
        })
        console.log(voteToAdd)
        fs.writeJSON("./public/vote-to-add.json", voteToAdd, {
            spaces: 4
        })
        fs.writeJSON("./public/vote-to-improve.json", voteToImprove, {
            spaces: 4
        })
        fs.writeJSON("./public/rating.json", {
            averageRating: (averageRating * noOfRating + rating) / ++noOfRating,
            noOfRating,
        }, {
            spaces: 4
        } );

        res.render("survey-form-end", {name, email});
    }
);

module.exports = router;
