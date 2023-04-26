const User = require('../models/user')


const createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body)

        return user
    } catch (err) {

        console.log(err)
        next(err)

    }
}

const getUser = async (req, res, next) => {

    try {

        const { email: userEmail, password: userPassword } = req.body
        console.log(userEmail)

        let userData = await User.findOne({ email: userEmail, password: userPassword })


        if (!userData) {
            return null
        }

        return userData

    } catch (err) {
        res.json({ "msg": err })
    }

}


module.exports = {
    createUser,
    getUser
}