const bcrypt = require('bcrypt')

const hashedPassword = async (password) => {
    try {
        const securedPassword = await bcrypt.hash(password, 10)
        return securedPassword
    } catch (error) {
        console.log(error)
    }
}

module.exports =  hashedPassword