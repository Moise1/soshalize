import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
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
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc:{
        type: String,
        max: 50
    },
    city: {
        type: String,
        max: 50
    },
    from: {
        type: String,
        max: 50
    },
    relationship: {
        type: Number,
        enum: [1,2,3]
    }

}, {timestamps: true},
   {collection: 'users'}
);


export default mongoose.model('User', UserSchema);