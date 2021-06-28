import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true
    },
    emai: {
        type: String,
        require: true,
        max:  50,
        unique: true
    },

    password: {
        type: String,
        require: true,
        min:  6,
        unique: true
    },
    profilePicture: {
        type: String,
        default: "",  
    },
    coverPicture: {
        type: String,
        default: "",
    },

    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    }
})