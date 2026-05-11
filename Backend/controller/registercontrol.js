const Register = require("../model/register");
const bcrypt = require("bcrypt");

exports.postRegister = async (req , res) =>{
 try{
    const{ fullname, email, password, confirmpassword} = req.body;

    // Validation

    if(!fullname || !email || !password || !confirmpassword){
        return res.status(400).json({
           success: false,
           message: "All Fields Required",
        });
    }

    //Check Existing user

    const existingUser = await Register.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success: false,
            message: "Email Already Registered",
        });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
   
    // Save User

     const newUser = new Register({
        fullname,
        email,
        password: hashedpassword,
        confirmpassword: hashedpassword,
     });

     await newUser.save();
     res.status(201).json({
        success: true,
        message: "User Registered Successfully",
     });
 } catch (error){
    console.error("Register Error:", error.message);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
 }
};
