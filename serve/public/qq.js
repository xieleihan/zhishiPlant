require('dotenv').config({path: './.env'});

const email = process.env.email
const password = process.env.password

module.exports = {
    email: email,
    name: '知识星球',
    pass: password
}