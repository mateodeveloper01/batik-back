import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username:{type:String,unique:true},
    email: {type:String,unique:true},
    password:{type:String},
})

const userModel = model('User',userSchema)

export default userModel