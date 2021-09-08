const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "subhambhsubhambh@gmail.com",
        pass: require("./.password")
    }
});

module.exports = ({
    from="subhambhsubhambh@gmail.com",
    to="subhambhsubhambh@gmail.com",
    subject="",
    message: text
}) => transporter.sendMail({from, to, subject, text})
