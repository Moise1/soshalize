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

    static async FetchUsers(req, res) {

        try {
            const users = await User.find({});
            return res.status(200).json({message: 'All users', users})
        } catch (error) {
            if(error) return res.status(500).json(error.message)
        }
    }
    static async FindUser(req, res){

        const {id} = req.params;
        try {
            const user = await User.findById(id);
            if (!user) return res.status(404).json('User not found');
            const {password, updatedAt, ...data} = user._doc;
            return res.status(200).json({message: "Success", data});

        } catch (error) {
            if(error) return res.status(500).json(error.message)
        }
    }

    static async EditUser(req, res){
        let {userId, password, isAdmin} = req.body;
        const {id} = req.params;

        try {
            if(userId === id  || isAdmin){
                if(password) password = await hashedPassword(password);
                await User.findByIdAndUpdate(id, {$set: req.body, password});
                return res.status(200).json('Account successfully updated.')
            }else{
                return res.status(403).json("You can only update your account.");
            }

        } catch (error) {
            if(error) return res.status(500).json(error.message);
        }
    }

    static async FollowUser(req, res){
        let {userId} = req.body;
        const {id} = req.params;

        try {
            if(userId !== id){
                const user = await User.findById(id);
                const currentUser = await User.findById(userId);
                if(!user.followers.includes(userId)){
                    await user.updateOne({$push: {followers: userId}});
                    await currentUser.updateOne({$push: {following: id}});
                    return res.status(200).json(`Done! You're now following ${user.username}`);
                }else{
                    return res.status(409).json(`You're already following ${user.username}`)
                }
            }else{
                return res.status(403).json("You can't follow yourself.");
            }

        } catch (error) {
            if(error) return res.status(500).json(error.message);
        }
    }

    static async UnfollowUser(req, res){
        let {userId} = req.body;
        const {id} = req.params;

        try {
            if(userId !== id){
                const user = await User.findById(id);
                const currentUser = await User.findById(userId);
                if(user.followers.includes(userId)){
                    await user.updateOne({$pull: {followers: userId}});
                    await currentUser.updateOne({$pull: {following: id}});
                    return res.status(200).json(`Done! You've unfollowed ${user.username}`);
                }else{
                    return res.status(409).json(`You already unfollowed ${user.username}`)
                }
            }else{
                return res.status(403).json("You can't unfollow yourself.");
            }

        } catch (error) {
            if(error) return res.status(500).json(error.message);
        }
    }

    static async DeleteUser(req, res){

        const {userId, isAdmin} = req.body;
         const {id} = req.params;
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json('User not found')
            };
            if(userId === id  || isAdmin){
                await User.findByIdAndDelete(id);
                return res.status(200).json('User successfully deleted.');
            }else{
                return res.status(403).json('You can only delete your account.');
            }
        } catch (error) {
            if(error) return res.status(500).json(error.message)
        }
    } 
}

export default UserController;
