const bcrypt = require('bcrypt');
const User = require('../models/userModel')
const AsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

// generate otp

const generateOTP = () => {
    let otp = Math.floor(Math.random() * 900000 + 100000);
    return otp
}

const registerUser = AsyncHandler(async(req, res) => {
    // get the values from the user
    const { username, email, phone, password, image } = req.body;
    // get the otp
    const otp = generateOTP();
    // check if user has filled the fields
    if (!username && !phone && !email &&  !password) {
        res.status(400);
        throw new Error('Please enter all the fields');
    }
    // check if user is not already present
    const checkUser = await User.findOne({email})
    // if not present then add
    if (!checkUser) {
        
        // generate salt/gibberish value
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            username,
            email,
            phone,
            password: hashedPassword,
            image,
            otp
        })
        res.send({
            _id: newUser._id,
             email,
            phone,
            password: hashedPassword,
            image,
            otp,
            token: generateToken({ id: newUser._id }),
            bgTheme: newUser.bgTheme,
            chatBG:newUser.chatBG,
            chatImage:newUser.chatImage
        })

        // send otp to the mail
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port:587,
            secure:false,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass:process.env.MAIL_PASS,
            },
        })

        const mailOptions = {
            from: 'TalkTango',
            to: email,
            subject: 'OTP verification',
            html: `
                <img width='200px' height='200px' src='https://github.com/hsuntariq/TalkTango/blob/main/client/src/assets/logo.png?raw=true' style='display:block;margin:auto;border-radius:50%;'/>
            <h1 style='text-align:center'>
            Welcome to TalkTango <b><i style='text-transform:capitalize'>${username}</i></b>.Good to have you on board! <br>
            Following is the OTP to start the <span style="color:orange">tango!</span> 
            </h3>
            <h1 style='font-size:3rem'>
                ${otp}
            </h1>
            `
        }

        try {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                }else{
                    console.log(info.response)
                }
            });
        } catch (error) {
            console.log(error);
        }


    } else {
        res.status(400)
        throw new Error('User already present');
    }

})

const verifyOTP = AsyncHandler(async (req, res) => {
    const id = req.params.id;
    const { otp } = req.body;
    try {
        const findUser = await User.findById(id);

        if (!findUser) {
            res.status(404).json({ error: 'User not found' });
        } else {
            if (otp !=findUser.otp) {
                res.status(401).json({ error: 'Invalid OTP' });
            } else {
                res.send(findUser);
                findUser.otp = null;
                await findUser.save()
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// log user in
const loginUser = AsyncHandler(async (req, res) => {
    const { email, password, phone } = req.body; 
    const findUser = await User.findOne({
        $or: [
            { email }, { phone }

        ]
    })
    if (!findUser) {
        res.status(404);
        throw new Error('User not found!');
    } else {
        if (await bcrypt.compare(password, findUser.password)) {
            res.send(findUser);
        } else {
            res.status(401);
            throw new Error('Invalid Credentials');
            
        }
    }
})


const getAllUsers = AsyncHandler(async (req, res) => {
    const users = await User.find();
    res.send(users);
})



const setTheme = AsyncHandler(async(req, res) => {
    const {id,bgTheme}  = req.body;
    const findUser = await User.findById(id);
    if(!findUser){
        res.status(404);
        throw new Error('User not found')
    } else {
        const updateTheme = await User.findByIdAndUpdate(id, { bgTheme }, {
           new:true
        })
        res.send(updateTheme)
    }
    
})
const setChatTheme = AsyncHandler(async(req, res) => {
    const {id,chatImage,chatBG}  = req.body;
    const findUser = await User.findById(id);
    if(!findUser){
        res.status(404);
        throw new Error('User not found')
    } else {
        const updateTheme = await User.findByIdAndUpdate(id, { chatImage,chatBG }, {
           new:true
        })
        res.send(updateTheme)
    }
    
})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn:'1d'
    })
}




module.exports = {
    registerUser,
    getAllUsers,
    loginUser,
    verifyOTP,
    setTheme,
    setChatTheme
}