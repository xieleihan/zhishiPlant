require('dotenv').config({path: './.env'});

const email = process.env.email
const pass = process.env.pass

console.log(email,pass)

module.exports = {
    email: email,
    name: '知识星球',
    pass: pass
}