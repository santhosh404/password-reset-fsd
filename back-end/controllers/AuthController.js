import { UserModel } from "../models/AuthModels/UserModel.js";
import bcrypt from "bcryptjs";
import sendMail from "../services/service.js";
import { generateRandomString } from "../helper.js";
import { TokenModel } from "../models/AuthModels/TokenModel.js";
import mongoose from "mongoose";

export const signUp = async (req, res) => {
    let { first_name, last_name, email, password } = req.body;

    try {
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({
                status: "Error",
                message: "Signup Failed!",
                data: {
                    error: "Missing required fields 'first_name', 'last_name', 'email', 'password'"
                }
            })
        }

        //Find if the user already exists
        const user = await UserModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                status: "Error",
                message: "Signup Failed!",
                data: {
                    error: `User with email id ${email} already exists. Please try again with different email id!`
                }
            })
        }

        //Encrypting password
        password = await bcrypt.hash(password, 10);
        const newUserObject = new UserModel({ first_name, last_name, email, password })
        const newUser = await newUserObject.save()

        return res.status(201).json({
            status: "Success",
            message: "Signup Success!",
            data: {
                newUser: newUser
            }
        })


    }
    catch (err) {
        return res.status(500).json({
            status: "Error",
            message: "Signup Failed!",
            data: {
                error: err.message
            }
        })
    }


}

export const signIn = async (req, res) => {

    let { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                status: "Error",
                message: "Signin Failed!",
                data: {
                    error: "Missing required fields 'email', 'password'"
                }
            })
        }

        //Find if the user already exists
        const user = await UserModel.findOne({ email: email })

        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "Signin Failed!",
                data: {
                    error: `User with email id ${email} not found!. Please go ahead and signup!`
                }
            })
        }

        //Comparing password
        const isPasswordSame = await bcrypt.compare(password, user.password);

        if (isPasswordSame) {
            return res.status(201).json({
                status: "Success",
                message: "Signin Success!",
                data: {
                    user: user
                }
            })
        }
        else {
            return res.status(400).json({
                status: "Error",
                message: "Signin Failed!",
                data: {
                    error: `Email and Password doesn't match!`
                }
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            status: "Error",
            message: "Signup Failed!",
            data: {
                error: err.message
            }
        })
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({
                status: "Error",
                message: "Password Reset Failed!",
                data: {
                    error: "Missing required fields 'email'"
                }
            })
        }

        //Find if the user already exists
        const user = await UserModel.findOne({ email: email })

        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "Password Reset Failed!",
                data: {
                    error: `User with email id ${email} not found!. Please go ahead and signup!`
                }
            })
        }

        const randomString = generateRandomString(30);
        const passwordResetLink = `${process.env.FRONT_END_BASE_URL}/reset-password/${user._id}/${randomString}`;

        //Save the user id and randomstring to token collection
        await TokenModel.findOneAndUpdate({ user_id: user._id }, {
            user_id: user._id,
            token: randomString
        },
            {
                upsert: true
            }
        )

        //Sending the email
        const mailResponse = await sendMail(email, passwordResetLink);
        return res.status(200).json({
            status: "Success",
            message: "Password reset initiated!",
            data: {
                response: `Password reset link was sent to ${email}. Please check!`
            }
        })

    }
    catch (err) {
        return res.status(500).json({
            status: "Error",
            message: "Password Reset Failed!",
            data: {
                error: err.message
            }
        })
    }
}


export const resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { new_password } = req.body;

    try {
        if (!new_password) {
            return res.status(400).json({
                status: "Error",
                message: "Password Reset Failed!",
                data: {
                    error: "Missing required fields 'new_password'"
                }
            })
        }
        const _id = new mongoose.Types.ObjectId(id);
        const userToken = await TokenModel.findOne({ user_id: _id });

        if (!userToken) {
            return res.status(400).json({
                status: "Error",
                message: "Password Reset Failed!",
                data: {
                    error: "Reset Password token invalid!"
                }
            })
        }

        if (token == userToken.token) {
            const encryptedPassword = await bcrypt.hash(new_password, 10);
            await UserModel.findByIdAndUpdate(_id, { $set: { password: encryptedPassword } });
            await TokenModel.findOneAndDelete({ user_id: _id });

            return res.status(200).json({
                status: "Success",
                message: "Password reset success!",
                data: {
                    response: "New password changed successfully!"
                }
            })
        }

        else {
            return res.status(400).json({
                status: "Error",
                message: "Password Reset Failed!",
                data: {
                    error: "Reset Password token invalid!"
                }
            })
        }


    }
    catch (err) {
        return res.status(500).json({
            status: "Error",
            message: "Password Reset Failed!",
            data: {
                error: err.message
            }
        })
    }
}
