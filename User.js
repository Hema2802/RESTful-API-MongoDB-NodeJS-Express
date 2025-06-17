
import mongoose from "mongoose"

// define structure of data using schemas - name,email,age and isActive 
const userSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            minlength:2
        },
        age:{
            type:Number,
            required:true,
            min:0,
            max:80,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            match: /.+\@.+\..+/,
        },
        isActive:{
            type:Boolean,
            default:true
        }

    }
);

// creating model and exporting process
const User = mongoose.model('User', userSchema);
export default User;

