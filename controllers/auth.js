
const {
    createUser,
    getUser

} = require('./user')

const jwt = require('jsonwebtoken');


const login = async (req, res, next) => {

    console.log(req.body);

    const { email, password } = req.body


    if (!email || !password) {
        return res.json({ msg: 'please provide email and passowrd' })
    }
    console.log("geting user from db")
    let userData = await getUser(req, res, next)


    console.log(userData)
    if(!userData){
        res.json({msg:"User not registered"})
        return
    }
    const id = userData.id
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET)
    res.json({ token: token, data: { _id: userData.id, email: userData.email } })
}

const register = async (req, res, next) => {

    console.log(req.body);

    const { email, password } = req.body


    if (!email || !password) {
        return res.json({ msg: 'please provide email and passowrd' })
    }

    let userData = await getUser(req, res, next)
    console.log("is user exist")
    console.log(userData)
    if (!userData) {

        let user = await createUser(req, res, next)
        console.log(user.id);

        const id = user.id
        const token = jwt.sign({ id, email }, process.env.JWT_SECRET)

        res.json({ token: token, data: { _id: user.id, email: user.email } })
    } else {
        res.json({ msg: "user already exist" })
    }


}


module.exports = {
    login,
    register
}