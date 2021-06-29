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

    static async EditUser(req, res){
        const {_id} = req.params;
         
    }
}

export default UserController;

// Stopped at 41:49