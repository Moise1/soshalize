import User from '../models/User';
import {hashedPassword, validPassword} from '../helpers/managePwd';
class UserController {

    static async Signup(req, res){

        const {username, password, email} = req.body;

        try {
            const password_hash = await hashedPassword(password);
            const userData = await new User({username, password: password_hash, email});
            const user = await userData.save();
            res.status(201).json(user);
    
        } catch (error) {
            if(error) res.status(500).json(error);
        }
    }

    static async Login(req, res){
        const {email, password} = req.body;

        try {
            const user = await User.findOne({email});
            
            if(!user){
                return res.status(404).json({error: `User with email ${email} not found.`})
            }

            const same_password = await validPassword(password, user.password);
            if(!same_password){
                return res.status(400).json({error: 'Wrong Password.'})
            }
            
            return res.status(200).json({message: 'Successfully logged in'});

        } catch (error) {
            if(error) res.status(500).json(error);
        }
    }

    static async FindUser(req, res){

        const {id} = req.params;
        try {
            const user = await User.findById(id);
            if (!user) return res.status(404).json('User not found');
            return res.status(200).json({message: "Success", user});

        } catch (error) {
            if(error) return res.status(500).json(error.message)
        }
    }

    static async EditUser(req, res){
        let {userId, password} = req.body;
        const {id} = req.params;

        try {
            if(userId === id  || req.user.isAdmin){
                if(password) password = await hashedPassword(password);
                await User.findByIdAndUpdate(id, {$set: req.body, password});
                return res.status(200).json('Account successfully updated.')
            }else{
                return res.status(403).json("You can update only your account.")
            }

        } catch (error) {
            if(error) return res.status(500).json(error.message);
        }
    }

    static async DeleteUser(req, res){
         const {id} = req.params;
        try {
            const user = await User.findById(id);
            if (!user) return res.status(404).json('User not found');
            await User.deleteOne(user);
            return res.status(200).json('User successfully deleted.');
        } catch (error) {
            if(error) return res.status(500).json(error.message)
        }
    }

    
}

export default UserController;

