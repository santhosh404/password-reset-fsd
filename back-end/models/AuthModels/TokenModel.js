import mongoose from "mongoose";


export const tokenSchema = mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'Users'
    },
    token: {
        type: String,
        required: true
    }
})

export const TokenModel = mongoose.model('Tokens', tokenSchema);